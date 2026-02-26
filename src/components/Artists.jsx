import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
    'All',
    'Painter',
    'Ceramicist',
    'Sculptor',
    'Photographer',
    'Textile',
    'Printmaker',
]

const artistsData = [
    {
        name: 'Mia Chen',
        discipline: 'Painter',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Liam Torres',
        discipline: 'Ceramicist',
        image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Yuki Tanaka',
        discipline: 'Sculptor',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Zara Ahmed',
        discipline: 'Photographer',
        image:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Felix Rivera',
        discipline: 'Printmaker',
        image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Ada Okonkwo',
        discipline: 'Textile',
        image:
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Noah Kim',
        discipline: 'Ceramicist',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
    {
        name: 'Elsa Johansson',
        discipline: 'Painter',
        image:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    },
]

export default function Artists() {
    const [activeFilter, setActiveFilter] = useState('All')
    const sectionRef = useRef(null)
    const gridRef = useRef(null)

    const filtered =
        activeFilter === 'All'
            ? artistsData
            : artistsData.filter((a) => a.discipline === activeFilter)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.artists .section-header h2', {
                scrollTrigger: {
                    trigger: '.artists .section-header',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.filter-btn', {
                scrollTrigger: {
                    trigger: '.artists-filter',
                    start: 'top 85%',
                },
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        if (!gridRef.current) return
        const cards = gridRef.current.querySelectorAll('.artist-card')
        gsap.fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
            }
        )
    }, [activeFilter])

    return (
        <section className="artists section-padding" id="artists" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2>Our Artists</h2>
                    <p>Meet the talented makers and creators in our community</p>
                </div>

                <div className="artists-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="artists-grid" ref={gridRef}>
                    {filtered.map((artist, i) => (
                        <div className="artist-card" key={`${artist.name}-${i}`}>
                            <div className="artist-img-wrapper">
                                <img
                                    className="artist-img"
                                    src={artist.image}
                                    alt={artist.name}
                                    loading="lazy"
                                />
                                <div className="artist-overlay">
                                    <div className="artist-overlay-info">
                                        <h4>{artist.name}</h4>
                                        <span>{artist.discipline}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="artist-info">
                                <div className="artist-name">{artist.name}</div>
                                <div className="artist-discipline">{artist.discipline}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
