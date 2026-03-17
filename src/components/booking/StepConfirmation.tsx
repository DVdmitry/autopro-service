'use client';

import { useState } from 'react';
import { useBooking, useBookingDispatch } from '@/context/BookingContext';
import type { CreateAppointmentRequest, VehicleInfo, CustomerInfo } from '@/types/auto-service.types';
import styles from './Steps.module.css';

export function StepConfirmation() {
  const state = useBooking();
  const dispatch = useBookingDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ confirmationNumber: string } | null>(null);
  const [error, setError] = useState('');

  async function handleConfirm() {
    setSubmitting(true);
    setError('');

    const body: CreateAppointmentRequest = {
      mechanicId: state.mechanicId,
      serviceId: state.serviceId,
      selectedOptionId: state.selectedOptionId || undefined,
      slotDate: state.slotDate,
      slotStartTime: state.slotTime,
      vehicle: state.vehicle as VehicleInfo,
      customer: state.customer as CustomerInfo,
      problemDescription: state.problemDescription,
      urgency: state.urgency,
      contactMethod: state.contactMethod,
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Booking failed');
        return;
      }

      setResult({ confirmationNumber: data.confirmationNumber });
    } catch (err) {
      console.error('Booking error:', err);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    dispatch({ type: 'SET_STEP', step: 'contact' });
  }

  function handleNewBooking() {
    dispatch({ type: 'RESET' });
  }

  if (result) {
    return (
      <div className={styles.successBlock}>
        <span className={styles.successIcon}>✓</span>
        <h3 className={styles.stepTitle}>Appointment Confirmed!</h3>
        <p className={styles.confirmationNum}>{result.confirmationNumber}</p>
        <p className={styles.stepHint}>
          We&apos;ll contact you shortly to confirm the details. Save your confirmation number.
        </p>
        <button className={styles.btnNext} onClick={handleNewBooking} type="button">
          Book Another Service
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className={styles.stepTitle}>Review your booking</h3>

      <div className={styles.reviewGrid}>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Vehicle</span>
          <span className={styles.reviewValue}>
            {state.vehicle.make} {state.vehicle.model} ({state.vehicle.year})
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>License Plate</span>
          <span className={styles.reviewValue}>{state.vehicle.licensePlate || '—'}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Mileage</span>
          <span className={styles.reviewValue}>
            {state.vehicle.mileage ? `${state.vehicle.mileage.toLocaleString()} km` : '—'}
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Date & Time</span>
          <span className={styles.reviewValue}>{state.slotDate} at {state.slotTime}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Contact</span>
          <span className={styles.reviewValue}>
            {state.customer.firstName} {state.customer.lastName} · {state.customer.phone}
          </span>
        </div>
      </div>

      {state.problemDescription && (
        <div className={styles.reviewNote}>
          <span className={styles.reviewLabel}>Problem</span>
          <p>{state.problemDescription}</p>
        </div>
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}

      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={handleBack} type="button" disabled={submitting}>← Back</button>
        <button className={styles.btnConfirm} onClick={handleConfirm} disabled={submitting} type="button">
          {submitting ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </div>
    </div>
  );
}
