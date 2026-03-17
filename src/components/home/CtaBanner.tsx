'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import styles from './CtaBanner.module.css';

export function CtaBanner() {
  return (
    <section className={styles.section}>
      {/* Background photo */}
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className={`container ${styles.inner}`}>
        <ScrollReveal direction="scale">
          <div className={styles.glow} />
          <span className={styles.eyebrow}>Ready?</span>
          <h2 className={styles.title}>Book your service in under 60 seconds.</h2>
          <p className={styles.subtitle}>
            Choose your service, pick a time, select your parts — or just tap the mic
            and tell us what you need. We&apos;ll handle the rest.
          </p>
          <div className={styles.actions}>
            <Link href="/booking" className="btn btn-primary btn-lg">
              Book Now →
            </Link>
            <a href="tel:+48581234567" className="btn btn-outline btn-lg">
              Call +48 58 123 45 67
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
