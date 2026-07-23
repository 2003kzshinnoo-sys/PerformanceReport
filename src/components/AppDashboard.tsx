import React, { useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  Percent,
  Sliders,
  DollarSign
} from "lucide-react";
import { mockStores } from "../data/mockStoreData";
import { StoreData } from "../types";

export default function AppDashboard() {
  const [selectedStoreId, setSelectedStoreId] = useState<string>("kounandai");
  
  // Simulation modifiers
  const [salesModifier, setSalesModifier] = useState<number>(0); // percent adjustment (-20% to +20%)
  const [hoursModifier, setHoursModifier] = useState<number>(0); // percent adjustment (-30% to +30%)

  // Get current store base data
  const baseStore = mockStores.find(s => s.id === selectedStoreId) || mockStores[0];

  // Calculate simulated values
  const salesSim = Math.round(baseStore.sales * (1 + salesModifier / 100));
  const laborHoursSim = Math.round(baseStore.laborHours * (1 + hoursModifier / 100));
  
  // Keep raw costs proportional to business or simulate static variables
  const foodCostSim = Math.round(baseStore.foodCost * (1 + (salesModifier * 0.7) / 100)); // Variable cost increases slightly slower than sales
  const laborCostSim = Math.round(baseStore.laborCost * (1 + (hoursModifier) / 100)); // Labor cost matches hours directly
  const otherExpensesSim = baseStore.otherExpenses; // Fixed cost stays same

  const profitSim = salesSim - foodCostSim - laborCostSim - otherExpensesSim;
  
  // Rate calculations
  const foodCostRateSim = parseFloat(((foodCostSim / salesSim) * 100).toFixed(1));
  const laborCostRateSim = parseFloat(((laborCostSim / salesSim) * 100).toFixed(1));
  const otherCostRateSim = parseFloat(((otherExpensesSim / salesSim) * 100).toFixed(1));
  const profitRateSim = parseFloat(((profitSim / salesSim) * 100).toFixed(1));

  // Additional indicators
  const budgetAchievement = parseFloat(((salesSim / baseStore.salesBudget) * 100).toFixed(1));
  const salesYoY = parseFloat(((salesSim / baseStore.salesPrevYear) * 100).toFixed(1));
  const salesMoM = parseFloat(((salesSim / baseStore.salesPrevMonth) * 100).toFixed(1));
  const averageSpend = Math.round(salesSim / baseStore.customers);
  const laborProductivity = Math.round(salesSim / laborHoursSim);

  // Formatting utility
  const formatYen = (num: number) => {
    return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(num);
  };

  // Warning thresholds
  const isHighFoodCost = foodCostRateSim > 33;
  const isHighLaborCost = laborCostRateSim > 32;
  const isLowBudget = budgetAchievement < 95;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="inline-block text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full mb-2">
            Section 4: アプリの画面イメージ
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-red-600" />
            店舗別ダッシュボード・プロトタイプ
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            本稼働後の操作イメージ。11店舗の数字を瞬時に切り替え、現場で直感的に操作できる管理UI。
          </p>
        </div>

        {/* Store Selector pills */}
        <div className="mt-4 md:mt-0 max-w-full overflow-x-auto pb-2 md:pb-0 flex gap-1.5 scrollbar-thin">
          <select 
            value={selectedStoreId} 
            onChange={(e) => {
              setSelectedStoreId(e.target.value);
              setSalesModifier(0);
              setHoursModifier(0);
            }}
            className="bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-800 outline-none cursor-pointer hover:bg-gray-900 transition-all shadow-sm"
          >
            {mockStores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Stats */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Sales Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">売上高</span>
                <span className="text-xl font-black text-gray-900 font-mono tracking-tight block mt-1">
                  {formatYen(salesSim)}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">予算達成率:</span>
                <span className={`font-mono font-bold ${budgetAchievement >= 100 ? "text-red-600" : "text-gray-600"}`}>
                  {budgetAchievement}%
                </span>
              </div>
            </div>

            {/* Food Cost Rate Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">原価率</span>
                <span className={`text-xl font-black font-mono tracking-tight block mt-1 ${isHighFoodCost ? "text-red-600" : "text-gray-900"}`}>
                  {foodCostRateSim}%
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">原材料費:</span>
                <span className="font-mono font-bold text-gray-900">{formatYen(foodCostSim)}</span>
              </div>
            </div>

            {/* Labor Cost Rate Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">人件費率</span>
                <span className={`text-xl font-black font-mono tracking-tight block mt-1 ${isHighLaborCost ? "text-red-600" : "text-gray-900"}`}>
                  {laborCostRateSim}%
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">総人件費:</span>
                <span className="font-mono font-bold text-gray-900">{formatYen(laborCostSim)}</span>
              </div>
            </div>

            {/* Customers Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">来店客数 / 客単価</span>
                <span className="text-xl font-black text-gray-900 font-mono tracking-tight block mt-1">
                  {baseStore.customers.toLocaleString()}人
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">客単価:</span>
                <span className="font-mono font-bold text-gray-900">{formatYen(averageSpend)}</span>
              </div>
            </div>

            {/* Labor Hours Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">労働時間 / 人時生産性</span>
                <span className="text-xl font-black text-gray-900 font-mono tracking-tight block mt-1">
                  {laborHoursSim.toLocaleString()}時間
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">生産性(売上/H):</span>
                <span className="font-mono font-bold text-red-600">{formatYen(laborProductivity)}</span>
              </div>
            </div>

            {/* Profit (損益) Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">損益</span>
                <span className={`text-xl font-black font-mono tracking-tight block mt-1 ${profitSim >= 0 ? "text-red-600" : "text-gray-500"}`}>
                  {formatYen(profitSim)}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">営業利益率:</span>
                <span className="font-mono font-bold text-gray-900">{profitRateSim}%</span>
              </div>
            </div>

          </div>

          {/* PL Cost Composition Stacked Bar */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>売上コスト構成比（営業利益率へのインパクト）</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-mono">
                売上比 100%
              </span>
            </h4>
            
            {/* Horizontal Stacked Bar representing PL */}
            <div className="h-8 w-full rounded-lg overflow-hidden flex text-[10px] font-mono text-white font-bold mb-4">
              <div 
                style={{ width: `${foodCostRateSim}%` }} 
                className="bg-red-600 hover:opacity-90 transition-all flex items-center justify-center truncate px-1"
                title={`原価: ${foodCostRateSim}%`}
              >
                原価 {foodCostRateSim}%
              </div>
              <div 
                style={{ width: `${laborCostRateSim}%` }} 
                className="bg-black hover:opacity-90 transition-all flex items-center justify-center truncate px-1 border-l border-white/20"
                title={`人件費: ${laborCostRateSim}%`}
              >
                人件費 {laborCostRateSim}%
              </div>
              <div 
                style={{ width: `${otherCostRateSim}%` }} 
                className="bg-gray-400 hover:opacity-90 transition-all flex items-center justify-center truncate px-1 border-l border-white/20"
                title={`その他経費: ${otherCostRateSim}%`}
              >
                経費 {otherCostRateSim}%
              </div>
              <div 
                style={{ width: `${Math.max(0, profitRateSim)}%` }} 
                className="bg-gray-200 text-gray-900 hover:opacity-90 transition-all flex items-center justify-center truncate px-1 border-l border-white/20"
                title={`営業利益: ${profitRateSim}%`}
              >
                利益 {profitRateSim}%
              </div>
            </div>

            {/* Color Legend & Detailed Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-600 rounded-sm"></span>
                <div>
                  <span className="text-gray-400">原材料費（原価）:</span>
                  <div className="font-bold text-gray-900">{formatYen(foodCostSim)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black rounded-sm"></span>
                <div>
                  <span className="text-gray-400">総人件費:</span>
                  <div className="font-bold text-gray-900">{formatYen(laborCostSim)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>
                <div>
                  <span className="text-gray-400">家賃・諸経費:</span>
                  <div className="font-bold text-gray-900">{formatYen(otherExpensesSim)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-200 rounded-sm"></span>
                <div>
                  <span className="text-gray-400">営業利益（純益）:</span>
                  <div className={`font-bold ${profitSim >= 0 ? "text-red-600" : "text-gray-500"}`}>
                    {formatYen(profitSim)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trends Indicators: Budget, YoY, MoM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-between">
                <span>予算比（目標達成）</span>
                <span className="font-mono text-gray-500">7月実績 vs 当月予算</span>
              </h5>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">当月予算: {formatYen(baseStore.salesBudget)}</div>
                  <div className="text-lg font-black text-gray-900 font-mono mt-0.5">{budgetAchievement}%</div>
                </div>
                <div className={`p-2.5 rounded-full ${budgetAchievement >= 100 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                  {budgetAchievement >= 100 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-between">
                <span>前年同月比（売上成長）</span>
                <span className="font-mono text-gray-500">7月実績 vs 前年7月</span>
              </h5>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">前年売上: {formatYen(baseStore.salesPrevYear)}</div>
                  <div className="text-lg font-black text-gray-900 font-mono mt-0.5">{salesYoY}%</div>
                </div>
                <div className={`p-2.5 rounded-full ${salesYoY >= 100 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                  {salesYoY >= 100 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-between">
                <span>前月比（成長トレンド）</span>
                <span className="font-mono text-gray-500">7月実績 vs 6月</span>
              </h5>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">前月売上: {formatYen(baseStore.salesPrevMonth)}</div>
                  <div className="text-lg font-black text-gray-900 font-mono mt-0.5">{salesMoM}%</div>
                </div>
                <div className={`p-2.5 rounded-full ${salesMoM >= 100 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                  {salesMoM >= 100 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Interaction Sliders & Warnings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Interactive Simulation Panel */}
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-red-600" />
              <span>数値シミュレーター</span>
            </h4>
            
            <p className="text-[11px] text-gray-500 mb-5 leading-relaxed">
              売上やシフト時間を調整した際、利益や原価率にどのような「連鎖変化」が起きるか。店長の経営脳を育むシミュレーション。
            </p>

            {/* Slider 1: Sales */}
            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <label className="text-xs font-bold text-gray-700">売上高の変動調整</label>
                <span className="text-xs font-mono font-bold text-red-600">
                  {salesModifier >= 0 ? `+${salesModifier}` : salesModifier}%
                </span>
              </div>
              <input 
                type="range" 
                min="-20" 
                max="20" 
                step="2"
                value={salesModifier}
                onChange={(e) => setSalesModifier(parseInt(e.target.value))}
                className="w-full accent-red-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>客数減 (-20%)</span>
                <span>基準値 (0%)</span>
                <span>繁忙 (+20%)</span>
              </div>
            </div>

            {/* Slider 2: Labor Hours */}
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <label className="text-xs font-bold text-gray-700">総労働時間の変動調整</label>
                <span className="text-xs font-mono font-bold text-black">
                  {hoursModifier >= 0 ? `+${hoursModifier}` : hoursModifier}%
                </span>
              </div>
              <input 
                type="range" 
                min="-30" 
                max="30" 
                step="5"
                value={hoursModifier}
                onChange={(e) => setHoursModifier(parseInt(e.target.value))}
                className="w-full accent-black h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>時短/削減 (-30%)</span>
                <span>基準値 (0%)</span>
                <span>残業過多 (+30%)</span>
              </div>
            </div>

            {/* Reset simulation button */}
            {(salesModifier !== 0 || hoursModifier !== 0) && (
              <button 
                onClick={() => {
                  setSalesModifier(0);
                  setHoursModifier(0);
                }}
                className="w-full py-2 bg-white border border-gray-200 text-xs font-bold rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-mono"
              >
                数値を元に戻す
              </button>
            )}
          </div>

          {/* Warnings & Suggestions (Autonomous detection) */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              異常値アラート自動検出
            </h4>

            <div className="space-y-3">
              {/* Food Cost Alarm */}
              <div className={`p-3 rounded-lg border text-xs ${
                isHighFoodCost 
                  ? "border-red-200 bg-red-50 text-red-900" 
                  : "border-gray-100 bg-gray-50 text-gray-500"
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isHighFoodCost ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>原価率 異常値警報</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>原価率 正常圏内</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isHighFoodCost 
                    ? `原価率が${foodCostRateSim}%（基準値33%未満）に高騰中。当月のロス確認、または食材仕入先との単価交渉・仕入コントロールが必要です。`
                    : `原価率は${foodCostRateSim}%と目標をクリア。健全な仕入管理が維持されています。`
                  }
                </p>
              </div>

              {/* Labor Cost Alarm */}
              <div className={`p-3 rounded-lg border text-xs ${
                isHighLaborCost 
                  ? "border-red-200 bg-red-50 text-red-900" 
                  : "border-gray-100 bg-gray-50 text-gray-500"
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isHighLaborCost ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>人件費率 過剰過負荷</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>人件費率 正常圏内</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isHighLaborCost 
                    ? `人件費比率が${laborCostRateSim}%（基準値32%以下）と過大です。シフトの最適化、アイドルタイムの縮小、または時給調整シミュレーションが必要です。`
                    : `人件費率は${laborCostRateSim}%と生産性の水準を満たしています。`
                  }
                </p>
              </div>

              {/* Budget Alarm */}
              <div className={`p-3 rounded-lg border text-xs ${
                isLowBudget 
                  ? "border-red-200 bg-red-50 text-red-900" 
                  : "border-gray-100 bg-gray-50 text-gray-500"
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isLowBudget ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>予算未達アラート</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>予算達成</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isLowBudget 
                    ? `予算達成率が${budgetAchievement}%と未達傾向です。来店客数の底上げ、または客単価向上のための付加価値メニューの訴求が必要です。`
                    : `予算達成率は${budgetAchievement}%に達しており順調に推移しています。`
                  }
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Auxiliary Store info strip */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-400 font-mono gap-4">
        <span>営業日数: {baseStore.operatingDays}日</span>
        <span>店舗コード: store_{baseStore.id}</span>
        <span>データ最終更新: 2026年7月度・月次確定値</span>
      </div>
    </div>
  );
}
