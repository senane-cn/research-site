import { whc48LogoBase64 } from "../stage-1/assets/whc48-logo.generated.js";

const DATA_URL = "data/phase-2a.json?v=1.0.2";
const regionColors = {
  africa: "#b84854",
  arab: "#6652a4",
  asia_pacific: "#267a5e",
  europe_north_america: "#2d629e",
  latin_caribbean: "#9a681c"
};
const proposalRoles = new Set(["lead", "co_sponsor", "joint_submitter"]);
const initiativeRoles = new Set(["lead", "joint_submitter"]);
const collator = new Intl.Collator("zh-CN");

let data;
let state = { region: "all", country: "all", sort: "turns-desc" };
let activeDetailTarget = null;
let pinnedDetailTarget = null;

const $ = (selector) => document.querySelector(selector);
const sum = (values) => values.reduce((total, value) => total + value, 0);

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function countryById(id) {
  return data.countries.find((country) => country.id === id);
}

function unitById(id) {
  return data.units.find((unit) => unit.id === id);
}

function regionById(id) {
  return data.regions.find((region) => region.id === id);
}

function unitMember(unit, countryId) {
  return unit.members[countryId] ?? {};
}

function packagesFor(countryId) {
  return data.amendment_packages.filter((item) =>
    item.actors.some((actor) => actor.country === countryId)
  );
}

function actionsFor(countryId) {
  return data.accepted_actions.filter((item) => item.country === countryId);
}

function actionUnitsFor(countryId) {
  const ids = new Set();
  for (const unit of data.units) {
    if ((unitMember(unit, countryId).discussion ?? 0) > 0) ids.add(unit.id);
  }
  for (const item of packagesFor(countryId)) ids.add(item.unit);
  for (const item of actionsFor(countryId)) ids.add(item.unit);
  return ids;
}

function metricsFor(country) {
  const discussionTurns = sum(
    data.units.map((unit) => unitMember(unit, country.id).discussion ?? 0)
  );
  const responseTurns = sum(
    data.units.map((unit) => unitMember(unit, country.id).response ?? 0)
  );
  const packageItems = packagesFor(country.id);
  const acceptedItems = actionsFor(country.id);
  const initiative =
    packageItems.filter((item) =>
      item.actors.some(
        (actor) => actor.country === country.id && initiativeRoles.has(actor.role)
      )
    ).length +
    acceptedItems.filter((item) => item.type === "procedural").length;
  const coSponsor = packageItems.filter((item) =>
    item.actors.some(
      (actor) => actor.country === country.id && actor.role === "co_sponsor"
    )
  ).length;
  const deliberative = acceptedItems.filter(
    (item) => item.type !== "procedural"
  ).length;
  const unitTurns = data.units.map((unit) => ({
    id: unit.id,
    turns:
      (unitMember(unit, country.id).discussion ?? 0) +
      (unitMember(unit, country.id).response ?? 0)
  }));
  const topTurnCount = Math.max(0, ...unitTurns.map((item) => item.turns));
  const topUnitIds = unitTurns
    .filter((item) => item.turns === topTurnCount && topTurnCount > 0)
    .map((item) => item.id);

  return {
    coverage: actionUnitsFor(country.id).size,
    discussionTurns,
    responseTurns,
    totalTurns: discussionTurns + responseTurns,
    textPackages: packageItems.length,
    initiative,
    coSponsor,
    deliberative,
    topTurnCount,
    topUnitIds,
    concentration:
      discussionTurns + responseTurns
        ? topTurnCount / (discussionTurns + responseTurns)
        : 0
  };
}

function topicMetrics(country) {
  const activeUnits = new Set(actionUnitsFor(country.id));
  for (const unit of data.units) {
    if ((unitMember(unit, country.id).response ?? 0) > 0) activeUnits.add(unit.id);
  }
  return data.topics.map((topic) => {
    const units = data.units.filter(
      (unit) => activeUnits.has(unit.id) && unit.topics.includes(topic.id)
    );
    const turns = sum(
      units.map((unit) => {
        const member = unitMember(unit, country.id);
        return (member.discussion ?? 0) + (member.response ?? 0);
      })
    );
    return { ...topic, units, count: units.length, turns };
  });
}

