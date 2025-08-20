from django.urls import path
from . import api  

urlpatterns = [
    path('translate/', api.just_translate, name='just_translate'),  # POST to translate text without saving
    path('Clienttranslations/list/', api.Clienttranslation_list, name='Clienttranslation_list'),  # GET list of Clienttranslations
    path('Clienttranslations/save/', api.save_Clienttranslation, name='save_Clienttranslation'),  # POST to save a Clienttranslation
    path('Clienttranslations/<int:pk>/', api.Clienttranslation_detail, name='Clienttranslation_detail'),  # GET single Clienttranslation
    path('Clienttranslations/<int:pk>/delete/', api.Clienttranslation_delete, name='Clienttranslation_delete'),  # DELETE Clienttranslation
]