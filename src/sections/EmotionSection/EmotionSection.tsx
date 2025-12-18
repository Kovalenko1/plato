import SectionHeading from '@/components/SectionHeading/SectionHeading';

import styles from './EmotionSection.module.scss';

export default function EmotionSection() {
  return (
    <section id="emotion" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <SectionHeading eyebrow="Философия" title="Дом — это ваше спокойствие" className={styles.heading} />

            <blockquote className={styles.quote}>
              ПЛАТО — это небольшая сцена для вашего помощника. Когда на столе порядок, мыслить легче, слушать музыку
              приятнее, а дом кажется спокойнее.
            </blockquote>
            <p className={styles.signature}>— Команда ПЛАТО</p>

            <div className={styles.values}>
              <div className={styles.valueCard}>
                <h4 className={styles.valueTitle}>Минимум</h4>
                <p className={styles.valueText}>Избавляемся от визуального мусора, оставляя только суть.</p>
              </div>
              <div className={styles.valueCard}>
                <h4 className={styles.valueTitle}>Атмосфера</h4>
                <p className={styles.valueText}>Аромат и свет создают ощущение живого присутствия.</p>
              </div>
            </div>
          </div>

          <div className={styles.collage}>
            <div className={styles.collageGlow} aria-hidden="true" />
            <div className={styles.collageGrid}>
              <div className={styles.collageColumn}>
                <div className={[styles.photo, styles.photoTall, styles.photoShift].join(' ')}>
                  <img
                    src="assets/homeModel/1.1.png"
                    className={styles.photoImg}
                    alt="Деталь 1"
                  />
                </div>
                <div className={[styles.photo, styles.photoShort, styles.photoShift].join(' ')}>
                  <img
                    src="assets/homeModel/1.2.png"
                    className={styles.photoImg}
                    alt="Деталь 2"
                  />
                </div>
              </div>

              <div className={styles.collageColumn}>
                <div className={[styles.photo, styles.photoShort].join(' ')}>
                  <img
                    src="assets/homeModel/p.1.png"
                    className={styles.photoImg}
                    alt="Деталь 3"
                  />
                </div>
                <div className={[styles.photo, styles.photoTall].join(' ')}>
                  <img
                    src="assets/homeModel/p.2.png"
                    className={styles.photoImg}
                    alt="Деталь 4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

