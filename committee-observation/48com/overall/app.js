const $ = (selector) => document.querySelector(selector);

const escapeHTML = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const statusLabels = {
  explicit_current: "决定明确",
  partial_current: "决定部分明确",
  not_verified: "研究待完成",
  not_stated_confirmed: "决定未明确",
  not_applicable: "不适用"
};

const statusClasses = {
  explicit_current: "explicit",
  partial_current: "partial",
  not_verified: "research",
  not_stated_confirmed: "missing",
  not_applicable: "na"
};

const elementLabels = {
  action: "I10-A 行动",
  actor: "I10-B 责任主体",
  deadline: "I10-C 期限",
  verification: "I10-D 核验",
  consequence: "I10-E 反馈／处置"
};

const readinessLabels = {
  publish_now: "可公开",
  publish_as_context: "作为背景公开",
  publish_after_verification: "复核后公开",
  publish_after_formal_decisions: "正式文本后公开",
  case_only: "仅作案例",
  hold: "暂缓",
  internal_only: "仅内部",
  prohibited: "不生成"
};

const modelColors = {
  strategy_policy: "#245f97",
  rule_mechanism: "#6d5594",
  resource_finance: "#a36e24",
  site_conservation: "#24715b",
  nomination_followup: "#984656"
};

const sampleLabels = {
  public_candidate: "公开基线",
  hold: "暂缓总体发布",
  case_only: "案件解释",
  internal_only: "内部敏感性"
};

function renderHero(data) {
  const time = data.time_baseline;
  const tracking = data.longitudinal_tracking;
  $("#page-title").textContent = data.title;
  $("#hero-summary").textContent = data.hero_summary;
  const metrics = [
    [time.agenda_minutes.toLocaleString("zh-CN"), "可纳入统计的审议时长", `议程5—12；按起止点估算，合计约±${time.uncertainty_minutes}分钟`],
    [time.member_turns_lower_bound, "可纳入统计的委员国发言回合", `连续发言计1回合；${time.verified_turns}核定＋${time.lower_bound_turns}保守下限`],
    [time.agenda_units, "纳入本届统计的议程／子议程", "覆盖议程5—12"],
    [`${tracking.comparison_sessions.length}届`, "纳入部分专题对照的大会届次", `${tracking.comparison_sessions[0]}—${tracking.comparison_sessions.at(-1)}；统一比较议程5—12`]
  ];
  $("#hero-metrics").innerHTML = metrics.map(([value, label, note]) => `
    <article><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span><small>${escapeHTML(note)}</small></article>`).join("");

  $("#indicator-summary").innerHTML = `
    <article><strong>${tracking.indicator_count}</strong><span>项可操作评估指标</span></article>
    <article><strong>${tracking.group_count}</strong><span>类观察对象</span></article>
    <div><b>用于长期跟踪评估委员国参会状态与大会议事成效</b><small>委员国参与5项，时间使用3项，决定形成1项，行动可执行性1项；${tracking.baseline_count}项已建立48COM基线，${tracking.method_review_count}项继续复核方法。</small></div>`;

  $("#tracking-framework").innerHTML = `
    <header><strong>${tracking.indicator_count}项评估指标</strong><span>${tracking.group_count}类观察对象；逐项列明目标、方法、单位与数据来源</span><small>${tracking.baseline_count}项已建基线 · ${tracking.method_review_count}项方法复核中</small></header>
    <div class="tracking-groups">${tracking.groups.map((group) => `
      <article>
        <h2>${escapeHTML(group.label)}<small>${group.count}项</small></h2>
        <ol>${group.indicators.map((indicator) => `
          <li id="indicator-${escapeHTML(indicator.code)}">
            <a href="#${escapeHTML(indicator.target)}">
              <header><b>${escapeHTML(indicator.code)}</b><strong>${escapeHTML(indicator.label)}</strong><em class="${escapeHTML(indicator.status)}">${escapeHTML(tracking.status_labels[indicator.status])}</em></header>
              <p><span>目标</span>${escapeHTML(indicator.purpose)}</p>
              <p><span>方法</span>${escapeHTML(indicator.method)}</p>
              <small><b>单位</b>${escapeHTML(indicator.unit)}<b>数据</b>${escapeHTML(indicator.source)}</small>
            </a>
          </li>`).join("")}</ol>
      </article>`).join("")}
    </div>
    <small>${escapeHTML(tracking.boundary)}</small>`;
}

