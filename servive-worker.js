"use strict";

const CACHE_NAME = "star-war-app-statico";

const FILES_TO_CACHE = [
  "assets/css/Bootstrap/bootstrap.min.css",
  "assets/css/styles/styles.css",
  "assets/icons/favicon/apple-touch-icon.png",
  "assets/icons/favicon/favicon-32x32.png",
  "assets/icons/favicon/safari-pinned-tab.svg",
  "app/app.js",
  "assets/js/Bootstrap/bootstrap.bundle.min.js",
  "offiline.html",
  "data/dados.json",
];

//Instalar Service Worker

self.addEventListener("install", (evt) => {
  console.log("Service Worker em instalação");

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker está adicionando o cache estático");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

//Ativando o Service Worker

self.addEventListener("activate", (evt) => {
  console.log("Service Worker em ativação");

  evt.waitUntil(
    caches.keys().then((keylist) => {
      return Promise.all(
        keylist.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//Responder página offline do app

self.addEventListener("fetch", (evt) => {
  if (evt.request.mode !== "navigate") {
    return;
  }

  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offiline.html");
      });
    })
  );
});
