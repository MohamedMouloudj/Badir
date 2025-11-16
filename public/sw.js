const CACHE_NAME = "badir-cache-v1";
const RUNTIME_CACHE = "badir-runtime";

// Essential files to cache immediately
const PRECACHE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/offline.html",
  "/pwa/icons/manifest-icon-192.maskable.png",
  "/pwa/icons/manifest-icon-512.maskable.png",
];

// Install - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate - clean old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch - Network first for HTML/API, Cache first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip Chrome extensions
  if (
    url.protocol === "chrome-extension:" ||
    url.startsWith("chrome-extension://")
  )
    return;

  // Never cache Next.js internal requests
  if (
    url.pathname.startsWith("/_next/data/") ||
    url.pathname.startsWith("/_next/image") ||
    url.pathname.includes("/api/") ||
    url.pathname.includes("/__nextjs") ||
    url.pathname.includes("/_next/static/chunks/")
  ) {
    return;
  }

  // Determine content type
  const acceptHeader = request.headers.get("accept") || "";
  const isNavigationRequest = request.mode === "navigate";
  const isImageRequest = acceptHeader.includes("image/");
  const isFontRequest = url.pathname.match(/\.(woff2?|ttf|eot|otf)$/);
  const isStylesheet = acceptHeader.includes("text/css");
  const isScript = acceptHeader.includes("javascript");
  const isDocument = acceptHeader.includes("text/html") || isNavigationRequest;

  // Strategy 1: Cache-first for static assets (images, fonts, styles)
  if (isImageRequest || isFontRequest || isStylesheet) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => {
            // Return placeholder for images if offline
            if (isImageRequest) {
              return caches.match("/pwa/icons/manifest-icon-192.maskable.png");
            }
          });
      }),
    );
    return;
  }

  // Strategy 2: Network-first for documents, JSON, XML, scripts
  if (
    isDocument ||
    isScript ||
    acceptHeader.includes("application/json") ||
    acceptHeader.includes("application/xml") ||
    acceptHeader.includes("text/xml")
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // Return offline page for navigation requests
            if (isNavigationRequest || isDocument) {
              return caches.match("/offline.html");
            }

            // For other requests, try to match from cache
            return caches.match(request);
          });
        }),
    );
    return;
  }

  // Strategy 3: Stale-while-revalidate for everything else
  event.respondWith(
    caches
      .match(request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });

        // Return cached immediately, update in background
        return cachedResponse || fetchPromise;
      })
      .catch(() => {
        return caches.match("/offline.html");
      }),
  );
});
