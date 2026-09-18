import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "subtle";
};

export function Button({
  children,
  className = "",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <a className={`button ${variant === "primary" ? "primary" : ""} ${variant === "subtle" ? "subtle" : ""} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
