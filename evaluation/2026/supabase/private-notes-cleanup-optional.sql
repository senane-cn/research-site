-- Optional privacy cleanup for personal "要点备注" rows.
-- Run the SELECT first to review whether old private notes exist in Supabase.
-- Do not run the DELETE until you have confirmed those rows should be removed
-- from the shared database. Local browser backups are not affected by this SQL.

select
  property_id,
  section_key,
  updated_at,
  edited_by,
  left(coalesce(payload ->> 'note', payload ->> 'summary', ''), 160) as note_preview
from public.narrative_edits
where section_key = 'research_notes'
order by updated_at desc nulls last, property_id;

-- After review, uncomment the following statement only if you want to remove
-- previously uploaded personal notes from the shared database.
--
-- delete from public.narrative_edits
-- where section_key = 'research_notes';
