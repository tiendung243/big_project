# Generated by Django 3.2.8 on 2021-12-04 13:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_question_followed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='category',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
