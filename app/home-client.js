'use client'

import { useEffect } from 'react'
import { useTina, tinaField } from 'tinacms/dist/react'

export default function HomeClient({ initialData, query, variables }) {
  const { data } = useTina({ query, variables, data: initialData })
  const content = data?.page || {}

  const hero = content.hero || {}
  const features = content.features || {}
  const showcase1 = content.showcase1 || {}
  const showcase2 = content.showcase2 || {}
  const stats = content.stats || {}
  const logos = content.logos || {}
  const testimonial = content.testimonial || {}
  const additionalFeatures = content.additionalFeatures || {}
  const cta = content.cta || {}
  const footer = content.footer || {}

  useEffect(() => {
    // Scroll-triggered fade-in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.glow-card-wrapper, .showcase, .testimonial-card, .stat-item').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    // GlowingEffect — mouse-tracking conic gradient border
    const PROXIMITY = 64
    const SPREAD = 40
    const INACTIVE_ZONE = 0.01
    const DURATION = 2
    const EASE = [0.16, 1, 0.3, 1]

    const wrappers = document.querySelectorAll('.glow-card-wrapper')
    const glowEls = []

    wrappers.forEach(w => {
      const el = w.querySelector('.glow-effect')
      if (el) glowEls.push(el)
    })

    const lastPos = { x: 0, y: 0 }

    function cubicBezier(t, p1, p2, p3, p4) {
      const u = 1 - t
      return 3 * u * u * t * p1 + 3 * u * t * t * p3 + t * t * t
    }
    function bezierValue(t) {
      return cubicBezier(t, EASE[0], EASE[1], EASE[2], EASE[3])
    }

    const state = new Map()
    glowEls.forEach(el => state.set(el, { raf: 0 }))

    function animateAngle(el, from, to) {
      const s = state.get(el)
      if (s.raf) cancelAnimationFrame(s.raf)

      const startTime = performance.now()
      const durationMs = DURATION * 1000

      function tick(now) {
        const t = Math.min((now - startTime) / durationMs, 1)
        const eased = bezierValue(t)
        const val = from + (to - from) * eased
        el.style.setProperty('--start', String(val))

        if (t < 1) {
          s.raf = requestAnimationFrame(tick)
        } else {
          s.raf = 0
        }
      }
      s.raf = requestAnimationFrame(tick)
    }

    function handleMove(e) {
      const mx = e ? (e.clientX ?? e.x) : lastPos.x
      const my = e ? (e.clientY ?? e.y) : lastPos.y
      if (e) { lastPos.x = mx; lastPos.y = my }

      glowEls.forEach(el => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width * 0.5
        const cy = rect.top + rect.height * 0.5

        const dist = Math.hypot(mx - cx, my - cy)
        const inactiveR = 0.5 * Math.min(rect.width, rect.height) * INACTIVE_ZONE
        if (dist < inactiveR) {
          el.style.setProperty('--active', '0')
          return
        }

        const isActive =
          mx > rect.left - PROXIMITY &&
          mx < rect.right + PROXIMITY &&
          my > rect.top - PROXIMITY &&
          my < rect.bottom + PROXIMITY

        el.style.setProperty('--active', isActive ? '1' : '0')
        if (!isActive) return

        const currentAngle = parseFloat(el.style.getPropertyValue('--start')) || 0
        let targetAngle = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90

        const diff = ((targetAngle - currentAngle + 180) % 360) - 180
        const newAngle = currentAngle + diff

        animateAngle(el, currentAngle, newAngle)
      })
    }

    document.body.addEventListener('pointermove', handleMove, { passive: true })
    const scrollHandler = () => handleMove(null)
    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => {
      observer.disconnect()
      document.body.removeEventListener('pointermove', handleMove)
      window.removeEventListener('scroll', scrollHandler)
      glowEls.forEach(el => {
        const s = state.get(el)
        if (s && s.raf) cancelAnimationFrame(s.raf)
      })
    }
  }, [])

  return (
    <>
      {/* Noise texture */}
      <div className="noise-overlay"></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <img src="/brand_assets/sfca_logo_transparent.png" alt="SFCA Logo" />
          </a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#method">Method</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#" className="btn-ghost">Log In</a>
            <a href="#" className="btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-stars"></div>
          <div className="hero-orb"></div>
          <div className="hero-orb-inner"></div>
          <div className="hero-ring"></div>
          <div className="hero-streak"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge fade-in" data-tina-field={tinaField(hero, 'badge')}>
            <span className="hero-badge-dot"></span>
            {hero.badge}
          </div>
          <h1 className="gradient-text fade-in fade-in-delay-1" data-tina-field={tinaField(hero, 'heading')}>{hero.heading}</h1>
          <p className="hero-subtitle fade-in fade-in-delay-2" data-tina-field={tinaField(hero, 'subheading')}>{hero.subheading}</p>
          <div className="hero-buttons fade-in fade-in-delay-3">
            <a href={hero.primaryButtonLink || '#'} className="btn-primary btn-lg" data-tina-field={tinaField(hero, 'primaryButtonText')}>{hero.primaryButtonText}</a>
            <a href={hero.secondaryButtonLink || '#'} className="btn-ghost btn-lg" data-tina-field={tinaField(hero, 'secondaryButtonText')}>{hero.secondaryButtonText}</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" data-tina-field={tinaField(features, 'label')}>{features.label}</span>
          </div>
          <h2 className="section-title gradient-text" data-tina-field={tinaField(features, 'title')}>{features.title}</h2>
          <p className="section-desc" data-tina-field={tinaField(features, 'description')}>{features.description}</p>

          <div className="features-grid">
            {(features.items || []).map((item, i) => (
              <div className="glow-card-wrapper" key={i}>
                <div className="glow-border-idle"></div>
                <div className="glow-effect"><div className="glow-sweep"></div></div>
                <div className="feature-card">
                  <div className="feature-card-glow"></div>
                  <div className="feature-card-icon" data-tina-field={tinaField(item, 'icon')}>{item.icon}</div>
                  <h3 className="gradient-text" data-tina-field={tinaField(item, 'title')}>{item.title}</h3>
                  <p data-tina-field={tinaField(item, 'description')}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Showcase / Method Section */}
      <section className="section" id="method">
        <div className="container">
          <div className="showcase">
            <div className="showcase-visual">
              <img src={showcase1.image || 'https://placehold.co/800x600'} alt={showcase1.imageAlt || ''} data-tina-field={tinaField(showcase1, 'image')} />
              <div className="showcase-visual-glow"></div>
            </div>
            <div className="showcase-text">
              <span className="section-label" data-tina-field={tinaField(showcase1, 'label')}>{showcase1.label}</span>
              <h2 className="gradient-text" data-tina-field={tinaField(showcase1, 'title')}>{showcase1.title}</h2>
              <p data-tina-field={tinaField(showcase1, 'description')}>{showcase1.description}</p>
              <a href={showcase1.buttonLink || '#'} className="btn-primary" data-tina-field={tinaField(showcase1, 'buttonText')}>{showcase1.buttonText}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Reverse Showcase */}
      <section className="section">
        <div className="container">
          <div className="showcase" style={{ direction: 'rtl' }}>
            <div className="showcase-visual" style={{ direction: 'ltr' }}>
              <img src={showcase2.image || 'https://placehold.co/800x600'} alt={showcase2.imageAlt || ''} data-tina-field={tinaField(showcase2, 'image')} />
              <div className="showcase-visual-glow"></div>
            </div>
            <div className="showcase-text" style={{ direction: 'ltr' }}>
              <span className="section-label" data-tina-field={tinaField(showcase2, 'label')}>{showcase2.label}</span>
              <h2 className="gradient-text" data-tina-field={tinaField(showcase2, 'title')}>{showcase2.title}</h2>
              <p data-tina-field={tinaField(showcase2, 'description')}>{showcase2.description}</p>
              <a href={showcase2.buttonLink || '#'} className="btn-primary" data-tina-field={tinaField(showcase2, 'buttonText')}>{showcase2.buttonText}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Stats Section */}
      <section className="section" id="results">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" data-tina-field={tinaField(stats, 'label')}>{stats.label}</span>
          </div>
          <h2 className="section-title gradient-text" data-tina-field={tinaField(stats, 'title')}>{stats.title}</h2>
          <p className="section-desc" data-tina-field={tinaField(stats, 'description')}>{stats.description}</p>

          <div className="stats-row">
            {(stats.items || []).map((item, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-number gold-gradient-text" data-tina-field={tinaField(item, 'number')}>{item.number}</div>
                <div className="stat-label" data-tina-field={tinaField(item, 'label')}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Logos / Social Proof */}
      <section className="logos-section">
        <div className="container">
          <p className="logos-label" data-tina-field={tinaField(logos, 'label')}>{logos.label}</p>
          <div className="logos-grid">
            {(logos.companies || []).map((company, i) => (
              <span key={i}>{company}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Testimonial Section */}
      <section className="section" id="testimonials">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" data-tina-field={tinaField(testimonial, 'label')}>{testimonial.label}</span>
          </div>
          <h2 className="section-title gradient-text" data-tina-field={tinaField(testimonial, 'title')}>{testimonial.title}</h2>
          <p className="section-desc" data-tina-field={tinaField(testimonial, 'description')}>{testimonial.description}</p>

          <div className="testimonial-card">
            <div className="testimonial-card-glow"></div>
            <p className="testimonial-quote" data-tina-field={tinaField(testimonial, 'quote')}>&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="testimonial-author" data-tina-field={tinaField(testimonial, 'author')}>{testimonial.author}</p>
            <p className="testimonial-role" data-tina-field={tinaField(testimonial, 'role')}>{testimonial.role}</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Additional Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" data-tina-field={tinaField(additionalFeatures, 'label')}>{additionalFeatures.label}</span>
          </div>
          <h2 className="section-title gradient-text" data-tina-field={tinaField(additionalFeatures, 'title')}>{additionalFeatures.title}</h2>
          <p className="section-desc" data-tina-field={tinaField(additionalFeatures, 'description')}>{additionalFeatures.description}</p>

          <div className="features-grid">
            {(additionalFeatures.items || []).map((item, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-card-glow"></div>
                <div className="feature-card-icon" data-tina-field={tinaField(item, 'icon')}>{item.icon}</div>
                <h3 className="gradient-text" data-tina-field={tinaField(item, 'title')}>{item.title}</h3>
                <p data-tina-field={tinaField(item, 'description')}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-orb"></div>
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="gradient-text" data-tina-field={tinaField(cta, 'heading')}>{cta.heading}</h2>
          <p data-tina-field={tinaField(cta, 'description')}>{cta.description}</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={cta.primaryButtonLink || '#'} className="btn-primary btn-lg" data-tina-field={tinaField(cta, 'primaryButtonText')}>{cta.primaryButtonText}</a>
            <a href={cta.secondaryButtonLink || '#'} className="btn-ghost btn-lg" data-tina-field={tinaField(cta, 'secondaryButtonText')}>{cta.secondaryButtonText}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/brand_assets/sfca_logo_transparent.png" alt="SFCA" style={{ height: '40px', width: 'auto' }} />
              <p data-tina-field={tinaField(footer, 'description')}>{footer.description}</p>
            </div>
            <div className="footer-col">
              <h4>Academy</h4>
              <ul>
                <li><a href="#">Curriculum</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Student Results</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Free Templates</a></li>
                <li><a href="#">Swipe File</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span data-tina-field={tinaField(footer, 'copyright')}>{footer.copyright}</span>
            <span data-tina-field={tinaField(footer, 'tagline')}>{footer.tagline}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
