import { Skeleton } from "@workspace/ui/components/skeleton";
import { Fragment } from "react";

export default function SkeletonAccount() {
  return (
    <Fragment>
      <div className="md:col-span-1 space-y-2">
        <Skeleton className=" h-12 rounded-full" />
        <Skeleton className=" h-12 rounded-full" />
      </div>
        <div className="md:col-span-4 ">
          <Skeleton className=" h-12 w-2/4 mb-6" />
          <Skeleton className=" h-10 w-1/4 mb-4" />
          <div className="space-y-3 mb-3">
            <Skeleton className=" h-15 w-15 rounded-full" />
            <Skeleton className=" h-16 " />
          <Skeleton className=" h-16 " />
          <Skeleton className=" h-16 " />
          </div>
          <div className="flex justify-end gap-3">
            <Skeleton className=" h-11 rounded-full w-3/12" />
            <Skeleton className=" h-11 rounded-full w-2/12" />
          </div>
        </div>
    </Fragment>
  );
}
