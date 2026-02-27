import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Painter', 'Ceramicist', 'Sculptor', 'Photographer', 'Textile', 'Printmaker']

const ARTISTS = [
    {
        name: 'Mia Chen',
        discipline: 'Painter',
        accent: '#FF2D78',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Liam Torres',
        discipline: 'Ceramicist',
        accent: '#FFDD00',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Yuki Tanaka',
        discipline: 'Sculptor',
        accent: '#3ECFE0',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Zara Ahmed',
        discipline: 'Photographer',
        accent: '#C8FF2E',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Felix Rivera',
        discipline: 'Printmaker',
        accent: '#FF6B4A',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Ada Okonkwo',
        discipline: 'Textile',
        accent: '#7B2FBE',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Noah Kim',
        discipline: 'Ceramicist',
        accent: '#FFDD00',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Elsa Johansson',
        discipline: 'Painter',
        accent: '#FF2D78',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    },
]

export default function Artists() {
    const [activeFilter, setActiveFilter] = useState('All')
    const sectionRef = useRef(null)
    const gridRef = useRef(null)

    const filtered = activeFilter === 'All'
        ? ARTISTS
        : ARTISTS.filter(a => a.discipline === activeFilter)

    /* ── Section entrance animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {

            // Eyebrow + heading slam
            gsap.from('.art-eyebrow', {
                scrollTrigger: { trigger: '#artists', start: 'top 78%' },
                x: -40, opacity: 0, duration: 0.7, ease: 'expo.out',
            })

            gsap.from('.art-heading-word', {
                scrollTrigger: { trigger: '#artists', start: 'top 76%' },
                y: 60, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'expo.out',
            })

            gsap.from('.art-sub', {
                scrollTrigger: { trigger: '#artists', start: 'top 72%' },
                y: 30, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
            })

            // Filter bar slides in
            gsap.from('.art-filter-btn', {
                scrollTrigger: { trigger: '.art-filters', start: 'top 88%' },
                y: 20, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.5)',
            })

            // Spinning star
            gsap.from('.art-star', {
                scrollTrigger: { trigger: '#artists', start: 'top 80%' },
                scale: 0, rotation: -180, opacity: 0, duration: 1.2, ease: 'back.out(1.7)',
            })

        }, sectionRef)
        return () => ctx.revert()
    }, [])

    /* ── Re-animate cards whenever filter changes ── */
    useEffect(() => {
        if (!gridRef.current) return
        const cards = gridRef.current.querySelectorAll('.art-card')
        gsap.fromTo(cards,
            { y: 40, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.07, ease: 'back.out(1.4)' }
        )
    }, [activeFilter])

    return (
        <section className="artists-section section-padding" id="artists" ref={sectionRef}>
            <div className="container">

                {/* ── Header ── */}
                <div className="art-header">
                    <div className="art-header-left">
                        <span className="art-eyebrow bold-display">✦ Featured Creators</span>
                        <h2 className="art-heading">
                            <span className="art-heading-word">Meet</span>
                            <span className="art-heading-word art-heading-word--stroke">Our</span>
                            <span className="art-heading-word">Artists</span>
                        </h2>
                        <p className="art-sub">
                            Talented makers, bold visions — meet the creators who bring Mellow Art to life.
                        </p>
                    </div>
                    <div className="art-header-right" aria-hidden="true">
                        <span className="art-star diko-star diko-star--slow diko-star--pink">✦</span>
                    </div>
                </div>

                {/* ── Filter pills ── */}
                <div className="art-filters" role="group" aria-label="Filter artists by discipline">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`art-filter-btn ${activeFilter === cat ? 'art-filter-btn--active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                            aria-pressed={activeFilter === cat}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Cards grid ── */}
                <div className="art-grid" ref={gridRef}>
                    {filtered.map((artist, i) => (
                        <div
                            className="art-card"
                            key={`${artist.name}-${i}`}
                            style={{ '--card-accent': artist.accent }}
                        >
                            <div className="art-card-img-wrap">
                                <img
                                    className="art-card-img"
                                    src={artist.image}
                                    alt={artist.name}
                                    loading="lazy"
                                />
                                {/* Accent overlay on hover */}
                                <div className="art-card-overlay">
                                    <span className="art-card-overlay-name">{artist.name}</span>
                                    <span className="art-card-overlay-disc">{artist.discipline}</span>
                                </div>
                                {/* Accent corner tag */}
                                <span className="art-card-corner-tag">{artist.discipline}</span>
                            </div>
                            <div className="art-card-info">
                                <span className="art-card-name">{artist.name}</span>
                                <span className="art-card-disc">{artist.discipline}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
