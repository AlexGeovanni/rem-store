import { Skeleton } from "@workspace/ui/components/skeleton";

export default function SkeletonCart() {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        <Skeleton className="h-7 w-1/3 lg:hidden" />
        <Skeleton className="h-5 w-1/4 my-2 lg:hidden" />
      </div>
    <div className="flex flex-col lg:flex-row py-2 border-t lg:border-t-0">
      <article className="basis-2/3 lg:px-2">
        <Skeleton className="h-7 w-1/3 hidden lg:block" />
        <div className="py-3 md:py-6 relative flex items-start ">
          <Skeleton className="h-35  w-1/4 mr-4" />
          <div className="flex-1 flex justify-between">
            <Skeleton className="h-5 w-2/4" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
      </article>
      <article className="grow py-4 space-y-2 lg:px-2 lg:py-0">
        <Skeleton className="h-7 w-2/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-8 " />
        <Skeleton className="h-11 w-5/5 rounded-full mt-4" />
      </article>
    </div>
    </div>
  );
}
