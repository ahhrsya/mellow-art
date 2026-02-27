const marqueeItems = [
    { text: 'Art Markets', emoji: '🎨' },
    { text: 'Local Makers', emoji: '✦' },
    { text: 'Live Music', emoji: '🎵' },
    { text: 'Workshops', emoji: '★' },
    { text: 'Ceramics', emoji: '🏺' },
    { text: 'Painting', emoji: '✦' },
    { text: 'Sculpture', emoji: '🗿' },
    { text: 'Photography', emoji: '★' },
    { text: 'Printmaking', emoji: '🎨' },
    { text: 'Textiles', emoji: '✦' },
]

export default function Marquee({ variant = 'default' }) {
    const content = marqueeItems.map((item, i) => (
        <span key={i} className="marquee-item">
            <span className="marquee-emoji">{item.emoji}</span>
            {item.text}
        </span>
    ))

    return (
        <div className={`marquee-section ${variant === 'alt' ? 'alt' : ''}`}>
            <div className="marquee-track">
                <div className="marquee-content">{content}</div>
                <div className="marquee-content" aria-hidden="true">
                    {content}
                </div>
            </div>
        </div>
    )
}
