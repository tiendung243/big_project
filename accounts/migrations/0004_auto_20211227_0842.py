# Generated by Django 3.2.8 on 2021-12-27 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20211108_1001'),
    ]

    operations = [
        migrations.AddField(
            model_name='authuser',
            name='contact',
            field=models.CharField(default='', max_length=32),
        ),
        migrations.AddField(
            model_name='authuser',
            name='github',
            field=models.CharField(default='', max_length=32),
        ),
        migrations.AddField(
            model_name='authuser',
            name='website',
            field=models.CharField(default='', max_length=32),
        ),
    ]
