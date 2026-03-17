import styles from './Services.module.css';

const SERVICES = [
  { icon: '🛢️', title: 'Oil Change & Fluids', price: 80, desc: 'Synthetic oil, filter replacement, fluid top-up' },
  { icon: '🔧', title: 'Brake System', price: 150, desc: 'Pads, discs, fluid, full brake inspection' },
  { icon: '🔘', title: 'Tires & Alignment', price: 40, desc: 'Seasonal swap, balancing, wheel alignment' },
  { icon: '🔍', title: 'Engine Diagnostics', price: 50, desc: 'Computer scan, error codes, performance check' },
  { icon: '❄️', title: 'AC Service', price: 80, desc: 'Recharge, leak detection, climate control repair' },
  { icon: '⚙️', title: 'Suspension & Steering', price: 200, desc: 'Shocks, struts, power steering, bushings' },
  { icon: '🔄', title: 'Transmission', price: 150, desc: 'Fluid change, diagnostics, clutch service' },
  { icon: '⚡', title: 'Electrical & Battery', price: 60, desc: 'Battery test, alternator, starter, wiring' },
  { icon: '✨', title: 'Body & Detailing', price: 100, desc: 'Dent repair, paint, interior & exterior detail' },
] as const;

export function Services() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Complete car care from routine maintenance to major repairs
        </p>
        <div className={styles.grid}>
          {SERVICES.map((svc) => (
            <div key={svc.title} className={styles.card}>
              <span className={styles.icon}>{svc.icon}</span>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.desc}</p>
              <span className={styles.price}>from €{svc.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
