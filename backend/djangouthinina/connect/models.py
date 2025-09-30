import uuid

from django.db import models
from clients.models import User
from django.conf import settings

class ConnectPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey( User, related_name='connect_posts', on_delete=models.CASCADE,      ) 
    created_at = models.DateTimeField(auto_now_add=True)

    title = models.CharField(max_length=255) 
    text = models.TextField()                 
    image = models.ImageField(upload_to='connect_images/', blank=True, null=True)
    
    

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'
    
    def __str__(self):
        return self.title 
    

class ConnectComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(ConnectPost, related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='connect_comments', on_delete=models.CASCADE)

    comment = models.TextField() 
    

    def __str__(self):
        return f"Comment by {self.created_by.username} on {self.post.title[:20]}"