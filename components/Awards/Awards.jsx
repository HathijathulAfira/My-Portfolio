"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./Awards.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Awards({ items }) {
  const ref = useRef(null);
  useScrollReveal(ref, { stagger: `.${styles.card}` });

  return (
    <section id="awards" className={`${section.section} ${section.altBg}`}>
      <div className={section.inner}>
        <span className={section.eyebrow}>Awards & Recognition</span>
        <h2 className={section.heading}>Milestones along the way.</h2>

        <div ref={ref} className={styles.grid}>
          {items.map((award) => (
            <div key={award.title} className={styles.card}>
              <h3 className={styles.title}>{award.title}</h3>
              <p className={styles.place}>{award.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
