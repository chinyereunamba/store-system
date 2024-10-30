import { Purchase } from "@/store/purchaseContext";
import { useState } from "react";

const PurchaseForm = () => {
  const [purchases, setPurchases] = useState([
    { product: "", quantity: 0, supplier: "", date: "" },
  ]);

  const handleAddPurchase = () => {
    setPurchases([
      ...purchases,
      { product: "", quantity: 0, supplier: "", date: "" },
    ]);
  };
    
 
    const handleChange = (
      index: number,
      field: keyof Purchase,
      value: string | number
    ) => {
      const updatedPurchases = [...purchases];
      updatedPurchases[index] = {
        ...updatedPurchases[index],
        [field]: value,
      };
      setPurchases(updatedPurchases);
    };

  const handleSubmit = () => {
    // Submit all purchases at once to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      {purchases.map((purchase, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Product"
            value={purchase.product}
            onChange={(e) => handleChange(index, "product", e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={purchase.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />
          <input
            type="text"
            placeholder="Supplier"
            value={purchase.supplier}
            onChange={(e) => handleChange(index, "category", e.target.value)}
          />
          <input
            type="date"
            value={purchase.date}
            onChange={(e) => handleChange(index, "brand_name", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddPurchase}>
        Add Another Purchase
      </button>
      <button type="submit">Submit Purchases</button>
    </form>
  );
};

export default PurchaseForm;
