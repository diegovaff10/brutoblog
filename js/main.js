// --- Google Ads: inicializar anuncios ---
(function loadAds() {
  if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
    window.adsbygoogle.push({});
  }
})();



document.addEventListener("DOMContentLoaded", () => {
  // --- Variables DOM ---
  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
  const body = document.body;
  const btnOcultarAnuncios = document.getElementById('ocultar-anuncios');
  const btnMostrarAnuncios = document.getElementById('mostrar-anuncios');
  const mensajeGracias = document.getElementById('mensaje-gracias');
  const filtroBtns = document.querySelectorAll(".categoria-btn");
  const blogCards = document.querySelectorAll(".blog-card");
  const buscador = document.getElementById("buscador");

  // --- Constantes para localStorage ---
  const DARK_MODE_KEY = 'modo-oscuro';
  const ADS_OCULTOS_KEY = 'anuncios-ocultos';

  // --- Estado inicial ---
  let categoriaActiva = "todas";
  let terminoBusqueda = "";


  // --- Funciones ---

  function activarModoOscuro() {
    body.classList.add('dark-mode');
    toggleDarkModeBtn.textContent = 'Light Mode';
    toggleDarkModeBtn.setAttribute('aria-pressed', 'true');
    localStorage.setItem(DARK_MODE_KEY, 'true');
  }

  function desactivarModoOscuro() {
    body.classList.remove('dark-mode');
    toggleDarkModeBtn.textContent = 'Dark Mode';
    toggleDarkModeBtn.setAttribute('aria-pressed', 'false');
    localStorage.setItem(DARK_MODE_KEY, 'false');
  }

  function cargarModoOscuro() {
    const modoGuardado = localStorage.getItem(DARK_MODE_KEY);
    if (modoGuardado === 'true') {
      activarModoOscuro();
    } else {
      desactivarModoOscuro();
    }
  }

  function ocultarAnuncios() {
    document.querySelectorAll('.ads-container').forEach(ad => {
      ad.style.display = 'none';
    });
    if (mensajeGracias) mensajeGracias.style.display = 'block';
    if (btnOcultarAnuncios) btnOcultarAnuncios.setAttribute('aria-pressed', 'true');
    if (btnMostrarAnuncios) btnMostrarAnuncios.setAttribute('aria-pressed', 'false');
    localStorage.setItem(ADS_OCULTOS_KEY, 'true');
  }

  function mostrarAnuncios() {
    document.querySelectorAll('.ads-container').forEach(ad => {
      ad.style.display = '';
    });
    if (mensajeGracias) mensajeGracias.style.display = 'none';
    if (btnOcultarAnuncios) btnOcultarAnuncios.setAttribute('aria-pressed', 'false');
    if (btnMostrarAnuncios) btnMostrarAnuncios.setAttribute('aria-pressed', 'true');
    localStorage.setItem(ADS_OCULTOS_KEY, 'false');
  }

  function cargarEstadoAnuncios() {
    const estado = localStorage.getItem(ADS_OCULTOS_KEY);
    if (estado === 'true') {
      ocultarAnuncios();
    } else {
      mostrarAnuncios();
    }
  }

  function filtrarArticulos() {
    blogCards.forEach(card => {
      const categoria = card.dataset.categoria.toLowerCase();
      const contenido = card.innerText.toLowerCase();

      const coincideCategoria = (categoriaActiva === "todas" || categoria === categoriaActiva);
      const coincideBusqueda = contenido.includes(terminoBusqueda);

      card.style.display = (coincideCategoria && coincideBusqueda) ? "block" : "none";
    });
  }

  // --- Eventos ---

  if (toggleDarkModeBtn) {
    toggleDarkModeBtn.addEventListener('click', () => {
      const modoActual = localStorage.getItem(DARK_MODE_KEY);
      if (modoActual === 'true') {
        desactivarModoOscuro();
      } else {
        activarModoOscuro();
      }
    });
  }

  if (btnOcultarAnuncios) btnOcultarAnuncios.addEventListener('click', ocultarAnuncios);
  if (btnMostrarAnuncios) btnMostrarAnuncios.addEventListener('click', mostrarAnuncios);

  filtroBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filtroBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      categoriaActiva = btn.dataset.categoria.toLowerCase();
      filtrarArticulos();
    });
  });

  if (buscador) {
    buscador.addEventListener("input", () => {
      terminoBusqueda = buscador.value.toLowerCase();
      filtrarArticulos();
    });
  }

  // --- Inicializaciones ---
  cargarModoOscuro();
  cargarEstadoAnuncios();
  filtrarArticulos();
});


