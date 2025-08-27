from django.urls import path
from . import api  

urlpatterns = [
    path('translate/', api.just_translate, name='just_translate'),  # POST to translate text without saving
    path('Clienttranslations/list/', api.Clienttranslation_list, name='Clienttranslation_list'),  # GET list of saved and liked Clienttranslations
    path('Clienttranslations/save/', api.save_Clienttranslation, name='save_Clienttranslation'),  # POST as saved Clienttranslation
    path('Clienttranslations/save/list', api.save_Clienttranslation, name='save_Clienttranslation'),  # Get  saved Clienttranslation list
    path('Clienttranslations/like/', api.like_Clienttranslation, name='like_Clienttranslation'),  # POST as liked Clienttranslation
    path('Clienttranslations/like/list', api.like_Clienttranslation, name='like_Clienttranslation'),  # GET liked Clienttranslation list
    path('Clienttranslations/<int:pk>/', api.Clienttranslation_detail, name='Clienttranslation_detail'),  # GET a single and detailed Clienttranslation
    path('Clienttranslations/<int:pk>/delete/', api.Clienttranslation_delete, name='Clienttranslation_delete'),  # DELETE Clienttranslation
]