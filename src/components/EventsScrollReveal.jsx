import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Event data ─── */
const EVENTS = [
    {
        number: '01',
        name: 'Winter Warmers',
        tag: 'Craft & Textiles',
        date: 'Jul 2025',
        stat: '480 attendees',
        accent: '#FF2D78',
        bg: '#1A0D11',
        image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=900&h=1200&fit=crop',
        desc: 'Woollen wonders, hand-thrown pots and warm community.',
    },
    {
        number: '02',
        name: 'Spring Fling',
        tag: 'Mixed Media',
        date: 'Oct 2025',
        stat: '720 attendees',
        accent: '#FFDD00',
        bg: '#12110A',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&h=1200&fit=crop',
        desc: 'Colour explosions, bold prints and botanical installations.',
    },
    {
        number: '03',
        name: 'Night Market',
        tag: 'Urban Arts',
        date: 'Nov 2025',
        stat: '560 attendees',
        accent: '#3ECFE0',
        bg: '#081214',
        image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&h=1200&fit=crop',
        desc: 'The city after dark — neon murals and late-night ceramics.',
    },
    {
        number: '04',
        name: 'Holiday Bazaar',
        tag: 'All Disciplines',
        date: 'Dec 2025',
        stat: '1,200 attendees',
        accent: '#C8FF2E',
        bg: '#0D1208',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&h=1200&fit=crop',
        desc: 'The biggest Mellow Art celebration of the year.',
    },
    {
        number: '05',
        name: 'Art Walk',
        tag: 'Community',
        date: 'May 2025',
        stat: '1,800 attendees',
        accent: '#FF6B4A',
        bg: '#120B08',
        image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=900&h=1200&fit=crop',
        desc: "Melbourne's streets became a gallery for one weekend.",
    },
]

