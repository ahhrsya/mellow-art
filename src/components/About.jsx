export default function About() {
    return (
        <section className="about section-padding" id="about">
            <div className="container">
                <div className="about-inner">
                    <div className="about-left">
                        <h2 className="about-heading">
                            We Bring <br />
                            <span className="highlight">Creative Energy</span> <br />
                            To Life
                        </h2>
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
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Events</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">200+</div>
                                <div className="stat-label">Artists</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">15K</div>
                                <div className="stat-label">Visitors</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-shape" />
        </section>
    )
}
