/* =========================================================
   Utilidades básicas
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =========================================================
   Config (puede venir desde index.html vía window.DEDICATORIAS_CONFIG)
   ========================================================= */
const CONFIG = Object.assign(
  { baseDir: "Dedicatorias", useManifest: true },
  window.DEDICATORIAS_CONFIG || {}
);

/* Si no hay manifest.json, usar fallback en index.html: window.DEDICATORIAS_FOLDERS = ["Carpeta1", ...] */
const FOLDERS_FALLBACK = Array.isArray(window.DEDICATORIAS_FOLDERS)
  ? window.DEDICATORIAS_FOLDERS
  : [];

/* Línea de tiempo opcional (si no hay, no pasa nada) */
const TIMELINE_EVENTS = window.TIMELINE_EVENTS || [];

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* Menú móvil */
  const nav = $("#nav");
  const toggle = $(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#nav a").forEach(a =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* Animaciones de entrada */
  const revealEls = [];
  $$(".section, .card, .tile, .section-header").forEach(el => {
    el.classList.add("reveal");
    revealEls.push(el);
  });
  const ioReveal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        ioReveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => ioReveal.observe(el));

  /* Línea de tiempo (si existe) */
  renderTimeline();

  /* Carga de dedicatorias */
  initDedicatorias();

  /* Formulario de mensaje (opcional) */
  const contactForm = $("#contactForm");
  const contactStatus = $("#contactStatus");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      if (contactStatus) contactStatus.textContent = "Completá tu nombre y mensaje.";
      return;
    }
    const data = Object.fromEntries(new FormData(contactForm).entries());
    console.log("Mensaje:", data);
    if (contactStatus) contactStatus.textContent = "Mensaje enviado.";
    contactForm.reset();
  });

  /* Cierre robusto del modal: X, fondo y ESC */
  const dlg = $("#dedicatoriaModal");
  if (dlg) {
    // Clic en X
    document.addEventListener("click", (ev) => {
      const btn = ev.target.closest("#modalClose");
      if (btn && dlg.open) dlg.close();
    });
    // Clic en backdrop
    dlg.addEventListener("click", (ev) => {
      if (ev.target === dlg && dlg.open) dlg.close();
    });
    // Tecla ESC
    dlg.addEventListener("cancel", (ev) => {
      ev.preventDefault();
      if (dlg.open) dlg.close();
    });
  }
});

/* =========================================================
   DEDICATORIAS: cargar, normalizar y renderizar
   ========================================================= */
async function initDedicatorias(){
  let items = [];
  if (CONFIG.useManifest) {
    items = await loadFromManifest().catch(() => []);
  }
  if (!items.length) {
    items = buildFromFoldersFallback(FOLDERS_FALLBACK);
  }
  window.__DEDICATORIAS = items;
  renderDedicatorias(items);
  setupFilters(items);
  setupLazyPreviewIframes(); // carga perezosa para todos los iframes desbloqueados
}

async function loadFromManifest(){
  const url = `${CONFIG.baseDir}/manifest.json`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("No manifest");
  const manifest = await res.json();
  // Items mínimos:
  // - Para web/carta/poema: { carpeta, id?, titulo?, tipo?, disponibleDesde? }
  // - Para video:           { id?, titulo?, tipo:"video", url, disponibleDesde? }
  return (manifest || []).map(normalizeItemFromManifest);
}

function normalizeItemFromManifest(raw){
  const tipo = raw.tipo || "web";

  if (tipo === "video") {
    // Video externo via url (YouTube, Vimeo, Drive, etc.)
    const id = raw.id || slugFromTitle(raw.titulo || "Video");
    const enlace = raw.url || ""; // obligatorio para video
    const disponibleDesde = raw.disponibleDesde ? new Date(raw.disponibleDesde) : null;
    return {
      id,
      carpeta: null,
      titulo: raw.titulo || "Video",
      tipo: "video",
      enlace,
      disponibleDesde
    };
  }

  // Web / carta / poema (usa carpeta + index.html)
  const carpeta = raw.carpeta || raw.id || "";
  const id = raw.id || carpeta || slugFromTitle(raw.titulo || "Dedicatoria");
  const enlace = `${CONFIG.baseDir}/${carpeta}/index.html`;
  const disponibleDesde = raw.disponibleDesde ? new Date(raw.disponibleDesde) : null;

  return {
    id,
    carpeta,
    titulo: raw.titulo || prettifySlug(carpeta || id),
    tipo,
    enlace,
    disponibleDesde
  };
}

function buildFromFoldersFallback(folders){
  return folders.map(name => ({
    id: name,
    carpeta: name,
    titulo: prettifySlug(name),
    tipo: "web",
    enlace: `${CONFIG.baseDir}/${name}/index.html`,
    disponibleDesde: null
  }));
}

