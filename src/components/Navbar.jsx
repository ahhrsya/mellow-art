import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Archive', href: '#archive' },
  { label: 'Artists', href: '#artists' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [atTop, setAtTop] = useState(true)

  const headerRef = useRef(null)
  const linksRef = useRef([])
  const logoRef = useRef(null)
  const prevScrollY = useRef(0)
  const ticking = useRef(false)

  /* ── Scroll logic (hide-on-scroll-down, show-on-scroll-up, BVN style) ── */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const y = window.scrollY
        const diff = y - prevScrollY.current
        const docH = document.documentElement.scrollHeight - window.innerHeight
        const pct = docH > 0 ? (y / docH) * 100 : 0
        document.documentElement.style.setProperty('--scroll-pct', `${pct.toFixed(1)}%`)

        setAtTop(y < 10)
        setScrolled(y > 60)

        // Hide going down (past 160px), show coming up — refined BVN behaviour
        if (y > 160) {
          setHidden(diff > 4)   // hide only if scrolling down at speed
        } else {
          setHidden(false)
        }

        // Active section detection
        const sections = navLinks
          .map(l => ({ href: l.href, el: document.querySelector(l.href) }))
          .filter(s => s.el)

        let current = ''
        for (const { href, el } of sections) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) current = href
        }
        setActiveLink(current)

        prevScrollY.current = y
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Page-load animation — links stagger in from above ── */
  useEffect(() => {
    const links = linksRef.current.filter(Boolean)
    const logo = logoRef.current
    if (!links.length || !logo) return

    gsap.fromTo(
      logo,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.15 }
    )

    gsap.fromTo(
      links,
      { opacity: 0, y: -12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 0.3,
      }
    )
  }, [])

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Smooth scroll handler ── */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  /* ── Mobile menu link stagger animation ── */
  useEffect(() => {
    const items = document.querySelectorAll('.mob-link-item')
    if (menuOpen) {
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'expo.out', stagger: 0.07, delay: 0.15 }
      )
    }
  }, [menuOpen])

  const headerClass = [
    'navbar',
    scrolled ? 'scrolled' : '',
    hidden ? 'nav-hidden' : '',
    atTop ? 'at-top' : '',
    menuOpen ? 'menu-is-open' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      {/* ─────────────────────── HEADER ─────────────────────── */}
      <header ref={headerRef} className={headerClass} role="banner">
        {/* Backdrop glass layer — fades in as you scroll */}
        <div className="navbar-backdrop" aria-hidden="true" />

        <div className="navbar-inner">

          {/* Logo */}
          <a
            href="#"
            ref={logoRef}
            className="navbar-logo"
            onClick={e => handleNavClick(e, '#')}
            aria-label="Mellow Art — home"
          >
            MELLOW<span className="logo-dot">✦</span>
          </a>

          {/* Desktop nav */}
          <nav className="navbar-links" aria-label="Main navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                ref={el => { linksRef.current[i] = el }}
                className={`nav-pill ${activeLink === link.href ? 'nav-pill--active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
                aria-current={activeLink === link.href ? 'page' : undefined}
              >
                {link.label}
                {/* Active dot indicator — BVN-style */}
                <span className="nav-pill-dot" aria-hidden="true" />
              </a>
            ))}

            <a
              href="#contact"
              ref={el => { linksRef.current[navLinks.length] = el }}
              className="navbar-cta nav-pill"
              onClick={e => handleNavClick(e, '#contact')}
            >
              Get Tickets
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        {/* Progress line — thin accent line at very bottom of header
            grows from 0→100% as user scrolls through the page          */}
        <div className="navbar-progress" aria-hidden="true">
          <div className="navbar-progress-fill" />
        </div>
      </header>

      {/* ─────────────────────── MOBILE MENU ─────────────────────── */}
      <div
        className={`mobile-overlay ${menuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Menu close strip at top — mirrors the header */}
        <div className="mob-header">
          <span className="mob-logo hand">MELLOW✦</span>
          <button
            className="mob-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        <nav className="mob-nav" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <div key={link.label} className="mob-link-item">
              <span className="mob-link-num">0{i + 1}</span>
              <a
                href={link.href}
                className={`mob-link ${activeLink === link.href ? 'mob-link--active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="mob-footer mob-link-item">
          <a
            href="#contact"
            className="mob-cta"
            onClick={e => handleNavClick(e, '#contact')}
          >
            Get Tickets →
          </a>
        </div>
      </div>
    </>
  )
}
