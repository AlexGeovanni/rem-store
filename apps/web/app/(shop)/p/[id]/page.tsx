import { notFound } from "next/navigation";
import ProductView from "./productView";

async function getProduct(id: string) {
  const res = await fetch(
    `http://localhost:8080/api/v1/products/detail/${id}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const errorText = await res.text();
  console.error("API ERROR:", res.status, errorText);
  return null;
  }

  return res.json();
}

export default async function PageProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct(id);
  if (!data) {
    notFound();
  }
  return (
    <main>
      <ProductView data={data} />
    </main>
  );
}
