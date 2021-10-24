from django.shortcuts import render
from django.views.generic import TemplateView


class Test(TemplateView):
    template_name = "index.html"
