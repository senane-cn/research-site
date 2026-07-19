const sessions = window.SHARE_SESSIONS || [];
const stats = window.SHARE_STATS || {};
const fallbackDirectionOrder = [
  "方向一：遗产价值研究",
  "方向二：保护工程技术实践",
  "方向三：遗产管理可持续发展",
  "方向四：展示阐释公众传播",
  "方向五：开拓视野",
  "方向六：新技术应用/知识管理"
];
const directionOrder = stats.directionOrder || fallbackDirectionOrder;

const shortDirection = (value) => (value || "暂无方向").replace(/^方向[一二三四五六]：/, "");
const byId = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function renderStats() {
  const years = stats.years || [];
  const items = [
    { label: "分享会覆盖年份", value: years.length ? `${years[0]}-${years[years.length - 1]}` : "暂无数据" },
    { label: "分享主题总数", value: stats.totalTopics || 0 },
    { label: "分享人数量", value: stats.speakerCount || 0 },
    { label: "方向类别数量", value: stats.directionCount || 0 }
  ];
  byId("statsGrid").innerHTML = items.map((item) => `
    <div class="stat">
      <strong>${escapeHtml(item.value)}</strong>
      <span>${escapeHtml(item.label)}</span>
    </div>
  `).join("");
}

function renderOverviewStats() {
  const target = byId("overviewStats");
  if (!target) return;
  const items = [
    { label: "分享场次", value: stats.totalTopics || sessions.length || 0 },
    { label: "分享人", value: stats.speakerCount || 0 },
    { label: "方向数量", value: stats.directionCount || 0 }
  ];
  target.innerHTML = items.map((item) => `
    <div class="overview-stat">
      <strong>${escapeHtml(item.value)}</strong>
      <span>${escapeHtml(item.label)}</span>
    </div>
  `).join("");
}

function renderDirections() {
  const descriptions = stats.directionDescriptions || {};
  const counts = stats.byDirection || {};
  const keywordMap = stats.keywordByDirection || {};
  byId("directionGrid").innerHTML = directionOrder.map((direction) => `
    <article class="direction-card">
      <div class="direction-card__top">
        <h3><a class="direction-link" href="#catalog" data-direction="${escapeHtml(direction)}">${escapeHtml(direction)}</a></h3>
        <div class="direction-count">${counts[direction] || 0}</div>
      </div>
      <p>${escapeHtml(descriptions[direction] || "暂无说明。")}</p>
      ${renderDirectionKeywords(keywordMap[direction] || [])}
    </article>
  `).join("");
  document.querySelectorAll(".direction-link").forEach((link) => {
    link.addEventListener("click", () => {
      const directionFilter = byId("directionFilter");
      if (!directionFilter) return;
      const yearFilter = byId("yearFilter");
      const searchInput = byId("searchInput");
      if (yearFilter) yearFilter.value = "";
      if (searchInput) searchInput.value = "";
      directionFilter.value = link.dataset.direction || "";
      renderCatalog();
    });
  });
}

function renderDirectionKeywords(keywords) {
  const visible = keywords.slice(0, 12);
  const rest = Math.max(0, keywords.length - visible.length);
  if (!visible.length) return "";
  return `
    <div class="direction-keywords" aria-label="该方向关键词">
      ${visible.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
      ${rest ? `<em>+${rest}</em>` : ""}
    </div>
  `;
}

function renderDirectionChart() {
  const counts = stats.byDirection || {};
  const max = Math.max(1, ...directionOrder.map((direction) => counts[direction] || 0));
  byId("directionChart").innerHTML = directionOrder.map((direction) => {
    const count = counts[direction] || 0;
    return `
      <div class="bar-row" title="${escapeHtml(direction)}：${count} 场">
        <span>${escapeHtml(shortDirection(direction))}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
        <strong>${count}</strong>
      </div>
    `;
  }).join("");
}

function sessionLine(item) {
  return `${item.time || "时间未录入"}｜${item.speaker || "分享人未录入"}｜${item.topic || "主题未录入"}`;
}

