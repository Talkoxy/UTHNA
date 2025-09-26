from django.urls import path
from . import api

urlpatterns = [
    path('create/', api.create_settings, name='create_settings_url'),
]