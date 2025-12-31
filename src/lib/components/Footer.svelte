<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/dotact_logo.jpg" alt="DotAct Logo" class="footer-logo" />
        <p class="brand-tagline">
          Empowering digital transformation through innovation
        </p>
        <div class="social-links">
          <a href="https://twitter.com" class="social-link" aria-label="Twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>
          <a href="https://facebook.com" class="social-link" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" class="social-link" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com" class="social-link" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <h4>Products</h4>
        <ul>
          <li><a href="#products">Feather-ink</a></li>
          <li><a href="#products">BrewBoxes</a></li>
          <li><a href="/">Download</a></li>
          <li><a href="/">Documentation</a></li>
        </ul>
      </div>

      <div class="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="#mission">About Us</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/">Careers</a></li>
        </ul>
      </div>

      <div class="footer-links">
        <h4>Support</h4>
        <ul>
          <li><a href="/">Help Center</a></li>
          <li><a href="/">Community</a></li>
          <li><a href="/">FAQs</a></li>
          <li><a href="/">Status</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <p class="copyright">
        &copy; {currentYear} DotAct. All rights reserved.
      </p>
      <div class="footer-legal">
        <a href="/">Privacy Policy</a>
        <span class="separator">|</span>
        <a href="/">Terms of Service</a>
        <span class="separator">|</span>
        <a href="/">Cookie Policy</a>
      </div>
    </div>
  </div>

  <div class="footer-glow"></div>
</footer>

<style>
  .footer {
    background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
    padding: 4rem 2rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .footer-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FF5733, transparent);
    box-shadow: 0 0 20px #FF5733;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-logo {
    width: 150px;
    height: auto;
  }

  .brand-tagline {
    color: #999;
    line-height: 1.6;
    max-width: 300px;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 87, 51, 0.1);
    border: 2px solid rgba(255, 87, 51, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FF5733;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    background: #FF5733;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(255, 87, 51, 0.4);
  }

  .footer-links h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .footer-links a {
    color: #999;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }

  .footer-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #FF5733;
    transition: width 0.3s ease;
  }

  .footer-links a:hover {
    color: #FF5733;
  }

  .footer-links a:hover::after {
    width: 100%;
  }

  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 87, 51, 0.3), transparent);
    margin: 2rem 0;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .copyright {
    color: #666;
    font-size: 0.95rem;
  }

  .footer-legal {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .footer-legal a {
    color: #666;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }

  .footer-legal a:hover {
    color: #FF5733;
  }

  .separator {
    color: #444;
  }

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .footer-brand {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 768px) {
    .footer {
      padding: 3rem 1rem 1.5rem;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }

    .footer-legal {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
