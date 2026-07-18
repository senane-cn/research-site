-- Schema additions for the reviewed 18 July 2026 ICOMOS merge.
-- Additive only: existing rows and colleague edits are preserved.

alter table public.properties add column if not exists state_party_proposed_name text;
alter table public.properties add column if not exists tentative_list_entry_year int;
alter table public.properties add column if not exists previous_nomination_sessions text[];
alter table public.properties add column if not exists meeting_session text;
alter table public.properties add column if not exists heritage_convention_category text;
alter table public.properties add column if not exists cultural_property_types text[];
alter table public.properties add column if not exists is_cultural_landscape_nomination boolean default false;
alter table public.properties add column if not exists icomos_accepts_cultural_landscape boolean;
alter table public.properties add column if not exists cultural_landscape_note text;
alter table public.properties add column if not exists is_significant_boundary_modification boolean default false;
alter table public.properties add column if not exists boundary_modification_sessions text[];
alter table public.properties add column if not exists related_decisions text[];
alter table public.properties add column if not exists official_whc_criteria text[];
alter table public.properties add column if not exists nomination_cycle int;
alter table public.properties add column if not exists evaluation_source_document text;
alter table public.properties add column if not exists evaluation_source_pdf_pages text;
alter table public.properties add column if not exists evaluation_source_report_pages text;

alter table public.criteria_assessments add column if not exists four_level_rating text;

alter table public.recommendations add column if not exists topic_category text;
alter table public.recommendations add column if not exists topic_categories text[];
alter table public.recommendations add column if not exists topic_confidence text;
alter table public.recommendations add column if not exists topic_category_source text;
alter table public.recommendations add column if not exists source_document text;
alter table public.recommendations add column if not exists source_report_page int;

alter table public.evidence add column if not exists source_document text;
alter table public.evidence add column if not exists source_pdf_page int;

notify pgrst, 'reload schema';
