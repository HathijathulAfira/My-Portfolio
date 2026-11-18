"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Fades + slides an element (or its stagger children) into view the first
 * time it scrolls into the viewport. Shared by every section below the
 * hero so the reveal timing/feel stays consistent site-wide.
 *
 * @param {React.RefObject} ref - container element to observe
 * @param {Object} [options]
 * @param {number} [options.y=40] - starting vertical offset in px
 * @param {string} [options.stagger] - selector for children to stagger in
 *   (relative to ref.current); if omitted, ref.current itself animates
 * @param {string} [options.start="top 82%"] - ScrollTrigger start position
 */
export function useScrollReveal(ref, options = {}) {
  const { y = 40, stagger, start = "top 82%" } = options;

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const targets = stagger
        ? ref.current.querySelectorAll(stagger)
        : ref.current;

      if (stagger && targets.length === 0) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: {
            trigger: ref.current,
            start,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, y, stagger, start]);
}
