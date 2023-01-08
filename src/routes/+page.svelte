<script lang="ts">
  import { page } from '$app/stores';
  import { subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';
  import Modal from '$lib/components/modal.svelte';

  let showCreateHouseholdModal = false
  let showJoinHouseholdModal = false

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

  async function handleCreateNewHousehold() {
    showCreateHouseholdModal = true
  }
</script>

<div>
  {#if $page.data.household}
    <div>Here would be the schedule stuff...</div>
  {:else}
    <p>It looks like you're not part of a household yet...</p>
    <div class="household-buttons">
      <button class="button" on:click={handleCreateNewHousehold}>Create a new household</button>
      <button class="button">Join a household</button>
    </div>

    <Modal on:close="{() => showCreateHouseholdModal = false}">
      <h2 slot="header">
        Create a new Household
      </h2>

      <label>Household name</label>
      <input type="text">
    </Modal>
  {/if}
</div>

<style>
  .household-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .household-buttons .button {
    font-size: 16px;
    padding: 4px 8px;
  }
</style>
