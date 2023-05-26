export function disablePageScroll() {
  document.body.classList.add('disable-scroll')
}

export function enablePageScroll() {
  document.body.classList.remove('disable-scroll')
}

export function focusElement(el) {
  el.setAttribute('tabindex', 0)
  el.focus()
}
export function slugify (str) {
  return str.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
} 