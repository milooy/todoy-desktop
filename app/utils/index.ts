export function getQueryStringObject() {
  const a = window.location.search.substr(1).split('&');
  if (a === '') return {};
  const b = {};
  for (let i = 0; i < a.length; i + 1) {
    const p = a[i].split('=', 2);
    if (p.length === 1) b[p[0]] = '';
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
  }
  return b;
}

export const foo = () => 1;
