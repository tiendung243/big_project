# Generated by Django 3.2.8 on 2021-11-06 14:55

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='authuser',
            name='image',
            field=models.ImageField(default='users/default.jpg', upload_to=accounts.models.upload_to, verbose_name='Image'),
        ),
    ]
