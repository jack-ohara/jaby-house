<script lang="ts">
  import FaIcon from '$lib/components/icons/fa-icon.svelte';
  import { requestNotificationPermission, subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

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
  {#if data.schedule}
    <div class="household-content">
      <h2>{data.household.name}</h2>
      <div class="content">
        {#if 'schedule' in data && data.schedule}
          {#each Object.keys(data.schedule.tasksByDay) as day}
            <h3 class="day-header">{day}</h3>
            <ul class="day-task-list">
              {#each data.schedule.tasksByDay[day] as task}
                <li class="day-task-list-task">
                  <div class="task-details">
                    <span>{task.name}</span>
                    <span class="task-assignee">{task.assignee.name}</span>
                  </div>

                  <div class="task-actions">
                    <button>
                      <FaIcon iconName="trash" />
                    </button>

                    <button>
                      <FaIcon iconName="check" />
                    </button>
                  </div>
                </li>
              {/each}
            </ul>
          {/each}
        {/if}
      </div>

      <span class="add-task-btn-wrapper">
        <a class="add-task-btn" href="/add-task">+</a>
      </span>
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
    text-decoration: none;
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
  }
  .day-header {
    text-transform: lowercase;
    margin-bottom: 0;
  }
  .day-header::first-letter {
    text-transform: uppercase;
  }
  .day-task-list {
    padding-left: 1.2em;
    padding-top: 0.7em;
    margin-top: 0;
  }
  .day-task-list .day-task-list-task {
    list-style: none;
    font-size: 1.5em;
    border-bottom: 1px solid lightgrey;
    display: flex;
    gap: 0.2em;
    padding: 0.3em;
    justify-content: space-between;
    align-items: center;
  }
  .day-task-list .day-task-list-task:last-of-type {
    border: none;
  }
  .day-task-list .day-task-list-task .task-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .day-task-list .day-task-list-task .task-details .task-assignee {
    font-size: 0.7em;
  }
  .day-task-list .day-task-list-task .task-actions {
    display: flex;
    gap: 1em;
  }

  :global(button) {
    /* all: initial; */
    font-size: inherit;
    background: none;
    border: none;
  }
</style>
