# Generated by Django 3.2.8 on 2021-11-05 15:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0002_alter_question_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='number_comment',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('upvote', models.IntegerField(default=0)),
                ('down_vote', models.IntegerField(default=0)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
                ('parent_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.comment')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.question')),
            ],
        ),
    ]
