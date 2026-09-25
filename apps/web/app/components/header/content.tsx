"use client";
import { MenuDesktop } from "./menuDesktop";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { useAuth } from "@/app/providers/authProvider";

export default function Content() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrolledbg, setIsScrolledbg] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const path = usePathname();
  const excludedPatterns = [
    /^\/auth/,
    /^\/dashboard/,
    /^\/admin(\/|$)/, // Ejemplo extra: todo lo que comience con /admin o /admin/...
  ];
  const isHome = path=== "/";

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const diff = latestValue - (scrollY.getPrevious() ?? 0);
    const isScrollingUp = latestValue > 400;
    const isScrollingDown = diff > 0 && latestValue > 150;
    setIsScrolled(isScrollingDown);
    setIsScrolledbg(isScrollingUp)
  });
  if (excludedPatterns.some((regex) => regex.test(path))) return null;
  
  return (
    <div className={cn('h-[70px] lg:h-auto', 'lg:h-[70px] group')}>
      <motion.header
        initial={false}
        animate={isScrolled ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
        exit={isScrolled ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
        transition={isScrolledbg ? {delay:0.2, duration: 0.4 }:{delay:0, duration:0}}

        className={cn('fixed top-0 left-0  right-0 z-50 bg-background lg:transition-all lg:ease-initial lg:duration-450 lg:bg-transparent lg:hover:bg-background ',!isHome?'lg:bg-background': isScrolledbg &&'lg:bg-background')}
      >
        <MenuDesktop userName={user?.name} />
      </motion.header>  
    </div>
  );
}
