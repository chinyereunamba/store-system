import { useUserContext } from "@/store/context";
import { useSession } from "next-auth/react";

type FetchAPIProps = {
  url: string;
  body?: any;
  method: "POST" | "GET" | "DELETE" | "PUT";
  token?: string;
};

async function fetchAPI({ url, body, method, token }: FetchAPIProps) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export default fetchAPI;

async function fetchProduct() {
  const { user } = useUserContext();
  const res = await fetchAPI({
    url: "http://127.0.0.1:8000/api/v1/products",
    method: "GET",
    token: user?.access_token,
  });
  return res;
}

const fetchBrands = async () =>
  fetchAPI({
    url: "http://127.0.0.1:8000/api/v1/brands",
    method: "GET",
  });

export { fetchProduct, fetchBrands };

// Example usage
// const [brands, setBrands] = useState<any[]>([]);
// useEffect(() => {
//   fetchBrands().then(data => setBrands(data));
// }, []);