function renderIndicatorLabels(data) {
  const indicators = new Map(data.longitudinal_tracking.groups.flatMap((group) => group.indicators).map((item) => [item.code, item]));
  const assignments = [
    ["#member-overall-section .section-heading > div", ["I01", "I02", "I05"]],
    ["#member-concentration-section .section-heading > div", ["I04"]],
    ["#cotext-overall-section .section-heading > div", ["I05"]],
    [".participation-history .section-heading > div", ["I02"]],
    ["#time-audit-section .section-heading > div", ["I06", "I07", "I08"]],
    ["#overall-analysis-section .section-heading > div", ["I01", "I03"]],
    ["#historical-section .section-heading > div", ["I02"]],
    ["#judgment-sample-section .section-heading > div", ["I09"]],
    ["#execution .section-heading > div", ["I10"]]
  ];
  assignments.forEach(([selector, codes]) => {
    const host = $(selector);
    if (!host || host.querySelector(":scope > .indicator-tags")) return;
    const tags = document.createElement("div");
    tags.className = "indicator-tags";
    tags.setAttribute("aria-label", "本模块对应指标");
    tags.innerHTML = codes.map((code) => {
      const item = indicators.get(code);
      return item ? `<a href="#indicator-${escapeHTML(code)}"><b>${escapeHTML(code)}</b><span>${escapeHTML(item.label)}</span></a>` : "";
    }).join("");
    host.prepend(tags);
  });

  const observations = [
    ["#census-section .section-heading > div", "结构观察 · 不计入核心指标"],
    ["#time-role-section .section-heading > div", "机制观察 · 七案分层样本"],
    ["#judgment-sample-section .chain-section-heading", "机制观察 · 四条典型纠正链"],
    ["#judgment-sample-section .standard-consistency-heading", "案件观察 · 初步比较"],
    ["#execution .other-agenda-heading", "探索案例 · 尚不作类型概括"],
    ["#execution .continuity-subheading", "案件观察 · 三项跨届任务"]
  ];
  observations.forEach(([selector, label]) => {
    const host = $(selector);
    if (!host || host.querySelector(":scope > .observation-tag")) return;
    const tag = document.createElement("span");
    tag.className = "observation-tag";
    tag.textContent = label;
    const heading = host.querySelector("h2, h3");
    host.insertBefore(tag, heading || null);
  });
}

function renderDeliberationSample(data) {
  const sample = data.deliberation_sample;
  const target = sample.executability_target;
  const majorChangeCount = sample.outcome_groups.find((item) => item.id === "major_outcome_change")?.count || 0;
  const otherSubstantiveCount = sample.outcome_groups.find((item) => item.id === "other_substantive_change")?.count || 0;
  $("#sample-scope").innerHTML = [
    [sample.case_units, "上会讨论个案", "15项议程7＋11项议程8"],
    [majorChangeCount + otherSubstantiveCount, "改变决定草案", `${majorChangeCount}项重大结果改变＋${otherSubstantiveCount}项其他实质改变`],
    [majorChangeCount, "重大结果方向改变", "议程7为2案＋议程8为6案"],
    [target.case_count, "可执行性全样本", "形成修订或完整文本的20案"]
  ].map(([value, label, note]) => `<article><strong>${value}</strong><span>${escapeHTML(label)}</span><small>${escapeHTML(note)}</small></article>`).join("");

  const max = Math.max(...sample.outcome_groups.map((item) => item.count));
  $("#decision-outcome-bars").innerHTML = sample.outcome_groups.map((item) => `
    <article class="outcome-row ${escapeHTML(item.id)}">
      <div><strong>${escapeHTML(item.label)}</strong><span>${escapeHTML(item.note)}</span></div>
      <div class="outcome-track" role="img" aria-label="${escapeHTML(`${item.label}，${item.count}个案`)}"><i style="width:${(item.count / max * 100).toFixed(1)}%"></i></div>
      <b>${item.count}</b>
    </article>`).join("");

  $("#execution-scope").innerHTML = `
    <div><strong>${target.case_count}</strong><span>目标全样本</span><p>${escapeHTML(target.definition)}</p></div>
    <div><strong>${target.agenda_7_cases} + ${target.agenda_8_cases}</strong><span>议程7＋议程8</span><p>按决定类型分别检验，不合成闭环总分。</p></div>
    <div><strong>${target.onsite_texts_reconstructed}／${target.case_count}</strong><span>证据链已建立</span><p>${target.full_paragraph_reconstructions}案逐段重建＋${target.formal_text_plus_final_screen}案正式文本与现场通过画面。</p></div>
    <p class="execution-boundary"><b>另列而非判缺失：</b>${escapeHTML(target.excluded_from_five_element_audit)}</p>`;
}

