from django.urls import path
from . import api

urlpatterns = [
    path('createpost/', api.create_ConnectPost, name='create_Connect_Post_url'),
    path('createcomment/', api.create_ConnectComment, name='create_Connect_Comment_url'),

    path('connectposts/', api.list_ConnectPosts, name='read_Connect_Posts' )
]