import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'de' | 'fr' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.cta': 'Start a Project',
    'hero.title': 'BUILDING DIGITAL EXPERIENCES BEYOND TOMORROW.',
    'hero.subtitle': 'Nexenity Technologies is a technology and creative agency building AI-powered products, immersive digital experiences, intelligent automation systems, and high-performance websites for ambitious businesses, startups, and creators.',
    'hero.explore': 'Explore Our Work',
    'common.updated': 'Updated',
    'common.viewAll': 'View All Projects',
    'common.share': 'Share Agency',
    'common.shareDescription': 'Nexenity Technologies — Building Digital Experiences Beyond Tomorrow.'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.contact': 'Contacto',
    'nav.cta': 'Iniciar Proyecto',
    'hero.title': 'CONSTRUYENDO EXPERIENCIAS DIGITALES MÁS ALLÁ DEL MAÑANA.',
    'hero.subtitle': 'Nexenity Technologies es una agencia tecnológica y creativa que construye productos impulsados por IA, experiencias digitales inmersivas, sistemas de automatización inteligente y sitios web de alto rendimiento para empresas, startups y creadores ambiciosos.',
    'hero.explore': 'Explora Nuestro Trabajo',
    'common.updated': 'Actualizado',
    'common.viewAll': 'Ver Todos los Proyectos',
    'common.share': 'Compartir Agencia',
    'common.shareDescription': 'Nexenity Technologies — Construyendo Experiencias Digitales Más Allá del Mañana.'
  },
  de: {
    'nav.home': 'Start',
    'nav.about': 'Über uns',
    'nav.services': 'Leistungen',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Projekt starten',
    'hero.title': 'DIGITALE ERLEBNISSE ÜBER MORGEN HINAUS GESTALTEN.',
    'hero.subtitle': 'Nexenity Technologies ist eine Technologie- und Kreativagentur, die KI-gestützte Produkte, immersive digitale Erlebnisse, intelligente Automatisierungssysteme und Hochleistungs-Websites für ambitionierte Unternehmen, Start-ups und Kreative entwickelt.',
    'hero.explore': 'Entdecken Sie unsere Arbeit',
    'common.updated': 'Aktualisiert',
    'common.viewAll': 'Alle Projekte anzeigen',
    'common.share': 'Agentur teilen',
    'common.shareDescription': 'Nexenity Technologies — Digitale Erlebnisse über morgen hinaus gestalten.'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.cta': 'Lancer un Projet',
    'hero.title': 'CONSTRUIRE DES EXPÉRIENCES NUMÉRIQUES AU-DELÀ DE DEMAIN.',
    'hero.subtitle': 'Nexenity Technologies est une agence technologique et créative qui conçoit des produits basés sur l\'IA, des expériences numériques immersives, des systèmes d\'automatisation intelligente et des sites Web haute performance pour les entreprises, les startups et les créateurs ambitieux.',
    'hero.explore': 'Explorer notre travail',
    'common.updated': 'Mis à jour',
    'common.viewAll': 'Voir tous les projets',
    'common.share': 'Partager l\'agence',
    'common.shareDescription': 'Nexenity Technologies — Construire des expériences numériques au-delà de demain.'
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.about': '会社概要',
    'nav.services': 'サービス',
    'nav.portfolio': '実績',
    'nav.contact': 'お問い合わせ',
    'nav.cta': 'プロジェクトを開始',
    'hero.title': '明日の先を行くデジタル体験の構築。',
    'hero.subtitle': 'Nexenity Technologiesは、意欲的な企業、スタートアップ、クリエイター向けに、AI駆動の製品、没入型のデジタル体験、インテリジェントな自動化システム、および高性能なWebサイトを構築するテクノロジー＆クリエイティブエージェンシーです。',
    'hero.explore': '私たちの実績を見る',
    'common.updated': '更新日',
    'common.viewAll': 'すべてのプロジェクトを見る',
    'common.share': 'エージェンシーを共有',
    'common.shareDescription': 'Nexenity Technologies — 明日の先を行くデジタル体験の構築。'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as Language;
      if (urlLang && translations[urlLang]) return urlLang;

      const savedLang = localStorage.getItem('nexenity-language') as Language;
      if (savedLang && translations[savedLang]) return savedLang;
    } catch (e) {
      console.warn('Persistence error:', e);
    }
    return 'en';
  });

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  React.useEffect(() => {
    try {
      localStorage.setItem('nexenity-language', language);
      
      const url = new URL(window.location.href);
      if (url.searchParams.get('lang') !== language) {
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
