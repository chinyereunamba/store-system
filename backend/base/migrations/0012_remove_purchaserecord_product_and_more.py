# Generated by Django 4.2 on 2024-02-15 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0011_alter_purchaserecord_product"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="purchaserecord",
            name="product",
        ),
        migrations.AddField(
            model_name="purchaserecord",
            name="products",
            field=models.ManyToManyField(
                through="base.PurchaseItem", to="base.product"
            ),
        ),
    ]