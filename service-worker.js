const CACHE_NAME = 'rosario-misionero-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './fondo-rosario.jpg',
  './icono-192.png',
  './icono-512.png'
];

// Instalación: guarda en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

// Activación: limpia cachés viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: sirve desde caché, si no, desde red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request);
    })
  );
});
