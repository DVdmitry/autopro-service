'use client';

import styles from './BookingForm.module.css';

const VEHICLE_MAKES = [
  'BMW', 'Audi', 'Volkswagen', 'Mercedes-Benz', 'Toyota',
  'Ford', 'Opel', 'Skoda', 'Hyundai', 'Kia', 'Other',
] as const;

const SERVICE_TYPES = [
  'Oil Change & Fluids',
  'Brake Service',
  'Tire Service & Alignment',
  'Engine Diagnostics',
  'AC Service & Recharge',
  'Suspension & Steering',
  'Transmission Service',
  'Electrical & Battery',
  'Body Repair & Detailing',
  'Full Inspection',
] as const;

const TIME_SLOTS = [
  'Morning (8:00–12:00)',
  'Afternoon (12:00–16:00)',
  'Evening (16:00–19:00)',
] as const;

function buildYearOptions(): number[] {
  const years: number[] = [];
  for (let y = 2026; y >= 2000; y--) {
    years.push(y);
  }
  return years;
}

const YEARS = buildYearOptions();

export function BookingForm() {
  return (
    <section id="booking" className={styles.section}>
      <div className="container">
        <h2 className="section-title">Schedule Your Service</h2>
        <p className="section-subtitle">
          Fill the form below or click the microphone and tell us what you need
        </p>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); }}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" placeholder="Jan" />
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" placeholder="Kowalski" />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="+48 500 123 456" />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="jan@example.com" />
            </div>

            <div className={styles.field}>
              <label htmlFor="vehicleMake">Vehicle Make</label>
              <select id="vehicleMake" name="vehicleMake" defaultValue="">
                <option value="" disabled>Select make...</option>
                {VEHICLE_MAKES.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="vehicleModel">Vehicle Model</label>
              <input id="vehicleModel" name="vehicleModel" type="text" placeholder="e.g. Golf VII" />
            </div>

            <div className={styles.field}>
              <label htmlFor="vehicleYear">Year</label>
              <select id="vehicleYear" name="vehicleYear" defaultValue="">
                <option value="" disabled>Select year...</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="licensePlate">License Plate</label>
              <input id="licensePlate" name="licensePlate" type="text" placeholder="e.g. GD 12345" />
            </div>

            <div className={styles.field}>
              <label htmlFor="mileage">Mileage (km)</label>
              <input id="mileage" name="mileage" type="number" placeholder="e.g. 85000" />
            </div>

            <div className={styles.field}>
              <label htmlFor="serviceType">Service Type</label>
              <select id="serviceType" name="serviceType" defaultValue="">
                <option value="" disabled>Select service...</option>
                {SERVICE_TYPES.map((svc) => (
                  <option key={svc} value={svc}>{svc}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="preferredDate">Preferred Date</label>
              <input id="preferredDate" name="preferredDate" type="date" />
            </div>

            <div className={styles.field}>
              <label htmlFor="preferredTime">Preferred Time</label>
              <select id="preferredTime" name="preferredTime" defaultValue="">
                <option value="" disabled>Select time...</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.fieldFull}>
            <label htmlFor="problemDescription">Problem Description</label>
            <textarea
              id="problemDescription"
              name="problemDescription"
              rows={4}
              placeholder="Describe the issue or symptoms you're experiencing..."
            />
          </div>

          <div className={styles.radioRow}>
            <fieldset className={styles.radioGroup}>
              <legend>Urgency</legend>
              <label className={styles.radioLabel}>
                <input type="radio" name="urgency" value="normal" defaultChecked /> Normal
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="urgency" value="urgent" /> Urgent
              </label>
            </fieldset>

            <fieldset className={styles.radioGroup}>
              <legend>Preferred Contact</legend>
              <label className={styles.radioLabel}>
                <input type="radio" name="contactMethod" value="phone" defaultChecked /> Phone
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="contactMethod" value="email" /> Email
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="contactMethod" value="whatsapp" /> WhatsApp
              </label>
            </fieldset>
          </div>

          <button type="submit" className={styles.submit}>Book Service</button>
        </form>
      </div>
    </section>
  );
}
