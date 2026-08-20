import { whc48LogoBase64 } from "../stage-1/assets/whc48-logo.generated.js";
import html2canvas from "../stage-2a/assets/html2canvas-1.4.1.esm.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const regionColors = {
  africa: "#c64f5a",
  arab: "#6e55a2",
  asia_pacific: "#267a5e",
  europe_north_america: "#2d629e",
  latin_caribbean: "#a96e16"
};

const state = {
  region: "all",
  country: "all",
  sortKey: "coverage",
  sortDirection: "desc"
};

let data;
let historicalData;
let censusData;
let stage1Data;
let stage2aData;
let timeSampleData;
let topic01Data;
const pageMode = document.body.dataset.page || "phase";

const historicalAgendaColors = ["#18365f", "#2d629e", "#267a5e", "#a77526"];
const discussionModeColors = {
  direct: "#8b96a4",
  narrow: "#a77526",
  broad: "#2d629e",
  near_full: "#267a5e"
};

const countryFlags = {
  ARM: "🇦🇲", AZE: "🇦🇿", BGD: "🇧🇩", BEL: "🇧🇪", CZE: "🇨🇿",
  GRD: "🇬🇩", JAM: "🇯🇲", KAZ: "🇰🇿", KEN: "🇰🇪", KWT: "🇰🇼",
  LBN: "🇱🇧", MNG: "🇲🇳", PER: "🇵🇪", POL: "🇵🇱", KOR: "🇰🇷",
  SEN: "🇸🇳", CHE: "🇨🇭", TGO: "🇹🇬", TUR: "🇹🇷", UKR: "🇺🇦",
  TZA: "🇹🇿", VNM: "🇻🇳", IND: "🇮🇳", VCT: "🇻🇨", ARG: "🇦🇷", ZMB: "🇿🇲"
};

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function countryName(code) {
  return data.countries.find((country) => country.code === code)?.name_zh || code;
}

function countryToken(code) {
  return `<span class="country-token" title="${escapeHTML(countryName(code))}">${escapeHTML(code)}</span>`;
}

function roleLine(label, codes, className) {
  const content = codes.length ? codes.map(countryToken).join("") : `<span class="empty">—</span>`;
  return `<div class="role-line ${className}"><b>${label}</b><div>${content}</div></div>`;
}

const roleMeta = {
  lead: { label: "主导／提出", short: "主提", action: "主导或提出正式文本" },
  support: { label: "正式或明确支持", short: "支持", action: "正式共同提出或明确支持" },
  calibrate: { label: "技术／保护校准", short: "校准", action: "提出技术、保护或程序校准" },
  counter: { label: "反对／保留", short: "反／保", action: "反对、保留或与结果分离" }
};

function roleCases(code, key) {
  return data.units.filter((unit) => unit[key]?.includes(code));
}

function roleTooltip(country, key) {
  const cases = roleCases(country.code, key);
  if (!cases.length) return `${country.name_zh}（${country.code}）：本阶段没有可核对的${roleMeta[key].label}项目。`;
  return `${country.name_zh}（${country.code}）· ${roleMeta[key].label}${cases.length}案：${cases.map((unit) => `${unit.id} ${unit.name_zh}（遗产地所属国家：${unit.party}）—${roleMeta[key].action}`).join("；")}`;
}

function countryCodeMap(dataset) {
  return new Map((dataset?.countries || []).map((country) => [country.id, country.code]));
}

function deriveOverallMembers() {
  if (!stage1Data || !stage2aData || !censusData) return [];
  const agendaKeys = censusData.items.map((item) => item.agenda);
  const rows = new Map(data.countries.map((country) => [country.code, {
    code: country.code,
    name_zh: country.name_zh,
    region: country.region,
    turns: Object.fromEntries(agendaKeys.map((agenda) => [agenda, 0])),
    roles: { lead: 0, support: 0, calibrate: 0, counter: 0, procedure: 0 },
    roleCases: { lead: [], support: [], calibrate: [], counter: [], procedure: [] }
  }]));

  censusData.items.forEach((item) => {
    Object.entries(item.country_turns || {}).forEach(([code, turns]) => {
      if (rows.has(code)) rows.get(code).turns[item.agenda] = turns;
    });
  });
  const stage2aIdCode = countryCodeMap(stage2aData);
  stage2aData.units.forEach((unit) => {
    Object.entries(unit.members || {}).forEach(([countryId, action]) => {
      const code = stage2aIdCode.get(countryId);
      if (code && rows.has(code)) rows.get(code).turns["7"] += action.discussion || 0;
    });
  });

  const addRole = (code, role, label) => {
    if (!rows.has(code)) return;
    rows.get(code).roles[role] += 1;
    rows.get(code).roleCases[role].push(label);
  };
  const stage1IdCode = countryCodeMap(stage1Data);
  stage1Data.amendment_packages.filter((item) => item.agenda !== "2").forEach((item) => {
    item.actors.forEach((actor) => {
      const code = stage1IdCode.get(actor.country);
      const label = `${item.agenda} ${item.short_label || item.title}`;
      if (actor.role === "lead") addRole(code, "lead", label);
      else if (["co_sponsor", "support"].includes(actor.role)) addRole(code, "support", label);
      else if (["edit", "guardrail"].includes(actor.role)) addRole(code, "calibrate", label);
    });
  });
  stage2aData.amendment_packages.forEach((item) => {
    item.actors.forEach((actor) => {
      const code = stage2aIdCode.get(actor.country);
      const label = `${item.unit} ${item.label}`;
      if (["lead", "joint_submitter"].includes(actor.role)) addRole(code, "lead", label);
      else if (["co_sponsor", "floor_join"].includes(actor.role)) addRole(code, "support", label);
    });
  });
  stage2aData.accepted_actions.forEach((item) => {
    const code = stage2aIdCode.get(item.country);
    addRole(code, item.type === "procedural" ? "procedure" : "calibrate", `${item.unit} ${item.label}`);
  });
  data.units.forEach((unit) => {
    ["lead", "support", "calibrate", "counter"].forEach((role) => {
      (unit[role] || []).forEach((code) => addRole(code, role, `${unit.id} ${unit.name_zh}`));
    });
  });

  return [...rows.values()].map((row) => {
    const totalTurns = Object.values(row.turns).reduce((sum, value) => sum + value, 0);
    const coverage = Object.values(row.turns).filter((value) => value > 0).length;
    const [topAgenda, topTurns] = Object.entries(row.turns).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
    return {
      ...row,
      totalTurns,
      coverage,
      topAgenda,
      topTurns,
      topShare: totalTurns ? Math.round(topTurns / totalTurns * 100) : 0
    };
  });
}

function overallConcentrationGroups() {
  const stored = censusData.overall_analysis.concentration;
  const compactItems = (items, total, keep = 5) => {
    const sorted = [...items].filter((item) => item.member_turns > 0).sort((a, b) => b.member_turns - a.member_turns);
    const shown = sorted.slice(0, keep);
    const remainder = sorted.slice(keep);
    if (remainder.length) shown.push({
      agenda: `其他${remainder.length}项`,
      label: remainder.map((item) => item.agenda).join("、"),
      member_turns: remainder.reduce((sum, item) => sum + item.member_turns, 0)
    });
    return shown.map((item) => ({ ...item, share: +(item.member_turns / total * 100).toFixed(1) }));
  };
  const agenda7Items = stage2aData.units.map((unit) => ({
    agenda: unit.short_label || unit.id,
    label: unit.label,
    member_turns: Object.values(unit.members || {}).reduce((sum, action) => sum + (action.discussion || 0), 0)
  }));
  const agenda8Items = data.units.map((unit) => ({ agenda: unit.id, label: unit.name_zh, member_turns: unit.speech_turns }));
  return [
    stored[0],
    { family: "7 保护状况", family_turns: 210, items: compactItems(agenda7Items, 210) },
    { family: "8 提名与列入", family_turns: 186, items: compactItems(agenda8Items, 186) },
    stored[1]
  ];
}

function strictCotextPackages() {
  return (topic01Data?.formal_text_units || []).map((item) => ({
    stage: item.family,
    id: item.id,
    agenda: item.agenda,
    label: `${item.agenda} ${item.label}`,
    actors: [...new Set(item.actors || [])],
    sourceUrl: item.source_url,
    sourceType: item.source_type,
    nonCountrySubmitter: item.non_country_submitter || ""
  }));
}

function sameCaseSupportEvents() {
  const events = [];
  const stage1IdCode = countryCodeMap(stage1Data);
  const stage2aIdCode = countryCodeMap(stage2aData);
  stage1Data.amendment_packages.filter((item) => item.agenda !== "2").forEach((item) => {
    const actors = item.actors
      .filter((actor) => ["lead", "co_sponsor", "support"].includes(actor.role))
      .map((actor) => stage1IdCode.get(actor.country)).filter(Boolean);
    if (actors.length > 1) events.push({ stage: "5—6", label: `${item.agenda} ${item.short_label || item.title}`, actors: [...new Set(actors)] });
  });
  (stage2aData.integrity_audit?.decision_change_audit?.cases || []).filter((item) => item.kind === "text").forEach((item) => {
    const actors = item.stances
      .filter((stance) => ["lead", "support"].includes(stance.role))
      .map((stance) => stage2aIdCode.get(stance.country)).filter(Boolean);
    if (actors.length > 1) events.push({ stage: "7", label: `${item.unit.replace(/^7([AB])/, "7$1.")} ${item.site}`, actors: [...new Set(actors)] });
  });
  data.units.forEach((unit) => {
    const actors = [...new Set([...(unit.lead || []), ...(unit.support || [])])];
    if (actors.length > 1) events.push({ stage: "8", label: `${unit.id} ${unit.name_zh}`, actors });
  });
  return events;
}

function cotextPairRows(events) {
  const pairMap = new Map();
  events.forEach((item) => {
    const actors = [...new Set(item.actors || [])].sort();
    actors.forEach((left, index) => actors.slice(index + 1).forEach((right) => {
      const key = `${left}·${right}`;
      if (!pairMap.has(key)) pairMap.set(key, { left, right, count: 0, packages: [] });
      pairMap.get(key).count += 1;
      pairMap.get(key).packages.push(item.label);
    }));
  });
  return [...pairMap.values()].sort((a, b) => b.count - a.count || `${a.left}${a.right}`.localeCompare(`${b.left}${b.right}`));
}

function committeeMandate(session, code) {
  const record = topic01Data?.committee_mandates?.[session];
  return {
    term: record?.members?.[code] || "—",
    sourceUrl: record?.source_url || ""
  };
}

function renderRoleOverview() {
  const keys = ["lead", "support", "calibrate", "counter"];
  $("#role-overview").innerHTML = keys.map((key) => {
    const counts = new Map();
    data.units.forEach((unit) => unit[key].forEach((code) => counts.set(code, (counts.get(code) || 0) + 1)));
    const actions = [...counts.values()].reduce((sum, value) => sum + value, 0);
    const [topCode, topCount] = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0] || ["—", 0];
    const className = key === "calibrate" || key === "counter" ? key : "";
    const projects = data.units
      .filter((unit) => unit[key].length)
      .map((unit) => `${unit.id} ${unit.name_zh}（遗产地所属国家：${unit.party}，${unit[key].length}国）`)
      .join("；");
    return `
      <article class="${className}" tabindex="0" data-tooltip="${escapeHTML(`${roleMeta[key].label}共${actions}个国家—项目动作，涉及${counts.size}个委员国。${topCode !== "—" ? `出现最多的是${countryName(topCode)}（${topCode}），${topCount}案。` : ""}${projects ? ` 项目：${projects}` : ""}`)}">
        <header><span>${roleMeta[key].short}</span><strong>${actions}</strong></header>
        <h3>${roleMeta[key].label}</h3>
        <p><b>${counts.size}国</b>留下记录 · 最多：${escapeHTML(topCode)} ${topCount}案</p>
      </article>
    `;
  }).join("");
  bindTooltips($("#role-overview"));
}

function isVisibleCountry(country) {
  return (state.region === "all" || country.region === state.region)
    && (state.country === "all" || country.code === state.country);
}

function setMetrics() {
  const metadata = data.metadata;
  $("#metric-members").textContent = metadata.member_count;
  $("#metric-units").textContent = metadata.effective_units;
  $("#metric-actions").textContent = metadata.country_unit_actions;
  $("#metric-speeches").textContent = metadata.speech_turns_lower_bound;
  $("#metric-packages").textContent = metadata.formal_text_packages;
  $("#metric-shifts").textContent = metadata.substantive_outcome_changes;
}

