type FetchAPIProps = {
  url: string;
  body?: any;
  method: "POST" | "GET" | "DELETE" | "PUT";
};
async function fetchAPI(
  url: string,
  method: "POST" | "GET" | "DELETE" | "PUT"
) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export default fetchAPI

async function fetchProduct() {
  const res = await fetch("http://127.0.0.1/api/v1/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data:[] = await res.json()
  return data
}

export {fetchProduct}