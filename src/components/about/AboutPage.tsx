'use client';

import { useState, useEffect } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import styles from './AboutPage.module.css';

interface MechanicRow {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  review_count: number;
  avatar: string;
  bio: string;
}

function avatarUrl(name: string) {
  const seed = name.replace(/\s+/g, '');
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=1a1a2e`;
}

export function AboutPage() {
  const [mechanics, setMechanics] = useState<MechanicRow[]>([]);

  useEffect(() => { fetchMechanics(); }, []);

  async function fetchMechanics() {
    try {
      const res = await fetch('/api/mechanics');
      const data = await res.json();
      setMechanics(data.mechanics ?? []);
    } catch (err) {
      console.error('Failed to load mechanics:', err);
    }
  }

  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label animate-in">Our People</span>
          <h1 className="section-title animate-in animate-delay-1">Meet the Team</h1>
          <p className="section-subtitle animate-in animate-delay-2">
            8 certified mechanics, each an expert in their field.
            Your car gets the right specialist every time.
          </p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.grid}>
            {mechanics.map((m, i) => (
              <ScrollReveal key={m.id} delay={i * 80}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <img
                      src={avatarUrl(m.name)}
                      alt={m.name}
                      className={styles.avatar}
                      width={64}
                      height={64}
                    />
                    <div className={styles.spec}>{m.specialization}</div>
                  </div>
                  <h3 className={styles.name}>{m.name}</h3>
                  <p className={styles.bio}>{m.bio}</p>
                  <div className={styles.meta}>
                    <span>{m.experience} yrs exp</span>
                    <span>★ {m.rating}</span>
                    <span>{m.review_count} reviews</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
