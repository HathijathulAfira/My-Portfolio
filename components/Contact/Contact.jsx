"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./Contact.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Contact({ email, phone, location }) {
  const ref = useRef(null);
  useScrollReveal(ref, { stagger: `.${styles.reveal}` });

  return (
    <section id="contact" className={section.section}>
      <div ref={ref} className={section.inner}>
        <span className={`${section.eyebrow} ${styles.reveal}`}>
          Get in touch
        </span>
        <h2 className={`${styles.big} ${styles.reveal}`}>
          Let&rsquo;s build
          <br />
          something.
        </h2>

        <div className={`${styles.links} ${styles.reveal}`}>
          <a href={`mailto:${email}`} className={styles.link}>
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className={styles.link}
          >
            {phone}
          </a>
          <span className={styles.location}>{location}</span>
        </div>
      </div>
    </section>
  );
}
