import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";
import { useScreenSize } from "@workspace/ui/hooks/useScreenSize";
import { cn } from "@workspace/ui/lib/utils";
import Wrapper from "@/app/components/ui/wrapper";
import { Button } from "@workspace/ui/components/button";
import { ProductDetails } from "@repo/core/schemas/productCreate.schema";
const duration = 0.45;
const menuTabs = {
  DESCRIPCION: "Descripción del producto",
  DETALLE: "Detalles del producto",
};

interface DescriptionMoreProps {
  description: string;
  category: string;
  details: ProductDetails
}

export function DescriptionMore({description,category, details}:DescriptionMoreProps) {

  const [activeTab, setActiveTab] = useState(Object.keys(menuTabs)[0]);
  const isSmallScreen = useScreenSize(420);

  const handleTabClick = (tab: keyof typeof menuTabs) => {
    setActiveTab(tab);
  };

  return (
    <Wrapper className="px-0 xs:px-0 sm:px-0 pb-5 md:px-5 md:pb-10">
      <MotionConfig transition={{ duration }}>
        <ul className="grid grid-cols-2 pb-5">
          {Object.entries(menuTabs).map(([key, value]) => (
            <li key={key} className="relative">
              <Button
                onClick={() => handleTabClick(key as keyof typeof menuTabs)}
                className={cn(
                  "w-full h-auto border-none rounded-none p-4 hover:bg-transparent",
                  activeTab === key && "bg-gray-100 hover:bg-gray-100",
                )}
                variant="ghost"
              >
                {isSmallScreen
                  ? key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
                  : value}
                {activeTab === key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  />
                )}
              </Button>
            </li>
          ))}
        </ul>

        <div className="px-2.5 xs:px-3.5 md:px-0">
          <ResizablePanel active={activeTab === Object.keys(menuTabs)[0]}>
            {activeTab === Object.keys(menuTabs)[0] && (
              <div>
                <p>
                  {description}
                </p>
              </div>
            )}
            {activeTab === Object.keys(menuTabs)[1] && (
              <div>
                <ProductDetailsView category={category} details={details} />
              </div>
            )}
          </ResizablePanel>
        </div>
      </MotionConfig>
    </Wrapper>
  );
}

interface Props {
  category: string;
  details: ProductDetails
}

export function ProductDetailsView({ category, details }: Props) {
  switch (category) {
    case "CLOTHING":
      return (
        <div className="pt-3">
          <p>Talla: <span className="font-semibold">{details?.size}</span></p>
          <p>Color: <span className="font-semibold">{details?.color}</span> </p>
          <p>Material: <span className="font-semibold">{details?.material}</span></p>
        </div>
      );

    case "ELECTRONICS":
      return (
        <div className="pt-2.5">
          <p className="text-lg uppercase font-semibold">{details?.brand}</p>
          <p>Modelo: <span className="font-semibold"> {details?.model}</span></p>
          <p>RAM: <span className="font-semibold">{details?.ram}</span></p>
          <p>Memoria: <span className="font-semibold">{details?.memory}</span></p>
        </div>
      );

    case "HOME":
      return (
        <div>
          <p>Material: <span className="font-semibold">{details?.material}</span> </p>
          <p>Dimensiones: <span className="font-semibold">{details?.dimensions}</span></p>
          <p>Peso: <span className="font-semibold">{details?.weight}</span></p>
        </div>
      );
  }
}

function ResizablePanel({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const [ref, { height, width }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            opacity: 0,
            // x: active ? width : -width,
          }}
          animate={{
            opacity: 1,
            // x: 0,
            transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{
            opacity: 0,
            // x: !active ? -width : width,
            transition: { duration: duration / 2 },
          }}
        >
          <div ref={ref} className={`${height ? "absolute" : "relative"} `}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.

  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: unknown) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
