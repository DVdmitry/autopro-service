'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceIcon } from '@/lib/service-icons';
import styles from './ServicesPage.module.css';

interface ServiceRow {
  id: string;
  category: string;
  name: string;
  description: string;
  base_price: number;
  duration_minutes: number;
  icon: string;
}

const CATEGORIES = [
  { key: '', label: 'All' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'brakes', label: 'Brakes' },
  { key: 'tires', label: 'Tires' },
  { key: 'engine', label: 'Engine' },
  { key: 'electrical', label: 'Electrical' },
  { key: 'suspension', label: 'Suspension' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'bodywork', label: 'Bodywork' },
  { key: 'detailing', label: 'Detailing' },
] as const;

export function ServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.services ?? []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = filter
    ? services.filter((s) => s.category === filter)
    : services;

  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label animate-in">Full Service Catalog</span>
          <h1 className="section-title animate-in animate-delay-1">Our Services</h1>
          <p className="section-subtitle animate-in animate-delay-2">
            Everything your car needs — from quick oil changes to major engine work.
          </p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.filters}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterBtn} ${filter === cat.key ? styles.filterActive : ''}`}
                onClick={() => { setFilter(cat.key); }}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className={styles.loading}>Loading services...</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((svc) => (
                <div key={svc.id} className="card">
                  <div className={styles.cardTop}>
                    <span className={styles.icon}><ServiceIcon emoji={svc.icon} size={28} /></span>
                    <span className={styles.category}>{svc.category}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{svc.name}</h3>
                  <p className={styles.cardDesc}>{svc.description}</p>
                  <div className={styles.cardBottom}>
                    <div>
                      <span className={styles.price}>€{svc.base_price}</span>
                      <span className={styles.duration}>{svc.duration_minutes} min</span>
                    </div>
                    <Link href="/booking" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
                      Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
