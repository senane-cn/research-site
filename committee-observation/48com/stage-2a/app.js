import { whc48LogoBase64 } from "../stage-1/assets/whc48-logo.generated.js";
import html2canvas from "./assets/html2canvas-1.4.1.esm.js";

const DATA_URL = "data/phase-2a.json?v=1.5.0";
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

function evidenceClass(level) {
  if (level === "direct") return "evidence-direct";
  if (level === "inference") return "evidence-inference";
  return "evidence-boundary";
}

function amendmentAudit() {
  return data.integrity_audit?.decision_change_audit;
}

function amendmentRoleStats() {
  const audit = amendmentAudit();
  const stats = new Map(
    data.countries.map((country) => [
      country.id,
      {
        country,
        lead: 0,
        support: 0,
        calibrate: 0,
        counter: 0,
        cases: new Set()
      }
    ])
  );

  for (const item of audit?.cases ?? []) {
    for (const stance of item.stances ?? []) {
      const entry = stats.get(stance.country);
      if (!entry || !(stance.role in entry)) continue;
      entry[stance.role] += 1;
      entry.cases.add(item.unit);
    }
  }

  return [...stats.values()]
    .map((entry) => ({
      ...entry,
      caseCount: entry.cases.size,
      roleCount:
        entry.lead + entry.support + entry.calibrate + entry.counter
    }))
    .filter((entry) => entry.roleCount > 0)
    .sort(
      (a, b) =>
        b.caseCount - a.caseCount ||
        b.lead - a.lead ||
        b.calibrate - a.calibrate ||
        collator.compare(a.country.name_zh, b.country.name_zh)
    );
}

function caseRoleMarkup(item) {
  const audit = amendmentAudit();
  const groups = audit.role_categories
    .map((category) => {
      const stances = (item.stances ?? []).filter(
        (stance) => stance.role === category.id
      );
      if (!stances.length) return "";
      return `
        <div class="case-role-group role-${escapeHTML(category.id)}">
          <b>${escapeHTML(category.short_label)}</b>
          <span>${stances
            .map((stance) => {
              const country = countryById(stance.country);
              return `<button
                type="button"
                title="${escapeHTML(`${country.name_zh}：${stance.label}`)}"
                data-detail-kind="case-stance"
                data-country="${escapeHTML(country.id)}"
                data-case="${escapeHTML(item.unit)}"
                data-role="${escapeHTML(category.id)}"
                aria-label="${escapeHTML(`${country.name_zh}，${stance.label}`)}"
              >${escapeHTML(country.code)}</button>`;
            })
            .join("")}</span>
        </div>`;
    })
    .join("");
  return `<div class="case-role-strip">${groups}</div>`;
}

function renderIntegrityAudit() {
  const audit = data.integrity_audit?.vienna;
  if (!audit) return;

  $("#integrity-thesis").innerHTML = `
    <div>
      <span class="case-status">${escapeHTML(audit.status)}</span>
      <p>${escapeHTML(audit.thesis)}</p>
    </div>
    <a href="https://whc.unesco.org/document/226821" target="_blank" rel="noopener">
      核对官方工作文件
    </a>`;

  $("#decision-chain").innerHTML = audit.decision_chain
    .map(
      (item) => `
        <article class="decision-step decision-${escapeHTML(item.tone)}">
          <div class="decision-step-meta">
            <span>${escapeHTML(item.stage)} / ${escapeHTML(item.label)}</span>
            <b class="${evidenceClass(item.evidence)}">${escapeHTML(item.evidence_label)}</b>
          </div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.body)}</p>
          <small>${escapeHTML(item.source_note)}</small>
        </article>`
    )
    .join("");

  $("#exit-audit").innerHTML = audit.exit_conditions
    .map(
      (item, index) => `
        <article class="exit-condition">
          <span class="exit-index">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h4>${escapeHTML(item.condition)}</h4>
            <p>${escapeHTML(item.observed)}</p>
            <small>${escapeHTML(item.source_note)}</small>
          </div>
          <strong class="status-${escapeHTML(item.status)}">${escapeHTML(item.status_label)}</strong>
        </article>`
    )
    .join("");

  $("#evidence-boundary-card").innerHTML = `
    <article>
      <span class="evidence-direct">直接事实</span>
      <p>${escapeHTML(audit.boundary.direct)}</p>
    </article>
    <article>
      <span class="evidence-inference">有依据的分析</span>
      <p>${escapeHTML(audit.boundary.inference)}</p>
    </article>
    <article>
      <span class="evidence-boundary">尚不能证明</span>
      <p>${escapeHTML(audit.boundary.not_established)}</p>
    </article>`;
}

function renderProcessTrace() {
  const audit = data.integrity_audit?.vienna;
  if (!audit) return;
  const lanes = [
    { id: "evidence", label: "专业证据" },
    { id: "members", label: "委员国行动" },
    { id: "chair", label: "主席裁量" }
  ];

  $("#process-timeline").innerHTML = lanes
    .map((lane) => {
      const events = audit.timeline
        .filter((item) => item.lane === lane.id)
        .sort((a, b) => a.order - b.order);
      return `<section class="timeline-lane lane-${lane.id}">
        <h3>${escapeHTML(lane.label)}</h3>
        <div>${events
          .map(
            (item) => `<article>
              <span>${String(item.order).padStart(2, "0")} · ${escapeHTML(item.time)}</span>
              <h4>${escapeHTML(item.title)}</h4>
              <p>${escapeHTML(item.body)}</p>
            </article>`
          )
          .join("")}</div>
      </section>`;
    })
    .join("");

  const chair = audit.chair_audit;
  $("#chair-audit").innerHTML = `
    <span>CHAIR DISCRETION AUDIT</span>
    <h3>${escapeHTML(chair.title)}</h3>
    <p class="chair-finding">${escapeHTML(chair.finding)}</p>
    <b class="${evidenceClass(chair.finding_evidence)}">有依据的分析</b>
    <ul>${chair.actions.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
    <p class="chair-caution">${escapeHTML(chair.caution)}</p>`;
}

