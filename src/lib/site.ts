export const LINE_URL = "https://lin.ee/WJnMncF";

export const SITE = {
  name: "Synergy AI Lab",
  shortName: "AI AGENT LAB",
  tagline: "問い合わせ対応、AIにまかせませんか？",
  description:
    "24時間365日、即時応答。手作業の返信業務を「ほぼゼロ」にするAIエージェント構築。",
};

export type AgentId = "faq" | "reservation" | "knowledge" | "workflow";

export type AgentPreset = {
  id: AgentId;
  tabLabel: string;
  companyName: string;
  profile: string;
  sampleMessage: string;
};

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: "faq",
    tabLabel: "問い合わせ応答",
    companyName: "Matcha Bakehouse",
    profile: `【店舗名】Matcha Bakehouse（抹茶ベイクハウス）
【営業情報】営業時間 11:00〜19:00（毎週水曜日が定休日）
【所在地】東京都渋谷区宇田川町12-3
【取扱メニュー】
・宇治抹茶プレミアムクッキー（420円/個）：看板商品。オーガニック宇治抹茶を使用。
・ほうじ茶ヴィーガンスコーン（380円/個）：卵、乳製品不使用。
【よくある質問】
・アレルギー対応：小麦を使用しています。ヴィーガンメニューは乳製品非使用ですがコンタミの可能性があります。
・配送サービス：全国一律レターパックライト370円でクッキーの配送も可能です。LINEやWebから注文可能です。`,
    sampleMessage:
      "アレルギー対応のヴィーガンメニューはありますか？また、水曜日は営業していますか？",
  },
  {
    id: "reservation",
    tabLabel: "サロン予約受付",
    companyName: "Aroma Therapy Salon - SORA",
    profile: `【サロン名】Aroma Therapy Salon - SORA（ソラ）
【営業情報】10:00〜21:00（不定休）完全予約制
【提供メニュー】
・全身アロママッサージ（60分：7,500円）
・極上ドライヘッドスパ（40分：5,000円）
【担当セラピスト】
・横堀：極上ヘッドスパ指名No.1
・佐藤：アロマ歴10年のベテラン
【予約ルール】当日キャンセルの場合は50%のキャンセル料を頂戴しております。`,
    sampleMessage:
      "明日の午後15時頃にマッサージ60分の予約をしたいですが、空きはありますか？佐藤さん指名希望です。",
  },
  {
    id: "knowledge",
    tabLabel: "社内マニュアルボット",
    companyName: "株式会社インフォコム（社内開発チーム）",
    profile: `【社内・開発ルールマニュアル】
【コードレビュー基準】GitHubのPR（Pull Request）は2名以上のApproveが必須です。
【デプロイフロー】本番デプロイは毎日午前11時〜13時の間に行います。金曜日の午後および夜間のデプロイは、稼働トラブル防止のため、取締役の承認がない限り原則禁止です。
【リモートワーク規定】週3日までリモート可。木曜日は「チーム全員オフィス出社日（コアタイム 11:00〜15:00）」として定義されています。`,
    sampleMessage:
      "金曜日の夕方に緊急パッチができました。本番デプロイしてもいいですか？また、週何日までリモートできますか？",
  },
  {
    id: "workflow",
    tabLabel: "顧客データ自動整理",
    companyName: "Synergy商事 営業進捗管理",
    profile: `【営業CRMデータ抽出仕様】
顧客との面談メモから以下の4項目を自動で整理しJSON風に格納します。
1.【顧客のご要望/現在の課題】
2.【確度（高・中・低）】
3.【次回推奨アクション】
4.【AI営業アシスタントのコメント】`,
    sampleMessage:
      "今日、佐藤社長と商談した。「現在はExcelでの手動管理に限界を感じており、今期中にLINE連携できる予約自動化ロボットを50万円以内で導入したい。かなり前向きで、来週月曜日に役員の前でプレゼンしてほしい」とのことだった。",
  },
];

