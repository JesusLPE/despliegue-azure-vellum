<script>
  import { latestChapters } from '../data/story.js'
  import ChapterRow from '../lib/ChapterRow.svelte'
  import EmptyState from '../lib/EmptyState.svelte'

  const chapters = latestChapters()
</script>

<div class="mx-auto max-w-3xl px-4 py-6">
  <h1 class="text-2xl font-bold text-slate-100">Capítulos</h1>
  <p class="mb-5 mt-1 text-slate-400">Publicados recientemente.</p>

  {#if chapters.length}
    <ul class="flex flex-col gap-3">
      {#each chapters as ch}
        <li><ChapterRow slug={ch.series.slug} chapter={ch} seriesTitle={ch.series.title} /></li>
      {/each}
    </ul>
  {:else}
    <EmptyState title="Sin publicaciones" text="Los capítulos nuevos aparecerán aquí." />
  {/if}
</div>
