import { whc48LogoBase64 } from "../stage-1/assets/whc48-logo.generated.js";

const data = window.FINANCE_DATA;
const $ = (selector) => document.querySelector(selector);
const money = new Intl.NumberFormat("zh-CN");
const million = (value, digits = 2) => `${(value / 1_000_000).toFixed(digits)}m`;
const wan = (value, digits = 2) => `${(value / 10_000).toFixed(digits)}万`;
const sum = (values) => values.reduce((total, value) => total + value, 0);
const ns = "http://www.w3.org/2000/svg";

function validateData() {
  if (!data || data.biennia.length !== 8) throw new Error("长期资金序列缺失。");
  for (const row of data.biennia) {
    const rebuilt = row.fund + row.regular + row.voluntary;
    if (Math.abs(rebuilt - row.allSources) > 1) {
      throw new Error(`${row.label}三来源合计不一致。`);
    }
  }
  if (sum(data.assistance.map((item) => item.count)) !== 212) {
    throw new Error("国际援助项目累计数不一致。");
  }
  if (sum(data.assistance.map((item) => item.approved)) !== 6674436) {
    throw new Error("国际援助累计批准额不一致。");
  }
  if (data.outcomes.periodicIndicators !== 43 || data.outcomes.dimensions.length !== 6) {
    throw new Error("定期报告指标框架不一致。");
  }
}

function svgElement(name, attrs = {}, text = "") {
  const element = document.createElementNS(ns, name);
  for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
  if (text) element.textContent = text;
  return element;
}

function makeSvg(container, height, title, description) {
  const width = Math.max(320, Math.round(container.getBoundingClientRect().width || 900));
  const svg = svgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-labelledby": `${container.id}-title ${container.id}-desc`,
    preserveAspectRatio: "xMidYMid meet"
  });
  svg.append(
    svgElement("title", { id: `${container.id}-title` }, title),
    svgElement("desc", { id: `${container.id}-desc` }, description)
  );
  container.replaceChildren(svg);
  return { svg, width, height };
}

