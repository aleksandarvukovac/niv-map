(function () {
  // Script tag koji je uključio loader
  const scriptEl = document.currentScript;

  // Parametri (sa podrazumevanim vrednostima)
  const src = scriptEl.dataset.src || new URL("/app.html", scriptEl.src).href;
  const width = scriptEl.dataset.width || "100%";
  const heightRaw = scriptEl.dataset.height || "600";
  const height = /^\d+$/.test(heightRaw) ? heightRaw + "px" : heightRaw;
  const title = scriptEl.dataset.title || "Najbolje iz Vojvodine – mapa";
  const rounded = scriptEl.dataset.rounded || "12px";
  const allowFullscreen = (scriptEl.dataset.fullscreen ?? "true") !== "false";
  const border = scriptEl.dataset.border || "1px solid rgba(0,0,0,.08)";
  const shadow = scriptEl.dataset.shadow || "0 8px 28px rgba(0,0,0,.08)";

  // Kontejner
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = width;
  container.style.maxWidth = "100%";
  container.style.margin = "0 auto";
  container.style.borderRadius = rounded;
  container.style.overflow = "hidden";
  container.style.border = border;
  container.style.boxShadow = shadow;

  // Iframe
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = title;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.style.width = "100%";
  iframe.style.height = height;
  iframe.style.border = "0";
  iframe.setAttribute("allow", allowFullscreen ? "fullscreen" : "");

  container.appendChild(iframe);

  // Toolbar (fullscreen)
  if (allowFullscreen && document.fullscreenEnabled) {
    const bar = document.createElement("div");
    bar.style.position = "absolute";
    bar.style.right = "8px";
    bar.style.top = "8px";
    bar.style.display = "flex";
    bar.style.gap = "6px";
    bar.style.zIndex = "10";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.ariaLabel = "Prikaži u celom ekranu";
    btn.textContent = "⤢";
    Object.assign(btn.style, {
      font: "14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial",
      background: "rgba(255,255,255,.92)",
      border: "1px solid rgba(0,0,0,.1)",
      borderRadius: "8px",
      padding: "6px 8px",
      cursor: "pointer",
    });

    btn.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) {
          await container.requestFullscreen();
          btn.textContent = "⤡";
        } else {
          await document.exitFullscreen();
          btn.textContent = "⤢";
        }
      } catch (e) {
        // ignoriši
      }
    });

    bar.appendChild(btn);
    container.appendChild(bar);
  }

  // Umetni odmah posle <script> taga
  scriptEl.parentNode.insertBefore(container, scriptEl.nextSibling);

  // Auto-resize preko postMessage (ako ikad zatreba)
  window.addEventListener("message", (ev) => {
    if (!ev || !ev.data) return;
    if (
      ev.data.type === "niv-embed:height" &&
      typeof ev.data.height === "number"
    ) {
      iframe.style.height = Math.max(300, ev.data.height) + "px";
    }
  });
})();
