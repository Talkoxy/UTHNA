from django.urls import path
from . import api
    
urlpatterns = [

    path('create/', api.create_avatar, name='create_avatar'),
    path('get/', api.avatar, name='get_avatar')
    
]