function topTopics(country, limit = 4) {
  return topicMetrics(country)
    .filter((topic) => topic.count > 0)
    .sort(
      (a, b) =>
        b.count - a.count ||
        b.turns - a.turns ||
        collator.compare(a.label, b.label)
    )
    .slice(0, limit);
}

function commonPackages(countryA, countryB) {
  return data.amendment_packages.filter((item) => {
    const proposers = new Set(
      item.actors
        .filter((actor) => proposalRoles.has(actor.role))
        .map((actor) => actor.country)
    );
    return proposers.has(countryA) && proposers.has(countryB);
  });
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
    if (state.sort === "coverage-desc")
      return (
        bm.coverage - am.coverage ||
        bm.totalTurns - am.totalTurns ||
        collator.compare(a.name_zh, b.name_zh)
      );
    if (state.sort === "initiative-desc")
      return (
        bm.initiative - am.initiative ||
        bm.totalTurns - am.totalTurns ||
        collator.compare(a.name_zh, b.name_zh)
      );
    if (state.sort === "deliberative-desc")
      return (
        bm.deliberative - am.deliberative ||
        bm.totalTurns - am.totalTurns ||
        collator.compare(a.name_zh, b.name_zh)
      );
    if (state.sort === "name-asc")
      return collator.compare(a.name_zh, b.name_zh);
    return (
      bm.totalTurns - am.totalTurns ||
      bm.coverage - am.coverage ||
      collator.compare(a.name_zh, b.name_zh)
    );
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
  history.replaceState(
    null,
    "",
    `${location.pathname}${query ? `?${query}` : ""}${location.hash}`
  );
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
  for (const country of [...data.countries].sort((a, b) =>
    collator.compare(a.name_zh, b.name_zh)
  )) {
    const option = document.createElement("option");
    option.value = country.id;
    option.textContent = `${country.name_zh} · ${country.code}`;
    countrySelect.append(option);
  }
  regionSelect.value = state.region;
  countrySelect.value = state.country;
  $("#sort-table").value = state.sort;
}

