# FTG Phase 2 Web Report

静态网页报告：`FTG 2004 前世界文化遗产类型框架回归分类报告`

## Preview

在项目根目录运行：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/outputs/ftg_phase2_web_report/
```

也可以直接打开 `index.html`，但建议使用本地服务器，以保证下载链接和脚本加载方式与常规浏览器预览一致。

## Data Sources

本报告使用 Phase 2B.8b final freeze candidate 作为 source of truth。数据文件复制在 `data/` 目录中：

- `phase2b_8b_typology_label_assignments.csv`
- `phase2b_8b_property_typology_summary.csv`
- `phase2b_8b_typology_distribution.csv`
- `phase2b_8b_candidate_and_associative_hints.csv`
- `phase2b_8b_distribution_diagnostics.md`
- `phase2b_8b_final_method_note.md`
- `phase2b_8b_freeze_readiness_report.md`
- `phase2b_8b_final_spot_check_report.md`

`report-data.js` 和 `report-data.json` 是网页显示用的轻量派生数据，生成脚本为：

```bash
python3 scripts/build_ftg_phase2_web_report_data.py
```

新增的统计与可视化模块使用预计算 JSON，不在浏览器中执行大规模 CSV join。派生数据生成脚本为：

```bash
python3 scripts/build_visualization_data.py
```

输出目录：

```text
outputs/ftg_phase2_web_report/data/derived/
```

## Visualization Dependency

本报告使用 **ECharts 5.5.1** 作为新增统计图表的唯一主要可视化库。

- 文件位置：`vendor/echarts.min.js`
- 来源方式：从 npm package `echarts@5.5.1` 提取 `dist/echarts.min.js` 后本地引用。
- 页面不使用 CDN。
- 当前报告仍为静态网页，不引入 Vite、React、Tableau-style dashboard framework 或多套可视化库。

若需重新获取本地 vendor 文件，可从 npm 包提取：

```bash
mkdir -p outputs/ftg_phase2_web_report/vendor /tmp/echarts_pkg
curl -L -s https://registry.npmjs.org/echarts/-/echarts-5.5.1.tgz -o /tmp/echarts_pkg/echarts-5.5.1.tgz
tar -xzf /tmp/echarts_pkg/echarts-5.5.1.tgz -C /tmp/echarts_pkg
cp /tmp/echarts_pkg/package/dist/echarts.min.js outputs/ftg_phase2_web_report/vendor/echarts.min.js
```

## Rebuild And Preview

从项目根目录运行：

```bash
python3 scripts/build_ftg_phase2_web_report_data.py
python3 scripts/build_visualization_data.py
python3 -m http.server 4174
```

然后打开：

```text
http://127.0.0.1:4174/outputs/ftg_phase2_web_report/?v=20260705-stat-viz-module
```

## Disclaimer

本报告呈现的是 probable reconstruction。它不声称恢复 ICOMOS 原始 item-level 工作数据，也不将 FTG Table 5 / Table 7 作为强制配平目标。Table 5 在网页中仅作为诊断参照。
