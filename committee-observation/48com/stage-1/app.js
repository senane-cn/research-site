import { whc48LogoBase64 } from "./assets/whc48-logo.generated.js";

const DATA_URL = "data/phase-1.json";
const denominatorAgendaIds = ["2", "12", "5A", "5B", "5D", "5C", "6B", "6C"];
const proposalRoles = new Set(["lead", "co_sponsor"]);
const deliberativeRoles = new Set(["edit", "guardrail"]);
const regionColors = {
  africa: "#b84854",
  arab: "#6652a4",
  asia_pacific: "#267a5e",
  europe_north_america: "#2d629e",
  latin_caribbean: "#9a681c"
};
const actionLabels = ["无记录", "立场／实质发言", "文本／程序行动", "发言＋文本／程序行动"];
const topicLevelLabels = ["未观察", "出现", "反复／明确", "高关注度"];
const influenceLabels = {
  initiative: {
    label: "提出议题",
    description: "主提正式修正案，以及得到处理的程序倡议。"
  },
  coSponsor: {
    label: "共同提出",
    description: "在正式修正案登记中列为共同提出，不与主提合并计数。"
  },
  deliberative: {
    label: "介入讨论",
    description: "可追溯的措辞校准、程序护栏、折衷或采纳编辑。"
  }
};
const collator = new Intl.Collator("zh-CN");

let data;
let state = { region: "all", country: "all", sort: "speech-desc" };
let activeDetailTarget = null;
let pinnedDetailTarget = null;

const $ = (selector) => document.querySelector(selector);

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function regionById(id) {
  return data.regions.find((region) => region.id === id);
}

function agendaById(id) {
  return data.agendas.find((agenda) => agenda.id === id);
}

function countryById(id) {
  return data.countries.find((country) => country.id === id);
}

function metricsFor(country) {
  const values = denominatorAgendaIds.map((id) => country.agendas[id]);
  const speechValues = denominatorAgendaIds.map((id) => country.speech_turns[id]);
  const leadPackages = data.amendment_packages.filter((item) =>
    item.actors.some((actor) => actor.country === country.id && actor.role === "lead")
  ).length;
  const coSponsoredPackages = data.amendment_packages.filter((item) =>
    item.actors.some((actor) => actor.country === country.id && actor.role === "co_sponsor")
  ).length;
  const proceduralInitiatives = data.accepted_oral_actions.filter((item) =>
    item.country === country.id && item.type === "procedural"
  ).length;
  const deliberativePackages = data.amendment_packages.filter((item) =>
    item.actors.some((actor) => actor.country === country.id && deliberativeRoles.has(actor.role))
  ).length;
  const deliberativeOral = data.accepted_oral_actions.filter((item) =>
    item.country === country.id && item.type !== "procedural"
  ).length;
  const speechTurns = speechValues.reduce((sum, value) => sum + value, 0);
  const topTurnCount = Math.max(...speechValues);
  const topAgendaIds = denominatorAgendaIds.filter((id) => country.speech_turns[id] === topTurnCount && topTurnCount > 0);

  return {
    active: values.filter((value) => value > 0).length,
    speechAgendas: speechValues.filter((value) => value > 0).length,
    speechTurns,
    text: values.filter((value) => value === 2 || value === 3).length,
    lead: leadPackages,
    coSponsor: coSponsoredPackages,
    initiative: leadPackages + proceduralInitiatives,
    deliberative: deliberativePackages + deliberativeOral,
    topTurnCount,
    topAgendaIds,
    concentration: speechTurns ? topTurnCount / speechTurns : 0
  };
}

function topTopics(country) {
  return data.topics
    .map((topic) => ({ label: topic.label, value: country.topics[topic.id] }))
    .filter((topic) => topic.value === 3)
    .sort((a, b) => collator.compare(a.label, b.label))
    .slice(0, 4);
}

function firstClause(value) {
  const text = String(value);
  const stop = text.search(/[；。]/);
  return stop === -1 ? text : text.slice(0, stop);
}

function amendmentLabel(item, roleLabel = "") {
  const role = roleLabel ? `${roleLabel}；` : "";
  return `议程${item.agenda} · ${item.short_label ?? item.title}（${role}${item.outcome_label}）`;
}

