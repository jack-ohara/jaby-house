<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import FaIcon from '$lib/components/icons/fa-icon.svelte';
  import { requestNotificationPermission, subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let expandedTaskId: string | undefined;

  onMount(async () => {
    if ('serviceWorker' in navigator) {
      await Promise.all([
        subscribeToPushNotifications(await navigator.serviceWorker.ready),
        requestNotificationPermission()
      ]);
    }
  });

  const handleExpandTask = (taskId: string) => {
    expandedTaskId = expandedTaskId === taskId ? undefined : taskId;
  };
</script>

<div class="wrapper">
  {#if data.schedule}
    <div class="household-content">
      <div class="content">
        {#if 'schedule' in data && data.schedule}
          {#each Object.keys(data.schedule.tasksByDay) as day}
            <h3 class="day-header">{day}</h3>
            <ul class="day-task-list">
              {#each data.schedule.tasksByDay[day] as task}
                <li class="day-task-list-task" class:expand={expandedTaskId === task.id}>
                  <div class="task-header" on:click={() => handleExpandTask(task.id)}>
                    <div class="task-details">
                      <span>{task.name}</span>
                      <span class="task-assignee">{task.assignee.name}</span>
                    </div>

                    <FaIcon iconName="caret-down" />
                  </div>

                  <div class="expanded-task-details">
                    <div class="btn-group">
                      <Button class="delete-task"><FaIcon iconName="trash" /> Delete</Button>
                      <Button class="complete-task"><FaIcon iconName="check" /> Mark done</Button>
                    </div>
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
    padding: 0.3em;
  }
  .day-task-list .day-task-list-task .task-header {
    display: flex;
    gap: 0.2em;
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
  .day-task-list .day-task-list-task .expanded-task-details {
    font-size: 0.7em;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }
  .day-task-list .day-task-list-task.expand .expanded-task-details {
    max-height: 60px;
  }
  .day-task-list .day-task-list-task .task-header > :global(i) {
    transition: rotate 0.2s ease-out;
  }
  .day-task-list .day-task-list-task.expand .task-header > :global(i) {
    rotate: -180deg;
  }
  .day-task-list .day-task-list-task .expanded-task-details .btn-group {
    margin-top: 1em;
    display: flex;
    gap: 1em;
  }
  .day-task-list .day-task-list-task .expanded-task-details :global(*) {
    flex-basis: 0;
    flex-grow: 1;
  }
  .day-task-list .day-task-list-task .expanded-task-details :global(.delete-task),
  .day-task-list .day-task-list-task .expanded-task-details :global(.complete-task) {
    padding-block: 0.5em;
    padding-inline: 1em;
    color: white;
  }

  .day-task-list .day-task-list-task .expanded-task-details :global(.delete-task) {
    background-color: firebrick;
  }

  .day-task-list .day-task-list-task .expanded-task-details :global(.complete-task) {
    background-color: forestgreen;
  }

  :global(button) {
    /* all: initial; */
    font-size: inherit;
    background: none;
    border: none;
  }
</style>
