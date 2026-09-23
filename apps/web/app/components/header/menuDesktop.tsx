import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserActions from "./userActions";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import { cn } from "@workspace/ui/lib/utils";
import { useScreenSize } from "@workspace/ui/hooks/useScreenSize";
import { MenuMobile } from "./menuMobile";

export const components: {
  title: string;
  href: string;
  items?: { title: string; href: string }[];
}[] = [
  {
    title: "Moda",
    href: "/s/moda",
    items: [
      // {
      //   title:"Hombre",
      //   href:"/s/moda"
      // },
      // {
      //   title:"Mujer",
      //   href:"/s/moda"
      // },{
      //   title:"Niña y Niño",
      //   href:"/s/moda"
      // }
    ],
  },
  {
    title: "Electronicos",
    href: "/s/electronica",
    items: [
      // {
      //   title:"Celular",
      //   href:"/s/electronica"
      // },
      // {
      //   title:"Laptop",
      //   href:"/s/electronica"
      // },
      // {
      //   title:"Otros",
      //   href:"/s/electronica"
      // }
    ],
  },
  {
    title: "Hogar",
    href: "/s/hogar",
    items: [
      // {
      //   title:"Sillas y bancos",
      //   href:"/s/hogar"
      // },
      // {
      //   title:"Estantes y libreros",
      //   href:"/s/hogar"
      // },
      // {
      //   title:"Mesas de comedor",
      //   href:"/s/hogar"
      // }
    ],
  },
];

// const triggerStyle = cva("tracking-wide text-base cursor-pointer [&_svg]:hidden bg-transparent underline-offset-6 decoration-[1.5px] focus:bg-transparent hover:bg-transparent hover:underline data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:hover:underline data-[state=open]:focus:bg-transparent")

interface MenuDesktopProps {
  userName?: string | null;
}

export function MenuDesktop({ userName }: MenuDesktopProps) {
  const isMobile = useScreenSize(768);
  //   const { onclick } = useOnclickAuth();
  const router = useRouter();

  const onClickLogin = () => {
    router.push("/auth/iniciar-sesion");
  };
  const onClickProfile = () => {
    router.push("/cuenta");
  };

  return (
    <>
      <NavigationMenu
        className=" relative lg:block w-full max-w-full block "
        viewport={isMobile}
      >
        <NavigationMenuList className="p-3 lg:px-0 lg:py-3 w-full flex space-x-4 lg:space-x-0 lg:justify-between sm:px-5 lg:px-14">
          <div className="cursor-pointer mr-auto">
            <Link href={"/"} className="font-title uppercase font-black">
              Rem/store
            </Link>
          </div>
          <div className="group hidden lg:flex flex-1 list-none items-center justify-center">
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/s/moda");
                }}
              >
                {components[0]?.title}
              </NavigationMenuLink>
              {/* <NavigationMenuTrigger
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push("/s/moda");
              }}
            >
              {components[0]?.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="flex justify-center gap-24 lg:gap-28 p-4 w-full  ">
                {components[0]?.items?.map((item) => (
                  <li key={item?.title}>
                    <Link href={item.href} className="font-semibold text-sm">{item?.title}</Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent> */}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/s/electronica");
                }}
              >
                {components[1]?.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/s/hogar");
                }}
              >
                {components[2]?.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
          <UserActions
            onClickLogin={onClickLogin}
            onClickProfile={onClickProfile}
            userName={userName}
          />
          <MenuMobile
            onClickLogin={onClickLogin}
            onClickProfile={onClickProfile}
            userName={userName}
          />
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

type AnchorProps = React.JSX.IntrinsicElements["a"];
const ListItem = React.forwardRef<
  HTMLAnchorElement,
  AnchorProps & { title: string; children: React.ReactNode }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "text-lg font-bold block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="leading-none font-satoshi font-bold">{title}</div>
          <ul className="group flex flex-col font-pluJarkarta font-medium text-sm text-gray-600 py-2 gap-1">
            {children}
          </ul>
        </a>
      </NavigationMenuLink>
    </li>
    // <li {...props}>
    //   <NavigationMenuLink asChild>
    //     <Link href={href}>
    //       <div className="text-sm leading-none font-medium">{title}</div>
    //       <ul className="text-muted-foreground line-clamp-2 text-sm leading-snug">
    //         {children}
    //       </ul>
    //     </Link>
    //   </NavigationMenuLink>
    // </li>
  );
});
ListItem.displayName = "ListItem";
