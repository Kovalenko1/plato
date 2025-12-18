import styles from './HeroSection.module.scss';

const TAGS = ['Минимализм', 'Интерьер', 'Эргономика', 'LED', 'Aroma'];

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span className={styles.badgeText}>Дом для вашей SberBoom</span>
            </div>

            <h1 className={styles.title}>
              Порядок, свет{' '}
              <span className={styles.titleBreak} aria-hidden="true">
                <br />
              </span>
              и <span className={styles.titleAccent}>аромат</span> в одном.
            </h1>

            <p className={styles.lead}>
              ПЛАТО — премиальная подставка для SberBoom, которая организует пространство и делает колонку частью
              интерьера.
            </p>

            <div className={styles.actions}>
              <a href="#cta" className={styles.primaryButton}>
                Предзаказ
              </a>
              <a href="#features" className={styles.secondaryButton}>
                Возможности
              </a>
            </div>

            <div className={styles.tags} aria-label="Теги">
              {TAGS.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.media}>
            <div className={styles.mediaGlow} aria-hidden="true" />
            <div className={styles.mediaCard}>
              <img
                src="assets/homeModel/1.png"
                alt="ПЛАТО в интерьере"
                className={styles.mediaImage}
              />
              <div className={styles.mediaOverlay} aria-hidden="true" />

              <div className={styles.mediaQuote}>
                <p className={styles.mediaQuoteText}>
                  «Платформа, которая задаёт место колонке и добавляет атмосферу».
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

