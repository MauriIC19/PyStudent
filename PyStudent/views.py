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
    if request.session['id'] is not 0:
        return render(request, 'seleccionarEvaluacion.html')
    else:
        return redirect('/pystudent/')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def instrucciones(request):
    if request.session['id'] is not 0:
        return render(request, 'dictadoPalabrasInstrucciones.html')
    else:
        return redirect('/pystudent/')

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def dictado(request):
    if request.session['id'] is not 0:
        grade = request.GET.get('grado')

        if request.method == 'POST':
            key = request.POST.get('key')
            textoPalabras = Palabras.objects.filter(dificultad = int(grade))
            pal = []

            for palabra in textoPalabras:
                pal.append(palabra.palabra)

            pythoncom.CoInitialize()
            text = pal[int(key)]
            src = "/static/audio/audio.mp3"
            engine = CreateObject("SAPI.SpVoice")
            stream = CreateObject("SAPI.SpFileStream")

            from comtypes.gen import SpeechLib

            stream.Open("C:/Users/sasuk/Desktop/PyStudent/PyStudent/static/audio/audio.mp3", SpeechLib.SSFMCreateForWrite)
            engine.AudioOutputStream = stream
            engine.speak(text)
            stream.Close()

            return HttpResponse(src)

        return render(request, 'dictadoPalabras.html')
    else:
        return redirect('/pystudent/')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def resultados(request):
    if request.session['id'] is not 0:
        if request.method == 'POST':
            palabras = request.POST.getlist('arrPalabras[]')
            print(palabras)
            #Hacer función Ajax onload para resultadoDictado y mandarle en un JSON el query
            #y el arreglo de palabras correctas para que las despliegue haciendo la comparación
        return render(request, 'resultadoDictado.html')
    else:
        return redirect('/pystudent/')
