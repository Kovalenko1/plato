import type { CSSProperties } from 'react';
import { useEffect, useId, useState } from 'react';
import { Menu, X } from 'lucide-react';

import styles from './Navbar.module.scss';

type NavLink = {
  label: string;
  href: string;
};

const LINKS: NavLink[] = [
  { label: 'Порядок', href: '#problem' },
  { label: 'Интерьер', href: '#interior' },
  { label: 'Функции', href: '#features' },
  { label: 'Философия', href: '#emotion' },
  { label: 'Линейка', href: '#future' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const barClassName = [
    styles.bar,
    scrolled || isOpen ? styles.barSolid : styles.barTransparent,
  ].join(' ');

  return (
    <>
      <nav className={styles.nav}>
        <div className={barClassName}>
          <a href="#hero" className={styles.brand} aria-label="Плато: на главную">
            <img src="/assets/plato.png" alt="Плато" className={styles.logo} />
          </a>

          <div className={styles.desktopNav}>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <a href="#cta" className={styles.desktopCta}>
              Предзаказ
            </a>
          </div>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Открыть меню"
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        id={mobileMenuId}
        className={[styles.mobileMenu, isOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed].join(' ')}
      >
        <div className={styles.mobileMenuInner}>
          {LINKS.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                styles.mobileLink,
                isOpen ? styles.mobileLinkOpen : styles.mobileLinkClosed,
              ].join(' ')}
              style={{ ['--delay' as any]: `${idx * 50}ms` } as CSSProperties}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div
            className={[
              styles.mobileCtaBlock,
              isOpen ? styles.mobileCtaBlockOpen : styles.mobileCtaBlockClosed,
            ].join(' ')}
          >
            <a
              href="#cta"
              className={styles.mobileCta}
              onClick={() => setIsOpen(false)}
            >
              Предзаказ
            </a>
            <p className={styles.mobileMotto}>Порядок в деталях — дзен в голове.</p>
          </div>
        </div>
      </div>
    </>
  );
}
