from django.urls import path

from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LogoutView
from rest_framework_simplejwt.views import TokenVerifyView

from . import api
from .views import CustomLoginView, CustomRegisterView, GoogleLogin

urlpatterns = [
    path('register/', CustomRegisterView.as_view(), name='rest_register'),
    path('login/', CustomLoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),

    path("<uuid:pk>/update/", api.update_user, name="update_user"),
    path("<uuid:pk>/delete/", api.delete_user, name="delete_user"),
    path("<uuid:pk>/", api.user_detail, name="api_user_detail"),

    path('google/login/', GoogleLogin.as_view(), name='google_login'),

    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'), 
]