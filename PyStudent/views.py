from django.views.decorators.cache import cache_control
from comtypes.client import CreateObject
from django.http import HttpResponse
from django.shortcuts import redirect
from django.shortcuts import render
from PyStudent.models import *
import pythoncom
import json

def index(request):
    request.session['id'] = 0
    if request.session['id']:
        request.session['id'] = 0
    return render(request, 'index.html')

def registro(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellidos = request.POST.get('apellidos')
        fecNac = request.POST.get('fecNac')
        estado = request.POST.get('estado')
        correo = request.POST.get('correo')
        password = request.POST.get('password')

        al = Alumno();

        al.name = nombre
        al.apellidos = apellidos
        al.mail = correo
        al.fechaNac = fecNac
        al.estado = estado
        al.password = password

        al.save();

    if request.is_ajax():
        estados = Estado.objects.all()
        est = {}
        for estado in estados:
            est[estado.id] = {'estado':estado.estado}

        estadosJson = json.dumps(est)
        return HttpResponse(estadosJson, content_type='application/json')

    else:
        return render(request, 'registro.html')

def login(request):
    if request.method == 'POST':
        correo = request.POST.get('correo')
        password = request.POST.get('password')

        try:
            user = Alumno.objects.get(mail=correo, password=password)
        except Alumno.DoesNotExist:
            user = None

        if user:
            context = {'key': '1'}
            request.session['id'] = user.id

        else:
            context = {'key': '0'}

        contextJson = json.dumps(context)
        return HttpResponse(contextJson, content_type='application/json')
    else:
        return render(request, 'login.html')

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def materia(request):
    if request.session['id'] is not 0:
        al = Alumno.objects.get(pk=request.session['id'])
        context = {'nombre': al.name}
        return render(request, 'seleccionarMateria.html', context)
    else:
        return redirect('/pystudent/')
        
@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def evaluacion(request):
    return render(request, 'seleccionarEvaluacion.html')
