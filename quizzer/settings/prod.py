from .common import *
import os
import dj_database_url

DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

ALLOWED_HOSTS = ["quizzerapp-2c174419668c.herokuapp.com"]

DATABASES = {"default": dj_database_url.config()}
