/**
 * Core application utilities
 * Theme, toasts, modals, sidebar, shared shell helpers
 */

/** Load Firebase init from the same directory as this script (non-blocking). */
(function () {
  if (window.__cyberAwareFirebaseLoader) return;
  window.__cyberAwareFirebaseLoader = true;

  const src = document.currentScript && document.currentScript.src;
  if (!src) return;

  const el = document.createElement("script");
  el.src = src.replace(/app\.js(\?.*)?$/i, "firebase-config.js");
  el.async = true;
  document.head.appendChild(el);
})();

const App = {
  _bound: false,

  init() {
    this.applyStoredTheme();
    this.initLoader();
    this.initToasts();
    this.bindGlobal();
    this.highlightActiveNav();
  },

  /* ---------- Theme ---------- */
  applyStoredTheme() {
    const saved = localStorage.getItem("csa-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
  },

  initTheme() {
    this.applyStoredTheme();
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("csa-theme", next);
    this.toast(`Switched to ${next} mode`, "info");
  },

  /* ---------- Loader ---------- */
  initLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hide"), 400);
    });
    // Fallback if already loaded
    if (document.readyState === "complete") {
      setTimeout(() => loader.classList.add("hide"), 300);
    }
  },

  /* ---------- Toasts ---------- */
  initToasts() {
    if (!document.querySelector(".toast-container")) {
      const el = document.createElement("div");
      el.className = "toast-container";
      el.id = "toast-container";
      document.body.appendChild(el);
    }
  },

  toast(message, type = "info", title) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const icons = {
      success: "✓",
      error: "✕",
      info: "ℹ",
      warning: "!",
    };
    const titles = {
      success: "Success",
      error: "Error",
      info: "Info",
      warning: "Warning",
    };
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || "ℹ"}</div>
      <div style="flex:1">
        <strong style="display:block;font-size:0.9rem;margin-bottom:0.15rem">${title || titles[type]}</strong>
        <span class="text-sm text-muted">${message}</span>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  /* ---------- Sidebar / mobile (event delegation — safe to call once) ---------- */
  bindGlobal() {
    if (this._bound) return;
    this._bound = true;

    document.addEventListener("click", (e) => {
      const themeBtn = e.target.closest("[data-theme-toggle]");
      if (themeBtn) {
        e.preventDefault();
        this.toggleTheme();
        return;
      }

      if (e.target.closest("[data-sidebar-toggle]")) {
        document.getElementById("sidebar")?.classList.toggle("open");
        document.getElementById("sidebar-overlay")?.classList.toggle("show");
        return;
      }

      if (e.target.closest("#sidebar-overlay")) {
        document.getElementById("sidebar")?.classList.remove("open");
        document.getElementById("sidebar-overlay")?.classList.remove("show");
        return;
      }

      if (e.target.closest("[data-nav-toggle]")) {
        document.getElementById("nav-links")?.classList.toggle("open");
        return;
      }

      const dropTrigger = e.target.closest("[data-dropdown-trigger]");
      if (dropTrigger) {
        e.stopPropagation();
        const wrap = dropTrigger.closest("[data-dropdown]");
        document.querySelectorAll(".dropdown.open").forEach((d) => {
          if (d !== wrap) d.classList.remove("open");
        });
        wrap?.classList.toggle("open");
        return;
      }

      if (!e.target.closest("[data-dropdown]")) {
        document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
      }

      const faqBtn = e.target.closest(".faq-q");
      if (faqBtn) {
        const item = faqBtn.closest(".faq-item");
        const open = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((i) => i.classList.remove("open"));
        if (!open) item.classList.add("open");
        return;
      }

      const modalOpen = e.target.closest("[data-modal-open]");
      if (modalOpen) {
        document.getElementById(modalOpen.getAttribute("data-modal-open"))?.classList.add("open");
        return;
      }

      if (e.target.closest("[data-modal-close]")) {
        e.target.closest(".modal-overlay")?.classList.remove("open");
        return;
      }

      if (e.target.classList?.contains("modal-overlay")) {
        e.target.classList.remove("open");
      }
    });
  },

  highlightActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".sidebar-link, .nav-links a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.endsWith(path) || (path === "" && href.includes("index"))) {
        link.classList.add("active");
      }
    });
  },

  /* ---------- Helpers ---------- */
  formatNumber(n) {
    return new Intl.NumberFormat("en-IN").format(n);
  },

  /**
   * Simulate API call — placeholder for Flask/FastAPI
   * @param {string} endpoint
   * @param {object} payload
   */
  async apiMock(endpoint, payload = {}, delay = 900) {
    console.info(`[API Placeholder] ${endpoint}`, payload);
    await new Promise((r) => setTimeout(r, delay));
    return { ok: true, endpoint, data: payload, ts: Date.now() };
  },

  /** Simple SVG icons as strings */
  icons: {
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    bot: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // Landing/login/404 mount statically; dashboard pages call App.init() after shell inject
  if (!document.getElementById("app-root")) App.init();
  else App.applyStoredTheme();
});
