// Router mínimo basado en hash (#/series/...). No necesita configuración
// de servidor, así que funciona tal cual en Azure Static Web Apps.

function parse() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, qs = ''] = raw.split('?')
  const query = Object.fromEntries(new URLSearchParams(qs))
  const seg = path.split('/').filter(Boolean)

  let name = 'notfound'
  let params = {}

  if (seg.length === 0) name = 'home'
  else if (seg[0] === 'series' && seg.length === 1) name = 'series'
  else if (seg[0] === 'series' && seg.length === 2) {
    name = 'detail'
    params = { slug: seg[1] }
  } else if (seg[0] === 'series' && seg.length === 4 && seg[2] === 'capitulo') {
    name = 'reader'
    params = { slug: seg[1], number: Number(seg[3]) }
  } else if (seg[0] === 'rankings' && seg.length === 1) name = 'rankings'
  else if (seg[0] === 'capitulos' && seg.length === 1) name = 'chapters'

  return { name, params, query }
}

export const route = $state(parse())

function sync() {
  const next = parse()
  route.name = next.name
  route.params = next.params
  route.query = next.query
  window.scrollTo(0, 0)
}

window.addEventListener('hashchange', sync)

export const urls = {
  home: '#/',
  series: '#/series',
  rankings: '#/rankings',
  chapters: '#/capitulos',
  detail: (slug) => `#/series/${slug}`,
  reader: (slug, number) => `#/series/${slug}/capitulo/${number}`,
}

export function go(url) {
  window.location.hash = url
}
