import Link from 'next/link';
import styles from './Footer.module.css';

const LINKS = {
  services: [
    { label: 'Oil Change', href: '/services' },
    { label: 'Brake Service', href: '/services' },
    { label: 'Engine Diagnostics', href: '/services' },
    { label: 'Tire & Alignment', href: '/services' },
    { label: 'Full Inspection', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about' },
    { label: 'Book Online', href: '/booking' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>AP</span>
            <span className={styles.logoName}>
              Auto<span className={styles.accent}>Pro</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Professional car service in Gdynia since 2011.
            Expert diagnostics, repair, and maintenance for all makes.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>ASE Certified</span>
            <span className={styles.badge}>All Makes</span>
            <span className={styles.badge}>4.8 Google</span>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            {LINKS.services.map((l) => (
              <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            {LINKS.company.map((l) => (
              <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <p className={styles.info}>ul. Morska 45</p>
            <p className={styles.info}>81-222 Gdynia, Poland</p>
            <a href="tel:+48581234567" className={styles.link}>+48 58 123 45 67</a>
            <a href="mailto:info@autoproservice.pl" className={styles.link}>info@autoproservice.pl</a>
            <p className={styles.hours}>Mon–Fri 8:00–19:00</p>
            <p className={styles.hours}>Sat 9:00–14:00</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>
            © 2026 AutoPro Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
