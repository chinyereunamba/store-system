# Generated by Django 4.2 on 2024-02-14 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0010_remove_purchaserecord_purchase_order_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="purchaserecord",
            name="product",
            field=models.ManyToManyField(
                blank=True, null=True, through="base.PurchaseItem", to="base.product"
            ),
        ),
    ]
