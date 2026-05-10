import { useState, useEffect } from "react";

export const useScreenSize= (maxWidth: number): boolean => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window?.innerWidth < maxWidth);
      };
      handleResize()
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [maxWidth]);
  
    return isSmallScreen;
  };