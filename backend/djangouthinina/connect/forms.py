from django.forms import ModelForm
from .models import  ConnectPost, ConnectComment

class ConnectPostForm(ModelForm):
    class Meta:
        model = ConnectPost
        fields = [
            'title',
            'text',
        ]

class ConnectCommentForm(ModelForm):
    class Meta:
        model = ConnectComment
        fields = [
            'text'
        ]

        
