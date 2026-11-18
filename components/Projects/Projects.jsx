"use client";

import { useRef } from "react";
import section from "@/components/shared/Section.module.css";
import styles from "./Projects.module.css";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Projects({ items }) {
  const ref = useRef(null);
  useScrollReveal(ref, { stagger: `.${styles.card}` });

  return (
    <section id="projects" className={`${section.section} ${section.altBg}`}>
      <div className={section.inner}>
        <span className={section.eyebrow}>Projects</span>
        <h2 className={section.heading}>Things I've actually shipped.</h2>

        <div ref={ref} className={styles.grid}>
          {items.map((project) => (
            <article key={project.title} className={styles.card}>
              <span className={styles.context}>{project.context}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
