# Generated by Django 3.2.8 on 2021-11-16 10:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0007_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='voted_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='voted_comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='question',
            name='voted_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='voted_posts', to=settings.AUTH_USER_MODEL),
        ),
    ]