function renderViennaMemberRoles() {
  const audit = data.integrity_audit?.vienna;
  const roles = audit?.member_roles ?? [];
  const mechanisms = audit?.role_mechanism ?? [];
  const divides = audit?.role_divides;

  const actorChips = (ids, side) =>
    ids
      .map((id) => {
        const country = countryById(id);
        return `<span class="divide-actor divide-actor-${escapeHTML(side)}">
          <b>${escapeHTML(country.code)}</b>
          <span>${escapeHTML(country.name_zh)}</span>
        </span>`;
      })
      .join("");

  $("#role-mechanism-summary").innerHTML = mechanisms
    .map(
      (item) => `
        <article class="role-mechanism role-mechanism-${escapeHTML(item.tone)}">
          <strong>${escapeHTML(item.value)}</strong>
          <h4>${escapeHTML(item.label)}</h4>
          <p>${escapeHTML(item.note)}</p>
        </article>`
    )
    .join("");

  $("#role-divide-map").innerHTML = divides
    ? `
      <header class="divide-map-insight">
        <span>核心发现</span>
        <h4>${escapeHTML(divides.insight)}</h4>
        <p>${escapeHTML(divides.note)}</p>
      </header>
      <div class="divide-axis-list">
        ${divides.axes
          .map(
            (axis) => `
              <section class="divide-axis divide-axis-${escapeHTML(axis.id)}" aria-labelledby="divide-${escapeHTML(axis.id)}">
                <header>
                  <span>${escapeHTML(axis.number)}</span>
                  <h4 id="divide-${escapeHTML(axis.id)}">${escapeHTML(axis.question)}</h4>
                </header>
                <article class="divide-pole divide-pole-constraint">
                  <strong>${escapeHTML(axis.left.label)}</strong>
                  <p>${escapeHTML(axis.left.claim)}</p>
                  <div class="divide-actors">${actorChips(axis.left.actors, "constraint")}</div>
                </article>
                <div class="divide-relation" aria-label="${escapeHTML(axis.relation)}">
                  <i></i>
                  <span>${escapeHTML(axis.relation)}</span>
                  <i></i>
                </div>
                <article class="divide-pole divide-pole-advance">
                  <strong>${escapeHTML(axis.right.label)}</strong>
                  <p>${escapeHTML(axis.right.claim)}</p>
                  <div class="divide-actors">${actorChips(axis.right.actors, "advance")}</div>
                </article>
              </section>`
          )
          .join("")}
      </div>
      <section class="role-crossovers" aria-labelledby="role-crossovers-title">
        <header>
          <span>CROSSOVER</span>
          <h4 id="role-crossovers-title">意见与程序选择并不总在同一侧</h4>
        </header>
        <div>
          ${divides.crossovers
            .map((item) => {
              const country = countryById(item.country);
              return `<article>
                <div><b>${escapeHTML(country.code)}</b><span>${escapeHTML(country.name_zh)}</span></div>
                <strong>${escapeHTML(item.label)}</strong>
                <p><span>${escapeHTML(item.from)}</span><i>→</i><span>${escapeHTML(item.to)}</span></p>
              </article>`;
            })
            .join("")}
        </div>
      </section>
      <section class="role-decision-path" aria-labelledby="role-decision-path-title">
        <header>
          <span>DECISION PATH</span>
          <h4 id="role-decision-path-title">为什么有实质分歧，决定仍能快速形成</h4>
        </header>
        <div class="role-decision-flow">
          ${divides.decision_flow
            .map(
              (item) => `<article class="decision-node decision-node-${escapeHTML(item.tone)}">
                <strong>${escapeHTML(item.value)}</strong>
                <span>${escapeHTML(item.label)}</span>
              </article>`
            )
            .join("")}
        </div>
        <aside class="after-decision-note">
          <div>${actorChips(divides.after_decision.actors, "dissociate")}</div>
          <p><strong>${escapeHTML(divides.after_decision.label)}</strong>${escapeHTML(divides.after_decision.note)}</p>
        </aside>
      </section>`
    : "";

  const roleRow = (item) => {
    const country = countryById(item.country);
    const tension = item.tension
      ? `<p class="role-tension"><b>判断张力</b>${escapeHTML(item.tension)}</p>`
      : "";
    return `<tr class="role-row role-row-${escapeHTML(item.posture_code)}">
      <th scope="row">
        <strong>${escapeHTML(country.name_zh)}</strong>
        <span>${escapeHTML(country.code)}</span>
      </th>
      <td>
        <b class="role-title">${escapeHTML(item.role_title)}</b>
        <small>${item.timecodes.map(escapeHTML).join(" · ")}</small>
      </td>
      <td>
        <div class="role-tags">${item.tags
          .map((tag) => `<span>${escapeHTML(tag)}</span>`)
          .join("")}</div>
        <p>${escapeHTML(item.substantive)}</p>
        ${tension}
      </td>
      <td><p>${escapeHTML(item.procedure)}</p></td>
      <td><span class="role-posture posture-${escapeHTML(item.posture_code)}">${escapeHTML(item.posture)}</span></td>
      <td>
        <p>${escapeHTML(item.effect)}</p>
        <small class="${evidenceClass(item.effect_evidence)}">${
          item.effect_evidence === "direct" ? "直接事实" : "有依据的分析"
        }</small>
      </td>
    </tr>`;
  };
  $("#vienna-role-body").innerHTML = roles.map(roleRow).join("");

  $("#vienna-role-cards").innerHTML = roles
    .map((item) => {
      const country = countryById(item.country);
      return `<article class="vienna-role-card role-row-${escapeHTML(item.posture_code)}">
        <header>
          <div><strong>${escapeHTML(country.name_zh)}</strong><span>${escapeHTML(country.code)}</span></div>
          <span class="role-posture posture-${escapeHTML(item.posture_code)}">${escapeHTML(item.posture)}</span>
        </header>
        <h4>${escapeHTML(item.role_title)}</h4>
        <div class="role-tags">${item.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
        <dl>
          <div><dt>实质作用</dt><dd>${escapeHTML(item.substantive)}</dd></div>
          <div><dt>程序作用</dt><dd>${escapeHTML(item.procedure)}</dd></div>
          <div><dt>可观察结果</dt><dd>${escapeHTML(item.effect)}</dd></div>
        </dl>
        ${
          item.tension
            ? `<p class="role-tension"><b>判断张力</b>${escapeHTML(item.tension)}</p>`
            : ""
        }
        <footer><span>${item.timecodes.map(escapeHTML).join(" · ")}</span><b class="${evidenceClass(
          item.effect_evidence
        )}">${item.effect_evidence === "direct" ? "直接事实" : "有依据的分析"}</b></footer>
      </article>`;
    })
    .join("");
}

