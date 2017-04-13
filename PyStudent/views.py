from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from PyStudent.models import Alumno
from django.views.decorators.csrf import *

def index(request):
    template = loader.get_template('index.html')
    return render(request, 'index.html')

#@csrf_exempt
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
