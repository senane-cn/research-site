# FTG Phase 2 Web Report Visualization Update QA

Generated: 2026-07-05

## Scope

Added a structured statistical and visualization module to the existing static web report:

- `专题 B 结构再分析`
- Main title: `2004 年前名录结构的再分析`
- Subsections: `04.1` through `04.13`

The update does not redesign the whole report. It adds a new analytical section and keeps the existing crisp academic data-essay style.

## Charting Library

- Primary charting library: ECharts 5.5.1
- Local file: `vendor/echarts.min.js`
- CDN: not used
- Heavy dashboard framework: not used
- Advanced D3-only views such as chord diagrams, animated networks, and dense bipartite graphs: deferred

## Charts Added

- Grouped bar: Phase 2B.8b final count vs FTG Table 5
- Diverging bar: final minus Table 5
- Region x typology count heatmap
- Region x typology row percentage heatmap
- Typology regional composition stacked bar
- Location quotient heatmap
- Cumulative line chart by inscription year
- Five-year interval stacked bar
- Typology co-occurrence matrix
- Main label complexity histogram
- Form-function Sankey
- Form-function matrix
- Chrono-region x macro-period matrix
- China property x period matrix
- China property x typology matrix
- Modern-related coordinate scatter
- Modern-related typology distribution
- Criterion ii candidate count by source region
- Theme level 1 distribution
- Theme coverage per property
- Rule-learning quality bar
- Auto-assignment safety bar
- Theme level 1 x typology matrix
- Region x theme level 1 matrix
- Theme-theme co-occurrence matrix

## Source Files Used

- `outputs/phase2b_8b/phase2b_8b_typology_label_assignments.csv`
- `outputs/phase2b_8b/phase2b_8b_property_typology_summary.csv`
- `outputs/phase2b_8b/phase2b_8b_typology_distribution.csv`
- `outputs/phase1a/ftg_theme_category_to_property_assignments.csv`
- `outputs/phase1a/ftg_chrono_category_to_property_assignments.csv`
- `outputs/phase1a/ftg_property_master_whc_2025.csv`
- `outputs/phase1c_network_analysis/phase1c_theme_theme_edges.csv`
- `outputs/phase1d_metadata_enrichment/properties_master_phase1d_reviewed.csv`
- `outputs/phase3a_theme_rule_learning/theme_guidance_validation_matrix_v1.csv`

## Derived Data Generated

Output folder:

`outputs/ftg_phase2_web_report/data/derived/`

Generated files:

- `china_chrono_typology_matrix.json`
- `chrono_region_century_matrix.json`
- `criteria_ii_exchange_candidates.csv`
- `criteria_ii_region_summary.json`
- `main_label_complexity_distribution.json`
- `manifest.json`
- `modern_world_map_points.json`
- `region_theme_level1_matrix.json`
- `theme_level1_typology_matrix.json`
- `theme_path_typology_matrix_top.json`
- `theme_rule_learning_quality.json`
- `theme_statistics.json`
- `theme_theme_cooccurrence_matrix.json`
- `typology_cooccurrence_matrix.json`
- `typology_final_vs_table5.json`
- `typology_five_year_interval.json`
- `typology_form_function_matrix.json`
- `typology_form_function_sankey.json`
- `typology_region_col_pct_matrix.json`
- `typology_region_location_quotient.json`
- `typology_region_matrix.json`
- `typology_region_row_pct_matrix.json`
- `typology_year_cumulative.json`

## Count Checks

- Eligible Phase 2B.8b properties: 633
- Phase 2B.8b label assignment rows: 8,862
- FTG typology categories: 14
- Sum of Phase 2B.8b main typology counts: 1,479
- Criterion ii candidate rows generated: 499
- Browser-rendered ECharts containers: 25 / 25

## Method Checks

- Phase 2B.8b main typology statistics use main labels only: `core_label` + `probable_label`.
- Candidate labels and associative hints are excluded from main diagnostics unless a chart explicitly states otherwise.
- FTG Table 5 is treated as diagnostic reference, not a count target.
- Thematic assignments are treated as extracted original FTG data from Phase 1A.
- Chronological-regional outputs are occurrence-based, not unique-property counts.
- Derived JSON files are precomputed by `scripts/build_visualization_data.py`; heavy joins are not done in browser runtime.

## Limitations

- Chronological-regional century conversion is approximate. Where exact century mapping is not possible, broad macro-period bins are used.
- Cross-period chronological assignments are represented through available assignment occurrences, not a fully reconstructed continuous time span model.
- Criterion ii exchange network remains exploratory. Direction, target region, and exchange type require human review before chord / arc diagrams are meaningful.
- Modern World map is currently a coordinate scatter of Modern-related chronological assignments with available coordinates, not a full cartographic basemap.
- Advanced animated maps, dense bipartite graphs, and chord diagrams are deferred to a later visualization phase.

## Browser Preview Result

Previewed at:

`http://127.0.0.1:4174/outputs/ftg_phase2_web_report/?v=20260705-stat-viz-module#reanalysis-ftg`

Result:

- ECharts vendor loaded locally from `vendor/echarts.min.js`.
- 25 chart containers rendered as SVG.
- No browser console errors were reported during preview.

