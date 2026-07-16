const CACHE_NAME = 'paedi-merson-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  // For Supabase API calls — always go network first
  if(e.request.url.includes('supabase.co')){
    e.respondWith(fetch(e.request).catch(function(){
      return new Response('{}', {headers:{'Content-Type':'application/json'}});
    }));
    return;
  }
  // For CDN scripts — network first, cache fallback
  if(e.request.url.includes('cdn.') || e.request.url.includes('fonts.')){
    e.respondWith(
      fetch(e.request).then(function(res){
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
        return res;
      }).catch(function(){
        return caches.match(e.request);
      })
    );
    return;
  }
  // App shell — cache first
  e.respondWith(
    caches.match(e.request).then(function(cached){
      return cached || fetch(e.request).then(function(res){
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
        return res;
      });
    })
  );
});