function renderDedicatorias(list){
  const grid = $("#dedicatoriasGrid");
  if (!grid) return;

  const html = (list || []).map(item => cardDedicatoria(item)).join("");
  grid.innerHTML = html || `<p>No se encontraron dedicatorias en <code>${CONFIG.baseDir}/</code>.</p>`;

  // Botones VER (desbloqueados)
  $$(".card-dedicatoria .btn-open").forEach(btn => {
    btn.addEventListener("click", () => {
      const href = btn.dataset.href;
      if (href) window.open(href, "_blank", "noopener");
    });
  });

  // Botones VER bloqueados -> muestran vista “No disponible”
  $$(".card-dedicatoria .btn-locked").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title || "Dedicatoria";
      const until = btn.dataset.until || "";
      showLockedView(title, until);
    });
  });
}

function cardDedicatoria(item){
  const locked = isLocked(item);
  const tipo = capitalize(item.tipo || "web");
  const untilText = formatUntil(item.disponibleDesde);

  // Iframe/preview: para video usamos el propio enlace del embed; para web/carta/poema es index.html
  // Siempre renderizamos el iframe; si está bloqueado aplicamos blur + overlay.
  const isVideo = item.tipo === "video";

  const iframeAttrs = [
    `class="preview-iframe"`,
    `title="${escapeHtml(item.titulo)}"`,
    `loading="lazy"`,
    `style="width:100%;aspect-ratio:16/9;border:0;border-radius:.5rem;${isVideo ? 'background:#000' : 'background:#fff'}"`
  ];

  // Carga perezosa uniforme: usamos data-src; si está bloqueado lo dejamos sin data-src (no cargará)
  const dataSrc = locked ? "" : item.enlace;
  if (dataSrc) iframeAttrs.push(`data-src="${escapeHtml(dataSrc)}"`);

  const iframeHtml = `
    <div class="preview-wrap ${locked ? "is-locked" : ""}">
      <div class="iframe-skeleton"></div>
      <iframe ${iframeAttrs.join(" ")}></iframe>
      ${locked ? `
        <div class="lock-overlay">
          <div class="lock-message">
            <strong>No disponible ahora</strong><br>
            sino hasta ${escapeHtml(untilText)}.
          </div>
        </div>
      ` : ""}
    </div>`;

  const btn = locked
    ? `<button type="button" class="btn btn-secondary btn-locked"
               data-title="${escapeHtml(item.titulo)}"
               data-until="${escapeHtml(untilText)}">VER</button>`
    : `<button type="button" class="btn btn-primary btn-open" data-href="${item.enlace}">VER</button>`;

  return `
  <article class="card card-dedicatoria">
    <figure style="overflow:hidden;border-radius:.6rem;margin:0 0 .75rem 0">
      ${iframeHtml}
    </figure>
    <header>
      <h3>${item.titulo}</h3>
      <p class="meta">${tipo}${locked ? ` • Bloqueado` : ``}</p>
    </header>
    <div class="form-actions" style="margin-top:.6rem">
      ${btn}
    </div>
  </article>`;
}

/* =========================================================
   Filtros por tipo (si existen en tu HTML)
   ========================================================= */
function setupFilters(items){
  const filterBtns = $$(".filter-btn");
  if (!filterBtns.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      const filtered = f === "all" ? items : items.filter(d => d.tipo === f);
      renderDedicatorias(filtered);
      setupLazyPreviewIframes();
    });
  });
}

/* =========================================================
   Carga perezosa de iframes + ocultar esqueleto al cargar
   ========================================================= */
function setupLazyPreviewIframes(){
  const wraps = $$(".preview-wrap");
  wraps.forEach(w => {
    const iframe = $(".preview-iframe", w);
    const skel = $(".iframe-skeleton", w);
    if (!iframe) return;

    iframe.addEventListener("load", () => {
      w.classList.add("loaded");
      if (skel) skel.style.display = "none";
    }, { once: true });
  });

  const iframes = $$(".preview-iframe");
  if (!iframes.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const el = e.target;
      if (e.isIntersecting && el.dataset.src) {
        el.src = el.dataset.src;      // set real src
        el.removeAttribute("data-src");
        io.unobserve(el);
      }
    });
  }, { rootMargin: "200px 0px" });

  iframes.forEach(f => io.observe(f));
}

/* =========================================================
   Vista “No disponible ahora” (usa el modal existente)
   ========================================================= */
