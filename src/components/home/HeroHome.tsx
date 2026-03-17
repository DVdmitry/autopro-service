import Link from 'next/link';
import styles from './HeroHome.module.css';

const STATS = [
  { value: '15+', label: 'Years' },
  { value: '12K', label: 'Cars Serviced' },
  { value: '4.8', label: 'Google Rating' },
  { value: '8', label: 'Expert Mechanics' },
] as const;

export function HeroHome() {
  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.heroBg} />
      {/* Gradient overlay */}
      <div className={styles.heroOverlay} />
      {/* Animated orb */}
      <div className={styles.glow} />

      <div className={`container ${styles.content}`}>
        <div className={styles.text}>
          <span className={`section-label animate-in`}>AutoPro Service · Gdynia</span>
          <h1 className={`${styles.title} animate-in animate-delay-1`}>
            Your car deserves
            <br />
            <span className={styles.titleAccent}>expert care.</span>
          </h1>
          <p className={`${styles.subtitle} animate-in animate-delay-2`}>
            Professional diagnostics, repair and maintenance for all makes and models.
            15+ years of experience, certified mechanics, transparent pricing.
          </p>
          <div className={`${styles.actions} animate-in animate-delay-3`}>
            <Link href="/booking" className="btn btn-primary btn-lg">
              Book Your Service →
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              Explore Services
            </Link>
          </div>
        </div>

        <div className={`${styles.statsBar} animate-in animate-delay-4`}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
