<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { currentUser } from '$lib/store';

  let isMenuOpen = false;

  const dispatch = createEventDispatcher();

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      isMenuOpen = false;
    }
  };

  async function handleLogout() {
    try {
      const response = await fetch('/logout', {
        method: 'POST'
      });

      if (response.ok) {
        currentUser.set(null); // Clear client-side store
        window.location.href = '/login'; // Redirect to login page
      } else {
        const data = await response.json();
        console.error('Server logout error:', data.message);
        alert(data.message || 'Logout failed.');
      }
    } catch (error) {
      console.error('Network error during logout:', error);
      alert('Network error during logout. Please try again.');
    }
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">
      <span class="logo-text">Dot<span class="logo-act">Act</span></span>
    </div>

    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
      <span class:open={isMenuOpen}></span>
      <span class:open={isMenuOpen}></span>
      <span class:open={isMenuOpen}></span>
    </button>

    <div class="nav-links" class:active={isMenuOpen}>
      <button on:click={() => scrollToSection('home')}>Home</button>
      <button on:click={() => scrollToSection('products')}>Products</button>
      <button on:click={() => scrollToSection('mission')}>Mission</button>
      <button on:click={() => scrollToSection('contact')}>Contact</button>
      {#if $currentUser}
        <button class="signin-btn" on:click={handleLogout}>Logout</button>
      {:else}
        <a href="/login" class="signin-btn">Sign In</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 2px solid rgba(255, 87, 51, 0.3);
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-text {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -1px;
    display: flex;
    align-items: center;
  }

  .logo-act {
    color: #FF5733;
    margin-left: 2px;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .menu-toggle span {
    width: 25px;
    height: 3px;
    background: #FF5733;
    margin: 3px 0;
    transition: all 0.3s ease;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-links button, .nav-links a {
    background: none;
    border: none;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
  }

  .nav-links button::after, .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #FF5733, #FF8C42);
    transition: width 0.3s ease;
  }

  .nav-links button:hover::after, .nav-links a:hover::after {
    width: 80%;
  }

  .signin-btn {
    background: linear-gradient(135deg, #FF5733, #FF8C42) !important;
    border-radius: 25px;
    padding: 0.7rem 1.5rem !important;
    font-weight: 600;
    display: inline-block;
    text-align: center;
  }

  .signin-btn::after {
    display: none !important;
  }

  .signin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(255, 87, 51, 0.4);
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }

    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(18, 18, 18, 0.98);
      flex-direction: column;
      padding: 2rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .nav-links.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
</style>
