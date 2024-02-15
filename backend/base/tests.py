from django.test import TestCase

# Create your tests here.

from .models import (
    Category,
    Brand,
    Supplier,
    Product,
    PurchaseRecord,
    PurchaseItem,
    SalesItem,
)


class CategoryModelTestCase(TestCase):
    def test_category_creation(self):
        category = Category.objects.create(category="Electronics")
        self.assertEqual(category.category, "Electronics")


class BrandModelTestCase(TestCase):
    def test_brand_creation(self):
        brand = Brand.objects.create(brand="Samsung")
        self.assertEqual(brand.brand, "Samsung")


class SupplierModelTestCase(TestCase):
    def test_supplier_creation(self):
        supplier = Supplier.objects.create(name="Supplier 1", email="supplier@mail.com")
        self.assertEqual(supplier.name, "Supplier 1")
        self.assertEqual(supplier.email, "supplier@mail.com")


class ProductModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(category="Electronics")
        self.brand = Brand.objects.create(brand="Samsung")

    def test_product_creation(self):
        product = Product.objects.create(
            product_name="Smartphone",
            brand=self.brand,
            category=self.category,
            stock_quantity=10,
        )
        self.assertEqual(product.product_name, "Smartphone")
        self.assertEqual(product.brand, self.brand)
        self.assertEqual(product.category, self.category)
        self.assertEqual(product.stock_quantity, 10)


class PurchaseRecordModelTestCase(TestCase):
    def setUp(self):
        self.supplier = Supplier.objects.create(name="Supplier 1")

    def test_purchase_record_creation(self):
        purchase_record = PurchaseRecord.objects.create(
            total_amount=1000, supplier=self.supplier
        )
        self.assertEqual(purchase_record.total_amount, 1000)
        self.assertEqual(purchase_record.supplier, self.supplier)


class PurchaseItemModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(category="Electronics")
        self.brand = Brand.objects.create(brand="Samsung")
        self.supplier = Supplier.objects.create(name="Supplier 1")
        self.product = Product.objects.create(
            product_name="Smartphone",
            brand=self.brand,
            category=self.category,
            stock_quantity=10,
        )
        self.purchase_record = PurchaseRecord.objects.create(
            total_amount=1000, supplier=self.supplier
        )

    def test_purchase_item_creation(self):
        purchase_item = PurchaseItem.objects.create(
            product=self.product,
            quantity=5,
            purchase_order=self.purchase_record,
            unit_price=200,
        )
        self.assertEqual(purchase_item.product, self.product)
        self.assertEqual(purchase_item.quantity, 5)
        self.assertEqual(purchase_item.purchase_order, self.purchase_record)
        self.assertEqual(purchase_item.unit_price, 200)


class SalesItemModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(category="Electronics")
        self.brand = Brand.objects.create(brand="Samsung")
        self.product = Product.objects.create(
            product_name="Smartphone",
            brand=self.brand,
            category=self.category,
            stock_quantity=10,
        )

    def test_sales_item_creation(self):
        sales_item = SalesItem.objects.create(
            product=self.product, quantity_sold=3, unit_price=300
        )
        self.assertEqual(sales_item.product, self.product)
        self.assertEqual(sales_item.quantity_sold, 3)
        self.assertEqual(self.product.stock_quantity, 7)
        self.assertEqual(sales_item.unit_price, 300)
