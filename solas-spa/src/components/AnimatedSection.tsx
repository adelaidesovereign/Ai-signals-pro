"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: directionOffset[direction].y,
        x: directionOffset[direction].x,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : {
              opacity: 0,
              y: directionOffset[direction].y,
              x: directionOffset[direction].x,
            }
      }
      transition={{
        duration: 0.9,
        delay,
        ease: easeExpo,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  baseDelay?: number;
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 0.1,
  baseDelay = 0,
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: baseDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: easeExpo },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  className = "",
  speed = 0.3,
  children,
}: {
  className?: string;
  speed?: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ scale: 1.15 }}
      animate={isInView ? { scale: 1 } : { scale: 1.15 }}
      transition={{ duration: 1.6, ease: easeExpo }}
    >
      <motion.div
        style={{ y: isInView ? `-${speed * 20}%` : "0%" }}
        transition={{ duration: 1.2, ease: easeExpo }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.8, delay, ease: easeExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function LineReveal({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className={`h-px bg-forest/15 origin-left ${className}`}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.2, delay, ease: easeExpo }}
    />
  );
}
