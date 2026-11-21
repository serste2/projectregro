document.querySelectorAll('form[data-mail]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subscribing = form.dataset.mail === 'subscribe';
    const subject = subscribing ? 'subscribe for the latest news' : 'Drop Us a Line';
    const body = subscribing ? data.get('email') :
      [data.get('name'), data.get('email'), '', data.get('message')].join('\n');
    window.location.href = form.action + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
});
