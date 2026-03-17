'use client';

import { useState } from 'react';
import { useBooking, useBookingDispatch } from '@/context/BookingContext';
import styles from './Steps.module.css';

const MAKES = [
  'BMW', 'Audi', 'Volkswagen', 'Mercedes-Benz', 'Toyota',
  'Ford', 'Opel', 'Skoda', 'Hyundai', 'Kia',
  'Renault', 'Peugeot', 'Fiat', 'Honda', 'Mazda', 'Other',
] as const;

function buildYears(): number[] {
  const years: number[] = [];
  for (let y = 2026; y >= 2000; y--) { years.push(y); }
  return years;
}

const YEARS = buildYears();

export function StepVehicle() {
  const { vehicle } = useBooking();
  const dispatch = useBookingDispatch();

  const [make, setMake] = useState(vehicle.make ?? '');
  const [model, setModel] = useState(vehicle.model ?? '');
  const [year, setYear] = useState(vehicle.year?.toString() ?? '');
  const [plate, setPlate] = useState(vehicle.licensePlate ?? '');
  const [mileage, setMileage] = useState(vehicle.mileage?.toString() ?? '');

  function handleNext() {
    if (!make || !model || !year) { return; }
    dispatch({
      type: 'SET_VEHICLE',
      vehicle: { make, model, year: Number(year), licensePlate: plate, mileage: Number(mileage) || 0 },
    });
    dispatch({ type: 'SET_STEP', step: 'service' });
  }

  const isValid = make && model && year;

  return (
    <div>
      <h3 className={styles.stepTitle}>Tell us about your vehicle</h3>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="v-make">Make *</label>
          <select id="v-make" value={make} onChange={(e) => { setMake(e.target.value); }} name="vehicleMake">
            <option value="">Select make...</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="v-model">Model *</label>
          <input id="v-model" value={model} onChange={(e) => { setModel(e.target.value); }} placeholder="e.g. Golf VII" name="vehicleModel" />
        </div>
        <div className={styles.field}>
          <label htmlFor="v-year">Year *</label>
          <select id="v-year" value={year} onChange={(e) => { setYear(e.target.value); }} name="vehicleYear">
            <option value="">Select year...</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="v-plate">License Plate</label>
          <input id="v-plate" value={plate} onChange={(e) => { setPlate(e.target.value); }} placeholder="e.g. GD 12345" name="licensePlate" />
        </div>
        <div className={styles.field}>
          <label htmlFor="v-mileage">Mileage (km)</label>
          <input id="v-mileage" type="number" value={mileage} onChange={(e) => { setMileage(e.target.value); }} placeholder="e.g. 85000" name="mileage" />
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.btnNext} onClick={handleNext} disabled={!isValid}>
          Next: Choose Service →
        </button>
      </div>
    </div>
  );
}
