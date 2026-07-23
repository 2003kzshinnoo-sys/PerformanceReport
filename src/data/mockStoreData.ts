import { StoreData, PastReport, ChallengeCard, WorkflowStep } from "../types";

export const mockStores: StoreData[] = [
  {
    id: "kounandai",
    name: "港南台店",
    sales: 15200000,
    salesBudget: 14500000,
    foodCost: 4242000, // 27.9%
    laborCost: 4088800, // 26.9%
    otherExpenses: 2280000, // 15.0%
    customers: 14500,
    laborHours: 1200,
    operatingDays: 30,
    salesPrevYear: 14200000,
    salesPrevMonth: 14900000,
    customersPrevYear: 13800,
    laborHoursPrevYear: 1220,
  },
  {
    id: "yokosuka",
    name: "横須賀店",
    sales: 18400000,
    salesBudget: 19000000,
    foodCost: 6440000, // 35.0% (Warning: High Food Cost)
    laborCost: 5152000, // 28.0%
    otherExpenses: 2760000, // 15.0%
    customers: 19200,
    laborHours: 1500,
    operatingDays: 30,
    salesPrevYear: 17800000,
    salesPrevMonth: 18100000,
    customersPrevYear: 18500,
    laborHoursPrevYear: 1480,
  },
  {
    id: "kurihama",
    name: "久里浜店",
    sales: 12800000,
    salesBudget: 13000000,
    foodCost: 4096000, // 32.0%
    laborCost: 3456000, // 27.0%
    otherExpenses: 2176000, // 17.0%
    customers: 8500, // High spend per customer
    laborHours: 980,
    operatingDays: 28,
    salesPrevYear: 12100000,
    salesPrevMonth: 12500000,
    customersPrevYear: 8100,
    laborHoursPrevYear: 990,
  },
  {
    id: "honatsugi",
    name: "本厚木店",
    sales: 14100000,
    salesBudget: 14000000,
    foodCost: 4230000, // 30.0%
    laborCost: 3948000, // 28.0%
    otherExpenses: 2115000, // 15.0%
    customers: 13800,
    laborHours: 1180,
    operatingDays: 30,
    salesPrevYear: 13500000,
    salesPrevMonth: 13900000,
    customersPrevYear: 13200,
    laborHoursPrevYear: 1150,
  },
  {
    id: "nishikawaguchi",
    name: "西川口店",
    sales: 11500000,
    salesBudget: 12000000,
    foodCost: 3335000, // 29.0%
    laborCost: 3910000, // 34.0% (Warning: Overstaffing/High Labor Cost)
    otherExpenses: 1725000, // 15.0%
    customers: 10200,
    laborHours: 1100,
    operatingDays: 29,
    salesPrevYear: 11800000,
    salesPrevMonth: 11600000,
    customersPrevYear: 10500,
    laborHoursPrevYear: 1080,
  },
  {
    id: "urawa",
    name: "浦和店",
    sales: 16500000,
    salesBudget: 15500000,
    foodCost: 4785000, // 29.0%
    laborCost: 4438500, // 26.9%
    otherExpenses: 2475000, // 15.0%
    customers: 15800,
    laborHours: 1320,
    operatingDays: 30,
    salesPrevYear: 15100000,
    salesPrevMonth: 16200000,
    customersPrevYear: 14800,
    laborHoursPrevYear: 1300,
  },
  {
    id: "akabane",
    name: "赤羽店",
    sales: 9800000,
    salesBudget: 9000000,
    foodCost: 2744000, // 28.0%
    laborCost: 2548000, // 26.0%
    otherExpenses: 1470000, // 15.0%
    customers: 7800,
    laborHours: 720,
    operatingDays: 26,
    salesPrevYear: 9100000,
    salesPrevMonth: 9500000,
    customersPrevYear: 7300,
    laborHoursPrevYear: 710,
  },
  {
    id: "kitashinyokohama",
    name: "北新横浜店",
    sales: 10200000,
    salesBudget: 10500000,
    foodCost: 3162000, // 31.0%
    laborCost: 2958000, // 29.0%
    otherExpenses: 1530000, // 15.0%
    customers: 9200,
    laborHours: 850,
    operatingDays: 28,
    salesPrevYear: 9900000,
    salesPrevMonth: 10000000,
    customersPrevYear: 9000,
    laborHoursPrevYear: 840,
  },
  {
    id: "nagatsuta",
    name: "長津田店",
    sales: 9100000,
    salesBudget: 9000000,
    foodCost: 2639000, // 29.0%
    laborCost: 2457000, // 27.0%
    otherExpenses: 1365000, // 15.0%
    customers: 8900,
    laborHours: 760,
    operatingDays: 27,
    salesPrevYear: 8600000,
    salesPrevMonth: 8900000,
    customersPrevYear: 8500,
    laborHoursPrevYear: 750,
  },
  {
    id: "hachiojiminamino",
    name: "八王子みなみ野店",
    sales: 8500000,
    salesBudget: 9200000,
    foodCost: 2465000, // 29.0%
    laborCost: 2550000, // 30.0%
    otherExpenses: 1275000, // 15.0%
    customers: 7400,
    laborHours: 790,
    operatingDays: 26,
    salesPrevYear: 8800000,
    salesPrevMonth: 8600000,
    customersPrevYear: 7600,
    laborHoursPrevYear: 780,
  },
  {
    id: "shinkamagaya",
    name: "新鎌ヶ谷店",
    sales: 7900000,
    salesBudget: 8000000,
    foodCost: 2291000, // 29.0%
    laborCost: 2212000, // 28.0%
    otherExpenses: 1185000, // 15.0%
    customers: 6900,
    laborHours: 710,
    operatingDays: 26,
    salesPrevYear: 7500000,
    salesPrevMonth: 7800000,
    customersPrevYear: 6600,
    laborHoursPrevYear: 700,
  }
];

