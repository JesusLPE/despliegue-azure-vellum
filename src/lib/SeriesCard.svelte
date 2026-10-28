<script>
  import { urls } from './router.svelte.js'
  import { decorate } from './decorate.js'

  let { series } = $props()
</script>

<a
  href={urls.detail(series.slug)}
  class="group flex flex-col overflow-hidden rounded-[22px] border border-ink-700 bg-ink-850 transition-colors hover:border-primary-500"
>
  <div class="comic thumb aspect-[3/4] overflow-hidden bg-ink-800" use:decorate>
    {@html series.thumbHtml}
  </div>
  <div class="p-4">
    <p class="font-semibold leading-tight text-slate-100">{series.title}</p>
    <p class="mt-1 text-sm text-slate-400">{series.genre} · {series.chapters.length} capítulos</p>
  </div>
</a>
