# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-11 12:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PyStudent', '0008_auto_20170509_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='puntaje',
            name='aciertos',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='puntaje',
            name='errores',
            field=models.IntegerField(),
        ),
    ]
