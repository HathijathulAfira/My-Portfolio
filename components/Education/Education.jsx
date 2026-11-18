"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./Education.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Education({ degree, institution, detail }) {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section id="education" className={section.section}>
      <div className={section.inner}>
        <span className={section.eyebrow}>Education</span>
        <h2 className={section.heading}>Where it started.</h2>

        <div ref={ref} className={styles.card}>
          <div className={styles.markerCol}>
            <span className={styles.markerDot} />
          </div>
          <div>
            <h3 className={styles.degree}>{degree}</h3>
            <p className={styles.institution}>{institution}</p>
            <p className={styles.detail}>{detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
