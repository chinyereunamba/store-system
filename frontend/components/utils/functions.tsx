import { useSession } from "next-auth/react";

type FetchAPIProps = {
  url: string;
  body?: any;
  method: "POST" | "GET" | "DELETE" | "PUT";
  token?: string;
};

async function fetchAPI({ url, body, method, token }: FetchAPIProps):Promise<[]> {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data:[] = await response.json();
  return data;
}

export default fetchAPI;

async function fetchProduct() {
  const res = await fetchAPI({
    url: "http://127.0.0.1:8000/api/v1/products",
    method: "GET",
  });
  return res;
}

const fetchBrands = async () => {
  const { data: session } = useSession()
  fetchAPI({
    url: "http://127.0.0.1:8000/api/v1/brands",
    method: "GET",
    token: session?.user?.access
  });
}
export { fetchProduct, fetchBrands };

// Example usage
// const [brands, setBrands] = useState<any[]>([]);
// useEffect(() => {
//   fetchBrands().then(data => setBrands(data));
// }, []);
