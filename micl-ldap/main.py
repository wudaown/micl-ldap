from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy


import time
from utils.ldap import AD, SERVER, SERVER_USER, SERVER_PASSWORD
from utils.connect import Connect, HOSTNAME, USERNAME, PASSWORD
from celery import Celery

from flask_cors import *


openldap = AD(SERVER, SERVER_USER, SERVER_PASSWORD)
ssh = Connect(HOSTNAME, USERNAME, PASSWORD)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/wudaown/micl-ldap/micl.db'

app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'
# app.config['CELERY_ALWAYS_EAGER'] = True

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

db = SQLAlchemy(app)

CORS(app, supports_credentials=True)

db.create_all()


class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    desc = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return '<Package %r>' % self.name

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'name': self.name,
            'desc': self.desc
        }

class UserTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    task_id = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<User {} submit Task {}'.format(self.username, self.task_id)
    

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'username': self.username,
            'task_id': self.task_id
        }



@app.route('/pkgs', methods=['POST'])
def pkgs():
    term = request.json['term']
    pkgs = Package.query.filter(Package.name.contains(term)).all()
    return jsonify(pkgs=[i.serialize for i in pkgs])


def returnReponse(result, msg):
    response = make_response()
    if result:
        return make_response(jsonify({'msg': msg}), 200)
    else:
        return make_response(jsonify({'msg': msg}), 400)


@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    result, msg = openldap.check_credentials(username, password)

    return returnReponse(result, msg)


@celery.task(name='micl-ldap.main.install_pkg')
# @celery.task
def install_pkg(pkgs):
    # nodeResultDict = dict()
    nodeResult = []
    results = ssh.apt(pkgs)
    for node in results.keys():
        output = list(results[node].values())
        # {'changed': 1,
        #  'failures': 0,
        #  'ignored': 0,
        #  'ok': 1,
        #  'rescued': 0,
        #  'skipped': 0,
        #  'unreachable': 0
        #  }
    #     if output[0] == 1:
    #         nodeResultDict[node] = 'Success'
    #     elif output[1] == 1:
    #         nodeResultDict[node] = 'Failure'
    #     elif output[3] == 1:
    #         nodeResultDict[node] = 'Already installed'
    #     elif output[6] == 1:
    #         nodeResultDict[node] = 'Unreachable'
    # return nodeResultDict
        if output[0] == 1:
            nodeResult.append((node, 'Success'))
        elif output[1] == 1:
            nodeResult.append((node, 'Failure'))
        elif output[3] == 1:
            nodeResult.append((node, 'Already installed'))
        elif output[6] == 1:
            nodeResult.append((node, 'Unreachable'))
    return nodeResult


@app.route('/install', methods=['POST'])
def install():
    packages = request.json['packages']
    username = request.json['username']
    task = install_pkg.apply_async([packages])
    taskRecord = UserTask(username=username, task_id=task.id)
    db.session.add(taskRecord)
    db.session.commit()
    return returnReponse(True, task.id)


@app.route('/install/<task_id>')
def install_status(task_id):
    task = install_pkg.AsyncResult(task_id)
    if task.state == 'PENDING':
            # job did not start yet
        response = {
            'state': task.state,
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
        }
        response['result'] = task.result
    else:
        response = {
            'state': task.state,
            'status': str(task.info),  # this is the exception raised
        }
    return jsonify(response)


@app.route('/register', methods=['POST'])
def register():
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    username = request.json['username']
    email = request.json['email']
    mobile = request.json['mobile']

    result, msg = openldap.create_user(
        username, email, first_name, last_name, mobile)
    return returnReponse(result, msg)


@app.route('/reset', methods=['POST'])
def reset():
    email = request.json['email']
    result, msg = openldap.modify_user_password(email)

    return returnReponse(result, msg)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
