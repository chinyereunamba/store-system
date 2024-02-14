# signals.py

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import SalesItem
from django.utils.crypto import get_random_string

import string

@receiver(post_save, sender=SalesItem)
def update_stock_quantity(sender, instance, created, **kwargs):
    if created:
        # Decrease the stock quantity of the sold product
        instance.product.stock_quantity -= instance.quantity_sold
        instance.product.save()

