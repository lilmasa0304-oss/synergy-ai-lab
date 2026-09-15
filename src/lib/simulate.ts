import type { AgentId } from "./site";

type SimulateInput = {
  message: string;
  companyName: string;
  knowledge: string;
  agentType: AgentId;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[「」『』（）()【】\[\]、。！？!?.,：:・/]/g, " ")
    .split(/\s+/)
    .flatMap((token) => token.split(/(?:の|は|が|を|に|で|と|も|へ|から|まで)/))
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function extractFacts(knowledge: string): string[] {
  return knowledge
    .split(/\n+/)
    .map((line) => line.replace(/^[・\-]\s*/, "").trim())
    .filter((line) => line.length > 1);
}

function scoreFact(fact: string, queryTokens: string[]): number {
  const haystack = fact.toLowerCase();
  return queryTokens.reduce((score, token) => {
    if (haystack.includes(token)) return score + Math.min(token.length, 6);
    return score;
  }, 0);
}

function pickFacts(knowledge: string, message: string, limit = 3): string[] {
  const tokens = tokenize(message);
  const ranked = extractFacts(knowledge)
    .map((fact) => ({ fact, score: scoreFact(fact, tokens) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const unique: string[] = [];
  for (const item of ranked) {
    if (!unique.includes(item.fact)) unique.push(item.fact);
    if (unique.length >= limit) break;
  }
  return unique;
}

function formatCrm(message: string, companyName: string): string {
  const wants = /限界|課題|導入したい|自動化|予約|LINE|Excel|管理/.test(message)
    ? message.replace(/^今日[、,].*?「/, "").replace(/」とのことだった。?$/, "")
    : message;
  const certainty = /前向き|ぜひ|今期|役員|プレゼン/.test(message) ? "高" : "中";
  const nextAction = /来週|月曜日|プレゼン/.test(message)
    ? "来週月曜日の役員向けプレゼン資料を作成し、日程確定のフォローを入れる"
    : "次回商談の日程を確定し、要件と予算の確認を行う";

  return `営業メモを自動整理しました（${companyName}）

【顧客のご要望/現在の課題】
${wants.trim()}

【確度】${certainty}

【次回推奨アクション】
${nextAction}

【AI営業アシスタントのコメント】
温度感が高く、予算上限と導入時期が明示されています。要件を「LINE連携 × 予約自動化」に絞った提案資料を先に用意すると、決裁が早まりやすい案件です。`;
}

function composeAnswer(
  companyName: string,
  facts: string[],
  agentType: AgentId,
  message: string,
): string {
  const name = companyName || "当サービス";

  if (facts.length === 0) {
    return `ご質問ありがとうございます。現在の学習ナレッジには、その内容の記載が見当たりませんでした。
左側のマニュアルに追記いただくと、より正確にお答えできます。`;
  }

  const body = facts.map((fact) => `・${fact}`).join("\n");

  if (agentType === "reservation") {
    const cancel = facts.some((fact) => fact.includes("キャンセル"));
    return `${name}です。ご予約のご相談を承りました。

ご指定の内容をナレッジと照合した結果です。
${body}

${cancel ? "当日キャンセルは規定どおりキャンセル料が発生します。" : "ご希望の日時で仮押さえをご案内できます。"}
お名前とご希望メニューが分かれば、このまま予約フローを進められます。`;
  }

  if (agentType === "knowledge") {
    return `社内マニュアルから該当箇所を抽出しました。

${body}

ご質問「${message.slice(0, 40)}${message.length > 40 ? "…" : ""}」へのピンポイント回答です。追加で確認したいルールがあれば続けてどうぞ。`;
  }

  return `こんにちは！「${name}」のAIエージェントです。

ご質問のポイントをナレッジから照合しました。
${body}

ほかにご不明点があれば、そのままご質問ください。`;
}

export function simulateReply(input: SimulateInput): string {
  const message = input.message.trim();
  if (!message) return "ご質問を入力してください。";

  if (input.agentType === "workflow") {
    return formatCrm(message, input.companyName);
  }

  const facts = pickFacts(input.knowledge, message);
  return composeAnswer(input.companyName, facts, input.agentType, message);
}

export function welcomeMessage(companyName: string): string {
  return `こんにちは！「${companyName}」のAIエージェントです。
私の設定マニュアルや企業情報は【AI学習ナレッジ】で自由に編集・カスタマイズできます！

どのような内容をお調べいたしますか？`;
}

export function resetMessage(companyName: string): string {
  return `カスタマイズ設定を初期化しました。
「${companyName}」のAIエージェントへの質問をどうぞ！`;
}
