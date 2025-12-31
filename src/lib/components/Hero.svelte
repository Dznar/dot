<script lang="ts">
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<section id="home" class="hero">
  <svg class="drip-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FF5733;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#FF8C42;stop-opacity:0.6" />
      </linearGradient>
    </defs>
    <path fill="url(#gradient1)" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" class="drip-path"></path>
  </svg>

  <div class="hero-content">
    <div class="floating-circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <h1>
      <span class="gradient-text">Empower</span> Your Digital Workflow
    </h1>
    <p class="tagline">
      Revolutionizing productivity with intelligent tools for professionals, students, and tech teams
    </p>

    <div class="cta-buttons">
      <button class="primary-btn" on:click={scrollToProducts}>
        Explore Products
      </button>
      <button class="secondary-btn" on:click={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
        Get In Touch
      </button>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-number">2</span>
        <span class="stat-label">Products</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">100%</span>
        <span class="stat-label">Production Ready</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">Possibilities</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 8rem 2rem 4rem;
  }

  .drip-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0.3;
    animation: drip 8s ease-in-out infinite;
  }

  @keyframes drip {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
  }

  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 1200px;
  }

  .floating-circles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 87, 51, 0.3), transparent);
    animation: float 6s ease-in-out infinite;
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 200px;
    height: 200px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  .circle-3 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 50%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-30px) scale(1.1);
    }
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    color: #fff;
  }

  .gradient-text {
    background: linear-gradient(135deg, #FF5733, #FF8C42, #FFA726);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(10deg);
    }
  }

  .tagline {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: #ccc;
    margin-bottom: 3rem;
    line-height: 1.6;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 4rem;
  }

  .primary-btn, .secondary-btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .primary-btn {
    background: linear-gradient(135deg, #FF5733, #FF8C42);
    color: #fff;
  }

  .primary-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .primary-btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 87, 51, 0.4);
  }

  .secondary-btn {
    background: transparent;
    color: #FF5733;
    border: 2px solid #FF5733;
  }

  .secondary-btn:hover {
    background: rgba(255, 87, 51, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 87, 51, 0.2);
  }

  .stats {
    display: flex;
    gap: 3rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #FF5733, #FF8C42);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-label {
    font-size: 1rem;
    color: #999;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 6rem 1.5rem 3rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .stats {
      gap: 2rem;
    }

    .circle {
      opacity: 0.5;
    }
  }
</style>