export const mockChallenges: ChallengeCard[] = [
  {
    id: "c1",
    title: "手入力の多さ",
    description: "売上、経費、労働時間など複数システムからのデータを各店舗・本部がスプレッドシートやExcelにすべて「手書き・手入力」で転記している。",
    painPoint: "1回につき数時間の拘束。コピペのズレが発生し、入力途中のデータ保存や管理ミスが日常茶飯事。",
    futureBenefit: "各連携APIおよびデータインポートにより自動取り込み化され、手入力はほぼゼロに。",
    iconName: "Keyboard"
  },
  {
    id: "c2",
    title: "多大な作業時間",
    description: "会計、仕入、シフト、スプレッドシート、PDFなど多種多様なシステムを行き来し、フォーマットを整える集計作業が毎月発生。",
    painPoint: "月初の時間確保が必須であり、店長が店舗営業や他業務に割くべき貴重な時間がデスクワークで大幅に消費されてしまう。",
    futureBenefit: "バックエンドの集計エンジンが一瞬で計算。11店舗分の集計を『ボタン一つ（わずか3秒）』で自動完了。",
    iconName: "Clock"
  },
  {
    id: "c3",
    title: "ミス・確認漏れの頻発",
    description: "人手による計算式のズレや転記漏れ、当月予算の参照誤りなどが発生。現場に共有した後に不整合が発覚し、再作成になるケースも。",
    painPoint: "後に修正が発生した場合、手作業のため一部だけを直せず、すべてのExcel集計や結合作業を1からやり直しになるケースも。",
    futureBenefit: "システム内での入力バリデーション、自動データ紐づけによりエラーが排除され、データの正確性が100%に担保される。",
    iconName: "AlertTriangle"
  },
  {
    id: "c4",
    title: "過去データとの比較困難",
    description: "過去の成果表はバラバラのPDFファイルやExcelファイルとして保存されており、必要な時に探すのが極めて困難。",
    painPoint: "「昨年や先月と比べて原価率がどう変化したか」を知るために、古いファイルを何枚も開き直して手動で再計算している。",
    futureBenefit: "アプリ内DBに過去データを全て蓄積。必要な年月や店舗を検索して、現在データと横並びで即座に比較可能に。",
    iconName: "Search"
  },
  {
    id: "c5",
    title: "店舗別課題のブラックボックス化",
    description: "一目でわかるダッシュボードや分析画面がないため、全体の数字をただ眺めるだけで終わってしまい、改善アクションに繋がらない。",
    painPoint: "「横須賀店の原価率高騰」や「西川口店の人件費過多」といった異常値に気づくのが遅れ、店舗改善の機会を逃してしまう。",
    futureBenefit: "予算達成率、原価率、人時生産性を自動分析し、改善が必要な店舗や課題項目を赤字・アラートで自動抽出して早期に対処可能に。",
    iconName: "TrendingUp"
  }
];

