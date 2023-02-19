<script lang="ts">
  import Button from '$lib/components/button.svelte';
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

  const updateTaskCompleteStatus = async (taskId: string, newIsComplete: boolean) => {
    await fetch(`/api/task/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({
        isComplete: newIsComplete
      })
    });
  };
</script>

<div class="wrapper">
  <div class="household-content">
    <div class="content">
      {#if data.schedule}
        {#if 'schedule' in data && data.schedule}
          {#each Object.keys(data.schedule.tasksByDay) as day}
            <h3 class="day-header">{day}</h3>
            <ul class="day-task-list">
              {#each data.schedule.tasksByDay[day] as task}
                <li class="day-task-list-task">
                  <div class="task">
                    <input
                      type="checkbox"
                      checked={task.isComplete}
                      on:change={() => {
                        task.isComplete = !task.isComplete;
                        updateTaskCompleteStatus(task.id, task.isComplete);
                      }}
                    />
                    <div class="task-details" class:completed={task.isComplete}>
                      <span>{task.name}</span>
                      <span class="task-assignee">{task.assignee.name}</span>
                    </div>

                    {#if !task.isComplete}
                      <FaIcon iconName="trash-can" variant="regular" />
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          {/each}
        {/if}
      {/if}
    </div>
    <span class="add-task-btn-wrapper">
      <a class="add-task-btn" href="/add-task" />
    </span>
  </div>
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
  .add-task-btn-wrapper .add-task-btn {
    border-radius: 50%;
    background-color: firebrick;
    color: white;
    text-decoration: none;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-task-btn::after {
    content: '+';
    padding-bottom: 4px;
  }
  .day-header {
    text-transform: lowercase;
    margin-bottom: 0;
  }
  .day-header::first-letter {
    text-transform: uppercase;
  }
  .day-task-list {
    padding-left: 0;
    padding-top: 0.7em;
    margin-top: 0;
  }
  .day-task-list .day-task-list-task {
    list-style: none;
    font-size: 1.5em;
    border-bottom: 1px solid lightgrey;
    padding: 0.3em;
  }
  .day-task-list .day-task-list-task input[type='checkbox'] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    border: 1px solid lightgrey;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 1em;
    display: grid;
    place-content: center;
  }
  .day-task-list .day-task-list-task input[type='checkbox']::before {
    content: '';
    width: 17px;
    height: 17px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em firebrick;
    border-radius: 50%;
  }
  .day-task-list .day-task-list-task input[type='checkbox']:checked::before {
    transform: scale(1);
  }
  .day-task-list .day-task-list-task .task {
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
    font-size: 0.75em;
  }
  .day-task-list .day-task-list-task .task-details.completed {
    color: grey;
    text-decoration: line-through;
  }
  .day-task-list .day-task-list-task .task-details .task-assignee {
    font-size: 0.7em;
  }
  .day-task-list .day-task-list-task .task > :global(i) {
    transition: rotate 0.2s ease-out;
  }

  :global(button) {
    /* all: initial; */
    font-size: inherit;
    background: none;
    border: none;
  }
</style>