function renderAgendaIntegrity() {
  const audit = amendmentAudit();
  if (!audit) return;

  $("#decision-audit-summary").innerHTML = audit.mechanisms
    .map(
      (item) => `
        <article class="decision-summary-card">
          <span>${escapeHTML(item.number)}</span>
          <strong>${escapeHTML(item.label)}</strong>
          <b>${item.primary_count}<small>项主要落点</small></b>
          <p>${escapeHTML(item.consequence)}</p>
        </article>`
    )
    .join("");

  const header = `
    <div class="decision-audit-header" aria-hidden="true">
      <span>审议项目</span>
      ${audit.mechanisms
        .map(
          (item) => `
            <div>
              <b>${escapeHTML(item.short_label)}</b>
              <small>${escapeHTML(item.question)}</small>
            </div>`
        )
        .join("")}
    </div>`;

  const rows = audit.cases
    .map((item, index) => {
      const cells = audit.mechanisms
        .map((mechanism) => {
          const effect = item.effects[mechanism.id];
          if (!effect) {
            return `<span class="decision-audit-cell is-empty" aria-hidden="true">—</span>`;
          }
          return `
            <button
              type="button"
              class="decision-audit-cell tone-${escapeHTML(effect.tone)}"
              data-detail-kind="decision-change"
              data-case="${escapeHTML(item.unit)}"
              data-mechanism="${escapeHTML(mechanism.id)}"
              data-mechanism-label="${escapeHTML(mechanism.short_label)}"
              aria-label="${escapeHTML(item.site)}，${escapeHTML(mechanism.label)}：${escapeHTML(effect.label)}"
            >
              <small>${escapeHTML(mechanism.short_label)}</small>
              <strong>${escapeHTML(effect.label)}</strong>
            </button>`;
        })
        .join("");

      const groupBreak =
        index > 0 && audit.cases[index - 1].kind !== item.kind
          ? " is-group-break"
          : "";
      return `
        <article class="decision-audit-row${groupBreak}">
          <header>
            <span>${escapeHTML(item.unit.replace(/^7([AB])/, "7$1."))}</span>
            <div>
              <button
                type="button"
                class="case-overview-trigger"
                data-detail-kind="case-overview"
                data-case="${escapeHTML(item.unit)}"
                aria-label="${escapeHTML(
                  `${item.unit.replace(/^7([AB])/, "7$1.")} ${item.site}，查看完整审议项目摘要`
                )}"
              >
                <strong>${escapeHTML(item.site)}</strong>
                <span>${escapeHTML(item.kind_label)} · 项目摘要</span>
              </button>
              ${caseRoleMarkup(item)}
            </div>
          </header>
          ${cells}
        </article>`;
    })
    .join("");

  $("#decision-change-audit").innerHTML = header + rows;
}

