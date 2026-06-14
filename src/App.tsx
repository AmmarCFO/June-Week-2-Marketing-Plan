/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import HeroKPIs from './components/HeroKPIs';
import PriorityComparison from './components/PriorityComparison';
import BudgetFocus from './components/BudgetFocus';
import KeyInsights from './components/KeyInsights';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-gold-500/30 selection:text-navy-900 overflow-x-hidden antialiased">
      <div>
        {/* Step 1: Corporate Header */}
        <Header />

        {/* Step 2: Hero KPIs Block */}
        <HeroKPIs />

        <main className="space-y-4">
          {/* Step 3: Priority Branch (June 11 vs Today) Centerpiece */}
          <PriorityComparison />

          {/* Step 4: Budget Leakage Priority analysis */}
          <BudgetFocus />

          {/* Step 5: High Resolution Strategic Takeaways */}
          <KeyInsights />
        </main>
      </div>

      {/* Step 6: Immutable Odoo verified footer */}
      <Footer />
    </div>
  );
}

