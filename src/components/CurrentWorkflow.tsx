import React, { useState } from "react";
import { 
  Database, 
  Clock, 
  ArrowRight, 
  FileSpreadsheet, 
  FileText, 
  Mail, 
  AlertCircle, 
  HelpCircle,
  Copy,
  Shuffle
} from "lucide-react";
import { currentWorkflowSteps } from "../data/mockStoreData";

export default function CurrentWorkflow() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Total time calculated
  const totalMinutes = 180; // 3 hours (30 + 30 + 30 + 40 + 20 + 30)
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm" id="current-workflow-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="inline-block text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full mb-2">
            Section 1: 現状の業務フロー
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            散らばるデータ、終わらない転記作業
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Excel、会計、仕入、勤怠、PDFを泥臭く行き来している現在の複雑な実態
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <Clock className="w-5 h-5 text-red-600 mr-3 animate-pulse" />
          <div>
            <div className="text-xs text-gray-400 font-medium">合計作業時間（1店舗あたり）</div>
            <div className="text-lg font-bold text-gray-900 font-mono">
              約 <span className="text-red-600 text-xl">3</span> 時間 / 毎月
            </div>
          </div>
        </div>
      </div>

      {/* Visual Workflow Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 relative">
        {currentWorkflowSteps.map((step, idx) => {
          const isSelected = hoveredStep === step.id;
          return (
            <div 
              key={step.id}
              className={`relative flex flex-col justify-between border rounded-xl p-4 transition-all duration-300 ${
                isSelected 
                  ? "border-red-600 bg-red-50/10 shadow-md transform -translate-y-1" 
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-400 hover:bg-white"
              }`}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              id={`workflow-step-${step.id}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-bold">
                  0{step.id}
                </span>
                <span className="text-xs font-mono font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {step.duration}
                </span>
              </div>

              {/* Step Info */}
              <div className="flex-grow">
                <h4 className="text-xs font-bold text-gray-900 mb-1 line-clamp-1" title={step.title}>{step.title}</h4>
                <div className="text-[11px] font-mono text-gray-400 mb-2 truncate" title={step.system}>
                  {step.system}
                </div>
                <p className="text-[11px] text-gray-600 leading-tight">
                  {step.action}
                </p>
              </div>

              {/* Status footer inside card */}
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center font-medium text-red-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-ping"></span>
                  手動作業
                </span>
                <HelpCircle className="w-3.5 h-3.5 text-gray-300 hover:text-gray-500 cursor-pointer" />
              </div>

              {/* Horizontal Connecting Arrow */}
              {idx < currentWorkflowSteps.length - 1 && (
                <div className="hidden xl:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 w-5 h-5 items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm text-gray-400">
                  <ArrowRight className="w-3 h-3 text-gray-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Pain Point Map illustration */}
      <div className="mt-8 p-5 bg-red-50/40 rounded-xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl">
            <Shuffle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span>手作業による伝達経路の「断絶」</span>
              <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">非効率の温床</span>
            </h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed max-w-2xl">
              仕入、シフト、売上などの各マスターデータが完全に分断されており、店舗別成果表を1枚作るために、店長や本部スタッフが何往復ものコピー＆ペーストを強いられています。これが「ミスが起きやすい」「時間がかかる」真の原因です。
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-2 justify-end">
          <div className="bg-white border border-red-200 text-[11px] text-red-700 rounded-lg px-3.5 py-2 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            打ち間違え頻発、後の修正複雑化
          </div>
          <div className="bg-white border border-red-200 text-[11px] text-red-700 rounded-lg px-3.5 py-2 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            月初の時間確保必須
          </div>
        </div>
      </div>
    </div>
  );
}
