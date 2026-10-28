<script>
  import Icon from './Icon.svelte'

  let { title = 'No hay contenido disponible', text = '' } = $props()
</script>

<div class="flex flex-col items-center gap-2 rounded-[22px] border border-dashed border-ink-600 px-6 py-10 text-center">
  <span class="grid h-12 w-12 place-items-center rounded-full bg-ink-800 text-slate-500">
    <Icon name="inbox" size={22} />
  </span>
  <p class="font-semibold text-slate-300">{title}</p>
  {#if text}
    <p class="max-w-sm text-sm text-slate-500">{text}</p>
  {/if}
</div>
