# Generated by Django 4.2 on 2024-02-15 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_account_groups_account_user_permissions_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="account",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]