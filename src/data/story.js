// =============================================================
// DATOS ESTÁTICOS (mock interno). No hay base de datos ni API:
// todo el contenido vive en este archivo y en src/content/*.html
// =============================================================
import spriteRaw from '../content/sprite.html?raw'
import coverRaw from '../content/cover.html?raw'
import cap1Raw from '../content/cap1.html?raw'
import cap2Raw from '../content/cap2.html?raw'

export const SITE = {
  name: 'Vellum',
  tagline: 'Lectura de webcomics',
}

// Autor activo. Escribe aquí el nombre; mientras esté vacío no se muestra ninguna tarjeta de autor.
export const AUTHOR = {
  name: '',
}

// Símbolos y degradados SVG compartidos por todo el arte de los capítulos.
export const sprite = spriteRaw

// Solo el dibujo de la portada (sin el título superpuesto), recortado en vertical para miniaturas.
const coverSvg = coverRaw.match(/<svg[\s\S]*<\/svg>/)[0]
const thumbArt = coverSvg.replace('<svg class="art"', '<svg class="art" preserveAspectRatio="xMidYMid slice"')

export const SERIES = [
  {
    slug: 'ecos-del-olimpo',
    title: 'Ecos del Olimpo',
    genre: 'Fantasía',
    status: 'En publicación',
    synopsis:
      'Cuando los dioses abandonan el Olimpo, un joven cartógrafo descubre que los mapas que dibuja cambian la realidad. Entre traiciones divinas y ciudades que desaparecen, deberá decidir qué mundo merece salvarse.',
    coverHtml: coverRaw, // portada completa con título
    thumbHtml: thumbArt, // solo arte, para tarjetas
    chapters: [
      { number: 1, title: 'El mapa que respira', publishedAt: '2026-10-13', html: cap1Raw },
      { number: 2, title: 'La tinta de la memoria', publishedAt: '2026-10-20', html: cap2Raw },
    ],
  },
]

export const getSeries = (slug) => SERIES.find((s) => s.slug === slug)

export const getChapter = (series, number) => series?.chapters.find((c) => c.number === number)

/** Capítulos de todas las series, del más reciente al más antiguo. */
export const latestChapters = () =>
  SERIES.flatMap((s) => s.chapters.map((c) => ({ ...c, series: s })))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.number - a.number)

export const formatDate = (iso) =>
  new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso + 'T12:00:00'))
