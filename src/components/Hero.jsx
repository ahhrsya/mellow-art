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

/*
  Stack offsets: each card behind the active one is slightly
  offset, rotated, and scaled down to give depth.
  Index 0 = top card, index N-1 = bottom card.
*/
const STACK_POSITIONS = [
    { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 6 }, // active / top
    { x: 12, y: 8, rotation: 4, scale: 0.96, zIndex: 5 },
    { x: -10, y: 16, rotation: -5, scale: 0.92, zIndex: 4 },
    { x: 18, y: 24, rotation: 6, scale: 0.88, zIndex: 3 },
    { x: -14, y: 32, rotation: -8, scale: 0.84, zIndex: 2 },
    { x: 10, y: 40, rotation: 3, scale: 0.80, zIndex: 1 },
]

export default function Hero() {
    const heroRef = useRef(null)
    const collageRef = useRef(null)
    const canvasWrapRef = useRef(null)
    // Smoothed mouse pos for lerp
    const mouseRawRef = useRef({ x: 0, y: 0 })
    const mouseSmRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)
    const cardOrderRef = useRef([...Array(artImages.length).keys()]) // [0,1,2,3,4,5]
    const isAnimating = useRef(false)

    /* ── raw mouse position ── */
    const handleMouseMove = useCallback((e) => {
        mouseRawRef.current = {
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
        }
    }, [])

    /* ── card-deck advance: move top card to bottom with a cinematic arc ── */
    const advanceStack = useCallback(() => {
        if (isAnimating.current) return
        const cards = gsap.utils.toArray('.collage-card')
        if (!cards.length) return

        isAnimating.current = true
        const order = cardOrderRef.current
        const topCardIndex = order[0] // DOM index of the currently active card
        const topCard = cards[topCardIndex]

        // 1. Fly the top card away (arc up-and-out to the right)
        gsap.to(topCard, {
            x: 280,
            y: -80,
            rotation: 25,
            scale: 0.7,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.in',
            onComplete: () => {
                // 2. Instantly move it behind all others (z-index to bottom)
                gsap.set(topCard, { zIndex: 0 })

                // Rotate the order array: first item goes to end
                const newOrder = [...order.slice(1), order[0]]
                cardOrderRef.current = newOrder

                // 3. Re-assign each card to its new stack position with a stagger
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
                        duration: 0.6,
                        ease: 'power3.out',
                        delay: stackPos * 0.03,
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

            /* ===== INTRO TIMELINE ===== */
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            // Canvas breathes in from slight scale
            tl.from('.art-canvas-wrap', { scale: 1.08, opacity: 0, duration: 2.0, ease: 'power2.out' }, 0)
                .from(hero, { opacity: 0, duration: 0.6 }, 0)
                .from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.6 }, '-=0.8')
                .from('.hero-word', {
                    y: 100,
                    rotateX: -35,
                    opacity: 0,
                    duration: 0.9,
                    stagger: 0.1,
                }, '-=0.4')
                .from('.hero-outline', {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.65)',
                }, '-=0.6')
                .from('.hero-sub', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
                .from('.hero-cta-btn', {
                    scale: 0,
                    opacity: 0,
                    duration: 0.45,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                }, '-=0.3')
                .from('.hero-scroll', { opacity: 0, y: 16, duration: 0.5 }, '-=0.2')

            /* ===== STACKED CARD DECK — INITIAL SETUP ===== */
            const cards = gsap.utils.toArray('.collage-card')

            // Set each card's initial stacked position
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

            // Stagger the cards into view as part of the intro
            gsap.to(cards, {
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                delay: 0.7,
                ease: 'power2.out',
            })

            /* ===== SUBTLE IDLE FLOAT on top card only ===== */
            gsap.to('.collage-card-0', {
                y: '+=8',
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })

            /* ===== DECORATIVE FLOATING SHAPES ===== */
            gsap.utils.toArray('.hero-deco').forEach((el, i) => {
                gsap.to(el, {
                    y: gsap.utils.random(-30, 30),
                    x: gsap.utils.random(-20, 20),
                    rotation: gsap.utils.random(-18, 18),
                    duration: gsap.utils.random(5, 9),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.8,
                })
            })

            /* ===== CANVAS PARALLAX — slowly drifts opposite user scroll ===== */
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
                    gsap.set('.hero-title-wrap', { y: p * 30 })
                    gsap.set('.collage-wrap', { y: p * -15 })
                },
            })

            /* ===== CANVAS OPACITY on scroll — fades for readability ===== */
            ScrollTrigger.create({
                trigger: hero,
                start: 'top top',
                end: '50% top',
                scrub: 0.8,
                onUpdate: (self) => {
                    gsap.set('.art-canvas-wrap', { opacity: 1 - self.progress * 0.3 })
                },
            })

            /* ===== SMOOTH MOUSE PARALLAX LOOP =====
               Strategy:
               - Lerp the smoothed position toward raw on every rAF tick (lazy follow).
               - Call gsap.set() (NOT gsap.to()) once the lerped value is stable.
               - This completely removes the "fighting tweens" problem.
            */
            const parallaxLayers = [
                { sel: '.hero-title-wrap', sx: 12, sy: 8 },
                { sel: '.collage-wrap', sx: -18, sy: -12 },
                { sel: '.hero-deco-1', sx: 22, sy: 14 },
                { sel: '.hero-deco-2', sx: -14, sy: -10 },
                { sel: '.hero-deco-3', sx: 28, sy: 18 },
                { sel: '.hero-deco-4', sx: -20, sy: -15 },
                { sel: '.hero-deco-5', sx: 10, sy: 8 },
                // Canvas drifts subtly opposite — creates depth
                { sel: '.art-canvas-wrap', sx: -6, sy: -4 },
            ]

            const LERP = 0.06 // smoothing factor — lower = lazier

            const tick = () => {
                const raw = mouseRawRef.current
                const sm = mouseSmRef.current

                // Lerp smoothed toward raw
                sm.x += (raw.x - sm.x) * LERP
                sm.y += (raw.y - sm.y) * LERP

                // Apply to each layer — gsap.set is instant, no tween conflict
                parallaxLayers.forEach(({ sel, sx, sy }) => {
                    gsap.set(sel, {
                        x: sm.x * sx,
                        y: sm.y * sy,
                    })
                })

                rafRef.current = requestAnimationFrame(tick)
            }
            rafRef.current = requestAnimationFrame(tick)

        }, hero)

        /* ===== AUTO-ROTATE STACK every 2.5 seconds ===== */
        const intervalId = setInterval(advanceStack, 2500)

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
                {/* Thin chromatic noise grain overlay */}
                <div className="art-canvas-grain" />
                {/* Soft darkening gradient over canvas for text readability */}
                <div className="art-canvas-overlay" />
            </div>

            {/* ── decorative floating shapes ── */}
            <div className="hero-deco hero-deco-1">
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="55" fill="var(--color-accent)" opacity="0.3" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-2">
                <svg width="180" height="180" viewBox="0 0 180 180">
                    <path d="M90 10 C140 30, 170 80, 140 140 C110 170, 50 170, 30 130 C10 90, 40 20, 90 10Z"
                        fill="var(--color-lime)" opacity="0.18" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-3">
                <svg width="90" height="90" viewBox="0 0 90 90">
                    <rect x="10" y="10" width="70" height="70" rx="18"
                        fill="none" stroke="var(--color-electric)" strokeWidth="3" opacity="0.45"
                        transform="rotate(15 45 45)" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-4">
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <polygon points="30,5 55,50 5,50" fill="var(--color-cream)" opacity="0.12" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-5">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-accent)"
                        strokeWidth="2" strokeDasharray="12 8" opacity="0.28" />
                </svg>
            </div>
            <div className="hero-deco hero-deco-6">
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="var(--color-electric)" opacity="0.35" />
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
                    <p className="hero-eyebrow">✦ Melbourne's Creative Art Market</p>

                    <h1 className="hero-title" aria-label="Mellow Art Market">
                        <span className="hero-word hero-word-1">MEL</span>
                        <span className="hero-word hero-word-2">LOW</span>
                        <br />
                        <span className="hero-outline">ART</span>
                        <br />
                        <span className="hero-word hero-word-3">MAR</span>
                        <span className="hero-word hero-word-4 hero-word-accent">KET</span>
                    </h1>

                    <p className="hero-sub">
                        Where creativity comes alive — discover extraordinary art,
                        connect with local makers, and experience Melbourne's most vibrant
                        creative community.
                    </p>

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

            {/* scroll indicator removed per design requirement */}
        </section>
    )
}
