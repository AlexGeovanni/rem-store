
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SORTBY } from "../data/constants";
import { ArrowDown, ChevronDown } from "lucide-react";


interface SortByProps {
  sortActive: boolean;
  setSortActive: (sortActive: boolean) => void;
}
export default function SortBy({ sortActive, setSortActive }: SortByProps) {
  const [sortByName, setSortByName] = useState<keyof typeof SORTBY | undefined>(
    undefined
  );
  const refDiv = useRef<HTMLUListElement>(null);
  const onclick = () => {
    setSortActive(!sortActive);
    // alert("Ordernar por");
  };
  const handleSortByName = (name: keyof typeof SORTBY) => {
    setSortByName(name);
    setSortActive(false);
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
  }, [sortActive, sortByName]);

  return (
    <div>
      <button
        onClick={onclick}
        tabIndex={0}
        className="pl-2 font-medium cursor-pointer flex items-center justify-center"
      >
        Ordenar por <span className="text-gray-500">{sortByName ? `: ${sortByName}` : ""}</span>
        <motion.div
          className="pt-1.5"
          initial={{ rotate: 0 }}
          animate={{ rotate: sortActive ? -180 : 0, y:sortActive ?5:0 }}
          transition={{ duration: 0.3 }}
        >
            <ChevronDown />
        </motion.div>
      </button>
      <div className="absolute -top-3-0 -right-1 z-20 ">
        <AnimatePresence>
          {sortActive && (
            <motion.ul
              ref={refDiv}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-right bg-white  p-3  rounded-lg  w-auto pl-6 pr-4"
            >
              {Object.values(SORTBY).map((item: string, index: number) => (
                <li
                  key={index}
                  className="py-1 font-medium  cursor-pointer hover:text-gray-400"
                  onClick={() => handleSortByName(item as keyof typeof SORTBY)}
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
