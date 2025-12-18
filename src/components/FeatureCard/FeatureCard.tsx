import type { ReactNode } from 'react';

import styles from './FeatureCard.module.scss';

type Props = {
  icon: ReactNode;
  title: string;
  text: string;
  index: number;
};

export default function FeatureCard({ icon, title, text, index }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

