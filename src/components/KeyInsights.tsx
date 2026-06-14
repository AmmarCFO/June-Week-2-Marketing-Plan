import React from 'react';
import { motion } from 'motion/react';
import { INSIGHTS } from '../data';
import { useLocale } from '../context/LocaleContext';

export default function KeyInsights() {
  const { t } = useLocale();

  return (
    <section className="px-6 md:px-12 py-6 max-w-7xl mx-auto mb-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        id="executive-insights-container"
      >
        <div className="mb-4">
          <h2 className="font-serif text-lg font-normal text-navy-800">
            {t('insights_section_title')}
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t('insights_section_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSIGHTS.map((insight, index) => {
            const num = index + 1;
            const title = t(`insight_${num}_title`);
            const text = t(`insight_${num}_text`);
            const badge = t(`insight_${num}_badge`);

            return (
              <div
                id={`insight-card-${num}`}
                key={insight.title}
                className="bg-[#EFE9DC] border border-[#C8A45C]/30 p-5 hover:border-[#C8A45C]/60 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-mono tracking-wider text-gold-700 font-bold uppercase bg-white/40 px-2 py-0.5 rounded border border-[#C8A45C]/20">
                      {badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-[15px] font-normal text-[#1B2A4A] mb-2 leading-tight">
                    {title}
                  </h3>

                  <p className="text-[11px] text-slate-700 leading-relaxed font-sans font-light">
                    {text}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#C8A45C]/10 flex items-center justify-between text-[9px] text-[#C8A45C] font-mono">
                  <span>{t('insights_action_item')}</span>
                  <span>{t('insights_review_required')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
