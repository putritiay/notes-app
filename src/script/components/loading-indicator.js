class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          background: rgba(248, 250, 252, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: opacity 0.3s ease;
        }

        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #e2e8f0;
          border-top: 6px solid #4f46e5;
          border-radius: 50%;
          animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .loading-text {
          color: #4f46e5;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
      </style>
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="loading-text">Loading...</div>
      </div>
    `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