function renderAmendmentRoleStats() {
  const audit = amendmentAudit();
  const stats = amendmentRoleStats();
  const maxCount = Math.max(
    1,
    ...stats.flatMap((item) =>
      audit.role_categories.map((category) => item[category.id])
    )
  );

  $("#amendment-role-summary").innerHTML = audit.role_categories
    .map((category) => {
      const total = sum(stats.map((item) => item[category.id]));
      const leaders = stats
        .filter((item) => item[category.id] > 0)
        .sort(
          (a, b) =>
            b[category.id] - a[category.id] ||
            collator.compare(a.country.code, b.country.code)
        )
        .slice(0, 4)
        .map((item) => item.country.code)
        .join(" · ");
      return `
        <article class="role-summary-card role-${escapeHTML(category.id)}">
          <span>${escapeHTML(category.short_label)}</span>
          <strong>${total}</strong>
          <p>${escapeHTML(category.label)}</p>
          <small>${escapeHTML(leaders || "暂无")}</small>
        </article>`;
    })
    .join("");

  $("#amendment-role-bars").innerHTML = stats
    .map(
      (item) => `
        <article class="amendment-role-row">
          <header>
            <b>${escapeHTML(item.country.code)}</b>
            <span>${escapeHTML(item.country.name_zh)}</span>
            <small>覆盖${item.caseCount}案</small>
          </header>
          <div class="amendment-role-measures">
            ${audit.role_categories
              .map(
                (category) => `
                  <button
                    type="button"
                    class="role-measure role-${escapeHTML(category.id)}"
                    data-detail-kind="amendment-role"
                    data-country="${escapeHTML(item.country.id)}"
                    data-role="${escapeHTML(category.id)}"
                    aria-label="${escapeHTML(
                      `${item.country.name_zh}在实质修订中${category.label}${item[category.id]}案`
                    )}"
                  >
                    <span>${escapeHTML(category.short_label)}</span>
                    <i><em style="width:${(
                      (item[category.id] / maxCount) *
                      100
                    ).toFixed(1)}%"></em></i>
                    <b>${item[category.id]}</b>
                  </button>`
              )
              .join("")}
          </div>
        </article>`
    )
    .join("");

  $("#role-stat-legend").innerHTML = audit.role_categories
    .map(
      (category) =>
        `<span class="role-${escapeHTML(category.id)}"><i></i>${escapeHTML(
          category.label
        )}</span>`
    )
    .join("");
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
  if (kind === "case-overview") {
    const audit = amendmentAudit();
    const item = audit?.cases.find(
      (entry) => entry.unit === element.dataset.case
    );
    if (!item) return null;
    return {
      title: `${item.unit.replace(/^7([AB])/, "7$1.")} ${item.site} · 审议项目`,
      body: `最终结果：${item.outcome}`,
      items: [
        `原有基线：${item.baseline}`,
        `实质改变：${item.change}`,
        `可观察角色：${item.actors}`,
        `证据：${item.evidence}`,
        `边界：${item.caveat}`
      ]
    };
  }

  if (kind === "case-stance") {
    const audit = amendmentAudit();
    const country = countryById(element.dataset.country);
    const item = audit?.cases.find(
      (entry) => entry.unit === element.dataset.case
    );
    const category = audit?.role_categories.find(
      (entry) => entry.id === element.dataset.role
    );
    const stance = (item?.stances ?? []).find(
      (entry) =>
        entry.country === country?.id && entry.role === category?.id
    );
    if (!country || !item || !category || !stance) return null;
    return {
      title: `${country.name_zh} · ${item.unit.replace(/^7([AB])/, "7$1.")} ${item.site}`,
      body: `${category.label}：${stance.label}`,
      items: []
    };
  }

  if (kind === "amendment-role") {
    const audit = amendmentAudit();
    const country = countryById(element.dataset.country);
    const category = audit?.role_categories.find(
      (entry) => entry.id === element.dataset.role
    );
    if (!country || !category) return null;
    const matches = (audit.cases ?? []).flatMap((item) => {
      const stance = (item.stances ?? []).find(
        (entry) =>
          entry.country === country.id && entry.role === category.id
      );
      return stance ? [{ item, stance }] : [];
    });
    return {
      title: `${country.name_zh} · ${category.label} ${matches.length}案`,
      body:
        matches.length > 0
          ? "按案件中的公开发言、文本提交或表决位置分别编码；同一委员国在不同案件中可以承担不同角色。"
          : "本阶段没有符合该角色证据边界的案件。",
      items: matches.length
        ? matches.map(
            ({ item, stance }) =>
              `${item.unit.replace(/^7([AB])/, "7$1.")} ${item.site}：${stance.label}`
          )
        : ["0案"]
    };
  }

  if (kind === "decision-change") {
    const audit = data.integrity_audit?.decision_change_audit;
    const item = audit?.cases.find(
      (entry) => entry.unit === element.dataset.case
    );
    const mechanism = audit?.mechanisms.find(
      (entry) => entry.id === element.dataset.mechanism
    );
    const effect = item?.effects[element.dataset.mechanism];
    if (!item || !mechanism || !effect) return null;
    return {
      title: `${item.unit.replace(/^7([AB])/, "7$1.")} ${item.site} · ${mechanism.label}`,
      body: effect.summary,
      items: []
    };
  }

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

  if (kind === "agenda-link") {
    const country = countryById(element.dataset.country);
    const unit = unitById(element.dataset.unit);
    const row = data.agenda_party_network.rows.find(
      (item) => item.unit === element.dataset.unit
    );
    if (!country || !unit || !row) return null;
    const roles = data.amendment_packages
      .filter((item) => item.unit === unit.id)
      .flatMap((item) =>
        item.actors
          .filter(
            (actor) =>
              actor.country === country.id && proposalRoles.has(actor.role)
          )
          .map((actor) => `${item.label}：${actor.role_label}`)
      );
    return {
      title: `${country.name_zh} → ${row.state_parties
        .map((party) => party.name_zh)
        .join("／")}`,
      body: `在${unit.short_label}正式文本网络中可核对；议程层读数为“${row.orientation_label}”。`,
      items: [
        ...roles,
        `项目：${unit.label}`,
        `证据：${row.evidence_status}`,
        `边界：${row.orientation_note}`
      ]
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
  const detailList = $("#viz-tooltip-list");
  detailList.innerHTML = detail.items
    .map((item) => `<li>${escapeHTML(item)}</li>`)
    .join("");
  detailList.hidden = detail.items.length === 0;
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
    if (target.dataset.detailBound === "true") return;
    target.dataset.detailBound = "true";
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
  if (count <= 4) return "topic-v3";
  if (count <= 6) return "topic-v4";
  return "topic-v5";
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

function agendaNetworkMetrics(row) {
  const packageItems = data.amendment_packages.filter(
    (item) => item.unit === row.unit
  );
  const actorIds = new Set(
    packageItems.flatMap((item) =>
      item.actors
        .filter((actor) => proposalRoles.has(actor.role))
        .map((actor) => actor.country)
    )
  );
  const actors = data.countries
    .filter((country) => actorIds.has(country.id))
    .sort((a, b) => collator.compare(a.code, b.code));
  const regions = new Set(actors.map((country) => country.region));
  return {
    packageItems,
    actors,
    actorCount: actors.length,
    regionCount: regions.size
  };
}

function renderAgendaPartyNetwork() {
  const network = data.agenda_party_network;
  const highlightHTML = network.highlights
    .map((highlight) => {
      const row = network.rows.find((item) => item.unit === highlight.unit);
      const unit = unitById(highlight.unit);
      const metrics = agendaNetworkMetrics(row);
      return `<article>
        <span>${escapeHTML(highlight.label)}</span>
        <strong>${metrics.actorCount}<small>委员国</small> · ${metrics.regionCount}<small>区域组</small></strong>
        <h3>${escapeHTML(unit.matrix_label || unit.label)}</h3>
        <p>${escapeHTML(highlight.note)}</p>
      </article>`;
    })
    .join("");
  $("#agenda-network-highlights").innerHTML = highlightHTML;

  const head = `<thead><tr>
    <th scope="col">议程项目／相关缔约国</th>
    <th scope="col">正式文本网络</th>
    <th scope="col">网络宽度</th>
    <th scope="col">作用方向</th>
    <th scope="col">证据边界</th>
  </tr></thead>`;
  const body = `<tbody>${network.rows
    .map((row) => {
      const unit = unitById(row.unit);
      const metrics = agendaNetworkMetrics(row);
      const parties = row.state_parties
        .map((party) => party.name_zh)
        .join("／");
      const actorButtons = metrics.actors
        .map(
          (country) =>
            `<button type="button" class="agenda-member-chip ${
              !isMatch(country) ? "is-muted" : ""
            }" data-detail-kind="agenda-link" data-country="${
              country.id
            }" data-unit="${row.unit}" aria-label="${escapeHTML(
              country.name_zh
            )}进入${escapeHTML(unit.label)}正式文本网络"><b>${
              country.code
            }</b><span>${escapeHTML(country.name_zh)}</span></button>`
        )
        .join("");
      return `<tr>
        <th scope="row" class="agenda-party-cell">
          <strong>${escapeHTML(unit.matrix_label || unit.label)}</strong>
          <span>${escapeHTML(unit.short_label)} · ${escapeHTML(parties)}</span>
        </th>
        <td><div class="agenda-member-list">${actorButtons}</div></td>
        <td class="agenda-network-count"><strong>${metrics.actorCount}</strong><span>委员国</span><strong>${metrics.regionCount}</strong><span>区域组</span><small>${metrics.packageItems.length}份文本</small></td>
        <td><span class="relation-tag relation-${escapeHTML(
          row.orientation
        )}">${escapeHTML(row.orientation_label)}</span></td>
        <td class="agenda-evidence"><strong>${escapeHTML(
          row.evidence_status
        )}</strong><span>${escapeHTML(row.orientation_note)}</span></td>
      </tr>`;
    })
    .join("")}</tbody>`;
  $("#agenda-party-table").innerHTML = head + body;

  const caseStudy = network.case_study;
  const caseGroups = caseStudy.groups
    .map((group) => {
      const actors = group.actors
        .map((id) => countryById(id))
        .filter(Boolean);
      return `<article class="interaction-card interaction-${escapeHTML(
        group.type
      )}">
        <span>${escapeHTML(group.label)}</span>
        <div class="interaction-actors">${actors
          .map(
            (country) =>
              `<b class="${!isMatch(country) ? "is-muted" : ""}">${
                country.code
              }</b>`
          )
          .join("")}</div>
        <p>${escapeHTML(group.body)}</p>
      </article>`;
    })
    .join("");
  $("#interaction-case-title").textContent = caseStudy.title;
  $("#interaction-case-subtitle").textContent = caseStudy.subtitle;
  $("#interaction-case-grid").innerHTML = caseGroups;
  $("#state-party-response").innerHTML = `<span>缔约国答辩</span><p>${escapeHTML(
    caseStudy.state_party_response
  )}</p>`;
  $("#interaction-outcome").innerHTML = `<span>处理结果</span><p>${escapeHTML(
    caseStudy.outcome
  )}</p>`;
  $("#opposition-rule").textContent = caseStudy.opposition_rule;
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

