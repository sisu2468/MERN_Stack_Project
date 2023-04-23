from fastapi import APIRouter, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
import secrets
import string
import random
from os import getenv

router = APIRouter()

MAIL_USERNAME = getenv("MAIL_USERNAME")
MAIL_PASSWORD = getenv("MAIL_PASSWORD")
MAIL_FROM = getenv("MAIL_FROM")
MAIL_PORT = int(getenv("MAIL_PORT", "587"))
MAIL_SERVER = getenv("MAIL_SERVER", "smtp.gmail.com")
MAIL_FROM_NAME = "ChargeMate D7"

conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=MAIL_PORT,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_FROM_NAME=MAIL_FROM_NAME,
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS = True,
    TEMPLATE_FOLDER='./templates'
)


async def send_email_async(subject: str, email_to: str, body: dict):
    message = MessageSchema(
        subject=subject,
        recipients=[email_to,],
        template_body=body,
        subtype=MessageType.html,
    )

    fm = FastMail(conf)
    await fm.send_message(message, template_name='email.html')


def send_email_background(background_tasks: BackgroundTasks, subject: str, email_to: str, body: dict):
    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        body=body,
        subtype='html',
    )
    fm = FastMail(conf)
    background_tasks.add_task(
        fm.send_message, message, template_name='email.html')


def random_generator(num):
    if num == -1:
        num = random.randint(15, 60)

    s = ''
    letters = string.ascii_letters + string.digits
    for i in range(num):
        s += secrets.choice(letters)
    s = secrets.choice(string.ascii_lowercase) + \
        secrets.choice(string.ascii_uppercase) + \
        secrets.choice(string.digits) + s

    random.shuffle(list(s))

    return "".join(s)
