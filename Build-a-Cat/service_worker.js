const cacheName = 'build-a-cat-v10'

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                'index.html',
                'index.js',
                'index.css',
                'favicon.ico',
                'manifest.webmanifest',
                'icon.png',
                'splash.png'
            ])
        })
    )
})

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone())
                    return response
                })
            })
        })
    )
})

this.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(cacheName) !== 0
                })
                .map(function(key) {
                    return caches.delete(key)
                })
            )
        })
    )
})
