from django.contrib import admin
from .models import *


@admin.register(Question)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author', 'status')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Comment)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('content', 'question', 'author', 'parent_comment')


admin.site.register(Category)
admin.site.register(Tag)
