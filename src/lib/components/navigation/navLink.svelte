<script lang="ts">
  export let title: string;
  export let href: string;
</script>

<li class="navItem">
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

  .navItem a {
    display: flex;
    flex-direction: column;
    font-size: 0.5em;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  .navItem a :global(svg) {
    width: 38px;
    height: 38px;
  }

  .navItem a h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
  }
</style>
