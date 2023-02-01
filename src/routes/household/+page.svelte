<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/button.svelte';
  import Modal from '$lib/components/modal.svelte';
  import { requestNotificationPermission, subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';

  let showCreateHouseholdModal = false;
  let showConfirmLeaveHouseholdModal = false;

  async function shareHousehold() {
    try {
      await navigator.share({
        title: `Join the ${$page.data.household.name} household`,
        url: `${location.origin}/household/join?code=${$page.data.household.joinCode}`
      });
    } catch (e) {
      console.log('Could not share household');
    }
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

<div class="container">
  {#if $page.data.household}
    <div class="content">
      <h2>{$page.data.household.name}</h2>
    </div>

    <div class="btn-group">
      <Button class="btn" on:click={() => shareHousehold()}>
        Invite someone to join your household
      </Button>
      <Button class="btn leave-household" on:click={() => (showConfirmLeaveHouseholdModal = true)}>
        Leave household
      </Button>
    </div>

    {#if showConfirmLeaveHouseholdModal}
      <Modal on:close={() => (showConfirmLeaveHouseholdModal = false)}>
        <div slot="header">
          <h2 class="modal-header">Are you sure you want to leave the household?</h2>
          <p>
            If you are the only member of this household then it and all associated data will be
            deleted
          </p>
        </div>

        <form class="leave-modal-btn-group" method="post" action="?/leaveHousehold">
          <Button on:click={() => (showConfirmLeaveHouseholdModal = false)}>Cancel</Button>
          <Button class="leave-household">Leave</Button>
        </form>
      </Modal>
    {/if}
  {:else}
    <p>It looks like you're not part of a household yet...</p>
    <div class="household-buttons">
      <Button on:click={() => (showCreateHouseholdModal = true)}>Create a new household</Button>
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
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    {/if}
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .container .content {
    flex-grow: 1;
  }

  .container :global(.btn) {
    padding-block: 1em;
  }

  .household-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
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

  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }

  .btn-group :global(.leave-household),
  .leave-modal-btn-group :global(.leave-household) {
    background-color: rgb(160, 55, 55);
    color: rgb(221, 207, 207);
  }

  .btn-group :global(.leave-household:hover),
  .leave-modal-btn-group :global(.leave-household:hover) {
    background: rgb(121, 34, 34);
  }
  .btn-group :global(.leave-household:focus),
  .leave-modal-btn-group :global(.leave-household:focus) {
    background: rgb(121, 34, 34);
  }

  .leave-modal-btn-group {
    display: flex;
    gap: 1em;
  }

  .leave-modal-btn-group > :global(*) {
    flex: 1 1 0;
  }
</style>
