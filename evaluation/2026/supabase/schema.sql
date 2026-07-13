create extension if not exists pgcrypto;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists properties (
  id text primary key,
  cycle int not null,
  property_name_en text not null,
  property_name_zh text,
  state_party text,
  region text,
  nomination_type text,
  heritage_type text,
  property_type text,
  category_of_property text,
  category_of_property_source_note text,
  cultural_subtype text,
  is_serial boolean default false,
  component_count int,
  is_transnational boolean default false,
  proposed_criteria text[],
  icomos_recommended_criteria text[],
  committee_confirmed_criteria text[],
  icomos_recommendation text,
  icomos_recommendation_note text,
  committee_decision text,
  committee_pm_requirements text,
  report_page_start int,
  report_page_end int,
  brief_synthesis_en text,
  brief_synthesis_zh text,
  review_status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table properties add column if not exists heritage_type text;
alter table properties add column if not exists category_of_property text;
alter table properties add column if not exists category_of_property_source_note text;
alter table properties add column if not exists cultural_subtype text;
alter table properties add column if not exists component_count int;
alter table properties add column if not exists committee_confirmed_criteria text[];
alter table properties add column if not exists icomos_recommendation_note text;
alter table properties add column if not exists committee_decision text;
alter table properties add column if not exists committee_pm_requirements text;

create table if not exists assessment_items (
  item_key text primary key,
  label_en text not null,
  label_zh text,
  display_order int
);

create table if not exists property_assessments (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  item_key text references assessment_items(item_key),
  ai_inferred_rating text default 'unknown',
  human_calibrated_rating text default 'unknown',
  official_ppt_rating text default 'unknown',
  conclusion_zh text,
  conclusion_en text,
  rationale_zh text,
  confidence text default 'medium',
  review_status text default 'draft',
  reviewer text,
  reviewer_note text,
  updated_at timestamptz default now(),
  unique(property_id, item_key)
);

create table if not exists assessment_subitems (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  parent_item_key text references assessment_items(item_key),
  subitem_key text,
  subitem_label_en text,
  subitem_label_zh text,
  summary_zh text,
  summary_en text,
  icomos_logic_note_zh text,
  analyst_note text,
  review_status text default 'draft',
  display_order int
);

create table if not exists criteria_assessments (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  criterion text,
  proposed_by_state_party boolean,
  accepted_by_icomos boolean,
  judgement text,
  summary_zh text,
  summary_en text,
  linked_attribute_ids uuid[],
  analyst_note text,
  review_status text default 'draft',
  unique(property_id, criterion)
);

create table if not exists comparators (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  comparator_name text not null,
  country_or_region text,
  heritage_status text,
  status_detail text,
  typology text,
  comparison_theme text,
  icomos_comment_summary_zh text,
  icomos_comment_summary_en text,
  source_page int,
  source_quote text,
  analyst_note text
);

create table if not exists attributes (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  source_layer text,
  attribute_group text,
  attribute_name_en text,
  attribute_name_zh text,
  source_section text,
  source_page int,
  source_quote text,
  summary_zh text,
  linked_criteria text[],
  linked_assessment_items text[],
  status text,
  analyst_note text,
  review_status text default 'draft'
);

create table if not exists recommendations (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  recommendation_level text,
  recommendation_code text,
  recommendation_category text,
  text_en text,
  summary_zh text,
  linked_assessment_items text[],
  linked_attribute_ids uuid[],
  urgency text,
  implementation_actor text,
  deadline text,
  source_page int,
  source_quote text,
  included_in_final_recommendations boolean default true,
  committee_heading_zh text,
  committee_summary_zh text,
  committee_text_en text,
  analyst_note text,
  review_status text default 'draft'
);

alter table recommendations add column if not exists committee_heading_zh text;
alter table recommendations add column if not exists committee_summary_zh text;
alter table recommendations add column if not exists committee_text_en text;

create table if not exists narrative_edits (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  section_key text not null,
  payload jsonb not null default '{}'::jsonb,
  edited_by text,
  updated_at timestamptz default now(),
  unique(property_id, section_key)
);

create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  cycle int,
  property_id text references properties(id) on delete set null,
  source_type text,
  title text,
  file_path text,
  url text,
  language text,
  uploaded_by text,
  uploaded_at timestamptz default now(),
  processing_status text default 'pending',
  notes text
);

create table if not exists evidence (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  source_id uuid references sources(id) on delete set null,
  source_type text,
  source_file text,
  source_section text,
  page_number int,
  paragraph_index int,
  quote_en text,
  summary_zh text,
  interpretation_note text,
  linked_assessment_item text references assessment_items(item_key),
  linked_criterion text,
  linked_attribute_id uuid,
  linked_recommendation_id uuid,
  reviewer_note text,
  created_at timestamptz default now()
);

