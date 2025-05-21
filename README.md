# BrutoBlog 🧠✊  
**Un blog brutalista con estilo propio, escalable y funcional.**  

---

## 🧱 Estructura del Proyecto
```
brutoblog/
├── index.html
├── blog/
│   ├── entrada-1.html
│   ├── entrada-2.html
│   └── ...
├── assets/
│   ├── img/
│   ├── icons/
│   └── misc/
│       └── fondo-textura.png
├── components/
│   └── nav.html
├── scss/
│   ├── base/
│   ├── layout/
│   ├── modules/
│   ├── utils/
│   └── main.scss
├── public/
│   └── css/
│       └── styles.css
├── js/
│   ├── main.js
│   └── navScroll.js
├── data/
│   └── blogData.js
└── README.md
```


---

## Cómo usar

### Requisitos previos

- Tener instalado [Sass](https://sass-lang.com/install)
- Un navegador moderno (Chrome, Firefox, Edge, etc.)

### Instalación

1. Clonar el repositorio o descargar los archivos.

2. Compilar SCSS a CSS con:

```bash
sass --watch scss/main.scss:css/styles.css

3. Abrir index.html en el navegador.

### Funcionalidades

- Modo oscuro que guarda preferencia en localStorage.

- Control para mostrar u ocultar anuncios.

- Filtrado por categorías y buscador en tiempo real.

- Estilo brutalista con diseño modular en SCSS.

- Carga diferida de imágenes (loading="lazy").

### Contribuir

Si quieres colaborar:

Usa la estructura modular de SCSS y JS.

Agrega nuevos partials si necesitas estilos o funcionalidades.

Sigue el patrón de clases y data-atributos para el filtrado.

Mantén la carpeta assets/blog/ organizada con imágenes optimizadas.


## 🎨 Estilos

- Estilo brutalista.
- Tipografía `Courier New` o `'Share Tech Mono'`.
- Bordes gruesos (`3px solid #000`), fondos blancos y sombras desplazadas.
- Efectos `hover` en las tarjetas y animaciones suaves.
- Modo responsive activado mediante `media queries`.

---

## 🧑‍💻 Funcionalidades Clave

### 🧭 Navegación
- `nav.html` se carga dinámicamente desde `/components/nav.html` usando `fetch()`.
- Menú hamburguesa en mobile con `#menu-toggle`.
- Efecto scroll:
  - Al hacer scroll hacia abajo, el nav se achica.
  - Al hacer scroll hacia arriba, vuelve a su tamaño original.

### 📰 Blog Cards
- Los artículos del blog se cargan dinámicamente con JS.
- Cada tarjeta (`.blog-card`) incluye:
  - Imagen (`<img>`).
  - Título.
  - Categoría (como `data-categoria` para filtros).
  - Link a su entrada individual.
- Estilos visuales aplicados automáticamente al cargarse.

### 🔎 Filtros y Búsqueda
- Filtro por categorías usando `data-categoria`.
- Barra de búsqueda por título en tiempo real.
- Ambos funcionan sobre los elementos dinámicamente generados.

---

## 📱 Responsive

**Sistema de grid:**

```css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
3 tarjetas por fila en desktop.

2 en tablet.

1 en mobile.

Adaptable vía media queries.

🧠 Lógica de JS (main.js)

initNav() → Carga el nav + efectos scroll.

cargarArticulosBlog() → Inyecta dinámicamente tarjetas.

setupFilters() → Filtros por categoría.

setupSearch() → Búsqueda en vivo.

Ejemplo de artículo cargado:

js
Copiar
Editar
{
  titulo: "CSS y el arte de perder la calma",
  imagen: "assets/img/css-calma.jpg",
  categoria: "Diseño",
  enlace: "/blog/css-y-el-arte-de-perder-la-calma.html"
}
📦 Para Escalar

✅ Separar artículos en un data/blogData.js o consumirlos de un archivo .json para facilitar el mantenimiento.

✅ Pasar a una SPA con routing si querés hacerlo con Vue/React.

✅ Usar un generador estático (como Eleventy o Astro) si escalás a cientos de entradas.

✅ Usar localStorage para guardar preferencias de usuario (modo oscuro, filtros, etc).

🧪 Recomendaciones Técnicas

Modularizá tu SCSS por secciones: base/, layout/, modules/.

Usá @use y @forward en lugar de @import en Sass.

Mantené todo el JS desacoplado, cada función con una única responsabilidad.

No olvides poner defer en los <script> para evitar errores de DOM no cargado.

🚀 To-Do Futuro

 Agregar sistema de paginación en el blog.

 Integrar botón “Agregar a favoritos”.

 Versión dark mode definitiva.

 Panel de administración simple (aunque sea mockeado).

 Agregar animaciones suaves con ScrollReveal o GSAP.

 Mejorar accesibilidad: roles, aria-labels, contraste de colores.

✍️ Créditos
Desarrollado con amor, sarcasmo y brutalismo por Diego Adrián Videla ✨
