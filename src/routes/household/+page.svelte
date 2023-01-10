<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/button.svelte';
  import Modal from '$lib/components/modal.svelte';

  let showCreateHouseholdModal = false;

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

  async function handleCreateNewHousehold() {
    showCreateHouseholdModal = true;
  }
</script>

<div class="container">
  {#if $page.data.household}
    <div class="content">
      <h2>{$page.data.household.name}</h2>
    </div>
    
    <Button on:click={() => shareHousehold()}>Invite someone to join your household</Button>
  {:else}
    <p>It looks like you're not part of a household yet...</p>
    <div class="household-buttons">
      <Button on:click={handleCreateNewHousehold}>Create a new household</Button>
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
</style>
