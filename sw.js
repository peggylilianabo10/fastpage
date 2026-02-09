// Service Worker for PWA
const CACHE_NAME = 'fastpage-v6'; // Bumped to force cache refresh
// Only cache static assets, NOT the HTML page preventing stale content issues
const urlsToCache = [
    '/assets/index-upvKpgH8.css',
    '/assets/index-BIkGezMg.js',
    '/hub.html',
    '/cloning.html',
    '/template-preview.html'
];

// Install event - cache resources and auto-activate
self.addEventListener('install', (event) => {
    // Force this service worker to become active immediately (no popup)
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .catch(() => {
                // Silently fail if assets can't be cached
                console.log('SW: Asset caching failed, continuing anyway');
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Claim clients immediately
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    // 1. Navigation (HTML) -> NETWORK ONLY with fallback to index.html
    // This ensures the user ALWAYS sees the latest version when refreshing
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    // If network fails or 404, try to serve index.html
                    return fetch('/index.html');
                })
        );
        return;
    }

    // 2. Assets (CSS, JS, Images) -> Cache First, Network Fallback
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                });
            })
    );
});
