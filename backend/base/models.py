from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


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
    stock_quantity = models.PositiveIntegerField(default=0)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_name

    def update_price_to_latest_purchase_price(self):
        latest_purchase_record = self.purchaserecord_set.latest("purchase_date")
        self.cost_price = latest_purchase_record.purchase_price
        self.save()


class PurchaseOrder(models.Model):
    order_number = models.AutoField(primary_key=True)
    date_ordered = models.DateField(auto_now_add=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.order_number)


class PurchaseItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} of {self.product.product_name} in order {self.purchase_order.order_number}"

    class Meta:
        verbose_name = "Purchase Item"


class PurchaseRecord(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.product_name} - {self.purchase_order.order_number}"


class SalesTransaction(models.Model):
    transaction_number = models.AutoField(primary_key=True)
    date = models.DateField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.transaction_number)


class SalesItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sales_transaction = models.ForeignKey(SalesTransaction, on_delete=models.CASCADE)
    quantity_sold = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity_sold} of {self.product.product_name} in transaction {self.sales_transaction.transaction_number}"

    class Meta:
        verbose_name = "Sales Item"
