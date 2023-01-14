<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/button.svelte';
  import Modal from '$lib/components/modal.svelte';
  import { subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';

  let showNewTaskModal = false;

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

<div class="wrapper">
  {#if $page.data.household}
    <div class="household-content">
      <h2>{$page.data.household.name}</h2>
      <div class="content">
        <p>Here would be the schedule stuff...</p>
        <p>
          In in quis id labore duis magna nulla enim est dolor nulla magna sit. Incididunt
          adipisicing adipisicing velit ex eiusmod irure eiusmod incididunt culpa laboris velit.
          Dolore sit est enim amet culpa incididunt ut ad in ullamco duis nisi. Eu tempor deserunt
          ut irure irure occaecat. Nulla amet id Lorem ullamco duis labore adipisicing duis nostrud
          labore ad deserunt labore irure. Ipsum esse occaecat culpa ullamco tempor. Qui ex nisi
          adipisicing cillum minim anim ullamco sint consequat tempor anim deserunt tempor. Nisi
          deserunt minim laboris dolor fugiat dolor esse irure non. Proident ut sit qui cupidatat
          eiusmod veniam mollit adipisicing do labore culpa exercitation reprehenderit et. Ullamco
          incididunt elit in magna velit duis dolor nulla do id veniam enim irure occaecat. Est
          mollit minim dolor esse eu occaecat. Quis ea ullamco enim excepteur. Occaecat cillum
          ullamco ad ad incididunt eiusmod sint in exercitation. Nulla ea occaecat aute Lorem tempor
          non occaecat. Sunt minim aliquip voluptate ut dolore culpa sit aute ullamco consectetur
          aliqua dolore proident. Minim laborum eiusmod veniam consequat adipisicing aute laborum
          id. Incididunt sunt deserunt amet eiusmod anim proident occaecat duis proident nulla
          labore incididunt deserunt. Deserunt ipsum proident anim esse sit adipisicing proident.
          Elit eiusmod deserunt aliqua dolore veniam cillum fugiat velit elit mollit velit. Sint
          tempor nisi enim labore magna velit. Proident pariatur cupidatat velit deserunt id
          voluptate laboris sit excepteur incididunt. Pariatur sit adipisicing et in adipisicing ut
          dolore elit quis magna laboris. Incididunt consectetur laboris magna fugiat anim ea
          nostrud ad pariatur commodo.
        </p>
      </div>

      <span class="add-task-btn-wrapper">
        <Button class="add-task-btn" on:click={() => (showNewTaskModal = true)}>+</Button>
      </span>

      {#if showNewTaskModal}
        <Modal on:close={() => (showNewTaskModal = false)}>
          <h2 slot="header" class="new-task-modal-header">Add a new task</h2>

          <form class="new-task-form" method="post" action="?/createNewTask">
            <input
              autofocus
              type="text"
              id="new-task-name"
              name="new-task-name"
              placeholder="Task name"
            />

            <Button type="submit">Add</Button>
          </form>
        </Modal>
      {/if}
    </div>
  {/if}
</div>

<style>
  .wrapper {
    min-height: 100%;
  }
  .household-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  .household-content .content {
    flex-grow: 1;
  }
  .add-task-btn-wrapper {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    font-size: 2em;
  }
  .add-task-btn-wrapper :global(.add-task-btn) {
    border-radius: 50%;
    aspect-ratio: 1;
    background-color: firebrick;
    color: white;
    padding: 8px 16px;
  }
</style>
