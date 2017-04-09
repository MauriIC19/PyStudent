from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^pystudent/', include('PyStudent.urls')),
    url(r'^admin/', admin.site.urls),
]
