import React from "react";
import { 
  Keyboard, 
  Clock, 
  AlertTriangle, 
  Search, 
  TrendingUp,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { mockChallenges } from "../data/mockStoreData";

export default function Challenges() {
  
  // Dynamic icon helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Keyboard":
        return <Keyboard className="w-5 h-5 text-red-600" />;
      case "Clock":
        return <Clock className="w-5 h-5 text-red-600" />;
      case "AlertTriangle":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "Search":
        return <Search className="w-5 h-5 text-red-600" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full mb-2">
          Section 2: 解決すべき課題
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          現場を苦しめる5つの核心的課題
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          現状の作業プロセスがもたらすボトルネックと、アプリ導入後の劇的ビフォーアフター
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockChallenges.map((challenge) => {
          return (
            <div 
              key={challenge.id}
              className="bg-white border border-gray-200 hover:border-red-400 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
              id={`challenge-${challenge.id}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center">
                    {getIcon(challenge.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-gray-900">{challenge.title}</h4>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4 pb-4 border-b border-gray-100">
                  {challenge.description}
                </p>

                {/* Pain point (Red highlighted) */}
                <div className="bg-red-50/50 border-l-2 border-red-600 p-3 rounded-r-lg mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 mb-1">
                    <XCircle className="w-3.5 h-3.5" />
                    現状の痛み（痛烈な非効率）
                  </div>
                  <p className="text-xs text-red-700 leading-relaxed">
                    {challenge.painPoint}
                  </p>
                </div>
              </div>

              {/* Future benefit (Black/Gray highlight showing resolution) */}
              <div className="bg-gray-50 border-l-2 border-gray-800 p-3 rounded-r-lg mt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-800 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gray-900" />
                  アプリ導入後の価値（自動化）
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {challenge.futureBenefit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
