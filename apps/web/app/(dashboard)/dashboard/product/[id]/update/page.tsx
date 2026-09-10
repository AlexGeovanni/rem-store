// import { notFound } from "next/navigation";

import UpdateProductClient from "./UpdateProductClient";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function pageUpdateProduct({ params }: PageProps) {
  const { id } = await params;

  return <UpdateProductClient productId={id} />;
}
