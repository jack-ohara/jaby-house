<script lang="ts">
    export let variant: string = "solid"
    export let iconName: string
</script>

<i class={`fa-${variant} fa-${iconName}`} />