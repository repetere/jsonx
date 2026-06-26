(() => {
  const measurementId = "G-2J3SDMD9GC";
  const isConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
  const localHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
  const isLocal = localHosts.has(window.location.hostname);

  if (!isConfigured || isLocal) return;

  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    measurementId,
  )}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
})();
