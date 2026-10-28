# Vellum

Plataforma de lectura de webcomics hecha con **Svelte 5 + Vite + Tailwind CSS**.

Contenido actual: la historia **Ecos del Olimpo** con 2 capítulos. Las demás secciones
(otros autores, rankings, comentarios) muestran estados vacíos.

## Inicio rápido

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera la carpeta dist/
npm run preview    # prueba local del build
```

## Estructura

```
index.html
tailwind.config.js        # paleta: primary (rojo oscuro) + ink (grises carbón)
src/
├─ main.js
├─ app.css                # Tailwind + componentes base (.card, .btn, .pill, .field)
├─ reader.css             # estilos del arte del webcomic (paneles, globos, narración)
├─ App.svelte             # elige la vista según la ruta
├─ data/story.js          # ÚNICA fuente de datos (series, capítulos, autor)
├─ content/               # arte de la historia (HTML/SVG): sprite, cover, cap1, cap2
├─ lib/                   # router por hash, biblioteca local, componentes reutilizables
└─ pages/                 # Home, Series, SeriesDetail, Rankings, Chapters, Reader
```

## Editar contenido

- **Autor activo**: en `src/data/story.js`, `AUTHOR.name`. Mientras esté vacío no se muestra tarjeta de autor.
- **Fechas, títulos y sinopsis**: en `src/data/story.js`.
- **Capítulos**: cada capítulo es un archivo en `src/content/` (`cap1.html`, `cap2.html`).
  Para añadir uno, crea `cap3.html`, impórtalo en `story.js` y agrégalo a `chapters`.
- **Colores**: en `tailwind.config.js` (`primary` y `ink`). El rojo de la "tinta mágica" del arte
  está en `src/reader.css` (`--magic`, `--magic-lt`).

## Datos locales del lector

Las series guardadas y el último capítulo leído se guardan solo en el navegador
(`localStorage`, clave `vellum.library.v1`). No se envía nada a ningún servidor.

## Despliegue en Azure Static Web Apps

| Campo             | Valor           |
| ----------------- | --------------- |
| App location      | `/`             |
| Api location      | *(vacío)*       |
| Output location   | `dist`          |
| Build command     | `npm run build` |

La navegación usa rutas con hash (`#/series/...`), por lo que no necesita reglas de
redirección en el servidor. Las fuentes se cargan desde Google Fonts.
