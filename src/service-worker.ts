import { } from "$service-worker"

// async function subscribeToPushNotifications() {
//     console.log("here")
//     let subscription = await self.registration.pushManager.getSubscription();
//     if (!subscription) {
//         console.log("no existing subscription")
//         try {
//             subscription = await registration.pushManager.subscribe({
//                 applicationServerKey: urlB64ToUint8Array('BFd50fUKhp1rfIkFGTKZKjsU2_oSf0lp84f0YKZ6zrA-jgdu7P2LJCEFy7cVGJlk6x_U3dMErKQqfVE3jdHINS8'),
//                 userVisibleOnly: true
//             });
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     try {
//         console.log('posting subscription')
//         const response = await fetch('http://localhost:3000/subscription', {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(subscription),
//             credentials: 'include'
//         })
//         console.log(response)
//     } catch (e) {
//         console.log("failed to post the subscription details:", e)
//     }
// }

// function urlB64ToUint8Array(base64String: string) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//       .replace(/-/g, "+")
//       .replace(/_/g, "/");
  
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
  
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }

// console.log(self)
// subscribeToPushNotifications()

self.addEventListener('push', (event: any) => {
    console.log('received push event')
    console.log(event.data.text())

    event.waitUntil(
        self.registration.showNotification('Erm... hello?', {
            body: event.data.text()
        })
    )
})