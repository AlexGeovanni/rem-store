import { Fragment } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";

export default function SkeletonDefault () {
  return (
    <Fragment>
      <Skeleton className=" h-12 w-1/3 rounded-xl" />
      <Skeleton className=" min-h-[calc(100vh-var(--header-height)-2rem)]  rounded-xl" />
    </Fragment>
  );
}
