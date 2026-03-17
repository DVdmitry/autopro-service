'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import styles from './WhyUs.module.css';

const REASONS = [
  {
    num: '01',
    title: 'Transparent Pricing',
    desc: 'You choose the parts and materials. We show options with prices before any work begins — no surprises on the invoice.',
  },
  {
    num: '02',
    title: 'Certified Mechanics',
    desc: 'Every technician holds industry certifications and specializes in specific vehicle systems. Your car gets the right expert.',
  },
  {
    num: '03',
    title: 'All Makes & Models',
    desc: 'BMW, Audi, VW, Toyota, Ford — we service every brand. Factory-level diagnostics tools for each manufacturer.',
  },
  {
    num: '04',
    title: 'Online Booking',
    desc: 'Book your service in 60 seconds. Choose your mechanic, date, parts — or just tell us by voice and we fill the form for you.',
  },
] as const;

export function WhyUs() {
  return (
    <section className={`section ${styles.section}`}>
      {/* Background workshop image */}
      <div className={styles.bgImage} />

      <div className="container">
        <div className={styles.layout}>
          <ScrollReveal direction="left">
            <div className={styles.left}>
              <span className="section-label">Why AutoPro</span>
              <h2 className="section-title">Built on trust,<br />driven by quality.</h2>
              <p className="section-subtitle">
                We treat every car like our own. 15 years, 12,000+ vehicles,
                and a 4.8-star rating speak for themselves.
              </p>
              <Link href="/booking" className="btn btn-primary" style={{ marginTop: 32 }}>
                Book Now →
              </Link>
            </div>
          </ScrollReveal>
          <div className={styles.right}>
            {REASONS.map((r, i) => (
              <ScrollReveal key={r.num} delay={i * 100} direction="right">
                <div className={styles.reason}>
                  <span className={styles.num}>{r.num}</span>
                  <div>
                    <h3 className={styles.reasonTitle}>{r.title}</h3>
                    <p className={styles.reasonDesc}>{r.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
