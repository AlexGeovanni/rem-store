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
export default function MenuTabs({
  tabs,
  selectedTab,
  setSelectedTab,
  handleLogout,
}: MenuTabsProps) {
  return (
    <div>
      <nav>
        <ul className="flex space-y-2 flex-col items-center overflow-hidden">
          {tabs.map((item) => {
            const isSelected = item.id === selectedTab;
            const tabClassName = isSelected ? "border-blue-500 text-black" : "";
            return (
            <motion.li
              key={item.id}
              className={cn(
                "cursor-pointer font-medium text-zinc-500 rounded-full border-2 border-accent text-start p-3 flex-1 relative w-full hover:bg-gray-300/10",
                tabClassName,
              )}
              animate={{
                fontWeight: isSelected? "500" : "normal",
              }}
              onClick={() => setSelectedTab(item.id)}
            >
              {item.label}
            </motion.li>
          )
          })}
        </ul>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-11 border-2 cursor-pointer mt-3 rounded-full"
        >
          <LogOutIcon className="w-4 h-4" />
          Cerrar sesión
        </Button>
      </nav>
    </div>
  );
}
