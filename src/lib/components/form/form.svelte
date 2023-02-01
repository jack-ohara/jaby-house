<script lang="ts">
  export let action: string;
</script>

<form method="post" {action}>
  <slot />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  form :global(*:not(button)) {
    font-size: 1.3rem;
    padding: 0.3em;
    font-family: inherit;
    border-radius: 4px;
    border: 1px solid darkgrey;
  }
</style>
