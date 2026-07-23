import React, { useState } from "react";
import { 
  Search, 
  FileText, 
  Download, 
  Share2, 
  ArrowLeftRight, 
  Check, 
  Filter, 
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { mockPastReports, mockStores } from "../data/mockStoreData";
import { PastReport, StoreData } from "../types";

export default function PastDataSearch() {
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>("all");
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [comparingReport, setComparingReport] = useState<PastReport | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Triggering visual toasts
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Filter logic
  const filteredReports = mockPastReports.filter((report) => {
    const matchYM = 
      selectedYearMonth === "all" || 
      (selectedYearMonth === "2026-06" && report.year === 2026 && report.month === 6) ||
      (selectedYearMonth === "2026-05" && report.year === 2026 && report.month === 5);
    
    const matchStore = 
      selectedStore === "all" || 
      report.storeId === selectedStore;

    return matchYM && matchStore;
  });

  // Get current store info for comparison
  const getCurrentStoreData = (storeId: string): StoreData | undefined => {
    return mockStores.find(s => s.id === storeId);
  };

  // Formatting utilities
  const formatYen = (num: number) => {
    return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(num);
  };

  const getDeltaColor = (delta: number, isLowerBetter = false) => {
    if (delta === 0) return "text-gray-500";
    if (isLowerBetter) {
      return delta < 0 ? "text-green-600 font-bold" : "text-red-600 font-bold";
    }
    return delta > 0 ? "text-red-600 font-bold" : "text-gray-500";
  };

  const getDeltaSign = (delta: number, suffix = "") => {
    if (delta === 0) return "±0";
    const sign = delta > 0 ? "+" : "";
    return `${sign}${delta.toLocaleString()}${suffix}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="inline-block text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full mb-2">
            Section 5: 過去データ一元管理
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            過去成果表PDF検索 ＆ タイムトラベル対比
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            クラウドでPDFを自動一元管理。紙やバラバラのファイルから脱却し、瞬時に年月・店舗別に対比分析。
          </p>
        </div>

        {notification && (
          <div className="bg-black text-white text-xs font-mono py-2 px-4 rounded-xl shadow-lg border border-gray-800 transition-all flex items-center gap-2 self-start md:self-center animate-fade-in">
            <Check className="w-4 h-4 text-red-500 shrink-0" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* Grid of Search Filters and Report Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Search Sidebar: 4 Columns */}
        <div className="lg:col-span-4 bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-red-600" />
            <span>検索絞り込み条件</span>
          </h4>

          {/* Filter 1: Year/Month */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">年月で絞り込む</label>
            <select 
              value={selectedYearMonth} 
              onChange={(e) => {
                setSelectedYearMonth(e.target.value);
                setComparingReport(null); // Reset comparison
              }}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-red-600"
            >
              <option value="all">すべて（全年月）</option>
              <option value="2026-06">2026年6月度</option>
              <option value="2026-05">2026年5月度</option>
            </select>
          </div>

          {/* Filter 2: Store */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">店舗で絞り込む</label>
            <select 
              value={selectedStore} 
              onChange={(e) => {
                setSelectedStore(e.target.value);
                setComparingReport(null); // Reset comparison
              }}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-red-600"
            >
              <option value="all">すべて（全11店舗）</option>
              {mockStores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="text-[11px] text-gray-500 leading-relaxed flex gap-2">
              <span className="text-red-600 shrink-0">※</span>
              <span>
                これまでは店長が作成した過去PDFを共有サーバーのフォルダ階層から1つずつ手動で探し出していましたが、このアプリでは年月・店舗を選ぶだけで一瞬でマージ抽出できます。
              </span>
            </div>
          </div>
        </div>

        {/* Right Search Results / Comparison Area: 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Comparison Overlay Panel if a report is selected */}
          {comparingReport ? (
            (() => {
              const currentStore = getCurrentStoreData(comparingReport.storeId);
              if (!currentStore) return null;
              
              const currentSales = currentStore.sales;
              const currentFoodCostRate = parseFloat(((currentStore.foodCost / currentStore.sales) * 100).toFixed(1));
              const currentLaborCostRate = parseFloat(((currentStore.laborCost / currentStore.sales) * 100).toFixed(1));
              const currentProfit = currentStore.sales - currentStore.foodCost - currentStore.laborCost - currentStore.otherExpenses;

              // Deltas (July Current vs Past Report)
              const salesDelta = currentSales - comparingReport.sales;
              const profitDelta = currentProfit - comparingReport.profit;
              const foodRateDelta = parseFloat((currentFoodCostRate - comparingReport.foodCostRate).toFixed(1));
              const laborRateDelta = parseFloat((currentLaborCostRate - comparingReport.laborCostRate).toFixed(1));

              return (
                <div className="border border-red-200 rounded-xl p-5 bg-red-50/10">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-red-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <ArrowLeftRight className="w-4 h-4 text-red-600 animate-pulse" />
                      <span>{comparingReport.storeName}：過去データとの比較詳細</span>
                    </h4>
                    <button 
                      onClick={() => setComparingReport(null)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      比較表示を閉じる
                    </button>
                  </div>

                  {/* High Fidelity Split-Table for Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    
                    {/* Item 1: Sales */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-sm">
                      <span className="text-[11px] text-gray-400 block font-bold">売上高の推移</span>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs text-gray-500 font-mono">過去({comparingReport.month}月):</span>
                        <span className="text-xs text-gray-800 font-mono font-medium">{formatYen(comparingReport.sales)}</span>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs font-bold text-red-600 font-mono">今月(7月):</span>
                        <span className="text-sm font-black text-gray-900 font-mono">{formatYen(currentSales)}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400">変動比率（Δ）:</span>
                        <span className={getDeltaColor(salesDelta)}>
                          {getDeltaSign(salesDelta, "円")}
                        </span>
                      </div>
                    </div>

                    {/* Item 2: Food Cost Rate */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-sm">
                      <span className="text-[11px] text-gray-400 block font-bold">食材原価率 (Food Cost)</span>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs text-gray-500 font-mono">過去({comparingReport.month}月):</span>
                        <span className="text-xs text-gray-800 font-mono font-medium">{comparingReport.foodCostRate}%</span>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs font-bold text-red-600 font-mono">今月(7月):</span>
                        <span className="text-sm font-black text-gray-900 font-mono">{currentFoodCostRate}%</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400">変動比率（Δ）:</span>
                        <span className={getDeltaColor(foodRateDelta, true)}>
                          {getDeltaSign(foodRateDelta, "%")}
                        </span>
                      </div>
                    </div>

                    {/* Item 3: Labor Cost Rate */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-sm">
                      <span className="text-[11px] text-gray-400 block font-bold">人件費率 (Labor Cost)</span>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs text-gray-500 font-mono">過去({comparingReport.month}月):</span>
                        <span className="text-xs text-gray-800 font-mono font-medium">{comparingReport.laborCostRate}%</span>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs font-bold text-red-600 font-mono">今月(7月):</span>
                        <span className="text-sm font-black text-gray-900 font-mono">{currentLaborCostRate}%</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400">変動比率（Δ）:</span>
                        <span className={getDeltaColor(laborRateDelta, true)}>
                          {getDeltaSign(laborRateDelta, "%")}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Side-by-side profit highlight */}
                  <div className="bg-gray-900 text-white rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
                    <div>
                      <span className="text-xs text-gray-400 block">営業利益の改善度</span>
                      <div className="flex items-baseline gap-4 mt-1">
                        <span className="text-xs text-gray-300">過去 {formatYen(comparingReport.profit)}</span>
                        <span className="text-lg font-black text-white">今月 {formatYen(currentProfit)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">増減額:</span>
                      <span className={`text-base font-black px-2.5 py-1 rounded ${profitDelta >= 0 ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400"}`}>
                        {getDeltaSign(profitDelta, "円")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : null}

          {/* Report List view */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              該当する保管済み成果表PDF ({filteredReports.length}件)
            </h4>

            {filteredReports.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                <p className="text-xs">条件に合致する過去の成果表PDFは見つかりませんでした</p>
                <p className="text-[10px] text-gray-400 mt-1">フィルター条件を変更してください</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto scrollbar-thin">
                {filteredReports.map((report) => (
                  <div 
                    key={report.id}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-400 bg-white hover:bg-gray-50/50 transition-all shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-50 rounded-lg text-red-600 border border-red-100 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded font-mono">
                            {report.year}年{report.month}月度
                          </span>
                          <span className="text-sm font-bold text-gray-900">{report.storeName}成果表</span>
                        </div>
                        <div className="text-xs font-mono text-gray-400 mt-1 flex items-center gap-3">
                          <span className="truncate max-w-[180px] md:max-w-none">{report.fileName}</span>
                          <span>•</span>
                          <span>{report.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                      <button 
                        onClick={() => setComparingReport(report)}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-black hover:text-white border border-gray-200 hover:border-black rounded-lg text-xs font-bold text-gray-700 transition-all flex items-center gap-1.5"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        今月(7月)と対比する
                      </button>

                      <button 
                        onClick={() => triggerNotification(`${report.storeName} ${report.year}年${report.month}月度の成果表PDFを疑似ダウンロードしました`)}
                        className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg border border-transparent hover:border-red-200 transition-all"
                        title="PDFダウンロード"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => triggerNotification(`${report.storeName} 成果表リンクをクリップボードにコピーしました（チャット送信準備完了）`)}
                        className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg border border-transparent hover:border-red-200 transition-all"
                        title="共有用リンク取得"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
