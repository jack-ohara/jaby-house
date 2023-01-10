<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import { signOut } from '@auth/sveltekit/client';
</script>

<div class="container">
    <div class="content"></div>
    <Button on:click={() => signOut()}>Sign out</Button>
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
</style>
