# Generated by Django 4.2 on 2024-02-14 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0005_alter_product_stock_quantity_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="purchaseorder",
            name="order_number",
            field=models.UUIDField(primary_key=True, serialize=False),
        ),
    ]