function renderQuarterSelection(time) {
  const target = byId("quarterSelection");
  if (!target) return;
  const rows = sessions.filter((item) => item.time === time);
  target.innerHTML = `
    <h4>${escapeHtml(time)}｜${rows.length} 场</h4>
    ${rows.length ? `<ul>${rows.map((item) => `<li>${escapeHtml(sessionLine(item))}</li>`).join("")}</ul>` : "<p>该季度暂无分享记录</p>"}
  `;
}

function renderQuarterTimeline() {
  const target = byId("quarterTimeline");
  if (!target) return;
  const years = stats.years || Array.from(new Set(sessions.map((item) => item.year).filter(Boolean))).sort();
  const quarters = [];
  years.forEach((year) => {
    ["Q1", "Q2", "Q3", "Q4"].forEach((quarter) => quarters.push(`${year}${quarter}`));
  });
  const total = Math.max(quarters.length - 1, 1);
  const firstActive = quarters.find((time) => sessions.some((item) => item.time === time)) || quarters[0] || "";
  target.innerHTML = `
    <div class="quarter-axis"></div>
    ${years.map((year) => {
      const index = quarters.indexOf(`${year}Q1`);
      const left = 4 + (index / total) * 92;
      return `<span class="quarter-year" style="left:${left}%">${escapeHtml(year)}</span>`;
    }).join("")}
    ${quarters.map((time, index) => {
      const rows = sessions.filter((item) => item.time === time);
      const left = 4 + (index / total) * 92;
      const quarter = time.slice(4);
      const klass = `quarter-node${rows.length ? " has-data" : ""}${time === firstActive ? " is-active" : ""}`;
      return `
        <button class="${klass}" type="button" style="left:${left}%" data-time="${escapeHtml(time)}" title="${escapeHtml(time)}：${rows.length} 场">
          <span class="quarter-dot" aria-hidden="true"></span>
          <span>${escapeHtml(quarter)}</span>
        </button>
      `;
    }).join("")}
  `;
  target.querySelectorAll(".quarter-node").forEach((button) => {
    button.addEventListener("click", () => {
      target.querySelectorAll(".quarter-node").forEach((node) => node.classList.remove("is-active"));
      button.classList.add("is-active");
      renderQuarterSelection(button.dataset.time);
    });
  });
  if (firstActive) renderQuarterSelection(firstActive);
}

