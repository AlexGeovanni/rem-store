
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";


interface ProductSkeletonCardProps {
  sortActive: boolean;
}

export function ProductSkeletonCard({ sortActive }: ProductSkeletonCardProps) {
  const heightSkeleton = sortActive ? "2xl:h-[520px] " : "2xl:h-[450px]";
  return (
   <div className="group relative">
     <div className=" flex flex-col space-y-3 lg:max-w-[450px]">
      <Skeleton className={cn(" bg-gray-200 w-full h-[220px] sm:h-[268px] lg:h-[350px] rounded-xl", heightSkeleton)}  />
      <div className="space-y-2">
        <Skeleton className=" bg-gray-200 h-4 w-full md:w-[calc(100%-20%)]" />
        <Skeleton className=" bg-gray-200 h-4 w-full" />
      </div>
    </div>
   </div>
  )
}