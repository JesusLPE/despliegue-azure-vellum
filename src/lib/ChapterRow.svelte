<script>
  import { urls } from './router.svelte.js'
  import { formatDate } from '../data/story.js'

  // `seriesTitle` es opcional: se muestra en listados que mezclan series.
  let { slug, chapter, seriesTitle = '' } = $props()
</script>

<a
  href={urls.reader(slug, chapter.number)}
  class="flex items-center gap-3.5 rounded-full border border-ink-600 bg-ink-850 px-5 py-3 transition-colors hover:border-primary-500 hover:bg-ink-800"
>
  <span class="h-3 w-3 shrink-0 rounded-full bg-primary-500"></span>
  <span class="min-w-0 flex-1 leading-snug">
    <span class="block font-semibold text-slate-100">Capítulo {chapter.number}</span>
    <span class="block truncate text-sm text-slate-400">
      {seriesTitle ? `${seriesTitle} · ` : ''}{chapter.title}
    </span>
  </span>
  <time class="shrink-0 text-sm text-slate-400" datetime={chapter.publishedAt}>{formatDate(chapter.publishedAt)}</time>
</a>
