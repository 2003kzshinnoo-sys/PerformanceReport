import React, { useState, useEffect } from "react";
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Layers, 
  FileCheck, 
  Share2, 
  Sparkles,
  ChevronRight
} from "lucide-react";

interface PipelineStep {
  id: number;
  label: string;
  subLabel: string;
  detail: string;
  status: "idle" | "running" | "completed";
  icon: React.ReactNode;
}

export default function TargetVision() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const initialSteps: PipelineStep[] = [
    {
      id: 1,
      label: "データ自動取込",
      subLabel: "API・OCRインポート",
      detail: "売上・仕入原価・シフト勤怠・スプレッドシート予算をマージ",
      status: "idle",
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 2,
      label: "一元管理・自動計算",
      subLabel: "リアルタイム数式マージ",
      detail: "経費、客数、総労働時間、営業日数のマージ及び店舗別PL自動算出",
      status: "idle",
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 3,
      label: "成果表自動作成",
      subLabel: "11店舗分シート並行処理",
      detail: "利益、原価率、人件費率、労働生産性を全店舗同時算出して結合",
      status: "idle",
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 4,
      label: "アプリ化して共有",
      subLabel: "一括配信エンジン",
      detail: "店舗別フォーマットで自動集計、アプリで即時閲覧可能に",
      status: "idle",
      icon: <Share2 className="w-5 h-5" />
    },
    {
      id: 5,
      label: "現状分析・課題発見",
      subLabel: "AI自動チェック",
      detail: "前年比、予算達成率、異常比率（原価高騰、労働過多）を自動検知",
      status: "idle",
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && elapsedTime < 2.2) {
      timer = setInterval(() => {
        setElapsedTime(prev => parseFloat((prev + 0.1).toFixed(1)));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isRunning, elapsedTime]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleStartSimulation = async () => {
    setIsRunning(true);
    setIsDone(false);
    setElapsedTime(0);
    setLogs([]);
    setSteps(initialSteps.map(s => ({ ...s, status: "idle" })));

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Step 1
    setCurrentStepIdx(0);
    setSteps(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: "running" } : s));
    addLog("📡 外部システムとの連携APIを初期化中...");
    await delay(600);
    addLog("✓ 売上・客数データ（11店舗分）を取得完了。");
    addLog("✓ 勤怠クラウドより、総稼働労働時間 10,132時間を取得完了。");
    addLog("✓ 仕入管理WEBより、各店棚卸仕入高 4,120万円を同期。");
    setSteps(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: "completed" } : s));

    // Step 2
    setCurrentStepIdx(1);
    setSteps(prev => prev.map((s, idx) => idx === 1 ? { ...s, status: "running" } : s));
    addLog("⚡ 成果表パラメータの全自動検算を開始...");
    await delay(700);
    addLog("✓ 各店固有の営業日数、その他家賃等の固定固定費を割り当て完了。");
    addLog("✓ 総粗利益、人時生産性、営業利益等の経営指標を瞬時に算出。");
    setSteps(prev => prev.map((s, idx) => idx === 1 ? { ...s, status: "completed" } : s));

    // Step 3
    setCurrentStepIdx(2);
    setSteps(prev => prev.map((s, idx) => idx === 2 ? { ...s, status: "running" } : s));
    addLog("📊 店舗別成果表シートの並行作成エンジン起動...");
    await delay(600);
    addLog("✓ 11店舗別の月次財務テーブルを生成。不整合チェックパス。");
    addLog("✓ 全店舗一元ビュー用ダッシュボード（本部用）の構築完了。");
    setSteps(prev => prev.map((s, idx) => idx === 2 ? { ...s, status: "completed" } : s));

    // Step 4
    setCurrentStepIdx(3);
    setSteps(prev => prev.map((s, idx) => idx === 3 ? { ...s, status: "running" } : s));
    addLog("📄 アプリデータ連携エンジン実行中...");
    await delay(600);
    addLog("✓ 11店舗分の成果データをアプリフォーマットに自動反映（全11店舗）。");
    addLog("✓ クラウドDB（Firestore）へのアップロード完了。");
    addLog("✓ 各店長のモバイル端末および店舗チャットへの通知トリガー配信。");
    setSteps(prev => prev.map((s, idx) => idx === 3 ? { ...s, status: "completed" } : s));

    // Step 5
    setCurrentStepIdx(4);
    setSteps(prev => prev.map((s, idx) => idx === 4 ? { ...s, status: "running" } : s));
    addLog("🔍 AIによる店舗別ボトルネック分析中...");
    await delay(600);
    addLog("⚠️ 横浜店の人件費比率（34.0%）が規定値を超えています。要確認アラート。");
    addLog("⚠️ 新宿店の原価率（35.0%）が予算比+3%乖離。改善推奨を付与。");
    addLog("✓ 全店舗のKPIランキングおよびサマリーがダッシュボードへ即時反映。");
    setSteps(prev => prev.map((s, idx) => idx === 4 ? { ...s, status: "completed" } : s));

    setCurrentStepIdx(null);
    setIsRunning(false);
    setIsDone(true);
    addLog("🎉 すべての自動化プロセスが完了しました！総処理時間: 2.2秒");
  };

  return (
    <div className="bg-black text-white border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-800">
        <div>
          <span className="inline-block text-xs font-semibold bg-red-600 text-white px-3 py-1 rounded-full mb-2">
            Section 3: 実現したい理想の姿
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            「ボタン一つ」で、すべてが自律的に完結
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            煩わしい事務作業をアプリが代替。あなたの代わりに瞬時に集計から配信・分析まで。
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
          <Sparkles className="w-5 h-5 text-red-500 mr-3 animate-bounce" />
          <div>
            <div className="text-xs text-gray-500 font-medium">手作業との比較（削減率）</div>
            <div className="text-lg font-bold text-white font-mono">
              作業時間 <span className="text-red-500 text-xl font-black">99.9%</span> 削減
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Pipeline Progression */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold tracking-wider text-gray-400 uppercase">自動化プロセスの流れ</h4>
            {isDone && (
              <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                シミュレーション完了 (2.2秒)
              </span>
            )}
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isCurrent = currentStepIdx === idx;
              const isCompleted = step.status === "completed";
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 ${
                    isCurrent 
                      ? "border-red-600 bg-red-950/20 shadow-lg" 
                      : isCompleted
                        ? "border-gray-800 bg-gray-900/60 opacity-100"
                        : "border-gray-900 bg-gray-950/30 opacity-50"
                  }`}
                >
                  {/* Icon Status */}
                  <div className={`p-2.5 rounded-lg flex items-center justify-center transition-colors ${
                    isCurrent 
                      ? "bg-red-600 text-white animate-pulse" 
                      : isCompleted
                        ? "bg-white text-black"
                        : "bg-gray-900 text-gray-500"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 text-red-600" /> : step.icon}
                  </div>

                  {/* Text Details */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold text-gray-400 font-mono">STEP 0{step.id}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{step.subLabel}</span>
                    </div>
                    <h5 className="text-sm font-bold text-white mt-0.5">{step.label}</h5>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{step.detail}</p>
                  </div>

                  {/* Flow arrow indicators */}
                  <div className="shrink-0">
                    {isCurrent ? (
                      <RefreshCw className="w-4 h-4 text-red-500 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Console Logs / Play Area */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gray-950 rounded-xl border border-gray-800 p-5 font-mono">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
              <span className="text-xs font-bold tracking-wider text-red-500">SYSTEM APP CONSOLE</span>
              <span className="text-[10px] text-gray-500 font-mono">Elapsed: {elapsedTime}s</span>
            </div>

            {/* Simulated log screen */}
            <div className="space-y-1.5 h-64 overflow-y-auto text-xs text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
              {logs.length === 0 ? (
                <div className="text-gray-500 flex flex-col items-center justify-center h-full text-center py-12">
                  <Play className="w-8 h-8 mb-2 text-gray-700 opacity-60" />
                  <p>「自動処理を実行」ボタンを押すと、</p>
                  <p>アプリの動作シミュレーションが始まります</p>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="border-l border-red-900 pl-2">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-900 flex gap-3">
            <button
              onClick={handleStartSimulation}
              disabled={isRunning}
              className={`flex-grow flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                isRunning 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-lg shadow-red-600/10 hover:shadow-red-600/30"
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  自動処理の実行中...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  自動処理を疑似実行する (2秒)
                </>
              )}
            </button>

            {isDone && (
              <button
                onClick={() => {
                  setSteps(initialSteps);
                  setLogs([]);
                  setElapsedTime(0);
                  setIsDone(false);
                }}
                className="px-3 py-3 border border-gray-800 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white transition-all text-xs flex items-center justify-center"
                title="リセット"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conceptual Summary footer inside Black box */}
      <div className="border-t border-gray-900 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 rounded-lg bg-gray-900/40">
          <div className="text-xl font-bold text-white font-mono">1. データ自動集約</div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            店長や経理の手作業による転記作業がゼロになり、ミスのリスクが消滅します。
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900/40">
          <div className="text-xl font-bold text-white font-mono">2. アプリ化して共有</div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            成果表がボタン一つで瞬時に集計され、関係者全員にアプリを通じて自動で配信・共有されます。
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900/40">
          <div className="text-xl font-bold text-white font-mono">3. 現状分析</div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            過去データとの対比・課題点の洗い出しが自動でアラート表示され、次の一手へ繋がります。
          </p>
        </div>
      </div>
    </div>
  );
}
