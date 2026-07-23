import React, { useState } from "react";
import { 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Presentation, 
  Play, 
  ArrowRight, 
  ChevronDown,
  Building,
  Target,
  FileSpreadsheet,
  FileCode2,
  CalendarCheck
} from "lucide-react";

import CurrentWorkflow from "./components/CurrentWorkflow";
import Challenges from "./components/Challenges";
import TargetVision from "./components/TargetVision";
import AppDashboard from "./components/AppDashboard";
import PastDataSearch from "./components/PastDataSearch";
import AnalyticsSection from "./components/AnalyticsSection";

export default function App() {
  // Navigation tabs for presenting
  const [activeTab, setActiveTab] = useState<"all" | "concept" | "prototype">("all");

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Notification bar */}
      <div className="bg-black text-white text-[11px] font-mono py-2 px-4 text-center border-b border-gray-900 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
        <span>【6か月AI研修・成果発表デモ】店舗別成果表作成の業務改善構想（プレゼンテーション用高忠実度プロトタイプ）</span>
      </div>

      {/* Header / Hero Section */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-black text-lg border border-red-600 shadow-sm shadow-red-600/10">
                AI
              </div>
              <div>
                <h1 className="text-sm font-black text-gray-900 tracking-tight font-sans">
                  店舗別成果表 業務改善構想
                </h1>
                <p className="text-[10px] text-gray-400 font-mono tracking-wide">
                  6-MONTH AI TRAINING CONCEPT PROPOSAL
                </p>
              </div>
            </div>

            {/* Presentation View Switcher (Tabs) */}
            <nav className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "all"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>全体表示</span>
              </button>
              <button
                onClick={() => setActiveTab("concept")}
                className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "concept"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>1. 改善構想</span>
              </button>
              <button
                onClick={() => setActiveTab("prototype")}
                className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "prototype"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Play className="w-3.5 h-3.5 text-red-500" />
                <span>2. アプリ動作デモ</span>
              </button>
            </nav>

          </div>
        </div>
      </header>

      {/* Hero presentation card block */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-red-600">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>ホームページ風・説明用インタラクティブデモ</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                「店舗別成果表作成を、<br />
                <span className="text-red-600 border-b-4 border-red-600 inline-block mt-1">
                  ボタン一つ
                </span>
                で完結するアプリへ」
              </h2>

              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl">
                本ページは、実際の完成物としてのアプリではなく、6か月間のAI研修成果発表において「現在の手作業・コピペだらけの非効率な業務を、AI・アプリ連携によってどのように解決し、何ができるようになるか」を社内及び研修関係者に一瞬で伝えるための**構想説明用デモ画面**です。
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-600" />
                  <span>目的: 経営判断の即時化とミス撲滅</span>
                </div>
                <div className="bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-black" />
                  <span>対象: 11店舗の店舗管理・経理チーム</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Presentation Pitch Card */}
            <div className="lg:col-span-5 bg-black text-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span className="text-xs font-bold tracking-wider text-red-500 uppercase font-mono">研修発表プロフィール</span>
                <span className="text-[10px] text-gray-500 font-mono">Ver 1.0 (Demo)</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block">研修テーマ</label>
                  <span className="text-xs font-bold text-white">AI/アプリ連携による店舗別財務成果表の自動集約化</span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-mono block">期間 / 成果発表目標</label>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <CalendarCheck className="w-4 h-4 text-red-500" />
                    <span>6か月間AI研修（現在最終段階）</span>
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-mono block">最終到達目標（アプリの目指す価値）</label>
                  <span className="text-xs text-gray-300 leading-relaxed block mt-1">
                    店舗側での手入力・Excel加工を完全自動化し、本部・店舗が同じ指標（原価・労働時間・予算）をタイムリーに確認・改善できる経営ツールへ昇華する。
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("target-vision-simulator");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 hover:shadow-red-600/30 active:scale-95"
                >
                  <span>改善後の「1クリック自動化」を体感する</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* =======================================================
            TAB 1: CONCEPTUAL PATH (Sections 1, 2, 3)
           ======================================================= */}
        {(activeTab === "all" || activeTab === "concept") && (
          <div className="space-y-16">
            
            {/* Section 1: Current Workflow */}
            <div id="current-workflow" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-mono flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  【現状】バラバラのファイルと非効率な泥臭い実態
                </h3>
              </div>
              <CurrentWorkflow />
            </div>

            {/* Section 2: Challenges */}
            <div id="challenges" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-mono flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  【課題】現場のエネルギーを奪うボトルネック
                </h3>
              </div>
              <Challenges />
            </div>

            {/* Section 3: Target Vision */}
            <div id="target-vision-simulator" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-mono flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  【目指す姿】ボタン一つで終わる自律集約エンジンの設計
                </h3>
              </div>
              <TargetVision />
            </div>

          </div>
        )}

        {/* =======================================================
            TAB 2: PROTOTYPE PATH (Sections 4, 5, 6)
           ======================================================= */}
        {(activeTab === "all" || activeTab === "prototype") && (
          <div className="space-y-16">
            
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-black text-red-700 flex items-center gap-2">
                  <span>業務アプリの完成イメージ（動的プロトタイプ）</span>
                  <span className="text-[10px] bg-red-600 text-white font-mono px-1.5 rounded">LIVE DEMO</span>
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  実際に稼働した後の店舗別ダッシュボード、PDF検索管理、そして自動ランキング・分析機能を手動で体験いただけます。
                </p>
              </div>
              <span className="text-[11px] text-gray-400 font-mono italic">
                ※ 研修発表時、実際に操作して機能の有用性をアピールできます。
              </span>
            </div>

            {/* Section 4: App Image Dashboard */}
            <div id="app-dashboard" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-black text-white font-mono flex items-center justify-center font-bold text-sm border border-red-600">
                  4
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  【画面UI】店舗別PLダッシュボードの動的デモ
                </h3>
              </div>
              <AppDashboard />
            </div>

            {/* Section 5: Past Data Search */}
            <div id="past-data" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-black text-white font-mono flex items-center justify-center font-bold text-sm border border-red-600">
                  5
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  【一元化】過去成果表PDFの自動検索 ＆ 今月データ対比
                </h3>
              </div>
              <PastDataSearch />
            </div>

            {/* Section 6: Analytics section */}
            <div id="analytics" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-black text-white font-mono flex items-center justify-center font-bold text-sm border border-red-600">
                  6
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  【分析・インテリジェンス】店舗別自動ランキング ＆ 警告あぶり出し
                </h3>
              </div>
              <AnalyticsSection />
            </div>

          </div>
        )}

        {/* Footer closing core vision statement */}
        <div className="bg-black text-white rounded-3xl p-10 md:p-14 border border-gray-800 text-center relative overflow-hidden mt-12 shadow-2xl">
          {/* Subtle background abstract element */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
            <span className="inline-block text-xs font-mono tracking-wider bg-red-600 text-white font-bold px-3 py-1 rounded">
              研修が目指す、業務改善の本質的なゴール
            </span>
            
            <p className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white px-2">
              “毎月の店舗別成果表作成を、手作業から自動化へ。<br className="hidden md:block" />
              過去・現在・未来の店舗状況を、一つのアプリで見える化する。”
            </p>

            <div className="h-0.5 w-24 bg-red-600 mx-auto"></div>

            <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
              この業務改善構想を具現化し、店長から本部経営陣までがリアルタイムに『同じ数字』を見て、現場の原価抑制やシフトの最適化をその場で解決できる自律型店舗経営のインフラを構築します。
            </p>
          </div>
        </div>

      </main>

      {/* Page Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-xs text-gray-400 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 店舗改善システム推進チーム / 6か月間AI研修成果物デモ</p>
          <p className="mt-1 text-[10px]">※ 本アプリはプロトタイプデモであり、売上や人件費データは検証用に算出したシミュレーション値です。</p>
        </div>
      </footer>

    </div>
  );
}
