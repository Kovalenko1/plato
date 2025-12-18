import { Sparkles, X } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading/SectionHeading';

import styles from './ProblemSection.module.scss';

const BEFORE = [
  'Провода на виду, визуальный беспорядок на поверхностях.',
  'Умная колонка стоит где придётся, конфликтуя с декором.',
  'Лишние гаджеты для аромата и света создают «кладбище техники».',
];

const AFTER = [
  'Кабель скрыт внутри — идеальная чистота столешницы.',
  'Собственная платформа подчёркивает премиальность устройства.',
  'Встроенная подсветка и аромат-картридж без лишних проводов.',
];

export default function ProblemSection() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Проблема — решение"
          title="Колонка без места — визуальный шум."
          lead="Мы убрали хаос проводов, выделили колонке сцену и добавили атмосферу. Теперь технология выглядит как часть интерьера."
        />

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <X className={styles.badIcon} size={20} aria-hidden="true" />
              <h3 className={styles.cardTitle}>До ПЛАТО</h3>
            </div>

            <ul className={styles.list}>
              {BEFORE.map((text) => (
                <li key={text} className={styles.listItem}>
                  <span className={styles.listBulletBad} aria-hidden="true">
                    !
                  </span>
                  <p className={styles.listText}>{text}</p>
                </li>
              ))}
            </ul>

            <div className={styles.placeholder} aria-hidden="true">
              <span className={styles.placeholderText}>Визуальный хаос</span>
            </div>
          </div>

          <div className={[styles.card, styles.cardAccent].join(' ')}>
            <div className={styles.cardAccentGlow} aria-hidden="true" />

            <div className={styles.cardAccentTop}>
              <div className={styles.cardHeader}>
                <Sparkles className={styles.goodIcon} size={20} aria-hidden="true" />
                <h3 className={styles.cardTitle}>С ПЛАТО</h3>
              </div>

              <ul className={styles.list}>
                {AFTER.map((text) => (
                  <li key={text} className={styles.listItem}>
                    <span className={styles.listBulletGood} aria-hidden="true">
                      ✓
                    </span>
                    <p className={[styles.listText, styles.listTextInverted].join(' ')}>{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.zenPreview}>
              <img
                src="assets/homeModel/p.png"
                alt="Чистый интерьер"
                className={styles.zenImage}
              />
              <div className={styles.zenOverlay} aria-hidden="true" />
              <span className={styles.zenLabel}>Абсолютный дзен</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