function renderMechanisms() {
  $("#mechanism-summary").innerHTML = data.mechanism_summary.map((item) => `
    <article class="mechanism-card">
      <header><h3>${escapeHTML(item.label)}</h3><strong>${item.count}</strong></header>
      <p>${escapeHTML(item.note)}</p>
    </article>
  `).join("");
}

function renderOutcomeShifts() {
  $("#outcome-shift-list").innerHTML = data.outcome_changes.map((item, index) => `
    <details class="shift-card"${index === 0 ? " open" : ""}>
      <summary>
        <span class="shift-case">
          <strong>${escapeHTML(item.id)} · ${escapeHTML(item.name)}</strong>
          <span>议程相关缔约国：${escapeHTML(item.party)}</span>
        </span>
        <span class="shift-state from">${escapeHTML(item.from)}</span>
        <span class="shift-arrow" aria-hidden="true">→</span>
        <span class="shift-state to">${escapeHTML(item.to)}</span>
        <span class="shift-mechanism">${escapeHTML(item.mechanism)}</span>
      </summary>
      <div class="shift-detail">
        <p><strong>实质改变：</strong>${escapeHTML(item.change)}<br><strong>观察标签：</strong>${item.tags.map(escapeHTML).join(" · ")}</p>
        <div class="role-stack">
          ${roleLine("主", item.lead, "lead")}
          ${roleLine("支", item.support, "support")}
          ${roleLine("校", item.calibrate, "calibrate")}
          ${roleLine("反／保", item.counter, "counter")}
        </div>
      </div>
    </details>
  `).join("");
}

function renderRoleBars() {
  const maximums = {
    lead: Math.max(...data.countries.map((country) => country.lead), 1),
    support: Math.max(...data.countries.map((country) => country.support), 1),
    calibrate: Math.max(...data.countries.map((country) => country.calibrate), 1),
    counter: Math.max(...data.countries.map((country) => country.counter), 1)
  };
  const rows = [...data.countries]
    .sort((a, b) => (b.lead + b.calibrate + b.counter + b.support / 10) - (a.lead + a.calibrate + a.counter + a.support / 10));
  const measure = (country, key, label) => `
    <button type="button" class="mini-measure measure-${key}" data-tooltip="${escapeHTML(roleTooltip(country, key))}" aria-label="${escapeHTML(roleTooltip(country, key))}">
      <span class="measure-label">${label}</span>
      <span class="mini-track"><i style="width:${country[key] / maximums[key] * 100}%"></i></span>
      <b>${country[key]}</b>
    </button>
  `;
  $("#role-bars").innerHTML = rows.map((country) => `
    <article class="role-row${isVisibleCountry(country) ? "" : " is-muted"}">
      <div class="role-country"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code} · 覆盖${country.coverage}案</span></div>
      ${measure(country, "lead", "主提")}
      ${measure(country, "support", "支持")}
      ${measure(country, "calibrate", "校准")}
      ${measure(country, "counter", "反／保")}
    </article>
  `).join("");
  bindTooltips($("#role-bars"));
}

function renderRegionLegend() {
  $("#region-legend").innerHTML = data.regions.map((region) => `
    <span><i style="background:${regionColors[region.id]}"></i>${escapeHTML(region.label)}</span>
  `).join("");
}

