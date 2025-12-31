<script lang="ts">
  let activeProduct: string | null = null;

  const products = [
    {
      id: 'feather-ink',
      name: 'Feather-ink',
      icon: '/feather-ink.png',
      tagline: 'AI-Powered Report Creation',
      description: 'A lightweight, installable app, featuring an integrated on-device AI model for effortless creation of complex, professional reports (50+ pages).',
      features: [
        'Integrated AI assistance for content generation',
        'Modern syntax - easier than TeX',
        'On-device AI model for privacy',
        'Professional formatting and error correction',
        'Cross-platform desktop application'
      ],
      color: '#FF5733'
    },
    {
      id: 'brewboxes',
      name: 'BrewBoxes',
      icon: '/brewboxes.png',
      tagline: 'Instant Development Environments',
      description: 'A browser-based, cross-platform tool that lets users launch, configure, and manage ready-to-use software environments with GUI—no OS installation required.',
      features: [
        'Browser-based, works anywhere',
        'Pre-configured containers',
        'Zero installation required',
        'Perfect for teams and education'
      ],
      color: '#FF8C42'
    }
  ];

  const toggleProduct = (id: string) => {
    activeProduct = activeProduct === id ? null : id;
  };
</script>

<section id="products" class="products">
  <svg class="wave-divider top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#FF5733;stop-opacity:0.3" />
        <stop offset="50%" style="stop-color:#FF8C42;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#FFA726;stop-opacity:0.3" />
      </linearGradient>
    </defs>
    <path fill="url(#gradient2)" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
  </svg>

  <div class="container">
    <h2>Our <span class="highlight">Products</span></h2>
    <p class="section-subtitle">Production-ready tools designed for accessibility, productivity, and seamless workflows</p>

    <div class="products-grid">
      {#each products as product}
        <div class="product-card" style="--accent-color: {product.color}">
          <div class="product-icon">
            <img src={product.icon} alt={product.name} />
          </div>

          <h3>{product.name}</h3>
          <p class="product-tagline">{product.tagline}</p>
          <p class="product-description">{product.description}</p>

          <button class="details-btn" on:click={() => toggleProduct(product.id)}>
            {activeProduct === product.id ? 'Show Less' : 'Learn More'}
          </button>

          {#if activeProduct === product.id}
            <div class="features-list">
              <h4>Key Features:</h4>
              <ul>
                {#each product.features as feature}
                  <li>{feature}</li>
                {/each}
              </ul>
            </div>
          {/if}

          <button class="download-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 14L5 9H8V3H12V9H15L10 14Z" fill="currentColor"/>
              <path d="M17 15V17H3V15H1V17C1 18.1 1.9 19 3 19H17C18.1 19 19 18.1 19 17V15H17Z" fill="currentColor"/>
            </svg>
            Download (Coming Soon)
          </button>
        </div>
      {/each}
    </div>
  </div>

  <svg class="wave-divider bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
    <path fill="url(#gradient2)" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
  </svg>
</section>

<style>
  .products {
    background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
    padding: 6rem 2rem;
    position: relative;
  }

  .wave-divider {
    position: absolute;
    left: 0;
    width: 100%;
    height: auto;
  }

  .wave-divider.top {
    top: 0;
  }

  .wave-divider.bottom {
    bottom: 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
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

  .section-subtitle {
    text-align: center;
    color: #999;
    font-size: 1.2rem;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 3rem;
    margin-top: 3rem;
  }

  .product-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 87, 51, 0.2);
    border-radius: 20px;
    padding: 2.5rem;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--accent-color), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  .product-card:hover::before {
    transform: scaleX(1);
  }

  .product-card:hover {
    transform: translateY(-10px);
    border-color: var(--accent-color);
    box-shadow: 0 20px 60px rgba(255, 87, 51, 0.3);
  }

  .product-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 1.5rem;
    background: rgba(255, 87, 51, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .product-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h3 {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .product-tagline {
    text-align: center;
    color: var(--accent-color);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .product-description {
    color: #ccc;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .details-btn {
    background: transparent;
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    padding: 0.8rem 2rem;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: block;
    margin: 0 auto 1.5rem;
  }

  .details-btn:hover {
    background: var(--accent-color);
    color: #fff;
    transform: scale(1.05);
  }

  .features-list {
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 1.5rem;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .features-list h4 {
    color: var(--accent-color);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .features-list ul {
    list-style: none;
    padding: 0;
  }

  .features-list li {
    color: #ccc;
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .features-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent-color);
    font-weight: bold;
  }

  .download-btn {
    background: linear-gradient(135deg, #FF5733, #FF8C42);
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto;
    transition: all 0.3s ease;
  }

  .download-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 87, 51, 0.4);
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
    }

    .products {
      padding: 4rem 1rem;
    }
  }
</style>
