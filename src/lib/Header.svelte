<script>
  import { route, urls, go } from './router.svelte.js'
  import { SITE } from '../data/story.js'
  import Icon from './Icon.svelte'

  const items = [
    { key: 'home', label: 'Inicio', href: urls.home },
    { key: 'series', label: 'Series', href: urls.series },
    { key: 'rankings', label: 'Rankings', href: urls.rankings },
    { key: 'chapters', label: 'Capítulos', href: urls.chapters },
  ]

  let q = $state('')

  const isActive = (key) => route.name === key || (key === 'series' && route.name === 'detail')

  function submit(e) {
    e.preventDefault()
    const term = q.trim()
    go(term ? `#/series?q=${encodeURIComponent(term)}` : urls.series)
  }
</script>

<header class="sticky top-0 z-30 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
  <div class="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
    <a href={urls.home} class="flex shrink-0 items-center gap-2.5" aria-label="{SITE.name}, ir al inicio">
      <span class="grid h-10 w-10 place-items-center rounded-xl bg-primary-600 font-display text-xl text-white">V</span>
      <span class="hidden font-display text-xl tracking-wide text-slate-100 sm:inline">{SITE.name}</span>
    </a>

    <form class="relative min-w-0 flex-1" onsubmit={submit} role="search">
      <Icon name="search" size={18} class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        type="search"
        class="field !h-11 !pl-11"
        placeholder="Busca tu proxima historia..."
        aria-label="Buscar series"
        bind:value={q}
      />
    </form>

    <nav class="hidden items-center gap-1 md:flex" aria-label="Principal">
      {#each items as item}
        <a
          href={item.href}
          class="rounded-full px-4 py-2 text-sm font-semibold transition-colors {isActive(item.key)
            ? 'bg-primary-600/20 text-primary-300'
            : 'text-slate-400 hover:text-slate-100'}"
          aria-current={isActive(item.key) ? 'page' : undefined}
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </div>
</header>
