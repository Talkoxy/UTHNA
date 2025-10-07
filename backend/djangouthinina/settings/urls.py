from django.urls import path
from . import api

urlpatterns = [
    path('create/', api.create_settings, name='create_settings_url'),
    
    path('list/', api.list_settings, name='list_settings_url'),

    path('<uuid:PK>/update/', api.update_settings, name='update_settings'),

]