export const currentWorkflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "仕入システム",
    system: "仕入管理WEB (PDF・CSV)",
    action: "前月棚卸データの期首振替、当月棚卸高を抽出しCSV保存、当月の店舗別原材料仕入データの加工修正",
    duration: "30分",
    isManual: true,
  },
  {
    id: 2,
    title: "勤怠・シフトシステム",
    system: "勤怠管理SaaS",
    action: "11店舗分のデータ修正・確定作業",
    duration: "30分",
    isManual: true,
  },
  {
    id: 3,
    title: "会計・売上システム",
    system: "POSレジ & 会計ソフト",
    action: "日次売上、客数、営業日数を月次集計。仕訳データをダウンロード",
    duration: "30分",
    isManual: true,
  },
  {
    id: 4,
    title: "Excel・スプレッドシート",
    system: "本部配布フォーマット",
    action: "ダウンロードした複数のCSVや数値をコピー＆ペースト。予算値や経費を手入力",
    duration: "40分",
    isManual: true,
  },
  {
    id: 5,
    title: "PDF変換・各店のドライブへ手動保存",
    system: "PCローカル / 各自共有フォルダ",
    action: "集計完了したシートを店舗ごとにPDF化。各自の共有ドライブへ手動でアップロードして保存",
    duration: "20分",
    isManual: true,
  },
  {
    id: 6,
    title: "データ修正対応",
    system: "不具合・誤り対応",
    action: "不具合や誤りがあった場合のデータ修正・再集計作業",
    duration: "30分",
    isManual: true,
  },
];

