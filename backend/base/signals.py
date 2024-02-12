# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PurchaseOrder, PurchaseRecord, PurchaseItem, SalesItem, SalesTransaction


@receiver(post_save, sender=PurchaseOrder)
def create_purchase_records(sender, instance, created, **kwargs):
    if created:
        for purchase_item in instance.purchaseitem_set.all():
            PurchaseRecord.objects.create(
                product=purchase_item.product,
                purchase_order=instance,
                purchase_price=purchase_item.unit_price,
            )


@receiver(post_save, sender=SalesItem)
def create_sales_transaction(sender, instance, created, **kwargs):
    if created:
        # Calculate total amount for the sales transaction
        total_amount = instance.quantity_sold * instance.unit_price
        # Create a new SalesTransaction
        SalesTransaction.objects.create(total_amount=total_amount)


@receiver(post_save, sender=SalesItem)
def update_stock_quantity(sender, instance, created, **kwargs):
    if created:
        # Decrease the stock quantity of the sold product
        instance.product.stock_quantity -= instance.quantity_sold
        instance.product.save()
