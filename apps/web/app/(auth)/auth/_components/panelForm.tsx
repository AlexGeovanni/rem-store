
import { ReactNode } from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion } from "motion/react";
// import { ignoreCircularReferences } from "@/utils/ignore-ref";

const slideVariants = {
  enter: (cus:{direction: number,width:number}) => ({
    x: cus.direction > 0 ? cus.width : -cus.width,
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (cus:{direction: number,width:number}) => ({
    zIndex: 0,
    x: cus.direction < 0 ? cus.width : -cus.width,
    opacity: 0,
  }),
};
export function PanelForm({
  children,
  direction,
  size="186px"
}: {
  children: ReactNode;
  direction: number;
  size?:string
}) {
  const [ref, { height, width }] = useMeasure();

  const cus = {
    width:Math.floor((width/4)),
    direction,
  };

  return (
    <motion.div
      initial={{ height: size }}
      animate={{ height: height || "auto" }}
      // className="relative overflow-hidden "
      className="relative"
    >
      <AnimatePresence initial={false} custom={cus} mode="wait">
        <motion.div
        //   key={JSON.stringify(children, 
        //     // ignoreCircularReferences()
        // )}
          custom={cus}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration:.2,
            // opacity: { duration: .3},
          }}
        //   transition={{
        //     x: { type: "spring",   stiffness: 300, damping: 30,bounce:0 },
        //     opacity: { duration: 0.8 },
        //     duration:8
        //   }}
          className="w-full"
        >
          <motion.div
            ref={ref}
            className={`${
              height ? "absolute" : "relative"
            }  w-full flex flex-col justify-start space-y-4 `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
