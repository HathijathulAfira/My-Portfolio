"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./Skills.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Skills({ categories, softSkills }) {
  const ref = useRef(null);
  useScrollReveal(ref, { stagger: `.${styles.card}` });

  const softRef = useRef(null);
  useScrollReveal(softRef, { stagger: `.${styles.chip}`, start: "top 90%" });

  return (
    <section id="skills" className={`${section.section} ${section.altBg}`}>
      <div className={section.inner}>
        <span className={section.eyebrow}>Skills</span>
        <h2 className={section.heading}>What I build with.</h2>

        <div ref={ref} className={styles.grid}>
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className={styles.card}>
              <h3 className={styles.cardTitle}>{category}</h3>
              <ul className={styles.itemList}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={softRef} className={styles.softSkills}>
          <span className={styles.softLabel}>Soft skills</span>
          <div className={styles.chipRow}>
            {softSkills.map((skill) => (
              <span key={skill} className={styles.chip}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