// --- Nav.html ---

fetch('/assets/nav.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);

    // Función para activar el botón hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-menu');

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const isOpen = nav.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
      });
    }
  })
  .catch(err => console.error('Error cargando nav:', err));

  // --- Footer ----

    fetch('/assets/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(err => console.error('Error cargando footer:', err));

// --- SCROLL REVEAL ---

document.addEventListener('DOMContentLoaded', () => {
  const contenido = document.querySelector('.entrada-contenido');
  if (contenido) {
    const children = contenido.children;
    for (const el of children) {
      el.classList.add('reveal');
    }
  }

  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(reveals).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 50}ms`; // más rápido
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01 }); // se activa antes

  reveals.forEach(el => observer.observe(el));
});


// --- COMPARTIR ---

document.addEventListener('DOMContentLoaded', () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  const links = {
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    whatsapp: `https://wa.me/?text=${pageTitle}%20${pageUrl}`,
    mail: `mailto:?subject=${pageTitle}&body=Te comparto esto: ${pageUrl}`
  };

  document.querySelector('.btn-share[aria-label*="X"]').href = links.twitter;
  document.querySelector('.btn-share[aria-label*="Facebook"]').href = links.facebook;
  document.querySelector('.btn-share[aria-label*="WhatsApp"]').href = links.whatsapp;
  document.querySelector('.btn-share[aria-label*="Mail"]').href = links.mail;
});


// --- SIDEBAR RELACIONADOS ---
document.addEventListener("DOMContentLoaded", () => {
  const listaPosts = document.getElementById("blog-relacionados-list");
  const etiquetaSpan = document.querySelector(".etiqueta-actual");
  const urlActual = window.location.pathname;

  if (!etiquetaSpan) {
    console.warn("No se encontró el span .etiqueta-actual");
    return;
  }

  const etiquetaActual = etiquetaSpan.textContent.trim().toLowerCase();

  fetch('/assets/blog/posts.json')
    .then(response => response.json())
    .then(posts => {
      listaPosts.innerHTML = '';

      let postsMostrados = 0;

      posts.forEach(post => {
        if (!post.categoria || !post.url) {
          console.warn("Post sin categoría o URL:", post);
          return;
        }

        const categoriaPost = post.categoria.toLowerCase();
        const mismaEtiqueta = categoriaPost === etiquetaActual;
        const noEsActual = !urlActual.includes(post.url);

        if (mismaEtiqueta && noEsActual) {
          const li = document.createElement('li');

          const img = document.createElement('img');
          img.src = post.img;
          img.alt = post.alt;

          const contenidoCard = document.createElement('div');
          contenidoCard.className = 'contenido-card';

          const enlace = document.createElement('a');
          enlace.href = post.url;
          enlace.className = 'titulo-post';
          enlace.textContent = post.titulo;

          const boton = document.createElement('button');
          boton.className = 'leer-mas';
          boton.textContent = 'Leer más';
          boton.onclick = () => {
            location.href = post.url;
          };

          contenidoCard.appendChild(enlace);
          contenidoCard.appendChild(boton);

          li.appendChild(img);
          li.appendChild(contenidoCard);

          listaPosts.appendChild(li);

          postsMostrados++;
        }
      });

      if (postsMostrados === 0) {
        listaPosts.innerHTML = '<li>No hay posts relacionados en esta categoría.</li>';
      }
    })
    .catch(err => {
      console.error("Error cargando posts relacionados:", err);
      listaPosts.innerHTML = '<li>Error al cargar posts relacionados.</li>';
    });
});

