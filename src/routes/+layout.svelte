<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { currentUser } from '$lib/store';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // Update the store with user data from the server-side load function
  $: currentUser.set(data.user);
</script>

<svelte:head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.5;
      font-weight: 400;

      color: rgba(255, 255, 255, 0.87);
      background-color: #0a0a0a;

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      --primary-color: #FF5733;
      --secondary-color: #FF8C42;
      --accent-color: #FFA726;
      --bg-dark: #0a0a0a;
      --bg-medium: #1a1a1a;
      --text-primary: #ffffff;
      --text-secondary: #cccccc;
      --text-muted: #999999;
    }

    body {
      margin: 0;
      padding: 0;
      min-width: 320px;
      min-height: 100vh;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      line-height: 1.2;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    button {
      font-family: inherit;
      cursor: pointer;
    }

    html {
      scroll-behavior: smooth;
    }

    ::selection {
      background-color: rgba(255, 87, 51, 0.3);
      color: #fff;
    }

    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #0a0a0a;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #FF5733, #FF8C42);
      border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #FF6844, #FF9D53);
    }
  </style>
</svelte:head>

<Navigation />

<main>
  <slot />
</main>

<Footer />

<style>
  main {
    width: 100%;
    overflow-x: hidden;
  }
</style>