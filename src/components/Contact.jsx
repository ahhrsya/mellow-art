import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const sectionRef = useRef(null)
    const [email, setEmail] = useState('')

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact h2', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 75%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.contact-text', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 75%',
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
            })

            gsap.from('.newsletter-form', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 75%',
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.4,
                ease: 'power3.out',
            })

            // Floating contact shapes
            gsap.to('.contact-shape', {
                y: 'random(-20, 20)',
                x: 'random(-15, 15)',
                rotation: 'random(-10, 10)',
                duration: 'random(3, 6)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.5,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            setEmail('')
            // Could add a toast notification here
        }
    }

    return (
        <section className="contact section-padding" id="contact" ref={sectionRef}>
            <div className="container">
                <div className="contact-inner">
                    <div className="contact-left">
                        <h2>
                            Stay In <br />
                            The Loop
                        </h2>
                        <p className="contact-text">
                            Be the first to know about upcoming events, featured artists, and
                            exclusive community updates. Join our newsletter for a dose of
                            creative inspiration.
                        </p>
                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <input
                                className="newsletter-input"
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="newsletter-btn" type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="contact-visual">
                        <div className="contact-shapes">
                            <div className="contact-shape" />
                            <div className="contact-shape" />
                            <div className="contact-shape" />
                        </div>
                        <span className="contact-big-text">MELLOW</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
