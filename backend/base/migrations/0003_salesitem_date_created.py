# Generated by Django 4.2 on 2024-10-22 20:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_salesitem_sale_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="salesitem",
            name="date_created",
            field=models.DateField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
