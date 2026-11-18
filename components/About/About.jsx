"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./About.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function About({ summary, location, email, phone, role }) {
  const ref = useRef(null);
  useScrollReveal(ref, { stagger: `.${styles.reveal}` });

  return (
    <section id="about" className={section.section}>
      <div ref={ref} className={`${section.inner} ${styles.grid}`}>
        <div className={styles.reveal}>
          <span className={section.eyebrow}>About</span>
          <h2 className={section.heading}>
            Turning data into decisions, and ideas into working software.
          </h2>
          <p className={section.lede}>{summary}</p>
        </div>

        <div className={`${styles.card} ${styles.reveal}`}>
          <span className={styles.cardLabel}>Currently</span>
          <p className={styles.cardRole}>{role}</p>

          <ul className={styles.factList}>
            <li>
              <span>Location</span>
              <span>{location}</span>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
