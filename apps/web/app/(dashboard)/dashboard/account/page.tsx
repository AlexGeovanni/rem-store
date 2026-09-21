"use client";

import { Fragment } from "react";
import ProfileForm from "./_components/account/profileForm";
import SupportAccess from "./_components/account/supportAccess";
import { useBusinessUser } from "@/app/hooks/useBusinessUser";
import SkeletonDefault from "../_components/skeleton/skeletonDefault";
export default function PageAccount() {
  const { data: user, isLoading, isError } = useBusinessUser();

  return (
    <Fragment>
      {isLoading ? (
        <SkeletonDefault />
      ) : (
        <>
          <div>
            <h1 className="text-lg lg:text-2xl font-medium">
              Configuracion de cuenta
            </h1>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 space-y-4 w-full">
            <ProfileForm user={user} />
            <SupportAccess />
          </div>
        </>
      )}
    </Fragment>
  );
}
