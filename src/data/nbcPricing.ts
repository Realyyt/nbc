// Centralized NBC fee structure applicable across all physical courses
// Amounts in NGN

export type TrainingLevel = 'beginner' | 'intermediate' | 'advanced';

export interface FeeBreakdown {
  registration: number;
  tuition: number;
  practical: number; // Practical & Workshop
  certification: number;
}

export const LEVEL_TO_DURATION: Record<TrainingLevel, string> = {
  beginner: '3 months',
  intermediate: '6 months',
  advanced: '9 months',
};

export const NBC_FEES: Record<TrainingLevel, FeeBreakdown> = {
  beginner: {
    registration: 10000,
    tuition: 40000,
    practical: 30000,
    certification: 15000,
  },
  intermediate: {
    registration: 10000,
    tuition: 70000,
    practical: 60000,
    certification: 25000,
  },
  advanced: {
    registration: 10000,
    tuition: 130000,
    practical: 90000,
    certification: 35000,
  },
};

export function getTotalFee(level: TrainingLevel): number {
  const f = NBC_FEES[level];
  return f.registration + f.tuition + f.practical + f.certification;
}

export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}


