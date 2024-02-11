from django.contrib import admin

# Register your models here.

from .models import Account
from django.contrib.auth.admin import UserAdmin


class AccountAdmin(UserAdmin):
    list_display = [
        "email",
        "username",
        "is_active",
        "is_superuser",
        "date_joined",
        "last_login",
    ]
    search_fields = ["email", "username"]
    readonly_fields = ["id", "date_joined", "last_login"]
    filter_horizontal = ()
    list_filter = ("is_active", 'is_superuser')
    fieldsets = ()

    ordering = ["email"]
    groups = []


admin.site.register(Account, AccountAdmin)