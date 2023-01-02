import { } from "$service-worker"

self.addEventListener('push', (event: any) => {
    const data = event.data.json()

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: './house-icon.png'
        })
    )
})