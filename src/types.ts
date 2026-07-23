export interface StoreData {
  id: string;
  name: string;
  sales: number;           // 売上 (円)
  salesBudget: number;     // 売上予算 (円)
  foodCost: number;        // 原価 (円)
  laborCost: number;       // 人件費 (円)
  otherExpenses: number;   // その他経費 (円)
  customers: number;       // 客数 (人)
  laborHours: number;      // 総労働時間 (時間)
  operatingDays: number;   // 営業日数 (日)
  salesPrevYear: number;   // 前年同月売上 (円)
  salesPrevMonth: number;  // 前月売上 (円)
  customersPrevYear: number; // 前年客数 (人)
  laborHoursPrevYear: number; // 前年総労働時間 (時間)
}

export interface PastReport {
  id: string;
  year: number;
  month: number;
  storeId: string;
  storeName: string;
  fileName: string;
  fileSize: string;
  createdAt: string;
  sales: number;
  profit: number;
  foodCostRate: number;
  laborCostRate: number;
}

export interface ChallengeCard {
  id: string;
  title: string;
  description: string;
  painPoint: string;
  futureBenefit: string;
  iconName: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  system: string;
  action: string;
  duration: string;
  isManual: boolean;
}
