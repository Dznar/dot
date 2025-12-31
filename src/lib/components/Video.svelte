<script lang="ts">
  const videos = [
    {
      title: 'Feather-ink',
      description: 'AI-Powered Report Creation',
      url: 'https://dl.dropboxusercontent.com/scl/fi/68cofy7scfdgi2x4pz8a7/allFeather.mp4?rlkey=2eywcz7dbmpjwcw2b0icptjkd&st=vw4807x9&dl=0',
      color: '#FF5733'
    },
    {
      title: 'BrewBoxes',
      description: 'Instant Development Environments',
      url: 'https://dl.dropboxusercontent.com/scl/fi/06j03hjby6gq5d7wiwh1g/onlyBrew.mp4?rlkey=0ok4mnyq0bzkxb60iin3y0hzp&st=j0e2z8rv&dl=0',
      color: '#FF8C42'
    }
  ];
</script>

<section class="video-section">
  <div class="container">
    <h2>See It <span class="highlight">In Action</span></h2>
    <p class="section-subtitle">
      Watch how our tools transform complex workflows into simple, efficient processes
    </p>

    <div class="videos-grid">
      {#each videos as video}
        <div class="video-card" style="--accent-color: {video.color}">
          <div class="video-wrapper">
            <video
              controls
              poster="/dotact_logo.jpg"
              preload="metadata"
            >
              <source src={video.url} type="video/mp4" />
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="video-info">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
          <div class="video-glow"></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .video-section {
    background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
    padding: 6rem 2rem;
    position: relative;
  }

  .container {
    max-width: 1200px;
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

  .section-subtitle {
    text-align: center;
    color: #999;
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }

  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 3rem;
    margin-top: 3rem;
  }

  .video-card {
    position: relative;
  }

  .video-wrapper {
    position: relative;
    border-radius: 20px;
    border: 3px solid rgba(255, 87, 51, 0.3);
    background: #000;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .video-wrapper:hover {
    border-color: var(--accent-color);
    box-shadow: 0 20px 60px rgba(255, 87, 51, 0.4);
    transform: translateY(-5px);
  }

  .video-wrapper video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 17px;
  }

  .video-info {
    padding: 1.5rem 0;
    text-align: center;
  }

  .video-info h3 {
    color: var(--accent-color);
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .video-info p {
    color: #ccc;
    font-size: 1rem;
  }

  .video-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 87, 51, 0.2), transparent 70%);
    filter: blur(60px);
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .video-section {
      padding: 4rem 1rem;
    }

    .video-wrapper {
      border-radius: 15px;
    }

    .video-wrapper:hover {
      transform: scale(1);
    }
  }
</style>
