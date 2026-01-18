import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  shadowColor?: string;
  textColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

export function Button({
  className = "",
  shadowColor = "rgba(0,0,0,1)",
  textColor = "text-black",
  backgroundColor = "bg-white",
  children,
  style,
  ...props
}: ButtonProps) {
  const isTailwindBg = backgroundColor.startsWith("bg-");
  const isTailwindText = textColor.startsWith("text-");

  const bgClass = isTailwindBg ? backgroundColor : "";
  const textClass = isTailwindText ? textColor : "";

  const customStyle: React.CSSProperties = {
    ...style,
    backgroundColor: !isTailwindBg ? backgroundColor : undefined,
    color: !isTailwindText ? textColor : undefined,
    boxShadow: `-4px 4px 0px 0px ${shadowColor}`,
  };

  return (
    <button
      className={`
        group flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-black 
        font-semibold transition-all whitespace-nowrap
        hover:-translate-x-[2px] hover:translate-y-[2px] 
        hover:shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)] 
        active:-translate-x-[4px] active:translate-y-[4px] active:shadow-none
        ${bgClass} ${textClass} ${className}
      `}
      style={customStyle}
      {...props}
    >
      {children}
    </button>
  );
}
