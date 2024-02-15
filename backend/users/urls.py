from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView

urlpatterns = [
    path("user/", include("dj_rest_auth.urls")),
    path("user/registration/", include("dj_rest_auth.registration.urls")),
    path("user/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("user/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
