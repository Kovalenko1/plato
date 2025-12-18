import styles from './Footer.module.scss';

const LINKS: Array<{ label: string; href: string }> = [
  { label: 'Приватность', href: '#' },
  { label: 'Доставка', href: '#' },
  { label: 'Гарантия', href: '#' },
  { label: 'B2B', href: '#' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandBlock}>
          <div className={styles.brand}>
            <img src="/assets/plato.png" alt="Плато" className={styles.logo} />
          </div>
          <p className={styles.brandLead}>Создаём пространство для технологий, которые мы любим.</p>
        </div>

        <nav className={styles.links} aria-label="Ссылки">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.meta}>
          <p className={styles.madeIn}>Made in Moscow</p>
          <p className={styles.copyright}>© {new Date().getFullYear()} ПЛАТО. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

