<script>
  import { route, urls } from './router.svelte.js'
  import Icon from './Icon.svelte'

  const items = [
    { key: 'home', label: 'Inicio', href: urls.home, icon: 'home' },
    { key: 'series', label: 'Series', href: urls.series, icon: 'layers' },
    { key: 'rankings', label: 'Rankings', href: urls.rankings, icon: 'trending' },
    { key: 'chapters', label: 'Capítulos', href: urls.chapters, icon: 'book' },
  ]

  const isActive = (key) => route.name === key || (key === 'series' && route.name === 'detail')
</script>

<nav
  class="fixed inset-x-0 bottom-0 z-30 border-t border-ink-700 bg-ink-900/95 backdrop-blur md:hidden"
  style="padding-bottom: env(safe-area-inset-bottom, 0px)"
  aria-label="Navegación móvil"
>
  <ul class="mx-auto flex max-w-md justify-between px-2">
    {#each items as item}
      <li class="flex-1">
        <a
          href={item.href}
          class="flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors {isActive(item.key)
            ? 'text-primary-300'
            : 'text-slate-500 hover:text-slate-300'}"
          aria-current={isActive(item.key) ? 'page' : undefined}
        >
          <Icon name={item.icon} size={22} />
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
