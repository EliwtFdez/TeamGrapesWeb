(() => {
  const host = location.hostname;
  const local = host === 'localhost' || host.endsWith('.localhost') || host === '127.0.0.1' || host === '[::1]';
  if (location.protocol === 'http:' && !local) {
    const secure = new URL(location.href);
    secure.protocol = 'https:';
    location.replace(secure.href);
  }
})();