function detailForElement(element) {
  const kind = element.dataset.detailKind;
  if (kind === "country" || kind === "scatter") {
    const country = countryById(element.dataset.country);
    if (!country) return null;
    const metrics = metricsFor(country);
    return {
      title: `${country.name_zh} · ${country.code}`,
      body: country.summary,
      items: [
        `参与覆盖：${metrics.coverage}/${data.metadata.effective_units}个有效单元`,
        `讨论发言：${metrics.discussionTurns}回合；答辩／回应：${metrics.responseTurns}回合`,
        `提出端：${metrics.initiative}；介入讨论：${metrics.deliberative}`,
        `关联议题：${topTopics(country)
          .map((topic) => topic.label)
          .join("、") || "暂无"}`
      ]
    };
  }

  if (kind === "unit") {
    const country = countryById(element.dataset.country);
    const unit = unitById(element.dataset.unit);
    if (!country || !unit) return null;
    const member = unitMember(unit, country.id);
    const packageItems = data.amendment_packages.filter(
      (item) =>
        item.unit === unit.id &&
        item.actors.some((actor) => actor.country === country.id)
    );
    const actionItems = data.accepted_actions.filter(
      (item) => item.unit === unit.id && item.country === country.id
    );
    const items = [
      ...packageItems.map((item) => {
        const actor = item.actors.find((entry) => entry.country === country.id);
        return `${actor.role_label}：${item.label}（${item.outcome}）`;
      }),
      ...actionItems.map((item) => `${item.label}：${item.result}`)
    ];
    return {
      title: `${country.name_zh} · ${unit.short_label}`,
      body: `${member.discussion ?? 0}个讨论回合；${
        member.response ?? 0
      }个答辩／回应回合。`,
      items: [
        `审议：${unit.label}`,
        `结果：${unit.outcome}`,
        ...items
      ]
    };
  }

  if (kind === "topic") {
    const country = countryById(element.dataset.country);
    const topic = data.topics.find((item) => item.id === element.dataset.topic);
    if (!country || !topic) return null;
    const metrics = topicMetrics(country).find((item) => item.id === topic.id);
    return {
      title: `${country.name_zh} · ${topic.label}`,
      body: `关联${metrics.count}个审议单元、${metrics.turns}个可核对发言回合。`,
      items: metrics.units.map(
        (unit) => `${unit.short_label} · ${unit.label}`
      )
    };
  }

  if (kind === "influence") {
    const country = countryById(element.dataset.country);
    const measure = element.dataset.measure;
    if (!country) return null;
    const metrics = metricsFor(country);
    const labels = {
      initiative: "提出议题",
      coSponsor: "共同提出",
      deliberative: "介入讨论"
    };
    let items = [];
    if (measure === "initiative") {
      items = [
        ...packagesFor(country.id).flatMap((item) => {
          const actor = item.actors.find(
            (entry) =>
              entry.country === country.id && initiativeRoles.has(entry.role)
          );
          return actor
            ? [`${unitById(item.unit).short_label} · ${item.label}`]
            : [];
        }),
        ...actionsFor(country.id)
          .filter((item) => item.type === "procedural")
          .map((item) => `${unitById(item.unit).short_label} · ${item.label}`)
      ];
    } else if (measure === "coSponsor") {
      items = packagesFor(country.id).flatMap((item) => {
        const actor = item.actors.find(
          (entry) =>
            entry.country === country.id && entry.role === "co_sponsor"
        );
        return actor
          ? [`${unitById(item.unit).short_label} · ${item.label}`]
          : [];
      });
    } else {
      items = actionsFor(country.id)
        .filter((item) => item.type !== "procedural")
        .map(
          (item) =>
            `${unitById(item.unit).short_label} · ${item.label}：${item.result}`
        );
    }
    return {
      title: `${country.name_zh} · ${labels[measure]} ${metrics[measure]}`,
      body:
        measure === "initiative"
          ? "正式主提／联合提交，以及获得处理结果的程序动议。"
          : measure === "coSponsor"
            ? "正式登记为共同提出；不把一般支持混入。"
            : "可追溯到决定文字或程序结果的现场编辑、护栏和折衷。",
      items: items.length ? items : ["本阶段没有符合当前证据边界的记录"]
    };
  }

  if (kind === "coaction") {
    const a = countryById(element.dataset.countryA);
    const b = countryById(element.dataset.countryB);
    if (!a || !b) return null;
    const packages = commonPackages(a.id, b.id);
    return {
      title: `${a.name_zh} × ${b.name_zh}`,
      body: `共同列入${packages.length}组主提／共同提出／联合提交名单。`,
      items: packages.map(
        (item) =>
          `${unitById(item.unit).short_label} · ${item.label}（${item.outcome}）`
      )
    };
  }

  if (kind === "vote") {
    const country = countryById(element.dataset.country);
    const position = data.votes[0].positions[country.id];
    const labels = {
      yes: "赞成延期",
      no: "反对延期",
      abstain: "弃权",
      absent: "缺席"
    };
    return {
      title: `${country.name_zh} · ${labels[position]}`,
      body: "表决对象是是否将Baikal实质辩论延至第49届，不等同于对列危本身的最终表决。",
      items: [data.votes[0].result]
    };
  }

  return null;
}

function positionTooltip(target) {
  const tooltip = $("#viz-tooltip");
  const targetRect = target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const edge = 12;
  const gap = 10;
  const left = Math.min(
    Math.max(
      targetRect.left + (targetRect.width - tooltipRect.width) / 2,
      edge
    ),
    innerWidth - tooltipRect.width - edge
  );
  let top = targetRect.bottom + gap;
  if (top + tooltipRect.height > innerHeight - edge) {
    top = Math.max(edge, targetRect.top - tooltipRect.height - gap);
  }
  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

function showTooltip(target) {
  const detail = detailForElement(target);
  if (!detail) return;
  const tooltip = $("#viz-tooltip");
  $("#viz-tooltip-title").textContent = detail.title;
  $("#viz-tooltip-body").textContent = detail.body;
  $("#viz-tooltip-list").innerHTML = detail.items
    .map((item) => `<li>${escapeHTML(item)}</li>`)
    .join("");
  tooltip.hidden = false;
  tooltip.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => positionTooltip(target));
  activeDetailTarget = target;
}

