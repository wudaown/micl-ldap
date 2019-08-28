from main import db, Package

db.create_all()

fh = open('./pkgs')

pkgs = dict()

for i in fh:
    name, desc = i.split(' - ', 1)
    pkgs['name'] = name
    pkgs['desc'] = desc.strip()
    pkg = Package(**pkgs)
    db.session.add(pkg)

db.session.commit()
