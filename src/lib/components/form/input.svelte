<script lang="ts">
  import type { HTMLInputTypeAttribute } from 'svelte/elements';

  export let type: HTMLInputTypeAttribute;
  export let autofocus: boolean | undefined = undefined;
  export let id: string;
  export let name: string;
  export let placeholder: string | undefined = undefined;
  export let value: string | null = null;
  export let min: string | number | undefined = undefined;
  export let max: string | number | undefined = undefined;
  export let required: boolean | null = null;
</script>

<!-- svelte-ignore a11y-autofocus -->
<input {type} {autofocus} {id} {name} {placeholder} {min} {max} {value} {required} />

