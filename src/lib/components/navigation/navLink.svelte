<script lang="ts">
  import { page } from '$app/stores';

  export let title: string;
  export let href: string;
</script>

<li class="navItem" class:active="{$page.url.pathname === href}">
  <a {href}>
    <slot name="icon" />
    <h4>{title}</h4>
  </a>
</li>

<style>
  .navItem {
    /* 
        Equivalent to an rgb value of #666.
        To generate a new colour: https://codepen.io/sosuke/pen/Pjoqqp
    */
    filter: invert(40%) sepia(0%) saturate(0%) hue-rotate(140deg) brightness(99%) contrast(96%);
  }

  .navItem.active {
    filter: invert(17%) sepia(62%) saturate(4082%) hue-rotate(348deg) brightness(89%) contrast(91%);
  }

  .navItem a {
    display: flex;
    flex-direction: column;
    font-size: 0.5em;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  .navItem a :global(svg) {
    width: 32px;
    height: 32px;
  }

  .navItem a h4 {
    margin: 0;
    margin-top: -4px;
    font-size: 12px;
    font-weight: 500;
  }
</style>