function showLockedView(titulo, untilText){
  const modal = $("#dedicatoriaModal");
  const modalTitle = $("#modalTitle");
  const modalBody = $("#modalBody");
  const modalOpenLink = $("#modalOpenLink");

  if (modalTitle) modalTitle.textContent = titulo || "Dedicatoria";
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="letter">
        <p><strong>No disponible ahora</strong>, sino hasta ${escapeHtml(untilText)}.</p>
        <p>Volvé a intentarlo cuando llegue el momento.</p>
      </div>
    `;
  }
  if (modalOpenLink) {
    modalOpenLink.style.display = "none";
    modalOpenLink.dataset.href = "";
  }
  modal?.showModal?.();
}

/* =========================================================
   Línea de tiempo (opcional)
   ========================================================= */
function renderTimeline(){
  const ol = $("#timeline");
  if (!ol) return;
  if (!Array.isArray(TIMELINE_EVENTS) || !TIMELINE_EVENTS.length){
    ol.innerHTML = `<li><p>Pronto añadiré fechas importantes.</p></li>`;
    return;
  }
  const items = TIMELINE_EVENTS
    .slice()
    .sort((a,b)=> new Date(a.fecha)-new Date(b.fecha))
    .map(ev => {
      const texto = ev.texto || "";
      const f = ev.fecha
        ? new Date(ev.fecha).toLocaleDateString("es-GT", { year:"numeric", month:"long", day:"numeric" })
        : "";
      return f
        ? `<li><time>${f}</time><p>${texto}</p></li>`
        : `<li><p>${texto}</p></li>`;
    }).join("");
  ol.innerHTML = items || `<li><p>Pronto añadiré fechas importantes.</p></li>`;
}

/* =========================================================
   Helpers de disponibilidad y utilitarios
   ========================================================= */
function isLocked(item){
  if (!item || !item.disponibleDesde) return false;
  const now = new Date();
  return now < new Date(item.disponibleDesde);
}

function formatUntil(date){
  if (!date) return "";
  try{
    return new Date(date).toLocaleString("es-GT", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }catch{ return String(date); }
}

function prettifySlug(s){
  if (!s) return s;
  return s
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function slugFromTitle(s){
  return String(s || "item")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function capitalize(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function escapeHtml(s){
  return String(s ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

fetch('galeria.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // limpia el contenido inicial
    data.imagenes.forEach(img => {
      const figure = document.createElement('figure');
      figure.className = 'tile lift';
      figure.innerHTML = `
        <img src="${img.src}" alt="${img.descripcion}" loading="lazy">
        <figcaption>${img.descripcion}</figcaption>
      `;
      gallery.appendChild(figure);
    });
  })
  .catch(error => console.error('Error al cargar la galería:', error));

// ===== Línea de tiempo dinámica: ordena por fecha y dibuja alternando lados =====
(async function initTimeline(){
  const el = document.getElementById('timeline');
  if(!el) return;

  // Intenta cargar desde timeline.json; si falla, toma lo que haya en el DOM y lo ordena
  let events = [];
  try{
    const res = await fetch('timeline.json', { cache: 'no-store' });
    if(res.ok){
      const data = await res.json();
      events = (data?.eventos ?? []).map((e, i) => ({
        titulo: e.titulo || `Evento ${i+1}`,
        descripcion: e.descripcion || '',
        fechaTexto: e.fecha || '',
        date: parseDate(e.fecha)
      })).filter(e => e.date instanceof Date && !isNaN(e.date));
    }
  }catch(e){ /* silencioso */ }

  // Fallback: si no hubo JSON válido, usa lo que encuentre en <ol id="timeline"> (si existe)
  if(events.length === 0){
    const liNodes = [...el.querySelectorAll('li')];
    events = liNodes.map((li, i) => ({
      titulo: li.querySelector('h4')?.textContent?.trim() || `Evento ${i+1}`,
      descripcion: li.querySelector('p')?.textContent?.trim() || '',
      fechaTexto: li.querySelector('time')?.textContent?.trim() || li.dataset.fecha || '',
      date: parseDate(li.querySelector('time')?.textContent || li.dataset.fecha || '')
    })).filter(e => e.date instanceof Date && !isNaN(e.date));
  }

  // Ordena ascendente (más antiguo primero). Cambiá a (b.date - a.date) si querés lo más nuevo arriba
  events.sort((a, b) => a.date - b.date);

  // Render
  el.innerHTML = '';
  events.forEach((ev, idx) => {
    const side = (idx % 2 === 0) ? 'left' : 'right';
    const li = document.createElement('li');
    li.className = `timeline-item ${side}`;
    li.innerHTML = `
      <div class="timeline-node" aria-hidden="true"></div>
      <div class="timeline-content timeline-card">
        <time datetime="${isoDate(ev.date)}">${ev.fechaTexto || humanDate(ev.date)}</time>
        <h4>${ev.titulo}</h4>
        <p>${ev.descripcion}</p>
      </div>
    `;
    el.appendChild(li);
  });

  // Animación con IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: .15 });
  el.querySelectorAll('.timeline-item').forEach(item => io.observe(item));

  // === Helpers ===
  function parseDate(s){
    if(!s) return null;
    const str = String(s).trim().replace(/[.\s]/g,'/').replace(/-/g,'/');
    // DD/MM/YYYY
    let m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if(m){
      const d = Number(m[1]), mo = Number(m[2]), y = Number(m[3]);
      const dt = new Date(y, mo - 1, d);
      return isNaN(dt) ? null : dt;
    }
    // YYYY/MM/DD
    m = str.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
    if(m){
      const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
      const dt = new Date(y, mo - 1, d);
      return isNaN(dt) ? null : dt;
    }
    // Último recurso
    const dt = new Date(str);
    return isNaN(dt) ? null : dt;
  }
  function isoDate(d){ return d.toISOString().slice(0,10); }
  function humanDate(d){
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
})();

