class AppHeader extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .app-header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem 0;
        position: sticky;
        top: 0;
        background: rgba(248, 250, 252, 0.8);
        backdrop-filter: blur(8px);
        z-index: 10;
        border-bottom: 1px solid transparent;
        transition: border-color 0.3s;
      }

      .app-header h1 {
        font-size: 3rem;
        font-weight: 800;
        background: linear-gradient(135deg, #4f46e5, #818cf8);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0 0 0.5rem 0;
        letter-spacing: -0.025em;
      }

      .app-header p {
        color: #475569;
        font-size: 1.125rem;
        margin-top: 0;
      }

      @media (max-width: 640px) {
        .app-header h1 {
          font-size: 2.25rem;
        }
        
        .app-header p {
          font-size: 1rem;
        }
      }
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      <style>
        ${this._style.textContent}
        .header-nav {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        .nav-link {
          text-decoration: none;
          color: #475569;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md, 0.5rem);
          transition: all 0.2s;
          cursor: pointer;
        }
        .nav-link:hover {
          background-color: #e2e8f0;
          color: #4f46e5;
        }
        .nav-link.active {
          background-color: #4f46e5;
          color: white;
        }
      </style>
      <header class="app-header">
        <h1>Notes App</h1>
        <p>Organize your Thoughts Beautifully</p>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
