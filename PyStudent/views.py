from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from PyStudent.models import Alumno
from PyStudent.models import Estado
from comtypes.client import CreateObject
import pythoncom
import json

def index(request):
    return render(request, 'index.html')

def registro(request):
    return render(request, 'registro.html')

def login(request):
    return render(request, 'login.html')
