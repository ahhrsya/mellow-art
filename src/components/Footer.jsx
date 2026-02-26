import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
    const footerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.footer-big-text', {
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 90%',
                    end: 'bottom bottom',
                    scrub: 1,
                },
                y: 100,
                opacity: 0,
            })

            gsap.from('.footer-content > *', {
                scrollTrigger: {
                    trigger: '.footer-content',
                    start: 'top 90%',
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
            })
        }, footerRef)

        return () => ctx.revert()
    }, [])

    return (
        <footer className="footer" ref={footerRef}>
            <div className="container">
                <div className="footer-big-text">MELLOW ART</div>

                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            MELLOW<span style={{ color: 'var(--color-accent)' }}>.</span>
                        </div>
                        <p>
                            Melbourne's most vibrant creative community. Where art, makers,
                            and connection come alive.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>Navigate</h4>
                        <a href="#about">About</a>
                        <a href="#events">Events</a>
                        <a href="#artists">Artists</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer-column">
                        <h4>Community</h4>
                        <a href="#">Become a Maker</a>
                        <a href="#">Volunteer</a>
                        <a href="#">Sponsor</a>
                        <a href="#">FAQ</a>
                    </div>

                    <div className="footer-column">
                        <h4>Connect</h4>
                        <a href="#">hello@mellowart.com.au</a>
                        <a href="#">Melbourne, VIC</a>
                        <a href="#">Press Kit</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Mellow Art. All rights reserved.</span>
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
