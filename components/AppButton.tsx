import { ReactNode } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  type: "primary" | "outline" | "submit";
  children?: ReactNode;
  className?: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  corner?: "default" | "rounded";
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
};

/**
 * Reusable button component that can be used throughout the application.
 * It supports different types, sizes, and can be used as a link or a regular button
 *
 * @param {Object} props - The properties for the button component.
 * @param {ReactNode} props.children - The content of the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.type="primary"] - The type of button, either "primary" or "outline".
 * @param {string} [props.url] - If provided, the button will act as a link to this URL.
 * @param {string} [props.size="md"] - The size of the button, can be "md", "sm", or "lg".
 * @param {ReactNode} [props.icon] - An icon to display inside the button.
 * @param {function} [props.onClick] - A function to call when the button is clicked.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @return {JSX.Element} The rendered button component.
 *
 * @author Mohamed Mouloudj
 * */
function AppButton({
  children,
  className = "",
  size = "md",
  type = "primary",
  corner = "default",
  url = "",
  icon,
  onClick,
  disabled = false,
  dir = "ltr",
}: ButtonProps) {
  const sizeClasses = {
    sm: "text-button-sm sm:text-button-md px-3 sm:px-4 h-8 sm:h-10",
    md: "text-button-md sm:text-button-lg px-4 sm:px-5 h-10 sm:h-12",
    lg: "text-button-lg sm:text-xl px-5 sm:px-7 h-12 sm:h-14",
  };

  return (
    <ShadcnButton
      className={cn(
        "font-medium transition-all flex-center cursor-pointer",
        sizeClasses[size],
        (type === "primary" || type === "submit") &&
          "bg-primary-500 text-white hover:bg-primary-400",
        type === "outline" &&
          "border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-100 hover:text-primary-400",
        corner === "rounded" && "rounded-full",
        corner === "default" && "rounded-md",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      dir={dir}
    >
      {icon} {url ? <Link href={url}>{children}</Link> : children}
    </ShadcnButton>
  );
}

export default AppButton;
