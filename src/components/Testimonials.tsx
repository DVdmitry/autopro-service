import styles from './Testimonials.module.css';

const REVIEWS = [
  {
    name: 'Marek W.',
    text: 'Brake replacement done in 3 hours. Fair price, great quality. My go-to shop now.',
    stars: 5,
  },
  {
    name: 'Katarzyna P.',
    text: 'They found an issue other shops missed. Honest diagnostics, no upselling. Highly professional team.',
    stars: 5,
  },
  {
    name: 'Tomasz K.',
    text: 'AC repair before summer — quick appointment, professional service. Car feels like new. Recommend!',
    stars: 5,
  },
] as const;

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real reviews from car owners in Gdynia</p>
        <div className={styles.grid}>
          {REVIEWS.map((review) => (
            <div key={review.name} className={styles.card}>
              <div className={styles.stars}>{'★'.repeat(review.stars)}</div>
              <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
              <span className={styles.name}>{review.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