function renderScatter() {
  const width = 1040;
  const height = 520;
  const margin = { top: 34, right: 104, bottom: 66, left: 64 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xMax = data.metadata.effective_units;
  const yMax = Math.ceil(Math.max(...data.countries.map((country) => country.speech_turns)) / 2) * 2;
  const textMax = Math.max(...data.countries.map((country) => country.lead + country.support));
  const x = (value) => margin.left + (value / xMax) * innerWidth;
  const y = (value) => margin.top + innerHeight - (value / yMax) * innerHeight;
  const xTicks = Array.from({ length: xMax + 1 }, (_, index) => index);
  const yTicks = Array.from({ length: yMax / 2 + 1 }, (_, index) => index * 2);

  const grid = [
    ...xTicks.map((tick) => `<line class="scatter-grid" x1="${x(tick)}" x2="${x(tick)}" y1="${margin.top}" y2="${margin.top + innerHeight}"/>`),
    ...yTicks.map((tick) => `<line class="scatter-grid" x1="${margin.left}" x2="${margin.left + innerWidth}" y1="${y(tick)}" y2="${y(tick)}"/>`)
  ].join("");
  const ticks = [
    ...xTicks.map((tick) => `<text class="scatter-tick" x="${x(tick)}" y="${height - 39}" text-anchor="middle">${tick}</text>`),
    ...yTicks.map((tick) => `<text class="scatter-tick" x="${margin.left - 15}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>`)
  ].join("");

  const coordinateGroups = new Map();
  data.countries.forEach((country) => {
    const key = `${country.coverage}:${country.speech_turns}`;
    if (!coordinateGroups.has(key)) coordinateGroups.set(key, []);
    coordinateGroups.get(key).push(country);
  });
  coordinateGroups.forEach((countries) => countries.sort((a, b) => a.code.localeCompare(b.code)));

  const fanOffsets = {
    2: [[-14, 0], [14, 0]],
    3: [[-30, 0], [0, 0], [30, 0]],
    4: [[-42, 0], [-14, 0], [14, 0], [42, 0]],
    5: [[-56, 0], [-28, 0], [0, 0], [28, 0], [56, 0]]
  };
  const displayPosition = (country) => {
    const group = coordinateGroups.get(`${country.coverage}:${country.speech_turns}`);
    const index = group.findIndex((row) => row.code === country.code);
    const [dx, dy] = group.length > 1
      ? (fanOffsets[group.length] || group.map((_, position) => [(position - (group.length - 1) / 2) * 28, 0]))[index]
      : [0, 0];
    return {
      baseX: x(country.coverage),
      baseY: y(country.speech_turns),
      pointX: x(country.coverage) + dx,
      pointY: y(country.speech_turns) + dy,
      coincident: group.length > 1,
      groupSize: group.length
    };
  };

  const points = data.countries.map((country) => {
    const radius = 6 + ((country.lead + country.support) / textMax) * 7;
    const selected = state.country === country.code;
    const muted = !isVisibleCountry(country);
    const position = displayPosition(country);
    const labelOnLeft = !position.coincident && country.coverage >= xMax;
    const labelX = position.coincident ? position.pointX : position.pointX + (labelOnLeft ? -radius - 7 : radius + 7);
    const labelY = position.coincident ? position.pointY + radius + 14 : position.pointY + 3;
    const labelAnchor = position.coincident ? "middle" : labelOnLeft ? "end" : "start";
    const overlapNote = position.coincident ? `｜与${position.groupSize - 1}国坐标重合，图中沿引导线展开` : "";
    const tooltip = `${country.name_zh} · ${country.code}｜覆盖 ${country.coverage}/11｜发言 ${country.speech_turns}｜主提 ${country.lead}｜共同支持 ${country.support}${overlapNote}`;
    return `
      <g class="scatter-group${selected ? " is-selected" : ""}${muted ? " is-muted" : ""}" data-tooltip="${escapeHTML(tooltip)}" tabindex="0">
        ${position.coincident ? `<line class="scatter-link" x1="${position.baseX}" y1="${position.baseY}" x2="${position.pointX}" y2="${position.pointY}"/>` : ""}
        <circle class="scatter-ring" cx="${position.pointX}" cy="${position.pointY}" r="${radius + 3}" stroke="${regionColors[country.region]}"/>
        <circle class="scatter-dot" cx="${position.pointX}" cy="${position.pointY}" r="${radius}" fill="${regionColors[country.region]}"/>
        <text class="scatter-label" x="${labelX}" y="${labelY}" text-anchor="${labelAnchor}">${country.code}</text>
      </g>
    `;
  }).join("");
  const anchors = [...coordinateGroups.entries()].filter(([, countries]) => countries.length > 1).map(([key, countries]) => {
    const [coverage, speechTurns] = key.split(":").map(Number);
    return `<g class="scatter-shared-anchor"><circle cx="${x(coverage)}" cy="${y(speechTurns)}" r="3"/><text x="${x(coverage)}" y="${y(speechTurns) - 18}" text-anchor="middle">${countries.length}国同坐标</text></g>`;
  }).join("");

  $("#participation-scatter").innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="scatter-svg-title scatter-svg-desc">
      <title id="scatter-svg-title">议程8委员国覆盖面与发言量</title>
      <desc id="scatter-svg-desc">横轴为11个有效审议单元中的行动覆盖数，纵轴为可核对发言回合下限，圆点大小表示正式文本行动。</desc>
      ${grid}
      <line class="scatter-axis" x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${margin.top + innerHeight}"/>
      <line class="scatter-axis" x1="${margin.left}" x2="${margin.left + innerWidth}" y1="${margin.top + innerHeight}" y2="${margin.top + innerHeight}"/>
      ${ticks}
      <text class="scatter-axis-label" x="${margin.left + innerWidth / 2}" y="${height - 11}" text-anchor="middle">有效审议单元覆盖（最多11）</text>
      <text class="scatter-axis-label" x="17" y="${margin.top + innerHeight / 2}" text-anchor="middle" transform="rotate(-90 17 ${margin.top + innerHeight / 2})">可核对发言回合下限</text>
      ${anchors}
      ${points}
    </svg>
  `;
  bindTooltips($("#participation-scatter"));
}

function valueBar(value, max, className = "") {
  return `<span class="number-cell ${className}"><b>${value}</b><i><span style="width:${max ? value / max * 100 : 0}%"></span></i></span>`;
}

function renderBoxscore() {
  const rows = data.countries.filter(isVisibleCountry).sort((a, b) => {
    const aValue = state.sortKey === "name_zh" ? a.name_zh : a[state.sortKey];
    const bValue = state.sortKey === "name_zh" ? b.name_zh : b[state.sortKey];
    if (typeof aValue === "string") {
      return state.sortDirection === "asc" ? aValue.localeCompare(bValue, "zh-CN") : bValue.localeCompare(aValue, "zh-CN");
    }
    return state.sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });
  const max = Object.fromEntries(["coverage", "speech_turns", "lead", "support", "calibrate", "counter"].map((key) => [
    key,
    Math.max(...data.countries.map((country) => country[key]), 1)
  ]));
  $("#boxscore-body").innerHTML = rows.map((country) => `
    <tr>
      <td class="country-cell"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></td>
      <td>${valueBar(country.coverage, max.coverage)}</td>
      <td>${valueBar(country.speech_turns, max.speech_turns)}</td>
      <td>${valueBar(country.lead, max.lead)}</td>
      <td>${valueBar(country.support, max.support)}</td>
      <td>${valueBar(country.calibrate, max.calibrate, "calibrate")}</td>
      <td>${valueBar(country.counter, max.counter, "counter")}</td>
      <td class="focus-cell">${escapeHTML(country.focus_unit)}</td>
    </tr>
  `).join("");
  $$(".boxscore-table th[data-sort]").forEach((header) => {
    header.classList.toggle("sort-desc", header.dataset.sort === state.sortKey && state.sortDirection === "desc");
    header.classList.toggle("sort-asc", header.dataset.sort === state.sortKey && state.sortDirection === "asc");
  });
}

function actionForUnit(unit, code) {
  if (unit.counter.includes(code)) return { className: "cell-counter", label: "反／保", detail: "反对、保留或与结果分离" };
  if (unit.calibrate.includes(code)) return { className: "cell-calibrate", label: "校", detail: "技术或保护性校准" };
  if (unit.lead.includes(code)) return { className: "cell-text", label: "主", detail: "主导或提出正式文本" };
  if (unit.support.includes(code)) return { className: "cell-speech", label: "支", detail: "正式共同提出或明确支持" };
  if (unit.involved.includes(code)) return { className: "cell-speech", label: "发", detail: "讨论或程序行动" };
  return { className: "cell-none", label: "—", detail: "无可核对委员国行动" };
}

function renderFootprint() {
  const units = data.units;
  const countries = data.countries.filter(isVisibleCountry);
  const header = `
    <div class="matrix-row matrix-head" style="--columns:${units.length}">
      <div class="matrix-country"><strong>委员国</strong><span>21 members</span></div>
      ${units.map((unit) => `<div><strong>${escapeHTML(unit.name_zh)}</strong><span>${escapeHTML(unit.id)} · ${escapeHTML(unit.type)}</span></div>`).join("")}
    </div>
  `;
  const rows = countries.map((country) => `
    <div class="matrix-row" style="--columns:${units.length}">
      <div class="matrix-country"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></div>
      ${units.map((unit) => {
        const action = actionForUnit(unit, country.code);
        const tooltip = `${country.name_zh} × ${unit.name_zh}（${unit.id}）：${action.detail}。结果：${unit.result}`;
        return `<div class="matrix-value ${action.className}"><button type="button" data-tooltip="${escapeHTML(tooltip)}" aria-label="${escapeHTML(tooltip)}">${action.label}</button></div>`;
      }).join("")}
    </div>
  `).join("");
  $("#footprint-matrix").innerHTML = header + rows;
  bindTooltips($("#footprint-matrix"));
}

function attentionLevel(value) {
  if (value === 0) return 0;
  if (value <= 2) return 1;
  if (value <= 4) return 2;
  if (value <= 6) return 3;
  return 4;
}

function renderAttention() {
  const countries = data.countries.filter(isVisibleCountry);
  const header = `
    <div class="matrix-row matrix-head" style="--columns:${data.topics.length}">
      <div class="matrix-country"><strong>委员国</strong><span>主题单元数</span></div>
      ${data.topics.map((topic) => `<div><strong>${escapeHTML(topic.label)}</strong><span>${escapeHTML(topic.short)}</span></div>`).join("")}
    </div>
  `;
  const rows = countries.map((country) => `
    <div class="matrix-row" style="--columns:${data.topics.length}">
      <div class="matrix-country"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></div>
      ${country.topics.map((value, index) => {
        const topic = data.topics[index];
        const tooltip = `${country.name_zh}｜${topic.label}：涉及${value}个审议单元。`;
        return `<div class="attention-cell level-${attentionLevel(value)}" data-tooltip="${escapeHTML(tooltip)}" tabindex="0">${value}<small>${escapeHTML(topic.short)}</small></div>`;
      }).join("")}
    </div>
  `).join("");
  $("#attention-matrix").innerHTML = header + rows;
  bindTooltips($("#attention-matrix"));
}

function renderReasoningFramework() {
  $("#reasoning-framework").innerHTML = data.reasoning_framework.map((item) => `
    <article class="framework-card class-${item.class}">
      <strong>${item.class}</strong>
      <h3>${escapeHTML(item.label)}</h3>
      <p>${escapeHTML(item.definition)}</p>
    </article>
  `).join("");
}

function reasoningStats() {
  const counts = Object.fromEntries(["A", "B", "C", "D"].map((className) => [
    className,
    data.reasoning_claims.filter((claim) => claim.class === className).length
  ]));
  $("#reasoning-summary").innerHTML = ["A", "B", "C", "D"].map((className) => `
    <article class="reasoning-stat class-${className}"><strong>${counts[className]}</strong><span>${className}类论断 · ${escapeHTML(data.reasoning_framework.find((item) => item.class === className).label)}</span></article>
  `).join("");
}

function renderClaims() {
  $("#reasoning-claims").innerHTML = data.reasoning_claims.map((claim, index) => {
    const supporterText = claim.supporters.length
      ? claim.supporters.map((code) => `${code} ${countryName(code)}`).join("、")
      : "未观察到其他委员明确复述同一理由";
    return `
      <details class="claim-card"${index === 0 ? " open" : ""}>
        <summary>
          <span class="class-badge ${claim.class}"><b>${claim.class}</b>${escapeHTML(data.reasoning_framework.find((item) => item.class === claim.class).label)}</span>
          <span class="claim-unit">${escapeHTML(claim.unit)} · ${escapeHTML(claim.case)}</span>
          <span class="claim-country">${escapeHTML(claim.country)} · ${escapeHTML(countryName(claim.country))}</span>
          <span class="claim-text">${escapeHTML(claim.claim)}</span>
        </summary>
        <div class="claim-detail">
          <div>
            <h4>规则／证据基线</h4>
            <p>${escapeHTML(claim.basis)}</p>
            <h4 style="margin-top:10px">边界说明</h4>
            <p>${escapeHTML(claim.note)}</p>
          </div>
          <div class="claim-meta">
            <div><span>明确复述同一理由</span><strong>${escapeHTML(supporterText)}</strong></div>
            <div><span>现场纠正</span><strong>${escapeHTML(claim.correction_by || "无明确纠正")}</strong></div>
            <div><span>纠正后仍坚持</span><strong>${claim.persistence}次</strong></div>
            <div><span>进入最终文本／结果逻辑</span><strong>${claim.text_uptake ? "是" : "否"}</strong></div>
          </div>
        </div>
      </details>
    `;
  }).join("");
}

function renderReasoningCountries() {
  const aggregation = new Map();
  const ensure = (code) => {
    if (!aggregation.has(code)) aggregation.set(code, { code, A: 0, B: 0, C: 0, D: 0, support: 0, correction: 0, persistence: 0, uptake: 0 });
    return aggregation.get(code);
  };
  data.reasoning_claims.forEach((claim) => {
    const row = ensure(claim.country);
    row[claim.class] += 1;
    row.correction += claim.correction_by ? 1 : 0;
    row.persistence += claim.persistence;
    row.uptake += claim.text_uptake ? 1 : 0;
    claim.supporters.forEach((code) => { ensure(code).support += 1; });
  });
  const rows = [...aggregation.values()].sort((a, b) => (b.A + b.B + b.C + b.D + b.support) - (a.A + a.B + a.C + a.D + a.support));
  $("#reasoning-country-grid").innerHTML = rows.map((row) => `
    <article class="reasoning-country-card">
      <header><strong>${escapeHTML(countryName(row.code))}</strong><span>${row.code}</span></header>
      ${["A", "B", "C", "D"].map((className) => `<span class="reason-count ${className}">${row[className]}<small>${className}</small></span>`).join("")}
      <div class="reason-extra">同理支持 <b>${row.support}</b> · 被纠正 <b>${row.correction}</b> · 纠正后坚持 <b>${row.persistence}</b> · 进入文本 <b>${row.uptake}</b></div>
    </article>
  `).join("");
}

function renderCorrectionTrace() {
  $("#correction-trace").innerHTML = `
    <article class="trace-step problem">
      <strong>1 · 初始论断</strong>
      <p>孟加拉国把屏幕上理解为受影响的2个对象除以约800座登记古迹，得出0.25%，据此衡量维也纳开发影响。</p>
    </article>
    <span class="trace-arrow" aria-hidden="true">→</span>
    <article class="trace-step correction">
      <strong>2 · 专业纠正</strong>
      <p>ICOMOS说明：视廊、城市形态和不同管制区的影响，不能换算成单体建筑占比。</p>
    </article>
    <span class="trace-arrow" aria-hidden="true">→</span>
    <article class="trace-step persist">
      <strong>3 · 仍然坚持</strong>
      <p>该比例仍被用来主张问题规模很小。编码为1次“纠正后坚持”，问题是测量构念，不是算术。</p>
    </article>
    <span class="trace-arrow" aria-hidden="true">→</span>
    <article class="trace-step result">
      <strong>4 · 结果影响</strong>
      <p>无法证明该单一论断决定最终结果；推动移出的一方还使用进展、程序和法律解释等其他理由。</p>
    </article>
  `;
}

function decisionChangeGroups() {
  const stage1Packages = stage1Data.amendment_packages.filter((item) => item.agenda !== "2");
  const stage1ByAgenda = new Map();
  stage1Packages.forEach((item) => {
    if (!stage1ByAgenda.has(item.agenda)) stage1ByAgenda.set(item.agenda, []);
    stage1ByAgenda.get(item.agenda).push(item);
  });
  const stage1Cases = [...stage1ByAgenda.entries()].map(([agenda, packages]) => ({
    id: agenda,
    label: packages.map((item) => item.short_label || item.title).join(" · "),
    type: "制度／任务文本",
    baseline: "原决定草案",
    change: packages.map((item) => item.result).join("；"),
    outcome: packages.map((item) => item.outcome_label).join("／")
  }));
  const audit7 = stage2aData.integrity_audit?.decision_change_audit;
  const agenda7Cases = (audit7?.cases || []).filter((item) => item.kind === "text").map((item) => ({
    id: item.unit.replace(/^7([AB])/, "7$1."),
    label: item.site,
    type: (audit7.mechanisms.find((mechanism) => mechanism.id === item.primary)?.short_label || item.primary),
    baseline: item.baseline,
    change: item.change,
    outcome: item.outcome
  }));
  const agenda8Cases = data.outcome_changes.map((item) => ({
    id: item.id,
    label: item.name,
    type: item.mechanism,
    baseline: item.from,
    change: item.change,
    outcome: item.to
  }));
  const agenda10Case = {
    id: "10",
    label: "《操作指南》第五章及附件7",
    type: "授权与程序路径",
    baseline: "两年检视结果与修订文本进入本届审议。",
    change: "现场讨论新增开放式工作组方向，并要求法律顾问界定组成、权限、期限和资源。",
    outcome: "工作组路径进入委员会决定和后续议程安排。"
  };
  return [
    { family: "5—6 战略与制度", color: historicalAgendaColors[0], cases: stage1Cases },
    { family: "7 保护状况", color: historicalAgendaColors[1], cases: agenda7Cases },
    { family: "8 提名与列入", color: historicalAgendaColors[2], cases: agenda8Cases },
    { family: "9—12 执行机制", color: historicalAgendaColors[3], cases: [agenda10Case] }
  ];
}

function renderCoverageAudit() {
  const audit = censusData.coverage_audit;
  if (!audit || !$("#coverage-audit")) return;
  const verifiedShare = +(audit.verified_turns / censusData.grand_total * 100).toFixed(1);
  const lowerShare = +(audit.lower_bound_turns / censusData.grand_total * 100).toFixed(1);
  $("#coverage-audit").innerHTML = `
    <div class="coverage-stack" role="img" aria-label="已逐项核定${audit.verified_turns}回合，保守下限${audit.lower_bound_turns}回合">
      <span class="verified" style="width:${verifiedShare}%"><b>${audit.verified_turns}</b><small>已逐项核定 · ${verifiedShare}%</small></span>
      <span class="lower" style="width:${lowerShare}%"><b>${audit.lower_bound_turns}</b><small>保守下限 · ${lowerShare}%</small></span>
    </div>
    <div class="coverage-columns">
      <article><span>VERIFIED</span><h3>372回合已逐项核定</h3><p>${escapeHTML(audit.verified_scope)}</p></article>
      <article><span>LOWER BOUND</span><h3>253回合仍只是下限</h3><p>${escapeHTML(audit.lower_bound_scope)}</p><ul>${audit.recoverable.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></article>
      <article><span>OUT OF SCOPE</span><h3>不是“遗漏”，而是主动排除</h3><ul>${audit.deliberate_exclusions.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></article>
    </div>`;
}

function decisionSources(item) {
  return strictCotextPackages().filter((text) => text.agenda === item.id || text.id === item.id);
}

function renderCensus() {
  if (!censusData?.items?.length) return;
  const groups = decisionChangeGroups();
  const scopes = new Map((topic01Data?.decision_change_scopes || []).map((item) => [item.family, item]));
  const changedCount = [...scopes.values()].reduce((sum, item) => sum + (item.changed || 0), 0);
  const newTextCount = [...scopes.values()].reduce((sum, item) => sum + (item.new_text || 0), 0);
  const proceduralDeferrals = stage2aData.integrity_audit?.decision_change_audit?.cases.filter((item) => item.kind === "procedure").length || 0;
  $("#census-metrics").innerHTML = [
    [changedCount, "项相对原基线的改变"],
    [newTextCount, "项紧急提名形成完整新文本"],
    [proceduralDeferrals, "项实质审议后移，另列"],
    [groups.length, "类议程均出现可核对改变"]
  ].map(([value, label]) => `<article><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></article>`).join("");

  $("#decision-change-grid").innerHTML = groups.map((group, index) => {
    const scope = scopes.get(group.family) || { scope_total: group.cases.length, changed: group.cases.length, unit: "项", display: `${group.cases.length}` };
    const changedWidth = scope.scope_total ? (scope.changed || 0) / scope.scope_total * 100 : 0;
    const newTextWidth = scope.scope_total ? (scope.new_text || 0) / scope.scope_total * 100 : 0;
    return `
      <article style="--change-color:${group.color}">
        <header><span>0${index + 1}</span><h3>${escapeHTML(group.family)}</h3><strong>${escapeHTML(scope.display)}</strong></header>
        <div class="decision-count-track" role="img" aria-label="${escapeHTML(scope.note)}"><i class="changed" style="width:${changedWidth}%"></i>${newTextWidth ? `<i class="new-text" style="width:${newTextWidth}%"></i>` : ""}</div>
        <p class="decision-scope-label"><b>${escapeHTML(scope.unit)}</b><span>${escapeHTML(scope.note)}</span></p>
        <div class="decision-case-tokens">${group.cases.map((item) => `<button type="button" data-tooltip="${escapeHTML(`${item.id} ${item.label}。原基线：${item.baseline} 实质改变：${item.change} 结果：${item.outcome}`)}">${escapeHTML(item.id)}</button>`).join("")}</div>
      </article>`;
  }).join("");

  $("#decision-change-list").innerHTML = groups.map((group) => `
    <section style="--change-color:${group.color}"><header><h3>${escapeHTML(group.family)}</h3><span>${escapeHTML(scopes.get(group.family)?.display || `${group.cases.length}项`)}</span></header>${group.cases.map((item) => {
      const sources = decisionSources(item);
      const detail = `原基线：${item.baseline} 实质改变：${item.change} 结果：${item.outcome}`;
      return `
        <article><b>${escapeHTML(item.id)}</b><div><strong>${escapeHTML(item.label)}</strong><small>${escapeHTML(item.type)}</small></div><div class="decision-evidence-actions"><button type="button" data-tooltip="${escapeHTML(detail)}">变化说明</button>${sources.length ? `<a href="${escapeHTML(sources[0].sourceUrl)}" target="_blank" rel="noreferrer">修正文本${sources.length > 1 ? `（${sources.length}）` : ""} ↗</a>` : ""}</div></article>`;
    }).join("")}</section>`).join("");
  renderCoverageAudit();

  const censusTableBody = $("#census-table-body");
  if (censusTableBody) censusTableBody.innerHTML = censusData.items.map((item) => {
    const countries = Object.keys(item.country_turns || {});
    const detail = [
      `${item.agenda} ${item.label}：${item.member_turns}个委员国发言回合，${item.active_members}国参与。`,
      item.minutes ? `全会实质阶段约${item.minutes}分钟。` : "本轮不发布完整分钟值。",
      countries.length ? `可识别参与方：${countries.join("、")}。` : "逐国明细见相应阶段专题。",
      item.note
    ].filter(Boolean).join(" ");
    const evidenceClass = item.evidence.includes("字幕") ? "reconstructed" : item.evidence.includes("下限") ? "lower-bound" : "verified";
    return `
      <tr tabindex="0" data-tooltip="${escapeHTML(detail)}">
        <td><strong>${escapeHTML(item.agenda)}</strong></td>
        <td>${escapeHTML(item.label)}</td>
        <td><b>${item.member_turns}</b>${item.minutes ? `<small>${item.minutes}分钟</small>` : ""}</td>
        <td><b>${item.active_members}</b><small>／21</small></td>
        <td><span class="evidence-badge ${evidenceClass}">${escapeHTML(item.evidence)}</span></td>
        <td>${escapeHTML(item.focus)}</td>
      </tr>
    `;
  }).join("");
  $("#census-note").textContent = `“改变”指最终决定相对工作文件或专业建议发生可核对的实质变化。分母按审议单元确定：议程5—6、9—12以议程／子议程计，议程7、8以上会讨论个案计。议程8的2个紧急提名为完整新文本，不伪造原结果基线。`;
  bindTooltips($("#census-section"));
}

function renderOverallAnalysis() {
  const overall = censusData?.overall_analysis;
  if (!overall) return;

  const modeDefs = [
    { id: "direct", label: "无委员国介入", agendas: ["6A", "11"], definition: "报告或申请介绍后直接进入决定。" },
    { id: "narrow", label: "少数、近单轮介入", agendas: ["6B", "9A", "9B", "12"], definition: "不超过1/3委员国，回合量较低。" },
    { id: "broad", label: "较广参与、中等往返", agendas: ["5B", "5C", "5D", "10"], definition: "13—16国介入；议程10的复取发言更高。" },
    { id: "near_full", label: "近全员参与", agendas: ["5A", "6C", "7", "8"], definition: "19—21国介入；内部再分有限往返与高密度协商。" }
  ];
  const modeForAgenda = (agenda) => modeDefs.find((mode) => mode.agendas.includes(agenda)) || modeDefs[0];
  const headline = overall.headline;
  const overallKpis = $("#overall-kpis");
  if (overallKpis) overallKpis.innerHTML = [
    [`${headline.agenda_7_8_share}%`, "议程7—8占全部回合", `${headline.agenda_7_8_turns}／${censusData.grand_total}回合`],
    [`${headline.agenda_10_family_share}%`, "议程10占执行机制组", "53／67回合"],
    [headline.zero_floor_items.length, "项无委员国介入", headline.zero_floor_items.join(" · ")],
    [headline.iterative_items.length, "项呈反复协商结构", headline.iterative_items.join(" · ")]
  ].map(([value, label, detail]) => `
    <article><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span><small>${escapeHTML(detail)}</small></article>
  `).join("");

  const plotted = overall.reach_density.filter((row) => row.active_members > 0);
  const zeroFloor = overall.reach_density.filter((row) => row.active_members === 0);
  const width = 840;
  const height = 430;
  const plot = { left: 62, right: 786, top: 28, bottom: 340 };
  const x = (value) => plot.left + (value / 21) * (plot.right - plot.left);
  const y = (value) => plot.bottom - (value / 10) * (plot.bottom - plot.top);
  const maxTurns = Math.max(...plotted.map((row) => row.member_turns));
  const radius = (turns) => 6 + Math.sqrt(turns / maxTurns) * 10;
  const xTicks = [0, 3, 7, 11, 15, 18, 21];
  const yTicks = [0, 2, 4, 6, 8, 10];
  const labelOffsets = {
    "5A": [-11, 18, "end"], "5B": [0, -15, "middle"], "5C": [-12, -9, "end"],
    "5D": [0, 21, "middle"], "6B": [-10, -10, "end"], "6C": [-12, -11, "end"],
    "7": [-17, -8, "end"], "8": [-17, 15, "end"], "9A": [12, 22, "start"],
    "9B": [10, 18, "start"], "10": [12, -12, "start"], "12": [12, -9, "start"]
  };
  const visualOffsets = {
    "5B": [0, -8], "5D": [0, 8], "6B": [-7, -6], "9A": [7, 8]
  };
  const pointMarkup = plotted.map((row) => {
    const [dx, dy, anchor] = labelOffsets[row.agenda] || [10, -10, "start"];
    const [pointDx, pointDy] = visualOffsets[row.agenda] || [0, 0];
    const trueX = x(row.active_members);
    const trueY = y(row.turns_per_active);
    const pointX = trueX + pointDx;
    const pointY = trueY + pointDy;
    const tooltip = `${row.agenda} ${row.label}：${row.active_members}国参与，${row.member_turns}个回合；平均每个参与国${row.turns_per_active}回合，超过首轮介入的复取发言为${row.reentry_turns}回合。${row.evidence}。`;
    return `
      <g class="overall-point mode-${modeForAgenda(row.agenda).id}" tabindex="0" data-tooltip="${escapeHTML(tooltip)}" style="--point-color:${discussionModeColors[modeForAgenda(row.agenda).id]}">
        ${pointDx || pointDy ? `<line class="scatter-position-guide" x1="${trueX}" y1="${trueY}" x2="${pointX}" y2="${pointY}"></line><circle class="scatter-true-position" cx="${trueX}" cy="${trueY}" r="2.5"></circle>` : ""}
        <circle cx="${pointX}" cy="${pointY}" r="${radius(row.member_turns)}"></circle>
        <text x="${pointX + dx}" y="${pointY + dy}" text-anchor="${anchor}">${escapeHTML(row.agenda)}</text>
      </g>
    `;
  }).join("");
  $("#overall-scatter-shell").innerHTML = `
    <svg class="overall-scatter" viewBox="0 0 ${width} ${height}" role="img" aria-label="各议程参与范围与讨论强度散点图">
      <desc id="overall-scatter-svg-desc">横轴为参与委员国数量，纵轴为每个参与国平均发言回合，圆点大小为议程总回合数。议程7和8覆盖21国且反复往返最密集；议程10和6C形成第二层讨论节点。</desc>
      ${yTicks.map((tick) => `<line class="scatter-grid" x1="${plot.left}" x2="${plot.right}" y1="${y(tick)}" y2="${y(tick)}"></line><text class="scatter-tick y" x="${plot.left - 12}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>`).join("")}
      ${xTicks.map((tick) => `<line class="scatter-grid" x1="${x(tick)}" x2="${x(tick)}" y1="${plot.top}" y2="${plot.bottom}"></line><text class="scatter-tick" x="${x(tick)}" y="${plot.bottom + 23}" text-anchor="middle">${tick}</text>`).join("")}
      <line class="scatter-axis" x1="${plot.left}" x2="${plot.right}" y1="${plot.bottom}" y2="${plot.bottom}"></line>
      <line class="scatter-axis" x1="${plot.left}" x2="${plot.left}" y1="${plot.top}" y2="${plot.bottom}"></line>
      ${pointMarkup}
      <text class="scatter-axis-title" x="${(plot.left + plot.right) / 2}" y="${height - 17}" text-anchor="middle">参与委员国（国）</text>
      <text class="scatter-axis-title" transform="translate(18 ${(plot.top + plot.bottom) / 2}) rotate(-90)" text-anchor="middle">平均每个参与国发言回合</text>
      <g class="zero-floor-strip">
        <text x="${plot.left}" y="${height - 49}">无委员国介入：</text>
        ${zeroFloor.map((row, index) => `<text class="zero-agenda" x="${plot.left + 112 + index * 58}" y="${height - 49}">${escapeHTML(row.agenda)}</text>`).join("")}
      </g>
    </svg>
  `;

  const concentrationGroups = overallConcentrationGroups();
  const agendaKeywords = {
    "6C": "内罗毕后续", "5A": "中心活动报告", "5B": "咨询机构报告", "5D": "全球战略",
    "5C": "第六战略目标", "6B": "二类中心报告", "6A": "能力建设战略",
    "7A.27": "维也纳历史中心", "7B.47": "威斯敏斯特宫", "7B.62": "奥赫里德遗产",
    "7B.9": "汉皮古迹群", "7B.51": "奇洛埃教堂", "其他11项": "其余保护个案",
    "8B.7": "瓦迪沃拉亚", "8B.30": "里贝拉萨克拉", "8B.20": "曼格斯套岩刻寺",
    "8B.12": "奥林匹斯山扩展", "8B.33": "格丁尼亚城区", "其他6项": "其余列入个案",
    "10": "操作指南第五章", "9B": "区域行动计划", "12": "基金与预算", "9A": "定期报告", "11": "国际援助"
  };
  $("#overall-concentration").innerHTML = concentrationGroups.map((group, groupIndex) => `
    <article class="concentration-group" style="--group-color:${historicalAgendaColors[groupIndex]}">
      <header><h4>${escapeHTML(group.family)}</h4><span>${group.family_turns}回合</span></header>
      <div class="concentration-stack" role="img" aria-label="${escapeHTML(group.items.map((row) => `${row.agenda}占${row.share}%`).join("，"))}">
        ${group.items.filter((row) => row.share > 0).map((row, index) => `<i style="width:${row.share}%;opacity:${Math.max(.42, 1 - index * .11)}" data-tooltip="${escapeHTML(`${row.agenda} ${row.label}：${row.member_turns}回合，占该议程族${row.share}%。`)}" tabindex="0"><b>${row.share >= 9 ? row.agenda : ""}</b></i>`).join("")}
      </div>
      <div class="concentration-list">
        ${group.items.map((row, index) => `<span class="${index === 0 ? "leader" : ""}" data-tooltip="${escapeHTML(`${row.agenda} ${row.label}：${row.member_turns}回合，占该议程族${row.share}%。`)}" tabindex="0"><b>${escapeHTML(row.agenda)}</b><i class="concentration-keyword">${escapeHTML(agendaKeywords[row.agenda] || row.label)}</i><em>${row.share}%</em><small>${row.member_turns}回合</small></span>`).join("")}
      </div>
      <p>${escapeHTML([
        "6C是本组最大单项，其余回合仍分布在5A—5D。",
        "维也纳与伦敦两案是议程7的最高密度节点。",
        "瓦迪沃拉亚与里贝拉萨克拉是议程8的最高密度节点。",
        "议程10单独吸收本组近八成回合。"
      ][groupIndex])}</p>
    </article>
  `).join("");

  $("#overall-mode-grid").innerHTML = modeDefs.map((mode, index) => `
    <article class="overall-mode mode-${mode.id}" style="--mode-color:${discussionModeColors[mode.id]}">
      <header><span>0${index + 1}</span><h3>${escapeHTML(mode.label)}</h3></header>
      <div>${mode.agendas.map((agenda) => `<b>${escapeHTML(agenda)}</b>`).join("")}</div>
      <p>${escapeHTML(mode.definition)}</p>
    </article>
  `).join("");

  $("#overall-findings").innerHTML = overall.findings.map((finding, index) => `
    <article><span>0${index + 1}</span><strong>${escapeHTML(finding.value)}</strong><div><h3>${escapeHTML(finding.title)}</h3><p>${escapeHTML(finding.text)}</p></div></article>
  `).join("");
  $("#overall-analysis-note").textContent = "“平均每个参与国发言回合”＝该议程委员国发言回合÷至少发言一次的委员国数；它反映重复取得发言席的密度，不区分支持、反对、澄清或文本编辑。议程9—12仍为官方字幕重建下限。";
  bindTooltips($("#overall-analysis-section"));
}

function memberRoleCell(row, key, max) {
  const value = row.roles[key];
  const labels = { lead: "主提／联合提交", support: "共同提出／明确支持", calibrate: "技术校准", counter: "反对／保留" };
  const detail = value
    ? `${row.name_zh}（${row.code}）·${labels[key]}${value}案：${row.roleCases[key].join("；")}`
    : `${row.name_zh}（${row.code}）：未记录${labels[key]}案件。`;
  return `<td class="member-role-cell" tabindex="0" data-tooltip="${escapeHTML(detail)}"><b>${value}</b><i><u style="width:${value / Math.max(max, 1) * 100}%"></u></i></td>`;
}

function renderOverallParticipationScatter(members) {
  const host = $("#member-participation-scatter");
  const legend = $("#member-participation-legend");
  if (!host || !legend || !members.length) return;
  const width = 1120;
  const height = 520;
  const margin = { top: 38, right: 112, bottom: 66, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xMax = censusData.items.length;
  const yMax = Math.ceil(Math.max(...members.map((member) => member.totalTurns)) / 10) * 10;
  const textMax = Math.max(...members.map((member) => member.roles.lead + member.roles.support), 1);
  const x = (value) => margin.left + value / xMax * innerWidth;
  const y = (value) => margin.top + innerHeight - value / yMax * innerHeight;
  const radiusFor = (member) => 7 + Math.sqrt((member.roles.lead + member.roles.support) / textMax) * 7;
  const xTicks = Array.from({ length: xMax / 2 + 1 }, (_, index) => index * 2);
  const yTicks = Array.from({ length: yMax / 10 + 1 }, (_, index) => index * 10);

  const coordinateGroups = new Map();
  members.forEach((member) => {
    const key = `${member.coverage}:${member.totalTurns}`;
    if (!coordinateGroups.has(key)) coordinateGroups.set(key, []);
    coordinateGroups.get(key).push(member);
  });
  coordinateGroups.forEach((group) => group.sort((left, right) => left.code.localeCompare(right.code)));
  const collisionByCode = new Map();
  const coverageBuckets = new Map();
  members.forEach((member) => {
    if (!coverageBuckets.has(member.coverage)) coverageBuckets.set(member.coverage, []);
    coverageBuckets.get(member.coverage).push(member);
  });
  coverageBuckets.forEach((bucket) => {
    const sorted = [...bucket].sort((left, right) => right.totalTurns - left.totalTurns || left.code.localeCompare(right.code));
    const clusters = [];
    sorted.forEach((member) => {
      const current = clusters.at(-1);
      const previous = current?.at(-1);
      const overlapsPrevious = previous && Math.abs(y(previous.totalTurns) - y(member.totalTurns)) < radiusFor(previous) + radiusFor(member) + 8;
      if (!current || !overlapsPrevious) clusters.push([member]);
      else current.push(member);
    });
    clusters.forEach((cluster) => cluster.forEach((member) => collisionByCode.set(member.code, cluster)));
  });
  const fanOffsets = {
    2: [[-21, 0], [21, 0]],
    3: [[-34, 0], [0, 0], [34, 0]],
    4: [[-48, 0], [-16, 0], [16, 0], [48, 0]],
    5: [[-62, 0], [-31, 0], [0, 0], [31, 0], [62, 0]]
  };
  const displayPosition = (member, radius) => {
    const group = collisionByCode.get(member.code);
    const index = group.findIndex((row) => row.code === member.code);
    const offsets = fanOffsets[group.length] || group.map((_, position) => [(position - (group.length - 1) / 2) * 28, 0]);
    const [dx, dy] = group.length > 1 ? offsets[index] : [0, 0];
    const baseX = x(member.coverage);
    const baseY = y(member.totalTurns);
    return {
      baseX,
      baseY,
      pointX: Math.max(margin.left + radius + 4, Math.min(margin.left + innerWidth - radius - 4, baseX + dx)),
      pointY: Math.max(margin.top + radius + 4, Math.min(margin.top + innerHeight - radius - 4, baseY + dy)),
      displaced: group.length > 1,
      coincident: coordinateGroups.get(`${member.coverage}:${member.totalTurns}`).length > 1,
      collisionSize: group.length
    };
  };

  const grid = [
    ...xTicks.map((tick) => `<line class="scatter-grid" x1="${x(tick)}" x2="${x(tick)}" y1="${margin.top}" y2="${margin.top + innerHeight}"/>`),
    ...yTicks.map((tick) => `<line class="scatter-grid" x1="${margin.left}" x2="${margin.left + innerWidth}" y1="${y(tick)}" y2="${y(tick)}"/>`)
  ].join("");
  const ticks = [
    ...xTicks.map((tick) => `<text class="scatter-tick" x="${x(tick)}" y="${height - 39}" text-anchor="middle">${tick}</text>`),
    ...yTicks.map((tick) => `<text class="scatter-tick" x="${margin.left - 15}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>`)
  ].join("");
  const points = members.map((member) => {
    const formalTextActions = member.roles.lead + member.roles.support;
    const radius = radiusFor(member);
    const position = displayPosition(member, radius);
    const labelOnLeft = !position.displaced && member.coverage >= xMax - 1;
    const labelX = position.displaced ? position.pointX : position.pointX + (labelOnLeft ? -radius - 7 : radius + 7);
    const labelY = position.displaced ? position.pointY + radius + 15 : position.pointY + 3;
    const labelAnchor = position.displaced ? "middle" : labelOnLeft ? "end" : "start";
    const overlapNote = position.coincident
      ? "｜与另一国真实坐标完全相同，图中沿引导线展开"
      : position.displaced ? "｜与相邻国家图面位置接近，图中沿引导线展开" : "";
    const tooltip = `${member.name_zh}（${member.code}）｜覆盖 ${member.coverage}/${xMax}｜发言 ${member.totalTurns}回合｜主提 ${member.roles.lead}案｜共提／明确支持 ${member.roles.support}案｜最集中于${member.topAgenda}（${member.topTurns}回合）${overlapNote}`;
    return `<g class="scatter-group" data-tooltip="${escapeHTML(tooltip)}" tabindex="0">
      ${position.displaced ? `<line class="scatter-link" x1="${position.baseX}" y1="${position.baseY}" x2="${position.pointX}" y2="${position.pointY}"/>` : ""}
      <circle class="scatter-ring" cx="${position.pointX}" cy="${position.pointY}" r="${radius + 3}" stroke="${regionColors[member.region]}"/>
      <circle class="scatter-dot" cx="${position.pointX}" cy="${position.pointY}" r="${radius}" fill="${regionColors[member.region]}"/>
      <text class="scatter-label" x="${labelX}" y="${labelY}" text-anchor="${labelAnchor}">${member.code}</text>
    </g>`;
  }).join("");
  const sharedAnchors = [...coordinateGroups.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([key, group]) => {
      const [coverage, turns] = key.split(":").map(Number);
      return `<g class="scatter-shared-anchor"><circle cx="${x(coverage)}" cy="${y(turns)}" r="3"/><text x="${x(coverage)}" y="${y(turns) - 19}" text-anchor="middle">${group.length}国同坐标</text></g>`;
    }).join("");

  host.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="member-participation-title member-scatter-svg-desc">
    <desc id="member-scatter-svg-desc">横轴为14个主议程和子议程中的发言覆盖数，纵轴为可核对发言回合下限，气泡大小为主提与共提或明确支持案件数。</desc>
    ${grid}
    <line class="scatter-axis" x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${margin.top + innerHeight}"/>
    <line class="scatter-axis" x1="${margin.left}" x2="${margin.left + innerWidth}" y1="${margin.top + innerHeight}" y2="${margin.top + innerHeight}"/>
    ${ticks}
    <text class="scatter-axis-label" x="${margin.left + innerWidth / 2}" y="${height - 11}" text-anchor="middle">议程／子议程覆盖（最多14）</text>
    <text class="scatter-axis-label" x="18" y="${margin.top + innerHeight / 2}" text-anchor="middle" transform="rotate(-90 18 ${margin.top + innerHeight / 2})">可核对发言回合下限</text>
    ${sharedAnchors}
    ${points}
  </svg>`;
  legend.innerHTML = data.regions.map((region) => `<span><i style="background:${regionColors[region.id]}"></i>${escapeHTML(region.label)}</span>`).join("");
}

function renderOverallMemberAudit() {
  const members = deriveOverallMembers();
  if (!members.length) return;
  const totalTurns = members.reduce((sum, member) => sum + member.totalTurns, 0);
  const maxCoverage = Math.max(...members.map((member) => member.coverage));
  const widest = members.filter((member) => member.coverage === maxCoverage).map((member) => member.code);
  const roleTotals = ["lead", "support", "calibrate", "counter"].reduce((result, key) => {
    result[key] = members.reduce((sum, member) => sum + member.roles[key], 0);
    return result;
  }, {});
  $("#member-overall-kpis").innerHTML = [
    [totalTurns, "发言回合下限", "全部21国"],
    [maxCoverage, "最广议程覆盖", `${widest.join("·")}／14`],
    [roleTotals.lead, "主提／联合提交", `${members.filter((member) => member.roles.lead).length}国留下记录`],
    [roleTotals.calibrate + roleTotals.counter, "校准与反／保", "案件次数，非发言量"]
  ].map(([value, label, detail]) => `<article><strong>${value}</strong><span>${label}</span><small>${detail}</small></article>`).join("");

  renderOverallParticipationScatter(members);

  const roleMax = Object.fromEntries(["lead", "support", "calibrate", "counter"].map((key) => [key, Math.max(...members.map((member) => member.roles[key]), 1)]));
  const sorted = [...members].sort((a, b) => b.totalTurns - a.totalTurns || b.coverage - a.coverage || a.code.localeCompare(b.code));
  $("#member-boxscore-shell").innerHTML = `
    <table class="member-overall-table">
      <thead><tr><th>委员国</th><th>覆盖</th><th>发言</th><th>主提</th><th>共提／支持</th><th>校准</th><th>反／保</th><th>最高集中议程</th></tr></thead>
      <tbody>${sorted.map((member) => `
        <tr>
          <th><span class="flag" aria-hidden="true">${countryFlags[member.code] || "🏳️"}</span><b>${member.code}</b><small>${member.name_zh}</small></th>
          <td><b>${member.coverage}</b><small>／14</small></td>
          <td class="member-turn-cell"><b>${member.totalTurns}</b><i><u style="width:${member.totalTurns / Math.max(...members.map((row) => row.totalTurns)) * 100}%"></u></i></td>
          ${memberRoleCell(member, "lead", roleMax.lead)}
          ${memberRoleCell(member, "support", roleMax.support)}
          ${memberRoleCell(member, "calibrate", roleMax.calibrate)}
          ${memberRoleCell(member, "counter", roleMax.counter)}
          <td><b>${member.topAgenda}</b><small>${member.topTurns}回合 · ${member.topShare}%</small></td>
        </tr>
      `).join("")}</tbody>
    </table>`;
  bindTooltips($("#member-overall-section"));
}

function renderMemberConcentration() {
  const members = deriveOverallMembers();
  if (!members.length) return;
  const items = censusData.items;
  const levels = [
    ["0", "0"], ["1—2", "1"], ["3—5", "3"], ["6—10", "6"], ["11—15", "11"], ["16+", "16"]
  ];
  const levelFor = (value) => value === 0 ? 0 : value <= 2 ? 1 : value <= 5 ? 2 : value <= 10 ? 3 : value <= 15 ? 4 : 5;
  $("#member-concentration-legend").innerHTML = levels.map(([label, value], index) => `<span><i class="heat-${index}">${value}</i>${label}回合</span>`).join("");
  const sorted = [...members].sort((a, b) => a.topShare - b.topShare || b.coverage - a.coverage || b.totalTurns - a.totalTurns);
  $("#member-concentration-shell").innerHTML = `
    <table class="member-concentration-table">
      <thead><tr><th>委员国</th>${items.map((item) => `<th tabindex="0" data-tooltip="${escapeHTML(`${item.agenda} ${item.label}`)}">${item.agenda}</th>`).join("")}<th>最集中</th></tr></thead>
      <tbody>${sorted.map((member) => `
        <tr><th><span aria-hidden="true">${countryFlags[member.code] || "🏳️"}</span><b>${member.code}</b></th>
          ${items.map((item) => {
            const value = member.turns[item.agenda] || 0;
            return `<td class="heat-${levelFor(value)}" tabindex="0" data-tooltip="${escapeHTML(`${member.name_zh}（${member.code}）·${item.agenda} ${item.label}：${value}个发言回合。`)}">${value || "—"}</td>`;
          }).join("")}
          <td><b>${member.topAgenda}</b><small>${member.topShare}%</small></td>
        </tr>`).join("")}</tbody>
    </table>`;
  bindTooltips($("#member-concentration-section"));
}

function renderOverallCotext() {
  const packages = strictCotextPackages();
  if (!packages.length) return;
  const jointPackages = packages.filter((item) => item.actors.length > 1);
  const supportEvents = sameCaseSupportEvents();
  const formalCountries = new Set(packages.flatMap((item) => item.actors)).size;
  $("#cotext-kpis").innerHTML = [
    [packages.length, "正式提案／修正文本单元", "议程5—12全部登记"],
    [jointPackages.length, "多国共同文本单元", "同一正式文本共同提出"],
    [`${formalCountries}／21`, "委员国留下正式文本角色", "主提或共同提出"],
    [supportEvents.length, "同案支持事件", "议程5—8已结构化"]
  ].map(([value, label, detail]) => `<article><strong>${value}</strong><span>${label}</span><small>${detail}</small></article>`).join("");
  const swissFormal = packages.filter((item) => item.actors.includes("CHE"));
  const swissJoint = swissFormal.filter((item) => item.actors.length > 1);
  const swissSupport = supportEvents.filter((item) => item.actors.includes("CHE"));
  const swissRoles = deriveOverallMembers().find((member) => member.code === "CHE")?.roles;
  if ($("#cotext-observation") && swissFormal.length && !swissJoint.length && !swissSupport.length) {
    $("#cotext-observation").innerHTML = `
      <p><b>补充观察：</b>瑞士在议程5—12留下${swissFormal.length}个单独修正文本，并记录${swissRoles?.calibrate || 0}次技术／保护校准；在已结构化数据中未出现共同提出或同案支持。议程9—12的现场支持方身份尚不完整。</p>`;
  }
  const regionOrder = ["africa", "arab", "asia_pacific", "europe_north_america", "latin_caribbean"];
  const regionLabels = {
    africa: "非洲", arab: "阿拉伯国家", asia_pacific: "亚洲和太平洋",
    europe_north_america: "欧洲和北美", latin_caribbean: "拉丁美洲和加勒比"
  };
  const orderedCountries = [...data.countries].sort((left, right) => {
    const regionDelta = regionOrder.indexOf(left.region) - regionOrder.indexOf(right.region);
    return regionDelta || left.code.localeCompare(right.code);
  });
  const regionStart = (index) => index > 0 && orderedCountries[index - 1].region !== orderedCountries[index].region;
  const coverageByStage = new Map((topic01Data?.evidence_coverage || []).map((item) => [item.family, item]));

  const renderView = (view) => {
    const isFormal = view === "formal";
    const events = isFormal ? packages : supportEvents;
    const pairs = cotextPairRows(events);
    const pairMap = new Map(pairs.map((pair) => [`${pair.left}·${pair.right}`, pair]));
    const maxPair = Math.max(...pairs.map((pair) => pair.count), 1);
    const pairFor = (left, right) => pairMap.get([left, right].sort().join("·"));
    const viewTitle = isFormal ? "正式共同提出" : "现场明确同案支持";
    const unitLabel = isFormal ? "正式文本单元" : "同案支持事件";
    $("#cotext-matrix-panel").innerHTML = `
      <header><div><span>REGION-ORDERED MATRIX</span><h3>${viewTitle}：委员国关系矩阵</h3></div><div class="cotext-view-switch" role="group" aria-label="切换共同文本证据层"><button type="button" data-cotext-view="formal" aria-pressed="${isFormal}">正式共同提出</button><button type="button" data-cotext-view="support" aria-pressed="${!isFormal}">明确同案支持</button></div></header>
      <div class="cotext-region-legend">${regionOrder.map((region) => `<span style="--region-color:${regionColors[region]}"><i></i>${regionLabels[region]}</span>`).join("")}</div>
      <div class="matrix-scroll cotext-matrix-scroll"><table class="cotext-matrix">
        <thead><tr><th>委员国</th>${orderedCountries.map((country, index) => `<th class="${regionStart(index) ? "region-start" : ""}" style="--region-color:${regionColors[country.region]}" tabindex="0" data-tooltip="${escapeHTML(`${country.name_zh}（${country.code}） · ${regionLabels[country.region]}`)}"><span>${country.code}</span></th>`).join("")}</tr></thead>
        <tbody>${orderedCountries.map((rowCountry, rowIndex) => `<tr class="${regionStart(rowIndex) ? "region-start" : ""}">
          <th style="--region-color:${regionColors[rowCountry.region]}" tabindex="0" data-tooltip="${escapeHTML(`${rowCountry.name_zh}（${rowCountry.code}） · ${regionLabels[rowCountry.region]}`)}"><i>${countryFlags[rowCountry.code] || ""}</i><b>${rowCountry.code}</b></th>
          ${orderedCountries.map((columnCountry, columnIndex) => {
            if (rowCountry.code === columnCountry.code) return `<td class="diagonal ${regionStart(columnIndex) ? "region-start" : ""}">—</td>`;
            const pair = pairFor(rowCountry.code, columnCountry.code);
            const count = pair?.count || 0;
            const heatLevel = count ? Math.max(1, Math.ceil(count / maxPair * 7)) : 0;
            const detail = count
              ? `${rowCountry.name_zh}（${rowCountry.code}）与${columnCountry.name_zh}（${columnCountry.code}）共同出现于${count}个${unitLabel}：${pair.packages.join("；")}`
              : `${rowCountry.name_zh}（${rowCountry.code}）与${columnCountry.name_zh}（${columnCountry.code}）：${isFormal ? "议程5—12正式登记中未共同提出同一文本" : "议程5—8已结构化记录中未见同案支持关系"}。`;
            return `<td class="heat heat-${heatLevel} ${regionStart(columnIndex) ? "region-start" : ""}" tabindex="0" data-tooltip="${escapeHTML(detail)}">${count || ""}</td>`;
          }).join("")}
        </tr>`).join("")}</tbody>
      </table></div>
      <p>${isFormal ? "正式共同提出覆盖议程5—12全部已登记文本；REV修订版并入同一文本沿革单元。" : "同案支持根据现场明确支持表态编码；议程9—12支持方身份未完整结构化，本视图不将空白解释为0。"}</p>`;
    $("#cotext-pairs").innerHTML = `
      <header><span>${isFormal ? "REPEATED FORMAL PAIRS" : "REPEATED SUPPORT PAIRS"}</span><h3>重复出现的${isFormal ? "正式共同提出" : "同案支持"}组合</h3></header>
      <div>${pairs.slice(0, 12).map((pair) => `<article tabindex="0" data-tooltip="${escapeHTML(`${pair.left}与${pair.right}共同出现于${pair.count}个${unitLabel}：${pair.packages.join("；")}`)}"><b><span aria-hidden="true">${countryFlags[pair.left] || ""}</span>${pair.left}<i>×</i><span aria-hidden="true">${countryFlags[pair.right] || ""}</span>${pair.right}</b><span><u style="width:${pair.count / maxPair * 100}%"></u></span><strong>${pair.count}</strong></article>`).join("")}</div>`;
    const stages = ["5—6", "7", "8", "9—12"];
    $("#cotext-stage-summary").innerHTML = `
      <header><span>EVIDENCE COVERAGE</span><h3>议程范围与证据完整度</h3></header>
      ${stages.map((stage) => {
        const stageEvents = events.filter((item) => item.stage === stage);
        const coverage = coverageByStage.get(stage) || {};
        const status = isFormal ? coverage.formal_status : coverage.support_status;
        const mainValue = isFormal ? stageEvents.filter((item) => item.actors.length > 1).length : stageEvents.length;
        const denominator = isFormal ? stageEvents.length : null;
        const incomplete = status === "身份不完整";
        const valueMarkup = incomplete && !isFormal
          ? `—<small>支持方身份未完整，不以0计</small>`
          : `${mainValue}${denominator != null ? `<small>／${denominator}个文本单元为多国共同提出</small>` : `<small>个同案支持事件</small>`}`;
        return `<article class="${incomplete ? "incomplete-layer" : ""}"><b>议程${stage} · ${escapeHTML(status || "待核")}</b><strong>${valueMarkup}</strong><span>${escapeHTML(coverage.note || "")}</span></article>`;
      }).join("")}`;
    $$("[data-cotext-view]", $("#cotext-matrix-panel")).forEach((button) => button.addEventListener("click", () => renderView(button.dataset.cotextView)));
    bindTooltips($("#cotext-overall-section"));
  };
  renderView("formal");
}

function renderBoundaryTimeAudit() {
  const audit = censusData?.boundary_time_audit;
  if (!audit || !$("#boundary-time-overview")) return;
  const hours = (audit.total_minutes / 60).toFixed(1);
  $("#boundary-time-metrics").innerHTML = [
    [audit.agenda_units, "议程／子议程已完成边界计时"],
    [audit.total_minutes.toLocaleString("zh-CN"), "分钟全议程时间", `约${hours}小时`],
    [`±${audit.uncertainty_minutes}`, "分钟全程边界不确定性", "跨日切换与会务过渡"],
    [`${audit.deep_coded_share}%`, "时间进入逐段用途编码", `${audit.deep_coded_minutes}分钟`]
  ].map(([value, label, detail = ""]) => `<article><strong>${value}</strong><span>${label}</span>${detail ? `<small>${detail}</small>` : ""}</article>`).join("");
  const maxMinutes = Math.max(...audit.families.map((family) => family.minutes));
  $("#boundary-time-overview").innerHTML = `
    <header><div><span>FULL BOUNDARY CENSUS</span><h3>四类议程占用的全会时间</h3></div><small>合计约${hours}小时</small></header>
    <div class="boundary-family-bars">${audit.families.map((family, index) => `
      <article style="--time-family-color:${historicalAgendaColors[index]}">
        <div><span>0${index + 1}</span><h4>${escapeHTML(family.family)}</h4></div>
        <i><u style="width:${family.minutes / maxMinutes * 100}%"></u></i>
        <p><strong>${family.minutes.toLocaleString("zh-CN")}</strong><small>分钟</small><b>${family.share}%</b></p>
      </article>`).join("")}</div>
    <p>${escapeHTML(audit.method)}</p>`;
  const itemMax = Math.max(...censusData.items.map((item) => item.minutes || 0));
  $("#boundary-time-list").innerHTML = censusData.items.map((item) => `
    <article tabindex="0" data-tooltip="${escapeHTML(`${item.agenda} ${item.label}：约${item.minutes}分钟全会边界时间。${item.note || ""}`)}">
      <div><b>${escapeHTML(item.agenda)}</b><span>${escapeHTML(item.label)}</span></div>
      <i><u style="width:${(item.minutes || 0) / itemMax * 100}%"></u></i>
      <strong>${item.minutes}<small>分钟</small></strong>
    </article>`).join("");
}

function renderDeliberationTimeAudit() {
  const sourceAudit = data.deliberation_time_audit;
  if (!sourceAudit) return;
  if (pageMode === "overall") renderBoundaryTimeAudit();
  const cases = pageMode === "overall"
    ? sourceAudit.cases.filter((caseItem) => Number.parseInt(caseItem.agenda, 10) <= 12)
    : sourceAudit.cases;
  const categories = sourceAudit.categories.map((category) => ({
    ...category,
    minutes: cases.reduce((sum, caseItem) => sum + caseItem.segments[category.id], 0)
  }));
  const sampleMinutes = cases.reduce((sum, caseItem) => sum + caseItem.minutes, 0);
  const burdenMinutes = categories
    .filter((category) => ["correction", "low_yield"].includes(category.id))
    .reduce((sum, category) => sum + category.minutes, 0);
  const audit = {
    ...sourceAudit,
    cases,
    categories,
    sample_count: cases.length,
    sample_minutes: sampleMinutes,
    burden_minutes: burdenMinutes,
    burden_range: pageMode === "overall" ? `${Math.round(burdenMinutes / sampleMinutes * 100)}%` : sourceAudit.burden_range
  };
  const productiveMinutes = audit.categories
    .filter((category) => ["evidence", "substantive", "procedure"].includes(category.id))
    .reduce((sum, category) => sum + category.minutes, 0);
  const productiveShare = Math.round((productiveMinutes / audit.sample_minutes) * 100);

  $("#time-audit-metrics").innerHTML = [
    [audit.sample_count, "深描案例"],
    [audit.sample_minutes, "分钟进入逐段编码"],
    [`${productiveShare}%`, "样本内证据／实质／必要程序"],
    [audit.burden_range, pageMode === "overall" ? "样本内纠偏＋低产出" : "纠偏＋低产出估计区间"]
  ].map(([value, label]) => `
    <article><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></article>
  `).join("");

  $("#time-overall").innerHTML = `
    <div class="time-overall-head">
      <div><strong>${audit.sample_minutes}分钟怎样被使用</strong><span>中心估计 · 类别合计100%</span></div>
      <b>${audit.burden_minutes}分钟用于澄清纠偏或低产出循环</b>
    </div>
    <div class="time-stack" role="img" aria-label="${audit.categories.map((category) => `${category.label}${category.minutes}分钟`).join("，")}">
      ${audit.categories.map((category) => {
        const share = category.minutes / audit.sample_minutes * 100;
        const tooltip = `${category.level} ${category.label}：${category.minutes}分钟，约${share.toFixed(1)}%。${category.definition}`;
        return `<span class="time-segment segment-${category.id}" style="width:${share}%;--segment-color:${category.color}" data-tooltip="${escapeHTML(tooltip)}" tabindex="0"><b>${category.minutes}</b><small>${escapeHTML(category.short)}</small></span>`;
      }).join("")}
    </div>
  `;

  $("#time-category-legend").innerHTML = audit.categories.map((category) => `
    <article class="time-category-card category-${category.id}">
      <span style="--category-color:${category.color}">${escapeHTML(category.level)}</span>
      <div><h3>${escapeHTML(category.label)}</h3><p>${escapeHTML(category.definition)}</p></div>
      ${pageMode === "overall" ? "" : `<strong>${category.minutes}<small>分钟</small></strong>`}
    </article>
  `).join("");

  $("#time-case-list").innerHTML = audit.cases.map((caseItem) => {
    const burden = caseItem.segments.correction + caseItem.segments.low_yield;
    const burdenShare = Math.round(burden / caseItem.minutes * 100);
    const anchors = caseItem.anchors.join(" · ");
    return `
      <article class="time-case-row" data-tooltip="${escapeHTML(`${caseItem.agenda} ${caseItem.name}：${caseItem.note} 主要发言锚点：${anchors}。`)}" tabindex="0">
        <div class="time-case-name">
          <span>${escapeHTML(caseItem.phase)}</span>
          <strong>${escapeHTML(caseItem.agenda)} · ${escapeHTML(caseItem.name)}</strong>
          <small>${caseItem.minutes}分钟 · 边界误差约±${caseItem.uncertainty}分钟</small>
        </div>
        <div class="time-case-bar" role="img" aria-label="${escapeHTML(`${caseItem.agenda}：${audit.categories.map((category) => `${category.short}${caseItem.segments[category.id]}分钟`).join("，")}`)}">
          ${audit.categories.map((category) => {
            const minutes = caseItem.segments[category.id];
            return `<span class="segment-${category.id}" style="width:${minutes / caseItem.minutes * 100}%;--segment-color:${category.color}"><i>${minutes}</i></span>`;
          }).join("")}
        </div>
        <div class="time-case-burden"><strong>${burdenShare}%</strong><span>纠偏＋低产出</span></div>
      </article>
    `;
  }).join("");

  $("#time-audit-note").textContent = pageMode === "overall"
    ? `时间以会议视频中的连续审议段计；每段按主要用途归入一类。2,972分钟为约略边界时长，整体不确定范围约±75分钟。`
    : `${audit.clock_rule} ${audit.coding_note}`;
  bindTooltips($("#time-audit-section"));
}

function renderTimeSampleComparison() {
  const host = $("#time-sample-comparison");
  if (!host || !timeSampleData) return;
  const methods = [timeSampleData.balanced, timeSampleData.long_topic];
  const burdenRange = `${timeSampleData.balanced.burden_ci95[0]}%—${timeSampleData.balanced.burden_ci95[1]}%`;
  host.innerHTML = `
    <header class="comparison-heading">
      <div><span>TWO SAMPLES / TWO QUESTIONS</span><h3>总体情况与焦点议题的突出印象分开看</h3></div>
      <p>两组使用同一套五类编码和同一条100%尺度：分层均衡样本描述全会总体时间结构，长议题样本解释焦点议题为何更容易留下强烈印象。</p>
    </header>
    <div class="sample-method-list" role="img" aria-label="分层均衡时间样本与60分钟以上长议题样本的五类时间用途比较">
      ${methods.map((method, methodIndex) => `
        <article class="sample-method-card method-${methodIndex}">
          <div class="method-copy"><span>0${methodIndex + 1}</span><div><h4>${escapeHTML(method.label)}</h4><p>${escapeHTML(method.selection_rule)}</p></div><strong>${method.sample_minutes.toLocaleString("zh-CN")}<small>分钟 · 覆盖全程${method.coverage_share}%</small></strong></div>
          <div class="comparison-stack">
            ${method.categories.map((category) => `<span style="width:${category.share}%;--segment-color:${category.color}" tabindex="0" data-tooltip="${escapeHTML(`${method.label} · ${category.label}：${category.minutes}分钟，占${category.share}%`)}"><b>${category.share}%</b><small>${escapeHTML(category.short)}</small></span>`).join("")}
          </div>
          <p class="sample-scope-note"><b>${method === timeSampleData.balanced ? "呈现总体情况" : "呈现焦点案例的突出印象"}</b>${method === timeSampleData.balanced ? `分层抽取120个5分钟窗，纠偏＋低产出中心估计为${method.burden_share}%，近似95%区间${burdenRange}。` : `纳入${method.case_count}个60分钟以上议题，纠偏＋低产出为${method.burden_share}%；它描述高负荷议题，不外推为全会平均值。`}</p>
        </article>`).join("")}
    </div>
    <details class="compact-details comparison-details long-sample-details"><summary><span>展开${timeSampleData.long_topic.case_count}个60分钟以上长议题</span><small>${timeSampleData.long_topic.threshold_minutes}分钟阈值 · ${timeSampleData.long_topic.coverage_share}%全程</small></summary><div class="long-case-list">${timeSampleData.long_topic.cases.map((caseItem) => `<article tabindex="0" data-tooltip="${escapeHTML(`${caseItem.agenda} ${caseItem.name}：${timeSampleData.categories.map((category) => `${category.short}${caseItem.segments[category.id]}分钟`).join("，")}。`)}"><b>${escapeHTML(caseItem.agenda)}</b><span>${escapeHTML(caseItem.name)}</span><strong>${caseItem.minutes}<small>分钟</small></strong></article>`).join("")}</div><p class="details-method-note">${escapeHTML(timeSampleData.long_topic.threshold_note)}</p></details>
    <p class="sample-scope-note comparison-conclusion"><b>样本选择影响估计</b><span>纠偏＋低产出在总体样本中为${timeSampleData.balanced.burden_share}%，在60分钟以上长议题中为${timeSampleData.long_topic.burden_share}%，在六个实质改写案例中为${timeSampleData.legacy.burden_share}%。因此，总体比例与焦点案例的突出印象需要分开解释。</span></p>`;
  bindTooltips(host);
}

function renderDeliberationRoles() {
  const audit = data.deliberation_time_audit;
  if (!audit) return;
  const sharedMax = Math.max(...audit.role_threads.flatMap((role) => role.actors.map((actor) => actor.count)), 1);
  $("#thread-role-grid").innerHTML = audit.role_threads.map((role) => {
    return `
      <article class="thread-role-card role-${role.id}">
        <header><span>${escapeHTML(role.id.toUpperCase())}</span><h3>${escapeHTML(role.label)}</h3><p>${escapeHTML(role.note)}</p></header>
        <div class="thread-actor-list">
          ${role.actors.map((actor) => `
            <div class="thread-actor" data-tooltip="${escapeHTML(actor.detail)}" tabindex="0">
              <b>${escapeHTML(actor.code)}</b>
              <span><strong>${escapeHTML(actor.label)}</strong><i><em style="width:${actor.count / sharedMax * 100}%"></em></i></span>
              <small>${actor.count}段</small>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");

  $("#pressure-signal-grid").innerHTML = audit.pressure_signals.map((signal) => `
    <article data-tooltip="${escapeHTML(`${signal.note} 案例：${signal.cases.join("、")}。`)}" tabindex="0">
      <strong>${signal.count}</strong>
      <div><h4>${escapeHTML(signal.type)}</h4><p>${signal.cases.map(escapeHTML).join(" · ")}</p></div>
    </article>
  `).join("");
  bindTooltips($("#time-role-section"));
}

function renderHistoricalBaseline() {
  if (!historicalData?.sessions?.length) return;
  const sessions = historicalData.sessions;
  const [newDelhi, paris, busan] = sessions;

  $("#historical-session-grid").innerHTML = sessions.map((session) => `
    <article class="historical-session-card">
      <header>
        <div><span>${escapeHTML(session.session)}</span><h3>${escapeHTML(session.location)} · ${session.year}</h3></div>
        <a href="${escapeHTML(session.source_url)}" target="_blank" rel="noreferrer">${session.pages ? `${session.pages}页逐字记录` : escapeHTML(session.source_label || "官方记录")} ↗</a>
      </header>
      <div>
        <p><strong>${session.member_turns.toLocaleString("zh-CN")}</strong><span>委员国发言回合${session.session === "48COM" ? "下限" : ""}</span></p>
        ${session.dialogue_words != null
          ? `<p><strong>${session.dialogue_words.toLocaleString("zh-CN")}</strong><span>委员国与机构对话词数</span></p><p><strong>${session.institutional_response_ratio.toFixed(1)}</strong><span>每1委员国回合对应机构回应</span></p>`
          : `<p><strong>${censusData.video_sessions}</strong><span>场官方视频交叉核对</span></p><p><strong>3层</strong><span>纪要／直播下限／字幕重建</span></p>`}
      </div>
    </article>
  `).join("");

  const families = newDelhi.agenda_families;
  $("#historical-agenda-legend").innerHTML = families.map((family, index) => `
    <span><i style="--agenda-color:${historicalAgendaColors[index]}"></i>${escapeHTML(family.family)}</span>
  `).join("");

  $("#historical-agenda-bars").innerHTML = sessions.map((session) => `
    <article class="historical-agenda-row">
      <header><strong>${escapeHTML(session.session)}</strong><span>${escapeHTML(session.location)}</span></header>
      <div class="historical-stack" role="img" aria-label="${escapeHTML(`${session.session}：${session.agenda_families.map((family) => `${family.family}${family.member_turn_share}%`).join("，")}`)}">
        ${session.agenda_families.map((family, index) => `
          <span style="width:${family.member_turn_share}%;--agenda-color:${historicalAgendaColors[index]}" tabindex="0" data-tooltip="${escapeHTML(`${session.session} · ${family.family}：${family.member_turns}个委员国发言回合，占本届议程5—12的${family.member_turn_share}%。${family.words != null ? `委员国及相邻机构对话共${family.words.toLocaleString("zh-CN")}词。` : "本届为当前可复核发言席下限。"}`)}"><b>${family.member_turn_share}%</b><small>${family.member_turns}回合</small></span>
        `).join("")}
      </div>
    </article>
  `).join("");

  $("#historical-finding").innerHTML = `
    <span>CROSS-SESSION FINDINGS</span>
    <div class="historical-finding-list">
      <article>
        <strong>7 → 8 → 7+8</strong>
        <h3>个案议程由单一重心转为双核心</h3>
        <p>46COM议程7占<strong>${newDelhi.agenda_families[1].member_turn_share}%</strong>；47COM议程8占<strong>${paris.agenda_families[2].member_turn_share}%</strong>；48COM议程7与8分别占<strong>${busan.agenda_families[1].member_turn_share}%</strong>和<strong>${busan.agenda_families[2].member_turn_share}%</strong>。</p>
      </article>
      <article>
        <strong>${newDelhi.agenda_families[0].member_turn_share}%—${busan.agenda_families[0].member_turn_share}%</strong>
        <h3>战略与能力建设连续两届上升</h3>
        <p>议程5—6的委员国发言回合份额从46COM的<strong>${newDelhi.agenda_families[0].member_turn_share}%</strong>升至47COM的<strong>${paris.agenda_families[0].member_turn_share}%</strong>，本届进一步达到<strong>${busan.agenda_families[0].member_turn_share}%</strong>。</p>
      </article>
    </div>
  `;

  const busanRoles = deriveOverallMembers().map((member) => ({
    code: member.code,
    name_zh: member.name_zh,
    turns: member.totalTurns,
    words: null
  }));
  const topLimit = pageMode === "overall" ? 7 : 6;
  const topRows = sessions.map((session) => ({
    session,
    rows: [...(session.session === "48COM" ? busanRoles : session.country_roles || [])]
      .sort((a, b) => b.turns - a.turns || a.code.localeCompare(b.code)).slice(0, topLimit)
      .map((row) => ({ ...row, ...committeeMandate(session.session, row.code) }))
  }));
  const roleMax = Math.max(...topRows.flatMap((group) => group.rows.map((row) => row.turns)), 1);
  $("#historical-role-compare").innerHTML = topRows.map(({ session, rows }) => `
    <section class="historical-role-column">
      <header><div><span>PARTICIPATION VOLUME</span><h3>${escapeHTML(session.session)} 发言回合${pageMode === "overall" ? "前1／3（7国）" : "前六位"}</h3></div>${pageMode === "overall" ? `<small><a href="${escapeHTML(topic01Data?.committee_mandates?.[session.session]?.source_url || "#")}" target="_blank" rel="noreferrer">委员国与任期 ↗</a></small>` : `<small>议程5—12</small>`}</header>
      <div>
        ${rows.map((row, index) => `
          <article class="historical-role-row" tabindex="0" aria-label="${escapeHTML(`${row.name_zh} ${row.code}，委员任期${row.term}，${row.turns}回合`)}" data-tooltip="${escapeHTML(`${row.name_zh}（${row.code}）：本届委员任期${row.term}；议程5—12共${row.turns}个可识别委员国发言回合${row.words != null ? `，${row.words.toLocaleString("zh-CN")}词` : ""}。`)}">
            <em>${index + 1}</em><b><span aria-hidden="true">${countryFlags[row.code] || "🏳️"}</span><i>${escapeHTML(row.code)}</i><small>${escapeHTML(row.term)}</small></b><span><i><u style="width:${row.turns / roleMax * 100}%"></u></i></span><small>${row.turns}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");

  $("#historical-method-note").textContent = `46—47COM使用官方逐字记录，48COM使用当前可复核的连续发言席下限。三届均限定议程5—12，以一名代表一次连续发言计1回合。`;
  bindTooltips($("#historical-section"));
}

function renderSources() {
  $("#source-links").innerHTML = data.sources.map((source) => `
    <a href="${escapeHTML(source.url)}" target="_blank" rel="noreferrer">${escapeHTML(source.label)} ↗</a>
  `).join("");
}

function populateFilters() {
  const regionSelect = $("#region-filter");
  const countrySelect = $("#country-filter");
  regionSelect.insertAdjacentHTML("beforeend", data.regions.map((region) => `<option value="${region.id}">${escapeHTML(region.label)}</option>`).join(""));
  countrySelect.insertAdjacentHTML("beforeend", data.countries.map((country) => `<option value="${country.code}">${escapeHTML(country.name_zh)} · ${country.code}</option>`).join(""));
  const parameters = new URLSearchParams(location.search);
  const requestedRegion = parameters.get("region");
  const requestedCountry = parameters.get("country");
  if (requestedRegion && data.regions.some((region) => region.id === requestedRegion)) state.region = requestedRegion;
  if (requestedCountry && data.countries.some((country) => country.code === requestedCountry)) state.country = requestedCountry;
  regionSelect.value = state.region;
  countrySelect.value = state.country;
}

function updateFilterSummary() {
  const visible = data.countries.filter(isVisibleCountry);
  const regionLabel = state.region === "all" ? "" : data.regions.find((region) => region.id === state.region)?.label;
  const countryLabel = state.country === "all" ? "" : countryName(state.country);
  $("#filter-summary").textContent = countryLabel
    ? `聚焦 ${countryLabel}`
    : regionLabel
      ? `${regionLabel} · ${visible.length}国`
      : `显示全部${visible.length}国`;
}

function updateURL() {
  const url = new URL(location.href);
  if (state.region === "all") url.searchParams.delete("region");
  else url.searchParams.set("region", state.region);
  if (state.country === "all") url.searchParams.delete("country");
  else url.searchParams.set("country", state.country);
  history.replaceState(null, "", url);
}

function renderFiltered() {
  updateFilterSummary();
  renderRoleBars();
  renderScatter();
  renderBoxscore();
  renderFootprint();
  renderAttention();
  updateURL();
}

function bindFilters() {
  $("#region-filter").addEventListener("change", (event) => {
    state.region = event.target.value;
    if (state.country !== "all") {
      const selected = data.countries.find((country) => country.code === state.country);
      if (state.region !== "all" && selected?.region !== state.region) {
        state.country = "all";
        $("#country-filter").value = "all";
      }
    }
    renderFiltered();
  });
  $("#country-filter").addEventListener("change", (event) => {
    state.country = event.target.value;
    if (state.country !== "all") {
      const selected = data.countries.find((country) => country.code === state.country);
      state.region = selected.region;
      $("#region-filter").value = selected.region;
    }
    renderFiltered();
  });
  $("#reset-filters").addEventListener("click", () => {
    state.region = "all";
    state.country = "all";
    $("#region-filter").value = "all";
    $("#country-filter").value = "all";
    renderFiltered();
  });
  $("#print-page").addEventListener("click", () => window.print());
  $$(".boxscore-table th[data-sort]").forEach((header) => {
    header.addEventListener("click", () => {
      const key = header.dataset.sort;
      if (state.sortKey === key) state.sortDirection = state.sortDirection === "desc" ? "asc" : "desc";
      else {
        state.sortKey = key;
        state.sortDirection = key === "name_zh" ? "asc" : "desc";
      }
      renderBoxscore();
    });
  });
}

function positionTooltip(event, text) {
  const tooltip = $("#tooltip");
  tooltip.textContent = text;
  tooltip.hidden = false;
  const padding = 14;
  const rect = tooltip.getBoundingClientRect();
  let left = event.clientX + 14;
  let top = event.clientY + 14;
  if (left + rect.width + padding > window.innerWidth) left = event.clientX - rect.width - 14;
  if (top + rect.height + padding > window.innerHeight) top = event.clientY - rect.height - 14;
  tooltip.style.left = `${Math.max(padding, left)}px`;
  tooltip.style.top = `${Math.max(padding, top)}px`;
}

function bindTooltips(root) {
  $$("[data-tooltip]", root).forEach((element) => {
    element.addEventListener("pointerenter", (event) => positionTooltip(event, element.dataset.tooltip));
    element.addEventListener("pointermove", (event) => positionTooltip(event, element.dataset.tooltip));
    element.addEventListener("pointerleave", () => { $("#tooltip").hidden = true; });
    element.addEventListener("focus", () => {
      const rect = element.getBoundingClientRect();
      positionTooltip({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, element.dataset.tooltip);
    });
    element.addEventListener("blur", () => { $("#tooltip").hidden = true; });
    element.addEventListener("click", (event) => {
      if (matchMedia("(hover: none)").matches) {
        positionTooltip(event, element.dataset.tooltip);
        setTimeout(() => { $("#tooltip").hidden = true; }, 3500);
      }
    });
  });
}

function downloadCanvas(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png", 1);
  link.click();
}

async function generateShareImage(section, button) {
  button.disabled = true;
  button.textContent = "生成中…";
  const frame = document.createElement("div");
  frame.style.cssText = "position:fixed;left:-20000px;top:0;width:1440px;padding:38px;background:#f4f6f8;color:#172338;z-index:-1;";
  const masthead = document.createElement("div");
  masthead.style.cssText = "display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding:15px 20px;border-top:8px solid #18365f;background:white;font-weight:800;color:#18365f;";
  masthead.innerHTML = "<span>委员国技术统计分析 · 48COM COMMITTEE OBSERVATORY</span><span>NHC | THU × CONSERVISION</span>";
  const clone = section.cloneNode(true);
  clone.classList.add("is-exporting");
  clone.style.cssText = "width:1364px;max-width:none;margin:0;overflow:visible;";
  clone.querySelectorAll("details").forEach((element) => { element.open = true; });
  clone.querySelectorAll(".matrix-scroll,.table-scroll,.scatter-shell,.role-bars,.census-table-shell,.member-boxscore-shell,.member-concentration-shell,.time-case-list").forEach((element) => {
    element.style.overflow = "visible";
    element.style.maxWidth = "none";
  });
  clone.querySelectorAll(".share-button").forEach((element) => element.remove());
  frame.append(masthead, clone);
  document.body.append(frame);
  try {
    await document.fonts.ready;
    const canvas = await html2canvas(frame, {
      backgroundColor: "#f4f6f8",
      scale: 1.5,
      useCORS: true,
      logging: false,
      windowWidth: 1520
    });
    downloadCanvas(canvas, `48COM-${section.dataset.shareKey}-share.png`);
  } catch (error) {
    console.error(error);
    alert("分享图生成失败，请稍后重试或使用浏览器截图。");
  } finally {
    frame.remove();
    button.disabled = false;
    button.textContent = "生成分享图";
  }
}

function installShareButtons() {
  $$("[data-share-key]").forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "share-button";
    button.textContent = "生成分享图";
    button.setAttribute("aria-label", `生成“${$("h2", section)?.textContent || "本专题"}”分享图`);
    button.addEventListener("click", () => generateShareImage(section, button));
    section.prepend(button);
  });
}

function renderAll() {
  setMetrics();
  renderMechanisms();
  renderOutcomeShifts();
  renderRoleOverview();
  renderRegionLegend();
  renderReasoningFramework();
  reasoningStats();
  renderClaims();
  renderReasoningCountries();
  renderCorrectionTrace();
  renderSources();
  renderFiltered();
}

function renderOverallPage() {
  renderCensus();
  renderOverallAnalysis();
  renderOverallMemberAudit();
  renderMemberConcentration();
  renderOverallCotext();
  renderDeliberationTimeAudit();
  renderTimeSampleComparison();
  renderDeliberationRoles();
  renderHistoricalBaseline();
}

async function init() {
  $("#conference-logo").src = `data:image/svg+xml;base64,${whc48LogoBase64}`;
  const dataRoot = pageMode === "overall" ? "../stage-2b/data/" : "data/";
  try {
    const [phaseResponse, historicalResponse, censusResponse, stage1Response, stage2aResponse, timeSampleResponse, topic01Response] = await Promise.all([
      fetch(`${dataRoot}phase-2b.json`, { cache: "no-store" }),
      fetch(`${dataRoot}historical-comparison.json`, { cache: "no-store" }),
      fetch(`${dataRoot}agenda-5-12-census.json`, { cache: "no-store" }),
      pageMode === "overall" ? fetch("../stage-1/data/phase-1.json", { cache: "no-store" }) : Promise.resolve(null),
      pageMode === "overall" ? fetch("../stage-2a/data/phase-2a.json", { cache: "no-store" }) : Promise.resolve(null),
      pageMode === "overall" ? fetch(`${dataRoot}time-sample-comparison.json`, { cache: "no-store" }) : Promise.resolve(null),
      pageMode === "overall" ? fetch("data/topic-01-supplement.json", { cache: "no-store" }) : Promise.resolve(null)
    ]);
    if (!phaseResponse.ok) throw new Error(`Phase data request failed: ${phaseResponse.status}`);
    if (!historicalResponse.ok) throw new Error(`Historical data request failed: ${historicalResponse.status}`);
    if (!censusResponse.ok) throw new Error(`Census data request failed: ${censusResponse.status}`);
    if (stage1Response && !stage1Response.ok) throw new Error(`Stage 1 data request failed: ${stage1Response.status}`);
    if (stage2aResponse && !stage2aResponse.ok) throw new Error(`Stage 2A data request failed: ${stage2aResponse.status}`);
    if (timeSampleResponse && !timeSampleResponse.ok) throw new Error(`Time sample data request failed: ${timeSampleResponse.status}`);
    if (topic01Response && !topic01Response.ok) throw new Error(`Topic 01 data request failed: ${topic01Response.status}`);
    [data, historicalData, censusData] = await Promise.all([phaseResponse.json(), historicalResponse.json(), censusResponse.json()]);
    if (pageMode === "overall") [stage1Data, stage2aData, timeSampleData, topic01Data] = await Promise.all([stage1Response.json(), stage2aResponse.json(), timeSampleResponse.json(), topic01Response.json()]);
    if (pageMode === "overall") {
      renderOverallPage();
    } else {
      populateFilters();
      renderAll();
      bindFilters();
    }
    installShareButtons();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML("beforeend", `
      <div class="noscript">数据未能载入。请通过本地或线上网站地址打开本页，不要直接双击HTML文件。</div>
    `);
  }
}

init();
