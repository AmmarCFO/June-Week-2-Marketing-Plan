import { PriorityBranchData, LeakageBranchData } from './types';

export const PRIORITY_BRANCHES: PriorityBranchData[] = [
  { branch: "M38 Al-Sulaimaniyah", jun11: 10, today: 6, delta: -4, direction: 'improved' },
  { branch: "M32 Al-Qayrawan", jun11: 3, today: 1, delta: -2, direction: 'improved' },
  { branch: "M33 Al-Olaya", jun11: 3, today: 1, delta: -2, direction: 'improved' },
  { branch: "M17 Al-Yasmin", jun11: 3, today: 2, delta: -1, direction: 'improved' },
  { branch: "M01 King Faisal", jun11: 7, today: 7, delta: 0, direction: 'flat' },
  { branch: "M31 Al-Salam", jun11: 4, today: 4, delta: 0, direction: 'flat' },
  { branch: "M13 Al-Aqiq", jun11: 11, today: 12, delta: 1, direction: 'regressed' },
  { branch: "M51 Al-Narjis", jun11: 12, today: 14, delta: 2, direction: 'regressed' }
];

export const LEAKAGE_DATA: LeakageBranchData[] = [
  { rank: 1, branch: "M01 King Faisal", vacantToday: 7, share: "100%", shareVal: 1.0, leakage: 19380.00 },
  { rank: 2, branch: "M42 Al-Aarid", vacantToday: 22, share: "30%", shareVal: 0.3, leakage: 12144.90 },
  { rank: 3, branch: "M13 Al-Aqiq", vacantToday: 12, share: "15%", shareVal: 0.15, leakage: 11004.60 },
  { rank: 4, branch: "M38 Al-Sulaimaniyah", vacantToday: 6, share: "25%", shareVal: 0.25, leakage: 6572.82 },
  { rank: 5, branch: "M51 Al-Narjis", vacantToday: 14, share: "10%", shareVal: 0.10, leakage: 5265.40 },
  { rank: 6, branch: "M39 Al-Nakhil", vacantToday: 4, share: "30%", shareVal: 0.30, leakage: 5114.03 },
  { rank: 7, branch: "M31 Al-Salam", vacantToday: 4, share: "30%", shareVal: 0.30, leakage: 4128.60 },
  { rank: 8, branch: "M28 Al-Narjis", vacantToday: 3, share: "30%", shareVal: 0.30, leakage: 2734.80 },
  { rank: 9, branch: "M25 Al-Yarmouk", vacantToday: 3, share: "30%", shareVal: 0.30, leakage: 2390.79 },
  { rank: 10, branch: "M29 Al-Nada", vacantToday: 2, share: "30%", shareVal: 0.30, leakage: 2168.55 },
  { rank: 11, branch: "M40 Hayy Al-Wadi", vacantToday: 2, share: "30%", shareVal: 0.30, leakage: 2146.50 },
  { rank: 12, branch: "M18 Al-Sulaimaniyah", vacantToday: 2, share: "30%", shareVal: 0.30, leakage: 2107.80 },
  { rank: 13, branch: "M17 Al-Yasmin", vacantToday: 2, share: "30%", shareVal: 0.30, leakage: 2066.70 },
  { rank: 14, branch: "M33 Al-Olaya", vacantToday: 1, share: "25%", shareVal: 0.25, leakage: 1839.95 },
  { rank: 15, branch: "M56 Al Sahman", vacantToday: 1, share: "20%", shareVal: 0.20, leakage: 1610.00 },
  { rank: 16, branch: "M43 Al-Taawun", vacantToday: 2, share: "7%", shareVal: 0.07, leakage: 1353.10 },
  { rank: 17, branch: "M32 Al-Qayrawan", vacantToday: 1, share: "25%", shareVal: 0.25, leakage: 1085.00 }
];

export const INSIGHTS = [
  {
    title: "Vacancy count ≠ opportunity",
    text: "M51 Al-Narjis has the most vacant units (14) yet ranks 5th in leakage because Mathwaa's share there is only 10%. King Faisal's 7 units lead by far at 100% share.",
    badge: "Share-Driven Risk"
  },
  {
    title: "Two marketing playbooks",
    text: "High-share / few units (King Faisal 100%, M39/M31 at 30%) reward aggressive per-unit spend; low-share / high-volume (M42, M13, M51) reward occupancy-volume campaigns.",
    badge: "Budget Strategy"
  },
  {
    title: "Critical plan gaps",
    text: "M42 Al-Aarid and M39 Al-Nakhil are top-6 leaks absent from the current priority-8 — leadership should review whether to immediately fund them.",
    badge: "Priority Review"
  },
  {
    title: "Early progress & response",
    text: "8 days in, M38 is the clear responder (−4); Al-Aqiq and Al-Narjis need physical / pricing diagnosis (vacancies rising).",
    badge: "Performance Audit"
  }
];
