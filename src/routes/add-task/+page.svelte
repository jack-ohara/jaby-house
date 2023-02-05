<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import Form from "$lib/components/form/form.svelte";
  import Input from '$lib/components/form/input.svelte';
  import Select from '$lib/components/form/select.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const today = new Date();
  const todayAsString = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
</script>

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
    min={todayAsString}
    placeholder="Completion date"
    required
    value={todayAsString}
  />

  <Select name="new-task-assigned-user" id="new-task-assigned-user">
    {#each data.household.users as user}
      <option value={user.id}>{user.name}</option>
    {/each}
  </Select>

  <Button type="submit">Add</Button>
</Form>
