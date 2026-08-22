import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[92rem] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20", className)}>{children}</div>
  );
}
