<script lang="ts">
  import { page } from '$app/stores';
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
</style>
