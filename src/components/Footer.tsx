import React from 'react';
import { useLocale } from '../context/LocaleContext';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-400 py-5 px-4 sm:px-6 md:px-12 mt-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start text-[11px]">
        <div>
          <p className="leading-relaxed">
            {t('footer_text')}
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400 shrink-0 select-none tracking-widest whitespace-nowrap">
          {t('confidential')}
        </div>
      </div>
    </footer>
  );
}

