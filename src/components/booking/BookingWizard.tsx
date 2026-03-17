'use client';

import { BookingProvider, useBooking, getStepIndex } from '@/context/BookingContext';
import { StepVehicle } from './StepVehicle';
import { StepService } from './StepService';
import { StepOptions } from './StepOptions';
import { StepDateTime } from './StepDateTime';
import { StepContact } from './StepContact';
import { StepConfirmation } from './StepConfirmation';
import styles from './BookingWizard.module.css';

const STEPS = [
  { key: 'vehicle', label: 'Vehicle', icon: '🚗' },
  { key: 'service', label: 'Service', icon: '🔧' },
  { key: 'options', label: 'Parts', icon: '⚙️' },
  { key: 'datetime', label: 'Schedule', icon: '📅' },
  { key: 'contact', label: 'Details', icon: '👤' },
  { key: 'confirmation', label: 'Confirm', icon: '✓' },
] as const;

function WizardContent() {
  const { currentStep } = useBooking();
  const currentIdx = getStepIndex(currentStep);

  return (
    <section id="booking" className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.progress}>
            {STEPS.map((s, i) => (
              <div
                key={s.key}
                className={`${styles.step} ${i <= currentIdx ? styles.stepDone : ''} ${i === currentIdx ? styles.stepCurrent : ''}`}
              >
                <span className={styles.stepIcon}>{s.icon}</span>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.content}>
            {currentStep === 'vehicle' && <StepVehicle />}
            {currentStep === 'service' && <StepService />}
            {currentStep === 'options' && <StepOptions />}
            {currentStep === 'datetime' && <StepDateTime />}
            {currentStep === 'contact' && <StepContact />}
            {currentStep === 'confirmation' && <StepConfirmation />}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BookingWizard() {
  return (
    <BookingProvider>
      <WizardContent />
    </BookingProvider>
  );
}