function renderSankey() {
  const years = stats.years || [];
  const matrix = stats.yearDirectionMatrix || {};
  const width = 980;
  const height = 300;
  const yearX = 62;
  const dirX = 430;
  const totalX = 845;
  const yearGap = height / (years.length + 1);
  const dirGap = height / (directionOrder.length + 1);
  const totalByDirection = {};
  directionOrder.forEach((direction) => {
    totalByDirection[direction] = years.reduce((sum, year) => sum + (matrix[year]?.[direction] || 0), 0);
  });
  const max = Math.max(1, ...Object.values(totalByDirection), ...years.map((year) => sessions.filter((item) => item.year === year).length));
  const paths = [];
  years.forEach((year, yearIndex) => {
    const y1 = yearGap * (yearIndex + 1);
    directionOrder.forEach((direction, dirIndex) => {
      const value = matrix[year]?.[direction] || 0;
      if (!value) return;
      const y2 = dirGap * (dirIndex + 1);
      const stroke = .8 + (value / max) * 5.5;
      paths.push(`<path d="M ${yearX + 30} ${y1} C ${yearX + 170} ${y1}, ${dirX - 160} ${y2}, ${dirX - 42} ${y2}" stroke="rgba(0,86,107,0.14)" stroke-width="${stroke.toFixed(2)}" fill="none" stroke-linecap="round"/>`);
    });
  });
  directionOrder.forEach((direction, dirIndex) => {
    const y1 = dirGap * (dirIndex + 1);
    const stroke = .8 + ((totalByDirection[direction] || 0) / max) * 5.8;
    paths.push(`<path d="M ${dirX + 56} ${y1} C ${dirX + 180} ${y1}, ${totalX - 178} ${y1}, ${totalX - 58} ${y1}" stroke="rgba(126,150,125,0.18)" stroke-width="${stroke.toFixed(2)}" fill="none" stroke-linecap="round"/>`);
  });
  const yearNodes = years.map((year, index) => {
    const y = yearGap * (index + 1);
    const count = sessions.filter((item) => item.year === year).length;
    return `<g><text x="${yearX}" y="${y + 4}" text-anchor="middle">${escapeHtml(year)} · ${count}</text></g>`;
  }).join("");
  const dirNodes = directionOrder.map((direction, index) => {
    const y = dirGap * (index + 1);
    return `<g><rect x="${dirX - 92}" y="${y - 14}" width="184" height="28" fill="#fffdf8" opacity=".56" stroke="rgba(215,208,193,.55)"/><text x="${dirX}" y="${y + 4}" text-anchor="middle">${escapeHtml(shortDirection(direction).slice(0, 11))}</text></g>`;
  }).join("");
  const totalNodes = directionOrder.map((direction, index) => {
    const y = dirGap * (index + 1);
    return `<g><text x="${totalX}" y="${y + 4}" text-anchor="middle">${totalByDirection[direction] || 0} 个主题</text></g>`;
  }).join("");
  byId("sankeyChart").innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="年份到方向再到主题数量的数据流向图">
      <style>text{font:12px -apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif; fill:#1f2a2e;} rect{vector-effect:non-scaling-stroke;}</style>
      ${paths.join("")}
      ${yearNodes}
      ${dirNodes}
      ${totalNodes}
    </svg>
  `;
}

function initFilters() {
  const yearFilter = byId("yearFilter");
  const directionFilter = byId("directionFilter");
  yearFilter.innerHTML = `<option value="">全部年份</option>${(stats.years || []).map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`).join("")}`;
  directionFilter.innerHTML = `<option value="">全部方向</option>${directionOrder.map((direction) => `<option value="${escapeHtml(direction)}">${escapeHtml(direction)}</option>`).join("")}`;
  [yearFilter, directionFilter, byId("searchInput")].forEach((control) => control.addEventListener("input", renderCatalog));
}

function renderCatalog() {
  const year = byId("yearFilter").value;
  const direction = byId("directionFilter").value;
  const query = byId("searchInput").value.trim().toLowerCase();
  const filtered = sessions.filter((item) => {
    const text = `${item.topic || ""} ${item.speaker || ""} ${item.direction || ""} ${item.keywords || ""}`.toLowerCase();
    return (!year || item.year === year) && (!direction || item.direction === direction) && (!query || text.includes(query));
  });
  byId("catalogSummary").textContent = `当前显示 ${filtered.length} / ${sessions.length} 条记录`;
  byId("catalogBody").innerHTML = filtered.map((item) => {
    const actions = [];
    if (item.hasDownload) {
      const href = item.downloadPath || item.pdfPath || "";
      const label = item.downloadLabel || (item.fileType ? `下载 ${item.fileType.toUpperCase()}` : "下载文件");
      if (href) actions.push(`<a class="link-button" href="${escapeHtml(href)}" download>${escapeHtml(label)}</a>`);
    }
    if (!actions.length) actions.push(`<span class="text-muted">暂无文件</span>`);
    return `
      <tr>
        <td>${escapeHtml(item.time || "暂无")}</td>
        <td>${escapeHtml(item.speaker || "暂无")}</td>
        <td>${escapeHtml(item.topic || "暂无")}</td>
        <td>${escapeHtml(item.direction || "暂无")}</td>
        <td>${escapeHtml(item.keywords || "暂无")}</td>
        <td><div class="file-actions">${actions.join("")}</div></td>
      </tr>
    `;
  }).join("");
}

function init() {
  renderOverviewStats();
  initFilters();
  renderDirections();
  renderDirectionChart();
  renderSankey();
  renderQuarterTimeline();
  renderCatalog();
  initReveal();
}

init();
