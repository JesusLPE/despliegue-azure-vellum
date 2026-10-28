<script>
  import { SERIES, AUTHOR, latestChapters } from '../data/story.js'
  import { urls } from '../lib/router.svelte.js'
  import { library } from '../lib/library.svelte.js'
  import { decorate } from '../lib/decorate.js'
  import Icon from '../lib/Icon.svelte'
  import ChapterRow from '../lib/ChapterRow.svelte'
  import EmptyState from '../lib/EmptyState.svelte'

  const featured = SERIES[0]
  const recent = latestChapters()

  const startAt = $derived(library.last[featured?.slug] ?? featured?.chapters[0].number)
  const resuming = $derived(library.last[featured?.slug] != null)
</script>

<div class="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-6">
  {#if featured}
    <section aria-label="Serie destacada" class="flex flex-col gap-4">
      <div class="comic overflow-hidden rounded-[28px] border border-ink-700" use:decorate>
        {@html featured.coverHtml}
      </div>

      <p class="mx-auto max-w-2xl text-center leading-relaxed text-slate-300">{featured.synopsis}</p>

      <div class="flex flex-col justify-center gap-3 sm:flex-row">
        <a href={urls.reader(featured.slug, startAt)} class="btn-primary">
          <Icon name="play" size={18} />
          {resuming ? `Continuar: capítulo ${startAt}` : 'Empezar a leer'}
        </a>
        <a href={urls.detail(featured.slug)} class="btn !h-14">Ver serie</a>
      </div>
    </section>
  {:else}
    <EmptyState title="Sin publicaciones" text="Todavía no hay series publicadas." />
  {/if}

  <section aria-labelledby="recientes">
    <h2 id="recientes" class="mb-4 text-xl font-bold text-slate-100">Últimos capítulos</h2>
    {#if recent.length}
      <ul class="flex flex-col gap-3">
        {#each recent as ch}
          <li><ChapterRow slug={ch.series.slug} chapter={ch} seriesTitle={ch.series.title} /></li>
        {/each}
      </ul>
    {:else}
      <EmptyState title="Sin publicaciones" text="Los capítulos nuevos aparecerán aquí." />
    {/if}
  </section>

  <section aria-labelledby="autores">
    <h2 id="autores" class="mb-4 text-xl font-bold text-slate-100">Otros autores</h2>
    <EmptyState title="Sin publicaciones" text="Esta plataforma tiene un único autor activo." />
  </section>

  {#if AUTHOR.name}
    <p class="text-center text-sm text-slate-500">Obra de {AUTHOR.name}</p>
  {/if}
</div>