function legacyShareCardConfig(key) {
  const audit = amendmentAudit();
  const roleStats = amendmentRoleStats();
  const countryMetrics = data.countries.map((country) => ({
    country,
    ...metricsFor(country)
  }));
  const topTurns = [...countryMetrics].sort(
    (a, b) => b.totalTurns - a.totalTurns
  );
  const topCoverage = [...countryMetrics].sort(
    (a, b) => b.coverage - a.coverage || b.totalTurns - a.totalTurns
  );
  const topInitiative = [...countryMetrics].sort(
    (a, b) => b.initiative - a.initiative || b.totalTurns - a.totalTurns
  );
  const topDeliberative = [...countryMetrics].sort(
    (a, b) => b.deliberative - a.deliberative || b.totalTurns - a.totalTurns
  );
  const unitTurns = data.units
    .map((unit) => ({
      unit,
      turns: sum(
        Object.values(unit.members).map(
          (member) => (member.discussion ?? 0) + (member.response ?? 0)
        )
      )
    }))
    .sort((a, b) => b.turns - a.turns);
  const topicRank = data.topics
    .map((topic) => ({
      topic,
      associations: sum(
        data.countries.map(
          (country) =>
            topicMetrics(country).find((item) => item.id === topic.id)?.count ??
            0
        )
      )
    }))
    .sort((a, b) => b.associations - a.associations);
  const section = document.querySelector(`[data-share-key="${key}"]`);
  const fallback = {
    kicker: section?.querySelector(".section-no")?.textContent ?? "48COM",
    title: section?.querySelector("h2")?.textContent ?? "议程7技术统计",
    deck:
      section?.querySelector(".section-heading div > p")?.textContent ??
      "第48届世界遗产委员会保护状况审议技术统计。",
    metrics: [
      { value: "21", label: "委员国" },
      { value: "224", label: "可核对发言回合" },
      { value: "16", label: "有效审议单元" }
    ],
    points: [],
    note: "只记录可核对制度行为，不推断幕后协调、长期政治联盟或国家关系。"
  };

  const configs = {
    "decision-audit": {
      kicker: "专题一 / DECISION CHANGE AUDIT",
      title: "实质修订发生在哪一环",
      deck: audit.takeaway,
      metrics: [
        { value: "9", label: "正式文本修订项目" },
        { value: "2", label: "程序性后移项目" },
        { value: "4", label: "制度改变环节" }
      ],
      points: [
        {
          title: "维也纳 · 技术门槛",
          body: "退出条件未完成，最终仍移出《濒危名录》。"
        },
        {
          title: "维多利亚瀑布 · 事实判断",
          body: "删除“生态连通性”，正式关切范围缩小。"
        },
        {
          title: "威斯敏斯特 · 保护强化",
          body: "恢复替代方案、迭代式HIA与分阶段报告。"
        },
        {
          title: "贝加尔湖 · 程序悬置",
          body: "14—5—1通过延期，实质辩论后移一届。"
        }
      ],
      note: audit.stance_method
    },
    "amendment-roles": {
      kicker: "专题一 / MEMBER ROLE BOXSCORE",
      title: "谁主导修订，谁支持、校准或保留",
      deck:
        "角色按案件分别计数，不把共同署名、表决和现场编辑合成为单一影响力分。",
      metrics: audit.role_categories.slice(0, 3).map((category) => ({
        value: String(sum(roleStats.map((item) => item[category.id]))),
        label: category.label
      })),
      points: roleStats.slice(0, 4).map((item) => ({
        title: `${item.country.code} · 覆盖${item.caseCount}案`,
        body: `主导${item.lead}｜支持${item.support}｜校准${item.calibrate}｜反对／保留${item.counter}`
      })),
      note:
        "Baikal只统计延期动议立场；共同提出计入支持，技术或保护性反向修改计入校准。"
    },
    "vienna-audit": {
      kicker: "深度案例 / VIENNA 7A.27",
      title: "退出条件未完成，退出决定仍获通过",
      deck: data.integrity_audit.vienna.thesis,
      metrics: [
        { value: "7", label: "DSOCR退出条件未完成" },
        { value: "18/20", label: "决定段落被重写" },
        { value: "退出", label: "最终列危状态" }
      ],
      points: data.integrity_audit.vienna.decision_chain.map((item) => ({
        title: item.label,
        body: item.title
      })),
      note:
        "清洁版决定发布前，现场结果与逐词文本分开标注；动机不从结果反推。"
    },
    "vienna-process": {
      kicker: "深度案例 / PROCESS TRACE",
      title: "专业证据、委员国行动与主席裁量如何交汇",
      deck: data.integrity_audit.vienna.chair_audit.finding,
      metrics: [
        { value: "≥8", label: "明确推动退出" },
        { value: "≥7", label: "支持整案处理" },
        { value: "2", label: "决定后正式抽离" }
      ],
      points: data.integrity_audit.vienna.role_mechanism.map((item) => ({
        title: item.label,
        body: item.note
      })),
      note: data.integrity_audit.vienna.chair_audit.caution
    },
    participation: {
      kicker: "专题二 / COVERAGE × VOLUME",
      title: "覆盖面与发言量共同描述参与度",
      deck:
        "覆盖面说明进入多少审议单元，发言量说明在这些单元中取得多少次发言席；两者不能互相替代。",
      metrics: [
        { value: "21", label: "委员国" },
        { value: "16", label: "有效审议单元" },
        { value: "224", label: "全部可核对发言回合" }
      ],
      points: topCoverage.slice(0, 4).map((item) => ({
        title: `${item.country.code} · 覆盖${item.coverage}单元`,
        body: `${item.totalTurns}个发言回合；最高集中于${item.topUnitIds
          .map((id) => unitById(id)?.short_label)
          .filter(Boolean)
          .join("／") || "无"}`
      })),
      note:
        "连续占用发言席计一回合；主持、秘书处、报告员和咨询机构制度身份已剔除。"
    },
    "member-boxscore": {
      kicker: "专题二 / MEMBER BOXSCORE",
      title: "21国议程7技术统计",
      deck:
        "覆盖、发言、答辩、文本与两类影响分别显示，不生成黑箱综合排名。",
      metrics: [
        { value: "136", label: "国家—审议单元行动" },
        { value: "10", label: "正式／确认文本包" },
        { value: "14", label: "答辩／通过后回应" }
      ],
      points: topTurns.slice(0, 4).map((item) => ({
        title: `${item.country.code} · ${item.totalTurns}回合`,
        body: `覆盖${item.coverage}单元｜提出${item.initiative}｜介入讨论${item.deliberative}`
      })),
      note:
        "发言回合不是发言时长或质量分；同一代表团再次取得发言席重新计数。"
    },
    influence: {
      kicker: "专题二 / TWO-SIDED INFLUENCE",
      title: "影响分为提出议题与介入讨论",
      deck:
        "提出端记录正式文本和程序动议；讨论端只记录能够连接到文字或处理结果的编辑、护栏与折衷。",
      metrics: [
        {
          value: String(sum(countryMetrics.map((item) => item.initiative))),
          label: "提出议题记录"
        },
        {
          value: String(sum(countryMetrics.map((item) => item.coSponsor))),
          label: "共同提出记录"
        },
        {
          value: String(sum(countryMetrics.map((item) => item.deliberative))),
          label: "介入讨论记录"
        }
      ],
      points: [
        ...topInitiative.slice(0, 2).map((item) => ({
          title: `${item.country.code} · 提出${item.initiative}`,
          body: `${item.country.name_zh}在文本主提／联合提交或程序动议端较活跃。`
        })),
        ...topDeliberative.slice(0, 2).map((item) => ({
          title: `${item.country.code} · 介入${item.deliberative}`,
          body: `${item.country.name_zh}留下较多可追溯文字、护栏或折衷结果。`
        }))
      ],
      note: "数字是可追溯记录数，不是质量分或政治影响评分。"
    },
    "agenda-footprint": {
      kicker: "专题二 / AGENDA 7 FOOTPRINT",
      title: "发言集中在哪些保护状况项目",
      deck:
        "发言、答辩与文本／程序行动分开记录，以识别委员国究竟在哪些项目留下足迹。",
      metrics: [
        { value: "18", label: "编码审议单元" },
        { value: "16", label: "覆盖面有效单元" },
        { value: "224", label: "可核对发言回合" }
      ],
      points: unitTurns.slice(0, 4).map((item) => ({
        title: `${item.unit.short_label} · ${item.turns}回合`,
        body: item.unit.matrix_label
      })),
      note:
        "仅通过后回应的7A.30—32和7B.54保留在明细中，但不进入覆盖面分母。"
    },
    "issue-attention": {
      kicker: "专题二 / ISSUE ATTENTION",
      title: "委员国对哪类问题更敏感",
      deck:
        "议题关联度统计某国进入多少个涉及该主题的审议单元，不把每句话强制归入单一主题。",
      metrics: topicRank.slice(0, 3).map((item) => ({
        value: String(item.associations),
        label: item.topic.label
      })),
      points: topicRank.slice(0, 4).map((item) => ({
        title: item.topic.label,
        body: `形成${item.associations}个“委员国—主题审议单元”关联。`
      })),
      note: "主题编码用于本阶段内部比较，不直接跨届归一化。"
    },
    "co-text": {
      kicker: "专题二 / CO-TEXT NETWORK",
      title: "共同文本，而非关系评分",
      deck:
        "共同文本只记录正式主提、共同提出或明确联合提交，不把相似发言和一般性支持混入。",
      metrics: [
        { value: "10", label: "正式／确认文本包" },
        { value: "9", label: "涉及遗产项目" },
        { value: "8", label: "Hampi文本参与国" }
      ],
      points: [
        {
          title: "Hampi · 跨区域触达",
          body: "1国主提、7国共同提出，覆盖全部5个区域组。"
        },
        {
          title: "Victoria Falls · 区域集中",
          body: "4名正式提交者全部来自非洲组。"
        },
        {
          title: "Sundarbans · 跨组桥接",
          body: "4国联合提交，连接3个区域组。"
        },
        {
          title: "证据边界",
          body: "共同署名不证明长期合作、友好关系或所有段落立场一致。"
        }
      ],
      note: "空白表示当前范围内没有可核对共同文本，不表示没有沟通或合作。"
    },
    "agenda-interaction": {
      kicker: "专题二 / AGENDA-LINKED INTERACTION",
      title: "议程协助与立场互动",
      deck: data.agenda_party_network.method_note,
      metrics: [
        {
          value: String(data.agenda_party_network.rows.length),
          label: "正式文本所涉项目"
        },
        { value: "5", label: "区域组均有参与" },
        { value: "0", label: "国家关系综合评分" }
      ],
      points: data.agenda_party_network.highlights.map((item) => ({
        title: `${item.unit} · ${item.label}`,
        body: item.note
      })),
      note: data.agenda_party_network.empty_note
    },
    "baikal-vote": {
      kicker: "专题二 / EXPLICIT ALIGNMENT",
      title: "Baikal延期表决：唯一完整立场分布",
      deck:
        "这次表决明确记录是否把实质辩论延至第49届，但不能替代委员国对列危本身的最终立场。",
      metrics: [
        { value: "14", label: "赞成延期" },
        { value: "5", label: "反对延期" },
        { value: "1", label: "弃权" }
      ],
      points: [
        {
          title: "程序结果",
          body: "实质风险与列危讨论延至第49届。"
        },
        {
          title: "明确少数",
          body: "捷克、波兰、大韩民国、瑞士和乌克兰反对延期。"
        },
        {
          title: "解释边界",
          body: "赞成延期不能自动解释为反对列危。"
        }
      ],
      note: data.votes[0].result
    },
    "stage-findings": {
      kicker: "议程7 / STAGE FINDINGS",
      title: "保护状况审议的阶段读数",
      deck:
        "以下发现只描述本阶段公开可观察的制度行为，不推断幕后协调或长期政治联盟。",
      metrics: [
        { value: "21", label: "委员国" },
        { value: "18", label: "编码审议单元" },
        { value: "224", label: "可核对发言回合" }
      ],
      points: data.findings.slice(0, 4).map((item) => ({
        title: item.title,
        body: item.body
      })),
      note: "ConserVision Research · 48COM Committee Observatory"
    }
  };
  return { ...fallback, ...(configs[key] ?? {}) };
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - r,
      y + height
    );
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  ctx.fill();
}

