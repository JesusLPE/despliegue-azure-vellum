<script>
  import { urls } from '../lib/router.svelte.js'
  import EmptyState from '../lib/EmptyState.svelte'
</script>

<div class="mx-auto flex max-w-md flex-col items-center gap-5 px-4 py-16">
  <EmptyState title="Página no encontrada" text="La dirección no existe o el contenido ya no está disponible." />
  <a href={urls.home} class="btn">Volver al inicio</a>
</div>
