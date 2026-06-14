import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'ar';

interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const DICTIONARY: Record<Locale, Record<string, string>> = {
  en: {
    // Header
    header_title: "Priority Branch Occupancy",
    header_sub_highlight: "Marketing Focus",
    header_subtitle: "Mathwaa Internal Executive Sync • Revenue Leakage Budget Directives",
    header_baseline: "Baseline: 11 Jun  •  Status: 19 Jun 2026",
    
    // KPIs
    kpi_total_vacancies_title: "Total Vacancies",
    kpi_total_vacancies_subtext: "Across 8 priority branches",
    kpi_net_change_title: "Net Change",
    kpi_net_change_subtext: "-11.3% reduction in 8 days",
    kpi_momentum_title: "Momentum",
    kpi_momentum_subtext: "Branches showing improvement",
    kpi_top_performer_title: "Top Performer",
    kpi_top_performer_subtext: "Cleared -4 vacancies",

    // Priority comparison
    priority_section_title: "Priority Branch Movement",
    priority_section_subtitle: "Jun 11 Baseline vs Jun 19 Status across the 8 core priority branches.",
    priority_sort_label: "Sort: Absolute Improvement",
    priority_col_branch: "Branch ID & Name",
    priority_col_baseline: "Jun 11",
    priority_col_today: "Today",
    priority_col_delta: "Delta Status",
    priority_status_improved: "Improved",
    priority_status_stable: "Stable",
    priority_status_regressed: "Regressed",
    priority_status_total: "TOTAL",
    priority_status_net_fills: "-6 Net (▲ Fills)",
    priority_caption: "Net 6 vacancies cleared across priority branches in 8 days. Two branches (Al-Aqiq, Al-Narjis) saw new vacancies outpace fills — flagged for attention.",
    priority_chart_title: "Grouped Vacancy Comparison Chart",
    priority_chart_baseline: "Baseline",
    priority_chart_status: "Status",
    priority_chart_vacant: "vacant",

    // Budget Focus
    budget_section_title: "Budget Focus: Monthly Leakage",
    budget_section_subtitle: "Current Mathwaa-share rent leakage (SAR / Month) summed over vacant units.",
    budget_overall_status: "Overall Leakage Status",
    budget_chart_title: "Monthly Rent Value Leakage per Branch",
    budget_chart_highlight: "Top 3 Highlighted",
    budget_vacant_at: "vacant @",
    budget_caption_desc: "Total tracked leakage of these 17 locations is SAR 105,745.04/mo. The top 6 branches hold ~57% of total loss. M42 Al-Aarid has 22 vacant units but works on a 30% lease profile — presenting an extremely high impact opportunity for marketing mobilization.",
    budget_table_title: "Leakage Ledger Profiles",
    budget_table_search_placeholder: "Search branch...",
    budget_table_col_rank: "Pos",
    budget_table_col_branch: "Branch Name",
    budget_table_col_vac: "Vac",
    budget_table_col_share: "Share",
    budget_table_col_sar: "SAR/mo",
    budget_table_no_results: "No matching branches.",
    budget_callout_title: "Strategic Budget Directive",
    budget_callout_desc: "Total tracked leakage ≈ SAR 106,000/mo. Top 6 branches hold ~57% of total loss. M42 Al-Aarid (22 units) is a high-impact candidate to add to the priority plan.",

    // Key Insights
    insights_section_title: "Strategic Key Insights",
    insights_section_subtitle: "Core tactical takeaways for the weekly leadership marketing alignment.",
    insights_action_item: "Action Item",
    insights_review_required: "Review Required",

    // Insights items
    insight_1_title: "Vacancy count ≠ opportunity",
    insight_1_text: "M51 Al-Narjis has the most vacant units (14) yet ranks 5th in leakage because Mathwaa's share there is only 10%. King Faisal's 7 units lead by far at 100% share.",
    insight_1_badge: "Share-Driven Risk",

    insight_2_title: "Two marketing playbooks",
    insight_2_text: "High-share / few units (King Faisal 100%, M39/M31 at 30%) reward aggressive per-unit spend; low-share / high-volume (M42, M13, M51) reward occupancy-volume campaigns.",
    insight_2_badge: "Budget Strategy",

    insight_3_title: "Critical plan gaps",
    insight_3_text: "M42 Al-Aarid and M39 Al-Nakhil are top-6 leaks absent from the current priority-8 — leadership should review whether to immediately fund them.",
    insight_3_badge: "Priority Review",

    insight_4_title: "Early progress & response",
    insight_4_text: "8 days in, M38 is the clear responder (−4); Al-Aqiq and Al-Narjis need physical / pricing diagnosis (vacancies rising).",
    insight_4_badge: "Performance Audit",

    // Footer
    footer_text: "Mathwaa — Internal Marketing Sync · Baseline 11 Jun 2026 vs 19 Jun 2026 · Leakage = 2nd-negotiation price × branch Mathwaa share, summed over current vacant units · Figures verified from Odoo export.",
    confidential: "CONFIDENTIAL · INTERNAL ONLY",

    // Branches
    "M38 Al-Sulaimaniyah": "M38 Al-Sulaimaniyah",
    "M32 Al-Qayrawan": "M32 Al-Qayrawan",
    "M33 Al-Olaya": "M33 Al-Olaya",
    "M17 Al-Yasmin": "M17 Al-Yasmin",
    "M01 King Faisal": "M01 King Faisal",
    "M31 Al-Salam": "M31 Al-Salam",
    "M13 Al-Aqiq": "M13 Al-Aqiq",
    "M51 Al-Narjis": "M51 Al-Narjis",
    "M42 Al-Aarid": "M42 Al-Aarid",
    "M39 Al-Nakhil": "M39 Al-Nakhil",
    "M28 Al-Narjis": "M28 Al-Narjis",
    "M25 Al-Yarmouk": "M25 Al-Yarmouk",
    "M29 Al-Nada": "M29 Al-Nada",
    "M40 Hayy Al-Wadi": "M40 Hayy Al-Wadi",
    "M18 Al-Sulaimaniyah": "M18 Al-Sulaimaniyah",
    "M56 Al Sahman": "M56 Al Sahman",
    "M43 Al-Taawun": "M43 Al-Taawun",
  },
  ar: {
    // Header
    header_title: "إشغال الفروع ذات الأولوية",
    header_sub_highlight: "التركيز التسويقي",
    header_subtitle: "المزامنة التنفيذية الداخلية لمثوى • توجيهات ميزانية تسريب الإيرادات",
    header_baseline: "خط الأساس: ١١ يونيو  •  الحالة: ١٩ يونيو ٢٠٢٦",
    
    // KPIs
    kpi_total_vacancies_title: "إجمالي الشواغر",
    kpi_total_vacancies_subtext: "عبر ٨ فروع رئيسية ذات أولوية",
    kpi_net_change_title: "صافي التغيير",
    kpi_net_change_subtext: "انخفاض بنسبة -١١.٣٪ في ٨ أيام",
    kpi_momentum_title: "زخم الحركة",
    kpi_momentum_subtext: "فروع أظهرت تحسناً ملموساً",
    kpi_top_performer_title: "الأفضل أداءً",
    kpi_top_performer_subtext: "تم شغل -٤ شواغر بنجاح",

    // Priority comparison
    priority_section_title: "حركة الفروع ذات الأولوية",
    priority_section_subtitle: "خط الأساس في ١١ يونيو مقابل حالة ١٩ يونيو عبر الـ ٨ فروع الرئيسية ذات الأولوية.",
    priority_sort_label: "الترتيب: التحسن الفعلي المطلق",
    priority_col_branch: "معرّف الفرع والاسم",
    priority_col_baseline: "١١ يونيو",
    priority_col_today: "اليوم",
    priority_col_delta: "حالة التغير",
    priority_status_improved: "تحسّن",
    priority_status_stable: "مستقر",
    priority_status_regressed: "تراجع",
    priority_status_total: "الإجمالي",
    priority_status_net_fills: "-٦ صافي (▲ إشغال)",
    priority_caption: "تم شغل صافي ٦ شواغر في الفروع ذات الأولوية خلال ٨ أيام. فرعان (العقيق، النرجس) شهدا تراجعاً بزيادة الشواغر — تم وضع علامة انتباه لمراجعتهما بشكل عاجل.",
    priority_chart_title: "مخطط مقارنة الوحدات الشاغرة المجمعة",
    priority_chart_baseline: "خط الأساس",
    priority_chart_status: "الحالة الحالية",
    priority_chart_vacant: "شاغرة",

    // Budget Focus
    budget_section_title: "تركيز الميزانية: التسريب الشهري",
    budget_section_subtitle: "تسريب الإيجار الحالي لحصة مثوى (ريال / شهرياً) مجمعاً على الوحدات الشاغرة.",
    budget_overall_status: "إجمالي التسريب المالي",
    budget_chart_title: "التسريب المالي لقيمة الإيجار الشهري لكل فرع",
    budget_chart_highlight: "تم تمييز أعلى ٣ تسريبات بالذهب",
    budget_vacant_at: "شاغر @",
    budget_caption_desc: "التسريب المالي الإجمالي المتتبع لهذه المواقع الـ ١٧ هو ١٠٥,٧٤٥.٠٤ ريال/شهرياً. أعلى ٦ فروع تستأثر بقرابة ٥٧٪ من الخسائر الإجمالية. فرع M42 العارض يحتوي على ٢٢ وحدة شاغرة ولكن بنسبة شراكة ٣٠٪ — مما يوفر فرصة ذات تأثير هائل للحشد التسويقي الموجه.",
    budget_table_title: "تفاصيل سجل التسريب المالي",
    budget_table_search_placeholder: "ابحث عن فرع...",
    budget_table_col_rank: "ترتيب",
    budget_table_col_branch: "اسم الفرع",
    budget_table_col_vac: "شاغر",
    budget_table_col_share: "الحصّة",
    budget_table_col_sar: "ريال/شهرياً",
    budget_table_no_results: "لم يتم العثور على أي فروع مطابقة.",
    budget_callout_title: "توجيه الميزانية الإستراتيجي",
    budget_callout_desc: "التسريب الإجمالي المتتبع ≈ ١٠٦,٠٠٠ ريال/شهرياً. أعلى ٦ فروع تحوز ٥٧٪ من الخسائر. فرع M42 العارض (٢٢ وحدة) هو مرشح عالي التأثير فوراً للإدراج ضمن خطة الأولوية الموسعة.",

    // Key Insights
    insights_section_title: "الرؤى الإستراتيجية الرئيسية",
    insights_section_subtitle: "النتائج التكتيكية الجوهرية للمواءمة التسويقية والتنفيذية الأسبوعية.",
    insights_action_item: "عنصر عمل",
    insights_review_required: "مطلوب مراجعته",

    // Insights items
    insight_1_title: "عدد الشواغر لا يعكس حجم الفرصة",
    insight_1_text: "يحتوي فرع M51 النرجس على أكبر عدد من الوحدات الشاغرة (١٤) ولكنه يحتل المرتبة الخامسة في التسريب المالي لأن حصة مثوى فيه تبلغ ١٠٪ فقط. بالمقابل، شواغر فرع الملك فيصل السبعة تتصدر التسريب بحصة تبلغ ١٠٠٪.",
    insight_1_badge: "مخاطر مدفوعة بالحصّة",

    insight_2_title: "منهجان لتسويق الفروع",
    insight_2_text: "الفروع ذات الحصة العالية والوحدات القليلة (الملك فيصل ١٠٠٪، M39/M31 بنسبة ٣٠٪) تحقق عائداً ممتازاً مع إنفاق أشد تركيزاً لكل وحدة؛ بينما الفروع ذات الحجم المرتفع والحصة المنخفضة (M42، M13، M51) تناسبها حملات الإشغال العامة والواسعة.",
    insight_2_badge: "إستراتيجية الميزانية",

    insight_3_title: "فجوات رئيسية بالخطة",
    insight_3_text: "يعد فرع M42 العارض وفرع M39 النخيل من أكبر ٦ نقاط تسريب للأرباح لكنهما غائبان عن الخطة الثمانية ذات الأولوية حالياً — يجب على الإدارة مراجعة تمويلهما الفوري.",
    insight_3_badge: "مراجعة الأولويات",

    insight_4_title: "استجابة أولية سريعة",
    insight_4_text: "بعد ٨ أيام فقط، أظهر فرع M38 استجابة ممتازة وواضحة بتسجيل (−٤) شواغر؛ في حين يتوجب مراجعة وتجهيز دراسة سعرية أو تشغيلية لفرعي العقيق والنرجس نتيجة لارتفاع شواغرهما.",
    insight_4_badge: "تدقيق الأداء",

    // Footer
    footer_text: "مثوى — مزامنة التسويق الداخلي · خط الأساس ١١ يونيو ٢٠٢٦ مقابل ١٩ يونيو ٢٠٢٦ · التسريب الإيجاري = سعر التفاوض الثاني × حصة مثوى بالفرع، مجمعة على الشواغر الحالية · تم التحقق من البيانات وتطابقها مع نظام Odoo.",
    confidential: "سري للغاية · للاستخدام الداخلي فقط",

    // Branches
    "M38 Al-Sulaimaniyah": "M38 السليمانية",
    "M32 Al-Qayrawan": "M32 القيروان",
    "M33 Al-Olaya": "M33 العليا",
    "M17 Al-Yasmin": "M17 الياسمين",
    "M01 King Faisal": "M01 الملك فيصل",
    "M31 Al-Salam": "M31 السلام",
    "M13 Al-Aqiq": "M13 العقيق",
    "M51 Al-Narjis": "M51 النرجس",
    "M42 Al-Aarid": "M42 العارض",
    "M39 Al-Nakhil": "M39 النخيل",
    "M28 Al-Narjis": "M28 النرجس ٢٨",
    "M25 Al-Yarmouk": "M25 اليرموك",
    "M29 Al-Nada": "M29 الندى",
    "M40 Hayy Al-Wadi": "M40 حي الوادي",
    "M18 Al-Sulaimaniyah": "M18 السليمانية ١٨",
    "M56 Al Sahman": "M56 السحمان",
    "M43 Al-Taawun": "M43 التعاون",
  }
};

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('mathwaa_report_locale');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('mathwaa_report_locale', newLocale);
  };

  const t = (key: string): string => {
    return DICTIONARY[locale][key] || DICTIONARY['en'][key] || key;
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, dir]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      <div dir={dir} className={locale === 'ar' ? 'font-sans' : ''}>
        {children}
      </div>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
