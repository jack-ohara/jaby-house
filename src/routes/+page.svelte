<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import Form from '$lib/components/form/form.svelte';
  import Input from '$lib/components/form/input.svelte';
  import Select from '$lib/components/form/select.svelte';
  import Modal from '$lib/components/modal.svelte';
  import { requestNotificationPermission, subscribeToPushNotifications } from '$lib/pushManager';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  console.log('data:', data);

  let showNewTaskModal = false;
  let today = new Date();

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
                  <span>{task.name}</span>
                  <span>{task.assignee.name}</span>
                </li>
              {/each}
            </ul>
          {/each}
        {/if}
      </div>

      <span class="add-task-btn-wrapper">
        <Button class="add-task-btn" on:click={() => (showNewTaskModal = true)}>+</Button>
      </span>

      {#if showNewTaskModal}
        <Modal on:close={() => (showNewTaskModal = false)}>
          <h2 slot="header" class="new-task-modal-header">Add a new task</h2>

          <Form action="?/createNewTask">
            <Input
              autofocus
              type="text"
              id="new-task-name"
              name="new-task-name"
              placeholder="Task name"
              required
            />

            <Input
              type="date"
              id="new-task-due-date"
              name="new-task-due-date"
              min={`${today.getFullYear()}-${(today.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${today.getDate()}`}
              placeholder="Completion date"
              required
            />

            <Select name="new-task-assigned-user" id="new-task-assigned-user">
              {#each data.household.users as user}
                <option value={user['user-id']}>{user.name}</option>
              {/each}
            </Select>

            <Button type="submit">Add</Button>
          </Form>
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
    width: 50px;
    height: 50px;
  }
  .day-header {
    text-transform: lowercase;
    margin-bottom: 0;
  }
  .day-header::first-letter {
    text-transform: uppercase;
  }
  .day-task-list {
    padding-left: 1.5em;
    margin-top: 0;
  }
  .day-task-list .day-task-list-task {
    list-style: none;
    font-size: 1.5em;
    line-height: 1.5em;
    border-bottom: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
  }
  .day-task-list .day-task-list-task:last-of-type {
    border: none;
  }
</style>
