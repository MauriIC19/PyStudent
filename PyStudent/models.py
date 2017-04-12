from django.db import models

"""Con cada modelo se debe de ejecutar el comando:
        python manage.py makemigrations
   Para que así se genere el modelo en la base de datos."""

class Alumno(models.Model):
    name = models.CharField(max_length=100)
    mail = models.CharField(max_length=100)
