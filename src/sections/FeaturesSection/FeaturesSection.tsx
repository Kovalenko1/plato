import { Lightbulb, Wind, Zap } from 'lucide-react';

import FeatureCard from '@/components/FeatureCard/FeatureCard';
import SectionHeading from '@/components/SectionHeading/SectionHeading';

import styles from './FeaturesSection.module.scss';

const FEATURES = [
  {
    icon: <Wind size={26} />,
    title: 'Скрытый аромат',
    text: 'Специальный отсек для картриджа. Тонкий аромат без лишних девайсов.',
  },
  {
    icon: <Lightbulb size={26} />,
    title: 'Мягкий LED',
    text: 'Адаптивная подсветка основания. Создаёт уютный ореол вокруг колонки.',
  },
  {
    icon: <Zap size={26} />,
    title: 'Cable Management',
    text: 'Прячет штекер и провод внутри корпуса. Выход кабеля снизу.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          centered
          eyebrow="Преимущества"
          title="Продуманная эргономика"
          lead="Каждый элемент ПЛАТО работает незаметно, оставляя ощущение простора и мягкого света."
        />

        <div className={styles.grid}>
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              index={i}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

