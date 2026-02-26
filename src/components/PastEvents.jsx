const pastEvents = [
    {
        name: 'Winter Warmers',
        date: 'Jul 2025',
        artists: '32 artists',
        attendees: '480',
        emoji: '🧣',
        accent: '#FF6B4A',
        tag: 'Craft & Textiles',
    },
    {
        name: 'Spring Fling',
        date: 'Oct 2025',
        artists: '45 artists',
        attendees: '720',
        emoji: '🌸',
        accent: '#E91E83',
        tag: 'Mixed Media',
    },
    {
        name: 'Night Market',
        date: 'Nov 2025',
        artists: '28 artists',
        attendees: '560',
        emoji: '🌙',
        accent: '#3ECFE0',
        tag: 'Urban Arts',
    },
    {
        name: 'Holiday Bazaar',
        date: 'Dec 2025',
        artists: '50 artists',
        attendees: '1,200',
        emoji: '🎄',
        accent: '#E85D2F',
        tag: 'All Disciplines',
    },
    {
        name: 'Print Fair',
        date: 'Sep 2025',
        artists: '20 artists',
        attendees: '340',
        emoji: '🖨️',
        accent: '#C8FF2E',
        tag: 'Printmaking',
    },
    {
        name: 'Textile Tales',
        date: 'Aug 2025',
        artists: '18 artists',
        attendees: '290',
        emoji: '🧶',
        accent: '#FF6B4A',
        tag: 'Fiber Arts',
    },
    {
        name: 'Ceramic Show',
        date: 'Jun 2025',
        artists: '24 artists',
        attendees: '410',
        emoji: '🏺',
        accent: '#3ECFE0',
        tag: 'Ceramics',
    },
    {
        name: 'Art Walk',
        date: 'May 2025',
        artists: '60 artists',
        attendees: '1,800',
        emoji: '🎨',
        accent: '#FFD700',
        tag: 'Community',
    },
]

export default function PastEvents() {
    return (
        <section className="past-events">
            {/* Decorative blobs */}
            <div className="pe-blob pe-blob-1" />
            <div className="pe-blob pe-blob-2" />

            <div className="container">
                {/* Header */}
                <div className="pe-header">
                    <div className="pe-header-label">Archive</div>
                    <h2 className="pe-title">Past Events</h2>
                    <p className="pe-subtitle">
                        A look back at our creative gatherings and the&nbsp;communities
                        they brought together
                    </p>
                </div>

                {/* Grid */}
                <div className="pe-grid">
                    {pastEvents.map((event, i) => (
                        <article
                            className="pe-card"
                            key={i}
                            style={{ '--pe-accent': event.accent }}
                        >
                            {/* Top strip */}
                            <div className="pe-card-strip" />

                            {/* Emoji badge */}
                            <div className="pe-card-emoji">{event.emoji}</div>

                            {/* Content */}
                            <div className="pe-card-body">
                                <span className="pe-card-tag">{event.tag}</span>
                                <h3 className="pe-card-name">{event.name}</h3>

                                <div className="pe-card-meta">
                                    <span className="pe-card-date">{event.date}</span>
                                    <span className="pe-card-dot">·</span>
                                    <span className="pe-card-artists">{event.artists}</span>
                                </div>

                                <div className="pe-card-footer">
                                    <div className="pe-card-attendees">
                                        <span className="pe-attendees-num">{event.attendees}</span>
                                        <span className="pe-attendees-label">attendees</span>
                                    </div>
                                    <div className="pe-card-arrow">→</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
