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

  window.addEventListener('DOMContentLoaded', () => {
    track('page_view');

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
