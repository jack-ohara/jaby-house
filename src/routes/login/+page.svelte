<script lang="ts">
  import { browser } from '$app/environment';
  import { signIn } from '@auth/sveltekit/client';

  if (browser) {
    signIn('cognito');
  }
</script>
