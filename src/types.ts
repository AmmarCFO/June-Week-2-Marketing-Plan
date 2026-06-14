export interface PriorityBranchData {
  branch: string;
  jun11: number;
  today: number;
  delta: number;
  direction: 'improved' | 'flat' | 'regressed';
}

export interface LeakageBranchData {
  rank: number;
  branch: string;
  vacantToday: number;
  share: string;
  shareVal: number; // e.g. 1.0, 0.3, 0.15 etc
  leakage: number;
}
