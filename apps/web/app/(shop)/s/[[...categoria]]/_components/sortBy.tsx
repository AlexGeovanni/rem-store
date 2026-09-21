import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { SORTBY, TypeSortBy } from "../data/constants";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ParamsInter } from "../page";

interface SortByProps {
  sortActive: boolean;
  setSortActive: (sortActive: boolean) => void; 
  params: ParamsInter;
}
export default function SortBy({
  sortActive,
  setSortActive,
  params: queryParams,
}: SortByProps) {

  const refDiv = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const selectedSort =
    queryParams.sortBy === "price"
      ? queryParams.direction
      : queryParams.sortBy;
  const sortByName = SORTBY.find((item) => item.key === selectedSort)?.label;

  const cambiarCategoria = (categoria: string) => {
    const params = new URLSearchParams(window.location.search);

    if (categoria === "createdAt") {
      params.set("sortBy", "createdAt");
      params.set("direction", "desc");
    } else {
      params.set("sortBy", "price");
      params.set("direction", categoria);
    }

    // Al cambiar el orden, volver a la primera página.
    params.delete("page");
    params.delete("pagina");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onclick = () => {
    setSortActive(!sortActive);
  };

  const handleSortByName = (name: TypeSortBy) => {
    setSortActive(false);
    cambiarCategoria(name.key);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refDiv.current && !refDiv.current.contains(e.target as Node)) {
        setSortActive(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setSortActive]);

  return (
    <div ref={refDiv}>
      <button
        onClick={onclick}
        tabIndex={0}
        className="pl-2 font-medium cursor-pointer flex items-center justify-center"
      >
        Ordenar por{" "}
        <span className="text-gray-500">
          {sortByName ? `: ${sortByName}` : ""}
        </span>
        <motion.div
          className="pt-1.5"
          initial={{ rotate: 0 }}
          animate={{ rotate: sortActive ? -180 : 0, y: sortActive ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </motion.div>
      </button>
      <div className="absolute -top-3-0 -right-1 z-20 ">
        <AnimatePresence>
          {sortActive && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-right bg-white  p-3  rounded-lg  w-auto pl-6 pr-4"
            >
              {SORTBY.map((item: TypeSortBy, index: number) => (
                <li
                  key={index}
                  className="py-1 font-medium  cursor-pointer hover:text-gray-400"
                  onClick={() => handleSortByName(item)}
                >
                  {item.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
