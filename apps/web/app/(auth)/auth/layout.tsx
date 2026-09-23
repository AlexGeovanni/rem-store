"use client";
// import { getAuthToken, removeAuthToken, setAuthToken } from "@/lib/actions/cookies";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex max-h-svh h-svh relative">
      <div className="hidden absolute top-0 left-0 uppercase font-black  text-black py-5.5 sm:px-5 lg:px-14 lg:text-white lg:block">
        <Link href={"/"}>Rem/store</Link>
      </div>
      <section className="hidden w-1/2 items-center justify-center bg-[#3A3AAF] p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-200 max-w-107.5 flex-col justify-center space-y-12">
          <div className="text-[#f2f2f2]">
            <h1 className="text-6xl font-title font-extrabold">
              Bienvenido a REM/STORE
            </h1>
            <p>Aqui encuentras todo lo que necesitas.</p>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 lg:justify-center lg:p-10 lg:py-0">
        <div className="w-full max-w-145 uppercase font-black  text-black py-6 mb-4 lg:hidden">
          <Link href={"/"}>Rem/store</Link>
        </div>
        {children}
      </section>
    </div>
  );
}
