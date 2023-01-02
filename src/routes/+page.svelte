<script lang="ts">
    async function requestNotificationPermission() {
        const result = await Notification.requestPermission()
        if (result === 'granted') {
            generateNotification()
        }
    }

    function generateNotification() {
        new Notification("The title", {
            body: 'The body',
            renotify: true,
            icon: './house-icon.png'
        })
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={() => requestNotificationPermission()}>Request notification permission</button>