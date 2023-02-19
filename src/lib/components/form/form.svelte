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
    padding-block: 0.3em;
    font-family: inherit;
    border: none;
    border-bottom: 1px solid darkgrey;
    box-shadow: 0 0 0 0;
    transition: box-shadow 0.1s linear;
    outline: none;
  }

  form :global(*:not(button)):focus-within {
    box-shadow: 0 2px 0 0 firebrick;
  }
</style>
