(function () {
  const data = window.FTG_PHASE2_DATA;
  if (!data) return;

  const $ = (selector) => document.querySelector(selector);
  const fmt = new Intl.NumberFormat("en-US");

  function setMetrics() {
    document.querySelectorAll("[data-metric]").forEach((node) => {
      const key = node.getAttribute("data-metric");
      if (data.metrics[key] !== undefined) node.textContent = fmt.format(data.metrics[key]);
    });
  }

  function shortCode(code) {
    return code.replace("_HISTORIC_BUILDINGS_ENSEMBLES", "").replace("_CULTURAL_LANDSCAPES_PARKS_GARDENS", "").replace("_AGRI_INDUSTRIAL_TECH", "");
  }

  function escapeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[ch]);
  }

  function truncate(value, max) {
    const text = String(value ?? "");
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  function renderBarChart() {
    const root = $("#bar-chart");
    if (!root) return;
    const rows = data.typology;
    const width = 840;
    const rowH = 30;
    const labelW = 258;
    const plotW = 470;
    const top = 26;
    const height = top + rows.length * rowH + 18;
    const max = Math.max(...rows.map((d) => Math.max(d.final, d.table5)));
    const sx = (v) => (v / max) * plotW;
    const ticks = [0, 100, 200, 300, 400].filter((v) => v <= max + 30);
    const parts = [
      `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Final counts compared with FTG Table 5">`,
      `<text x="${labelW}" y="13" class="chart-label">final</text>`,
      `<text x="${labelW + 64}" y="13" class="chart-label">Table 5</text>`,
      `<rect x="${labelW - 18}" y="5" width="11" height="7" class="bar-final"></rect>`,
      `<rect x="${labelW + 46}" y="5" width="11" height="7" class="bar-table"></rect>`,
    ];
    ticks.forEach((t) => {
      const x = labelW + sx(t);
      parts.push(`<line x1="${x}" x2="${x}" y1="${top - 8}" y2="${height - 16}" class="grid-line"></line>`);
      parts.push(`<text x="${x}" y="${height - 4}" text-anchor="middle" class="axis-label">${t}</text>`);
    });
    rows.forEach((d, i) => {
      const y = top + i * rowH;
      parts.push(`<text x="0" y="${y + 16}" class="chart-label chart-label-code">${shortCode(d.code)}</text>`);
      parts.push(`<rect x="${labelW}" y="${y + 3}" width="${sx(d.final)}" height="9" class="bar-final"><title>${d.code}: final ${d.final}</title></rect>`);
      parts.push(`<rect x="${labelW}" y="${y + 15}" width="${sx(d.table5)}" height="7" class="bar-table"><title>${d.code}: Table 5 ${d.table5}</title></rect>`);
      parts.push(`<text x="${labelW + sx(d.final) + 6}" y="${y + 11}" class="chart-value">${d.final}</text>`);
    });
    parts.push("</svg>");
    root.innerHTML = parts.join("");
  }

  function renderDiffChart() {
    const root = $("#diff-chart");
    if (!root) return;
    const rows = data.typology;
    const width = 680;
    const rowH = 30;
    const labelW = 232;
    const plotW = 390;
    const top = 26;
    const height = top + rows.length * rowH + 24;
    const extent = Math.max(...rows.map((d) => Math.abs(d.diff)));
    const half = plotW / 2;
    const zero = labelW + half;
    const sx = (v) => (Math.abs(v) / extent) * half;
    const parts = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Difference from FTG Table 5">`];
    parts.push(`<line x1="${zero}" x2="${zero}" y1="${top - 8}" y2="${height - 14}" class="zero-line"></line>`);
    rows.forEach((d, i) => {
      const y = top + i * rowH;
      const w = sx(d.diff);
      const x = d.diff >= 0 ? zero : zero - w;
      parts.push(`<text x="0" y="${y + 15}" class="chart-label chart-label-code">${shortCode(d.code)}</text>`);
      parts.push(`<rect x="${x}" y="${y + 4}" width="${w}" height="12" class="${d.diff >= 0 ? "diff-positive" : "diff-negative"}"><title>${d.code}: ${d.diff > 0 ? "+" : ""}${d.diff}</title></rect>`);
      parts.push(`<text x="${d.diff >= 0 ? x + w + 6 : x - 6}" y="${y + 14}" text-anchor="${d.diff >= 0 ? "start" : "end"}" class="chart-value">${d.diff > 0 ? "+" : ""}${d.diff}</text>`);
    });
    parts.push("</svg>");
    root.innerHTML = parts.join("");
  }

  function renderTypologyTable() {
    const tbody = $("#typology-table tbody");
    if (!tbody) return;
    tbody.innerHTML = data.typology.map((d) => `
      <tr>
        <td>${d.code}</td>
        <td>${d.label}</td>
        <td>${d.final}</td>
        <td>${d.table5}</td>
        <td>${d.diff > 0 ? "+" : ""}${d.diff}</td>
        <td>${d.interpretation}</td>
      </tr>
    `).join("");
  }

  function renderCalibration() {
    const root = $("#calibration-chart");
    if (!root) return;
    const max = Math.max(...data.calibration.flatMap((d) => [d.before, d.after]));
    root.innerHTML = data.calibration.map((d) => {
      const w = 148;
      const h = 96;
      const maxBar = 54;
      const before = Math.max(2, (d.before / max) * maxBar);
      const after = Math.max(2, (d.after / max) * maxBar);
      const base = 72;
      return `
        <div class="calibration-item">
          <h3>${d.label}</h3>
          <svg viewBox="0 0 ${w} ${h}" aria-label="${d.label} before after">
            <line x1="24" x2="96" y1="${base}" y2="${base}" class="grid-line"></line>
            <rect x="32" y="${base - before}" width="18" height="${before}" class="bar-table"></rect>
            <rect x="70" y="${base - after}" width="18" height="${after}" class="bar-final"></rect>
            <text x="41" y="88" text-anchor="middle" class="chart-label">before</text>
            <text x="79" y="88" text-anchor="middle" class="chart-label">after</text>
            <text x="41" y="${base - before - 5}" text-anchor="middle" class="chart-value">${d.before}</text>
            <text x="79" y="${base - after - 5}" text-anchor="middle" class="chart-value">${d.after}</text>
          </svg>
          <p>${d.note}</p>
        </div>
      `;
    }).join("");
  }

  function renderTypologyNetwork() {
    const root = $("#typology-network");
    if (!root || !data.typologyNetwork) return;
    const typologies = data.typologyNetwork.typologies;
    const properties = data.typologyNetwork.properties;
    const edges = data.typologyNetwork.edges;
    const width = 1120;
    const height = 690;
    const leftX = 78;
    const top = 42;
    const rowH = 43;
    const colXs = [548, 770, 992];
    const propertyRows = 14;
    const propTop = 38;
    const propRowH = 44;
    const typologyY = new Map(typologies.map((d, i) => [d.code, top + i * rowH]));
    const propPosition = new Map();
    properties.forEach((d, i) => {
      const col = Math.floor(i / propertyRows);
      const row = i % propertyRows;
      propPosition.set(d.id, { x: colXs[col], y: propTop + row * propRowH });
    });

    const parts = [
      `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Typology property bipartite network">`,
      `<text x="${leftX}" y="18" class="chart-label">FTG typology categories</text>`,
      `<text x="528" y="18" class="chart-label">representative high-overlap properties</text>`,
    ];
    edges.forEach((edge) => {
      const y1 = typologyY.get(edge.typology_code);
      const p = propPosition.get(edge.property_id);
      if (!p || y1 === undefined) return;
      const mid = (leftX + p.x) / 2;
      parts.push(`<path d="M ${leftX + 10} ${y1} C ${mid} ${y1}, ${mid} ${p.y}, ${p.x - 8} ${p.y}" class="network-edge"><title>${edge.typology_code} → P-${edge.property_id}</title></path>`);
    });
    typologies.forEach((d) => {
      const y = typologyY.get(d.code);
      const radius = 4 + Math.sqrt(d.final) * 0.45;
      parts.push(`<circle cx="${leftX}" cy="${y}" r="${radius.toFixed(1)}" class="network-node-type"><title>${d.code}: ${d.final} main labels</title></circle>`);
      parts.push(`<text x="${leftX + 18}" y="${y + 4}" class="network-label">${escapeText(shortCode(d.code))}</text>`);
    });
    properties.forEach((d) => {
      const p = propPosition.get(d.id);
      const radius = 4 + d.count * 1.25;
      parts.push(`<circle cx="${p.x}" cy="${p.y}" r="${radius}" class="network-node-property"><title>P-${d.id}: ${escapeText(d.name)}; ${d.count} main labels</title></circle>`);
      parts.push(`<text x="${p.x + 12}" y="${p.y - 2}" class="network-property-label">${escapeText(truncate(d.name, 27))}</text>`);
      parts.push(`<text x="${p.x + 12}" y="${p.y + 12}" class="network-property-meta">P-${d.id} · ${d.count}</text>`);
    });
    parts.push(`<text x="${leftX}" y="${height - 14}" class="axis-label">${escapeText(data.typologyNetwork.note)}</text>`);
    parts.push("</svg>");
    root.innerHTML = parts.join("");
  }

  function renderThemeTypologyMatrix() {
    const root = $("#theme-typology-matrix");
    if (!root || !data.themeTypology) return;
    const themes = data.themeTypology.themes;
    const typologies = data.themeTypology.typologies;
    const cells = data.themeTypology.cells;
    const width = 1120;
    const labelW = 332;
    const top = 74;
    const cellW = 52;
    const rowH = 42;
    const height = top + themes.length * rowH + 42;
    const max = Math.max(...cells.map((d) => d.count), 1);
    const themeY = new Map(themes.map((d, i) => [d, top + i * rowH]));
    const typeX = new Map(typologies.map((d, i) => [d.code, labelW + i * cellW]));
    const parts = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Theme typology co-occurrence matrix">`];
    typologies.forEach((d) => {
      const x = typeX.get(d.code);
      parts.push(`<text x="${x}" y="42" class="matrix-code" transform="rotate(-45 ${x} 42)">${escapeText(d.code.slice(0, 3))}</text>`);
    });
    themes.forEach((theme) => {
      const y = themeY.get(theme);
      parts.push(`<line x1="${labelW - 10}" x2="${labelW + typologies.length * cellW - 16}" y1="${y}" y2="${y}" class="matrix-row-line"></line>`);
      parts.push(`<text x="0" y="${y + 4}" class="matrix-theme-label">${escapeText(truncate(theme, 42))}</text>`);
    });
    cells.forEach((d) => {
      const x = typeX.get(d.typology_code);
      const y = themeY.get(d.theme);
      if (x === undefined || y === undefined) return;
      const r = 2 + Math.sqrt(d.count / max) * 13;
      parts.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" class="matrix-dot"><title>${escapeText(d.theme)} × ${d.typology_code}: ${d.count}</title></circle>`);
      if (d.count >= max * 0.35) {
        parts.push(`<text x="${x}" y="${y + 4}" text-anchor="middle" class="matrix-value">${d.count}</text>`);
      }
    });
    parts.push(`<text x="0" y="${height - 10}" class="axis-label">${escapeText(data.themeTypology.note)}</text>`);
    parts.push("</svg>");
    root.innerHTML = parts.join("");
  }

  function formatRate(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
    return `${Math.round(Number(value) * 100)}%`;
  }

  function renderThemeRuleLearning() {
    const legend = $("#theme-rule-tier-legend");
    const tbody = $("#theme-rule-table tbody");
    if (!data.themeRuleLearning || !tbody) return;
    if (legend) {
      legend.innerHTML = data.themeRuleLearning.tierLogic.map((d) => `
        <div>
          <strong>${"★".repeat(d.stars)}${"☆".repeat(4 - d.stars)} ${escapeText(d.label)}</strong>
          <span>${escapeText(d.logic)}</span>
        </div>
      `).join("");
    }
    tbody.innerHTML = data.themeRuleLearning.rows.map((d) => {
      const stars = `${"★".repeat(d.stars)}${"☆".repeat(4 - d.stars)}`;
      const exact = formatRate(d.exact_rate);
      const broad = formatRate(d.broad_rate);
      const tested = d.tested ? `n=${d.tested}` : "n/a";
      const risk = d.semantic_extension_risk === "yes" ? "语义漂移风险" : d.semantic_extension_risk === "possible" ? "可能漂移" : "";
      const note = d.guidance || d.assignment_rule || "";
      return `
        <tr>
          <td><span class="theme-rule-name">${escapeText(d.theme)}</span><span class="theme-rule-path">${escapeText(truncate(d.path, 96))}</span></td>
          <td>${d.property_count}</td>
          <td><span class="star-rating">${stars}</span><span>${escapeText(d.quality_label)}</span></td>
          <td>${escapeText(d.safety_label)}${risk ? `<br><span class="theme-rule-risk">${escapeText(risk)}</span>` : ""}</td>
          <td><span class="theme-rule-fit">exact ${exact}</span><br><span class="theme-rule-fit">broad ${broad}</span><br><span class="theme-rule-risk">${tested}</span></td>
          <td>${escapeText(truncate(note, 150))}</td>
        </tr>
      `;
    }).join("");
  }

  const chartPalette = ["#536a76", "#b04f32", "#77775a", "#8c7d6a", "#b89c72", "#6f8b8c", "#a56a5b", "#8d8f70", "#5f6f86", "#b77f54", "#6d7e67", "#9b6f78", "#7c7162", "#4f6670"];
  const chartInstances = [];
  const regionColors = {
    "Europe and North America": "#3f78a8",
    "Africa": "#9bb653",
    "Arab States": "#f0c84b",
    "Asia and the Pacific": "#4f8f62",
    "Latin America and the Caribbean": "#b04f32",
  };
  const exchangeTypeColors = {
    architectural_style: "#536a76",
    artistic_influence: "#b04f32",
    maritime_trade: "#3f78a8",
    cultural_succession: "#8c7d6a",
    route_network: "#77775a",
    colonial_encounter: "#b77f54",
    religious_transmission: "#6d7e67",
    technical_transfer: "#5f6f86",
    cultural_fusion: "#9b6f78",
    urbanism: "#4f8f62",
  };
  const typologyAxisLabels = {
    T01_ARCHAEOLOGICAL: "T01_ARCHAEOLOGY",
    T02_ROCK_ART: "T02_ROCK_ART",
    T03_FOSSIL_HOMINID: "T03_FOSSIL",
    T04_HISTORIC_BUILDINGS_ENSEMBLES: "T04_BUILDINGS",
    T05_SETTLEMENTS: "T05_SETTLEMENTS",
    T06_VERNACULAR: "T06_VERNACULAR",
    T07_RELIGIOUS: "T07_RELIGIOUS",
    T08_AGRI_INDUSTRIAL_TECH: "T08_TECH",
    T09_MILITARY: "T09_MILITARY",
    T10_CULTURAL_LANDSCAPES_PARKS_GARDENS: "T10_LANDSCAPE",
    T11_CULTURAL_ROUTES: "T11_ROUTES",
    T12_BURIAL: "T12_BURIAL",
    T13_SYMBOLIC_MEMORIAL: "T13_SYMBOLIC",
    T14_MODERN: "T14_MODERN",
  };

  function axisCode(code) {
    return typologyAxisLabels[code] || String(code || "");
  }

  function wrapAxisLabel(value, maxChars = 18) {
    const text = String(value || "");
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    if (line) lines.push(line);
    return lines.join("\n");
  }

  let worldMapRegistered = false;

  function initEChart(id) {
    const node = document.getElementById(id);
    if (!node || !window.echarts) return null;
    const chart = window.echarts.init(node, null, { renderer: "svg" });
    chartInstances.push(chart);
    return chart;
  }

  function baseChartOption() {
    return {
      color: chartPalette,
      backgroundColor: "transparent",
      textStyle: { fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif", color: "#24231f" },
      tooltip: { trigger: "item", confine: true, borderColor: "#d8d3c7", backgroundColor: "#fffdf8", textStyle: { color: "#24231f" } },
      grid: { left: 72, right: 28, top: 42, bottom: 58, containLabel: true },
    };
  }

  async function loadDerived(name) {
    const response = await fetch(`data/derived/${name}`);
    if (!response.ok) throw new Error(`Unable to load ${name}`);
    return response.json();
  }

  async function loadJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return response.json();
  }

  function renderGroupedBar(payload) {
    const chart = initEChart("viz-table5-grouped");
    if (!chart) return;
    const rows = payload.rows;
    chart.setOption({
      ...baseChartOption(),
      legend: { top: 0, data: ["Phase 2B.8b", "FTG Table 5"] },
      tooltip: { ...baseChartOption().tooltip, trigger: "axis" },
      grid: { left: 138, right: 28, top: 48, bottom: 44, containLabel: false },
      xAxis: { type: "value", splitLine: { lineStyle: { color: "#d8d3c7" } } },
      yAxis: { type: "category", inverse: true, data: rows.map((d) => axisCode(d.typology_code)), axisLabel: { fontSize: 12, margin: 10 } },
      series: [
        { name: "Phase 2B.8b", type: "bar", data: rows.map((d) => d.final_count), barWidth: 7, barGap: "45%", barCategoryGap: "48%" },
        { name: "FTG Table 5", type: "bar", data: rows.map((d) => d.table5_count), barWidth: 7, barGap: "45%", barCategoryGap: "48%" },
      ],
    });
  }

  function renderDivergingBar(payload) {
    const chart = initEChart("viz-table5-diff");
    if (!chart) return;
    const rows = payload.rows;
    chart.setOption({
      ...baseChartOption(),
      tooltip: { ...baseChartOption().tooltip, trigger: "axis" },
      grid: { left: 138, right: 28, top: 42, bottom: 44, containLabel: false },
      xAxis: { type: "value", splitLine: { lineStyle: { color: "#d8d3c7" } } },
      yAxis: { type: "category", inverse: true, data: rows.map((d) => axisCode(d.typology_code)), axisLabel: { fontSize: 12, margin: 10 } },
      series: [{
        name: "Final minus Table 5",
        type: "bar",
        data: rows.map((d) => d.difference),
        barWidth: 9,
        barCategoryGap: "54%",
        itemStyle: { color: (params) => params.value >= 0 ? "#b04f32" : "#536a76" },
        label: { show: true, position: "right", formatter: ({ value }) => `${value > 0 ? "+" : ""}${value}` },
      }],
    });
  }

  function heatmapOption({ x, y, data, name, valueFormatter, visualMax, rotateX = 45, left = 118, bottom = 84, yWrap = false, yWrapChars = 19, yFontSize, yLineHeight, yLabelWidth, yTruncate = false, xWrap = false, compactRows = false, scale = "linear" }) {
    const scaledData = data.map((d) => {
      const raw = Number(d[2]) || 0;
      const scaled = scale === "sqrt"
        ? Math.sqrt(raw)
        : scale === "centered-lq"
          ? Math.log2(Math.max(raw, 0.001))
          : raw;
      return [d[0], d[1], scaled, raw];
    });
    const maxValue = visualMax ?? Math.max(1, ...data.map((d) => Number(d[2]) || 0));
    const visualMaxValue = scale === "sqrt" ? Math.sqrt(maxValue) : maxValue;
    const centeredExtent = Math.max(1.5, ...scaledData.map((d) => Math.abs(Number(d[2]) || 0)));
    const countPieces = [
      { value: 0, label: "0", color: "#f7f5ef" },
      { min: 1, max: 4, label: "1-4", color: "#e2eceb" },
      { min: 5, max: 9, label: "5-9", color: "#c4d9da" },
      { min: 10, max: 19, label: "10-19", color: "#8fb5bd" },
      { min: 20, max: 39, label: "20-39", color: "#5f8391" },
      { min: 40, max: 79, label: "40-79", color: "#385f75" },
      { min: 80, label: "80+", color: "#b04f32" },
    ];
    const visualMap = scale === "piecewise"
      ? {
          type: "piecewise",
          dimension: 2,
          pieces: countPieces,
          orient: "horizontal",
          left: "center",
          bottom: 0,
          itemWidth: 16,
          itemHeight: 10,
          textStyle: { fontSize: 10, color: "#6d6a61" },
        }
      : scale === "centered-lq"
        ? {
            min: -centeredExtent,
            max: centeredExtent,
            orient: "horizontal",
            left: "center",
            bottom: 0,
            calculable: false,
            formatter: (value) => {
              const restored = Math.pow(2, Number(value) || 0);
              if (Math.abs(restored - 1) < 0.02) return "1";
              return restored < 1 ? restored.toFixed(2) : restored.toFixed(1);
            },
            inRange: { color: ["#3f78a8", "#f7f5ef", "#b04f32"] },
          }
      : {
          min: 0,
          max: visualMaxValue,
          orient: "horizontal",
          left: "center",
          bottom: 0,
          calculable: false,
          formatter: scale === "sqrt" ? (value) => `${Math.round(value * value)}` : undefined,
          inRange: { color: ["#f7f5ef", "#e8ece8", "#ccd9d8", "#9db6bd", "#536a76"] },
        };
    return {
      ...baseChartOption(),
      tooltip: { ...baseChartOption().tooltip, formatter: (p) => {
        const raw = p.value[3] ?? p.value[2];
        return `${y[p.value[1]]}<br>${x[p.value[0]]}: ${valueFormatter ? valueFormatter(raw) : raw}`;
      } },
      grid: { left, right: 24, top: 30, bottom, containLabel: false },
      xAxis: { type: "category", data: x, axisLabel: { rotate: rotateX, fontSize: 11, interval: 0, hideOverlap: false, margin: 13, formatter: (value) => xWrap ? wrapAxisLabel(value, 15) : value } },
      yAxis: {
        type: "category",
        data: y,
        axisLabel: {
          fontSize: yFontSize ?? (yWrap ? 10 : 11),
          lineHeight: yLineHeight ?? (yWrap ? 12 : undefined),
          margin: 8,
          width: yLabelWidth,
          overflow: yTruncate ? "truncate" : undefined,
          formatter: (value) => yWrap ? wrapAxisLabel(value, yWrapChars) : value,
        },
        axisTick: { show: false },
      },
      visualMap,
      series: [{ name, type: "heatmap", data: scaledData, label: { show: false }, itemStyle: compactRows ? { borderWidth: 1, borderColor: "#f7f5ef" } : undefined, emphasis: { itemStyle: { borderColor: "#24231f", borderWidth: 1 } } }],
    };
  }

  function renderRegionCharts(matrix, lq) {
    const x = matrix.typologies.map((d) => axisCode(d.typology_code));
    const y = matrix.regions;
    const cells = matrix.cells.map((d) => [x.indexOf(axisCode(d.typology_code)), y.indexOf(d.region), d.count]);
    const chartA = initEChart("viz-region-typology-heatmap");
    if (chartA) chartA.setOption(heatmapOption({ x, y, data: cells, name: "count", rotateX: 32, left: 124, bottom: 88, yWrap: true, compactRows: true, scale: "piecewise" }));
    const byCodeRegion = new Map(matrix.cells.map((d) => [`${d.typology_code}|${d.region}`, d.count]));
    const chartC = initEChart("viz-typology-region-stacked");
    if (chartC) chartC.setOption({
      ...baseChartOption(),
      grid: { left: 54, right: 24, top: 48, bottom: 88, containLabel: true },
      legend: { type: "scroll", top: 0 },
      tooltip: { ...baseChartOption().tooltip, trigger: "axis", axisPointer: { type: "shadow" } },
      xAxis: { type: "category", data: x, axisLabel: { rotate: 32, fontSize: 11, interval: 0, hideOverlap: false } },
      yAxis: { type: "value" },
      series: y.map((region) => ({
        name: region,
        type: "bar",
        stack: "region",
        data: matrix.typologies.map((t) => byCodeRegion.get(`${t.typology_code}|${region}`) || 0),
        itemStyle: { color: regionColors[region] || "#536a76" },
      })),
    });
    const lqCells = lq.cells.map((d) => [x.indexOf(axisCode(d.typology_code)), y.indexOf(d.region), d.value]);
    const chartD = initEChart("viz-region-lq");
    if (chartD) chartD.setOption(heatmapOption({ x, y, data: lqCells, name: "LQ", valueFormatter: (v) => Number(v).toFixed(2), rotateX: 32, left: 124, bottom: 88, yWrap: true, compactRows: true, scale: "centered-lq" }));
  }

  function renderTimeCharts(cumulative, intervals) {
    const years = [...new Set(cumulative.rows.map((d) => d.year))].sort((a, b) => a - b);
    const typologies = cumulative.typologies;
    const byYearCode = new Map(cumulative.rows.map((d) => [`${d.year}|${d.typology_code}`, d.count]));
    const yearSummary = new Map((cumulative.year_summary || []).map((d) => [Number(d.year), d]));
    const codeByAxis = new Map(typologies.map((t) => [axisCode(t.typology_code), t.typology_code]));
    const getCumulativeValue = (year, code) => {
      if (year < years[0]) return 0;
      const exact = byYearCode.get(`${year}|${code}`);
      if (exact !== undefined) return exact;
      const fallbackYear = [...years].reverse().find((candidate) => candidate <= year);
      return fallbackYear ? (byYearCode.get(`${fallbackYear}|${code}`) || 0) : 0;
    };
    const annualValue = (year, code, index) => {
      const previousYear = index > 0 ? years[index - 1] : year - 1;
      return getCumulativeValue(year, code) - getCumulativeValue(previousYear, code);
    };
    const chartA = initEChart("viz-cumulative-line");
    if (chartA) chartA.setOption({
      ...baseChartOption(),
      legend: { type: "scroll", top: 0 },
      tooltip: {
        ...baseChartOption().tooltip,
        trigger: "axis",
        formatter: (params) => {
          const rows = Array.isArray(params) ? params : [params];
          const year = rows[0]?.axisValue;
          const summary = yearSummary.get(Number(year)) || {};
          const total = rows.reduce((sum, p) => sum + (Number(p.value) || 0), 0);
          const body = rows.map((p) => {
            const value = Number(p.value) || 0;
            return `${p.marker}${escapeText(p.seriesName)} <strong>${value}</strong>`;
          }).join("<br>");
          const propertyCount = summary.new_property_count ?? "n/a";
          const labelTotal = summary.new_main_label_count ?? total;
          return `${year}<br><strong>当年新增文化 / 混合遗产项目 ${propertyCount}</strong><br><strong>当年增加主标签 ${labelTotal}，各类型增量如下</strong><br>${body}`;
        },
      },
      xAxis: { type: "category", data: years },
      yAxis: { type: "value" },
      series: typologies.map((t) => ({
        name: axisCode(t.typology_code),
        type: "line",
        showSymbol: false,
        data: years.map((year, index) => annualValue(year, t.typology_code, index)),
      })),
    });
    const chartB = initEChart("viz-fiveyear-stacked");
    if (chartB) chartB.setOption({
      ...baseChartOption(),
      legend: { type: "scroll", top: 0 },
      tooltip: {
        ...baseChartOption().tooltip,
        trigger: "axis",
        axisPointer: { type: "line" },
        formatter: (params) => {
          const rows = Array.isArray(params) ? params : [params];
          const year = rows[0]?.axisValue;
          const total = rows.reduce((sum, p) => sum + (Number(p.value) || 0), 0);
          const body = rows
            .filter((p) => Number(p.value) > 0)
            .map((p) => `${p.marker}${escapeText(p.seriesName)} <strong>${Number(p.value) || 0}</strong>`)
            .join("<br>");
          return `${year}<br><strong>累计主标签总量 ${total}</strong><br>${body}`;
        },
      },
      xAxis: { type: "category", data: years, axisLabel: { rotate: 45 } },
      yAxis: { type: "value" },
      series: typologies.map((t) => ({
        name: axisCode(t.typology_code),
        type: "line",
        stack: "cumulative-total",
        showSymbol: false,
        smooth: false,
        areaStyle: { opacity: 0.72 },
        lineStyle: { width: 1 },
        emphasis: { focus: "series" },
        data: years.map((year) => getCumulativeValue(year, t.typology_code)),
      })),
    });
  }

  function renderCooccurrenceAndComplexity(co, complexity) {
    const x = co.typologies.map((d) => axisCode(d.typology_code));
    const cells = co.cells.map((d) => [x.indexOf(axisCode(d.source)), x.indexOf(axisCode(d.target)), d.count]);
    const chartA = initEChart("viz-cooccurrence-matrix");
    if (chartA) chartA.setOption(heatmapOption({ x, y: x, data: cells, name: "co-occurrence", rotateX: 38, left: 138, bottom: 96, scale: "piecewise" }));
    const chartB = initEChart("viz-label-complexity");
    if (chartB) chartB.setOption({
      ...baseChartOption(),
      tooltip: {
        ...baseChartOption().tooltip,
        trigger: "axis",
        formatter: (params) => {
          const row = Array.isArray(params) ? params[0] : params;
          return `${row.axisValue} 个主类型标签<br><strong>${row.value}</strong> 个遗产项目`;
        },
      },
      grid: { left: 66, right: 28, top: 32, bottom: 54, containLabel: true },
      xAxis: { type: "category", data: complexity.rows.map((d) => String(d.main_label_count)) },
      yAxis: { type: "value", name: "properties" },
      series: [{ name: "properties", type: "bar", data: complexity.rows.map((d) => d.property_count), itemStyle: { color: "#536a76" }, label: { show: true, position: "top" } }],
    });
  }

  function renderFormFunction(sankey, matrix) {
    const chartA = initEChart("viz-form-function-sankey");
    if (chartA) chartA.setOption({
      ...baseChartOption(),
      tooltip: { ...baseChartOption().tooltip, trigger: "item" },
      series: [{
        type: "sankey",
        left: 142,
        right: 116,
        top: 24,
        bottom: 28,
        nodeWidth: 10,
        nodeGap: 9,
        nodeAlign: "justify",
        layoutIterations: 32,
        data: sankey.nodes.map((d) => ({
          name: d.name,
          depth: d.role === "form" ? 0 : d.role === "bridge" ? 1 : 2,
          label: {
            position: d.role === "form" ? "left" : "right",
            align: d.role === "form" ? "right" : "left",
            fontWeight: d.role === "bridge" ? 700 : 400,
          },
          itemStyle: d.role === "bridge" ? { color: "#b04f32" } : undefined,
        })),
        links: sankey.links,
        lineStyle: { color: "source", opacity: 0.28 },
        label: {
          fontSize: 10,
          color: "#24231f",
          formatter: (params) => axisCode(String(params.name || "").replace("Form: ", "").replace("Function: ", "").replace("Period/style: ", "")),
        },
      }],
    });
    const x = matrix.function_typologies.map((d) => axisCode(d.code));
    const y = matrix.form_typologies.map((d) => axisCode(d.code));
    const cells = matrix.cells.map((d) => [x.indexOf(axisCode(d.function)), y.indexOf(axisCode(d.form)), d.count]);
    const chartB = initEChart("viz-form-function-matrix");
    if (chartB) chartB.setOption(heatmapOption({ x, y, data: cells, name: "shared properties", scale: "piecewise" }));
  }

  function renderChronoChinaModern(chrono, china, modern, worldMap) {
    const chartA = initEChart("viz-chrono-region-matrix");
    if (chartA) chartA.setOption(heatmapOption({
      x: chrono.periods,
      y: chrono.regions,
      data: chrono.cells.map((d) => [chrono.periods.indexOf(d.period), chrono.regions.indexOf(d.region), d.count]),
      name: "occurrences",
      rotateX: 26,
      left: 136,
      bottom: 128,
      yWrap: true,
      xWrap: true,
      scale: "piecewise",
    }));
    const chinaProps = china.properties.map((d) => d.name);
    const chartB = initEChart("viz-china-chrono");
    if (chartB) chartB.setOption(heatmapOption({
      x: china.periods,
      y: chinaProps,
      data: china.chrono_cells.map((d) => [china.periods.indexOf(d.period), china.properties.findIndex((p) => p.property_id === d.property_id), d.count]),
      name: "chrono occurrences",
      rotateX: 28,
      left: 360,
      bottom: 108,
      yWrap: false,
      yFontSize: 10,
      yLabelWidth: 330,
      yTruncate: true,
      xWrap: true,
      visualMax: 3,
      scale: "piecewise",
    }));
    const typeCodes = data.typology.map((d) => axisCode(d.code));
    const chartC = initEChart("viz-china-typology");
    if (chartC) chartC.setOption(heatmapOption({
      x: typeCodes,
      y: chinaProps,
      data: china.typology_cells.map((d) => [typeCodes.indexOf(axisCode(d.typology_code)), china.properties.findIndex((p) => p.property_id === d.property_id), d.count]),
      name: "main label",
      rotateX: 38,
      left: 360,
      bottom: 142,
      yWrap: false,
      yFontSize: 10,
      yLabelWidth: 330,
      yTruncate: true,
      visualMax: 1,
    }));
    const chartD = initEChart("viz-modern-map");
    if (chartD) {
      if (worldMap?.features?.length && !worldMapRegistered) {
        window.echarts.registerMap("ftg-world", worldMap);
        worldMapRegistered = true;
      }
      const pointData = modern.points.map((p) => ({ value: [p.longitude, p.latitude], ...p }));
      chartD.setOption(worldMapRegistered ? {
        ...baseChartOption(),
        backgroundColor: "#dcebed",
        tooltip: { ...baseChartOption().tooltip, formatter: (p) => `${escapeText(p.data.name)}<br>${p.data.region}<br>${p.data.year}` },
        geo: {
          map: "ftg-world",
          roam: false,
          left: 8,
          right: 8,
          top: 24,
          bottom: 18,
          itemStyle: {
            areaColor: "#fffdf8",
            borderColor: "#d8d3c7",
            borderWidth: 0.55,
          },
          emphasis: {
            disabled: true,
          },
        },
        series: [{
          name: "Modern-related WHC coordinates",
          type: "scatter",
          coordinateSystem: "geo",
          z: 3,
          symbolSize: 7,
          data: pointData,
          itemStyle: { color: "#b04f32", borderColor: "#fffdf8", borderWidth: 1 },
        }],
      } : {
        ...baseChartOption(),
        tooltip: { ...baseChartOption().tooltip, formatter: (p) => `${escapeText(p.data.name)}<br>${p.data.region}<br>${p.data.year}` },
        grid: { left: 54, right: 30, top: 34, bottom: 54, containLabel: true },
        xAxis: {
          type: "value",
          name: "Longitude",
          min: -180,
          max: 180,
          axisLine: { lineStyle: { color: "#9f9a8d" } },
          splitLine: { lineStyle: { color: "#ded8cb" } },
        },
        yAxis: {
          type: "value",
          name: "Latitude",
          min: -60,
          max: 82,
          axisLine: { lineStyle: { color: "#9f9a8d" } },
          splitLine: { lineStyle: { color: "#ded8cb" } },
        },
        series: [{
          name: "Modern-related WHC coordinates",
          type: "scatter",
          z: 3,
          symbolSize: 8,
          data: pointData,
          itemStyle: { color: "#b04f32", borderColor: "#fffdf8", borderWidth: 1 },
        }],
      });
    }
    const chartE = initEChart("viz-modern-typology");
    if (chartE) chartE.setOption({
      ...baseChartOption(),
      tooltip: { ...baseChartOption().tooltip, trigger: "axis" },
      xAxis: { type: "category", data: modern.typology_distribution.map((d) => axisCode(d.typology_code)), axisLabel: { rotate: 45 } },
      yAxis: { type: "value" },
      series: [{ type: "bar", data: modern.typology_distribution.map((d) => d.count), itemStyle: { color: "#536a76" }, label: { show: true, position: "top" } }],
    });
  }

  function renderThemeCharts(themeStats, ruleQuality, themeTypology, regionTheme, themeTheme, criteria) {
    const chartA = initEChart("viz-criteria-ii-region-bar");
    if (chartA) chartA.setOption({
      ...baseChartOption(),
      tooltip: { ...baseChartOption().tooltip, trigger: "axis" },
      xAxis: { type: "category", data: criteria.rows.map((d) => d.region), axisLabel: { rotate: 30 } },
      yAxis: { type: "value" },
      series: [{
        type: "bar",
        data: criteria.rows.map((d) => ({ value: d.candidate_count, itemStyle: { color: regionColors[d.region] || "#536a76" } })),
        label: { show: true, position: "top" },
      }],
    });
    const chartB = initEChart("viz-theme-level1-bar");
    if (chartB) chartB.setOption({
      ...baseChartOption(),
      tooltip: { ...baseChartOption().tooltip, trigger: "axis" },
      grid: { left: 270, right: 54, top: 34, bottom: 46, containLabel: false },
      xAxis: { type: "value", splitLine: { lineStyle: { color: "#ded8cb" } } },
      yAxis: {
        type: "category",
        inverse: true,
        data: themeStats.level1_distribution.map((d) => d.theme),
        axisLabel: { fontSize: 12, margin: 12, formatter: (value) => wrapAxisLabel(value, 34) },
        axisTick: { show: false },
      },
      series: [{
        type: "bar",
        data: themeStats.level1_distribution.map((d) => d.count),
        barWidth: 18,
        itemStyle: { color: "#536a76" },
        label: { show: true, position: "right", color: "#24231f", fontSize: 12 },
      }],
    });
    const chartC = initEChart("viz-theme-coverage");
    if (chartC) chartC.setOption({
      ...baseChartOption(),
      tooltip: {
        ...baseChartOption().tooltip,
        trigger: "axis",
        formatter: (params) => {
          const item = params[0];
          const count = item.axisValue;
          const properties = item.value;
          const highNote = Number(count) >= 9 ? "<br>已列入 9+ 高覆盖备查清单" : "";
          return `${count} theme paths<br>${properties} properties${highNote}`;
        },
      },
      grid: { left: 64, right: 42, top: 34, bottom: 54, containLabel: false },
      xAxis: {
        type: "category",
        name: "unique theme paths per property",
        nameLocation: "middle",
        nameGap: 34,
        data: themeStats.theme_coverage_per_property.map((d) => String(d.theme_path_count)),
      },
      yAxis: { type: "value" },
      series: [{
        type: "bar",
        data: themeStats.theme_coverage_per_property.map((d) => d.property_count),
        itemStyle: { color: (params) => Number(themeStats.theme_coverage_per_property[params.dataIndex].theme_path_count) >= 9 ? "#b04f32" : "#77775a" },
        label: { show: true, position: "top", fontSize: 11 },
      }],
    });
    const typeCodes = themeTypology.typologies.map((d) => axisCode(d.typology_code));
    const chartF = initEChart("viz-theme-typology-matrix");
    if (chartF) chartF.setOption(heatmapOption({
      x: typeCodes,
      y: themeTypology.themes,
      data: themeTypology.cells.map((d) => [typeCodes.indexOf(axisCode(d.typology_code)), themeTypology.themes.indexOf(d.theme), d.count]),
      name: "properties",
      rotateX: 45,
      scale: "piecewise",
    }));
    const chartG = initEChart("viz-region-theme-matrix");
    const subregionRows = regionTheme.subregions || regionTheme.regions;
    if (chartG) chartG.setOption(heatmapOption({
      x: regionTheme.themes,
      y: subregionRows,
      data: regionTheme.cells.map((d) => [regionTheme.themes.indexOf(d.theme), subregionRows.indexOf(d.subregion || d.region), d.count]),
      name: "properties",
      rotateX: 30,
      left: 236,
      bottom: 118,
      yWrap: true,
      yWrapChars: 34,
      yFontSize: 11,
      yLineHeight: 14,
      xWrap: true,
      compactRows: true,
      scale: "piecewise",
    }));
    const chartH = initEChart("viz-theme-theme-matrix");
    if (chartH) {
      const networkNodes = themeTheme.nodes || themeTheme.themes.map((d) => ({
        id: d.path,
        label: d.label,
        path: d.path,
        level1: d.path.split(" > ")[0],
        weighted_degree: d.weight,
      }));
      const level1Values = Array.from(new Set(networkNodes.map((d) => d.level1 || "Other")));
      const palette = ["#2f9a9a", "#536a76", "#b04f32", "#77775a", "#b89466", "#7c8f72", "#9b6f7c"];
      const categoryIndex = new Map(level1Values.map((d, i) => [d, i]));
      const maxDegree = Math.max(1, ...networkNodes.map((d) => Number(d.weighted_degree || d.weight || 0)));
      chartH.setOption({
        ...baseChartOption(),
        tooltip: {
          ...baseChartOption().tooltip,
          formatter: (p) => {
            if (p.dataType === "edge") {
              const names = p.data.cooccurring_property_names ? `<br><span style="color:#6d6a61">${truncate(p.data.cooccurring_property_names, 160)}</span>` : "";
              return `${p.data.source_label || truncate(p.data.source, 46)}<br>× ${p.data.target_label || truncate(p.data.target, 46)}<br>co-occurring properties: <b>${p.data.value}</b>${names}`;
            }
            return `<b>${p.data.name}</b><br>${truncate(p.data.path, 110)}<br>unique properties: ${p.data.unique_property_count || "n/a"}<br>weighted degree: ${p.data.weighted_degree}`;
          },
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          top: 2,
          left: 10,
          right: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { color: "#6d6a61", fontSize: 10 },
          data: level1Values,
        },
        series: [{
          type: "graph",
          layout: "force",
          roam: true,
          draggable: true,
          top: 40,
          bottom: 12,
          left: 12,
          right: 12,
          categories: level1Values.map((name, i) => ({ name, itemStyle: { color: palette[i % palette.length] } })),
          data: networkNodes.map((node) => {
            const degree = Number(node.weighted_degree || node.weight || 0);
            return {
              id: node.id || node.path,
              name: truncate(node.label || node.path, 42),
              path: node.path,
              level1: node.level1 || "Other",
              category: categoryIndex.get(node.level1 || "Other") || 0,
              weighted_degree: degree,
              unique_property_count: node.unique_property_count,
              symbolSize: 7 + Math.sqrt(degree / maxDegree) * 28,
              label: { show: degree >= 70, formatter: "{b}" },
            };
          }),
          links: (themeTheme.links || themeTheme.edges).map((edge) => ({
            source: edge.source,
            target: edge.target,
            value: Number(edge.count || edge.value || 0),
            source_label: edge.source_label,
            target_label: edge.target_label,
            cooccurring_property_names: edge.cooccurring_property_names,
            lineStyle: {
              width: Math.max(0.6, Math.min(4.5, Math.sqrt(Number(edge.count || edge.value || 0)) / 1.4)),
              color: "#a9a49a",
              opacity: 0.42,
            },
          })),
          edgeSymbol: ["none", "none"],
          itemStyle: { borderColor: "#1b686a", borderWidth: 0.8 },
          label: { position: "right", color: "#24231f", fontSize: 10, lineHeight: 12 },
          emphasis: {
            focus: "adjacency",
            lineStyle: { opacity: 0.8, width: 2.6 },
            label: { show: true },
          },
          force: { repulsion: 170, gravity: 0.06, edgeLength: [40, 165], friction: 0.65 },
        }],
      });
    }
  }

  function renderCriteriaExchangeNetwork(edgePayload, nodePayload, summaryPayload) {
    const chart = initEChart("viz-criteria-ii-circular-network");
    if (!chart || !edgePayload?.edges || !nodePayload?.nodes) return;
    const controls = {
      layer: $("#criteria-network-layer"),
      type: $("#criteria-network-type"),
      confidence: $("#criteria-network-confidence"),
      transregional: $("#criteria-network-transregional"),
      intra: $("#criteria-network-intra"),
    };
    const edges = edgePayload.edges;
    const nodes = nodePayload.nodes;
    const allTypes = Array.from(new Set(edges.map((d) => d.exchange_type_refined).filter(Boolean))).sort();
    const allConf = Array.from(new Set(edges.map((d) => d.confidence).filter(Boolean))).sort();
    if (controls.type && !controls.type.dataset.ready) {
      controls.type.innerHTML = [`<option value="all">全部类型</option>`, ...allTypes.map((d) => `<option value="${escapeText(d)}">${escapeText(d)}</option>`)].join("");
      controls.type.dataset.ready = "true";
    }
    if (controls.confidence && !controls.confidence.dataset.ready) {
      controls.confidence.innerHTML = [`<option value="all">全部 confidence</option>`, ...allConf.map((d) => `<option value="${escapeText(d)}">${escapeText(d)}</option>`)].join("");
      controls.confidence.dataset.ready = "true";
    }

    const render = () => {
      const layer = controls.layer?.value || "conservative";
      const type = controls.type?.value || "all";
      const confidence = controls.confidence?.value || "all";
      const showTransregional = controls.transregional?.checked ?? true;
      const showIntra = controls.intra?.checked ?? true;
      const filtered = edges.filter((edge) => {
        if (layer === "conservative" && edge.data_layer !== "coded_conservative") return false;
        if (type !== "all" && edge.exchange_type_refined !== type) return false;
        if (confidence !== "all" && edge.confidence !== confidence) return false;
        if (!showTransregional && (edge.source_region === "Transregional / Multiple" || edge.target_region === "Transregional / Multiple")) return false;
        if (!showIntra && edge.source_region === edge.target_region) return false;
        return true;
      });
      const degree = new Map();
      filtered.forEach((edge) => {
        degree.set(edge.source_region, (degree.get(edge.source_region) || 0) + 1);
        degree.set(edge.target_region, (degree.get(edge.target_region) || 0) + 1);
      });
      const activeNodes = nodes.filter((node) => degree.has(node.region_node));
      const maxDegree = Math.max(1, ...activeNodes.map((node) => degree.get(node.region_node) || 0));
      const layerCounts = summaryPayload?.data_layer_counts || {};
      chart.setOption({
        ...baseChartOption(),
        tooltip: {
          ...baseChartOption().tooltip,
          formatter: (p) => {
            if (p.dataType === "edge") {
              const d = p.data;
              return `<strong>${escapeText(d.property_name_en)}</strong><br>${escapeText(d.source)} → ${escapeText(d.target)}<br>${escapeText(d.exchange_type_refined)} · ${escapeText(d.confidence)}<br><span style="color:#6d6a61">${escapeText(truncate(d.evidence_quote, 230))}</span>`;
            }
            return `<strong>${escapeText(p.data.name)}</strong><br>${escapeText(p.data.macro_region || "")}<br>visible edge degree: ${p.data.edge_degree}`;
          },
        },
        legend: {
          type: "scroll",
          top: 0,
          left: 8,
          right: 8,
          textStyle: { fontSize: 10, color: "#6d6a61" },
          data: allTypes,
        },
        graphic: [{
          type: "text",
          left: 12,
          bottom: 12,
          style: {
            text: `visible edges: ${filtered.length} / ${edges.length}   nodes: ${activeNodes.length}   conservative: ${layerCounts.coded_conservative || 0}   provisional: ${layerCounts.provisional_from_review_queue || 0}`,
            fill: "#6d6a61",
            font: "12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          },
        }],
        series: [{
          type: "graph",
          layout: "circular",
          circular: { rotateLabel: true },
          roam: true,
          left: 22,
          right: 22,
          top: 48,
          bottom: 44,
          categories: allTypes.map((name) => ({ name, itemStyle: { color: exchangeTypeColors[name] || "#536a76" } })),
          data: activeNodes.map((node) => {
            const edgeDegree = degree.get(node.region_node) || 0;
            return {
              id: node.region_node,
              name: node.region_node,
              macro_region: node.macro_region,
              edge_degree: edgeDegree,
              symbolSize: 9 + Math.sqrt(edgeDegree / maxDegree) * 22,
              itemStyle: { color: node.region_node === "Transregional / Multiple" ? "#b04f32" : "#536a76", borderColor: "#fffdf8", borderWidth: 1 },
              label: { show: true, formatter: "{b}", fontSize: 10, color: "#24231f" },
            };
          }),
          links: filtered.map((edge, index) => ({
            source: edge.source_region,
            target: edge.target_region,
            value: 1,
            property_id: edge.property_id,
            property_name_en: edge.property_name_en,
            exchange_type_refined: edge.exchange_type_refined,
            confidence: edge.confidence,
            data_layer: edge.data_layer,
            evidence_quote: edge.evidence_quote,
            category: allTypes.indexOf(edge.exchange_type_refined),
            lineStyle: {
              color: exchangeTypeColors[edge.exchange_type_refined] || "#536a76",
              opacity: edge.data_layer === "provisional_from_review_queue" ? 0.28 : edge.data_layer === "coded_needs_review" ? 0.34 : 0.48,
              width: edge.data_layer === "coded_conservative" ? 1.5 : 1.1,
              curveness: 0.12 + (index % 5) * 0.045,
              type: edge.data_layer === "coded_conservative" ? "solid" : "dashed",
            },
            emphasis: { lineStyle: { opacity: 0.86, width: 2.4 } },
          })),
          edgeSymbol: ["none", "arrow"],
          edgeSymbolSize: [0, 5],
          labelLayout: { hideOverlap: true },
          emphasis: { focus: "adjacency" },
        }],
      }, true);
    };
    Object.values(controls).forEach((control) => {
      if (control && !control.dataset.bound) {
        control.addEventListener("change", render);
        control.dataset.bound = "true";
      }
    });
    render();
  }

  async function renderStatisticalModule() {
    if (!window.echarts) return;
    try {
      const [
        table5, regionMatrix, lq, cumulative, intervals, co, complexity,
        sankey, ffMatrix, chrono, china, modern, criteria, themeStats, ruleQuality,
        themeTypology, regionTheme, themeTheme, criteriaEdges, criteriaNodes, criteriaPrototypeSummary, worldMap,
      ] = await Promise.all([
        loadDerived("typology_final_vs_table5.json"),
        loadDerived("typology_region_matrix.json"),
        loadDerived("typology_region_location_quotient.json"),
        loadDerived("typology_year_cumulative.json"),
        loadDerived("typology_five_year_interval.json"),
        loadDerived("typology_cooccurrence_matrix.json"),
        loadDerived("main_label_complexity_distribution.json"),
        loadDerived("typology_form_function_sankey.json"),
        loadDerived("typology_form_function_matrix.json"),
        loadDerived("chrono_region_century_matrix.json"),
        loadDerived("china_chrono_typology_matrix.json"),
        loadDerived("modern_world_map_points.json"),
        loadDerived("criteria_ii_region_summary.json"),
        loadDerived("theme_statistics.json"),
        loadDerived("theme_rule_learning_quality.json"),
        loadDerived("theme_level1_typology_matrix.json"),
        loadDerived("region_theme_level1_matrix.json"),
        loadDerived("theme_theme_cooccurrence_matrix.json"),
        loadDerived("criteria_ii_exchange_edges_prototype_v0.json"),
        loadDerived("criteria_ii_exchange_nodes_prototype_v0.json"),
        loadDerived("criteria_ii_exchange_summary_prototype_v0.json"),
        loadJson("assets/world-countries.geojson"),
      ]);
      renderGroupedBar(table5);
      renderDivergingBar(table5);
      renderRegionCharts(regionMatrix, lq);
      renderTimeCharts(cumulative, intervals);
      renderCooccurrenceAndComplexity(co, complexity);
      renderFormFunction(sankey, ffMatrix);
      renderChronoChinaModern(chrono, china, modern, worldMap);
      renderThemeCharts(themeStats, ruleQuality, themeTypology, regionTheme, themeTheme, criteria);
      renderCriteriaExchangeNetwork(criteriaEdges, criteriaNodes, criteriaPrototypeSummary);
      window.addEventListener("resize", () => chartInstances.forEach((chart) => chart.resize()));
    } catch (error) {
      console.error("Failed to render statistical module", error);
    }
  }

  function renderDownloads() {
    const root = $("#download-links");
    if (!root) return;
    root.innerHTML = data.downloads.map((d) => `<a class="download-link" href="${d.href}" download>${d.label}</a>`).join("");
  }

  function enhanceTableRows() {
    document.querySelectorAll("tbody tr").forEach((row) => {
      row.tabIndex = 0;
    });
  }

  setMetrics();
  renderBarChart();
  renderDiffChart();
  renderTypologyTable();
  renderCalibration();
  renderTypologyNetwork();
  renderThemeTypologyMatrix();
  renderThemeRuleLearning();
  renderStatisticalModule();
  renderDownloads();
  enhanceTableRows();
})();
