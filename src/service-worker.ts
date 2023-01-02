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
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then((clientList) => {
        for (const client of clientList) {
            if (client.url === '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});

export { }