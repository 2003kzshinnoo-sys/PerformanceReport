import React, { useState } from "react";
import { 
  BarChart3, 
  AlertOctagon, 
  TrendingUp, 
  Award, 
  HelpCircle,
  ThumbsUp,
  Percent,
  Activity,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { mockStores } from "../data/mockStoreData";
import { StoreData } from "../types";

export default function AnalyticsSection() {
  const [rankingMetric, setRankingMetric] = useState<"sales" | "profit">("sales");

  // Averages calculations
  const totalSales = mockStores.reduce((acc, s) => acc + s.sales, 0);
  const totalBudget = mockStores.reduce((acc, s) => acc + s.salesBudget, 0);
  const totalFoodCost = mockStores.reduce((acc, s) => acc + s.foodCost, 0);
  const totalLaborCost = mockStores.reduce((acc, s) => acc + s.laborCost, 0);
  const totalProfit = mockStores.reduce((acc, s) => {
    const p = s.sales - s.foodCost - s.laborCost - s.otherExpenses;
    return acc + p;
  }, 0);

  const avgFoodCostRate = parseFloat(((totalFoodCost / totalSales) * 100).toFixed(1));
  const avgLaborCostRate = parseFloat(((totalLaborCost / totalSales) * 100).toFixed(1));
  const overallBudgetAch = parseFloat(((totalSales / totalBudget) * 100).toFixed(1));
  const overallProfitRate = parseFloat(((totalProfit / totalSales) * 100).toFixed(1));

  // Sorting for rankings
  const getStoreProfit = (store: StoreData) => {
    return store.sales - store.foodCost - store.laborCost - store.otherExpenses;
  };

  const sortedStores = [...mockStores].sort((a, b) => {
    if (rankingMetric === "sales") {
      return b.sales - a.sales;
    } else {
      return getStoreProfit(b) - getStoreProfit(a);
    }
  });

  const maxVal = rankingMetric === "sales" 
    ? Math.max(...mockStores.map(s => s.sales)) 
    : Math.max(...mockStores.map(s => getStoreProfit(s)));

  // Automated anomaly detection (improvement required extraction)
  const anomalyStores = mockStores.map(store => {
    const profit = getStoreProfit(store);
    const foodCostRate = (store.foodCost / store.sales) * 100;
    const laborCostRate = (store.laborCost / store.sales) * 100;
    const budgetAch = (store.sales / store.salesBudget) * 100;

    const issues: { type: string; detail: string; severity: "critical" | "warning" }[] = [];

    if (foodCostRate > 33) {
      issues.push({
        type: "原価高騰",
        detail: `食材原価率が${foodCostRate.toFixed(1)}%に上昇（目安値33%未満）`,
        severity: "critical"
      });
    }

    if (laborCostRate > 32) {
      issues.push({
        type: "人件費過多",
        detail: `人件費率が${laborCostRate.toFixed(1)}%と過剰稼働（目安値32%以下）`,
        severity: "critical"
      });
    }

    if (budgetAch < 95) {
      issues.push({
        type: "売上未達",
        detail: `予算達成率が${budgetAch.toFixed(1)}%と低迷（目標95%以上）`,
        severity: "warning"
      });
    }

    return {
      store,
      profit,
      foodCostRate,
      laborCostRate,
      budgetAch,
      issues
    };
  }).filter(item => item.issues.length > 0);

  // Formatting utility
  const formatYen = (num: number) => {
    return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="inline-block text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full mb-2">
            Section 6: 自動分析 ＆ 経営課題抽出
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            自動分析・ランキング ＆ 警告機能
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            作成した成果データを元に、11店舗の課題を自動で『あぶり出す』、本部必須のインテリジェンスエンジン。
          </p>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/40">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">11店舗 平均原価率</span>
          <span className="text-lg font-mono font-black text-gray-900 block mt-1">{avgFoodCostRate}%</span>
          <span className="text-[10px] text-green-600 font-medium block mt-1">基準値 (30.0%) 近似</span>
        </div>
        <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/40">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">11店舗 平均人件費率</span>
          <span className="text-lg font-mono font-black text-gray-900 block mt-1">{avgLaborCostRate}%</span>
          <span className="text-[10px] text-green-600 font-medium block mt-1">基準値 (28.0%) 近似</span>
        </div>
        <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/40">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">全店舗 予算達成率</span>
          <span className="text-lg font-mono font-black text-red-600 block mt-1">{overallBudgetAch}%</span>
          <span className="text-[10px] text-gray-400 block mt-1">総売上高: {formatYen(totalSales)}</span>
        </div>
        <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/40">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">平均営業利益率</span>
          <span className="text-lg font-mono font-black text-gray-900 block mt-1">{overallProfitRate}%</span>
          <span className="text-[10px] text-gray-400 block mt-1">総営業利益: {formatYen(totalProfit)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Ranking Pane: 6 Columns */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-600" />
              <span>店舗別ランキング指標</span>
            </h4>
            
            {/* Toggle Button */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden p-0.5 bg-gray-50">
              <button 
                onClick={() => setRankingMetric("sales")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  rankingMetric === "sales" 
                    ? "bg-black text-white" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                売上高
              </button>
              <button 
                onClick={() => setRankingMetric("profit")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  rankingMetric === "profit" 
                    ? "bg-black text-white" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                営業利益
              </button>
            </div>
          </div>

          {/* Graphical Ranking Bars */}
          <div className="space-y-2.5 bg-gray-50/50 border border-gray-200 rounded-xl p-4">
            {sortedStores.map((store, index) => {
              const value = rankingMetric === "sales" ? store.sales : getStoreProfit(store);
              const percentageOfMax = Math.max(5, Math.round((value / maxVal) * 100));
              const isTop3 = index < 3;

              return (
                <div key={store.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center justify-center w-5 h-5 rounded-full font-mono text-[10px] font-bold ${
                        index === 0 ? "bg-red-600 text-white" :
                        index === 1 ? "bg-black text-white" :
                        index === 2 ? "bg-gray-400 text-white" :
                        "bg-gray-200 text-gray-600"
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-bold text-gray-800">{store.name}</span>
                    </div>
                    <span className="font-mono font-bold text-gray-900">
                      {formatYen(value)}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${percentageOfMax}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0 ? "bg-red-600" :
                        index < 3 ? "bg-black" : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Automated Alerts Pane: 6 Columns */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <span>改善要請対象店舗の自動抽出 ({anomalyStores.length}店舗)</span>
          </h4>

          {/* Anomaly target display */}
          <div className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin">
            {anomalyStores.map(({ store, profit, foodCostRate, laborCostRate, budgetAch, issues }) => (
              <div 
                key={store.id}
                className="bg-white border border-red-100 hover:border-red-300 rounded-xl p-4 shadow-sm space-y-2"
              >
                {/* Store Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span className="text-sm font-black text-gray-900">{store.name}</span>
                  </div>
                  <span className="text-xs text-red-600 font-bold font-mono">
                    利益: {formatYen(profit)} (利益率 {((profit / store.sales) * 100).toFixed(1)}%)
                  </span>
                </div>

                {/* Specific issues detected */}
                <div className="space-y-1.5 pt-1">
                  {issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono mt-0.5 ${
                        issue.severity === "critical" 
                          ? "bg-red-600 text-white" 
                          : "bg-black text-white"
                      }`}>
                        {issue.type}
                      </span>
                      <p className="text-gray-600 leading-normal">{issue.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Recommendation suggestions */}
                <div className="mt-2.5 p-2.5 bg-gray-50 rounded-lg text-[11px] text-gray-600 flex items-start gap-1.5">
                  <Lightbulb className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800">改善アクション推奨：</span>
                    {store.id === "yokosuka" && "原価が大きく上振れしています。レシピの分量遵守、破棄ロスの抑制、および特定高単価商材の仕入配分見直しをお勧めします。"}
                    {store.id === "nishikawaguchi" && "売上高に対して人件費率が34%と過大です。ピーク帯以外（14〜17時）のシフト削減、アイドルタイムの運用マニュアル確認が必要です。"}
                    {store.id === "hachiojiminamino" && "売上が予算を大幅に下回っています。前年比も減収傾向にあるため、店長への集客プロモーションサポートを本部主体で実行してください。"}
                    {store.id !== "yokosuka" && store.id !== "nishikawaguchi" && store.id !== "hachiojiminamino" && "利益率の低下懸念。原価、人件費、および光熱費などのその他経費の予算実績比を再点検してください。"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Advisor Simulation Block */}
          <div className="p-4 bg-black text-white rounded-xl border border-gray-800 font-mono text-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-900 text-red-500 font-bold">
              <Activity className="w-4 h-4" />
              <span>AI経営分析サマリーレポート</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              「今月の全店売上は予算比100.2%と堅調ですが、横須賀店の原価高騰と西川口店の人件費過多が全社利益を圧縮しています。この2店舗の店長と成果データを見ながら即時オンラインミーティングを設定し、仕入ロスとシフト構成の見直しを実行してください。その他店舗は総じて極めて良好な生産性を維持しています。」
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