function renderDecisionIndicators(data) {
  const host = $("#decision-indicator-grid");
  if (!host || !data.decision_formation_indicators) return;
  host.innerHTML = data.decision_formation_indicators.map((item) => `
    <article>
      <header><b>${escapeHTML(item.code)}</b><h4>${escapeHTML(item.label)}</h4></header>
      <dl>
        <div><dt>观察目的</dt><dd>${escapeHTML(item.purpose)}</dd></div>
        <div><dt>数据来源</dt><dd>${escapeHTML(item.sources)}</dd></div>
        <div><dt>分析方法</dt><dd>${escapeHTML(item.method)}</dd></div>
        <div><dt>跨届复用</dt><dd>${escapeHTML(item.reuse)}</dd></div>
      </dl>
    </article>`).join("");
}

function renderFullSampleExecution(sample) {
  const typeLabels = { strict: "强闭环预期", standard: "标准闭环预期", limited: "有限闭环预期" };
  const fullStatusLabels = sample.status_labels;

  $("#execution-findings").innerHTML = sample.findings.map((item) => `
    <article><strong>${escapeHTML(item.value)}</strong><div><span>${escapeHTML(item.label)}</span><p>${escapeHTML(item.note)}</p></div></article>`).join("");

  $("#element-distribution").innerHTML = sample.elements.map((element) => {
    const counts = sample.counts[element.id];
    const segments = ["explicit", "partial", "missing"].filter((status) => counts[status] > 0).map((status) => `
      <i class="${status}" style="width:${counts[status] / sample.cases.length * 100}%"><span>${fullStatusLabels[status]} ${counts[status]}</span></i>`).join("");
    return `<article><header><strong><b>${escapeHTML(element.code)}</b>${escapeHTML(element.label)}</strong><small><span class="count-total">20案</span><span class="count-detail">明确${counts.explicit} · 部分${counts.partial} · 未明确${counts.missing}</span></small></header><div class="element-track" role="img" aria-label="${escapeHTML(`${element.code} ${element.label}：明确${counts.explicit}，部分${counts.partial}，未明确${counts.missing}`)}">${segments}</div></article>`;
  }).join("");

  const head = `<div class="audit-matrix-row audit-matrix-head"><span>案件／类型</span>${sample.elements.map((element) => `<b><small>${escapeHTML(element.code)}</small>${escapeHTML(element.label)}</b>`).join("")}<span>期限与风险提示</span></div>`;
  const rows = sample.cases.map((item, index) => {
    const cells = sample.elements.map((element) => `<b class="audit-status ${item[element.id]}" title="${escapeHTML(element.label)}：${escapeHTML(fullStatusLabels[item[element.id]])}">${escapeHTML(fullStatusLabels[item[element.id]])}</b>`).join("");
    const divider = index === 9 ? " agenda-divider" : "";
    return `<div class="audit-matrix-row${divider}">
      <span class="audit-case"><em>${escapeHTML(item.id)}</em><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.type)} · ${typeLabels[item.expectation]}</small></span>
      ${cells}
      <span class="audit-note"><strong>${escapeHTML(item.deadline_note)}</strong><small>${escapeHTML(item.risk_note)}</small></span>
    </div>`;
  }).join("");
  $("#full-audit-matrix").innerHTML = head + rows;

  const riskHost = $("#closure-risk-summary");
  if (riskHost) {
    const risks = [
      ["deadline", "期限不完整", "任务可能被延后，委员会也难以判断何时应再次审议。"],
      ["verification", "核验标准不完整", "即使提交报告，也可能缺少判断任务是否完成的共同阈值。"],
      ["feedback", "反馈／处置不完整", "结果返回委员会后，未必能够直接对应继续、调整或升级响应。"]
    ];
    riskHost.innerHTML = risks.map(([id, label, consequence]) => {
      const counts = sample.counts[id];
      const incomplete = counts.partial + counts.missing;
      return `<article><strong>${incomplete}／${sample.cases.length}</strong><div><span>${escapeHTML(label)}</span><p>${escapeHTML(consequence)}</p><small>部分明确${counts.partial}案 · 未明确${counts.missing}案</small></div></article>`;
    }).join("");
  }
}

