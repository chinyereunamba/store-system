from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid


class Category(models.Model):
    category = models.CharField(max_length=255, unique=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "Categories"


class Brand(models.Model):
    brand = models.CharField(max_length=80, unique=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.brand


class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    stock_quantity = models.PositiveIntegerField(default=0, blank=True, null=True)
    cost_price = models.BigIntegerField(null=True, blank=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_name

    def update_price_to_latest_purchase_price(self):
        latest_purchase_item = self.purchaseitem_set.order_by(
            "-purchase_order__purchase_date"
        ).first()
        if latest_purchase_item:
            self.cost_price = latest_purchase_item.unit_price
            self.save()


class PurchaseRecord(models.Model):
    products = models.ManyToManyField(Product, through="PurchaseItem")
    total_amount = models.DecimalField(
        verbose_name=(_("Total Amount Spent")), max_digits=10, decimal_places=2
    )
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    purchase_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.purchase_date} - {self.supplier.name}"


class PurchaseItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    purchase_order = models.ForeignKey(PurchaseRecord, on_delete=models.CASCADE)
    unit_price = models.BigIntegerField(help_text="Cost price")

    def __str__(self):
        return f"{self.quantity} of {self.product.product_name} in order {self.purchase_order.purchase_date}"

    @property
    def total_amount(self):
        return self.quantity * self.unit_price

    class Meta:
        verbose_name = "Purchase Item"


class SalesItem(models.Model):
    sale_id = models.UUIDField(
        default=uuid.uuid4, blank=True, unique=True, max_length=10
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity_sold = models.PositiveIntegerField()
    unit_price = models.BigIntegerField(
        verbose_name=(_("Sold at")), 
    )
    date_created = models.DateField(auto_now_add=True)

    @property
    def cost_price(self):
        return self.product.cost_price

    @property
    def total_amount(self):
        return self.unit_price * self.quantity_sold

    def __str__(self):
        return f"{self.quantity_sold} of {self.product.product_name} in transaction {self.sales_transaction.transaction_number}"

    class Meta:
        verbose_name = "Sales Item"
