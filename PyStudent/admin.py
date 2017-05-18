from django.contrib import admin
from .models import Alumno, Estado, Puntaje, Palabras

# Register your models here.
MyModels = [Alumno, Estado, Puntaje, Palabras]
admin.site.register(MyModels)
