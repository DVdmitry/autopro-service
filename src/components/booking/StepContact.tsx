'use client';

import { useState } from 'react';
import { useBooking, useBookingDispatch } from '@/context/BookingContext';
import styles from './Steps.module.css';

export function StepContact() {
  const { customer, problemDescription, urgency, contactMethod } = useBooking();
  const dispatch = useBookingDispatch();

  const [firstName, setFirstName] = useState(customer.firstName ?? '');
  const [lastName, setLastName] = useState(customer.lastName ?? '');
  const [email, setEmail] = useState(customer.email ?? '');
  const [phone, setPhone] = useState(customer.phone ?? '');
  const [problem, setProblem] = useState(problemDescription);
  const [urg, setUrg] = useState(urgency);
  const [contact, setContact] = useState(contactMethod);

  function handleNext() {
    if (!firstName || !phone) { return; }
    dispatch({ type: 'SET_CUSTOMER', customer: { firstName, lastName, email, phone } });
    dispatch({ type: 'SET_DETAILS', problem, urgency: urg, contact });
    dispatch({ type: 'SET_STEP', step: 'confirmation' });
  }

  function handleBack() {
    dispatch({ type: 'SET_STEP', step: 'datetime' });
  }

  const isValid = firstName && phone;

  return (
    <div>
      <h3 className={styles.stepTitle}>Your contact details</h3>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="c-first">First Name *</label>
          <input id="c-first" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} placeholder="Jan" name="firstName" />
        </div>
        <div className={styles.field}>
          <label htmlFor="c-last">Last Name</label>
          <input id="c-last" value={lastName} onChange={(e) => { setLastName(e.target.value); }} placeholder="Kowalski" name="lastName" />
        </div>
        <div className={styles.field}>
          <label htmlFor="c-phone">Phone *</label>
          <input id="c-phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); }} placeholder="+48 500 123 456" name="phone" />
        </div>
        <div className={styles.field}>
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder="jan@example.com" name="email" />
        </div>
      </div>

      <div className={styles.fieldFull}>
        <label htmlFor="c-problem">Describe the problem</label>
        <textarea id="c-problem" rows={4} value={problem} onChange={(e) => { setProblem(e.target.value); }} placeholder="What symptoms are you experiencing?" name="problemDescription" />
      </div>

      <div className={styles.radioRow}>
        <fieldset className={styles.radioGroup}>
          <legend>Urgency</legend>
          <label className={styles.radioLabel}>
            <input type="radio" name="urgency" checked={urg === 'normal'} onChange={() => { setUrg('normal'); }} /> Normal
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="urgency" checked={urg === 'urgent'} onChange={() => { setUrg('urgent'); }} /> Urgent
          </label>
        </fieldset>
        <fieldset className={styles.radioGroup}>
          <legend>Preferred contact</legend>
          <label className={styles.radioLabel}>
            <input type="radio" name="contactMethod" checked={contact === 'phone'} onChange={() => { setContact('phone'); }} /> Phone
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="contactMethod" checked={contact === 'email'} onChange={() => { setContact('email'); }} /> Email
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="contactMethod" checked={contact === 'whatsapp'} onChange={() => { setContact('whatsapp'); }} /> WhatsApp
          </label>
        </fieldset>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={handleBack} type="button">← Back</button>
        <button className={styles.btnNext} onClick={handleNext} disabled={!isValid} type="button">
          Review Booking →
        </button>
      </div>
    </div>
  );
}
