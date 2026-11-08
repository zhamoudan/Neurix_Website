(() => {
  "use strict";

  const translations = {
    es: {
      "nav.home": "Inicio",
      "nav.products": "Productos",
      "nav.services": "Servicios",
      "nav.planet": "Planeta",
      "nav.contact": "Contacto",
      "footer.tagline":
        "Tecnología e Inteligencia Artificial para transformar empresas y cuidar el planeta.",
      "footer.company": "Empresa",
      "footer.products": "Productos",
      "footer.resources": "Recursos",
      "footer.rights": "Neurix Innovación S.L. — Todos los derechos reservados.",
      "common.learnMore": "Más información",
      "common.explore": "Explorar",
      "common.visit": "Abrir producto",
      "common.contact": "Contactar",
      "common.backProducts": "Todos los productos",
    },
    en: {
      "nav.home": "Home",
      "nav.products": "Products",
      "nav.services": "Services",
      "nav.planet": "Planet",
      "nav.contact": "Contact",
      "footer.tagline":
        "Technology and Artificial Intelligence to transform businesses and care for the planet.",
      "footer.company": "Company",
      "footer.products": "Products",
      "footer.resources": "Resources",
      "footer.rights": "Neurix Innovación S.L. — All rights reserved.",
      "common.learnMore": "Learn more",
      "common.explore": "Explore",
      "common.visit": "Open product",
      "common.contact": "Contact us",
      "common.backProducts": "All products",
    },
  };

  const pageTranslations = window.NEURIX_I18N || { es: {}, en: {} };

  function getBase() {
    const depth = Number(document.body.dataset.depth || "0");
    return depth === 0 ? "" : depth === 1 ? "../" : "../../";
  }

  function brandLogo(base, className = "brand-logo") {
    return `<img class="${className}" src="${base}images/logo.png" alt="Neurix Innovación" width="220" height="56" decoding="async">`;
  }

  function renderHeader() {
    const base = getBase();
    const active = document.body.dataset.page || "home";
    const mount = document.getElementById("site-header");
    if (!mount) return;

    mount.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a href="${base}index.html" class="brand" aria-label="Neurix Innovación">
            ${brandLogo(base)}
          </a>
          <nav class="nav" id="primary-nav" aria-label="Principal">
            <a href="${base}index.html" data-nav="home" data-i18n="nav.home">Inicio</a>
            <a href="${base}productos/index.html" data-nav="products" data-i18n="nav.products">Productos</a>
            <a href="${base}servicios/index.html" data-nav="services" data-i18n="nav.services">Servicios</a>
            <a href="${base}planeta/index.html" data-nav="planet" data-i18n="nav.planet">Planeta</a>
            <a href="${base}contacto/index.html" data-nav="contact" data-i18n="nav.contact">Contacto</a>
          </nav>
          <div class="header-actions">
            <div class="lang-toggle" role="group" aria-label="Idioma">
              <button type="button" class="lang-btn" data-lang="es" aria-pressed="false">ES</button>
              <button type="button" class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
            </div>
            <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Menú">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    `;

    mount.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === active) link.classList.add("is-active");
    });
  }

  function renderFooter() {
    const base = getBase();
    const mount = document.getElementById("site-footer");
    if (!mount) return;

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a href="${base}index.html" class="brand" aria-label="Neurix Innovación">
              ${brandLogo(base, "brand-logo brand-logo--footer")}
            </a>
            <p data-i18n="footer.tagline">Tecnología e Inteligencia Artificial para transformar empresas y cuidar el planeta.</p>
          </div>
          <div class="footer-col">
            <h3 data-i18n="footer.company">Empresa</h3>
            <a href="${base}index.html" data-i18n="nav.home">Inicio</a>
            <a href="${base}servicios/index.html" data-i18n="nav.services">Servicios</a>
            <a href="${base}planeta/index.html" data-i18n="nav.planet">Planeta</a>
            <a href="${base}contacto/index.html" data-i18n="nav.contact">Contacto</a>
          </div>
          <div class="footer-col">
            <h3 data-i18n="footer.products">Productos</h3>
            <a href="https://reviaty.neurixinnovacion.es/" target="_blank" rel="noopener noreferrer">Reviaty AI</a>
            <a href="https://iroomfy.neurixinnovacion.es/" target="_blank" rel="noopener noreferrer">iRoomfy</a>
            <a href="https://pozlee.neurixinnovacion.es/" target="_blank" rel="noopener noreferrer">Pozlee</a>
            <a href="${base}productos/factura.html">Factura</a>
            <a href="${base}productos/walk-wag.html">Walk &amp; Wags</a>
          </div>
          <div class="footer-col">
            <h3 data-i18n="footer.resources">Recursos</h3>
            <a href="${base}productos/index.html" data-i18n="nav.products">Productos</a>
            <a href="mailto:hi@neurixinnovacion.es">hi@neurixinnovacion.es</a>
          </div>
        </div>
        <div class="container footer-bottom">
          <span data-i18n="footer.rights">Neurix Innovación S.L. — Todos los derechos reservados.</span>
          <a href="mailto:hi@neurixinnovacion.es">hi@neurixinnovacion.es</a>
        </div>
      </footer>
    `;
  }

  function setLanguage(lang) {
    const dict = {
      ...(translations[lang] || {}),
      ...(pageTranslations[lang] || {}),
    };

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && dict[key] != null) node.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const key = node.getAttribute("data-i18n-html");
      if (key && dict[key] != null) node.innerHTML = dict[key];
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    localStorage.setItem("neurix-lang", lang);
  }

  function bindChrome() {
    const header = document.querySelector(".site-header");
    const nav = document.getElementById("primary-nav");
    const menuToggle = document.getElementById("menu-toggle");

    const closeMenu = () => {
      if (!nav || !menuToggle) return;
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle?.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
    window.addEventListener(
      "scroll",
      () => header?.classList.toggle("is-scrolled", window.scrollY > 6),
      { passive: true }
    );

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
  }

  renderHeader();
  renderFooter();
  bindChrome();

  const stored = localStorage.getItem("neurix-lang");
  setLanguage(stored === "en" || stored === "es" ? stored : "es");
})();
