import { Outlet, useNavigate } from "react-router";
import { motion } from "motion/react";
import Logo from "../components/branding/Logo";

export default function GameWrapper() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <nav className="sticky top-0 z-[50] flex items-center gap-[12px] p-[14px_18px]">
        <button onClick={() => navigate(-1)}>← back</button>
        <div className="flex-1" />
        <div className="ml-auto">
          <Logo size={32} />
        </div>
      </nav>

      <main className="p-[20px]">
        <Outlet />
      </main>
    </motion.div>
  );
}
