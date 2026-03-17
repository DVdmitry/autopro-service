'use client';

import { useState, useEffect } from 'react';
import { useBooking, useBookingDispatch } from '@/context/BookingContext';
interface MechanicRow {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
}

interface SlotInfo {
  id: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked';
}
import styles from './Steps.module.css';

export function StepDateTime() {
  const { serviceId, mechanicId, slotDate, slotTime } = useBooking();
  const dispatch = useBookingDispatch();

  const [mechanics, setMechanics] = useState<MechanicRow[]>([]);
  const [selectedMechanic, setSelectedMechanic] = useState(mechanicId);
  const [date, setDate] = useState(slotDate || getDefaultDate());
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(slotTime);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMechanics();
  }, [serviceId]);

  useEffect(() => {
    if (selectedMechanic && date) {
      fetchSlots();
    }
  }, [selectedMechanic, date]);

  async function fetchMechanics() {
    try {
      const res = await fetch(`/api/mechanics?serviceId=${serviceId}`);
      const data = await res.json();
      const list = data.mechanics ?? [];
      setMechanics(list);
      if (list.length > 0 && !selectedMechanic) {
        setSelectedMechanic(list[0].id);
      }
    } catch (err) {
      console.error('Failed to load mechanics:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSlots() {
    try {
      const res = await fetch(`/api/slots?mechanicId=${selectedMechanic}&date=${date}`);
      const data = await res.json();
      setSlots(data.slots ?? []);
      setSelectedSlot('');
    } catch (err) {
      console.error('Failed to load slots:', err);
    }
  }

  function handleNext() {
    if (!selectedMechanic || !date || !selectedSlot) { return; }
    dispatch({ type: 'SET_MECHANIC', mechanicId: selectedMechanic });
    dispatch({ type: 'SET_SLOT', date, time: selectedSlot });
    dispatch({ type: 'SET_STEP', step: 'contact' });
  }

  function handleBack() {
    dispatch({ type: 'SET_STEP', step: 'options' });
  }

  if (loading) {
    return <p className={styles.loading}>Loading mechanics...</p>;
  }

  const available = slots.filter((s) => s.status === 'available');

  return (
    <div>
      <h3 className={styles.stepTitle}>Choose mechanic, date & time</h3>

      <div className={styles.field} style={{ marginBottom: 20 }}>
        <label htmlFor="dt-mechanic">Mechanic</label>
        <select
          id="dt-mechanic"
          value={selectedMechanic}
          onChange={(e) => { setSelectedMechanic(e.target.value); }}
          name="mechanic"
        >
          {mechanics.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {m.specialization} ({m.experience} yrs, {m.rating}★)
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field} style={{ marginBottom: 20 }}>
        <label htmlFor="dt-date">Date</label>
        <input
          id="dt-date"
          type="date"
          value={date}
          min={getDefaultDate()}
          onChange={(e) => { setDate(e.target.value); }}
          name="preferredDate"
        />
      </div>

      {available.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <label className={styles.fieldLabel}>Available slots</label>
          <div className={styles.slotGrid}>
            {available.map((slot) => (
              <button
                key={slot.id}
                className={`${styles.slotBtn} ${selectedSlot === slot.startTime ? styles.slotBtnActive : ''}`}
                onClick={() => { setSelectedSlot(slot.startTime); }}
                type="button"
              >
                {slot.startTime} – {slot.endTime}
              </button>
            ))}
          </div>
        </div>
      )}

      {date && available.length === 0 && !loading && (
        <p className={styles.stepHint}>No slots available on this date. Try another day.</p>
      )}

      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={handleBack} type="button">← Back</button>
        <button className={styles.btnNext} onClick={handleNext} disabled={!selectedSlot} type="button">
          Next: Your Details →
        </button>
      </div>
    </div>
  );
}

function getDefaultDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
