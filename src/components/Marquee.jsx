const marqueeItems = [
    'Art Markets',
    'Local Makers',
    'Live Music',
    'Workshops',
    'Ceramics',
    'Painting',
    'Sculpture',
    'Photography',
    'Printmaking',
    'Textiles',
]

export default function Marquee({ variant = 'default' }) {
    const content = marqueeItems.map((item, i) => (
        <span key={i} className="marquee-item">
            {item}
            <span className="marquee-separator" />
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
