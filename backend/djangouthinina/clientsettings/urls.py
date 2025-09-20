from django.urls import path
from . import api

urlpatterns = [
    path('list/', api.client_settings_list, name='client_settings_list'),
    path('<uuid:pk>/', api.client_settings_detail, name='client_settings_detail'),
    path('create/', api.create_client_settings, name='create_client_settings'),
    path('<uuid:pk>/update/', api.update_client_settings, name='update_client_settings'),
]