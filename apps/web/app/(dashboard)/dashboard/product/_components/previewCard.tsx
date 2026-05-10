import { ProductSkeletonCard } from "@/app/components/productCardSkeleton";
// import CardProduct from "@/components/card-product";

export default function PreviewCard() {
  return (
    <div className="h-full w-full bg-gray-200/40 border p-2 rounded-lg relative flex justify-center items-center">
      <div className="sticky top-16 left-0 bg-white z-5 w-[295px] p-1 rounded-lg">
        {true ? (
          // <CardProduct
          //   key={"x"}
          //   idProduct={`${1}-`}
          // />
          <></>
        ) : (
          <ProductSkeletonCard sortActive={false} />
        )}
      </div>
    </div>
  );
}
