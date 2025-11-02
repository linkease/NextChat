if ('serviceWorker' in navigator) {
  function getBasePath() {
    try {
      const meta = document.head.querySelector("meta[name='config']");
      if (!meta) return '';
      const cfg = JSON.parse(meta.content || '{}');
      return (cfg.basePath || '').replace(/\/$/, '');
    } catch (e) {
      return '';
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    const basePath = getBasePath();
    const swUrl = `${basePath}/serviceWorker.js`;
    const scope = `${basePath || ''}/`;
    navigator.serviceWorker.register(swUrl, { scope }).then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      const sw = registration.installing || registration.waiting
      if (sw) {
        sw.onstatechange = function() {
          if (sw.state === 'installed') {
            // SW installed.  Reload for SW intercept serving SW-enabled page.
            console.log('ServiceWorker installed reload page');
            window.location.reload();
          }
        }
      }
      registration.update().then(res => {
        console.log('ServiceWorker registration update: ', res);
      });
      window._SW_ENABLED = true
    }, function (err) {
      console.error('ServiceWorker registration failed: ', err);
    });
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      console.log('ServiceWorker controllerchange ');
      window.location.reload(true);
    });
  });
}
