import styles from "./Footer.module.css";

export default function Footer({ name }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>
        {name} · {year}
      </span>
      <a href="#top" className={styles.backToTop}>
        Back to top ↑
      </a>
    </footer>
  );
}
