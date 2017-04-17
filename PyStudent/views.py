from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from PyStudent.models import Alumno
from comtypes.client import CreateObject
import pythoncom
import json

def index(request):

    return render(request, 'index.html')

def registro(request):

    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        correo = request.POST.get('correo')

        al = Alumno(name=nombre, mail=correo)
        al.save()

        context = {
            'aviso':'Alumno agregado'
        }
        return render(request, 'registro.html', context)

    else:
        return render(request, 'registro.html')

def datos(request):
    """Consulta a la base de datos que obtiene todos los datos de esa tabla
       Si quisieramos obtener los datos de un usuario en específico, se usa el
       siguiente comando: Alumno.objects.get(var=algo)"""

    al = Alumno.objects.all()
    alumnos = {}

    for a in al:
        alumnos[a.id] = {'name':a.name, 'mail': a.mail}

    context ={'a': alumnos}

    return render(request, 'datos.html', context)

def ajax(request):

    if request.method == 'POST':

        nombre = request.POST.get('nombre')
        correo = request.POST.get('correo')
        al = Alumno(name=nombre, mail=correo)
        al.save()

    if request.is_ajax():

        al = Alumno.objects.all()
        alumnos = {}

        for a in al:
            alumnos[a.id] = {'name':a.name, 'mail': a.mail}

        alumnosJson = json.dumps(alumnos)

        return HttpResponse(alumnosJson, content_type='application/json')

    else:
        return render(request, 'ajax.html')

def dictado(request):
    if request.method == 'POST':
        if request.is_ajax:
            idAl = request.POST.get('id')
            al = Alumno.objects.get(id=int(idAl))

            pythoncom.CoInitialize()

            text = al.name
            src = "/static/audio/audio.mp3"
            engine = CreateObject("SAPI.SpVoice")
            stream = CreateObject("SAPI.SpFileStream")

            from comtypes.gen import SpeechLib

            stream.Open("C:/Users/sasuk/Desktop/Paradigmas/PyStudent/static/audio/audio.mp3", SpeechLib.SSFMCreateForWrite)
            engine.AudioOutputStream = stream
            engine.speak(text)
            stream.Close()

            return HttpResponse(src)

    return render(request, 'dictado.html')
