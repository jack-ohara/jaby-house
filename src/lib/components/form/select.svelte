<script lang="ts">
  export let name: string;
  export let id: string;
</script>

<select {name} {id}>
    <slot />
</select>

