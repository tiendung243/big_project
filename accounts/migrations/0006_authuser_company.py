# Generated by Django 3.2.8 on 2022-01-10 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_authuser_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='authuser',
            name='company',
            field=models.CharField(default='', max_length=150),
        ),
    ]