function wrapCanvasText(
  ctx,
  text,
  x,
  y,
  maxWidth,
  lineHeight,
  maxLines = 3
) {
  const chars = [...String(text)];
  const lines = [];
  let line = "";
  let cursor = 0;
  for (; cursor < chars.length; cursor += 1) {
    const char = chars[cursor];
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = char;
      if (lines.length === maxLines - 1) {
        cursor += 1;
        break;
      }
    } else {
      line = test;
    }
  }
  if (cursor < chars.length) {
    let last = line;
    for (const char of chars.slice(cursor)) {
      if (ctx.measureText(`${last}${char}…`).width > maxWidth) {
        break;
      }
      last += char;
    }
    line = `${last}…`;
  }
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((item, index) => {
    ctx.fillText(item, x, y + index * lineHeight);
  });
  return y + Math.min(lines.length, maxLines) * lineHeight;
}

function drawLegacyShareCard(config) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");
  const sans =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "PingFang SC", sans-serif';
  const mono = '"SFMono-Regular", Consolas, monospace';

  ctx.fillStyle = "#f2f5f8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  roundedRect(ctx, 42, 38, 1516, 824, 26);
  ctx.fillStyle = "#17365f";
  ctx.fillRect(42, 38, 1516, 10);

  ctx.fillStyle = "#17365f";
  ctx.font = `800 27px ${sans}`;
  ctx.fillText("委员国技术统计分析", 82, 94);
  ctx.fillStyle = "#687890";
  ctx.font = `700 16px ${mono}`;
  ctx.fillText("48COM COMMITTEE OBSERVATORY", 82, 121);
  ctx.textAlign = "right";
  ctx.fillStyle = "#17365f";
  ctx.font = `800 23px ${sans}`;
  ctx.fillText("NHC | THU × CONSERVISION", 1518, 99);
  ctx.textAlign = "left";

  ctx.strokeStyle = "#d4dde7";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(82, 148);
  ctx.lineTo(1518, 148);
  ctx.stroke();

  ctx.fillStyle = "#2d629e";
  ctx.font = `700 18px ${mono}`;
  ctx.fillText(config.kicker.toUpperCase(), 82, 191);

  ctx.fillStyle = "#16243a";
  ctx.font = `800 54px ${sans}`;
  let cursorY = wrapCanvasText(ctx, config.title, 82, 252, 1370, 66, 2);
  ctx.fillStyle = "#5e6f87";
  ctx.font = `500 24px ${sans}`;
  cursorY = wrapCanvasText(ctx, config.deck, 82, cursorY + 13, 1390, 36, 2);

  const metricY = Math.max(390, cursorY + 24);
  const metricGap = 20;
  const metricWidth = (1436 - metricGap * 2) / 3;
  config.metrics.slice(0, 3).forEach((item, index) => {
    const x = 82 + index * (metricWidth + metricGap);
    ctx.fillStyle = "#eef3f8";
    roundedRect(ctx, x, metricY, metricWidth, 125, 14);
    ctx.fillStyle = "#17365f";
    ctx.font = `800 45px ${sans}`;
    ctx.fillText(String(item.value), x + 24, metricY + 54);
    ctx.fillStyle = "#65758b";
    ctx.font = `650 19px ${sans}`;
    ctx.fillText(item.label, x + 24, metricY + 91);
  });

  const pointY = metricY + 151;
  const pointGap = 18;
  const pointWidth = (1436 - pointGap) / 2;
  const pointHeight = 122;
  config.points.slice(0, 4).forEach((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 82 + column * (pointWidth + pointGap);
    const y = pointY + row * (pointHeight + 14);
    ctx.fillStyle = index === 0 ? "#f8ecee" : "#f7f9fb";
    roundedRect(ctx, x, y, pointWidth, pointHeight, 12);
    ctx.fillStyle = index === 0 ? "#8a3540" : "#2d629e";
    ctx.fillRect(x, y, 7, pointHeight);
    ctx.fillStyle = "#17263c";
    ctx.font = `750 23px ${sans}`;
    wrapCanvasText(ctx, item.title, x + 24, y + 38, pointWidth - 48, 28, 1);
    ctx.fillStyle = "#627188";
    ctx.font = `500 18px ${sans}`;
    wrapCanvasText(
      ctx,
      item.body,
      x + 24,
      y + 72,
      pointWidth - 48,
      25,
      2
    );
  });

  ctx.fillStyle = "#6a7788";
  ctx.font = `500 16px ${sans}`;
  wrapCanvasText(ctx, config.note, 82, 835, 1320, 22, 1);
  ctx.textAlign = "right";
  ctx.fillStyle = "#2d629e";
  ctx.font = `700 15px ${mono}`;
  ctx.fillText("RESEARCH.CONSERVISION.COM · 2026.07.28", 1518, 835);
  ctx.textAlign = "left";
  return canvas;
}