export default function EventsScrollReveal() {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const cursorRef = useRef(null)   // custom cursor blob
    const dotRef = useRef(null)   // trailing dot

    useEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        const cursor = cursorRef.current
        const dot = dotRef.current
        if (!section || !track || !cursor || !dot) return

        /* ═══════════════════════════════════════════════════
           CUSTOM CURSOR — smooth lag follower
           Uses two elements:
             cursor   — big pill label ("DRAG →"), lags behind
             dot      — tiny sharp dot, snaps instantly to mouse
        ═══════════════════════════════════════════════════ */
        let mouseX = 0, mouseY = 0
        let curX = 0, curY = 0
        let raf = null

        // Hide the native cursor while over section
        const showCursor = () => {
            section.style.cursor = 'none'
            gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' })
            gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' })
        }
        const hideCursor = () => {
            section.style.cursor = ''
            gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' })
            gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2, ease: 'power2.in' })
        }

        // Track mouse inside section
        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            // Dot snaps immediately
            gsap.set(dot, { x: mouseX, y: mouseY })
        }

        // Lerp loop — cursor trails behind mouse
        const lerp = (a, b, t) => a + (b - a) * t
        const loop = () => {
            curX = lerp(curX, mouseX, 0.1)
            curY = lerp(curY, mouseY, 0.1)
            gsap.set(cursor, { x: curX, y: curY })
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        section.addEventListener('mouseenter', showCursor)
        section.addEventListener('mouseleave', hideCursor)
        section.addEventListener('mousemove', onMouseMove)

        // Change cursor label on image vs text half
        const updateLabel = (e) => {
            const label = cursor.querySelector('.esr-cursor-label')
            if (!label) return
            const panel = e.target.closest('.esr-panel')
            if (panel) {
                const rect = panel.getBoundingClientRect()
                const isLeft = e.clientX < rect.left + rect.width * 0.5
                label.textContent = isLeft ? '✦ VIEW' : 'DRAG →'
            }
        }
        section.addEventListener('mousemove', updateLabel)

        /* ═══════════════════════════════════════════
           GSAP SCROLL ANIMATIONS
        ═══════════════════════════════════════════ */
        const ctx = gsap.context(() => {

            /* 1. Horizontal pin & scrub */
            const panels = gsap.utils.toArray('.esr-panel')
            const totalW = track.scrollWidth
            const travelX = -(totalW - window.innerWidth)

            const hScroll = gsap.to(track, {
                x: travelX,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1.0,
                    end: () => `+=${totalW}`,
                    invalidateOnRefresh: true,
                },
            })

            /* 2. HUD entrance */
            gsap.from(['.esr-intro-label', '.esr-intro-title'], {
                scrollTrigger: { trigger: section, start: 'top 90%' },
                y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
            })

            /* 3. Per-panel parallax + entrances */
            panels.forEach((panel) => {
                const img = panel.querySelector('.esr-panel-img')
                const giant = panel.querySelector('.esr-panel-giant')
                const meta = panel.querySelector('.esr-panel-meta')
                const num = panel.querySelector('.esr-panel-num')
                const tag = panel.querySelector('.esr-panel-tag')

                if (img) {
                    gsap.to(img, {
                        x: '-14%', ease: 'none',
                        scrollTrigger: {
                            trigger: panel, containerAnimation: hScroll,
                            start: 'left right', end: 'right left', scrub: true,
                        },
                    })
                }

                if (giant) {
                    gsap.fromTo(giant, { x: '10%' }, {
                        x: '-10%', ease: 'none',
                        scrollTrigger: {
                            trigger: panel, containerAnimation: hScroll,
                            start: 'left right', end: 'right left', scrub: true,
                        },
                    })
                }

                if (tag) {
                    gsap.fromTo(tag, { scale: 0.5, opacity: 0 }, {
                        scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.5,
                        scrollTrigger: {
                            trigger: panel, containerAnimation: hScroll,
                            start: 'left 85%', toggleActions: 'play none none reverse',
                        },
                    })
                }

                if (meta) {
                    gsap.fromTo(meta, { y: 70, opacity: 0 }, {
                        y: 0, opacity: 1, ease: 'expo.out', duration: 0.9,
                        scrollTrigger: {
                            trigger: panel, containerAnimation: hScroll,
                            start: 'left 80%', toggleActions: 'play none none reverse',
                        },
                    })
                }

                if (num) {
                    gsap.fromTo(num, { y: -60, opacity: 0, rotation: -6 }, {
                        y: 0, opacity: 1, rotation: 0, ease: 'back.out(1.6)', duration: 0.7,
                        scrollTrigger: {
                            trigger: panel, containerAnimation: hScroll,
                            start: 'left 75%', toggleActions: 'play none none reverse',
                        },
                    })
                }
            })

            /* 4. Background color flood */
            panels.forEach((panel) => {
                const color = panel.dataset.bg
                ScrollTrigger.create({
                    trigger: panel, containerAnimation: hScroll,
                    start: 'left center', end: 'right center',
                    onEnter: () => gsap.to(section, { backgroundColor: color, duration: 0.7, ease: 'power2.out' }),
                    onEnterBack: () => gsap.to(section, { backgroundColor: color, duration: 0.7, ease: 'power2.out' }),
                })
            })

            /* 5. Progress bar */
            gsap.to('.esr-progress-fill', {
                scaleX: 1, ease: 'none', transformOrigin: 'left center',
                scrollTrigger: {
                    trigger: section, start: 'top top', end: () => `+=${totalW}`, scrub: true,
                },
            })

            /* 6. Live counter */
            panels.forEach((panel, i) => {
                ScrollTrigger.create({
                    trigger: panel, containerAnimation: hScroll, start: 'left 55%',
                    onEnter: () => document.querySelectorAll('.esr-counter-current').forEach(el => { el.textContent = String(i + 1).padStart(2, '0') }),
                    onEnterBack: () => document.querySelectorAll('.esr-counter-current').forEach(el => { el.textContent = String(i + 1).padStart(2, '0') }),
                })
            })

            /* 7. Scroll hint fades out */
            gsap.to('.esr-scroll-hint', {
                opacity: 0, y: -20,
                scrollTrigger: { trigger: section, start: 'top top', end: '+=300', scrub: true },
            })

            /* 8. Cursor accent colour matches current panel */
            panels.forEach((panel) => {
                const accent = getComputedStyle(panel).getPropertyValue('--accent').trim()
                    || panel.style.getPropertyValue('--accent')
                ScrollTrigger.create({
                    trigger: panel, containerAnimation: hScroll, start: 'left 55%',
                    onEnter: () => gsap.to(cursor, { background: panel.style.getPropertyValue('--accent') || '#FF2D78', duration: 0.4, ease: 'power2.out' }),
                    onEnterBack: () => gsap.to(cursor, { background: panel.style.getPropertyValue('--accent') || '#FF2D78', duration: 0.4, ease: 'power2.out' }),
                })
            })

        }, section)

        return () => {
            cancelAnimationFrame(raf)
            section.removeEventListener('mouseenter', showCursor)
            section.removeEventListener('mouseleave', hideCursor)
            section.removeEventListener('mousemove', onMouseMove)
            section.removeEventListener('mousemove', updateLabel)
            section.style.cursor = ''
            ctx.revert()
        }
    }, [])

    return (
        <section
            className="esr-section"
            ref={sectionRef}
            style={{ backgroundColor: EVENTS[0].bg }}
            id="archive"
        >
            {/* ══ CUSTOM CURSOR ══ */}

            {/* Big pill label — trails with lag */}
            <div className="esr-cursor-blob" ref={cursorRef} aria-hidden="true">
                <span className="esr-cursor-label">DRAG →</span>
            </div>

            {/* Small sharp dot — snaps to mouse */}
            <div className="esr-cursor-dot" ref={dotRef} aria-hidden="true" />

            {/* ── HUD overlay ── */}
            <div className="esr-hud">
                <div className="esr-hud-left">
                    <span className="esr-intro-label">✦ Archive</span>
                    <h2 className="esr-intro-title">Past Events</h2>
                </div>
                <div className="esr-hud-right">
                    <div className="esr-counter">
                        <span className="esr-counter-current">01</span>
                        <span className="esr-counter-sep"> / </span>
                        <span className="esr-counter-total">{String(EVENTS.length).padStart(2, '0')}</span>
                    </div>
                    <div className="esr-progress">
                        <div className="esr-progress-fill" />
                    </div>
                </div>
            </div>

            {/* ── Horizontal scroll track ── */}
            <div className="esr-viewport">
                <div className="esr-track" ref={trackRef}>

                    {EVENTS.map((ev, i) => (
                        <div
                            className="esr-panel"
                            key={i}
                            data-bg={ev.bg}
                            style={{ '--accent': ev.accent }}
                        >
                            <div className="esr-panel-giant hand">{ev.number}</div>

                            <div className="esr-panel-img-wrap">
                                <img className="esr-panel-img" src={ev.image} alt={ev.name} loading="lazy" draggable={false} />
                                <div className="esr-panel-img-overlay" />
                                <div className="esr-panel-stripe" />
                            </div>

                            <div className="esr-panel-body">
                                <span className="esr-panel-num">{ev.number}</span>
                                <div className="esr-panel-meta">
                                    <span className="esr-panel-tag">{ev.tag}</span>
                                    <h3 className="esr-panel-name hand">{ev.name}</h3>
                                    <p className="esr-panel-desc">{ev.desc}</p>
                                    <div className="esr-panel-details">
                                        <div className="esr-panel-detail-item">
                                            <span className="esr-detail-label">Date</span>
                                            <span className="esr-detail-value">{ev.date}</span>
                                        </div>
                                        <div className="esr-panel-detail-item">
                                            <span className="esr-detail-label">Audience</span>
                                            <span className="esr-detail-value">{ev.stat}</span>
                                        </div>
                                    </div>
                                    <a href="#contact" className="esr-panel-cta">
                                        <span>Next edition</span>
                                        <span className="esr-cta-arrow">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Outro panel */}
                    <div className="esr-outro">
                        <div className="esr-outro-inner">
                            <span className="esr-outro-star diko-star diko-star--slow" aria-hidden="true">✦</span>
                            <span className="esr-outro-label hand">That's a wrap</span>
                            <p className="esr-outro-sub">More events coming 2026 →</p>
                            <a href="#contact" className="esr-outro-btn">Stay in the loop</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll hint */}
            <div className="esr-scroll-hint" aria-hidden="true">
                <span>scroll</span>
                <div className="esr-scroll-arrow">↓</div>
            </div>
        </section>
    )
}
