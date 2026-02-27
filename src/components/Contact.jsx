import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Floating decoration shapes rendered as SVG blobs */
const BLOBS = [
    { cx: '15%', cy: '20%', r: 80, color: '#FF2D78', blur: 60, delay: 0 },
    { cx: '85%', cy: '70%', r: 100, color: '#7B2FBE', blur: 80, delay: 1.2 },
    { cx: '70%', cy: '15%', r: 60, color: '#3ECFE0', blur: 50, delay: 0.6 },
    { cx: '30%', cy: '80%', r: 55, color: '#C8FF2E', blur: 40, delay: 1.8 },
]

export default function Contact() {
    const sectionRef = useRef(null)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Heading slams in with skew ── */
            gsap.fromTo('.c2-heading-word',
                { y: 80, opacity: 0, skewY: 5 },
                {
                    scrollTrigger: { trigger: '.contact', start: 'top 78%' },
                    y: 0, opacity: 1, skewY: 0,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: 'expo.out',
                }
            )

            /* ── Sub-text & form slide up ── */
            gsap.fromTo('.c2-body',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.contact', start: 'top 72%' },
                    y: 0, opacity: 1,
                    duration: 0.7,
                    delay: 0.3,
                    ease: 'power3.out',
                }
            )

            /* ── Rotating star spins in ── */
            gsap.fromTo('.c2-star',
                { scale: 0, rotation: -120, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.contact', start: 'top 80%' },
                    scale: 1, rotation: 0, opacity: 1,
                    duration: 1,
                    ease: 'back.out(1.7)',
                }
            )

            /* ── Blobs float continuously ── */
            gsap.utils.toArray('.c2-blob').forEach((blob, i) => {
                gsap.to(blob, {
                    y: 'random(-30, 30)',
                    x: 'random(-20, 20)',
                    rotation: 'random(-12, 12)',
                    duration: 'random(4, 7)',
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.5,
                })
            })

            /* ── "MELLOW" big text sweeps from left ── */
            gsap.fromTo('.c2-big-word',
                { x: '-8%', opacity: 0 },
                {
                    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
                    x: '0%', opacity: 0.07,
                    duration: 1.2,
                    ease: 'expo.out',
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        setSubmitted(true)
        gsap.fromTo('.c2-success',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        )
        setEmail('')
    }

    return (
        <section
            className="contact section-padding"
            id="contact"
            ref={sectionRef}
        >
            {/* ── Decorative blobs ── */}
            {BLOBS.map((b, i) => (
                <div
                    key={i}
                    className="c2-blob"
                    style={{
                        position: 'absolute',
                        left: b.cx,
                        top: b.cy,
                        width: b.r * 2,
                        height: b.r * 2,
                        background: b.color,
                        borderRadius: '50%',
                        filter: `blur(${b.blur}px)`,
                        opacity: 0.18,
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Giant "MELLOW" watermark */}
            <span className="c2-big-word hand" aria-hidden="true">MELLOW</span>

            <div className="container">
                <div className="contact-inner">

                    {/* ── Left: heading + form ── */}
                    <div className="contact-left">

                        {/* Spinning star accent */}
                        <span className="c2-star diko-star diko-star--pink" aria-hidden="true">✦</span>

                        <h2 className="c2-heading">
                            <span className="c2-heading-word">Stay</span>
                            <span className="c2-heading-word c2-heading-word--outline">In</span>
                            <span className="c2-heading-word">the Loop</span>
                        </h2>

                        <div className="c2-body">
                            <p className="contact-text">
                                Be first to hear about upcoming events, featured artists,
                                and exclusive community news. No spam — just good art.
                            </p>

                            {submitted ? (
                                <div className="c2-success">
                                    <span className="diko-star">✦</span>
                                    You're in! Check your inbox.
                                    <span className="diko-star diko-star--pink diko-star--ccw">✦</span>
                                </div>
                            ) : (
                                <form className="newsletter-form" onSubmit={handleSubmit}>
                                    <input
                                        className="newsletter-input"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <button className="newsletter-btn" type="submit">
                                        Subscribe →
                                    </button>
                                </form>
                            )}

                            {/* Social row */}
                            <div className="c2-socials">
                                {['Instagram', 'Facebook', 'TikTok'].map(s => (
                                    <a key={s} href="#" className="c2-social-tag">
                                        {s} ↗
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: decorative visual ── */}
                    <div className="contact-visual">
                        <div className="c2-visual-card">
                            <span className="c2-visual-eyebrow bold-display">Next market</span>
                            <span className="c2-visual-date hand">March 2026</span>
                            <span className="c2-visual-location">Federation Square, Melbourne</span>
                            <a href="#events" className="c2-visual-btn">
                                Save the Date ✦
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
