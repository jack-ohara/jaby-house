import { } from "$service-worker"

async function subscribeToPushNotifications() {
    console.log("here")
    let subscription = await self.registration.pushManager.getSubscription();
    if (!subscription) {
        try {
            subscription = await registration.pushManager.subscribe({
                applicationServerKey: 'BFd50fUKhp1rfIkFGTKZKjsU2_oSf0lp84f0YKZ6zrA-jgdu7P2LJCEFy7cVGJlk6x_U3dMErKQqfVE3jdHINS8',
                userVisibleOnly: true
            });

            console.log(subscription)
        } catch (e) {
            console.log(e)
        }
    }

    try {
        console.log('posting subscription')
        const response = await fetch('http://localhost:3000/subscription', {
            method: 'POST',
            body: '{ "hello": "world" }',
        })
        console.log(response)
    } catch (e) {
        console.log("failed to post the subscription details:", e)
    }
}

console.log(self)
subscribeToPushNotifications()

self.addEventListener('push', (event: any) => {
    console.log(event.data.text())

    event.waitUntil(
        self.registration.showNotification('Erm... hello?', {
            body: event.data.text()
        })
    )
})