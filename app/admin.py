from django.contrib import admin
from .models import *


@admin.register(Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author', 'status')
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Category)
