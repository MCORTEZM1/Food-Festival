const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// files to cache with service worker
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

// service workers trigger before html loads or any other javascript file.
// as long as browser supports service workers, it will run- regardless of internet connection. 
// this means if you update the application code, the service workers will still load old files.
self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
});

// activate service worker
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keylist) { 
            //.keys() returns an array of all cache names under `<username>.github.io`, which here is called 'keylist'
            let cacheKeeplist = keylist.filter(function (key) {
                // Because we may host many sites from the same URL, we should filter out caches that have the app prefix.
                return key.indexOf(APP_PREFIX);
            });

            // add current cache to the keeplist; CACHE_NAME helps keep track of which cache to use.
            cacheKeeplist.push(CACHE_NAME);

            // return a promise that will be resolved once all old versions of hte cache have been deleted.
            return Promise.all(
                keylist.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1 ) {
                        console.log('deleting cache : ' + keylist[i]);
                        return caches.delete(keylist[i]);
                    }
                })
            );
        })
       
    );
});

// intercept fetch requests when offline 
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    e.respondWith(
        // use match to determine if the resource already exists in caches. 
        caches.match(e.request).then(function (request) {
            // if it does, return the cached resource and a message to the console.
            if (request) {
                console.log('respond with cache : ' + e.request.url)
                return request
            }
            // if it doesn't exist in caches, allow the resource to be fetched from the online network as usual'
            else {
                console.log('file is not cached, fetching :' + e.request.url)
                return fetch(e.request)
            }

            // can omit if/else above and put one line
            // return request || fetch(e.request)

        })
    )
});
