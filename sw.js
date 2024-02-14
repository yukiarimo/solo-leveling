'use strict';

importScripts('sw-toolbox.js');

toolbox.precache([
    "/",
    "/assets/css/bootstrap.min.css",
    "/assets/css/index.css",
    "/assets/css/kawai-v11-2.css",
    "/assets/fonts/kawai-font.woff",
    "/assets/js/bootstrap.bundle.min.js",
    "/assets/js/index.js",
    "/assets/js/jquery.min.js",
    "/assets/img/solo-leveling.png",
]);

toolbox.router.get('/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, {
    networkTimeoutSeconds: 1
});