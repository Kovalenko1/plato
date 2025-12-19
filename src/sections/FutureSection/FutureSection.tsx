import { Sparkles } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading/SectionHeading';

import styles from './FutureSection.module.scss';

const LINEUP = [
  {
    name: 'ПЛАТО',
    desc: 'Базовая версия — подсветка, кабель-менеджмент, алюминиевое основание.',
  },
  {
    name: 'ПЛАТО ПЛЮС',
    desc: 'Добавляем аромат-картридж, сенсорное кольцо и премиальные цвета.',
  },
  {
    name: 'ПЛАТО Премиум',
    desc: 'Умные сценарии, RGB-светомузыка и интеграция с датчиками дома.',
  },
];

export default function FutureSection() {
  return (
    <section id="future" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          centered
          eyebrow="Эволюция"
          title="Линейка будущего"
          lead="Три конфигурации, разработанные для разных сценариев жизни."
        />

        <div className={styles.grid}>
          {LINEUP.map((item, idx) => (
            <div key={item.name} className={styles.card}>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.sparkles}>
                {Array.from({ length: idx + 1 }).map((_, i) => (
                  <Sparkles key={i} size={12} />
                ))}
              </div>
              <h4 className={styles.title}>{item.name}</h4>
              <p className={styles.text}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