function renderStructure(data) {
  $("#structure-grid").innerHTML = data.structural_context.map((item, index) => `
    <article>
      <span>0${index + 1}</span>
      <strong>${escapeHTML(item.value)}</strong>
      <h3>${escapeHTML(item.label)}</h3>
      <p>${escapeHTML(item.detail)}</p>
    </article>`).join("");
}

function renderTime(data) {
  const time = data.time_baseline;
  $("#time-summary").innerHTML = [
    [time.agenda_units, "议程／子议程", "覆盖议程5—12"],
    ["42.5%", "保护状况时间份额", "1,262分钟"],
    ["28.7%", "提名与列入时间份额", "854分钟"],
    ["5.7%", "执行机制时间份额", "170分钟"]
  ].map(([value, label, note]) => `<article><strong>${value}</strong><span>${label}</span><small>${note}</small></article>`).join("");

  const max = Math.max(...time.families.map((item) => item.minutes));
  $("#time-bars").innerHTML = time.families.map((item, index) => `
    <div class="bar-row" style="--bar-color:${modelColors[["strategy_policy", "site_conservation", "nomination_followup", "rule_mechanism"][index]]}">
      <div class="bar-label"><span>${escapeHTML(item.label)}</span><b>${item.minutes.toLocaleString("zh-CN")}分钟 · ${item.share}%</b></div>
      <div class="bar-track" role="img" aria-label="${escapeHTML(`${item.label}，${item.minutes}分钟，占${item.share}%`)}"><i style="width:${(item.minutes / max * 100).toFixed(1)}%"></i></div>
    </div>`).join("");

  $("#sample-list").innerHTML = time.samples.map((item) => `
    <article class="sample-item ${escapeHTML(item.readiness)}">
      <div><strong>${escapeHTML(item.label)}</strong><b>${item.minutes.toLocaleString("zh-CN")}分钟</b></div>
      <span>${escapeHTML(sampleLabels[item.readiness])}</span>
      <p>${escapeHTML(item.role)}</p>
      <small>${escapeHTML(item.boundary)}</small>
    </article>`).join("");
}

function renderChains(data) {
  $("#chain-list").innerHTML = data.correction_chains.map((item) => {
    const steps = [
      ["01", "初始论断", item.initial_actor, item.initial_claim],
      ["02", "专业／规则澄清", item.clarifier, item.clarification],
      ["03", "发言方反应", item.response_label, item.response_detail],
      ["04", "文本与结果", item.text_result_label || (item.text_effect === "yes" ? "进入文本" : "未进入文本"), item.text_effect_detail]
    ];
    return `<article class="chain-card">
      <header><div><span>${escapeHTML(item.agenda)}</span><h3>${escapeHTML(item.case_zh)}</h3></div><b class="chain-state ${item.completeness === "partial" ? "partial" : "complete"}">${item.completeness === "partial" ? "部分链条" : "当前链条完整"}</b></header>
      <p class="chain-public-conclusion"><b>本案结论</b><span>${escapeHTML(item.public_conclusion)}</span></p>
      <div class="chain-steps">${steps.map(([no, label, actor, detail]) => `
        <div class="chain-step"><b>${no}</b><span>${escapeHTML(label)}</span><strong>${escapeHTML(actor)}</strong><p>${escapeHTML(detail)}</p></div>`).join("")}</div>
      <footer><strong>${item.outcome_relation === "supported" ? "可以确认文本影响" : "不能证明单一因果"}</strong><p>${escapeHTML(item.outcome_detail)}</p></footer>
    </article>`;
  }).join("");
}

