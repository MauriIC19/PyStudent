from django.conf.urls import url
from . import views

"""Aquí van las direcciones y las funciones que se llamarán
   cuando se ingrese a esa dirección, los nombres son globales
   no debería de haber más de una url con el mismo nombre"""

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^registro/', views.registro, name='registro'),
    url(r'^datos/', views.datos, name='datos'),
    url(regex=r'^ajax/$', view=views.ajax, name='ajax'),
]
