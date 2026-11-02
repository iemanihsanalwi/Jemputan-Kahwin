"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * ScrollReveal - Smooth Scroll & Reveal Wrapper
 * Adds subtle fade-up entrance animations for invitation sections as the user scrolls down.
 * Efficient memory management: unregisters observer immediately after trigger and releases
 * will-change GPU layer once animation completes.
 */
export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is unavailable, immediately reveal
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      setAnimationDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
            setTimeout(() => {
              setAnimationDone(true);
            }, 850 + delayMs);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [delayMs]);

  const getTransform = () => {
    if (isVisible) {
      return "translate-x-0 translate-y-0 opacity-100 scale-100";
    }

    switch (direction) {
      case "up":
        return "translate-y-6 opacity-0 scale-[0.99]";
      case "down":
        return "-translate-y-6 opacity-0 scale-[0.99]";
      case "left":
        return "translate-x-6 opacity-0";
      case "right":
        return "-translate-x-6 opacity-0";
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: "750ms",
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${!animationDone ? "will-change-[transform,opacity]" : ""} ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}
