<script lang="ts">
  import { page } from '$app/stores';
  import { subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';
  import Modal from '$lib/components/modal.svelte';

  let showCreateHouseholdModal = false;
  let showInviteUserModal = false;

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
    showCreateHouseholdModal = true;
  }
</script>

<div>
  {#if $page.data.household}
    <h2>{$page.data.household.name}</h2>
    <div>Here would be the schedule stuff...</div>

    {#if showCreateHouseholdModal}
      <Modal on:close={() => (showCreateHouseholdModal = false)}>
        <h2 slot="header" class="modal-header">
          Invite someone to the {$page.data.household.name} household
        </h2>

        <form class="invite-user-form" method="post" action="?/inviteUser">
            
        </form>
      </Modal>
    {/if}
  {:else}
    <p>It looks like you're not part of a household yet...</p>
    <div class="household-buttons">
      <button class="button" on:click={handleCreateNewHousehold}>Create a new household</button>
    </div>

    {#if showCreateHouseholdModal}
      <Modal on:close={() => (showCreateHouseholdModal = false)}>
        <h2 slot="header" class="modal-header">Create a new household</h2>

        <form class="create-household-form" method="post" action="?/createHousehold">
          <input
            autofocus
            type="text"
            id="new-household-name"
            name="new-houshold-name"
            placeholder="New household name"
          />
          <button type="submit">Create</button>
        </form>
      </Modal>
    {/if}
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

  .modal-header {
    margin-top: 0;
  }

  .create-household-form {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    font-size: 1.4em;
  }

  .create-household-form * {
    font-size: 1.5rem;
    padding: 0.3em;
  }
</style>
