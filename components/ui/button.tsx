import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "red";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // Variants
          variant === "default" &&
            "bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] focus-visible:ring-[var(--accent-primary)]",
          variant === "secondary" &&
            "bg-[var(--surface-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)]",
          variant === "outline" &&
            "border border-[var(--border-color)] bg-transparent hover:bg-[var(--surface-secondary)] text-[var(--text-primary)]",
          variant === "ghost" &&
            "hover:bg-[var(--surface-secondary)] text-[var(--text-primary)]",
          variant === "link" &&
            "text-[var(--accent-primary)] underline-offset-4 hover:underline",
          variant === "red" &&
            "bg-[var(--red-accent)] text-white hover:bg-[var(--red-accent-hover)] focus-visible:ring-[var(--red-accent)]",
          // Sizes
          size === "default" && "h-10 px-4 py-2 text-sm",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-12 px-8 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
