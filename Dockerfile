FROM tiangolo/uwsgi-nginx-flask:python3.7

COPY ./micl-ldap /app

RUN pip3 install ldap3 emails flask-cors
