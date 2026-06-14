import React from 'react';
import { useLocale } from '../context/LocaleContext';

export default function Header() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="bg-navy-800 border-b-3 border-gold-500 text-white py-4 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-normal text-white tracking-widest uppercase">
            {t('header_title')} <span className="text-gold-500 font-sans italic lowercase">&mdash;</span> <span className="text-gold-500">{t('header_sub_highlight')}</span>
          </h1>
          <p className="text-[11px] text-slate-300 tracking-wider uppercase mt-1 font-sans">
            {t('header_subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-[11px] tracking-widest font-mono text-gold-500 uppercase bg-navy-900/60 px-4 py-2 border border-gold-500/10 rounded">
            {t('header_baseline')}
          </div>
          <button
            onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
            className="text-xs font-semibold px-3 py-2 bg-gold-500 text-navy-900 hover:bg-gold-600 rounded transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm select-none shrink-0"
            style={{ fontFamily: locale === 'en' ? 'Cairo' : 'Inter' }}
          >
            {locale === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}

