'use client';

import { useState, useEffect } from 'react';
import { useBooking, useBookingDispatch } from '@/context/BookingContext';
interface ServiceOption {
  id: string;
  service_id: string;
  name: string;
  brand: string;
  tier: 'budget' | 'standard' | 'premium';
  price: number;
  description: string;
  compatible_makes: string[];
}
import styles from './Steps.module.css';

export function StepOptions() {
  const { serviceId, selectedOptionId, vehicle } = useBooking();
  const dispatch = useBookingDispatch();
  const [options, setOptions] = useState<ServiceOption[]>([]);
  const [selected, setSelected] = useState(selectedOptionId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptions();
  }, [serviceId, vehicle.make]);

  async function fetchOptions() {
    try {
      const params = new URLSearchParams({ serviceId });
      if (vehicle.make) { params.set('make', vehicle.make); }
      const res = await fetch(`/api/options?${params}`);
      const data = await res.json();
      setOptions(data.options ?? []);
    } catch (err) {
      console.error('Failed to load options:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    dispatch({ type: 'SET_OPTION', optionId: selected });
    dispatch({ type: 'SET_STEP', step: 'datetime' });
  }

  function handleBack() {
    dispatch({ type: 'SET_STEP', step: 'service' });
  }

  const tierLabel = (tier: string): string => {
    const labels: Record<string, string> = { budget: 'Budget', standard: 'Standard', premium: 'Premium' };
    return labels[tier] ?? tier;
  };

  if (loading) {
    return <p className={styles.loading}>Loading options...</p>;
  }

  if (options.length === 0) {
    return (
      <div>
        <h3 className={styles.stepTitle}>No additional options</h3>
        <p className={styles.stepHint}>This service doesn&apos;t require choosing parts or materials.</p>
        <div className={styles.actions}>
          <button className={styles.btnBack} onClick={handleBack} type="button">← Back</button>
          <button className={styles.btnNext} onClick={handleNext} type="button">Next: Pick Date →</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className={styles.stepTitle}>Choose parts / materials</h3>
      <p className={styles.stepHint}>
        {vehicle.make ? `Showing compatible options for ${vehicle.make}` : 'Select an option below'}
      </p>
      <div className={styles.optionsList}>
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`${styles.optionCard} ${selected === opt.id ? styles.optionCardActive : ''}`}
            onClick={() => { setSelected(opt.id); }}
            type="button"
          >
            <div className={styles.optionHeader}>
              <span className={styles.optionName}>{opt.name}</span>
              <span className={`${styles.optionTier} ${styles[`tier_${opt.tier}`]}`}>
                {tierLabel(opt.tier)}
              </span>
            </div>
            <p className={styles.optionDesc}>{opt.description}</p>
            <span className={styles.optionPrice}>+€{opt.price}</span>
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={handleBack} type="button">← Back</button>
        <button className={styles.btnNext} onClick={handleNext} type="button">Next: Pick Date →</button>
      </div>
    </div>
  );
}
