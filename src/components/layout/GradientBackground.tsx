import { useEffect, useRef } from "react";
import "../../styles/gradient.scss";

export default function GradientBackground() {
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let rafId = 0;

    const move = () => {
      curX += (tgX - curX) / 10;
      curY += (tgY - curY) / 10;
      el.style.transform = `translate(${Math.round(curX)}px, ${Math.round(
        curY
      )}px)`;
      rafId = requestAnimationFrame(move);
    };

    const handleMove = (e: MouseEvent) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <div ref={bubbleRef} className="interactive" aria-hidden="true" />
    </div>
  );
}
