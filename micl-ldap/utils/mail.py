import emails
from emails.template import JinjaTemplate as T


USERNAME = 'heng0181@e.ntu.edu.sg'
PASSWORD = 'YOUR_PASSWORD'
smtp_conf = {'host': 'smtp.office365.com',
             'user': USERNAME,
             'password': PASSWORD,
             'port': 587,
             'tls': True}


def send_email(username, password, receiver, receiver_email):
    message = emails.html(subject=T('MICL Cluster Password'),
                          html=T(
                              '<p>Server IP: <b>155.69.146.213</b>'
                              '<p>Your username is <b>{{username}}</b>'
                              '<p>Your password is <b>{{password}}</b>'
    ),
        mail_from=('auto-reporter', USERNAME))
    r = message.send(to=(receiver, receiver_email), render={
        'username': username,
        'password': password}, smtp=smtp_conf)

    return r


# def office365():
#     import smtplib
#     mailserver = smtplib.SMTP('smtp.office365.com', 587)
#     mailserver.ehlo()
#     mailserver.starttls()
#     mailserver.login(USERNAME, PASSWORD)
#     mailserver.sendmail(USERNAME, USERNAME, 'python email')
#     mailserver.quit()


if __name__ == "__main__":
    username = 'wudaown'
    password = '111111'
    receiver = 'Heng Weiliang'
    receiver_email = 'wudaown@gmail.com'
    send_email(username, password, receiver, receiver_email)
