import styles from './Hero.module.css';

const TRUST_BADGES = [
  { value: '15+', label: 'Years Experience' },
  { value: '✓', label: 'Certified Mechanics' },
  { value: '4.8★', label: 'Google Rating' },
  { value: '∞', label: 'All Makes & Models' },
] as const;

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <span className={styles.logo}>AutoPro Service</span>
        <h1 className={styles.title}>
          Professional Car Service<br />in Gdynia
        </h1>
        <p className={styles.subtitle}>
          Expert diagnostics, repair and maintenance for all makes and models
        </p>
        <div className={styles.actions}>
          <a href="#booking" className={styles.btnPrimary}>Book Appointment</a>
          <a href="tel:+48581234567" className={styles.btnOutline}>
            Call: +48 58 123 4567
          </a>
        </div>
        <div className={styles.badges}>
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className={styles.badge}>
              <span className={styles.badgeValue}>{badge.value}</span>
              <span className={styles.badgeLabel}>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
