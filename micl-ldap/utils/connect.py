import sys
import json
import paramiko
from .constants import CREATE_CONDARC

HOSTNAME = '192.168.0.10'
USERNAME = 'root'
PASSWORD = 'micl2019'


class Connect:
    def __init__(self, hostname, username, password, port=22):
        self.hostname = hostname
        self.username = username
        self.password = password
        self.port = port
        self.client = None

    def conn(self):
        client = paramiko.SSHClient()
        client.load_system_host_keys()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(self.hostname, port=self.port,
                       username=self.username, password=self.password)

        self.client = client

    # def scp(self, source, dest):
        # t = paramiko.Transport((self.hostname, self.port))
        # t.connect(username=self.username, password=self.password)
        # sftp = paramiko.SFTPClient.from_transport(t)
        # sftp.put(source, dest)

    def apt(self, pkgs, state='present'):
        self.conn()
        pkgs = ','.join(pkgs)
        cmd = "ansible -i ansible-playbooks/inventories/micl/cluster all -m apt -a 'name={} state={}'".format(pkgs, state)
        print(cmd)
        # cmd = " ansible -i ansible-playbooks/inventories/micl/cluster all -m copy -a 'src=/etc/profile dest=/etc/profile'"
        stdin, stdout, stderr = self.client.exec_command(cmd)
        while not stdout.channel.exit_status_ready():
                    # Print data when available
                    if stdout.channel.recv_ready():
                        alldata = stdout.channel.recv(8192)
                        prevdata = b"1"
                        while prevdata:
                            prevdata = stdout.channel.recv(8192)
                            alldata += prevdata

        alldata =  alldata.decode('utf-8').strip()
        result = json.loads(alldata)
        return result['stats']
        # cmd = "ansible -i ansible-playbooks/inventories/micl/cluster all -m apt -a '-name={} state={}'".format(pkgs, state)
        # cmd = " ansible -i ansible-playbooks/inventories/micl/cluster all -m copy -a 'src=/etc/profile dest=/etc/profile'"
        # chan = self.client.get_transport().open_session()
        # chan.exec_command(cmd)
        # output = chan.recv(80960000)
        # output = output.decode('utf-8').strip()
        # result = json.loads(output)
        # chan.close()
        # return result['stats']
