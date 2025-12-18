import styles from './SectionHeading.module.scss';

export type SectionHeadingVariant = 'default' | 'inverted';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  centered?: boolean;
  variant?: SectionHeadingVariant;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  centered = false,
  variant = 'default',
  className,
}: Props) {
  return (
    <div
      className={[
        styles.root,
        centered ? styles.centered : undefined,
        variant === 'inverted' ? styles.inverted : undefined,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}