function linePath(points) {
  return points.map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`).join(" ");
}

function addText(svg, x, y, text, className = "chart-label", anchor = "start") {
  svg.append(svgElement("text", { x, y, class: className, "text-anchor": anchor }, text));
}

function renderCoreChart() {
  const container = $("#core-chart");
  const isMobile = container.getBoundingClientRect().width < 600;
  const height = isMobile ? 350 : 420;
  const { svg, width } = makeSvg(
    container,
    height,
    "2010—2011至2024—2025世界遗产基金最终Total A与实际执行额折线图",
    "最终Total A从681.85万美元降至675.56万美元，执行额从646.36万美元降至624.95万美元；两者中期下行、末期恢复。"
  );
  const margin = { top: 34, right: isMobile ? 18 : 105, bottom: 52, left: isMobile ? 46 : 64 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const yMin = 4_000_000;
  const yMax = 7_200_000;
  const x = (index) => margin.left + (plotW * index) / (data.biennia.length - 1);
  const y = (value) => margin.top + ((yMax - value) / (yMax - yMin)) * plotH;

  for (const tick of [4_000_000, 5_000_000, 6_000_000, 7_000_000]) {
    const yy = y(tick);
    svg.append(svgElement("line", { x1: margin.left, y1: yy, x2: width - margin.right, y2: yy, class: "chart-grid" }));
    addText(svg, margin.left - 9, yy + 4, `${tick / 1_000_000}m`, "chart-label", "end");
  }
  svg.append(svgElement("line", { x1: margin.left, y1: height - margin.bottom, x2: width - margin.right, y2: height - margin.bottom, class: "chart-axis" }));

  const totalPoints = data.biennia.map((row, index) => ({ x: x(index), y: y(row.totalA), value: row.totalA }));
  const executionPoints = data.biennia.map((row, index) => ({ x: x(index), y: y(row.coreExecution), value: row.coreExecution }));
  svg.append(svgElement("path", { d: linePath(totalPoints), class: "series-total" }));
  svg.append(svgElement("path", { d: linePath(executionPoints), class: "series-execution" }));

  data.biennia.forEach((row, index) => {
    const showLabel = !isMobile || index % 2 === 0 || index === data.biennia.length - 1;
    if (showLabel) {
      const dateAnchor = isMobile && index === 0 ? "start" : isMobile && index === data.biennia.length - 1 ? "end" : "middle";
      addText(svg, x(index), height - margin.bottom + 24, row.label.replace("20", "’"), "chart-label", dateAnchor);
    }
    svg.append(svgElement("circle", { cx: x(index), cy: y(row.totalA), r: 5, class: "point-total" }));
    svg.append(svgElement("circle", { cx: x(index), cy: y(row.coreExecution), r: 4, class: "point-execution" }));
  });

  const first = data.biennia[0];
  const last = data.biennia.at(-1);
  addText(svg, totalPoints[0].x + 7, totalPoints[0].y - 12, wan(first.totalA), "chart-value");
  addText(svg, executionPoints[0].x + 7, executionPoints[0].y + 21, wan(first.coreExecution), "chart-value");
  const labelX = isMobile ? totalPoints.at(-1).x - 5 : totalPoints.at(-1).x + 10;
  const anchor = isMobile ? "end" : "start";
  addText(svg, labelX, totalPoints.at(-1).y - 12, `${wan(last.totalA)} 预算`, "chart-value", anchor);
  addText(svg, labelX, executionPoints.at(-1).y + 21, `${wan(last.coreExecution)} 执行`, "chart-value", anchor);

  const key = document.createElement("div");
  key.className = "series-key";
  key.innerHTML = "<span><i></i>最终Total A</span><span><i class=\"execution\"></i>支出及未结义务</span>";
  container.prepend(key);
}

function renderMixChart() {
  const container = $("#mix-chart");
  const isMobile = container.getBoundingClientRect().width < 600;
  const rowH = isMobile ? 43 : 47;
  const height = 40 + rowH * data.biennia.length + 38;
  const { svg, width } = makeSvg(
    container,
    height,
    "世界遗产工作三大资金来源占比图",
    "八个双年度的全来源总额先下降后恢复。2024—2025世界遗产基金、正常计划预算和自愿预算外资源分别占33.8%、30.5%和35.7%。"
  );
  const labelW = isMobile ? 60 : 80;
  const totalW = isMobile ? 58 : 88;
  const barX = labelW;
  const barW = Math.max(170, width - labelW - totalW);
  const colors = ["var(--fund)", "var(--regular)", "var(--voluntary)"];

  data.biennia.forEach((row, index) => {
    const yy = 22 + index * rowH;
    addText(svg, barX - 10, yy + 21, row.label, "chart-label", "end");
    const values = [row.fund, row.regular, row.voluntary];
    let offset = 0;
    values.forEach((value, sourceIndex) => {
      const share = value / row.allSources;
      const w = barW * share;
      svg.append(svgElement("rect", { x: barX + offset, y: yy, width: Math.max(0, w), height: 28, fill: colors[sourceIndex] }));
      if (w > (isMobile ? 45 : 62)) {
        addText(svg, barX + offset + w / 2, yy + 18.5, `${(share * 100).toFixed(1)}%`, "stack-label", "middle");
      }
      offset += w;
    });
    addText(svg, barX + barW + 9, yy + 19, million(row.allSources), "chart-value");
  });
  addText(svg, barX, height - 8, "0%", "chart-label");
  addText(svg, barX + barW / 2, height - 8, "100%构成", "chart-label", "middle");
  addText(svg, barX + barW, height - 8, "100%", "chart-label", "end");
}

function renderUseChart() {
  const container = $("#use-chart");
  const isMobile = container.getBoundingClientRect().width < 600;
  const rowH = isMobile ? 76 : 82;
  const height = 42 + rowH * data.useShift.length + 28;
  const { svg, width } = makeSvg(
    container,
    height,
    "行动2五类用途在2010—2011与2024—2025的端点比较",
    "保护管理监测支出从1734.38万美元降至1304.57万美元；能力建设和申报前端程序显著增加；社区参与为后期新设类别。"
  );
  const labelW = isMobile ? 118 : 220;
  const right = isMobile ? 14 : 75;
  const plotX = labelW;
  const plotW = width - labelW - right;
  const max = 18_000_000;
  const x = (value) => plotX + (value / max) * plotW;

  for (const tick of [0, 5_000_000, 10_000_000, 15_000_000]) {
    const xx = x(tick);
    svg.append(svgElement("line", { x1: xx, y1: 20, x2: xx, y2: height - 28, class: "chart-grid" }));
    addText(svg, xx, height - 7, tick === 0 ? "0" : `${tick / 1_000_000}m`, "chart-label", tick === 0 ? "start" : "middle");
  }

  data.useShift.forEach((row, index) => {
    const yy = 38 + index * rowH;
    const label = isMobile ? row.short : row.label;
    addText(svg, plotX - 12, yy + 4, label, "chart-label", "end");
    if (row.start !== null) {
      svg.append(svgElement("line", { x1: x(row.start), y1: yy + 21, x2: x(row.end), y2: yy + 21, stroke: "#c3cbd5", "stroke-width": 4 }));
      svg.append(svgElement("circle", { cx: x(row.start), cy: yy + 21, r: 7, fill: "var(--slate)", stroke: "white", "stroke-width": 2 }));
      addText(svg, x(row.start), yy + 46, wan(row.start), "chart-label", x(row.start) > width - 70 ? "end" : "middle");
    } else {
      addText(svg, plotX + 4, yy + 46, "早期未单列", "chart-label");
    }
    svg.append(svgElement("circle", { cx: x(row.end), cy: yy + 21, r: 8, fill: "var(--fund)", stroke: "white", "stroke-width": 2 }));
    const anchor = x(row.end) > width - 100 ? "end" : "start";
    const tx = anchor === "end" ? x(row.end) - 10 : x(row.end) + 10;
    addText(svg, tx, yy + 25, `${wan(row.end)}${row.change === null ? " · 新设" : ` · ${row.change > 0 ? "+" : ""}${row.change}%`}`, "chart-value", anchor);
  });
}

function renderAdvisoryChart() {
  const container = $("#advisory-chart");
  const isMobile = container.getBoundingClientRect().width < 600;
  const height = isMobile ? 320 : 355;
  const { svg, width } = makeSvg(
    container,
    height,
    "2024—2025三家咨询机构全来源经费比较",
    "ICOMOS约377.18万美元，IUCN约196.21万美元，ICCROM约39.20万美元。职责不同，金额不能直接比较机构财务健康。"
  );
  const left = isMobile ? 72 : 92;
  const right = isMobile ? 20 : 118;
  const plotW = width - left - right;
  const max = 4_000_000;
  data.evaluation.advisoryBodies2024_25.forEach((row, index) => {
    const yy = 45 + index * 92;
    addText(svg, left - 12, yy + 21, row.name, "chart-value", "end");
    const w = (row.amount / max) * plotW;
    svg.append(svgElement("rect", { x: left, y: yy, width: w, height: 28, rx: 2, fill: index === 0 ? "var(--fund)" : index === 1 ? "var(--regular)" : "var(--voluntary)" }));
    addText(svg, Math.min(width - 4, left + w + 10), yy + 19, wan(row.amount), "chart-value", left + w + 88 > width ? "end" : "start");
    addText(svg, left, yy + 49, isMobile ? row.note.split("等")[0] : row.note, "chart-label");
  });
}

function renderMiniLine(containerSelector, field, max, valueFormatter, title, description) {
  const container = $(containerSelector);
  const widthNow = container.getBoundingClientRect().width;
  const isMobile = widthNow < 450;
  const height = 260;
  const { svg, width } = makeSvg(container, height, title, description);
  const margin = { top: 35, right: 16, bottom: 45, left: 38 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const x = (index) => margin.left + (plotW * index) / (data.assistance.length - 1);
  const y = (value) => margin.top + ((max - value) / max) * plotH;
  for (const share of [0, .5, 1]) {
    const yy = margin.top + plotH * (1 - share);
    svg.append(svgElement("line", { x1: margin.left, y1: yy, x2: width - margin.right, y2: yy, class: "chart-grid" }));
  }
  const points = data.assistance.map((row, index) => ({ x: x(index), y: y(row[field]), value: row[field] }));
  svg.append(svgElement("path", { d: linePath(points), fill: "none", stroke: "var(--fund)", "stroke-width": 3 }));
  points.forEach((point, index) => {
    svg.append(svgElement("circle", { cx: point.x, cy: point.y, r: 5, fill: "var(--fund)", stroke: "white", "stroke-width": 2 }));
    if (!isMobile || index === 0 || index === points.length - 1) {
      const dateAnchor = index === 0 ? "start" : index === points.length - 1 ? "end" : "middle";
      addText(svg, point.x, height - 18, data.assistance[index].label.replace("20", "’"), "chart-label", dateAnchor);
    }
    if (index === 0 || index === points.length - 1) {
      addText(svg, point.x, point.y - 12, valueFormatter(point.value), "chart-value", index === 0 ? "start" : "end");
    }
  });
}

function renderTablesAndText() {
  $("#core-table").innerHTML = data.biennia.map((row) => `
    <tr>
      <th scope="row">${row.label}</th>
      <td>${money.format(row.totalA)}</td>
      <td>${row.id === "2016-17" ? "约" : ""}${money.format(row.coreExecution)}</td>
      <td>${row.executionRate.toFixed(1)}%</td>
    </tr>`).join("");

  $("#policy-timeline").innerHTML = data.evaluation.timeline.map((item) => `
    <li>
      <time>${item.year}</time>
      <div><h3>${item.title}</h3><p>${item.text}</p></div>
    </li>`).join("");

  $("#source-list").innerHTML = data.sources.map((source) =>
    `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a></li>`
  ).join("");
  $("#data-version").textContent = data.meta.updated.replaceAll("-", ".");
}

let resizeFrame = 0;
function renderCharts() {
  renderCoreChart();
  renderMixChart();
  renderUseChart();
  renderAdvisoryChart();
  renderMiniLine("#ia-amount-chart", "approved", 1_800_000, (value) => wan(value), "国际援助批准额趋势", "批准额从59.74万美元增长后，在最近三个双年度稳定于约153万至159万美元。");
  renderMiniLine("#ia-count-chart", "count", 55, (value) => `${value}项`, "国际援助批准项目数趋势", "获批准项目由26项增加至50项。");
  renderMiniLine("#ia-average-chart", "average", 38_000, (value) => `${(value / 10_000).toFixed(2)}万`, "国际援助平均单项趋势", "平均单项由2.30万美元升至约3.4万美元，2024—2025回落至3.06万美元。");
}

function init() {
  validateData();
  $("#conference-logo").src = `data:image/svg+xml;base64,${whc48LogoBase64}`;
  renderTablesAndText();
  renderCharts();
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(renderCharts);
  });
  observer.observe($("#main"));
}

init();
