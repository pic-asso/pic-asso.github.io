/* Kato service worker — receives Web Push notifications. */

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    /* malformed payload — show a generic notification */
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "Kato", {
      body: data.body || "",
      icon: "./favicon.ico",
      badge: "./favicon.ico",
      data: data.data || {},
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const scope = self.registration.scope;
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        for (const client of windows) {
          if (client.url.startsWith(scope) && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(scope);
      })
  );
});
