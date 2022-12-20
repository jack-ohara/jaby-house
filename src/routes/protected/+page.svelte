<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Protected page</h1>
<p>This is a protected content. You can access this content because you are signed in.</p>
<p>Session details:</p>
<pre>{JSON.stringify($page.data.session, null, 2)}</pre>
