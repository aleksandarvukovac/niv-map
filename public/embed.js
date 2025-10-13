(function(){
  const me = document.currentScript;
  const targetId = me.getAttribute('data-target');
  const el = document.getElementById(targetId);
  if (!el) return;

  const host = new URL(me.src).origin;
  const params = new URLSearchParams();
  const cat  = el.dataset.cat  || 'sve';
  const lat  = el.dataset.lat  || '45.2671';
  const lng  = el.dataset.lng  || '19.8335';
  const zoom = el.dataset.zoom || '7';
  params.set('cat', cat); params.set('lat', lat); params.set('lng', lng); params.set('zoom', zoom);

  const mode   = el.dataset.mode   || 'inline'; // inline | lightbox
  const height = el.dataset.height || '520';

  function buildIframe(src) {
    const ifr = document.createElement('iframe');
    ifr.src = src;
    ifr.loading = 'lazy';
    ifr.style.border = '0';
    ifr.referrerPolicy = 'no-referrer-when-downgrade';
    ifr.allow = 'fullscreen';
    return ifr;
  }

  if (mode === 'lightbox') {
    let btn = el.querySelector('button');
    if (!btn) {
      btn = document.createElement('button');
      btn.textContent = 'Otvori mapu';
      btn.style.cssText = 'padding:.55rem .9rem;border-radius:10px;border:1px solid #111827;background:#111827;color:#e5e7eb;cursor:pointer';
      el.appendChild(btn);
    }
    btn.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,.65); z-index:999999;';
      const box = document.createElement('div');
      box.style.cssText = 'position:absolute; inset:4%; background:#000; border-radius:12px; overflow:hidden;';

      const close = document.createElement('button');
      close.textContent = '✕';
      close.setAttribute('aria-label','Zatvori');
      close.style.cssText = 'position:absolute; top:8px; right:12px; z-index:2; background:rgba(255,255,255,.85); border:0; border-radius:999px; padding:6px 10px; cursor:pointer;';

      const src = host + '/embed.html?' + params.toString() + '&ui=lightbox';
      const ifr = buildIframe(src);
      ifr.style.cssText = 'width:100%; height:100%; display:block;';

      close.addEventListener('click', () => document.body.removeChild(overlay));
      box.appendChild(close);
      box.appendChild(ifr);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
    });
  } else {
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:relative; width:100%; height:${/^\d+$/.test(height)? height+'px':height};`;
    const src = host + '/embed.html?' + params.toString() + '&ui=inline';
    const ifr = buildIframe(src);
    ifr.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
    wrap.appendChild(ifr);
    el.appendChild(wrap);
  }
})();