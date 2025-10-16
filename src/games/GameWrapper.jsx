import { Outlet, useNavigate } from "react-router";
import { motion } from "motion/react";
import Logo from "../assets/logo.png";
import "../App.css";

export default function GameWrapper() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="game-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <nav className="game-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← back
        </button>

        {/* Spacer to push logo right (or use justify-between) */}
        <div className="nav-spacer" />

        {/* Same layoutId, new position: top-right */}
        <Logo size={32} className="logo-right" />
      </nav>

      <main className="game-content">
        <Outlet />
      </main>
    </motion.div>
  );
}
