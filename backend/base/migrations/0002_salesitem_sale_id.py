# Generated by Django 4.2 on 2024-10-22 20:19

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="salesitem",
            name="sale_id",
            field=models.UUIDField(blank=True, default=uuid.uuid4, unique=True),
        ),
    ]
