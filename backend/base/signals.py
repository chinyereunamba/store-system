# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SalesItem, PurchaseItem, Product
from django.utils.crypto import get_random_string


@receiver(post_save, sender=SalesItem)
def update_stock_quantity(sender, instance, created, **kwargs):
    if created:
        instance.product.stock_quantity -= instance.quantity_sold
        instance.product.save()


@receiver(post_save, sender=PurchaseItem)
def update_stock_quantity(sender, instance, created, **kwargs):
    instance.product.stock_quantity += instance.quantity
    instance.product.save()


@receiver(post_save, sender=PurchaseItem)
def update_product_cost_price(sender, instance, **kwargs):
    """
    Signal to update product's cost price when a new PurchaseItem is saved.
    """
    product = instance.product
    product.update_price_to_latest_purchase_price()
