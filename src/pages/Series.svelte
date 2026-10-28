<script>
  import { SERIES } from '../data/story.js'
  import { route } from '../lib/router.svelte.js'
  import SeriesCard from '../lib/SeriesCard.svelte'
  import EmptyState from '../lib/EmptyState.svelte'

  const term = $derived((route.query.q ?? '').trim().toLowerCase())
  const results = $derived(SERIES.filter((s) => !term || s.title.toLowerCase().includes(term)))
</script>

<div class="mx-auto max-w-5xl px-4 py-6">
  <h1 class="text-2xl font-bold text-slate-100">Series</h1>
  <p class="mb-5 mt-1 text-slate-400">
    {#if term}Resultados para “{route.query.q}”{:else}Todas las series publicadas{/if}
  </p>

  {#if results.length}
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {#each results as series (series.slug)}
        <SeriesCard {series} />
      {/each}
    </div>
  {:else}
    <EmptyState
      title="No hay contenido disponible"
      text={term ? 'Ninguna serie coincide con tu búsqueda.' : 'Todavía no hay series publicadas.'}
    />
  {/if}
</div>