function coactionPackages(countryA, countryB) {
  return data.amendment_packages.filter((item) => {
    const proposers = new Set(
      item.actors
        .filter((actor) => proposalRoles.has(actor.role))
        .map((actor) => actor.country)
    );
    return proposers.has(countryA) && proposers.has(countryB);
  });
}

function influenceItems(country, measure) {
  const packageRoles = {
    initiative: new Set(["lead"]),
    coSponsor: new Set(["co_sponsor"]),
    deliberative: deliberativeRoles
  };
  const items = data.amendment_packages.flatMap((item) => {
    const actor = item.actors.find(
      (candidate) => candidate.country === country.id && packageRoles[measure].has(candidate.role)
    );
    return actor ? [amendmentLabel(item, actor.role_label)] : [];
  });

  const oralItems = data.accepted_oral_actions.flatMap((item) => {
    if (item.country !== country.id) return [];
    if (measure === "initiative" && item.type !== "procedural") return [];
    if (measure === "deliberative" && item.type === "procedural") return [];
    if (measure === "coSponsor") return [];
    const actionType = item.type === "procedural" ? "程序倡议" : item.type === "compromise" ? "折衷" : "采纳编辑";
    return [`议程${item.agenda} · ${actionType}：${item.result}`];
  });

  return [...items, ...oralItems];
}

function detailForElement(element) {
  const kind = element.dataset.detailKind;

  if (kind === "scatter" || kind === "country") {
    const country = countryById(element.dataset.country);
    if (!country) return null;
    const metrics = metricsFor(country);
    const concentration = metrics.speechTurns
      ? `集中：议程${metrics.topAgendaIds.join("／")} · ${metrics.topTurnCount}/${metrics.speechTurns}回合`
      : "集中：无可核对发言";
    const prominentTopics = topTopics(country).map((topic) => topic.label).join("、") || "暂无高关注度议题";
    return {
      title: `${country.name_zh} · ${country.code}`,
      body: kind === "country" ? country.summary : country.profile,
      items: [
        `覆盖：${metrics.active}/8个有效议程`,
        `发言：${metrics.speechTurns}个可核对回合`,
        concentration,
        `高关注度：${prominentTopics}`
      ]
    };
  }

  if (kind === "influence") {
    const country = countryById(element.dataset.country);
    const measure = element.dataset.measure;
    const definition = influenceLabels[measure];
    if (!country || !definition) return null;
    const metrics = metricsFor(country);
    const count = metrics[measure];
    const items = influenceItems(country, measure);
    return {
      title: `${country.name_zh} · ${definition.label} ${count}`,
      body: definition.description,
      items: items.length ? items : ["本阶段无符合当前证据边界的记录"]
    };
  }

  if (kind === "agenda") {
    const country = countryById(element.dataset.country);
    const agenda = agendaById(element.dataset.agenda);
    if (!country || !agenda) return null;
    const value = country.agendas[agenda.id];
    const turns = country.speech_turns[agenda.id];
    return {
      title: `${country.name_zh} · 议程${agenda.id}`,
      body: `${turns}个可核对发言回合；${actionLabels[value]}。`,
      items: [
        `议题：${agenda.title}`,
        `类别：${agenda.category}`,
        `议程焦点：${firstClause(agenda.finding)}`
      ]
    };
  }

  if (kind === "topic") {
    const country = countryById(element.dataset.country);
    const topic = data.topics.find((item) => item.id === element.dataset.topic);
    if (!country || !topic) return null;
    const value = country.topics[topic.id];
    return {
      title: `${country.name_zh} · ${topic.label}`,
      body: `显著度 ${value}/3 · ${topicLevelLabels[value]}`,
      items: [
        `阶段角色：${country.profile}`,
        `该国阶段摘要：${country.summary}`
      ]
    };
  }

  if (kind === "coaction") {
    const countryA = countryById(element.dataset.countryA);
    const countryB = countryById(element.dataset.countryB);
    if (!countryA || !countryB) return null;
    const packages = coactionPackages(countryA.id, countryB.id);
    return {
      title: `${countryA.name_zh} × ${countryB.name_zh}`,
      body: `共同列入${packages.length}组正式修正案的主提／共同提出名单。`,
      items: packages.map((item) => amendmentLabel(item))
    };
  }

  return null;
}

function isMatch(country) {
  if (state.country !== "all") return country.id === state.country;
  if (state.region !== "all") return country.region === state.region;
  return true;
}

