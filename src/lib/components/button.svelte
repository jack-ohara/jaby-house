<script lang="ts">
  export let type: 'reset' | 'submit' | 'button' | undefined = undefined;
</script>

<button on:click {type} class={$$props.class}>
  <slot />
</button>

<style>
  button {
    background: #e2e8f0;
    color: #64748b;
    border: unset;
    border-radius: 6px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-size: inherit;
  }
  button:hover {
    background: #cbd5e1;
    color: #475569;
  }
  button:focus {
    background: #94a3b8;
    color: #f1f5f9;
  }
  button:focus-visible {
    outline: firebrick auto 1px;
  }
</style>