export const FEATURES = [
  {
    id: "faq" as AgentId,
    emoji: "📨",
    title: "問い合わせ自動応答",
    badge: "即戦力化",
    desc: "FAQや蓄積データを学習。よくある顧客からの問い合わせに24時間、自動で正確かつ自然に回答します。",
  },
  {
    id: "reservation" as AgentId,
    emoji: "📅",
    title: "予約受付の自動化",
    badge: "工数カット",
    desc: "日付調整やメニューのヒアリングなど、LINEやWeb上での面倒な予約手続きをAIがスマートに代行。",
  },
  {
    id: "knowledge" as AgentId,
    emoji: "📚",
    title: "社内マニュアル検索AI",
    badge: "ナレッジ共有",
    desc: "散らばった資料やマニュアルを学習させ、社員の「どこだっけ？」を数秒でピンポイント解決します。",
  },
  {
    id: "workflow" as AgentId,
    emoji: "👥",
    title: "顧客管理の自動整理",
    badge: "業務最適化",
    desc: "対話の履歴をAIが自動分析。要約・顧客要望の分類・次回アクション案を高度にまとめて整理します。",
  },
];

export const CASES = [
  {
    id: 1,
    title: "問い合わせ対応が “ほぼゼロ”に",
    category: "不動産・サロン・EC",
    impact: "作業時間を毎日 90% 削減",
    before:
      "毎日2〜3時間かけて、同じような問い合わせメッセージを手動でタイピング返信していた",
    after:
      "AIエージェントが導入され、24時間いつも即時応答。全体の8割がAIで完結、手動対応は重要案件のみに",
  },
  {
    id: 2,
    title: "社内散在マニュアルの完全AI検索化",
    category: "メーカー・コンサル・オフィス",
    impact: "情報検索スピードが 20倍向上",
    before:
      "社内マニュアルや過去の案件資料がGoogleドライブ等に散らばり、必要な情報を見つけるのに10分以上探していた",
    after:
      "全資料をRAG学習した社内ボットを構築。チャットに聞くだけで「答えだけ」を数秒でピンポイント返答",
  },
];

export const PLANS = [
  {
    id: "lite" as const,
    name: "ライトプラン",
    price: "5万円〜",
    recommended: false,
    preset: "faq" as AgentId,
    features: [
      "FAQ/よくある質問 自動応答AI",
      "Webサイトへの埋め込みチャット",
      "ナレッジデータ 10件まで学習",
      "標準会話応答ロジック",
      "週次動作テストレポート",
    ],
  },
  {
    id: "standard" as const,
    name: "スタンダード",
    price: "15万円〜",
    recommended: true,
    preset: "reservation" as AgentId,
    features: [
      "LINE・Slack・チャット各種連携",
      "AIによる会話要約・自動分類",
      "カレンダー自動連携フロー",
      "ナレッジデータ 50件まで学習",
      "対話ログ記録 & ダッシュボード",
      "初期導入レクチャーサポート",
    ],
  },
];

export const FAQS = [
  {
    q: "導入までどのくらいかかりますか？",
    a: "ヒアリング後、最短でプロトタイプをご提案します。業務の複雑さによりますが、まずは無料相談で目安の期間と費用をお伝えします。",
  },
  {
    q: "既存のLINE公式アカウントに連携できますか？",
    a: "はい。スタンダードプランでは LINE・Slack・各種チャット連携に対応しています。既存アカウントを活かしたまま自動化できます。",
  },
  {
    q: "ナレッジは後から追加できますか？",
    a: "可能です。FAQやマニュアルを追加学習させる運用を前提に設計します。デモ画面でも、左側のテキストを書き換えるとその場で回答が変わります。",
  },
  {
    q: "無料相談では何がわかりますか？",
    a: "AI導入の可否、必要な連携、概算のお見積もりまで無料でご相談いただけます。まずはLINEからお気軽にご連絡ください。",
  },
];

export const NAV = [
  { href: "#features", label: "できること" },
  { href: "#simulator", label: "デモ" },
  { href: "#cases", label: "事例" },
  { href: "#pricing", label: "料金" },
  { href: "#profile", label: "開発者" },
];
