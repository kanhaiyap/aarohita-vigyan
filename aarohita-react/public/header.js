
  (function injectHeader() {
    var mount = document.getElementById('site-header-mount');
    if (!mount) return;
    fetch('/header.html', { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (html) { mount.innerHTML = html; })
      .catch(function (e) { console.warn('Header load failed:', e); });
  })();