function sortCountries(countries) {
  return [...countries].sort((a, b) => {
    const am = metricsFor(a);
    const bm = metricsFor(b);
    if (state.sort === "speech-desc") return bm.speechTurns - am.speechTurns || bm.active - am.active || collator.compare(a.name_zh, b.name_zh);
    if (state.sort === "initiative-desc") return bm.initiative - am.initiative || bm.speechTurns - am.speechTurns || collator.compare(a.name_zh, b.name_zh);
    if (state.sort === "deliberative-desc") return bm.deliberative - am.deliberative || bm.speechTurns - am.speechTurns || collator.compare(a.name_zh, b.name_zh);
    if (state.sort === "name-asc") return collator.compare(a.name_zh, b.name_zh);
    return bm.active - am.active || bm.speechTurns - am.speechTurns || collator.compare(a.name_zh, b.name_zh);
  });
}

function readStateFromURL() {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");
  const country = params.get("country");
  if (data.regions.some((item) => item.id === region)) state.region = region;
  if (data.countries.some((item) => item.id === country)) {
    state.country = country;
    state.region = countryById(country).region;
  }
}

function syncURL() {
  const params = new URLSearchParams();
  if (state.region !== "all") params.set("region", state.region);
  if (state.country !== "all") params.set("country", state.country);
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
}

function populateControls() {
  const regionSelect = $("#region-filter");
  const countrySelect = $("#country-filter");
  for (const region of data.regions) {
    const option = document.createElement("option");
    option.value = region.id;
    option.textContent = region.label;
    regionSelect.append(option);
  }
  for (const country of [...data.countries].sort((a, b) => collator.compare(a.name_zh, b.name_zh))) {
    const option = document.createElement("option");
    option.value = country.id;
    option.textContent = `${country.name_zh} · ${country.code}`;
    countrySelect.append(option);
  }
  regionSelect.value = state.region;
  countrySelect.value = state.country;
  $("#sort-table").value = state.sort;
}

function positionTooltip(target) {
  const tooltip = $("#viz-tooltip");
  const targetRect = target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const edge = 12;
  const gap = 10;
  const centeredLeft = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
  const left = Math.min(
    Math.max(centeredLeft, edge),
    window.innerWidth - tooltipRect.width - edge
  );
  let top = targetRect.bottom + gap;
  if (top + tooltipRect.height > window.innerHeight - edge) {
    top = Math.max(edge, targetRect.top - tooltipRect.height - gap);
  }
  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

function showTooltip(target) {
  const detail = detailForElement(target);
  if (!detail) return;
  const tooltip = $("#viz-tooltip");
  const title = $("#viz-tooltip-title");
  const body = $("#viz-tooltip-body");
  const list = $("#viz-tooltip-list");

  if (activeDetailTarget && activeDetailTarget !== target) {
    activeDetailTarget.removeAttribute("aria-describedby");
  }
  activeDetailTarget = target;
  title.textContent = detail.title;
  body.textContent = detail.body ?? "";
  body.hidden = !detail.body;
  list.replaceChildren(
    ...detail.items.map((item) => {
      const row = document.createElement("li");
      row.textContent = item;
      return row;
    })
  );
  list.hidden = !detail.items.length;
  tooltip.hidden = false;
  tooltip.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-describedby", "viz-tooltip");
  positionTooltip(target);
}

function hideTooltip(force = false) {
  if (pinnedDetailTarget && !force) return;
  const tooltip = $("#viz-tooltip");
  if (activeDetailTarget) activeDetailTarget.removeAttribute("aria-describedby");
  activeDetailTarget = null;
  tooltip.hidden = true;
  tooltip.setAttribute("aria-hidden", "true");
}

function bindTooltipEvents() {
  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch" || pinnedDetailTarget) return;
    const target = event.target.closest("[data-detail-kind]");
    if (target) showTooltip(target);
  });

  document.addEventListener("pointerout", (event) => {
    const target = event.target.closest("[data-detail-kind]");
    if (!target || target.contains(event.relatedTarget)) return;
    hideTooltip();
  });

  document.addEventListener("focusin", (event) => {
    const target = event.target.closest("[data-detail-kind]");
    if (target) showTooltip(target);
  });

  document.addEventListener("focusout", (event) => {
    const target = event.target.closest("[data-detail-kind]");
    if (!target || target.contains(event.relatedTarget)) return;
    hideTooltip();
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-detail-kind]");
    if (!target) {
      pinnedDetailTarget = null;
      hideTooltip(true);
      return;
    }
    if (pinnedDetailTarget === target) {
      pinnedDetailTarget = null;
      hideTooltip(true);
      return;
    }
    pinnedDetailTarget = target;
    showTooltip(target);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    pinnedDetailTarget = null;
    hideTooltip(true);
  });

  window.addEventListener("resize", () => {
    pinnedDetailTarget = null;
    hideTooltip(true);
  });
  document.addEventListener("scroll", () => {
    pinnedDetailTarget = null;
    hideTooltip(true);
  }, true);
}

