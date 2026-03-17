import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact — AutoPro Service Gdynia',
  description: 'Visit us at ul. Morska 45, 81-222 Gdynia. Call +48 58 123 45 67.',
};

const HOURS = [
  { day: 'Monday – Friday', time: '8:00 – 19:00' },
  { day: 'Saturday', time: '9:00 – 14:00' },
  { day: 'Sunday', time: 'Closed' },
] as const;

export default function Page() {
  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label animate-in">Get in Touch</span>
          <h1 className="section-title animate-in animate-delay-1">Contact Us</h1>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Address</h3>
                <p className={styles.blockText}>ul. Morska 45</p>
                <p className={styles.blockText}>81-222 Gdynia, Poland</p>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Phone</h3>
                <a href="tel:+48581234567" className={styles.link}>+48 58 123 45 67</a>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Email</h3>
                <a href="mailto:info@autoproservice.pl" className={styles.link}>info@autoproservice.pl</a>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Working Hours</h3>
                {HOURS.map((h) => (
                  <div key={h.day} className={styles.hourRow}>
                    <span className={styles.hourDay}>{h.day}</span>
                    <span className={styles.hourTime}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.map}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2314.5!2d18.53!3d54.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDMxJzEyLjAiTiAxOMKwMzEnNDguMCJF!5e0!3m2!1sen!2spl!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 16, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AutoPro Service location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