export const mockPastReports: PastReport[] = [
  // 2026年6月 (June 2026)
  { id: "pr-kounandai-06", year: 2026, month: 6, storeId: "kounandai", storeName: "港南台店", fileName: "店舗別成果表_港南台店_202606.pdf", fileSize: "142 KB", createdAt: "2026/07/03", sales: 14900000, profit: 4210000, foodCostRate: 28.2, laborCostRate: 27.1 },
  { id: "pr-yokosuka-06", year: 2026, month: 6, storeId: "yokosuka", storeName: "横須賀店", fileName: "店舗別成果表_横須賀店_202606.pdf", fileSize: "145 KB", createdAt: "2026/07/03", sales: 18100000, profit: 3450000, foodCostRate: 34.1, laborCostRate: 28.3 },
  { id: "pr-kurihama-06", year: 2026, month: 6, storeId: "kurihama", storeName: "久里浜店", fileName: "店舗別成果表_久里浜店_202606.pdf", fileSize: "139 KB", createdAt: "2026/07/03", sales: 12500000, profit: 2890000, foodCostRate: 32.5, laborCostRate: 27.4 },
  { id: "pr-honatsugi-06", year: 2026, month: 6, storeId: "honatsugi", storeName: "本厚木店", fileName: "店舗別成果表_本厚木店_202606.pdf", fileSize: "141 KB", createdAt: "2026/07/03", sales: 13900000, profit: 3480000, foodCostRate: 30.1, laborCostRate: 28.1 },
  { id: "pr-nishikawaguchi-06", year: 2026, month: 6, storeId: "nishikawaguchi", storeName: "西川口店", fileName: "店舗別成果表_西川口店_202606.pdf", fileSize: "144 KB", createdAt: "2026/07/03", sales: 11600000, profit: 2150000, foodCostRate: 29.2, laborCostRate: 33.8 },
  { id: "pr-urawa-06", year: 2026, month: 6, storeId: "urawa", storeName: "浦和店", fileName: "店舗別成果表_浦和店_202606.pdf", fileSize: "143 KB", createdAt: "2026/07/03", sales: 16200000, profit: 4320000, foodCostRate: 29.1, laborCostRate: 27.0 },
  { id: "pr-akabane-06", year: 2026, month: 6, storeId: "akabane", storeName: "赤羽店", fileName: "店舗別成果表_赤羽店_202606.pdf", fileSize: "140 KB", createdAt: "2026/07/03", sales: 9500000, profit: 2800000, foodCostRate: 28.4, laborCostRate: 26.2 },
  { id: "pr-kitashinyokohama-06", year: 2026, month: 6, storeId: "kitashinyokohama", storeName: "北新横浜店", fileName: "店舗別成果表_北新横浜店_202606.pdf", fileSize: "141 KB", createdAt: "2026/07/03", sales: 10000000, profit: 2500000, foodCostRate: 31.2, laborCostRate: 29.2 },
  { id: "pr-nagatsuta-06", year: 2026, month: 6, storeId: "nagatsuta", storeName: "長津田店", fileName: "店舗別成果表_長津田店_202606.pdf", fileSize: "138 KB", createdAt: "2026/07/03", sales: 8900000, profit: 2420000, foodCostRate: 29.2, laborCostRate: 27.2 },
  { id: "pr-hachiojiminamino-06", year: 2026, month: 6, storeId: "hachiojiminamino", storeName: "八王子みなみ野店", fileName: "店舗別成果表_八王子みなみ野店_202606.pdf", fileSize: "139 KB", createdAt: "2026/07/03", sales: 8600000, profit: 2010000, foodCostRate: 29.1, laborCostRate: 30.2 },
  { id: "pr-shinkamagaya-06", year: 2026, month: 6, storeId: "shinkamagaya", storeName: "新鎌ヶ谷店", fileName: "店舗別成果表_新鎌ヶ谷店_202606.pdf", fileSize: "139 KB", createdAt: "2026/07/03", sales: 7800000, profit: 1980000, foodCostRate: 29.1, laborCostRate: 28.1 },

  // 2026年5月 (May 2026)
  { id: "pr-kounandai-05", year: 2026, month: 5, storeId: "kounandai", storeName: "港南台店", fileName: "店舗別成果表_港南台店_202605.pdf", fileSize: "141 KB", createdAt: "2026/06/03", sales: 14600000, profit: 4050000, foodCostRate: 28.4, laborCostRate: 27.3 },
  { id: "pr-yokosuka-05", year: 2026, month: 5, storeId: "yokosuka", storeName: "横須賀店", fileName: "店舗別成果表_横須賀店_202605.pdf", fileSize: "144 KB", createdAt: "2026/06/03", sales: 17900000, profit: 3380000, foodCostRate: 34.3, laborCostRate: 28.5 },
  { id: "pr-nishikawaguchi-05", year: 2026, month: 5, storeId: "nishikawaguchi", storeName: "西川口店", fileName: "店舗別成果表_西川口店_202605.pdf", fileSize: "143 KB", createdAt: "2026/06/03", sales: 11400000, profit: 2040000, foodCostRate: 29.4, laborCostRate: 34.1 }
];
