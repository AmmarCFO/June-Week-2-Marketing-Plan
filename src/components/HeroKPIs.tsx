import React from 'react';
import { motion } from 'motion/react';
import { useLocale } from '../context/LocaleContext';

export default function HeroKPIs() {
  const { locale, t } = useLocale();

  const cards = [
    {
      id: "kpi-1",
      title: t('kpi_total_vacancies_title'),
      value: locale === 'ar' ? '٥٣ ← ٤٧' : '53 → 47',
      subtext: t('kpi_total_vacancies_subtext'),
    },
    {
      id: "kpi-2",
      title: t('kpi_net_change_title'),
      value: locale === 'ar' ? '−٦' : '−6',
      subtext: t('kpi_net_change_subtext'),
      valueColor: "text-green-400"
    },
    {
      id: "kpi-3",
      title: t('kpi_momentum_title'),
      value: locale === 'ar' ? '٤ من ٨' : '4 of 8',
      subtext: t('kpi_momentum_subtext'),
    },
    {
      id: "kpi-4",
      title: t('kpi_top_performer_title'),
      value: t('M38 Al-Sulaimaniyah'),
      subtext: t('kpi_top_performer_subtext'),
      valueColor: "text-gold-500"
    }
  ];

  return (
    <section className="bg-navy-800 py-6 px-4 sm:px-6 md:px-12 border-b border-navy-900/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          return (
            <motion.div
              id={card.id}
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white/5 p-4 flex flex-col justify-between ${
                locale === 'ar' ? 'border-r-2 border-l-0 text-right' : 'border-l-2 border-r-0 text-left'
              } border-gold-500`}
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gold-500 font-semibold block mb-1">
                  {card.title}
                </span>
                <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${card.valueColor || 'text-white'}`}>
                  {card.value}
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-light mt-1 block">
                {card.subtext}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
