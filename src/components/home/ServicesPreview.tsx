'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import styles from './ServicesPreview.module.css';

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
      </svg>
    ),
    title: 'Oil & Fluids',
    desc: 'Synthetic & full-synthetic oil changes with OEM filters',
    price: 80,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
      </svg>
    ),
    title: 'Brake System',
    desc: 'Pads, discs, fluid — complete brake overhaul',
    price: 150,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h4l3-9 6 18 3-9h4"/>
      </svg>
    ),
    title: 'Diagnostics',
    desc: 'OBD-II scan, live data, error code analysis',
    price: 60,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>
      </svg>
    ),
    title: 'Tires & Alignment',
    desc: 'Seasonal swap, balancing, 3D alignment',
    price: 50,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M5.64 5.64l12.73 12.73M18.36 5.64L5.64 18.36"/>
        <path d="M12 5l-2 2M12 5l2 2M12 19l-2-2M12 19l2-2M5 12l2-2M5 12l2 2M19 12l-2-2M19 12l-2 2"/>
      </svg>
    ),
    title: 'AC Service',
    desc: 'Recharge, leak test, cabin filter replacement',
    price: 90,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
    title: 'Engine & Timing',
    desc: 'Timing belt, water pump, major engine work',
    price: 500,
  },
];

export function ServicesPreview() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div>
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Services</h2>
              <p className="section-subtitle">
                From routine maintenance to complex repairs — we handle it all.
              </p>
            </div>
            <Link href="/services" className={`btn btn-outline ${styles.viewAll}`}>
              View All Services
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 80} direction="up">
              <div className={styles.card}>
                <div className={styles.cardIcon}>{svc.icon}</div>
                <h3 className={styles.cardTitle}>{svc.title}</h3>
                <p className={styles.cardDesc}>{svc.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>from &euro;{svc.price}</span>
                  <Link href="/booking" className={styles.bookLink}>Book &rarr;</Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
