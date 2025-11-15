import uuid

from django.db import models
from clients.models import User
from settings.models import Settings
from django.conf import settings

class ConnectPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey( User, related_name='connect_posts', on_delete=models.CASCADE,)
    created_at = models.DateTimeField(auto_now_add=True)

    title = models.CharField(max_length=255,default='null')  
    text = models.TextField(default='null')                 
    image = models.ImageField(upload_to='connect_images/', blank=True, null=True)
    
    tone = models.CharField(max_length=255, default='null')  
    usage = models.TextField(default='null') 
    language = models.CharField(max_length=255, default='null')
    meaning = models.TextField(default='null') 

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'
    
    def __str__(self):
        return self.title 
    
    

class ConnectComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(ConnectPost, related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    

    text = models.TextField() 

    
    
    def __str__(self):
        return f"Comment by {self.created_by.username} on {self.post.title[:20]}"
    



class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    connect = models.ForeignKey(ConnectPost, related_name='connect_comments', on_delete=models.CASCADE)
    
    author = models.ForeignKey(
        User,
        related_name='connect_comments',
        on_delete=models.CASCADE,
        
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    text = models.TextField() 
    
    def __str__(self):
        
        return f"Comment by {self.author.username} on {self.post.title[:20]}"