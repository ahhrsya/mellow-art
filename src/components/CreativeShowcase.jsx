import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── data ─── */
const DISCIPLINES = [
    { label: 'Painting', count: '48 makers', icon: '🎨', color: '#FF6B4A' },
    { label: 'Ceramics', count: '31 makers', icon: '🏺', color: '#3ECFE0' },
    { label: 'Sculpture', count: '22 makers', icon: '🗿', color: '#C8FF2E' },
    { label: 'Photography', count: '19 makers', icon: '📸', color: '#FF6B4A' },
    { label: 'Textiles', count: '27 makers', icon: '🧵', color: '#3ECFE0' },
    { label: 'Printmaking', count: '14 makers', icon: '🖨', color: '#C8FF2E' },
    { label: 'Jewellery', count: '35 makers', icon: '💍', color: '#FF6B4A' },
    { label: 'Digital Art', count: '11 makers', icon: '💻', color: '#3ECFE0' },
]

const STATS = [
    { num: '200+', label: 'Makers' },
    { num: '50+', label: 'Events Yearly' },
    { num: '15K', label: 'Visitors / Market' },
    { num: '8', label: 'Disciplines' },
]

export default function CreativeShowcase() {
    const sectionRef = useRef(null)
    const cursorRef = useRef(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        /* ── cursor follower ── */
        const cursor = cursorRef.current
        const moveCursor = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }
        section.addEventListener('mousemove', moveCursor)

        const trackCursor = () => {
            if (cursor) {
                gsap.set(cursor, {
                    x: mousePos.current.x,
                    y: mousePos.current.y,
                })
            }
            rafRef.current = requestAnimationFrame(trackCursor)
        }
        rafRef.current = requestAnimationFrame(trackCursor)

        const ctx = gsap.context(() => {
            /* ── Section entrance ── */
            gsap.from('.cs-headline-word', {
                scrollTrigger: { trigger: '.cs-header', start: 'top 82%' },
                y: 80,
                opacity: 0,
                rotateX: -30,
                duration: 0.9,
                stagger: 0.1,
                ease: 'power3.out',
            })

            gsap.from('.cs-header-sub', {
                scrollTrigger: { trigger: '.cs-header', start: 'top 80%' },
                y: 30,
                opacity: 0,
                duration: 0.7,
                delay: 0.4,
                ease: 'power3.out',
            })

            /* ── Stats count-up ── */
            gsap.from('.cs-stat', {
                scrollTrigger: { trigger: '.cs-stats', start: 'top 85%' },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
            })

            /* ── Discipline tiles stagger in ── */
            gsap.from('.cs-tile', {
                scrollTrigger: { trigger: '.cs-tiles', start: 'top 80%' },
                y: 60,
                opacity: 0,
                scale: 0.88,
                duration: 0.55,
                stagger: { amount: 0.5, from: 'start' },
                ease: 'power3.out',
            })

            /* ── Parallax on the bg blobs ── */
            gsap.to('.cs-blob-1', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
                y: -120,
                x: 40,
            })

            gsap.to('.cs-blob-2', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
                y: 80,
                x: -60,
            })

        }, sectionRef)

        /* ── Tile hover magnetic effect ── */
        const tiles = section.querySelectorAll('.cs-tile')
        const cleanups = []

        tiles.forEach((tile) => {
            const onEnter = () => {
                gsap.to(tile, { scale: 1.04, duration: 0.35, ease: 'power2.out' })
                if (cursor) {
                    const accent = tile.dataset.color
                    gsap.to(cursor, {
                        scale: 3,
                        background: accent,
                        opacity: 0.6,
                        duration: 0.3,
                    })
                }
            }
            const onLeave = () => {
                gsap.to(tile, { scale: 1, duration: 0.4, ease: 'power2.out' })
                if (cursor) {
                    gsap.to(cursor, {
                        scale: 1,
                        background: '#FF6B4A',
                        opacity: 0.35,
                        duration: 0.3,
                    })
                }
            }
            tile.addEventListener('mouseenter', onEnter)
            tile.addEventListener('mouseleave', onLeave)
            cleanups.push(() => {
                tile.removeEventListener('mouseenter', onEnter)
                tile.removeEventListener('mouseleave', onLeave)
            })
        })

        return () => {
            ctx.revert()
            section.removeEventListener('mousemove', moveCursor)
            cancelAnimationFrame(rafRef.current)
            cleanups.forEach(fn => fn())
        }
    }, [])

    return (
        <section className="creative-showcase" ref={sectionRef}>
            {/* custom cursor */}
            <div className="cs-cursor" ref={cursorRef} aria-hidden="true" />

            {/* background blobs */}
            <div className="cs-blob cs-blob-1" aria-hidden="true" />
            <div className="cs-blob cs-blob-2" aria-hidden="true" />

            <div className="container">

                {/* ── Header ── */}
                <div className="cs-header">
                    <div className="cs-headline">
                        <span className="cs-headline-word">Explore</span>
                        <span className="cs-headline-word cs-headline-outline">Every</span>
                        <span className="cs-headline-word">Medium</span>
                    </div>
                    <p className="cs-header-sub">
                        From intricate ceramics to bold digital prints — every discipline
                        has a home at Mellow Art Market.
                    </p>
                </div>

                {/* ── Stats row ── */}
                <div className="cs-stats">
                    {STATS.map((s) => (
                        <div className="cs-stat" key={s.label}>
                            <span className="cs-stat-num">{s.num}</span>
                            <span className="cs-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Interactive tiles ── */}
                <div className="cs-tiles">
                    {DISCIPLINES.map((d, i) => (
                        <div
                            className="cs-tile"
                            key={d.label}
                            data-color={d.color}
                            style={{ '--tile-color': d.color }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Explore ${d.label}`}
                        >
                            <span className="cs-tile-icon">{d.icon}</span>
                            <span className="cs-tile-label">{d.label}</span>
                            <span className="cs-tile-count">{d.count}</span>
                            <span className="cs-tile-arrow">→</span>
                            {/* animated colour fill on hover */}
                            <span className="cs-tile-fill" aria-hidden="true" />
                        </div>
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="cs-cta-row">
                    <a href="#directory" className="cs-cta-btn">
                        Browse All Makers
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <p className="cs-cta-sub">Updated every market season · Free to explore</p>
                </div>

            </div>
        </section>
    )
}
