import { motion } from "motion/react";
import logoSrc from "../assets/logo.png";

export default function Logo({ className = "", size = 40 }) {
  return (
    <motion.img
      src={logoSrc}
      alt="GameStudio by Louise"
      className={className}
      style={{ width: size, height: size }}
      layoutId="brand-logo"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
}
