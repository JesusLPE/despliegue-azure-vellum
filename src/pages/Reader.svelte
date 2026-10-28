<script>
  import { getSeries, getChapter } from '../data/story.js'
  import { route, urls } from '../lib/router.svelte.js'
  import { setLast } from '../lib/library.svelte.js'
  import { decorate } from '../lib/decorate.js'
  import Icon from '../lib/Icon.svelte'
  import NotFound from './NotFound.svelte'

  const series = $derived(getSeries(route.params.slug))
  const chapter = $derived(getChapter(series, route.params.number))
  const prev = $derived(chapter && getChapter(series, chapter.number - 1))
  const next = $derived(chapter && getChapter(series, chapter.number + 1))

  let progress = $state(0)

  // Recuerda el último capítulo abierto (solo en este navegador).
  $effect(() => {
    if (series && chapter) setLast(series.slug, chapter.number)
  })

  // Barra de progreso de lectura según el scroll.
  $effect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

{#if !series || !chapter}
  <NotFound />
{:else}
  <div class="min-h-screen bg-black">
    <div class="sticky top-0 z-40 border-b border-ink-700 bg-ink-900/95 backdrop-blur">
      <div class="mx-auto flex max-w-[760px] items-center gap-2 px-3 py-2.5">
        <a href={urls.detail(series.slug)} class="btn !h-10 !px-3.5 text-sm" aria-label="Volver a la serie">
          <Icon name="back" size={16} /><span class="hidden sm:inline">Volver</span>
        </a>

        <div class="min-w-0 flex-1 leading-tight">
          <p class="truncate font-semibold text-slate-100">{series.title}</p>
          <p class="truncate text-sm text-slate-400">Capítulo {chapter.number}: {chapter.title}</p>
        </div>

        {#if prev}
          <a href={urls.reader(series.slug, prev.number)} class="btn !h-10 !px-3.5 text-sm" aria-label="Capítulo anterior">
            <Icon name="left" size={16} />
          </a>
        {:else}
          <span class="btn !h-10 !px-3.5 pointer-events-none opacity-30" aria-hidden="true"><Icon name="left" size={16} /></span>
        {/if}
        {#if next}
          <a href={urls.reader(series.slug, next.number)} class="btn !h-10 !px-3.5 text-sm" aria-label="Capítulo siguiente">
            <Icon name="right" size={16} />
          </a>
        {:else}
          <span class="btn !h-10 !px-3.5 pointer-events-none opacity-30" aria-hidden="true"><Icon name="right" size={16} /></span>
        {/if}
      </div>
      <div class="h-[3px] bg-ink-800">
        <div class="h-full bg-primary-500" style="width: {progress}%"></div>
      </div>
    </div>

    {#key chapter.number}
      <article class="comic mx-auto max-w-[760px] px-3 pt-6" use:decorate>
        <header class="px-2 pb-8 pt-6 text-center">
          <p class="text-sm tracking-[0.3em] text-primary-300">CAPÍTULO {chapter.number}</p>
          <h1 class="mt-2 font-display text-3xl text-slate-50 sm:text-4xl">{chapter.title}</h1>
          <span class="mx-auto mt-5 block h-px w-16 bg-primary-500/70"></span>
        </header>

        <div class="strip">
          {@html chapter.html}
        </div>
      </article>
    {/key}

    <nav class="mx-auto flex max-w-[760px] flex-col items-center gap-3 px-4 pb-16 pt-4" aria-label="Fin del capítulo">
      {#if next}
        <a href={urls.reader(series.slug, next.number)} class="btn-primary w-full max-w-sm">
          Siguiente capítulo <Icon name="right" size={18} />
        </a>
      {:else}
        <p class="text-center text-slate-400">Estás al día. Pronto habrá más capítulos.</p>
      {/if}
      <a href={urls.detail(series.slug)} class="btn w-full max-w-sm">Volver a la lista de capítulos</a>
    </nav>
  </div>
{/if}
