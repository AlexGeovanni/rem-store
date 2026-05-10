
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { cn } from "../lib/utils";

const buttonStyles = cva(
  "flex-1 rounded-full bg-[#000000] hover:bg-[#1d1d1d] cursor-pointer"
);

export default function ButtonBase({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button className={cn(buttonStyles(), className)} {...props}>
      {children}
    </Button>
  );
}
