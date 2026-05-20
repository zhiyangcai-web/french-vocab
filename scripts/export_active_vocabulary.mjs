import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vocabPath = path.join(root, "vocab.json");
const mojibakeTokens = [
  "\u920d", "\u00e2\u20ac", "\u00ef\u00bf\u00bd", "\ufffd",
  "\u00c3\u00a9", "\u00c3\u00a8", "\u00c3\u00aa", "\u00c3\u0020", "\u00c3\u00a7",
  "\u832b", "\u951a", "\u813f", "\u934c", "\u7efe", "\u4e36", "\u20ac?"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeUtf8(fileName, content) {
  fs.writeFileSync(path.join(root, fileName), content.replace(/\r?\n/g, "\n"), "utf8");
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}

function firstCollocation(card) {
  return Array.isArray(card.collocations) ? card.collocations.join(" / ") : "";
}

function tagsText(card) {
  return Array.isArray(card.tags) ? card.tags.join(", ") : "";
}

function groupCards(cards) {
  const groups = new Map();
  for (const card of cards) {
    const key = `${card.date} - ${card.theme}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(card);
  }
  return groups;
}

function buildCardsMarkdown(data) {
  const lines = [
    "# Active Vocabulary Cards",
    "",
    "用途：这是主要复习版。相比表格，这个格式更适合学习、朗读、造句和写作复用。",
    ""
  ];

  for (const [group, cards] of groupCards(data.cards)) {
    lines.push(`## ${group}`, "");
    cards.forEach((card, index) => {
      lines.push(`### ${index + 1}. ${card.expression}`, "");
      lines.push(`批次：${card.batch ?? card.date}`, "");
      lines.push(`标签：${tagsText(card)}`, "");
      lines.push(`中文：${card.zh ?? ""}`, "");
      lines.push("常见搭配：", "");
      for (const item of card.collocations ?? []) lines.push(`- ${item}`);
      lines.push("", "例句：", "", "```text", card.example ?? "", "```", "");
      lines.push(`使用场景：${card.useCase ?? ""}`, "");
    });
  }

  return `${lines.join("\n")}\n`;
}

function buildTableMarkdown(data) {
  const lines = [
    "# Active Vocabulary Table",
    "",
    "这是每日主动词汇的动态表。只记录需要进入写作/口语主动使用的表达。",
    "",
    "| Date | Batch | Theme | Tags | Expression | 中文 | Collocation | Example | Status |",
    "|---|---|---|---|---|---|---|---|---|"
  ];

  for (const card of data.cards) {
    lines.push([
      card.date,
      card.batch,
      card.theme,
      tagsText(card),
      card.expression,
      card.zh,
      firstCollocation(card),
      card.example,
      "active"
    ].map(escapeCell).join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  }

  return `${lines.join("\n")}\n`;
}

function buildDailyLogMarkdown(data) {
  const lines = [
    "# Daily Active Vocabulary Log",
    "",
    "用途：记录每天真正需要变成主动词汇的表达。  ",
    "原则：只收“可直接用于写作/口语”的表达，不收孤立单词。",
    ""
  ];

  for (const [group, cards] of groupCards(data.cards)) {
    lines.push(`## ${group}`, "", "### Active Expressions", "");
    cards.forEach((card, index) => {
      lines.push(`${index + 1}. \`${card.expression}\``);
      lines.push(`   - 批次：${card.batch ?? card.date}`);
      lines.push(`   - 标签：${tagsText(card)}`);
      lines.push(`   - 中文：${card.zh ?? ""}`);
      lines.push(`   - 搭配：\`${(card.collocations ?? [])[0] ?? ""}\``);
      lines.push(`   - 例句：\`${card.example ?? ""}\``, "");
    });
  }

  return `${lines.join("\n")}\n`;
}

function exportMarkdown() {
  const data = readJson(vocabPath);
  const cardsMarkdown = buildCardsMarkdown(data);
  const tableMarkdown = buildTableMarkdown(data);
  const dailyLogMarkdown = buildDailyLogMarkdown(data);
  writeUtf8("active_vocabulary_cards.md", cardsMarkdown);
  writeUtf8("active_vocabulary_table.md", tableMarkdown);
  writeUtf8("daily_active_vocabulary_log.md", dailyLogMarkdown);
  writeUtf8("cards.md", cardsMarkdown);
  writeUtf8("table.md", tableMarkdown);
  writeUtf8("log.md", dailyLogMarkdown);
  console.log(`Exported markdown for ${data.cards.length} cards.`);
}

function validate() {
  const required = [
    "index.html",
    "vocab.json",
    "daily_active_vocabulary_log.md",
    "active_vocabulary_cards.md",
    "active_vocabulary_table.md",
    "active_vocabulary_cards.docx",
    "active_vocabulary_cards.pdf",
    "active_vocabulary_table.docx",
    "active_vocabulary_table.pdf"
  ];

  const data = readJson(vocabPath);
  if (!Array.isArray(data.cards)) throw new Error("vocab.json must contain cards[].");

  for (const [index, card] of data.cards.entries()) {
    for (const field of ["date", "batch", "theme", "tags", "expression", "zh", "collocations", "example", "useCase"]) {
      if (!(field in card)) throw new Error(`Card ${index + 1} is missing ${field}.`);
    }
    if (typeof card.batch !== "string" || !card.batch.trim()) throw new Error(`Card ${index + 1} batch must be a string.`);
    if (!Array.isArray(card.tags) || card.tags.length === 0) throw new Error(`Card ${index + 1} tags must be a non-empty array.`);
    for (const tag of card.tags) {
      if (typeof tag !== "string" || !tag.trim()) throw new Error(`Card ${index + 1} has an invalid tag.`);
    }
    if (!Array.isArray(card.collocations)) throw new Error(`Card ${index + 1} collocations must be an array.`);
  }

  for (const fileName of required) {
    const filePath = path.join(root, fileName);
    if (!fs.existsSync(filePath)) throw new Error(`${fileName} is missing.`);
    if (fs.statSync(filePath).size === 0) throw new Error(`${fileName} is empty.`);
  }

  for (const fileName of required.filter((name) => /\.(html|json|md)$/i.test(name))) {
    const content = fs.readFileSync(path.join(root, fileName), "utf8");
    for (const token of mojibakeTokens) {
      if (content.includes(token)) throw new Error(`${fileName} contains mojibake-like text.`);
    }
  }

  for (const fileName of required.filter((name) => /\.pdf$/i.test(name))) {
    const header = fs.readFileSync(path.join(root, fileName)).subarray(0, 8).toString("utf8");
    if (!header.startsWith("%PDF-")) throw new Error(`${fileName} is not a recognizable PDF.`);
  }

  console.log(`Validated ${data.cards.length} cards and ${required.length} files.`);
}

const command = process.argv[2] ?? "validate";
if (command === "export") exportMarkdown();
else if (command === "validate") validate();
else throw new Error(`Unknown command: ${command}`);
