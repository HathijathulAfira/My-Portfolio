"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./Experience.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Experience({ items }) {
  const ref = useRef(null);
  useScrollReveal(ref, { stagger: `.${styles.item}`, y: 30 });

  return (
    <section id="experience" className={section.section}>
      <div className={section.inner}>
        <span className={section.eyebrow}>Experience</span>
        <h2 className={section.heading}>Where I've put it to work.</h2>

        <div ref={ref} className={styles.timeline}>
          {items.map((job) => (
            <article key={job.company} className={styles.item}>
              <div className={styles.marker}>
                <span className={styles.dot} />
                <span className={styles.line} />
              </div>

              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div>
                    <h3 className={styles.role}>{job.role}</h3>
                    <p className={styles.company}>{job.company}</p>
                  </div>
                  <span className={styles.period}>{job.period}</span>
                </div>

                <ul className={styles.list}>
                  {job.responsibilities.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <div className={styles.impactBlock}>
                  <span className={styles.impactLabel}>Impact</span>
                  <ul className={styles.impactList}>
                    {job.impact.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
