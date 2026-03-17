'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import styles from './Reviews.module.css';

const REVIEWS = [
  {
    name: 'Marek Wiśniewski',
    car: 'BMW 320d, 2019',
    text: 'Brake replacement done in 3 hours. They showed me three pad options with prices before starting. Fair deal, great quality.',
    stars: 5,
  },
  {
    name: 'Katarzyna Pawlak',
    car: 'Audi A4, 2021',
    text: 'They found an issue other shops missed — a failing alternator bearing. Honest diagnostics, no upselling. My go-to shop now.',
    stars: 5,
  },
  {
    name: 'Tomasz Kowalski',
    car: 'VW Golf VII, 2018',
    text: 'AC repair before summer. Booked online Monday morning, car was ready Tuesday afternoon. Professional and fast.',
    stars: 5,
  },
  {
    name: 'Anna Nowicka',
    car: 'Toyota Corolla, 2022',
    text: 'Full inspection + oil change. Transparent pricing, clean workshop, and they explained everything clearly. Highly recommend.',
    stars: 5,
  },
] as const;

export function Reviews() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className="section-label">Reviews</span>
            <h2 className="section-title">What drivers say</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {REVIEWS.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 100}>
              <div className={styles.card}>
                <div className={styles.stars}>
                  {'★'.repeat(review.stars)}
                </div>
                <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
                <div className={styles.author}>
                  <span className={styles.avatar}>
                    {review.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                  <div>
                    <span className={styles.name}>{review.name}</span>
                    <span className={styles.car}>{review.car}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
