# Generated by Django 3.2.8 on 2021-11-17 09:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0009_auto_20211117_0346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='voted_users',
        ),
        migrations.AlterField(
            model_name='votequestion',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vote_questions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='VoteComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('upvote', 'Upvote'), ('down_vote', 'Down Vote')], default='upvote', max_length=20)),
                ('comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='app.comment')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vote_comments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
