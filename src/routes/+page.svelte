<script lang="ts">
  import { subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';

  async function requestNotificationPermission() {
    await Notification.requestPermission();
  }

  onMount(async () => {
    if ('serviceWorker' in navigator) {
      await Promise.all([
        subscribeToPushNotifications(await navigator.serviceWorker.ready),
        requestNotificationPermission()
      ]);
    }
  });
</script>

