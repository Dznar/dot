<script lang="ts">
</script>

<section id="contact" class="contact">
  <svg class="wave-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#FF5733;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#FF8C42;stop-opacity:0.3" />
      </linearGradient>
    </defs>
    <path fill="url(#gradient3)" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
  </svg>

  <div class="container">
    <h2>Get In <span class="highlight">Touch</span></h2>
    <p class="section-subtitle">
      Ready to transform your workflow? Let's start a conversation.
    </p>

    <div class="contact-content">
      <h3>Why Connect With Us?</h3>
      <div class="info-cards">
        <div class="info-card">
          <div class="info-icon">💼</div>
          <h4>Enterprise Solutions</h4>
          <p>Custom deployment and training for teams</p>
        </div>
        <div class="info-card">
          <div class="info-icon">🎓</div>
          <h4>Educational Programs</h4>
          <p>Special pricing for schools and institutions</p>
        </div>
        <div class="info-card">
          <div class="info-icon">🤝</div>
          <h4>Partnerships</h4>
          <p>Collaborate on digital transformation</p>
        </div>
      </div>

      <div class="cta-box">
        <h4>Join Our Journey</h4>
        <p>Be part of the digital transformation in Tunisia and beyond</p>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    background: linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%);
    padding: 6rem 2rem;
    position: relative;
  }

  .wave-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
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
  }

  .contact-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .contact-content h3 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  .info-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .info-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 87, 51, 0.2);
    border-radius: 15px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .info-card:hover {
    border-color: #FF5733;
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(255, 87, 51, 0.2);
  }

  .info-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .info-card h4 {
    color: #FF5733;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .info-card p {
    color: #ccc;
    line-height: 1.5;
  }

  .cta-box {
    background: linear-gradient(135deg, rgba(255, 87, 51, 0.15), rgba(255, 140, 66, 0.15));
    border: 2px solid rgba(255, 87, 51, 0.3);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
  }

  .cta-box h4 {
    color: #FF5733;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .cta-box p {
    color: #ccc;
    line-height: 1.6;
  }


  @media (max-width: 768px) {
    .contact {
      padding: 4rem 1rem;
    }

    .contact-content h3 {
      font-size: 1.8rem;
    }
  }
</style>
