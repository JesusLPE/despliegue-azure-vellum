<script>
  import { getSeries, AUTHOR, formatDate } from '../data/story.js'
  import { route, urls } from '../lib/router.svelte.js'
  import { library, toggleSaved } from '../lib/library.svelte.js'
  import { decorate } from '../lib/decorate.js'
  import Icon from '../lib/Icon.svelte'
  import ChapterRow from '../lib/ChapterRow.svelte'
  import EmptyState from '../lib/EmptyState.svelte'
  import NotFound from './NotFound.svelte'

  const series = $derived(getSeries(route.params.slug))

  let tab = $state('capitulos')
  let search = $state('')
  let newestFirst = $state(true)

  const chapters = $derived.by(() => {
    if (!series) return []
    const q = search.trim()
    const list = series.chapters.filter((c) => !q || String(c.number).includes(q))
    return [...list].sort((a, b) => (newestFirst ? b.number - a.number : a.number - b.number))
  })

  const saved = $derived(!!library.saved[series?.slug])
  const startAt = $derived(library.last[series?.slug] ?? series?.chapters[0].number)
  const resuming = $derived(library.last[series?.slug] != null)

  const tabs = $derived([
    { key: 'capitulos', label: 'Capítulos', count: series?.chapters.length },
    { key: 'comentarios', label: 'Comentarios' },
    { key: 'sinopsis', label: 'Sinopsis' },
  ])
</script>

{#if !series}
  <NotFound />
{:else}
  <div class="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6">
    <a href={urls.series} class="inline-flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-primary-300">
      <Icon name="back" size={16} /> Volver a series
    </a>

    <section class="card flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start">
      <div class="comic thumb aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-2xl border border-ink-600 bg-ink-800" use:decorate>
        {@html series.thumbHtml}
      </div>

      <div class="flex min-w-0 flex-1 flex-col items-center gap-4 text-center sm:items-start sm:text-left">
        <h1 class="font-display text-3xl leading-tight text-slate-50">{series.title}</h1>

        <div class="flex flex-wrap justify-center gap-2 sm:justify-start">
          <span class="pill">{series.genre}</span>
          <span class="pill"><span class="h-2 w-2 rounded-full bg-primary-500"></span>{series.status}</span>
          <span class="pill">{series.chapters.length} capítulos</span>
        </div>

        <div class="flex w-full flex-wrap gap-3">
          <button
            type="button"
            class="btn w-full sm:w-auto {saved ? '!border-primary-500 !text-primary-300' : ''}"
            aria-pressed={saved}
            onclick={() => toggleSaved(series.slug)}
          >
            <Icon name="bookmark" size={18} />
            {saved ? 'Guardado' : 'Guardar'}
          </button>
          <a href={urls.reader(series.slug, startAt)} class="btn-primary w-full sm:flex-1">
            <Icon name="play" size={18} />
            {resuming ? `Continuar: capítulo ${startAt}` : 'Empezar a leer'}
          </a>
        </div>
      </div>
    </section>

    {#if AUTHOR.name}
      <section class="card flex items-center gap-4 px-5 py-4">
        <span class="grid h-14 w-14 place-items-center rounded-full bg-ink-700 text-xl font-bold text-slate-200">
          {AUTHOR.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p class="text-sm text-slate-500">Autor</p>
          <p class="text-lg font-bold text-slate-100">{AUTHOR.name}</p>
        </div>
      </section>
    {/if}

    <section class="card overflow-hidden">
      <div class="flex gap-5 overflow-x-auto border-b border-ink-700 px-5 sm:gap-7 sm:px-6" role="tablist">
        {#each tabs as t}
          <button
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            class="relative flex items-baseline gap-2 whitespace-nowrap py-5 font-semibold transition-colors {tab === t.key
              ? 'text-slate-50'
              : 'text-slate-500 hover:text-slate-300'}"
            onclick={() => (tab = t.key)}
          >
            {t.label}
            {#if t.count != null}<span class="text-sm text-slate-500">{t.count}</span>{/if}
            {#if tab === t.key}<span class="absolute inset-x-0 -bottom-px h-0.5 bg-primary-500"></span>{/if}
          </button>
        {/each}
      </div>

      {#if tab === 'capitulos'}
        <div class="flex flex-col gap-3 border-b border-ink-700 bg-ink-900 p-4 sm:flex-row">
          <label class="relative flex-1">
            <Icon name="search" size={16} class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              inputmode="numeric"
              class="field !pl-11"
              placeholder="Ir al capítulo..."
              aria-label="Ir al capítulo"
              bind:value={search}
            />
          </label>
          <button
            type="button"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink-600 px-5 text-sm text-slate-200 transition-colors hover:border-primary-400 hover:text-primary-300"
            onclick={() => (newestFirst = !newestFirst)}
          >
            {newestFirst ? 'Más reciente primero' : 'Más antiguo primero'}
            <Icon name={newestFirst ? 'down' : 'up'} size={16} />
          </button>
        </div>

        <div class="p-4">
          {#if chapters.length}
            <ul class="flex flex-col gap-3">
              {#each chapters as ch (ch.number)}
                <li><ChapterRow slug={series.slug} chapter={ch} /></li>
              {/each}
            </ul>
          {:else}
            <EmptyState title="No hay contenido disponible" text="No existe un capítulo con ese número." />
          {/if}
        </div>
      {:else if tab === 'comentarios'}
        <div class="p-4">
          <EmptyState
            title="No hay contenido disponible"
            text="Los comentarios no están habilitados en esta versión estática."
          />
        </div>
      {:else}
        <p class="p-6 leading-relaxed text-slate-300">{series.synopsis}</p>
      {/if}
    </section>
  </div>
{/if}
