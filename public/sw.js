const CACHE_NAME = 'skillswap-cache-v1'
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll([OFFLINE_URL]))
    )
    self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
    // Только навигационные запросы (переход по страницам)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(OFFLINE_URL))
        )
    }
    // Остальные запросы (css, js, изображения) не трогаем
})