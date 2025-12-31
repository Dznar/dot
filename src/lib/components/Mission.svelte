<script lang="ts">
  const challenges = [
    {
      icon: '📝',
      title: 'Complex Report Creation',
      description: 'Time-consuming tools like LaTeX with steep learning curves and limited AI support'
    },
    {
      icon: '⚙️',
      title: 'Environment Setup',
      description: 'Cumbersome manual OS installations and complex configurations hinder productivity'
    }
  ];

  const solutions = [
    {
      icon: '✨',
      title: 'Intuitive Interface',
      description: 'Modern Typst syntax with built-in AI assistance for seamless content creation'
    },
    {
      icon: '🚀',
      title: 'Instant Deployment',
      description: 'Pre-configured containers accessible from any device via browser'
    },
    {
      icon: '🌍',
      title: 'Global Impact',
      description: 'Supporting Tunisia\'s and global digital transformation with accessible tools'
    }
  ];
</script>

<section id="mission" class="mission">
  <div class="container">
    <h2>Our <span class="highlight">Mission</span></h2>
    <p class="mission-statement">
      Empowering professionals, students, and tech teams with innovative solutions that eliminate barriers to productivity and creativity.
    </p>

    <div class="content-grid">
      <div class="challenges-section">
        <h3>The Challenge</h3>
        <div class="cards">
          {#each challenges as challenge}
            <div class="challenge-card">
              <div class="icon">{challenge.icon}</div>
              <h4>{challenge.title}</h4>
              <p>{challenge.description}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="divider">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" stroke="url(#arrowGradient)" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M25 30L30 25L35 30M30 35V25" stroke="url(#arrowGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF5733"/>
              <stop offset="100%" style="stop-color:#FF8C42"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="solutions-section">
        <h3>Our Solution</h3>
        <div class="cards">
          {#each solutions as solution}
            <div class="solution-card">
              <div class="icon">{solution.icon}</div>
              <h4>{solution.title}</h4>
              <p>{solution.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="impact">
      <div class="impact-content">
        <h3>Built for Impact</h3>
        <p>Our tools are production-ready, lightweight, and designed for cross-platform use, ensuring that anyone, anywhere can access the power of modern technology without barriers.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .mission {
    background: linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%);
    padding: 6rem 2rem;
    position: relative;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    text-align: center;
    color: #fff;
    margin-bottom: 1rem;
  }

  .highlight {
    background: linear-gradient(135deg, #FF5733, #FF8C42);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mission-statement {
    text-align: center;
    color: #ccc;
    font-size: 1.3rem;
    line-height: 1.7;
    max-width: 900px;
    margin: 0 auto 4rem;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 3rem;
    align-items: center;
    margin-bottom: 4rem;
  }

  .challenges-section, .solutions-section {
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 2rem;
    text-align: center;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .challenge-card, .solution-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 87, 51, 0.2);
    border-radius: 15px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .challenge-card:hover, .solution-card:hover {
    transform: translateX(10px);
    border-color: #FF5733;
    box-shadow: 0 10px 40px rgba(255, 87, 51, 0.2);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h4 {
    color: #FF5733;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #ccc;
    line-height: 1.6;
  }

  .divider {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(90deg);
  }

  .divider svg {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }

  .impact {
    background: linear-gradient(135deg, rgba(255, 87, 51, 0.1), rgba(255, 140, 66, 0.1));
    border: 2px solid rgba(255, 87, 51, 0.3);
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .impact::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 87, 51, 0.1), transparent);
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .impact-content {
    position: relative;
    z-index: 10;
  }

  .impact h3 {
    color: #FF5733;
    margin-bottom: 1rem;
  }

  .impact p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .divider {
      transform: rotate(0deg);
    }

    .challenge-card:hover, .solution-card:hover {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    .mission {
      padding: 4rem 1rem;
    }

    .impact {
      padding: 2rem;
    }
  }
</style>
