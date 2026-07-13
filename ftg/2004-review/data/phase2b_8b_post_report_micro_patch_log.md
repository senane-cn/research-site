# Phase 2B.8b Post-Report Micro-Patch Log

Date: 2026-07-05

## Correction

Removed `T14_MODERN` from property `806` (`Hallstatt-Dachstein / Salzkammergut Cultural Landscape`).

## Rationale

The prior T14 assignment was triggered mainly by `20th century` wording in the WHC short description. User review confirmed this is a false positive: the phrase describes the duration of salt-economy prosperity, not Modern heritage as a typological value.

## Applied Changes

- `phase2b_8b_typology_label_assignments.csv`: `806 / T14_MODERN` set to `rejected_label`.
- `phase2b_8b_property_typology_summary.csv`: removed `T14_MODERN` from probable labels; main typology count changed from 4 to 3.
- `phase2b_8b_typology_distribution.csv`: T14 main count changed from 17 to 16; T14 Table 5 diagnostic difference changed from +2 to +1.
- Distribution/readiness/spot-check reports updated with patch note.

No Table 5 / Table 7 count fitting was applied.
