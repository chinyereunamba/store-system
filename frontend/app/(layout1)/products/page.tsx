
import ProductComponent from "@/components/dashboard/ProductPage";
import { Product } from "./columns";
import { axiosInstance } from "@/lib/utils";

async function getData(): Promise<Product[]> {
  const data = axiosInstance.get("/v1/products/").then(res => {
    if (res.status == 200) {
      return res.data
    }else{
      throw new Error('There was an error out there')
    }
  })
  return data
}

export default async function ProductPage() {
  const data = await getData();
  return <ProductComponent data={data} />;
}
