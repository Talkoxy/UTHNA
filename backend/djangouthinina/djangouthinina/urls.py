from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('clients.urls')),
    path('api/translate/', include('translations.urls')),
    path('api/settings/', include('clientsettings.urls')),
    path('api/feedback/', include('clientTranslationFeedback.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