function hideTooltip(target, force = false) {
  if (!force && pinnedDetailTarget === target) return;
  const tooltip = $("#viz-tooltip");
  tooltip.hidden = true;
  tooltip.setAttribute("aria-hidden", "true");
  if (activeDetailTarget === target || force) activeDetailTarget = null;
}

function bindDetailTargets() {
  document.querySelectorAll("[data-detail-kind]").forEach((target) => {
    target.addEventListener("mouseenter", () => showTooltip(target));
    target.addEventListener("mouseleave", () => hideTooltip(target));
    target.addEventListener("focus", () => showTooltip(target));
    target.addEventListener("blur", () => hideTooltip(target));
    target.addEventListener("click", (event) => {
      if (pinnedDetailTarget === target) {
        pinnedDetailTarget = null;
        target.setAttribute("aria-pressed", "false");
        hideTooltip(target, true);
      } else {
        if (pinnedDetailTarget)
          pinnedDetailTarget.setAttribute("aria-pressed", "false");
        pinnedDetailTarget = target;
        target.setAttribute("aria-pressed", "true");
        showTooltip(target);
        event.stopPropagation();
      }
    });
  });
}

function renderMetrics() {
  $("#metric-members").textContent = data.metadata.committee_members;
  $("#metric-actions").textContent = data.metadata.country_unit_actions;
  $("#metric-speeches").textContent = data.metadata.verified_floor_turns;
  $("#metric-responses").textContent = data.metadata.member_response_turns;
  $("#metric-packages").textContent =
    data.metadata.official_amendment_packages +
    data.metadata.recorded_floor_amendment_packages;
  $("#metric-votes").textContent = data.votes.length;
}

function renderRegionLegend() {
  $("#scatter-region-legend").innerHTML = data.regions
    .map(
      (region) =>
        `<span style="--region-color:${regionColors[region.id]}"><i></i>${escapeHTML(
          region.label
        )}</span>`
    )
    .join("");
}

