import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading/SectionHeading';

import styles from './InteriorSection.module.scss';

const SWATCHES: Array<{ name: string; color: string }> = [
  { color: '#B4B8A9', name: 'Олива' },
  { color: '#E7E2D7', name: 'Песок' },
  { color: '#C7B29A', name: 'Дуб' },
  { color: '#1F1F1C', name: 'Уголь' },
];

export default function InteriorSection() {
  return (
    <section id="interior" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <SectionHeading eyebrow="Интерьерные задумки" title="Место для каждой детали" className={styles.heading} />
          <p className={styles.headerLead}>
            Подборка идей, как интегрировать SberBoom на ПЛАТО в ваш дом: от спальни до рабочего кабинета.
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.imageCard}>
            <div className={styles.imageFrame}>
              <img
                src="assets/homeModel/onTable.png"
                className={styles.image}
                alt="Тёплый интерьер"
              />
            </div>
            <div className={styles.imageBody}>
              <h4 className={styles.cardTitle}>Тёплый акцент</h4>
              <p className={styles.cardText}>
                Кольцо света работает как каминный отблеск: на комоде, консоли или книжной полке.
              </p>
            </div>
          </article>

          <article className={[styles.imageCard, styles.imageCardOffset].join(' ')}>
            <div className={styles.imageFrame}>
              <img
                src="assets/homeModel/underTv.png"
                className={styles.image}
                alt="Минималистичный интерьер"
              />
            </div>
            <div className={styles.imageBody}>
              <h4 className={styles.cardTitle}>Тихий профиль</h4>
              <p className={styles.cardText}>
                Низкий силуэт не спорит с мебелью — идеально для тумбы под ТВ или рабочего стола.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
