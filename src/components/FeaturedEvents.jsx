import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
    {
        title: 'Summer Solstice Market',
        date: 'March 15, 2026',
        tag: 'Upcoming',
        color: '#FF6B4A',
        image:
            'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=800&fit=crop',
    },
    {
        title: 'Ceramic Collective',
        date: 'April 5, 2026',
        tag: 'Upcoming',
        color: '#3ECFE0',
        image:
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop',
    },
    {
        title: 'Makers & Shakers',
        date: 'May 20, 2026',
        tag: 'Coming Soon',
        color: '#C8FF2E',
        image:
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop',
    },
]

export default function FeaturedEvents() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.section-header h2', {
                scrollTrigger: {
                    trigger: '.featured-events .section-header',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.section-header p', {
                scrollTrigger: {
                    trigger: '.featured-events .section-header',
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
            })

            gsap.from('.event-card', {
                scrollTrigger: {
                    trigger: '.events-grid',
                    start: 'top 80%',
                },
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            className="featured-events section-padding"
            id="events"
            ref={sectionRef}
        >
            <div className="container">
                <div className="section-header">
                    <h2>Upcoming Events</h2>
                    <p>Discover our next creative gatherings and immersive experiences</p>
                </div>

                <div className="events-grid">
                    {events.map((event, i) => (
                        <div className="event-card" key={i}>
                            <img
                                className="event-card-bg"
                                src={event.image}
                                alt={event.title}
                                loading="lazy"
                            />
                            <div className="event-card-overlay" />
                            <div className="event-card-content">
                                <span
                                    className="event-card-tag"
                                    style={{ background: event.color }}
                                >
                                    {event.tag}
                                </span>
                                <h3 className="event-card-title">{event.title}</h3>
                                <span className="event-card-date">{event.date}</span>
                            </div>
                            <div className="event-card-arrow">↗</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
