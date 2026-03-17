'use client';

import { useState, useEffect } from 'react';
import { useBooking, useBookingDispatch } from '@/context/BookingContext';
import { ServiceIcon } from '@/lib/service-icons';
interface ServiceRow {
  id: string;
  category: string;
  name: string;
  description: string;
  base_price: number;
  duration_minutes: number;
  icon: string;
}
import styles from './Steps.module.css';

export function StepService() {
  const { serviceId } = useBooking();
  const dispatch = useBookingDispatch();
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [selected, setSelected] = useState(serviceId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
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

  function handleSelect(id: string) {
    setSelected(id);
  }

  function handleNext() {
    if (!selected) { return; }
    dispatch({ type: 'SET_SERVICE', serviceId: selected });
    dispatch({ type: 'SET_STEP', step: 'options' });
  }

  function handleBack() {
    dispatch({ type: 'SET_STEP', step: 'vehicle' });
  }

  if (loading) {
    return <p className={styles.loading}>Loading services...</p>;
  }

  return (
    <div>
      <h3 className={styles.stepTitle}>What service do you need?</h3>
      <div className={styles.serviceGrid}>
        {services.map((svc) => (
          <button
            key={svc.id}
            className={`${styles.serviceCard} ${selected === svc.id ? styles.serviceCardActive : ''}`}
            onClick={() => { handleSelect(svc.id); }}
            type="button"
          >
            <span className={styles.serviceIcon}><ServiceIcon emoji={svc.icon} size={24} /></span>
            <span className={styles.serviceName}>{svc.name}</span>
            <span className={styles.servicePrice}>from €{svc.base_price}</span>
            <span className={styles.serviceDuration}>{svc.duration_minutes} min</span>
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={handleBack} type="button">← Back</button>
        <button className={styles.btnNext} onClick={handleNext} disabled={!selected} type="button">
          Next: Choose Parts →
        </button>
      </div>
    </div>
  );
}
