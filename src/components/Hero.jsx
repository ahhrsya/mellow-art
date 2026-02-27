import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArtCanvas from './ArtCanvas'

gsap.registerPlugin(ScrollTrigger)

/* ── art images for the stacked card deck ── */
const artImages = [
    { src: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=480&h=600&fit=crop', alt: 'Abstract painting' },
    { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=480&h=600&fit=crop', alt: 'Gallery art' },
    { src: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=480&h=600&fit=crop', alt: 'Modern sculpture' },
    { src: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=480&h=600&fit=crop', alt: 'Ceramic art' },
    { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&h=600&fit=crop', alt: 'Street art' },
    { src: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=480&h=600&fit=crop', alt: 'Colorful artwork' },
]

const STACK_POSITIONS = [
    { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 6 },
    { x: 14, y: 10, rotation: 5, scale: 0.96, zIndex: 5 },
    { x: -12, y: 18, rotation: -6, scale: 0.92, zIndex: 4 },
    { x: 20, y: 28, rotation: 8, scale: 0.88, zIndex: 3 },
    { x: -16, y: 36, rotation: -10, scale: 0.84, zIndex: 2 },
    { x: 12, y: 44, rotation: 4, scale: 0.80, zIndex: 1 },
]

export default function Hero() {
    const heroRef = useRef(null)
    const collageRef = useRef(null)
    const canvasWrapRef = useRef(null)
    const mouseRawRef = useRef({ x: 0, y: 0 })
    const mouseSmRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)
    const cardOrderRef = useRef([...Array(artImages.length).keys()])
    const isAnimating = useRef(false)

    const handleMouseMove = useCallback((e) => {
        mouseRawRef.current = {
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
        }
    }, [])

    const advanceStack = useCallback(() => {
        if (isAnimating.current) return
        const cards = gsap.utils.toArray('.collage-card')
        if (!cards.length) return

        isAnimating.current = true
        const order = cardOrderRef.current
        const topCardIndex = order[0]
        const topCard = cards[topCardIndex]

        // Fly the top card out with a big energetic arc
        gsap.to(topCard, {
            x: 320,
            y: -100,
            rotation: 30,
            scale: 0.6,
            opacity: 0,
            duration: 0.5,
            ease: 'back.in(1.2)',
            onComplete: () => {
                gsap.set(topCard, { zIndex: 0 })
                const newOrder = [...order.slice(1), order[0]]
                cardOrderRef.current = newOrder
                cards.forEach((card, domIdx) => {
                    const stackPos = newOrder.indexOf(domIdx)
                    const pos = STACK_POSITIONS[stackPos]
                    gsap.set(card, { zIndex: pos.zIndex })
                    gsap.to(card, {
                        x: pos.x,
                        y: pos.y,
                        rotation: pos.rotation,
                        scale: pos.scale,
                        opacity: 1,
                        duration: 0.65,
                        ease: 'elastic.out(1, 0.7)',
                        delay: stackPos * 0.04,
                    })
                })
                isAnimating.current = false
            },
        })
    }, [])

    useEffect(() => {
        const hero = heroRef.current
        if (!hero) return

        const ctx = gsap.context(() => {

            /* ===== INTRO TIMELINE — big, bold, punchy ===== */
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            // Background breathes in
            tl.from('.art-canvas-wrap', { scale: 1.08, opacity: 0, duration: 2.0, ease: 'power2.out' }, 0)
                .from(hero, { opacity: 0, duration: 0.4 }, 0)
                // Eyebrow bounces in from top
                .from('.hero-eyebrow', { y: -30, opacity: 0, rotation: -4, duration: 0.7, ease: 'elastic.out(1, 0.6)' }, 0.3)
                // Each word dramatically slams into place
                .from('.hero-word', {
                    y: 140,
                    rotateX: -45,
                    opacity: 0,
                    duration: 1.0,
                    stagger: { amount: 0.4, ease: 'power2.out' },
                    ease: 'expo.out',
                }, 0.5)
                // Outline word pops in overshooting
                .from('.hero-outline', {
                    scale: 0.4,
                    opacity: 0,
                    skewX: -10,
                    duration: 0.9,
                    ease: 'elastic.out(1, 0.55)',
                }, 0.8)
                .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, 1.1)
                .from('.hero-cta-btn', {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: 'back.out(2)',
                }, 1.3)
                // Status tags pop in
                .from('.hero-tag', {
                    scale: 0,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'back.out(2.5)',
                }, 1.5)

            /* ===== STAR / ASTERISK SPINS ===== */
            gsap.to('.hero-star', {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: 'none',
            })

            gsap.to('.hero-star-slow', {
                rotation: -360,
                duration: 14,
                repeat: -1,
                ease: 'none',
            })

            /* ===== STACKED CARD DECK INIT ===== */
            const cards = gsap.utils.toArray('.collage-card')
            cards.forEach((card, i) => {
                const pos = STACK_POSITIONS[i] || STACK_POSITIONS[STACK_POSITIONS.length - 1]
                gsap.set(card, {
                    x: pos.x,
                    y: pos.y,
                    rotation: pos.rotation,
                    scale: pos.scale,
                    zIndex: pos.zIndex,
                    opacity: 0,
                })
            })

            // Stagger cards into view
            gsap.to(cards, {
                opacity: 1,
                duration: 0.6,
                stagger: 0.09,
                delay: 0.9,
                ease: 'back.out(1.5)',
            })

            /* ===== IDLE FLOAT on top card ===== */
            gsap.to('.collage-card-0', {
                y: '+=10',
                rotation: '+=3',
                duration: 3.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })

            /* ===== DECORATIVE SHAPES FLOAT ===== */
            gsap.utils.toArray('.hero-deco').forEach((el, i) => {
                gsap.to(el, {
                    y: gsap.utils.random(-35, 35),
                    x: gsap.utils.random(-22, 22),
                    rotation: gsap.utils.random(-22, 22),
                    duration: gsap.utils.random(4, 8),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.7,
                })
            })

            /* ===== CANVAS PARALLAX ===== */
            gsap.to('.art-canvas-wrap', {
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
                y: 120,
                scale: 1.12,
                ease: 'none',
            })

            /* ===== CONTENT SCROLL PARALLAX ===== */
            ScrollTrigger.create({
                trigger: hero,
                start: 'top top',
                end: '60% top',
                scrub: 1,
                onUpdate: (self) => {
                    const p = self.progress
                    gsap.set('.hero-title-wrap', { y: p * 35 })
                    gsap.set('.collage-wrap', { y: p * -18 })
                },
            })

            /* ===== CANVAS FADE on scroll ===== */
            ScrollTrigger.create({
                trigger: hero,
                start: 'top top',
                end: '50% top',
                scrub: 0.8,
                onUpdate: (self) => {
                    gsap.set('.art-canvas-wrap', { opacity: 1 - self.progress * 0.35 })
                },
            })

            /* ===== SMOOTH MOUSE PARALLAX ===== */
            const parallaxLayers = [
                { sel: '.hero-title-wrap', sx: 10, sy: 6 },
                { sel: '.collage-wrap', sx: -16, sy: -10 },
                { sel: '.hero-deco-1', sx: 28, sy: 18 },
                { sel: '.hero-deco-2', sx: -18, sy: -12 },
                { sel: '.hero-deco-3', sx: 32, sy: 22 },
                { sel: '.hero-deco-4', sx: -24, sy: -18 },
                { sel: '.hero-deco-5', sx: 14, sy: 10 },
                { sel: '.art-canvas-wrap', sx: -5, sy: -3 },
            ]

            const LERP = 0.05
            const tick = () => {
                const raw = mouseRawRef.current
                const sm = mouseSmRef.current
                sm.x += (raw.x - sm.x) * LERP
                sm.y += (raw.y - sm.y) * LERP
                parallaxLayers.forEach(({ sel, sx, sy }) => {
                    gsap.set(sel, { x: sm.x * sx, y: sm.y * sy })
                })
                rafRef.current = requestAnimationFrame(tick)
            }
            rafRef.current = requestAnimationFrame(tick)

        }, hero)

        const intervalId = setInterval(advanceStack, 2600)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            ctx.revert()
            window.removeEventListener('mousemove', handleMouseMove)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            clearInterval(intervalId)
        }
    }, [handleMouseMove, advanceStack])

    return (
        <section className="hero" ref={heroRef}>
            {/* ── GENERATIVE ART CANVAS BACKGROUND ── */}
            <div className="art-canvas-wrap" ref={canvasWrapRef} aria-hidden="true">
                <ArtCanvas />
                <div className="art-canvas-grain" />
                <div className="art-canvas-overlay" />
            </div>

            {/* ── decorative floating shapes ── */}
            <div className="hero-deco hero-deco-1" aria-hidden="true">
                <svg width="110" height="110" viewBox="0 0 110 110">
                    <path d="M55 5 L58 45 L98 42 L65 65 L80 105 L55 80 L30 105 L45 65 L12 42 L52 45 Z"
                        fill="var(--color-yellow)" opacity="0.85" />
                </svg>
                {/* Spinning star label */}
                <div className="hero-star">✦</div>
            </div>
            <div className="hero-deco hero-deco-2" aria-hidden="true">
                <svg width="160" height="160" viewBox="0 0 160 160">
                    <path d="M80 15 C120 30, 148 68, 135 108 C122 148, 78 158, 45 138 C12 118, 8 72, 28 42 C48 12, 80 15, 80 15Z"
                        fill="var(--color-hot-pink)" opacity="0.55" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-3" aria-hidden="true">
                <svg width="85" height="85" viewBox="0 0 85 85">
                    <rect x="8" y="8" width="69" height="69" rx="16"
                        fill="none" stroke="var(--color-lime)" strokeWidth="5" opacity="0.9"
                        strokeDasharray="10 5"
                        transform="rotate(12 42 42)" />
                </svg>
                <div className="hero-star-slow" style={{ color: 'var(--color-lime)', fontSize: '1.6rem' }}>★</div>
            </div>
            <div className="hero-deco hero-deco-4" aria-hidden="true">
                <svg width="55" height="55" viewBox="0 0 55 55">
                    <circle cx="27" cy="27" r="24" fill="var(--color-electric)" opacity="0.7" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-5" aria-hidden="true">
                <svg width="130" height="130" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r="58" fill="none" stroke="var(--color-accent)"
                        strokeWidth="4" strokeDasharray="14 7" opacity="0.55" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-6" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 44 44">
                    <path d="M22 2 L26 16 L40 16 L29 26 L33 40 L22 30 L11 40 L15 26 L4 16 L18 16 Z"
                        fill="var(--color-violet)" opacity="0.7" />
                </svg>
            </div>

            {/* ── main content ── */}
            <div className="hero-content">
                {/* stacked card deck — LEFT */}
                <div className="collage-wrap" ref={collageRef}>
                    <div className="collage-deck">
                        {artImages.map((img, i) => (
                            <div
                                className={`collage-card collage-card-${i}`}
                                key={i}
                                onClick={advanceStack}
                            >
                                <img src={img.src} alt={img.alt} loading="eager" draggable={false} />
                                <div className="collage-card-overlay" />
                                <div className="collage-card-shine" />
                            </div>
                        ))}
                    </div>

                    {/* card counter dots */}
                    <div className="card-dots">
                        {artImages.map((_, i) => (
                            <span key={i} className={`card-dot card-dot-${i}`} />
                        ))}
                    </div>
                </div>

                {/* typography block — RIGHT */}
                <div className="hero-title-wrap">
                    <p className="hero-eyebrow">
                        <span>✦</span> Melbourne's Creative Art Market <span>✦</span>
                    </p>

                    <h1 className="hero-title" aria-label="Mellow Art Market">
                        <span className="hero-word hero-word-1">MEL</span>
                        <span className="hero-word hero-word-2">LOW</span>
                        <br />
                        <span className="hero-outline hand">ART</span>
                        <br />
                        <span className="hero-word hero-word-3">MAR</span>
                        <span className="hero-word hero-word-4 hero-word-accent">KET</span>
                    </h1>

                    <p className="hero-sub">
                        Where creativity comes alive — discover extraordinary art,
                        connect with local makers, and experience Melbourne's most vibrant
                        creative community.
                    </p>

                    {/* energetic status tags — DIKO-style */}
                    <div className="hero-tags">
                        <span className="hero-tag hero-tag-pink">🎨 Art Market</span>
                        <span className="hero-tag hero-tag-yellow">⚡ Live Music</span>
                        <span className="hero-tag hero-tag-lime">✦ Workshops</span>
                    </div>

                    <div className="hero-cta-wrap">
                        <a href="#events" className="hero-cta-btn hero-cta-primary">
                            <span>Explore Events</span>
                            <span className="cta-arrow">→</span>
                        </a>
                        <a href="#artists" className="hero-cta-btn hero-cta-secondary">
                            <span>Meet Artists</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
