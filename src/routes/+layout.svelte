<script lang="ts">
  import { page } from '$app/stores';
  import { PeopleIcon, GearIcon, TasklistIcon } from '$lib/components/icons';
  import NavLink from '$lib/components/navigation/navLink.svelte';
</script>

<div class="page-container">
  {#if $page.data.title}
    <header>
      <h1>{$page.data.title}</h1>
    </header>
  {/if}
  <main>
    <slot />
  </main>
  {#if $page.data.session}
    <footer>
      <nav>
        <ul class="navItems">
          <NavLink title="Schedule" href="/">
            <TasklistIcon slot="icon" />
          </NavLink>
          <NavLink title="Household" href="/household">
            <PeopleIcon slot="icon" />
          </NavLink>
          <NavLink title="Settings" href="/settings">
            <GearIcon slot="icon" />
          </NavLink>
        </ul>
      </nav>
    </footer>
  {/if}
</div>

<style>
  :global(body) {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
    max-width: 680px;
    margin: 0 auto;
    background: #fff;
    color: #333;
  }
  :global(li),
  :global(p) {
    line-height: 1.5rem;
  }
  :global(a) {
    font-weight: 500;
  }
  :global(hr) {
    border: 1px solid #ddd;
  }
  :global(iframe) {
    background: #ccc;
    border: 1px solid #ccc;
    height: 10rem;
    width: 100%;
    border-radius: 0.5rem;
    filter: invert(1);
  }
  .page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  header {
    padding: 0.8em;
    /* background-color: rgba(0, 0, 0, 0.05); */
    border-bottom: 1px solid #666;
    text-align: center;
  }
  header h1 {
    margin: 0;
    font-size: 1.75em;
  }
  main {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex-grow: 1;
    padding: 1em;
  }
  footer {
    padding: 0.5em;
    border-top: 1px solid #666;
    display: flex;
    justify-content: center;
  }
  @supports (-webkit-touch-callout: none) {
    footer {
      margin-bottom: 1em;
    }
  }
  footer nav {
    min-width: 100%;
  }
  .navItems {
    margin-bottom: 1rem;
    padding: 0;
    list-style: none;
    margin: 0;
    display: flex;
  }
  .navItems > :global(*) {
    flex: 1 1 0px;
  }
</style>
