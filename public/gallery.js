const dialog = document.querySelector('dialog');
if (dialog && typeof dialog.showModal === 'function') {
  const image = dialog.querySelector('img');
  const counter = dialog.querySelector('output');
  let links = [];
  let current = 0;
  function show(index) {
    current = (index + links.length) % links.length;
    image.src = links[current].href;
    image.alt = links[current].querySelector('img').alt;
    counter.value = (current + 1) + ' / ' + links.length;
  }
  document.addEventListener('click', (event) => {
    const link = event.target.closest('.gallery a');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    links = [...link.closest('.gallery').querySelectorAll('a')];
    show(links.indexOf(link));
    dialog.showModal();
  });
  dialog.querySelector('[data-prev]').onclick = () => show(current - 1);
  dialog.querySelector('[data-next]').onclick = () => show(current + 1);
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
}

document.querySelectorAll('[data-more]').forEach((button) => {
  const gallery = button.previousElementSibling;
  const extra = [...gallery.querySelectorAll('a')].slice(20);
  if (!extra.length) return;
  function expand(open) {
    extra.forEach((link) => { link.hidden = !open; });
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Show Less' : 'Show More';
  }
  expand(false);
  button.hidden = false;
  button.addEventListener('click', () => expand(button.getAttribute('aria-expanded') !== 'true'));
});
