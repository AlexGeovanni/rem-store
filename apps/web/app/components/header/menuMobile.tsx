"use client"

import { Button } from "@workspace/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { components } from "./menuDesktop";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "./userActions";

interface MenuMobileProps {
  userName?: string | null;
  onClickLogin: () => void;
  onClickProfile: () => void;
}

export function MenuMobile({
  userName,
  onClickLogin,
  onClickProfile,
}: MenuMobileProps) {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleCloseAndProfile=()=>{
    setOpen(false);
    onClickProfile();
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild className="lg:hidden">
        <Button
          variant="outline"
          className="rounded-full size-9 cursor-pointer border-none"
        >
          <Menu className="size-7" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <div className=" flex justify-end">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="rounded-full size-9 cursor-pointer "
              >
                <X />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <ul className="">
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/s/moda");
                }}
                href={""}
                className="font-medium text-xl block py-3 px-1 hover:text-zinc-500"
              >
                <DrawerTrigger className="cursor-pointer">{components[0]?.title}</DrawerTrigger>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/s/electronica");
                }}
                href={""}
                className="font-medium text-xl block py-3 px-1 hover:text-zinc-500"
              >
                <DrawerTrigger className="cursor-pointer">{components[1]?.title}</DrawerTrigger>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/s/hogar");
                }}
                href={""}
                className="font-medium text-xl block py-3 px-1 hover:text-zinc-500"
              >
                <DrawerTrigger className="cursor-pointer">{components[2]?.title}</DrawerTrigger>
              </Link>
            </li>
          </ul>
        </div>
        <DrawerFooter>
          {!!userName ? (
            <UserAvatar user={userName} onClickProfile={handleCloseAndProfile} />
          ) : (
            <div className="flex space-x-1.5 xsm:space-x-3">
              <ButtonBase onClick={onClickLogin} className="flex-0 px-6 h-10">
                Únete
              </ButtonBase>
              <Button
                onClick={onClickLogin}
                variant={"outline"}
                className="cursor-pointer px-6 xsm:px-12 h-10 rounded-full"
              >
                Inicia sesión
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
