import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRIORITY_BRANCHES } from '../data';
import { PriorityBranchData } from '../types';
import { useLocale } from '../context/LocaleContext';

export default function PriorityComparison() {
  const { locale, t } = useLocale();
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ branch: string; x: number; y: number; text: string } | null>(null);

  const maxVal = 16;

  const handleBarMouseEnter = (e: React.MouseEvent, branch: string, text: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      branch,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 35,
      text
    });
    setHoveredBranch(branch);
  };

  const handleBarMouseLeave = () => {
    setActiveTooltip(null);
    setHoveredBranch(null);
  };

  return (
    <section className="px-4 sm:px-6 md:px-12 py-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-[#E5E5E5]"
        id="priority-branches-section"
      >
        {/* Panel Header */}
        <div className="bg-white border-b border-[#eee] p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-serif text-lg font-normal text-navy-800">
              {t('priority_section_title')}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 font-sans leading-relaxed">
              {t('priority_section_subtitle')}
            </p>
          </div>
          
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider uppercase bg-slate-50 px-2 py-1 rounded">
            {t('priority_sort_label')}
          </span>
        </div>

        {/* Layout Grid */}
        <div className="p-4 sm:p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Table View (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            <div>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full border-collapse text-left text-xs sm:text-[13px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                        <th className={`py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 font-bold ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                          {t('priority_col_branch')}
                        </th>
                        <th className="py-2.5 px-2 sm:px-3 text-center text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 font-bold">
                          {t('priority_col_baseline')}
                        </th>
                        <th className="py-2.5 px-2 sm:px-3 text-center text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 font-bold">
                          {t('priority_col_today')}
                        </th>
                        <th className={`py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 font-bold ${locale === 'ar' ? 'text-left' : 'text-right'}`}>
                          {t('priority_col_delta')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PRIORITY_BRANCHES.map((row) => {
                        const isHovered = hoveredBranch === row.branch;
                        
                        return (
                          <tr
                            id={`row-${row.branch.replace(/\s+/g, '-').toLowerCase()}`}
                            key={row.branch}
                            className={`transition-all duration-150 cursor-pointer ${
                              isHovered ? 'bg-[#fdfcf9]' : 'hover:bg-slate-50/50'
                            }`}
                            onMouseEnter={() => setHoveredBranch(row.branch)}
                            onMouseLeave={() => setHoveredBranch(null)}
                          >
                            <td className={`py-2.5 px-3 sm:px-4 font-semibold text-navy-800 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                              {t(row.branch)}
                            </td>
                            <td className="py-2.5 px-2 sm:px-3 text-center font-mono text-slate-600">
                              {locale === 'ar' ? row.jun11.toLocaleString('ar-EG') : row.jun11}
                            </td>
                            <td className="py-2.5 px-2 sm:px-3 text-center font-mono font-bold text-navy-800">
                              {locale === 'ar' ? row.today.toLocaleString('ar-EG') : row.today}
                            </td>
                            <td className={`py-2.5 px-3 sm:px-4 ${locale === 'ar' ? 'text-left' : 'text-right'}`}>
                              {row.direction === 'improved' && (
                                <span className="inline-block px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] bg-emerald-50 text-[#2E7D5B] border border-emerald-100 whitespace-nowrap">
                                  {locale === 'ar' ? `${row.delta} ${t('priority_status_improved')}` : `${row.delta} Improved`}
                                </span>
                              )}
                              {row.direction === 'flat' && (
                                <span className="inline-block px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] bg-slate-100 text-slate-500 whitespace-nowrap">
                                  {locale === 'ar' ? `٠ ${t('priority_status_stable')}` : `0 Stable`}
                                </span>
                              )}
                              {row.direction === 'regressed' && (
                                <span className="inline-block px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] bg-rose-50 text-[#C0492F] border border-rose-100 whitespace-nowrap">
                                  {locale === 'ar' ? `+${row.delta} ${t('priority_status_regressed')}` : `+${row.delta} Regressed`}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      
                      {/* Grand Total Row */}
                      <tr className="bg-[#F6F6F7] font-bold text-navy-800 border-t-2 border-navy-800/20">
                        <td className={`py-3 px-3 sm:px-4 uppercase text-xs tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                          {t('priority_status_total')}
                        </td>
                        <td className="py-3 px-2 sm:px-3 text-center font-mono">
                          {locale === 'ar' ? '٥٣' : '53'}
                        </td>
                        <td className="py-3 px-2 sm:px-3 text-center font-mono">
                          {locale === 'ar' ? '٤٧' : '47'}
                        </td>
                        <td className={`py-3 px-3 sm:px-4 ${locale === 'ar' ? 'text-left' : 'text-right'}`}>
                          <span className="inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] bg-emerald-100 text-[#2E7D5B] border border-emerald-200 whitespace-nowrap">
                            {t('priority_status_net_fills')}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sub-note caption exactly matching the text of section 2 template */}
            <div className="mt-2 p-3.5 bg-slate-50 rounded-lg border border-slate-200/60 text-[11px] text-slate-600 italic leading-relaxed">
              {t('priority_caption')}
            </div>
          </div>

          {/* Grouped Bar Chart View (Cols 8-12) */}
          <div className="lg:col-span-5 bg-slate-50/50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 font-sans">
                {t('priority_chart_title')}
              </h3>

              <div className="space-y-3">
                {PRIORITY_BRANCHES.map((row) => {
                  const isHovered = hoveredBranch === row.branch;
                  const pct11 = (row.jun11 / maxVal) * 100;
                  const pctToday = (row.today / maxVal) * 100;
                  
                  return (
                    <div
                      id={`chart-${row.branch.replace(/\s+/g, '-').toLowerCase()}`}
                      key={row.branch}
                      className={`p-2 rounded transition-all duration-150 ${
                        isHovered ? 'bg-[#fdfcf9] border border-gold-500/20 shadow-xs' : 'border border-transparent'
                      }`}
                      onMouseEnter={() => setHoveredBranch(row.branch)}
                      onMouseLeave={() => setHoveredBranch(null)}
                    >
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs mb-1.5">
                        <span className="font-semibold text-slate-700">{t(row.branch)}</span>
                        <div className="flex items-center gap-1.5 xs:gap-2 font-mono text-[9px] xs:text-[10px]">
                          <span className="text-slate-400">
                            {locale === 'ar' ? `${t('priority_chart_baseline')} ${row.jun11.toLocaleString('ar-EG')}` : `Baseline ${row.jun11}`}
                          </span>
                          <span className="text-slate-300">&bull;</span>
                          <span className="font-bold text-navy-800">
                            {locale === 'ar' ? `${t('priority_chart_status')} ${row.today.toLocaleString('ar-EG')}` : `Status ${row.today}`}
                          </span>
                        </div>
                      </div>

                      {/* Bar groups */}
                      <div className="space-y-1">
                        {/* Baseline */}
                        <div className="relative h-2 w-full bg-[#f0f0f0] rounded overflow-hidden">
                          <div 
                            className="absolute top-0 bottom-0 bg-slate-400 rounded transition-all duration-500"
                            style={{ 
                              width: `${pct11}%`,
                              [locale === 'ar' ? 'right' : 'left']: 0 
                            }}
                            onMouseEnter={(e) => handleBarMouseEnter(e, row.branch, locale === 'ar' ? `خط أساس ١١ مايو: ${row.jun11} شاغر` : `May 11 Baseline: ${row.jun11} vacant`)}
                            onMouseLeave={handleBarMouseLeave}
                          />
                        </div>

                        {/* Today */}
                        <div className="relative h-2 w-full bg-[#f0f0f0] rounded overflow-hidden">
                          <div 
                            className={`absolute top-0 bottom-0 rounded transition-all duration-500 ${
                              row.direction === 'improved' ? 'bg-[#2E7D5B]' : 
                              row.direction === 'regressed' ? 'bg-[#C0492F]' : 'bg-[#C8A45C]'
                            }`}
                            style={{ 
                              width: `${pctToday}%`,
                              [locale === 'ar' ? 'right' : 'left']: 0 
                            }}
                            onMouseEnter={(e) => handleBarMouseEnter(e, row.branch, locale === 'ar' ? `حالة اليوم: ${row.today} شاغر` : `Today status: ${row.today} vacant`)}
                            onMouseLeave={handleBarMouseLeave}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-slate-400 inline-block" /> {locale === 'ar' ? '١١ مايو' : 'May 11'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-gold-500 inline-block" /> {locale === 'ar' ? '١٩ يونيو' : 'Jun 19'}
              </span>
              <span className="text-[#2E7D5B] font-bold">
                {locale === 'ar' ? 'الانخفاض: -٦' : 'Reduction: -6'}
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Global Tooltip */}
      {activeTooltip && (
        <div 
          className="fixed z-50 bg-navy-800 text-white text-[11px] font-mono py-1.5 px-3 rounded shadow-xl pointer-events-none border border-gold-500/20"
          style={{ 
            left: `${activeTooltip.x}px`, 
            top: `${activeTooltip.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {activeTooltip.text}
        </div>
      )}
    </section>
  );
}
