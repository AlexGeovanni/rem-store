
import Wrapper from "@/app/components/ui/wrapper";
import { redirect } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  isValidCategorySlug,
} from "@repo/core/constants/categories";
import TiendaView from "./tiendaView";

interface TiendaPageProps {
  params: Promise<{
    categoria?: string[];
  }>;
}

export default async function TiendaPage({ params }: TiendaPageProps) {
  const { categoria } = await params;
  const categoriaUrl = categoria?.[0];

  if (categoriaUrl && !isValidCategorySlug(categoriaUrl)) {
    return redirect("/s");
  }

  const category = categoriaUrl ? getCategoryBySlug(categoriaUrl) : undefined;
  const titulo = category?.shopTitle ?? "Todos los Productos";

  return (
    <main>
      <Wrapper>
        <article className="py-5 text-center">
          <h2 className="font-title font-semibold tracking-tight uppercase text-xl xsm:text-2xl lg:text-4xl">
            {titulo}
          </h2>
        </article>
      </Wrapper>
      <TiendaView
        categoria={category?.key}
        categoriaUrl={categoriaUrl}
      />
    </main>
  );
}

export async function generateMetadata({ params }: TiendaPageProps) {
  const { categoria } = await params;
  const categoriaUrl = categoria?.[0];

  if (!categoriaUrl) {
    return {
      title: "Tienda - Todos los Productos",
      description: "Explora todos nuestros productos",
    };
  }

  const category = getCategoryBySlug(categoriaUrl);
  const titulo = category?.shopTitle ?? "Tienda";

  return {
    title: `${titulo} - Tienda`,
    description: `Explora nuestra colección de ${titulo.toLowerCase()}`,
  };
}
