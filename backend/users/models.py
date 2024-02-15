from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _


# Create your models here.
class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must have an username")

        email = self.normalize_email(email=email).lower()

        user = self.model(email=email, username=username, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        user = self.create_user(
            email=email, username=username, password=password, **extra_fields
        )

        return user


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name=_("Email address"),
        unique=True,
        blank=False,
        null=False,
        max_length=80,
    )
    username = models.CharField(
        max_length=80,
        unique=True,
        verbose_name=_("Username"),
        blank=False,
        null=False,
    )

    date_joined = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    last_login = models.DateTimeField(auto_now=True, blank=True, null=True)

    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = MyAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = "User"
        ordering = ["email"]

    def __str__(self) -> str:
        return self.email

    def has_perm(self, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return True
