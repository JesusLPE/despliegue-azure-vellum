// Acción de Svelte: añade lluvia animada, trama de puntos y viñeta
// a cada <svg class="art"> del contenido del webcomic.
const NS = 'http://www.w3.org/2000/svg'

function rng(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function decorate(node) {
  node.querySelectorAll('svg.art').forEach((svg, i) => {
    if (svg.dataset.decorated) return
    svg.dataset.decorated = '1'

    const vb = svg.viewBox.baseVal
    const W = vb.width
    const H = vb.height
    const drops = Number(svg.getAttribute('data-rain')) || 0

    if (drops) {
      const g = document.createElementNS(NS, 'g')
      g.setAttribute('class', 'rain')
      const r = rng(i * 977 + 13)
      for (let k = 0; k < drops; k++) {
        const line = document.createElementNS(NS, 'line')
        const x = r() * (W + 120) - 20
        const y = r() * (H + 80) - 70
        const len = 14 + r() * 16
        line.setAttribute('x1', x)
        line.setAttribute('y1', y)
        line.setAttribute('x2', x - len * 0.25)
        line.setAttribute('y2', y + len)
        line.setAttribute('stroke', '#b4c4dc')
        line.setAttribute('stroke-opacity', (0.12 + r() * 0.28).toFixed(2))
        line.setAttribute('stroke-width', (0.8 + r() * 0.9).toFixed(1))
        g.appendChild(line)
      }
      svg.appendChild(g)
    }

    ;['ht', 'vig'].forEach((id) => {
      const rect = document.createElementNS(NS, 'rect')
      rect.setAttribute('width', W)
      rect.setAttribute('height', H)
      rect.setAttribute('fill', `url(#${id})`)
      rect.setAttribute('pointer-events', 'none')
      svg.appendChild(rect)
    })
  })
}
