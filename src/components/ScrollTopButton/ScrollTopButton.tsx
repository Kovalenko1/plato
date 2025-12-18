import { ArrowUp } from 'lucide-react';

import styles from './ScrollTopButton.module.scss';

type Props = {
  visible: boolean;
  onClick: () => void;
};

export default function ScrollTopButton({ visible, onClick }: Props) {
  return (
    <button
      type="button"
      className={[styles.button, visible ? styles.visible : styles.hidden].join(' ')}
      onClick={onClick}
      aria-label="Наверх"
    >
      <ArrowUp size={20} />
    </button>
  );
}

