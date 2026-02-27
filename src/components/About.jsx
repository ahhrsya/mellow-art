import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading words slam in from left with stagger
            gsap.from('.about-heading .word', {
                scrollTrigger: { trigger: '.about', start: 'top 75%' },
                x: -80,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'expo.out',
            })

            // About text fades up
            gsap.from('.about-text', {
                scrollTrigger: { trigger: '.about', start: 'top 70%' },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3,
            })

            // Stats count UP with big energetic bounce
            gsap.from('.stat-item', {
                scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
                y: 60,
                opacity: 0,
                scale: 0.6,
                duration: 0.7,
                stagger: 0.12,
                ease: 'back.out(2)',
                delay: 0.4,
            })

            // Decorative blob floats
            gsap.to('.about-blob', {
                y: 'random(-30, 30)',
                x: 'random(-20, 20)',
                rotation: 'random(-15, 15)',
                duration: 'random(4, 7)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 0.5,
            })

            // Spinning asterisk
            gsap.to('.about-spin', {
                rotation: 360,
                duration: 6,
                repeat: -1,
                ease: 'none',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="about section-padding" id="about" ref={sectionRef}>
            {/* Bold decorative blobs */}
            <div className="about-blob about-blob-1" />
            <div className="about-blob about-blob-2" />
            <div className="about-blob about-blob-3" />

            {/* Spinning asterisks */}
            <span className="about-spin about-spin-1">✦</span>
            <span className="about-spin about-spin-2">★</span>

            <div className="container">
                <div className="about-inner">
                    <div className="about-left">
                        <h2 className="about-heading">
                            <span className="word">We Bring</span>{' '}
                            <br />
                            <span className="word highlight hand">Creative</span>{' '}
                            <br />
                            <span className="word highlight hand">Energy</span>
                            <br />
                            <span className="word">To Life</span>
                        </h2>

                        {/* Brush stroke underline decoration */}
                        <svg className="about-brush" viewBox="0 0 280 18" preserveAspectRatio="none">
                            <path d="M2 14 C40 6, 100 16, 160 10 C220 4, 260 14, 278 12"
                                stroke="var(--color-hot-pink)" strokeWidth="6" fill="none"
                                strokeLinecap="round" opacity="0.9" />
                        </svg>
                    </div>

                    <div className="about-right">
                        <p className="about-text">
                            Mellow Art is Melbourne's most vibrant creative community — a
                            dynamic, event-based brand that celebrates local makers, artists,
                            and the power of creative expression. From curated art markets to
                            immersive workshops, we create spaces where art and community
                            thrive together.
                        </p>
                        <p className="about-text">
                            Our events shift and evolve, embracing new colours, themes, and
                            creative energy with every season. Because art should never feel
                            static.
                        </p>
                        <div className="about-stats">
                            <div className="stat-item">
                                <div className="stat-number hand">50+</div>
                                <div className="stat-label">Events</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number hand">200+</div>
                                <div className="stat-label">Artists</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number hand">15K</div>
                                <div className="stat-label">Visitors</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