function renderMetrics() {
  $("#metric-members").textContent = data.metadata.committee_members;
  $("#metric-actions").textContent = data.metadata.country_agenda_actions;
  $("#metric-speeches").textContent = data.metadata.verified_speech_turns;
  $("#metric-packages").textContent = data.metadata.official_amendment_packages;
  $("#metric-decisions").textContent = data.metadata.decisions_amended;
}

function renderRegionLegend() {
  $("#scatter-region-legend").innerHTML = data.regions.map((region) =>
    `<span><i style="--region-color:${regionColors[region.id]}"></i>${escapeHTML(region.label)}</span>`
  ).join("");
}

function renderScatter() {
  const container = $("#scatter");
  const countryMetrics = data.countries.map((country) => ({ country, metrics: metricsFor(country) }));
  const yMax = Math.max(...countryMetrics.map((item) => item.metrics.speechTurns), 1);
  const groups = new Map();
  for (const item of countryMetrics) {
    const key = `${item.metrics.active}-${item.metrics.speechTurns}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item.country.id);
  }

  let html = "";
  for (let x = 0; x <= 8; x += 1) {
    html += `<span class="scatter-tick x" style="left:${(x / 8) * 100}%">${x}</span>`;
  }
  const yStep = Math.max(1, Math.ceil(yMax / 6));
  const yTicks = [];
  for (let y = 0; y <= yMax; y += yStep) yTicks.push(y);
  if (yTicks.at(-1) !== yMax) yTicks.push(yMax);
  container.style.setProperty("--y-grid-step", `${(yStep / yMax) * 100}%`);
  for (const y of yTicks) {
    html += `<span class="scatter-tick y" style="bottom:${(y / yMax) * 100}%">${y}</span>`;
  }

  const nudges = [
    [0, 0], [10, 15], [-18, 25], [20, 36], [-28, 44], [32, 54], [-38, 62]
  ];
  for (const { country, metrics } of countryMetrics) {
    const key = `${metrics.active}-${metrics.speechTurns}`;
    const groupIndex = groups.get(key).indexOf(country.id);
    const [nudgeX, nudgeY] = nudges[groupIndex] ?? [groupIndex * 7, groupIndex * 9];
    const classes = ["scatter-point"];
    if (!isMatch(country)) classes.push("is-muted");
    if (state.country === country.id) classes.push("is-selected");
    const xPercent = Math.min((metrics.active / 8) * 100, 97);
    const yPercent = Math.min((metrics.speechTurns / yMax) * 100, 97);
    const yNudge = metrics.speechTurns === yMax ? 0 : 8 + nudgeY;
    const ariaLabel = `${country.name_zh}：覆盖${metrics.active}项议程，可核对发言${metrics.speechTurns}回合；聚焦可查看详细注释`;
    html += `<div class="${classes.join(" ")}" data-region="${country.region}" data-detail-kind="scatter" data-country="${country.id}" role="img" tabindex="0" aria-label="${escapeHTML(ariaLabel)}" style="left:calc(${xPercent}% + ${nudgeX}px);bottom:calc(${yPercent}% + ${yNudge}px)"><span>${escapeHTML(country.code)}</span></div>`;
  }
  container.innerHTML = html;
}

function bar(value, max) {
  return `<div class="number-bar"><b>${value}</b><span aria-hidden="true"><i style="width:${max ? (value / max) * 100 : 0}%"></i></span></div>`;
}

function topicTags(country) {
  const topics = topTopics(country);
  if (!topics.length) return "<span>暂无高关注度议题</span>";
  return topics.map((topic) => `<span>${escapeHTML(topic.label)}</span>`).join("");
}

function concentrationLabel(country, metrics) {
  if (!metrics.speechTurns) return "无发言记录";
  const agendaLabel = metrics.topAgendaIds.join("／");
  return `<strong>${escapeHTML(agendaLabel)}</strong><span>${metrics.topTurnCount}/${metrics.speechTurns} · ${Math.round(metrics.concentration * 100)}%</span>`;
}

function renderBoxscore() {
  const countries = sortCountries(data.countries);
  $("#boxscore-body").innerHTML = countries.map((country) => {
    const metrics = metricsFor(country);
    const region = regionById(country.region);
    const classes = [!isMatch(country) ? "is-muted" : "", state.country === country.id ? "is-selected" : ""].filter(Boolean).join(" ");
    return `<tr class="${classes}" data-country="${country.id}">
      <th scope="row" class="country-cell" data-detail-kind="country" data-country="${country.id}" tabindex="0" aria-label="${escapeHTML(`${country.name_zh}阶段统计摘要；聚焦可查看详细注释`)}"><strong>${escapeHTML(country.name_zh)}</strong><span>${escapeHTML(country.name_en)} · ${country.code}</span></th>
      <td><span class="region-chip">${region.short}</span></td>
      <td>${bar(metrics.active, 8)}</td>
      <td>${bar(metrics.speechTurns, 18)}</td>
      <td><div class="concentration-cell">${concentrationLabel(country, metrics)}</div></td>
      <td>${bar(metrics.text, 8)}</td>
      <td>${bar(metrics.lead, 3)}</td>
      <td>${bar(metrics.coSponsor, 4)}</td>
      <td>${bar(metrics.deliberative, 3)}</td>
      <td><div class="topic-tags">${topicTags(country)}</div></td>
    </tr>`;
  }).join("");

  $("#member-cards").innerHTML = countries.map((country) => {
    const metrics = metricsFor(country);
    const region = regionById(country.region);
    const classes = ["member-card", !isMatch(country) ? "is-muted" : "", state.country === country.id ? "is-selected" : ""].filter(Boolean).join(" ");
    return `<article class="${classes}" data-country="${country.id}">
      <header data-detail-kind="country" data-country="${country.id}" tabindex="0" aria-label="${escapeHTML(`${country.name_zh}阶段统计摘要；轻触或聚焦可查看详细注释`)}"><h3>${escapeHTML(country.name_zh)}<span>${escapeHTML(country.name_en)} · ${country.code}</span></h3><span class="region-chip">${region.short}</span></header>
      <p class="profile">${escapeHTML(country.profile)}</p>
      <dl><div><dt>覆盖议程</dt><dd>${metrics.active}</dd></div><div><dt>发言回合</dt><dd>${metrics.speechTurns}</dd></div><div><dt>提出议题</dt><dd>${metrics.initiative}</dd></div><div><dt>介入讨论</dt><dd>${metrics.deliberative}</dd></div></dl>
      <p class="mobile-concentration">最高集中：${concentrationLabel(country, metrics)}</p>
      <div class="topic-tags">${topicTags(country)}</div>
    </article>`;
  }).join("");
}

function renderAgendaMatrix() {
  const agendas = denominatorAgendaIds.map(agendaById);
  const countries = sortCountries(data.countries);
  const head = `<thead><tr><th scope="col">委员国</th>${agendas.map((agenda) => `<th scope="col" class="agenda-head"><strong>${agenda.id}</strong><span>${escapeHTML(agenda.title)}</span></th>`).join("")}</tr></thead>`;
  const body = `<tbody>${countries.map((country) => {
    const classes = [!isMatch(country) ? "is-muted" : "", state.country === country.id ? "is-selected" : ""].filter(Boolean).join(" ");
    const cells = agendas.map((agenda) => {
      const value = country.agendas[agenda.id];
      const turns = country.speech_turns[agenda.id];
      const ariaLabel = `${country.name_zh}，议程${agenda.id}${agenda.title}：${turns}个可核对发言回合；${actionLabels[value]}；聚焦可查看详细注释`;
      return `<td class="matrix-cell"><span class="cell-v${value}" data-detail-kind="agenda" data-country="${country.id}" data-agenda="${agenda.id}" tabindex="0" aria-label="${escapeHTML(ariaLabel)}"><b>${turns}</b><small>${value === 0 ? "—" : data.action_legend[value].short}</small></span></td>`;
    }).join("");
    return `<tr class="${classes}"><th scope="row" class="country-cell"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></th>${cells}</tr>`;
  }).join("")}</tbody>`;
  $("#agenda-matrix").innerHTML = head + body;
}

function renderInfluenceBars() {
  const countries = sortCountries(data.countries);
  const maxValue = Math.max(...countries.flatMap((country) => {
    const metrics = metricsFor(country);
    return [metrics.initiative, metrics.coSponsor, metrics.deliberative];
  }), 1);
  $("#influence-bars").innerHTML = countries.map((country) => {
    const metrics = metricsFor(country);
    const classes = ["influence-row", !isMatch(country) ? "is-muted" : "", state.country === country.id ? "is-selected" : ""].filter(Boolean).join(" ");
    const measure = (value, className, measureName) => {
      const label = influenceLabels[measureName].label;
      const ariaLabel = `${country.name_zh}${label}${value}项；聚焦可查看记录来源`;
      return `<div class="influence-measure" data-detail-kind="influence" data-country="${country.id}" data-measure="${measureName}" tabindex="0" aria-label="${escapeHTML(ariaLabel)}"><div><span class="${className}" style="width:${(value / maxValue) * 100}%"></span></div><b>${value}</b></div>`;
    };
    return `<article class="${classes}">
      <div class="influence-country"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></div>
      ${measure(metrics.initiative, "initiative-bar", "initiative")}
      ${measure(metrics.coSponsor, "cosponsor-bar", "coSponsor")}
      ${measure(metrics.deliberative, "deliberative-bar", "deliberative")}
    </article>`;
  }).join("");
}

function renderTopicMatrix() {
  const countries = sortCountries(data.countries);
  const head = `<thead><tr><th scope="col">委员国</th>${data.topics.map((topic) => `<th scope="col">${escapeHTML(topic.label)}</th>`).join("")}</tr></thead>`;
  const body = `<tbody>${countries.map((country) => {
    const classes = [!isMatch(country) ? "is-muted" : "", state.country === country.id ? "is-selected" : ""].filter(Boolean).join(" ");
    const cells = data.topics.map((topic) => {
      const value = country.topics[topic.id];
      const ariaLabel = `${country.name_zh}，${topic.label}：显著度${value}/3，${topicLevelLabels[value]}；聚焦可查看阶段摘要`;
      return `<td class="matrix-cell"><span class="topic-v${value}" data-detail-kind="topic" data-country="${country.id}" data-topic="${topic.id}" tabindex="0" aria-label="${escapeHTML(ariaLabel)}">${value}</span></td>`;
    }).join("");
    return `<tr class="${classes}"><th scope="row" class="country-cell"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></th>${cells}</tr>`;
  }).join("")}</tbody>`;
  $("#topic-matrix").innerHTML = head + body;
}

function coactionCounts() {
  const counts = new Map();
  const totals = new Map();
  for (const item of data.amendment_packages) {
    const actors = [...new Set(item.actors.filter((actor) => proposalRoles.has(actor.role)).map((actor) => actor.country))];
    for (let i = 0; i < actors.length; i += 1) {
      for (let j = i + 1; j < actors.length; j += 1) {
        const key = [actors[i], actors[j]].sort().join("|");
        counts.set(key, (counts.get(key) ?? 0) + 1);
        totals.set(actors[i], (totals.get(actors[i]) ?? 0) + 1);
        totals.set(actors[j], (totals.get(actors[j]) ?? 0) + 1);
      }
    }
  }
  return { counts, totals };
}

function renderCoactionMatrix() {
  const { counts, totals } = coactionCounts();
  const countries = data.countries
    .filter((country) => (totals.get(country.id) ?? 0) > 0)
    .sort((a, b) => (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0) || collator.compare(a.name_zh, b.name_zh));
  const head = `<thead><tr><th scope="col">共同提案</th>${countries.map((country) => `<th scope="col" title="${escapeHTML(country.name_zh)}">${country.code}</th>`).join("")}</tr></thead>`;
  const body = `<tbody>${countries.map((rowCountry) => {
    const rowMuted = !isMatch(rowCountry) ? "is-muted" : "";
    const cells = countries.map((columnCountry) => {
      if (rowCountry.id === columnCountry.id) return `<td class="diagonal">—</td>`;
      const value = counts.get([rowCountry.id, columnCountry.id].sort().join("|")) ?? 0;
      const className = value ? `pair-v${Math.min(value, 5)}` : "";
      if (!value) return `<td></td>`;
      const ariaLabel = `${rowCountry.name_zh}与${columnCountry.name_zh}共同署名${value}组；聚焦可查看议题关键词清单`;
      return `<td class="${className}" data-detail-kind="coaction" data-country-a="${rowCountry.id}" data-country-b="${columnCountry.id}" tabindex="0" aria-label="${escapeHTML(ariaLabel)}">${value}</td>`;
    }).join("");
    return `<tr class="${rowMuted}"><th scope="row" class="country-cell"><strong>${escapeHTML(rowCountry.name_zh)}</strong><span>${rowCountry.code}</span></th>${cells}</tr>`;
  }).join("")}</tbody>`;
  $("#coaction-matrix").innerHTML = head + body;
}

function renderFindingsAndSources() {
  $("#findings-list").innerHTML = data.stage_findings.map((finding) =>
    `<article class="finding"><div><h3>${escapeHTML(finding.title)}</h3><p>${escapeHTML(finding.text)}</p></div></article>`
  ).join("");
  const agendaSources = data.agendas.map((agenda) => ({
    label: `议程 ${agenda.id} · ${agenda.title}`,
    use: `${agenda.date} · UNESCO工作文件`,
    url: agenda.source_url
  }));
  $("#source-list").innerHTML = [...data.sources, ...agendaSources].map((source) =>
    `<div class="source-item"><strong>${escapeHTML(source.label)}</strong><span>${escapeHTML(source.use)}</span><a href="${escapeHTML(source.url)}"${source.url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>打开来源 ↗</a></div>`
  ).join("");
}

function updateFilterSummary() {
  const matched = data.countries.filter(isMatch);
  let label = `显示全部${matched.length}国`;
  if (state.country !== "all") label = `聚焦：${countryById(state.country).name_zh}`;
  else if (state.region !== "all") label = `${regionById(state.region).label} · ${matched.length}国`;
  $("#filter-summary").textContent = label;
}

function renderFilterDependentViews() {
  pinnedDetailTarget = null;
  hideTooltip(true);
  renderScatter();
  renderBoxscore();
  renderInfluenceBars();
  renderAgendaMatrix();
  renderTopicMatrix();
  renderCoactionMatrix();
  updateFilterSummary();
}

function bindEvents() {
  $("#region-filter").addEventListener("change", (event) => {
    state.region = event.target.value;
    if (state.country !== "all" && countryById(state.country).region !== state.region) {
      state.country = "all";
      $("#country-filter").value = "all";
    }
    syncURL();
    renderFilterDependentViews();
  });
  $("#country-filter").addEventListener("change", (event) => {
    state.country = event.target.value;
    if (state.country !== "all") {
      state.region = countryById(state.country).region;
      $("#region-filter").value = state.region;
    }
    syncURL();
    renderFilterDependentViews();
  });
  $("#sort-table").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderFilterDependentViews();
  });
  $("#reset-filters").addEventListener("click", () => {
    state.region = "all";
    state.country = "all";
    $("#region-filter").value = "all";
    $("#country-filter").value = "all";
    syncURL();
    renderFilterDependentViews();
  });
  $("#print-page").addEventListener("click", () => window.print());
}

function renderFailure(error) {
  const main = $("#main");
  const notice = document.createElement("div");
  notice.className = "noscript";
  notice.setAttribute("role", "alert");
  notice.innerHTML = `数据加载失败。请通过本地或网站服务器打开页面，或直接查看<a href="${DATA_URL}">JSON数据</a>。`;
  main.prepend(notice);
  console.error(error);
}

async function init() {
  $("#conference-logo").src = `data:image/svg+xml;base64,${whc48LogoBase64}`;
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
    readStateFromURL();
    renderMetrics();
    populateControls();
    renderRegionLegend();
    renderFindingsAndSources();
    renderFilterDependentViews();
    bindEvents();
    bindTooltipEvents();
  } catch (error) {
    renderFailure(error);
  }
}

init();
