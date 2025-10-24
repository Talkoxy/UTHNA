from django.urls import path
from . import api

urlpatterns = [
    path('createpost/', api.create_ConnectPost, name='create_ConnectPost_url'),
    path('createcomment/', api.create_Comment, name='create_ConnectComment_url'),
    
    path('connectposts/', api.list_ConnectPosts, name='read_Connect_Posts' ),
    path('comments/', api.Comments_list, name='read_Connect_Comments' ),
]