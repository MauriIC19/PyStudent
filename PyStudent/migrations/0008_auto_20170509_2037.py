# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-10 01:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PyStudent', '0007_palabras_dificultad'),
    ]

    operations = [
        migrations.AddField(
            model_name='puntaje',
            name='PalabrasCorrectas',
            field=models.TextField(default=' '),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='puntaje',
            name='PalabrasUsuario',
            field=models.TextField(default=' '),
            preserve_default=False,
        ),
    ]
