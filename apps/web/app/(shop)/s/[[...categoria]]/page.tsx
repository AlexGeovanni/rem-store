
import Wrapper from "@/app/components/ui/wrapper";
import { redirect } from "next/navigation";
import TiendaView from "./tiendaView";

// Categorías válidas
const CATEGORIAS_VALIDAS = ['moda', 'electronico', 'hogar'] as const;
type CategoriaValida = typeof CATEGORIAS_VALIDAS[number] | undefined;

// Mapeo de categorías URL a categorías de datos
const CATEGORIA_MAP: Record<string, string> = {
  'moda': 'fashion',
  'electronico': 'electronic',
  'hogar': 'home',
};

// Títulos por categoría
const TITULOS_CATEGORIA: Record<string, string> = {
  'moda': 'Colección de Moda',
  'electronico': 'Electrónicos',
  'hogar': 'Artículos para el Hogar',
};

interface TiendaPageProps {
  params: Promise<{
    categoria?: string[];
  }>;
}

export default async function TiendaPage({ params }: TiendaPageProps) {
  const { categoria } = await params;
  console.log('Categoría URL:', categoria);
  // Si no hay categoría, mostrar todos los productos
  const categoriaUrl = categoria?.[0] as CategoriaValida;
  
  // Si hay categoría pero no es válida, mostrar 404
  if (categoriaUrl && !CATEGORIAS_VALIDAS.includes(categoriaUrl)) {
    return redirect('/s');
  }
  
  // Obtener la categoría de datos correspondiente
  const categoriaData = categoriaUrl ? CATEGORIA_MAP[categoriaUrl] : undefined;
  const titulo = categoriaUrl ? TITULOS_CATEGORIA[categoriaUrl] : 'Todos los Productos';
  
  return (
    <main>
      <Wrapper>
        <article className="py-5 text-center">
          <h2 className="font-title font-semibold tracking-tight uppercase text-xl xsm:text-2xl lg:text-4xl">
            {titulo}
          </h2>
        </article>
      </Wrapper>
      <TiendaView categoria={categoriaData} categoriaUrl={categoriaUrl} />
    </main>
  );
}

// Generar metadata dinámica
export async function generateMetadata({ params }: TiendaPageProps) {
  const { categoria } = await params;
  const categoriaUrl = categoria?.[0];
  
  if (!categoriaUrl) {
    return {
      title: 'Tienda - Todos los Productos',
      description: 'Explora todos nuestros productos',
    };
  }
  
  const titulo = TITULOS_CATEGORIA[categoriaUrl] || 'Tienda';
  
  return {
    title: `${titulo} - Tienda`,
    description: `Explora nuestra colección de ${titulo.toLowerCase()}`,
  };
}
