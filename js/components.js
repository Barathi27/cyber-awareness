/**
 * Shared layout HTML injectors for dashboard pages
 * Keeps sidebar/topbar consistent across modules
 */

const Layout = {
  base: "", // relative prefix: "" for root, "../" for pages/

  setBase(base) {
    this.base = base;
  },

  studentSidebar() {
    const b = this.base;

    return `
      <aside class="sidebar" id="sidebar">

        <div class="sidebar-brand">
          <div class="brand-icon">🛡️</div>

          <div>
            <div style="font-weight:800;font-size:0.95rem;line-height:1.2">
              CyberAware
            </div>

            <div class="text-xs text-muted">
              Campus Security
            </div>
          </div>
        </div>

        <nav class="sidebar-nav">

          <div class="sidebar-label">Main</div>

          <a class="sidebar-link" href="${b}dashboard.html">
            ${App.icons.home}
            <span>Dashboard</span>
          </a>

          <a class="sidebar-link" href="${b}survey.html">
            📋
            <span style="margin-left:0.15rem">
              Awareness Survey
            </span>
          </a>

          <a class="sidebar-link" href="${b}learning.html">
            ${App.icons.book}
            <span>Learning Hub</span>
          </a>

          <a class="sidebar-link" href="${b}quiz.html">
            🎯
            <span style="margin-left:0.15rem">
              Quizzes
            </span>
          </a>

          <div class="sidebar-label">Protection</div>

          <a class="sidebar-link" href="${b}ai-checker.html">
            🤖
            <span style="margin-left:0.15rem">
              AI Scam Checker
            </span>
          </a>

          <a class="sidebar-link" href="${b}community.html">
            ${App.icons.users}
            <span>Alert Wall</span>
          </a>

          <a class="sidebar-link" href="${b}extension.html">
            🧩
            <span style="margin-left:0.15rem">
              Browser Extension
            </span>
          </a>

          <div class="sidebar-label">Account</div>

          <a class="sidebar-link" href="${b}profile.html">
            👤
            <span style="margin-left:0.15rem">
              Profile
            </span>
          </a>

          <a class="sidebar-link" href="${b}analytics.html">
            ${App.icons.chart}
            <span>My Analytics</span>
          </a>

        </nav>

        <div style="
          padding:0.75rem;
          border-top:1px solid var(--border);
          margin-top:0.5rem">

          <div
            class="card card-static"
            style="
              padding:1rem;
              background:var(--gradient-soft)">

            <div class="text-xs text-muted mb-2">
              Awareness Score
            </div>

            <!-- Firebase awareness score will be inserted here -->
            <div
              style="font-size:1.5rem;font-weight:800"
              class="gradient-text"
              id="sidebar-score">
              0
            </div>

            <div class="progress mt-2">
              <div
                class="progress-bar"
                id="sidebar-score-progress"
                style="width:0%">
              </div>
            </div>

          </div>

        </div>

      </aside>

      <div
        class="sidebar-overlay"
        id="sidebar-overlay">
      </div>
    `;
  },

  adminSidebar() {
    const b = this.base;

    return `
      <aside class="sidebar" id="sidebar">

        <div class="sidebar-brand">

          <div class="brand-icon">🛡️</div>

          <div>
            <div style="font-weight:800;font-size:0.95rem">
              CyberAware
            </div>

            <div class="text-xs text-muted">
              Admin Console
            </div>
          </div>

        </div>

        <nav class="sidebar-nav">

          <div class="sidebar-label">
            Administration
          </div>

          <a
            class="sidebar-link"
            href="${b}admin.html">
            ${App.icons.home}
            <span>Overview</span>
          </a>

          <a
            class="sidebar-link"
            href="${b}admin.html#students">
            ${App.icons.users}
            <span>Manage Students</span>
          </a>

          <a
            class="sidebar-link"
            href="${b}admin.html#reports">
            🚨
            <span style="margin-left:0.15rem">
              Verify Reports
            </span>
          </a>

          <a
            class="sidebar-link"
            href="${b}admin.html#modules">
            ${App.icons.book}
            <span style="margin-left:0.15rem">
              Learning Modules
            </span>
          </a>

          <a
            class="sidebar-link"
            href="${b}admin.html#quiz">
            🎯
            <span style="margin-left:0.15rem">
              Quiz Manager
            </span>
          </a>

          <a
            class="sidebar-link"
            href="${b}analytics.html">
            ${App.icons.chart}
            <span>Analytics</span>
          </a>

          <a
            class="sidebar-link"
            href="${b}admin.html#announcements">
            📢
            <span style="margin-left:0.15rem">
              Announcements
            </span>
          </a>

          <div class="sidebar-label">
            System
          </div>

          <a
            class="sidebar-link"
            href="${b}dashboard.html">
            ← Student View
          </a>

          <a
            class="sidebar-link"
            href="${b}login.html">
            🚪 Logout
          </a>

        </nav>

      </aside>

      <div
        class="sidebar-overlay"
        id="sidebar-overlay">
      </div>
    `;
  },

  topbar(title = "Dashboard") {
    const b = this.base;

    return `
      <header class="topbar">

        <div class="flex items-center gap-3">

          <button
            class="btn btn-ghost btn-icon"
            data-sidebar-toggle
            aria-label="Menu">
            ${App.icons.menu}
          </button>

          <div>

            <div class="text-xs text-muted">
              CyberAware Platform
            </div>

            <strong>${title}</strong>

          </div>

        </div>

        <div
          class="flex items-center gap-2"
          style="
            flex:1;
            justify-content:flex-end;
            max-width:520px">

          <div
            class="search-bar"
            style="
              flex:1;
              display:none;
              md:flex"
            id="top-search">

            ${App.icons.search}

            <input
              type="search"
              placeholder="Search modules, alerts..." />

          </div>

          <!-- Theme -->
          <button
            class="btn btn-ghost btn-icon"
            data-theme-toggle
            title="Toggle theme">
            ${App.icons.moon}
          </button>

          <!-- Notifications -->
          <div
            class="dropdown"
            data-dropdown>

            <button
              class="btn btn-ghost btn-icon"
              data-dropdown-trigger
              aria-label="Notifications"
              style="position:relative">

              ${App.icons.bell}

              <span
                style="
                  position:absolute;
                  top:8px;
                  right:8px;
                  width:8px;
                  height:8px;
                  background:var(--danger);
                  border-radius:50%">
              </span>

            </button>

            <div
              class="dropdown-menu"
              style="
                width:320px;
                padding:0.75rem">

              <strong
                style="
                  padding:0.35rem 0.5rem;
                  display:block">
                Notifications
              </strong>

              <div id="notif-list"></div>

              <a
                href="${b}community.html"
                class="dropdown-item"
                style="
                  justify-content:center;
                  margin-top:0.35rem">
                View all alerts
              </a>

            </div>

          </div>

          <!-- CURRENT LOGGED-IN USER PROFILE -->
          <div
            class="dropdown"
            data-dropdown>

            <div
              class="avatar"
              id="topbar-avatar"
              data-dropdown-trigger
              title="Profile">
              U
            </div>

            <div class="dropdown-menu">

              <div
                style="
                  padding:0.65rem 0.85rem;
                  border-bottom:1px solid var(--border);
                  margin-bottom:0.35rem">

                <strong id="topbar-name">
                  Loading...
                </strong>

                <div
                  class="text-xs text-muted"
                  id="topbar-email">
                </div>

              </div>

              <a
                class="dropdown-item"
                href="${b}profile.html">
                👤 Profile
              </a>

              <a
                class="dropdown-item"
                href="${b}profile.html#settings">
                ⚙️ Settings
              </a>

              <a
                class="dropdown-item"
                href="${b}analytics.html">
                📊 Analytics
              </a>

              <a
                class="dropdown-item"
                href="${b}login.html">
                🚪 Logout
              </a>

            </div>

          </div>

        </div>

      </header>
    `;
  },

  loader() {
    return `
      <div
        class="loader-overlay"
        id="page-loader">

        <div class="spinner"></div>

        <div
          style="font-weight:700"
          class="gradient-text">
          CyberAware
        </div>

        <div class="text-sm text-muted">
          Securing your session…
        </div>

      </div>
    `;
  },

  headAssets(depth = 0) {
    const prefix = depth === 0 ? "" : "../".repeat(depth);

    return `
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com" />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
        rel="stylesheet" />

      <script src="https://cdn.tailwindcss.com"><\/script>

      <script>
        tailwind.config = {
          darkMode: ['selector', '[data-theme="dark"]'],

          theme: {
            extend: {

              fontFamily: {
                display: [
                  'Plus Jakarta Sans',
                  'sans-serif'
                ],

                sans: [
                  'Inter',
                  'sans-serif'
                ],
              },

              colors: {
                brand: {
                  DEFAULT: '#4f46e5',
                  soft: '#818cf8',
                  deep: '#3730a3'
                },

                accent: '#7c3aed',

                cyanx: '#06b6d4',
              }

            }
          }
        }
      <\/script>

      <link
        rel="stylesheet"
        href="${prefix}css/styles.css" />
    `;
  },

  renderNotifs() {
    const list = document.getElementById("notif-list");

    if (!list || typeof AppData === "undefined") {
      return;
    }

    list.innerHTML = AppData.notifications
      .slice(0, 4)
      .map(
        (n) => `
            <div
              class="dropdown-item"
              style="
                align-items:flex-start;
                flex-direction:column;
                gap:0.15rem">

              <div
                class="flex justify-between w-full"
                style="width:100%">

                <strong class="text-sm">
                  ${n.title}
                </strong>

                ${
                  n.unread ? '<span class="badge badge-primary">New</span>' : ""
                }

              </div>

              <span class="text-xs text-muted">
                ${n.body}
              </span>

              <span class="text-xs text-muted">
                ${n.time}
              </span>

            </div>
          `,
      )
      .join("");
  },

  /*
   * Loads the currently logged-in Firebase user
   * and displays their name, email and initials
   * in the top-right profile section.
   */
  renderCurrentUser() {
    if (typeof firebase === "undefined" || !firebase.auth) {
      console.warn("Firebase Auth is not available.");

      return;
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      let name = user.displayName || "";

      let email = user.email || "";

      try {
        const db = firebase.firestore();

        const userDoc = await db.collection("users").doc(user.uid).get();

        if (userDoc.exists) {
          const data = userDoc.data();

          name = data.name || name || "Student";

          email = data.email || email;
        }
      } catch (error) {
        console.error("Unable to load user profile:", error);

        name = name || "Student";
      }

      /*
       * Update profile name
       */
      const nameElement = document.getElementById("topbar-name");

      if (nameElement) {
        nameElement.textContent = name;
      }

      /*
       * Update profile email
       */
      const emailElement = document.getElementById("topbar-email");

      if (emailElement) {
        emailElement.textContent = email;
      }

      /*
       * Generate initials
       *
       * Barathi Banki -> BB
       * Priya Sharma -> PS
       * Ravi Kumar -> RK
       */
      const avatarElement = document.getElementById("topbar-avatar");

      if (avatarElement) {
        const words = name.trim().split(/\s+/).filter(Boolean);

        let initials = "U";

        if (words.length >= 2) {
          initials = words[0].charAt(0) + words[1].charAt(0);
        } else if (words.length === 1) {
          initials = words[0].charAt(0);
        }

        avatarElement.textContent = initials.toUpperCase();

        avatarElement.title = name;
      }
    });
  },

  mountStudentShell(title) {
    const root = document.getElementById("app-root");

    if (!root) {
      return;
    }

    root.innerHTML = `
      ${this.loader()}

      <div class="app-shell">

        ${this.studentSidebar()}

        <div class="main-area">

          ${this.topbar(title)}

          <main
            class="page-content"
            id="page-main">
          </main>

        </div>

      </div>
    `;

    this.renderNotifs();

    // Load currently logged-in user's profile
    this.renderCurrentUser();
  },
};
