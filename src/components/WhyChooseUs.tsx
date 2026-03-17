import styles from './WhyChooseUs.module.css';

const STATS = [
  { value: '15+', label: 'Years of Experience' },
  { value: '12,000+', label: 'Cars Serviced' },
  { value: '4.8★', label: 'Google Rating' },
] as const;

export function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
