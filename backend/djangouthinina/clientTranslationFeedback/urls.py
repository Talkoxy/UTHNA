from django.urls import path
from . import api  

urlpatterns = [
    path('create/', api.create_client_feedback, name='create_feedback'),  
    path('list/', api.client_feedback_list, name='get_feedback_list'),  

]