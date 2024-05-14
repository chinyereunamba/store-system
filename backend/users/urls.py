from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView, PasswordChangeView
from dj_rest_auth.registration.views import VerifyEmailView, ResendEmailVerificationView

urlpatterns = [
    path("user/", include("dj_rest_auth.urls")),
    path("user/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "user/registration/confirm-email/",
        VerifyEmailView.as_view(),
        name="email_verification_sent",
    ),
    path(
        "user/registration/confirm-email/<key>/",
        VerifyEmailView.as_view(),
        name="confirm_email",
    ),
    path(
        "user/registration/resend-email/<key>/",
        ResendEmailVerificationView.as_view(),
        name="email_verification",
    ),
    path("user/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("user/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path(
        "user/password/reset/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "user/password/change/",
        PasswordChangeView.as_view(),
        name="password_change",
    ),


]
