"use client";

import ResumenCart from "./_components/resumenCart";
import CardItem from "./_components/cardItem";
import Wrapper from "@/app/components/ui/wrapper";
import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from "@/app/stores/useCartStore";
import { useAuth } from "@/app/providers/authProvider";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { Fragment } from "react";
import SkeletonCart from "./_components/skeletonCart";

export default function CarritoPage() {
  const { isAuthenticated } = useAuth();

  const { items, updateItem, removeItem, isLoading } = useCart();

  const onclickCountPlus = (item: CartItem) => {
    if (item.quantity >= item.stock) {
      return;
    }
    updateItem(item.productId, item.quantity + 1);
  };

  const onclickCountMinus = (item: CartItem) => {
    if (item.quantity === 1) {
      removeItem(item.productId);
      return;
    }
    updateItem(item.productId, item.quantity - 1);
  };

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  // const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);s
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const isNotEmpty = totalItems > 0;

  return (
    <main>
      <Wrapper className="max-w-275 w-full min-h-[85svh]">
        {isLoading ? (
          <SkeletonCart />
        ) : (
          <Fragment>
            <div className="flex gap-y-0.5 flex-col justify-center items-center mb-4 lg:hidden">
              <h2 className=" font-satoshi font-medium text-2xl  ">
                Carrito de compras
              </h2>
              <div className="flex gap-1">
                <p className="text-gray-600">{totalItems} productos |</p>
                {isNotEmpty ? (
                  <span className="pl-0.5">${subtotal}</span>
                ) : (
                  <span>--</span>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row py-2 border-t lg:border-t-0">
              <article className="basis-2/3 lg:px-2">
                <h2 className="hidden font-satoshi font-medium text-2xl mb-4 lg:block">
                  Carrito de compras
                </h2>
                <div className="flex flex-col">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <CardItem
                        key={item.id}
                        item={item}
                        onclickCountMinus={onclickCountMinus}
                        onclickCountPlus={onclickCountPlus}
                      />
                    ))
                  ) : (
                    <div className="min-h-50 text-gray-600 flex justify-center items-center lg:block">
                      No hay productos en el carrito
                    </div>
                  )}
                </div>
              </article>
              <article className="grow lg:px-2 ">
                <ResumenCart
                  subtotal={subtotal}
                  total={subtotal}
                  isNotEmpty={isNotEmpty}
                />
              </article>
            </div>
            {!isAuthenticated && (
              <div className="">
                <h3 className="text-xl font-semibold">Favoritos</h3>
                <p className="inline-block">¿Quieres ver tus favoritos?</p>
                <Link
                  href={"/"}
                  className="font-medium underline pl-1 underline-offset-2"
                >
                  Únete
                </Link>{" "}
                o{" "}
                <Link
                  href={"/"}
                  className="font-medium underline text-nowrap underline-offset-2"
                >
                  {" "}
                  Iniciar sesión
                </Link>
              </div>
            )}
            <div className="fixed left-0 right-0 bottom-0 z-10 bg-white border-t px-3.5 py-3 lg:hidden lg:opacity-0">
              <ButtonBase className="w-full py-6">Comprar</ButtonBase>
            </div>
          </Fragment>
        )}
      </Wrapper>
    </main>
  );
}