function showShareToast(message) {
  const toast = $("#share-toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showShareToast.timer);
  showShareToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

async function captureShareSection(section) {
  if (typeof html2canvas !== "function") {
    throw new Error("专题截图组件尚未载入");
  }

  if (document.fonts?.ready) await document.fonts.ready;

  const frame = document.createElement("div");
  frame.className = "share-capture-frame";
  if (section.closest(".findings-wrap")) frame.classList.add("findings-wrap");
  frame.style.top = `${document.documentElement.scrollHeight + 48}px`;

  const clone = section.cloneNode(true);
  clone.classList.add("share-capture-clone");
  clone.removeAttribute("id");
  clone.querySelectorAll("[id]").forEach((element) => {
    element.removeAttribute("id");
  });
  clone.querySelectorAll(".share-image-button").forEach((element) => {
    element.remove();
  });
  clone.querySelectorAll('[aria-pressed="true"]').forEach((element) => {
    element.setAttribute("aria-pressed", "false");
  });
  clone.querySelectorAll("details").forEach((element) => {
    element.open = true;
  });

  frame.append(clone);
  document.body.append(frame);

  try {
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    const scrollContainers = clone.querySelectorAll(
      ".table-scroll, .scatter-scroll, .decision-audit-wrap, .timeline-lane > div"
    );
    const widestContent = Math.max(
      0,
      ...[...scrollContainers].map((element) => element.scrollWidth)
    );
    const captureWidth = Math.max(1280, widestContent + 72);
    frame.style.width = `${captureWidth + 48}px`;
    clone.style.width = `${captureWidth}px`;
    clone.style.maxWidth = "none";
    clone.style.margin = "0";
    scrollContainers.forEach((element) => {
      element.style.overflow = "visible";
      element.style.maxHeight = "none";
    });

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const width = Math.ceil(frame.scrollWidth);
    const height = Math.ceil(frame.scrollHeight);
    const scale = Math.min(
      1.5,
      Math.sqrt(28_000_000 / Math.max(1, width * height))
    );

    return await html2canvas(frame, {
      backgroundColor: section.closest(".findings-wrap")
        ? "#17365f"
        : "#f4f6f8",
      scale,
      useCORS: true,
      logging: false,
      imageTimeout: 8000,
      width,
      height,
      windowWidth: width,
      windowHeight: Math.max(900, height),
      scrollX: 0,
      scrollY: 0
    });
  } finally {
    frame.remove();
  }
}

async function generateShareImage(key, button) {
  const previous = button.innerHTML;
  button.disabled = true;
  button.textContent = "生成中…";
  try {
    const section = document.querySelector(`[data-share-key="${key}"]`);
    if (!section) throw new Error("未找到当前专题");
    const title = section.querySelector("h2")?.textContent ?? "本专题";
    const canvas = await captureShareSection(section);
    const blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (result) =>
          result ? resolve(result) : reject(new Error("无法生成PNG图像")),
        "image/png",
        1
      )
    );
    button.dataset.lastExportBytes = String(blob.size);
    button.dataset.lastExportWidth = String(canvas.width);
    button.dataset.lastExportHeight = String(canvas.height);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `48COM-${key}-section.png`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showShareToast(`已截取“${title}”专题分析`);
  } catch (error) {
    console.error(error);
    showShareToast("分享图生成失败，请稍后重试");
  } finally {
    button.disabled = false;
    button.innerHTML = previous;
  }
}

