(() => {
  const endpoint = 'https://gflnvlolwqnvzxyqsrir.supabase.co/functions/v1/calcuauto-track';

  function referrerHost() {
    try {
      return document.referrer ? new URL(document.referrer).hostname : null;
    } catch (_) {
      return null;
    }
  }

  function track(eventName) {
    const payload = {
      page_path: location.pathname || '/',
      event_name: eventName,
      referrer_host: referrerHost()
    };

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  }

  function addInternalLinks() {
    if (document.getElementById('calcuauto-internal-links')) return;
    const footer = document.querySelector('footer');
    const nav = document.createElement('nav');
    nav.id = 'calcuauto-internal-links';
    nav.setAttribute('aria-label', 'Autres calculateurs CalcuAuto');
    nav.innerHTML = `
      <div style="width:min(1120px,calc(100% - 28px));margin:32px auto;padding:20px;border:1px solid #263750;border-radius:18px;background:#0f1b2d;color:#f8fafc">
        <strong style="display:block;margin-bottom:12px">Autres calculateurs auto gratuits</strong>
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          <a href="/cout-trajet-voiture.html">Coût trajet voiture</a>
          <a href="/cout-recharge-voiture-electrique.html">Coût recharge électrique</a>
          <a href="/credit-auto-calcul-mensualite.html">Crédit auto</a>
          <a href="/budget-voiture-mensuel.html">Budget voiture mensuel</a>
          <a href="/cout-total-voiture.html">Coût total voiture</a>
          <a href="/cout-100-km-essence.html">Coût 100 km essence</a>
          <a href="/cout-voiture-au-km.html">Coût voiture au km</a>
          <a href="/essence-vs-electrique-100-km.html">Essence vs électrique</a>
          <a href="/budget-carburant-annuel.html">Budget carburant annuel</a>
          <a href="/partage-frais-trajet-voiture.html">Partage frais trajet</a>
        </div>
      </div>`;
    nav.querySelectorAll('a').forEach(a => {
      a.style.cssText = 'color:#dbeafe;text-decoration:none;border:1px solid #334760;border-radius:999px;padding:8px 11px;font-size:.9rem';
    });
    if (footer) footer.before(nav); else document.body.appendChild(nav);
  }

  window.addEventListener('DOMContentLoaded', () => {
    track('page_view');
    addInternalLinks();

    document.addEventListener('click', (event) => {
      const target = event.target.closest('button, a');
      if (!target) return;

      if (target.matches('button.calc, button.btn')) {
        track('calculate');
      } else if (target.tagName === 'A' && target.href.includes('checkout.revolut.com')) {
        track('support_click');
      }
    }, { passive: true });
  });
})();