create table if not exists official_ppt_ratings (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  item_key text references assessment_items(item_key),
  official_ppt_rating text default 'unknown',
  source_type text default 'unknown',
  source_file text,
  source_note text,
  confidence text default 'medium',
  entered_by text,
  entered_at timestamptz default now(),
  discrepancy_with_inferred boolean,
  discrepancy_with_calibrated boolean,
  review_status text default 'draft',
  unique(property_id, item_key)
);

create table if not exists property_type_tags (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id) on delete cascade,
  tag text,
  note text
);

drop trigger if exists trg_properties_updated_at on properties;
create trigger trg_properties_updated_at before update on properties for each row execute function set_updated_at();

drop trigger if exists trg_property_assessments_updated_at on property_assessments;
create trigger trg_property_assessments_updated_at before update on property_assessments for each row execute function set_updated_at();

drop trigger if exists trg_narrative_edits_updated_at on narrative_edits;
create trigger trg_narrative_edits_updated_at before update on narrative_edits for each row execute function set_updated_at();

alter table properties enable row level security;
alter table assessment_items enable row level security;
alter table property_assessments enable row level security;
alter table assessment_subitems enable row level security;
alter table criteria_assessments enable row level security;
alter table comparators enable row level security;
alter table attributes enable row level security;
alter table recommendations enable row level security;
alter table narrative_edits enable row level security;
alter table sources enable row level security;
alter table evidence enable row level security;
alter table official_ppt_ratings enable row level security;
alter table property_type_tags enable row level security;

grant usage on schema public to anon, authenticated;
grant select on
  properties,
  assessment_items,
  property_assessments,
  assessment_subitems,
  criteria_assessments,
  comparators,
  attributes,
  recommendations,
  narrative_edits,
  sources,
  evidence,
  official_ppt_ratings,
  property_type_tags
to anon, authenticated;
grant insert, update, delete on
  properties,
  assessment_items,
  property_assessments,
  assessment_subitems,
  criteria_assessments,
  comparators,
  attributes,
  recommendations,
  narrative_edits,
  sources,
  evidence,
  official_ppt_ratings,
  property_type_tags
to authenticated;

drop policy if exists "public read properties" on properties;
drop policy if exists "public read assessment_items" on assessment_items;
drop policy if exists "public read property_assessments" on property_assessments;
drop policy if exists "public read assessment_subitems" on assessment_subitems;
drop policy if exists "public read criteria_assessments" on criteria_assessments;
drop policy if exists "public read comparators" on comparators;
drop policy if exists "public read attributes" on attributes;
drop policy if exists "public read recommendations" on recommendations;
drop policy if exists "public read narrative_edits" on narrative_edits;
drop policy if exists "public read sources" on sources;
drop policy if exists "public read evidence" on evidence;
drop policy if exists "public read official_ppt_ratings" on official_ppt_ratings;
drop policy if exists "public read property_type_tags" on property_type_tags;

create policy "public read properties" on properties for select using (true);
create policy "public read assessment_items" on assessment_items for select using (true);
create policy "public read property_assessments" on property_assessments for select using (true);
create policy "public read assessment_subitems" on assessment_subitems for select using (true);
create policy "public read criteria_assessments" on criteria_assessments for select using (true);
create policy "public read comparators" on comparators for select using (true);
create policy "public read attributes" on attributes for select using (true);
create policy "public read recommendations" on recommendations for select using (true);
create policy "public read narrative_edits" on narrative_edits for select using (true);
create policy "public read sources" on sources for select using (true);
create policy "public read evidence" on evidence for select using (true);
create policy "public read official_ppt_ratings" on official_ppt_ratings for select using (true);
create policy "public read property_type_tags" on property_type_tags for select using (true);

drop policy if exists "authenticated edit properties" on properties;
drop policy if exists "authenticated edit assessment_items" on assessment_items;
drop policy if exists "authenticated edit property_assessments" on property_assessments;
drop policy if exists "authenticated edit assessment_subitems" on assessment_subitems;
drop policy if exists "authenticated edit criteria_assessments" on criteria_assessments;
drop policy if exists "authenticated edit comparators" on comparators;
drop policy if exists "authenticated edit attributes" on attributes;
drop policy if exists "authenticated edit recommendations" on recommendations;
drop policy if exists "authenticated edit narrative_edits" on narrative_edits;
drop policy if exists "authenticated edit sources" on sources;
drop policy if exists "authenticated edit evidence" on evidence;
drop policy if exists "authenticated edit official_ppt_ratings" on official_ppt_ratings;
drop policy if exists "authenticated edit property_type_tags" on property_type_tags;

create policy "authenticated edit properties" on properties for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit assessment_items" on assessment_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit property_assessments" on property_assessments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit assessment_subitems" on assessment_subitems for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit criteria_assessments" on criteria_assessments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit comparators" on comparators for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit attributes" on attributes for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit recommendations" on recommendations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit narrative_edits" on narrative_edits for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit sources" on sources for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit evidence" on evidence for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit official_ppt_ratings" on official_ppt_ratings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated edit property_type_tags" on property_type_tags for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