function installShareButtons() {
  document.querySelectorAll("[data-share-key]").forEach((section) => {
    const heading = section.querySelector(".section-heading");
    if (!heading || heading.querySelector(".share-image-button")) return;
    heading.classList.add("has-share-button");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "share-image-button";
    button.dataset.html2canvasIgnore = "true";
    button.innerHTML = '<span aria-hidden="true">↗</span> 生成分享图';
    button.setAttribute(
      "aria-label",
      `生成“${heading.querySelector("h2")?.textContent ?? "本专题"}”PNG分享图`
    );
    button.addEventListener("click", () =>
      generateShareImage(section.dataset.shareKey, button)
    );
    heading.append(button);
  });
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
  renderAgendaPartyNetwork();
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
  renderIntegrityAudit();
  renderProcessTrace();
  renderViennaMemberRoles();
  renderAgendaIntegrity();
  renderAmendmentRoleStats();
  renderMetrics();
  renderRegionLegend();
  renderFindings();
  renderSources();
  renderAll();
  bindControls();
  installShareButtons();
}

init().catch((error) => {
  console.error(error);
  const main = $("#main");
  const message = document.createElement("p");
  message.className = "load-error";
  message.textContent = "统计数据暂时无法载入。请通过本地或正式站点服务器打开页面，或直接下载JSON数据。";
  main.prepend(message);
});
