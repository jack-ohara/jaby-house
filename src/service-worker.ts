self.addEventListener('push', (event: any) => {
    const data = event.data.json()

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: './house-icon.png',
            renotify: true,
            tag: data.tag ?? self.crypto.randomUUID()
        })
    )
})

self.addEventListener('notificationclick', (event: any) => {
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    console.log(clients)
    event.waitUntil(
      clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
          if (client.url === rootUrl) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
    );
});

export {}