import SectionHeading from '@/components/SectionHeading/SectionHeading';

import styles from './CtaSection.module.scss';

export default function CtaSection() {
  return (
    <section id="cta" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardGradient} aria-hidden="true" />
          <div className={styles.cardGlow} aria-hidden="true" />

          <div className={styles.content}>
            <SectionHeading
              centered
              variant="inverted"
              eyebrow="Запуск скоро"
              title="Дайте вашей колонке дом уже сегодня"
            />

            <p className={styles.lead}>
              Оставьте заявку, чтобы получить эксклюзивную цену раннего доступа и секретный бонус к запуску.
            </p>

            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton}>
                Оставить заявку
              </button>
            </div>

            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

