from django.db import models

"""Con cada modelo se debe de ejecutar el comando:
        python manage.py makemigrations
   Para que así se genere el modelo en la base de datos."""

class Alumno(models.Model):
    name = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    mail = models.CharField(max_length=100)
    fechaNac = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    password = models.CharField(max_length=20)

class Estado(models.Model):
    estado = models.CharField(max_length=200)

class Palabras(models.Model):
    palabra = models.CharField(max_length=100)
