from django.db import models

# Create your models here.


class Category(models.Model):
    category = models.CharField(max_length=255, blank=False, null=False, unique=True)
    date_created = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.category

        class Meta:
            verbose_name_plurals = "Categories"


class Brand(models.Model):
    brand = models.CharField(max_length=80, blank=False, null=False, unique=True)
    date_created = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.brand


class Stock(models.Model):
    order_number = models.CharField(max_length=20, unique=True)
    date_created = models.DateField(auto_now_add=True, blank=True)

    def __str__(self) -> str:
        return self.order_number


class Product(models.Model):
    product_name = models.CharField(max_length=255, blank=False, null=False)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, blank=True, null=True
    )
    quantity = models.PositiveIntegerField(default=1, blank=False)
    date_ordered = models.ForeignKey(Stock, on_delete=models.CASCADE)
    cost_price = models.IntegerField(blank=False)
    date_created = models.DateField(auto_now_add=True, blank=True)

    def __str__(self) -> str:
        return self.product_name
