import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>AutoPro Service</span>
          <p className={styles.tagline}>Professional car care since 2011</p>
        </div>
        <div className={styles.info}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <p>ul. Morska 45, 81-222 Gdynia</p>
            <p>+48 58 123 4567</p>
            <p>info@autoproservice.pl</p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Hours</h4>
            <p>Mon–Fri: 8:00–19:00</p>
            <p>Saturday: 9:00–14:00</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className={styles.copy}>
          © 2026 AutoPro Service. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
