<script>
  import { page } from '$app/stores';
</script>

{#if $page.data.error}
  <h2>Sorry, something's gone wrong</h2>
  <p>
    We can't add you to a household right now. If you have received a link from someone in a
    household, ask them to share it again to make sure that it is correct.
  </p>
  <p>
    You may also be seeing this page because you are already part of a household. At this time, we
    only support being in one household
  </p>
{/if}
