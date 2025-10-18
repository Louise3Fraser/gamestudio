"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { MotionValue, SpringOptions } from "motion";

type DockItemData = {
  img: string;
  alt?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
};

type DockProps = {
  items: DockItemData[];
  spring?: SpringOptions;
  magnification?: number; // px
  distance?: number; // px (influence radius)
  panelHeight?: number; // px (collapsed height)
  dockHeight?: number; // px (min expanded height)
  baseItemSize?: number; // px
};

type DockItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  className?: string;
};

function DockItem({
  children,
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect =
      ref.current?.getBoundingClientRect() ??
      ({
        x: 0,
        width: baseItemSize,
      } as DOMRect);
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className="
        relative
        inline-flex
        items-center
        justify-center
        rounded-[30px]
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]
        cursor-pointer
        outline-none
  "
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(
        children as React.ReactElement | React.ReactElement[],
        (child) =>
          cloneElement(
            child as React.ReactElement,
            { isHovered } as unknown as { isHovered: MotionValue<number> }
          )
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  children: React.ReactNode;
  className?: string;
  isHovered: MotionValue<number>;
};

function DockLabel({ children, className = "", ...rest }: DockLabelProps) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ item }: { item: DockItemData }) {
  return (
    <img
      className={"flex w-full items-center justify-center"}
      src={item.img}
      alt={item.alt || "game icon"}
    />
  );
}

export default function Dock({
  items,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: "none" }}>
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`absolute 
          bottom-[45%] 
          left-1/2 
          flex 
          items-end 
          w-fit 
          gap-[25px] 
          rounded-[25px] 
          border-2 
          border-dock-stroke 
          -translate-x-1/2 
          [background:linear-gradient(to_bottom,var(--color-dock-bg-1),var(--color-dock-bg-2))] 
          backdrop-blur-[22px]
          p-[20px_30px]`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => {
          return (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon item={item} />
              {/* <DockLabel>{item.label}</DockLabel> */}
            </DockItem>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