function renderExecution(data) {
  const modelMap = Object.fromEntries(data.closure_models.map((item) => [item.id, item]));

  $("#depth-list").innerHTML = data.closure_depth.map((item, index) => `
    <article><b>0${index + 1}</b><div><strong>${escapeHTML(item.label)}</strong><p>${escapeHTML(item.question)}</p><small>${escapeHTML(item.boundary)}</small></div></article>`).join("");

  $("#closure-models").innerHTML = data.closure_models.map((item) => `
    <article class="closure-model" style="--model-color:${modelColors[item.id]}">
      <header><span>${escapeHTML(item.short_label)}</span><h3>${escapeHTML(item.label)}</h3></header>
      <p>${escapeHTML(item.applies_to)}</p>
      <dl>
        <div><dt>行动</dt><dd>${escapeHTML(item.action_test)}</dd></div>
        <div><dt>核验</dt><dd>${escapeHTML(item.verification_test)}</dd></div>
        <div><dt>反馈出口</dt><dd>${escapeHTML(item.feedback_endpoint)}</dd></div>
      </dl>
      <small>本页样本：${escapeHTML(item.prototype_cases.join("；"))}</small>
    </article>`).join("");

  const renderExecutionRows = (items) => items.map((item) => {
    const model = modelMap[item.closure_type];
    const cells = Object.keys(elementLabels).map((key) => {
      const cell = item.elements[key];
      return `<td class="audit-cell ${statusClasses[cell.status]}" data-label="${elementLabels[key]}"><strong>${statusLabels[cell.status]}</strong><span>${escapeHTML(cell.text)}</span></td>`;
    }).join("");
    const versionSummary = `原草案：${item.draft.summary}；委员国修订：${item.member_revision.summary}；现场通过：${item.final.summary}`;
    return `<tr tabindex="0" title="${escapeHTML(versionSummary)}">
      <th scope="row" class="case-cell">
        <span>${escapeHTML(item.agenda)} · ${escapeHTML(model.short_label)}</span>
        <strong>${escapeHTML(item.case_zh)}</strong>
        <small class="source-badge">现场通过文本已重建</small>
        <small>正式汇编尚未发布</small>
      </th>${cells}
    </tr>`;
  }).join("");

  const agenda78Cases = data.decision_executability.filter((item) => /^(7|8)/.test(item.agenda));
  const otherAgendaCases = data.decision_executability.filter((item) => !/^(7|8)/.test(item.agenda));
  $("#execution-body-78").innerHTML = renderExecutionRows(agenda78Cases);
  $("#execution-body-other").innerHTML = renderExecutionRows(otherAgendaCases);

  const renderContinuityCards = (items, type) => items.map((item) => `
    <article class="continuity-card">
      <header><h4>${escapeHTML(item.cases_zh)}</h4><span>${type === "task" ? "任务连续性" : "标准一致性"}</span></header>
      <div><section><b>${type === "task" ? "既有任务链" : "比较基线"}</b><p>${escapeHTML(item.earlier_baseline)}</p></section><section><b>本届处理</b><p>${escapeHTML(item.current_handling)}</p></section></div>
      <p><strong>初步判断：</strong>${escapeHTML(item.preliminary_assessment)}</p>
      <small><b>仍需：</b>${escapeHTML(item.source_needs.join("；"))}</small>
    </article>`).join("");

  const taskSamples = data.continuity_samples.filter((item) => item.sample_type === "task_continuity");
  const standardSamples = data.continuity_samples.filter((item) => item.sample_type === "standard_consistency");
  $("#continuity-grid").innerHTML = renderContinuityCards(taskSamples, "task");
  $("#standard-consistency-grid").innerHTML = renderContinuityCards(standardSamples, "standard");
}

function renderCases(data) {
  $("#deep-cases").innerHTML = data.recommended_deep_cases.map((item, index) => `
    <article><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHTML(item.case)}</strong><p>${escapeHTML(item.why)}</p></article>`).join("");
}

function renderReadiness(data) {
  $("#readiness-list").innerHTML = data.publication_readiness.map((item) => `
    <article>
      <strong>${escapeHTML(item.metric)}</strong>
      <span class="readiness ${escapeHTML(item.status)}">${escapeHTML(readinessLabels[item.status])}</span>
      <p>${escapeHTML(item.condition)}</p>
    </article>`).join("");
}

async function init() {
  try {
    const [response, auditResponse] = await Promise.all([
      fetch("data/overall-public.json", { cache: "no-store" }),
      fetch("data/full-sample-executability.json", { cache: "no-store" })
    ]);
    if (!response.ok || !auditResponse.ok) throw new Error(`数据请求失败：${response.status}/${auditResponse.status}`);
    const [data, fullSampleAudit] = await Promise.all([response.json(), auditResponse.json()]);
    renderHero(data);
    renderDeliberationSample(data);
    renderChains(data);
    renderFullSampleExecution(fullSampleAudit);
    renderExecution(data);
    renderIndicatorLabels(data);
    document.documentElement.dataset.ready = "true";
  } catch (error) {
    const box = $("#page-error");
    if (box) {
      box.hidden = false;
      box.textContent = `页面数据暂时无法载入。${error.message}`;
    } else {
      console.error(error);
    }
  }
}

init();
