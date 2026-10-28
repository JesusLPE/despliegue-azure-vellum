// Preferencias del lector guardadas solo en el navegador (localStorage):
// series guardadas y último capítulo leído. No se envía nada a ningún servidor.

const KEY = 'vellum.library.v1'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const initial = read()

export const library = $state({
  saved: initial.saved ?? {},
  last: initial.last ?? {},
})

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ saved: library.saved, last: library.last }))
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

export function toggleSaved(slug) {
  library.saved[slug] = !library.saved[slug]
  persist()
}

export function setLast(slug, number) {
  library.last[slug] = number
  persist()
}