function renderScatter() {
  const container = $("#scatter");
  const metrics = data.countries.map((country) => ({
    country,
    ...metricsFor(country)
  }));
  const maxX = Math.max(...metrics.map((item) => item.coverage), 1);
  const maxY = Math.max(...metrics.map((item) => item.totalTurns), 1);
  const xGroups = new Map();
  for (const item of metrics) {
    if (!xGroups.has(item.coverage)) xGroups.set(item.coverage, []);
    xGroups.get(item.coverage).push(item);
  }
  const pointHeight = 18;
  const pointGap = 6;
  const chartHeight = container.clientHeight || 460;
  const verticalOffsets = new Map();
  for (const group of xGroups.values()) {
    const placements = [...group]
      .sort(
        (a, b) =>
          b.totalTurns - a.totalTurns ||
          collator.compare(a.country.code, b.country.code)
      )
      .map((item) => {
        const yPercent = Math.min((item.totalTurns / maxY) * 100, 97);
        return {
          item,
          desiredTop:
            chartHeight -
            (yPercent / 100) * chartHeight -
            pointHeight +
            7
        };
      });
    let previousBottom = -Infinity;
    for (const placement of placements) {
      placement.adjustedTop = Math.max(
        placement.desiredTop,
        previousBottom + pointGap
      );
      previousBottom = placement.adjustedTop + pointHeight;
    }
    const overflow = Math.max(0, previousBottom - chartHeight);
    for (const placement of placements) {
      placement.adjustedTop -= overflow;
      verticalOffsets.set(
        placement.item.country.id,
        placement.desiredTop - placement.adjustedTop
      );
    }
  }
  container.style.setProperty("--x-grid-step", `${100 / maxX}%`);
  container.style.setProperty("--y-grid-step", `${100 / Math.ceil(maxY / 5)}%`);
  const xTicks = Array.from({ length: maxX + 1 }, (_, value) => value)
    .map(
      (value) =>
        `<span class="scatter-tick x" style="left:${(value / maxX) * 100}%">${value}</span>`
    )
    .join("");
  const yStep = maxY > 15 ? 5 : 2;
  const yTicks = Array.from(
    { length: Math.floor(maxY / yStep) + 1 },
    (_, index) => index * yStep
  )
    .map(
      (value) =>
        `<span class="scatter-tick y" style="bottom:${(value / maxY) * 100}%">${value}</span>`
    )
    .join("");
  const points = metrics
    .map((item) => {
      const x = Math.min((item.coverage / maxX) * 100, 97);
      const y = Math.min((item.totalTurns / maxY) * 100, 97);
      const offsetY = verticalOffsets.get(item.country.id) ?? 0;
      const classes = [
        "scatter-point",
        item.coverage / maxX >= 0.86 ? "label-left" : "",
        !isMatch(item.country) ? "is-muted" : "",
        state.country === item.country.id ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");
      return `<button type="button" class="${classes}" style="left:${x}%;bottom:calc(${y}% + ${offsetY}px)" data-region="${item.country.region}" data-country="${item.country.id}" data-detail-kind="scatter" aria-label="${escapeHTML(item.country.name_zh)}，覆盖${item.coverage}个单元，共${item.totalTurns}回合"><span>${item.country.code}</span></button>`;
    })
    .join("");
  container.innerHTML = `${xTicks}${yTicks}${points}`;
}

function numberBar(value, max) {
  const width = max ? Math.max(value > 0 ? 7 : 0, (value / max) * 100) : 0;
  return `<div class="number-bar"><b>${value}</b><span><i style="width:${width}%"></i></span></div>`;
}

function topUnitLabel(metrics) {
  if (!metrics.topUnitIds.length) return "—";
  return `${metrics.topUnitIds
    .map((id) => unitById(id).short_label)
    .join("／")}<small>${metrics.topTurnCount}/${metrics.totalTurns} · ${Math.round(
      metrics.concentration * 100
    )}%</small>`;
}

function renderBoxscore() {
  const countries = sortCountries(data.countries);
  const maxTurns = Math.max(...countries.map((country) => metricsFor(country).totalTurns));
  const maxCoverage = Math.max(...countries.map((country) => metricsFor(country).coverage));
  $("#boxscore-body").innerHTML = countries
    .map((country) => {
      const metrics = metricsFor(country);
      const classes = [
        !isMatch(country) ? "is-muted" : "",
        state.country === country.id ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");
      const topics = topTopics(country)
        .map((topic) => `<span>${escapeHTML(topic.label)}</span>`)
        .join("");
      return `<tr class="${classes}" data-country-row="${country.id}">
        <th scope="row" class="country-cell"><strong>${escapeHTML(
          country.name_zh
        )}</strong><span>${country.code}</span></th>
        <td><span class="region-chip">${regionById(country.region).short}</span></td>
        <td>${numberBar(metrics.coverage, maxCoverage)}</td>
        <td>${numberBar(metrics.discussionTurns, maxTurns)}</td>
        <td>${metrics.responseTurns}</td>
        <td class="concentration-cell"><strong>${topUnitLabel(metrics)}</strong></td>
        <td>${metrics.textPackages}</td>
        <td>${metrics.initiative}</td>
        <td>${metrics.coSponsor}</td>
        <td>${metrics.deliberative}</td>
        <td><div class="topic-tags">${topics || "<span>—</span>"}</div></td>
      </tr>`;
    })
    .join("");

  $("#member-cards").innerHTML = countries
    .map((country) => {
      const metrics = metricsFor(country);
      const classes = [
        "member-card",
        !isMatch(country) ? "is-muted" : "",
        state.country === country.id ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");
      return `<article class="${classes}" data-country-row="${country.id}">
        <header><h3>${escapeHTML(country.name_zh)}<span>${country.code}</span></h3><span class="region-chip">${regionById(country.region).short}</span></header>
        <p class="profile">${escapeHTML(country.profile)}</p>
        <dl>
          <div><dt>覆盖</dt><dd>${metrics.coverage}</dd></div>
          <div><dt>讨论发言</dt><dd>${metrics.discussionTurns}</dd></div>
          <div><dt>答辩／回应</dt><dd>${metrics.responseTurns}</dd></div>
          <div><dt>提出／介入</dt><dd>${metrics.initiative}/${metrics.deliberative}</dd></div>
        </dl>
        <p class="mobile-concentration">最高集中：${topUnitLabel(metrics)}</p>
        <div class="topic-tags">${topTopics(country)
          .map((topic) => `<span>${escapeHTML(topic.label)}</span>`)
          .join("")}</div>
      </article>`;
    })
    .join("");
}

function renderInfluence() {
  const countries = sortCountries(data.countries).filter((country) => {
    const metrics = metricsFor(country);
    return metrics.initiative + metrics.coSponsor + metrics.deliberative > 0;
  });
  const maxima = {
    initiative: Math.max(...countries.map((country) => metricsFor(country).initiative), 1),
    coSponsor: Math.max(...countries.map((country) => metricsFor(country).coSponsor), 1),
    deliberative: Math.max(...countries.map((country) => metricsFor(country).deliberative), 1)
  };
  const measureHTML = (country, measure, className) => {
    const value = metricsFor(country)[measure];
    return `<button type="button" class="influence-measure" data-country="${country.id}" data-measure="${measure}" data-detail-kind="influence" aria-label="${country.name_zh} ${measure} ${value}">
      <div><span class="${className}" style="width:${(value / maxima[measure]) * 100}%"></span></div><b>${value}</b>
    </button>`;
  };
  $("#influence-bars").innerHTML = countries
    .map((country) => {
      const classes = [
        "influence-row",
        !isMatch(country) ? "is-muted" : "",
        state.country === country.id ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");
      return `<div class="${classes}">
        <div class="influence-country"><strong>${escapeHTML(country.name_zh)}</strong><span>${country.code}</span></div>
        ${measureHTML(country, "initiative", "initiative-bar")}
        ${measureHTML(country, "coSponsor", "cosponsor-bar")}
        ${measureHTML(country, "deliberative", "deliberative-bar")}
      </div>`;
    })
    .join("");
}

function unitCell(country, unit) {
  const member = unitMember(unit, country.id);
  const discussion = member.discussion ?? 0;
  const response = member.response ?? 0;
  const text = data.amendment_packages.some(
    (item) =>
      item.unit === unit.id &&
      item.actors.some((actor) => actor.country === country.id)
  );
  const action = data.accepted_actions.some(
    (item) => item.unit === unit.id && item.country === country.id
  );
  const total = discussion + response;
  const active = total > 0 || text || action;
  const className = !active
    ? "unit-v0"
    : response > 0 && discussion === 0 && !text && !action
      ? "unit-vr"
      : text || action
        ? total > 0
          ? "unit-v3"
          : "unit-v2"
        : "unit-v1";
  const label = response > 0 && discussion === 0 ? "回应" : text || action ? "发＋文" : "发言";
  return `<td class="matrix-cell ${className}">
    <button type="button" data-detail-kind="unit" data-country="${country.id}" data-unit="${unit.id}" aria-label="${country.name_zh} ${unit.short_label} ${total}回合">
      <b>${total || (active ? "0" : "—")}</b><small>${active ? label : ""}</small>
    </button>
  </td>`;
}

function renderUnitMatrix() {
  const countries = sortCountries(data.countries);
  const head = `<thead><tr><th scope="col">委员国</th>${data.units
    .map(
      (unit) =>
        `<th scope="col"><span class="agenda-head"><strong>${escapeHTML(
          unit.matrix_label ?? unit.label
        )}</strong><span>${escapeHTML(unit.short_label)} · ${escapeHTML(
          unit.category
        )}</span></span></th>`
    )
    .join("")}</tr></thead>`;
  const body = `<tbody>${countries
    .map(
      (country) =>
        `<tr class="${!isMatch(country) ? "is-muted" : ""}"><th scope="row" class="country-cell"><strong>${escapeHTML(
          country.name_zh
        )}</strong><span>${country.code}</span></th>${data.units
          .map((unit) => unitCell(country, unit))
          .join("")}</tr>`
    )
    .join("")}</tbody>`;
  $("#unit-matrix").innerHTML = head + body;
}

function topicClass(count) {
  if (count === 0) return "topic-v0";
  if (count === 1) return "topic-v1";
  if (count === 2) return "topic-v2";
  return "topic-v3";
}

function renderTopicMatrix() {
  const countries = sortCountries(data.countries);
  const head = `<thead><tr><th scope="col">委员国</th>${data.topics
    .map((topic) => `<th scope="col">${escapeHTML(topic.label)}</th>`)
    .join("")}</tr></thead>`;
  const body = `<tbody>${countries
    .map((country) => {
      const topics = topicMetrics(country);
      return `<tr class="${!isMatch(country) ? "is-muted" : ""}"><th scope="row" class="country-cell"><strong>${escapeHTML(
        country.name_zh
      )}</strong><span>${country.code}</span></th>${topics
        .map(
          (topic) =>
            `<td class="matrix-cell ${topicClass(topic.count)}"><button type="button" data-detail-kind="topic" data-country="${country.id}" data-topic="${topic.id}" aria-label="${country.name_zh} ${topic.label} 关联${topic.count}个单元"><b>${topic.count}</b><small>${topic.turns ? `${topic.turns}回合` : ""}</small></button></td>`
        )
        .join("")}</tr>`;
    })
    .join("")}</tbody>`;
  $("#topic-matrix").innerHTML = head + body;
}

function renderCoactionMatrix() {
  const multiParty = new Set();
  for (const item of data.amendment_packages) {
    const actors = item.actors
      .filter((actor) => proposalRoles.has(actor.role))
      .map((actor) => actor.country);
    if (actors.length > 1) actors.forEach((country) => multiParty.add(country));
  }
  const countries = data.countries
    .filter((country) => multiParty.has(country.id))
    .sort((a, b) => collator.compare(a.code, b.code));
  const maxPair = Math.max(
    1,
    ...countries.flatMap((a) =>
      countries.map((b) =>
        a.id === b.id ? 0 : commonPackages(a.id, b.id).length
      )
    )
  );
  const head = `<thead><tr><th scope="col">共同文本</th>${countries
    .map((country) => `<th scope="col">${country.code}</th>`)
    .join("")}</tr></thead>`;
  const body = `<tbody>${countries
    .map(
      (row) =>
        `<tr><th scope="row" class="country-cell"><strong>${escapeHTML(
          row.name_zh
        )}</strong><span>${row.code}</span></th>${countries
          .map((column) => {
            if (row.id === column.id)
              return `<td class="diagonal">—</td>`;
            const packages = commonPackages(row.id, column.id);
            const level = packages.length
              ? Math.max(1, Math.round((packages.length / maxPair) * 5))
              : 0;
            return `<td class="${level ? `pair-v${level}` : ""}">${
              packages.length
                ? `<button type="button" data-detail-kind="coaction" data-country-a="${row.id}" data-country-b="${column.id}" aria-label="${row.name_zh}和${column.name_zh}共同文本${packages.length}组">${packages.length}</button>`
                : ""
            }</td>`;
          })
          .join("")}</tr>`
    )
    .join("")}</tbody>`;
  $("#coaction-matrix").innerHTML = head + body;
}

function renderVote() {
  const vote = data.votes[0];
  const order = ["yes", "no", "abstain", "absent"];
  const labels = {
    yes: "赞成延期",
    no: "反对延期",
    abstain: "弃权",
    absent: "缺席"
  };
  $("#vote-grid").innerHTML = order
    .map((position) => {
      const countries = data.countries.filter(
        (country) => vote.positions[country.id] === position
      );
      return `<article class="vote-column vote-${position}">
        <header><strong>${countries.length}</strong><span>${labels[position]}</span></header>
        <div>${countries
          .map(
            (country) =>
              `<button type="button" data-detail-kind="vote" data-country="${country.id}"><b>${country.code}</b><span>${escapeHTML(country.name_zh)}</span></button>`
          )
          .join("")}</div>
      </article>`;
    })
    .join("");
}

function renderFindings() {
  $("#findings-list").innerHTML = data.findings
    .map(
      (item) =>
        `<article class="finding"><div><h3>${escapeHTML(
          item.title
        )}</h3><p>${escapeHTML(item.body)}</p></div></article>`
    )
    .join("");
}

function renderSources() {
  $("#source-list").innerHTML = data.sources
    .map(
      (item) =>
        `<div class="source-item"><strong>${escapeHTML(
          item.label
        )}</strong><span>${escapeHTML(item.type)}</span><a href="${escapeHTML(
          item.url
        )}" target="_blank" rel="noopener">打开来源</a></div>`
    )
    .join("");
}

function updateFilterSummary() {
  if (state.country !== "all") {
    $("#filter-summary").textContent = `聚焦 ${countryById(state.country).name_zh}`;
  } else if (state.region !== "all") {
    const count = data.countries.filter(
      (country) => country.region === state.region
    ).length;
    $("#filter-summary").textContent = `${regionById(state.region).label} · ${count}国`;
  } else {
    $("#filter-summary").textContent = `显示全部${data.countries.length}国`;
  }
}

function renderAll() {
  hideTooltip(activeDetailTarget, true);
  pinnedDetailTarget = null;
  renderScatter();
  renderBoxscore();
  renderInfluence();
  renderUnitMatrix();
  renderTopicMatrix();
  renderCoactionMatrix();
  renderVote();
  updateFilterSummary();
  bindDetailTargets();
}

function bindControls() {
  $("#region-filter").addEventListener("change", (event) => {
    state.region = event.target.value;
    state.country = "all";
    $("#country-filter").value = "all";
    syncURL();
    renderAll();
  });
  $("#country-filter").addEventListener("change", (event) => {
    state.country = event.target.value;
    if (state.country !== "all") {
      state.region = countryById(state.country).region;
      $("#region-filter").value = state.region;
    }
    syncURL();
    renderAll();
  });
  $("#sort-table").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderAll();
  });
  $("#reset-filters").addEventListener("click", () => {
    state.region = "all";
    state.country = "all";
    $("#region-filter").value = "all";
    $("#country-filter").value = "all";
    syncURL();
    renderAll();
  });
  $("#print-page").addEventListener("click", () => print());
  document.addEventListener("click", (event) => {
    if (
      pinnedDetailTarget &&
      !event.target.closest("[data-detail-kind]") &&
      !event.target.closest("#viz-tooltip")
    ) {
      pinnedDetailTarget.setAttribute("aria-pressed", "false");
      pinnedDetailTarget = null;
      hideTooltip(activeDetailTarget, true);
    }
  });
  addEventListener("resize", () => {
    if (activeDetailTarget) positionTooltip(activeDetailTarget);
  });
}

async function init() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`无法载入数据：${response.status}`);
  data = await response.json();
  $("#conference-logo").src = `data:image/svg+xml;base64,${whc48LogoBase64}`;
  readStateFromURL();
  populateControls();
  renderMetrics();
  renderRegionLegend();
  renderFindings();
  renderSources();
  renderAll();
  bindControls();
}

init().catch((error) => {
  console.error(error);
  const main = $("#main");
  const message = document.createElement("p");
  message.className = "load-error";
  message.textContent = "统计数据暂时无法载入。请通过本地或正式站点服务器打开页面，或直接下载JSON数据。";
  main.prepend(message);
});
