<script>
  import { route } from './lib/router.svelte.js'
  import { sprite } from './data/story.js'
  import Header from './lib/Header.svelte'
  import BottomNav from './lib/BottomNav.svelte'
  import Footer from './lib/Footer.svelte'
  import Home from './pages/Home.svelte'
  import Series from './pages/Series.svelte'
  import SeriesDetail from './pages/SeriesDetail.svelte'
  import Rankings from './pages/Rankings.svelte'
  import Chapters from './pages/Chapters.svelte'
  import Reader from './pages/Reader.svelte'
  import NotFound from './pages/NotFound.svelte'
</script>

<!-- Símbolos y degradados SVG compartidos por el arte de los capítulos -->
{@html sprite}

{#if route.name === 'reader'}
  <Reader />
{:else}
  <Header />
  <main class="pb-24 md:pb-10">
    {#if route.name === 'home'}
      <Home />
    {:else if route.name === 'series'}
      <Series />
    {:else if route.name === 'detail'}
      <SeriesDetail />
    {:else if route.name === 'rankings'}
      <Rankings />
    {:else if route.name === 'chapters'}
      <Chapters />
    {:else}
      <NotFound />
    {/if}
  </main>
  <Footer />
  <BottomNav />
{/if}
