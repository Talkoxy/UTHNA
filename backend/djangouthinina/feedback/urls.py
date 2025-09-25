from django.urls import path

from . import api

urlpatterns = [
    path('create/', api.create_feedback, name='create_feedback_url'),
]