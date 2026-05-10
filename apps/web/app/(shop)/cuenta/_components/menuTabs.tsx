import { motion } from "motion/react";
import { Tab } from "../page";
import { LogOutIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";


interface MenuTabsProps {
  tabs: Tab[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  handleLogout: () => void;
}
export default function MenuTabs({ tabs, selectedTab, setSelectedTab, handleLogout }: MenuTabsProps) {
  return (
    <div>
      <nav >
        <ul className="flex flex-col items-center overflow-hidden">
          {tabs.map((item) => (
            <motion.li
              key={item.id}
              className={cn("cursor-pointer text-start p-3 flex-1 relative w-full hover:bg-gray-300/10", item.id === selectedTab ? "bg-amber-600/10" : "")}
              animate={{
                fontWeight: item.id === selectedTab ? "500" : "normal",
              }}
              onClick={() => setSelectedTab(item.id)}
            >
              {item.label}
              {item.id === selectedTab && (
                // <motion.div
                //   layoutId="underline"
                //   id="underline"
                //   exit={{
                //     width: 0,
                //   }}
                //   className="absolute top-0 right-0 w-0.5 h-full bg-primary"
                // />
                <motion.div
                  layoutId="active-underline"
                  className="absolute h-full top-0 right-0 w-0.5 z-10 rounded-full bg-amber-600"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                ></motion.div>
              ) }
            </motion.li>
          ))}
        </ul>
        <Button onClick={handleLogout} variant="outline" className="w-full h-10 cursor-pointer mt-4 rounded-full box-shadow-none">
          <LogOutIcon className="w-4 h-4" />
          Cerrar sesión
        </Button>
      </nav>
    </div>
  );
}
