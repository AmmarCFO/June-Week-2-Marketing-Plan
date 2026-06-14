import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LEAKAGE_DATA } from '../data';
import { LeakageBranchData } from '../types';
import { Search } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

export default function BudgetFocus() {
  const { locale, t } = useLocale();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTooltip, setActiveTooltip] = useState<{ id: number; x: number; y: number; text: string } | null>(null);

  // Filter leakage data based on search in both English & Arabic branch names
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return LEAKAGE_DATA;
    const query = searchQuery.trim().toLowerCase();
    return LEAKAGE_DATA.filter(item => {
      const enName = item.branch.toLowerCase();
      const arName = t(item.branch).toLowerCase();
      return enName.includes(query) || arName.includes(query);
    });
  }, [searchQuery, t]);

  // Max leakage value for bar charts scaling (top is M01 King Faisal at 19380)
  const maxLeakage = 19380;

  const totalLeakage = useMemo(() => {
    return LEAKAGE_DATA.reduce((acc, curr) => acc + curr?.leakage, 0);
  }, []);

  const handleBarMouseEnter = (e: React.MouseEvent, id: number, text: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      id,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 35,
      text
    });
    setHoveredIndex(id);
  };

  const handleBarMouseLeave = () => {
    setActiveTooltip(null);
    setHoveredIndex(null);
  };

  return (
    <section className="px-6 md:px-12 py-6 max-w-7xl mx-auto font-sans">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-[#E5E5E5]"
        id="budget-leakage-section"
      >
        {/* Panel Header */}
        <div className="bg-white border-b border-[#eee] p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-serif text-lg font-normal text-navy-800">
              {t('budget_section_title')}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t('budget_section_subtitle')}
            </p>
          </div>
          
          <div className={`${locale === 'ar' ? 'text-left' : 'text-right'} font-mono`}>
            <span className="text-[11px] text-slate-400 block lowercase">{t('budget_overall_status')}</span>
            <span className="text-lg font-bold text-navy-800">
              {locale === 'ar' ? 'ريال/شهرياً ' : 'SAR '}
              {locale === 'ar' 
                ? totalLeakage.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : totalLeakage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Leakage Horizontal Chart (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  {t('budget_chart_title')}
                </span>
                <span className="text-[10px] uppercase font-mono text-gold-600 bg-gold-50 px-2 py-0.5 rounded border border-gold-200/50">
                  {t('budget_chart_highlight')}
                </span>
              </div>

              {/* Bar List Scroll Container */}
              <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
                {LEAKAGE_DATA.map((item) => {
                  const isTop3 = item.rank <= 3;
                  const isHovered = hoveredIndex === item.rank;
                  const percentWidth = (item.leakage / maxLeakage) * 100;
                  
                  return (
                    <div 
                      key={item.branch}
                      id={`leakage-bar-${item.rank}`}
                      className={`p-1.5 transition-all duration-150 rounded-lg border border-transparent ${
                        isHovered ? 'bg-[#fdfcf9] border-gold-500/10 shadow-3xs' : ''
                      }`}
                      onMouseEnter={() => setHoveredIndex(item.rank)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="flex justify-between items-center text-xs mb-1 font-sans">
                        <span className="font-semibold text-slate-700 bar-label">
                          {t(item.branch)}
                        </span>
                        <div className="text-right font-mono text-[11px] flex items-center gap-1.5 direction-ltr">
                          <span className="text-slate-400 text-[10px]">
                            ({locale === 'ar' ? item.vacantToday.toLocaleString('ar-EG') : item.vacantToday} {locale === 'ar' ? 'شاغر @ ' : 'vacant @ '} {locale === 'ar' ? item.share.replace('%', '٪') : item.share})
                          </span>
                          <span className={`font-bold ${isTop3 ? 'text-gold-600' : 'text-navy-800'}`}>
                            {locale === 'ar' ? 'ريال ' : 'SAR '}
                            {locale === 'ar'
                              ? item.leakage.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                              : item.leakage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* Bar structure exactly matching Geometric Balance template specifications */}
                      <div 
                        className="bar-container w-full bg-[#f0f0f0] rounded overflow-hidden cursor-pointer h-[18px]"
                        onMouseEnter={(e) => handleBarMouseEnter(e, item.rank, locale === 'ar' ? `ريال ${item.leakage.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} / شهرياً` : `SAR ${item.leakage.toLocaleString('en-US', { maximumFractionDigits: 0 })} / mo`)}
                        onMouseLeave={handleBarMouseLeave}
                      >
                        <div 
                          className={`bar-fill h-full rounded transition-all duration-700 ${
                            isTop3 
                              ? 'bg-[#C8A45C]' 
                              : 'bg-[#1B2A4A]'
                          }`}
                          style={{ 
                            width: `${percentWidth}%`,
                            float: locale === 'ar' ? 'right' : 'left'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verification Insight banner */}
            <div className="mt-5 p-3.5 bg-slate-50 border border-[#eee] rounded-xl text-[11px] leading-relaxed text-slate-600 font-sans">
              {t('budget_caption_desc')}
            </div>
          </div>

          {/* Detailed Table Ledger (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t('budget_table_title')}
                </h3>
                
                {/* Micro search */}
                <div className="relative w-full sm:w-48">
                  <span className={`absolute inset-y-0 ${locale === 'ar' ? 'right-0 pr-2.5' : 'left-0 pl-2'} flex items-center pointer-events-none text-slate-400`}>
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder={t('budget_table_search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-slate-50 hover:bg-slate-100 focus:bg-white text-[11px] ${locale === 'ar' ? 'pr-8 pl-3' : 'pl-7 pr-3'} py-1.5 rounded border border-[#dfd5c2]/40 focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all font-sans`}
                  />
                </div>
              </div>

              {/* Minimal Clean Table */}
              <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto max-h-[380px] overflow-y-auto pr-1">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-[#F6F6F7] text-slate-600 font-bold border-b border-slate-200/60 sticky top-0 z-10 text-[10px] uppercase">
                      <tr>
                        <th className={`py-2 px-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('budget_table_col_rank')}</th>
                        <th className={`py-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('budget_table_col_branch')}</th>
                        <th className="py-2 text-center">{t('budget_table_col_vac')}</th>
                        <th className="py-2 text-center">{t('budget_table_col_share')}</th>
                        <th className={`py-2 pr-3 pl-3 ${locale === 'ar' ? 'text-left' : 'text-right'}`}>{t('budget_table_col_sar')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredData.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                            {t('budget_table_no_results')}
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((row) => {
                          const isTop3 = row.rank <= 3;
                          const isHovered = hoveredIndex === row.rank;
                          
                          return (
                            <tr
                              id={`table-row-${row.rank}`}
                              key={row.branch}
                              className={`transition-colors duration-150 cursor-pointer ${
                                isHovered ? 'bg-[#fdfcf9]' : isTop3 ? 'bg-slate-50/10 hover:bg-slate-50' : 'hover:bg-slate-50/50'
                              }`}
                              onMouseEnter={() => setHoveredIndex(row.rank)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            >
                              <td className={`py-2 px-3 font-mono font-bold text-slate-400 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                                {locale === 'ar' ? `#${row.rank.toLocaleString('ar-EG')}` : `#${row.rank}`}
                              </td>
                              <td className={`py-2 font-semibold text-navy-800 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                                {t(row.branch)}
                              </td>
                              <td className="py-2 text-center font-mono">
                                {locale === 'ar' ? row.vacantToday.toLocaleString('ar-EG') : row.vacantToday}
                              </td>
                              <td className="py-2 text-center font-mono">
                                <span className={`py-0.5 px-1 rounded text-[9px] ${
                                  row.shareVal === 1 
                                    ? 'bg-gold-100 text-gold-700 font-bold' 
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {locale === 'ar' ? row.share.replace('%', '٪') : row.share}
                                </span>
                              </td>
                              <td className={`py-2 font-mono font-semibold text-slate-800 ${locale === 'ar' ? 'text-left pl-3' : 'text-right pr-3'}`}>
                                {locale === 'ar' 
                                  ? row.leakage.toLocaleString('ar-EG', { maximumFractionDigits: 0 })
                                  : row.leakage.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Golden Highlighted executive Callout box */}
            <div className="mt-4 p-3.5 bg-[#fdfcf9] rounded-xl border border-gold-500/20 font-sans">
              <span className="text-[9px] uppercase text-gold-700 font-bold tracking-wider block mb-1">
                {t('budget_callout_title')}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {t('budget_callout_desc')}
              </p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Portal Tooltip */}
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
