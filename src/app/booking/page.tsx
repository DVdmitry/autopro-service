import { BookingWizard } from '@/components/booking/BookingWizard';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Book Service — AutoPro Service Gdynia',
  description: 'Book your car service online. Choose service, pick parts, select date and mechanic.',
};

export default function Page() {
  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label animate-in">Online Booking</span>
          <h1 className="section-title animate-in animate-delay-1">Book Your Service</h1>
          <p className="section-subtitle animate-in animate-delay-2">
            6 simple steps — or just tap the mic and tell us what you need.
          </p>
        </div>
      </section>
      <BookingWizard />
    </main>
  );
}
