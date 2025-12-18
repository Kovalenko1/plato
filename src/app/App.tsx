
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Wind, 
  Zap, 
  Layout, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Menu,
  X,
  Volume2,
  Lightbulb,
  ArrowUp
} from 'lucide-react';

// --- Types ---
interface NavLink {
  label: string;
  href: string;
}

// --- Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const links: NavLink[] = [
    { label: 'Порядок', href: '#problem' },
    { label: 'Интерьер', href: '#interior' },
    { label: 'Функции', href: '#features' },
    { label: 'Философия', href: '#emotion' },
    { label: 'Линейка', href: '#future' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 md:px-6 py-4 ${
        scrolled ? 'translate-y-0' : 'translate-y-0'
      }`}>
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-5 md:px-6 py-3 rounded-2xl border transition-all duration-500 ${
          scrolled || isOpen
            ? 'bg-white/80 glass border-plato-stroke shadow-xl' 
            : 'bg-transparent border-transparent'
        }`}>
          <a href="#hero" className="flex items-center gap-2 group relative z-[70]">
            <img
              src="/assets/plato.png"
              alt="Плато"
              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="font-bold tracking-widest text-lg uppercase">Плато</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-sm font-medium text-plato-muted hover:text-plato-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#cta" 
              className="bg-plato-accent hover:bg-plato-accent-dark text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Предзаказ
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-plato-text p-2 relative z-[70] outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div className={`fixed inset-0 z-[55] bg-white/95 backdrop-blur-2xl md:hidden transition-all duration-500 flex flex-col items-center justify-center p-8 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'
      }`}>
        <div className="flex flex-col gap-8 w-full max-w-xs text-center">
          {links.map((link, idx) => (
            <a 
              key={link.href} 
              href={link.href} 
              className={`text-3xl font-bold transition-all duration-500 delay-[${idx * 50}ms] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className={`pt-8 border-t border-plato-stroke transition-all duration-500 delay-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <a 
              href="#cta" 
              className="block w-full text-center bg-plato-accent text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-plato-accent/20"
              onClick={() => setIsOpen(false)}
            >
              Предзаказ
            </a>
            <p className="mt-8 text-sm text-plato-muted">Порядок в деталях — дзен в голове.</p>
          </div>
        </div>
      </div>
    </>
  );
};

const SectionHeading: React.FC<{ eyebrow: string; title: string; lead?: string; centered?: boolean }> = ({ eyebrow, title, lead, centered }) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl text-left'}`}>
    <p className="text-plato-accent font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 md:mb-4">{eyebrow}</p>
    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">{title}</h2>
    {lead && <p className="text-base md:text-lg text-plato-muted leading-relaxed">{lead}</p>}
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; text: string; index: number }> = ({ icon, title, text, index }) => (
  <div className="group relative bg-white/60 glass p-6 md:p-8 rounded-[2rem] border border-plato-stroke hover:border-plato-accent transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2">
    <div className="w-12 h-12 md:w-14 md:h-14 bg-plato-bg rounded-2xl flex items-center justify-center text-plato-accent mb-6 group-hover:scale-110 group-hover:bg-plato-accent group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <div className="absolute top-6 right-6 md:top-8 md:right-8 text-3xl md:text-4xl font-black text-black/5 select-none">{String(index + 1).padStart(2, '0')}</div>
    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{title}</h3>
    <p className="text-sm md:text-base text-plato-muted leading-relaxed">{text}</p>
  </div>
);

const AccordionItem: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-plato-stroke last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <div className="pr-4">
          <h4 className="text-xl md:text-2xl font-bold group-hover:text-plato-accent transition-colors">{title}</h4>
          <p className="text-xs md:text-sm text-plato-muted mt-1">{subtitle}</p>
        </div>
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-plato-stroke flex-shrink-0 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-plato-accent text-white border-plato-accent' : 'bg-transparent text-plato-text'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="text-sm md:text-base text-plato-muted leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-plato-accent selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Scroll Top Button (Mobile Optimized) */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-white glass border border-plato-stroke rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={20} className="text-plato-accent-dark" />
      </button>

      <main className="pt-20 md:pt-24">
        {/* HERO SECTION */}
        <section id="hero" className="relative overflow-hidden px-4 md:px-6 py-12 md:py-0 md:min-h-[90vh] md:flex md:items-center">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="z-10 order-2 md:order-1 min-w-0 text-center md:text-left">
              <div className="inline-flex max-w-full items-center gap-2 bg-white/50 glass border border-plato-stroke px-4 py-2 rounded-full mb-6 md:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plato-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-plato-accent"></span>
                </span>
                <span className="min-w-0 break-words text-[10px] md:text-xs font-bold uppercase tracking-wider text-plato-muted">Дом для вашей SberBoom</span>
              </div>
              <h1 className="break-words text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] md:leading-[1.1] mb-6 md:mb-8">
                Порядок, свет <br className="hidden sm:block"/>
                и <span className="font-serif italic font-medium text-plato-accent-dark">аромат</span> в одном.
              </h1>
              <p className="break-words text-lg md:text-xl text-plato-muted leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto md:mx-0">
                ПЛАТО - премиальная подставка для SberBoom, которая организует пространство и делает колонку частью интерьера.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#cta" className="w-full sm:w-auto text-center bg-plato-text text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-plato-accent-dark transition-all shadow-xl active:scale-95">
                  Предзаказ
                </a>
                <a href="#features" className="w-full sm:w-auto bg-white border border-plato-stroke px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-plato-bg transition-all text-center active:scale-95">
                  Возможности
                </a>
              </div>
               
              <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-3">
                {['Минимализм', 'Интерьер', 'Эргономика', 'LED', 'Aroma'].map(tag => (
                  <span key={tag} className="max-w-full break-words px-4 py-2 bg-plato-accent/10 border border-plato-accent/20 rounded-full text-[10px] font-bold text-plato-accent-dark uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>

            <div className="relative order-1 md:order-2 group">
              <div className="absolute -inset-10 bg-plato-accent/20 rounded-full blur-[80px] md:blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative aspect-[4/5] md:aspect-auto md:h-[550px] lg:h-[650px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/50 shadow-2xl transition-transform duration-700 md:hover:scale-[1.02]">
                <img 
                  src="https://picsum.photos/seed/plato-hero/1000/1400" 
                  alt="Plato Minimalist Concept" 
                  className="w-full h-full object-cover grayscale-[0.2] contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 bg-white/10 glass border border-white/20 rounded-2xl md:rounded-3xl backdrop-blur-xl">
                  <p className="text-white text-xs md:text-sm font-medium leading-relaxed italic">
                    "Платформа, которая задаёт место колонке и добавляет атмосферу."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM/SOLUTION (BENTO) */}
        <section id="problem" className="py-20 md:py-24 px-4 md:px-6 bg-white/40">
          <div className="max-w-6xl mx-auto">
            <SectionHeading 
              eyebrow="Проблема — Решение" 
              title="Колонка без места — визуальный шум."
              lead="Мы убрали хаос проводов, выделили колонке сцену и добавили атмосферу. Теперь технология выглядит как часть интерьера."
            />
            
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-5 bg-white p-8 md:p-10 rounded-[2.5rem] border border-plato-stroke shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                    <X className="text-red-400" size={20} /> До ПЛАТО
                  </h3>
                  <ul className="space-y-5 md:space-y-6">
                    {[
                      'Провода на виду, визуальный беспорядок на поверхностях.',
                      'Умная колонка стоит где придется, конфликтуя с декором.',
                      'Лишние гаджеты для аромата и света создают "кладбище техники".'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-5 h-5 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center text-red-500 text-[10px] font-bold">!</div>
                        <p className="text-sm md:text-base text-plato-muted">{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 md:mt-12 h-32 md:h-40 bg-slate-100 rounded-2xl flex items-center justify-center border border-dashed border-slate-300">
                  <p className="text-[10px] text-slate-400 font-medium italic uppercase tracking-widest">Визуальный хаос</p>
                </div>
              </div>

              <div className="md:col-span-7 bg-plato-accent p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl shadow-plato-accent/20 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                    <Sparkles className="text-white" size={20} /> С ПЛАТО
                  </h3>
                  <ul className="space-y-5 md:space-y-6">
                    {[
                      'Кабель скрыт внутри — идеальная чистота столешницы.',
                      'Собственная платформа подчеркивает премиальность устройства.',
                      'Встроенная подсветка и аромат-картридж без лишних проводов.'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                        <p className="text-sm md:text-base text-white/90">{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-10 mt-8 md:mt-12 h-48 md:h-64 bg-black/10 rounded-2xl overflow-hidden border border-white/20">
                  <img src="https://picsum.photos/seed/clean-desk/1000/800" className="w-full h-full object-cover mix-blend-overlay opacity-40" alt="Clean Interior" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase">Абсолютный Дзен</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERIOR IDEAS */}
        <section id="interior" className="py-20 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
              <SectionHeading 
                eyebrow="Интерьерные задумки" 
                title="Место для каждой детали" 
              />
              <p className="max-w-md text-sm md:text-base text-plato-muted md:pb-4">Подборка идей, как интегрировать SberBoom на ПЛАТО в ваш дом: от спальни до рабочего кабинета.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group space-y-4">
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-plato-stroke shadow-lg">
                  <img src="https://picsum.photos/seed/interior-1/800/1000" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" alt="Interior Warm" />
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-lg md:text-xl">Тёплый акцент</h4>
                  <p className="text-xs md:text-sm text-plato-muted mt-2 leading-relaxed">Кольцо света работает как каминный отблеск: на комоде, консоли или книжной полке.</p>
                </div>
              </div>

              <div className="group space-y-4 md:mt-12">
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-plato-stroke shadow-lg">
                  <img src="https://picsum.photos/seed/interior-2/800/1000" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" alt="Interior Minimal" />
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-lg md:text-xl">Тихий профиль</h4>
                  <p className="text-xs md:text-sm text-plato-muted mt-2 leading-relaxed">Низкий силуэт не спорит с мебелью — идеально для тумбы под ТВ или рабочего стола.</p>
                </div>
              </div>

              <div className="bg-white/80 glass p-8 md:p-10 rounded-[2.5rem] border border-plato-stroke shadow-sm self-start">
                <h4 className="font-bold text-lg md:text-xl mb-6">Палитра сочетаний</h4>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { color: '#B4B8A9', name: 'Олива' },
                    { color: '#E7E2D7', name: 'Песок' },
                    { color: '#C7B29A', name: 'Дуб' },
                    { color: '#1F1F1C', name: 'Уголь' }
                  ].map(swatch => (
                    <div key={swatch.name} className="flex items-center gap-2 p-2 bg-plato-bg rounded-xl border border-plato-stroke">
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-md shadow-inner" style={{ backgroundColor: swatch.color }}></div>
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter text-plato-muted">{swatch.name}</span>
                    </div>
                  ))}
                </div>
                <ul className="space-y-4 text-xs md:text-sm text-plato-muted leading-relaxed">
                  <li className="flex gap-3"><ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-plato-accent" /> Дерево + лен + зелень: джапанди.</li>
                  <li className="flex gap-3"><ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-plato-accent" /> Камень + металл: современная классика.</li>
                  <li className="flex gap-3"><ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-plato-accent" /> Книга + свеча + ПЛАТО: композиция.</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-20 md:py-24 px-4 md:px-6 bg-plato-bg/50">
          <div className="max-w-6xl mx-auto">
            <SectionHeading 
              centered
              eyebrow="Преимущества" 
              title="Продуманная эргономика" 
              lead="Каждый элемент ПЛАТО работает незаметно, оставляя ощущение простора и мягкого света."
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: <Wind size={26} />, title: 'Скрытый аромат', text: 'Специальный отсек для картриджа. Тонкий аромат без лишних девайсов.' },
                { icon: <Lightbulb size={26} />, title: 'Мягкий LED', text: 'Адаптивная подсветка основания. Создаёт уютный ореол вокруг колонки.' },
                { icon: <Zap size={26} />, title: 'Cable Management', text: 'Прячет штекер и провод внутри корпуса. Выход кабеля снизу.' },
              ].map((f, i) => (
                <FeatureCard 
                  key={i}
                  index={i}
                  icon={f.icon}
                  title={f.title}
                  text={f.text}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY / EMOTION */}
        <section id="emotion" className="py-20 md:py-24 px-4 md:px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="text-center md:text-left">
              <SectionHeading 
                eyebrow="Философия" 
                title="Дом — это ваше спокойствие"
              />
              <div className="relative inline-block text-left">
                <div className="text-4xl lg:text-5xl font-serif italic text-plato-accent/40 absolute -top-10 -left-6 md:-top-12 md:-left-8 pointer-events-none">“</div>
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10 italic">
                  ПЛАТО — это небольшая сцена для вашего помощника. Когда на столе порядок, мыслить легче, слушать музыку приятнее, а дом кажется спокойнее.
                </blockquote>
                <p className="font-bold text-plato-accent uppercase tracking-[0.2em] text-[10px] md:text-xs text-center md:text-left">— Команда ПЛАТО</p>
              </div>
              
              <div className="mt-12 md:mt-16 grid grid-cols-2 gap-6 md:gap-8 text-left">
                <div className="p-4 bg-white rounded-2xl border border-plato-stroke">
                  <h4 className="font-bold mb-2 text-sm md:text-base">Минимум</h4>
                  <p className="text-xs md:text-sm text-plato-muted">Избавляемся от визуального мусора, оставляя только суть.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-plato-stroke">
                  <h4 className="font-bold mb-2 text-sm md:text-base">Атмосфера</h4>
                  <p className="text-xs md:text-sm text-plato-muted">Аромат и свет создают ощущение живого присутствия.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-plato-accent/10 blur-[80px] md:blur-[120px] rounded-full"></div>
              <div className="relative grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  <div className="h-48 md:h-64 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-plato-stroke transform translate-y-6 md:translate-y-8">
                    <img src="https://picsum.photos/seed/phi-1/600/800" className="w-full h-full object-cover" alt="Detail 1" />
                  </div>
                  <div className="h-32 md:h-48 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-plato-stroke transform translate-y-6 md:translate-y-8">
                    <img src="https://picsum.photos/seed/phi-2/600/800" className="w-full h-full object-cover" alt="Detail 2" />
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4 pt-4">
                  <div className="h-32 md:h-48 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-plato-stroke">
                    <img src="https://picsum.photos/seed/phi-3/600/800" className="w-full h-full object-cover" alt="Detail 3" />
                  </div>
                  <div className="h-48 md:h-64 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-plato-stroke">
                    <img src="https://picsum.photos/seed/phi-4/600/800" className="w-full h-full object-cover" alt="Detail 4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE LINEUP */}
        <section id="future" className="py-20 md:py-24 px-4 md:px-6 bg-white/40 border-y border-plato-stroke">
          <div className="max-w-6xl mx-auto">
            <SectionHeading 
              centered
              eyebrow="Эволюция" 
              title="Линейка будущего" 
              lead="Три конфигурации, разработанные для разных сценариев жизни."
            />
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: 'ПЛАТО', desc: 'Базовая версия — подсветка, кабель-менеджмент, алюминиевое основание.' },
                { name: 'ПЛАТО ПЛЮС', desc: 'Добавляем аромат-картридж, сенсорное кольцо и премиальные цвета.' },
                { name: 'ПЛАТО ПРО', desc: 'Умные сценарии, RGB-светомузыка и интеграция с датчиками дома.' }
              ].map((item, idx) => (
                <div key={item.name} className="relative p-8 md:p-10 bg-white rounded-3xl border border-plato-stroke md:hover:shadow-xl transition-all group overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-20 h-20 md:w-24 md:h-24 bg-plato-accent/5 rounded-full md:group-hover:scale-150 transition-transform"></div>
                  <div className="text-plato-accent font-bold mb-4 flex items-center gap-2">
                    {Array(idx + 1).fill(0).map((_, i) => <Sparkles key={i} size={12} />)}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{item.name}</h4>
                  <p className="text-xs md:text-sm text-plato-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-20 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-plato-text text-white p-10 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-plato-accent-dark/40 to-transparent"></div>
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
              <SectionHeading 
                centered
                eyebrow="Запуск скоро"
                title="Дайте вашей колонке дом уже сегодня"
                lead=""
              />
              <p className="text-white/60 text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto">
                Оставьте заявку, чтобы получить эксклюзивную цену раннего доступа и секретный бонус к запуску.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 max-w-md mx-auto sm:max-w-none">
                <button className="bg-plato-accent hover:bg-white hover:text-plato-text px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all shadow-2xl active:scale-95">
                  Оставить заявку
                </button>
              </div>
              
              <div className="mt-16 flex items-center justify-center gap-6 md:gap-10 opacity-30 grayscale brightness-200">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-plato-stroke bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/plato.png"
                alt="Плато"
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold tracking-widest text-lg uppercase">Плато</span>
            </div>
            <p className="text-xs text-plato-muted text-center md:text-left max-w-[200px]">Создаём пространство для технологий, которые мы любим.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm font-medium text-plato-muted">
            <a href="#" className="hover:text-plato-accent transition-colors">Приватность</a>
            <a href="#" className="hover:text-plato-accent transition-colors">Доставка</a>
            <a href="#" className="hover:text-plato-accent transition-colors">Гарантия</a>
            <a href="#" className="hover:text-plato-accent transition-colors">B2B</a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-[10px] md:text-xs text-plato-muted uppercase tracking-widest font-bold mb-1">Made in Moscow</p>
            <p className="text-[10px] text-plato-muted opacity-60">
              © {new Date().getFullYear()} ПЛАТО. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
