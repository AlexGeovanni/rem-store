import { type Product } from "@repo/core/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import ProductCard from "./productCard";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface ProductCarouselProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductCarousel({ products, isLoading }: ProductCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      hidden={false}
      className="w-full"
      //   classNameParent="overflow-visible"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {isLoading || !products
          ? Array.from({ length: 4 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="pl-2 md:pl-4 basis-[60%] sm:basis-[40%]  lg:basis-[32%]"
              >
                <Skeleton className="w-full max-h-140 h-78 xsm:h-90 sm:h-100 md:h-110 lg:h-full" />
              </CarouselItem>
            ))
          : products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-[60%] sm:basis-[40%]  md-medium:basis-[35%] lg:basis-[32%]"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
