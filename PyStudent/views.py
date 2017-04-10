from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

def registro(request):
    template = loader.get_template('registro.html')
    return HttpResponse(template.render())
