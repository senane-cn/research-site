const $ = (selector) => document.querySelector(selector);

const main = $("main");
const hero = $(".overall-hero");

document.querySelectorAll(".stage-band, .overall-metrics, .topic-divider").forEach((element) => element.remove());

const publicNav = document.createElement("nav");
publicNav.className = "public-section-nav section-shell";
publicNav.setAttribute("aria-label", "全程总览四个部分");
publicNav.innerHTML = `
  <span class="section-nav-label"><b>专题导航</b><small>CONTENTS</small></span>
  <a href="#participation"><b>A</b><span>委员国参与总体状况</span></a>
  <a href="#time-efficiency"><b>B1</b><span>议事效率</span></a>
  <a href="#judgment-formation"><b>B2</b><span>专业判断与决定形成</span></a>
  <a href="#execution-intro"><b>B3</b><span>决定的可执行性</span></a>`;
hero.after(publicNav);

function createSectionIntro(id, number, title, description) {
  const section = document.createElement("section");
  section.id = id;
  section.className = "public-section-intro section-shell";
  section.innerHTML = `<span>${number}</span><div><h2>${title}</h2><p>${description}</p></div>`;
  return section;
}

const participationIntro = createSectionIntro(
  "participation",
  "A",
  "委员国参与总体状况",
  "本专题呈现21个委员国在议程5—12中的议程覆盖、发言回合、参与集中度、文本角色与共同文本，并比较近三届委员国参与量的变化。"
);

const timeIntro = createSectionIntro(
  "time-efficiency",
  "B1",
  "时间与议事效率",
  "本专题以会议时间为观察对象，呈现四类议程的时间构成、各议程的参与范围与讨论强度、近三届议程重心变化，并用总体样本、长议题样本和机制案例分析五类讨论内容。"
);

const judgmentIntro = createSectionIntro(
  "judgment-formation",
  "B2",
  "专业判断与决定形成",
  "本专题以决定形成过程为观察对象，统计议程7、8讨论后怎样改变决定草案与结果，并用典型论断链和相似案件样本观察专业或规则判断是否被纠正、吸收或留下公开理由。"
);

const executionIntro = createSectionIntro(
  "execution-intro",
  "B3",
  "决定的可执行性",
  "本专题以决定所设行动为观察对象，先区分决定类型与后果风险，再核对行动、责任主体、期限、核验和反馈／处置是否足以支持后续执行与再次决策。"
);

const participationHistory = document.createElement("section");
participationHistory.className = "section-shell analysis-section participation-history";
participationHistory.id = "participation-history-section";
participationHistory.setAttribute("aria-labelledby", "participation-history-title");
participationHistory.innerHTML = `<header class="section-heading"><p class="section-no">CROSS-SESSION PARTICIPATION</p><div><h2 id="participation-history-title">近三届委员国发言回合前1／3（7国）</h2><p>46、47COM依据官方 Summary Records，48COM依据本届公开会议记录与字幕重建；均限定议程5—12，并以一名代表一次连续发言为1回合。48COM数值为当前可复核下限。</p></div></header>`;
const roleCompare = $("#historical-role-compare");
if (roleCompare) participationHistory.append(roleCompare);

const cotextMatrix = $("#cotext-matrix-panel");
const cotextObservation = $("#cotext-observation");
if (cotextMatrix && cotextObservation) cotextMatrix.after(cotextObservation);

const ordered = [
  participationIntro,
  $("#member-overall-section"),
  $("#member-concentration-section"),
  $("#cotext-overall-section"),
  $("#census-section"),
  participationHistory,
  timeIntro,
  $("#time-audit-section"),
  $("#overall-analysis-section"),
  $("#time-role-section"),
  $("#historical-section"),
  judgmentIntro,
  $("#judgment-sample-section"),
  executionIntro,
  $("#execution"),
  $("#indicator-framework-section")
].filter(Boolean);

ordered.forEach((element) => main.append(element));

[
  $("#member-overall-section"),
  $("#member-concentration-section"),
  $("#cotext-overall-section"),
  $("#census-section"),
  participationHistory
].filter(Boolean).forEach((element) => element.classList.add("topic-participation-module"));

const labels = [
  ["#member-overall-title", "21国全程参与与技术作用"],
  ["#member-concentration-title", "各委员国议程参与集中度"],
  ["#cotext-overall-title", "委员国之间的共同文本与同案支持"],
  ["#census-title", "哪些决定草案被委员国改变"],
  ["#time-audit-title", "四类议程的时间构成与讨论用途"],
  ["#overall-analysis-title", "各议程的讨论热度"],
  ["#historical-title", "近三届四类议程回合分布看重心移动"],
  ["#time-role-title", "谁开启讨论，谁把讨论拉回可决策轨道"],
  ["#execution-title", "决定任务怎样形成执行闭环"]
];
labels.forEach(([selector, text]) => {
  const node = $(selector);
  if (node) node.textContent = text;
});

const sectionLabels = [
  ["#member-overall-section .section-no", "MEMBER PARTICIPATION"],
  ["#member-concentration-section .section-no", "AGENDA CONCENTRATION"],
  ["#cotext-overall-section .section-no", "CO-TEXT & SUPPORT"],
  ["#census-section .section-no", "DRAFT DECISION CHANGE"],
  ["#time-audit-section .section-no", "TIME ALLOCATION & USES"],
  ["#overall-analysis-section .section-no", "PARTICIPATION × INTENSITY"],
  ["#historical-section .section-no", "CROSS-SESSION AGENDA SHARE"],
  ["#time-role-section .section-no", "DISCUSSION ROLES / 7-CASE SAMPLE"],
  ["#judgment-sample-section .section-no", "DECISION FORMATION"],
  ["#execution .section-no", "DECISION EXECUTABILITY"]
];
sectionLabels.forEach(([selector, text]) => {
  const node = $(selector);
  if (node) node.textContent = text;
});

document.documentElement.classList.add("layout-ready");
