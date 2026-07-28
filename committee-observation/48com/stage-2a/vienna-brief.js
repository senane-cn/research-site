import { whc48LogoBase64 } from "../stage-1/assets/whc48-logo.generated.js";

const DATA_URL = "data/phase-2a.json?v=1.5.0";

const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const $ = (selector) => document.querySelector(selector);

function actorChips(ids, countries, tone) {
  return ids
    .map((id) => {
      const country = countries.get(id);
      return `<span class="brief-actor brief-actor-${escapeHTML(tone)}"><b>${escapeHTML(
        country.code
      )}</b><span>${escapeHTML(country.name_zh)}</span></span>`;
    })
    .join("");
}

async function init() {
  $("#brief-conference-logo").src = `data:image/svg+xml;base64,${whc48LogoBase64}`;
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const divides = data.integrity_audit.vienna.role_divides;
  const countries = new Map(data.countries.map((country) => [country.id, country]));

  $("#brief-dynamic-title").textContent = divides.brief_title;
  $("#brief-takeaway").textContent = divides.brief_takeaway;
  $("#brief-version").textContent = ` · v${data.metadata.version}`;

  $("#brief-axes").innerHTML = divides.axes
    .map(
      (axis) => `
        <article class="brief-axis brief-axis-${escapeHTML(axis.id)}">
          <header><span>${escapeHTML(axis.number)}</span><h2>${escapeHTML(axis.question)}</h2></header>
          <section class="brief-pole brief-pole-constraint">
            <strong>${escapeHTML(axis.left.label)}</strong>
            <div>${actorChips(axis.left.actors, countries, "constraint")}</div>
          </section>
          <div class="brief-opposition"><i></i><span>${escapeHTML(axis.brief_relation)}</span><i></i></div>
          <section class="brief-pole brief-pole-advance">
            <strong>${escapeHTML(axis.right.label)}</strong>
            <div>${actorChips(axis.right.actors, countries, "advance")}</div>
          </section>
        </article>`
    )
    .join("");

  $("#brief-chain").innerHTML = divides.decision_flow
    .map(
      (item) => `
        <article class="brief-chain-node brief-chain-${escapeHTML(item.tone)}">
          <strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span>
        </article>`
    )
    .join("");

  $("#brief-crossovers").innerHTML = divides.crossovers
    .map((item) => {
      const country = countries.get(item.country);
      return `
        <article>
          <b>${escapeHTML(country.code)}</b>
          <p><span>${escapeHTML(item.from)}</span><i>→</i><span>${escapeHTML(item.to)}</span></p>
        </article>`;
    })
    .join("");

  $("#brief-after-actors").innerHTML = actorChips(
    divides.after_decision.actors,
    countries,
    "dissociate"
  );
  $("#brief-after-note").textContent = divides.after_decision.note;
}

init().catch(() => {
  document.body.classList.add("has-load-error");
  $("#brief-takeaway").textContent =
    "摘要数据暂时无法载入，请从本地或正式站点服务器打开，或返回完整分析页面。";
});
