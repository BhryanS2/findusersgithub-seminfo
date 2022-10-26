import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../css/components/button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDanger?: boolean;
  children?: ReactNode;
};

export function Button({ children, isDanger, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${isDanger ? styles.button__danger : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
