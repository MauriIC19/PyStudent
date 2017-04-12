from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from PyStudent.models import Alumno

def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

def registro(request):
    template = loader.get_template('registro.html')
    return HttpResponse(template.render())

def datos(request):
    """Consulta a la base de datos que obtiene todos los datos de esa tabla
       Si quisieramos obtener los datos de un usuario en específico, se usa el
       siguiente comando: Alumno.objects.get(var=algo)"""
       
    al = Alumno.objects.all()
    alumnos = {}

    for a in al:
        alumnos[a.id] = {'name':a.name, 'mail': a.mail}

    context ={'a': alumnos}

    template = loader.get_template('datos.html')
    return HttpResponse(template.render(context))
