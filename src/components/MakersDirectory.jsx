import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   CATEGORIES
───────────────────────────────────────────── */
const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'painting', label: 'Painting' },
    { id: 'ceramics', label: 'Ceramics' },
    { id: 'sculpture', label: 'Sculpture' },
    { id: 'textiles', label: 'Textiles' },
    { id: 'print', label: 'Print' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'photo', label: 'Photography' },
    { id: 'digital', label: 'Digital' },
]

/* ─────────────────────────────────────────────
   MAKERS DATA
───────────────────────────────────────────── */
const MAKERS = [
    { id: 1, name: 'Mia Chen', handle: '@mia.paints', category: 'painting', discipline: 'Painting', location: 'Fitzroy', tags: ['Abstract', 'Acrylic'], accent: '#FF6B4A', markets: 14, featured: true },
    { id: 2, name: 'Liam Torres', handle: '@liamc.clay', category: 'ceramics', discipline: 'Ceramics', location: 'Collingwood', tags: ['Functional', 'Glazed'], accent: '#3ECFE0', markets: 9, featured: false },
    { id: 3, name: 'Yuki Tanaka', handle: '@yukisculpts', category: 'sculpture', discipline: 'Sculpture', location: 'Brunswick', tags: ['Found Object', 'Mixed Media'], accent: '#C8FF2E', markets: 22, featured: true },
    { id: 4, name: 'Zara Ahmed', handle: '@zaralens', category: 'photo', discipline: 'Photography', location: 'Richmond', tags: ['Documentary', 'Film'], accent: '#FF6B4A', markets: 7, featured: false },
    { id: 5, name: 'Felix Rivera', handle: '@felixprints', category: 'print', discipline: 'Print', location: 'Northcote', tags: ['Screen Print', 'Zines'], accent: '#C8FF2E', markets: 18, featured: false },
    { id: 6, name: 'Ada Okonkwo', handle: '@ada.weaves', category: 'textiles', discipline: 'Textiles', location: 'Prahran', tags: ['Natural Dye', 'Weaving'], accent: '#3ECFE0', markets: 31, featured: true },
    { id: 7, name: 'Noah Kim', handle: '@noah.throws', category: 'ceramics', discipline: 'Ceramics', location: 'Carlton', tags: ['Porcelain', 'Minimal'], accent: '#FF6B4A', markets: 12, featured: false },
    { id: 8, name: 'Elsa Johansson', handle: '@elsapaints', category: 'painting', discipline: 'Painting', location: 'South Yarra', tags: ['Oil', 'Landscape'], accent: '#C8FF2E', markets: 6, featured: false },
    { id: 9, name: 'Omar Farouk', handle: '@omarrings', category: 'jewellery', discipline: 'Jewellery', location: 'Fitzroy North', tags: ['Goldsmith', 'Custom'], accent: '#FF6B4A', markets: 25, featured: false },
    { id: 10, name: 'Priya Nair', handle: '@priyadesigns', category: 'digital', discipline: 'Digital Art', location: 'Abbotsford', tags: ['Generative', 'Illustration'], accent: '#3ECFE0', markets: 4, featured: true },
    { id: 11, name: 'Marco Pelli', handle: '@marcopelli', category: 'sculpture', discipline: 'Sculpture', location: 'Kensington', tags: ['Marble', 'Resin'], accent: '#C8FF2E', markets: 3, featured: false },
    { id: 12, name: 'Simone Hall', handle: '@simones.lens', category: 'photo', discipline: 'Photography', location: 'St Kilda', tags: ['Analogue', 'Darkroom'], accent: '#FF6B4A', markets: 11, featured: false },
]

/* ─────────────────────────────────────────────
   MAKER ROW
───────────────────────────────────────────── */
function MakerRow({ maker, index }) {
    return (
        <div
            className="maker-row"
            style={{ '--row-accent': maker.accent }}
        >
            {/* index number */}
            <span className="maker-row-num">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* name block */}
            <div className="maker-row-name-block">
                <span className="maker-row-name">{maker.name}</span>
                {maker.featured && (
                    <span className="maker-row-featured">Featured</span>
                )}
            </div>

            {/* discipline */}
            <span className="maker-row-discipline">{maker.discipline}</span>

            {/* tags */}
            <div className="maker-row-tags">
                {maker.tags.map(t => (
                    <span key={t} className="maker-row-tag">{t}</span>
                ))}
            </div>

            {/* location */}
            <span className="maker-row-location">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M5 0C2.794 0 1 1.794 1 4C1 7 5 12 5 12C5 12 9 7 9 4C9 1.794 7.206 0 5 0ZM5 5.5C4.172 5.5 3.5 4.828 3.5 4C3.5 3.172 4.172 2.5 5 2.5C5.828 2.5 6.5 3.172 6.5 4C6.5 4.828 5.828 5.5 5 5.5Z" fill="currentColor" />
                </svg>
                {maker.location}, VIC
            </span>

            {/* markets count */}
            <span className="maker-row-markets">
                <strong>{maker.markets}</strong> markets
            </span>

            {/* arrow */}
            <span className="maker-row-arrow" aria-hidden="true">↗</span>

            {/* hover accent line */}
            <span className="maker-row-accent-line" aria-hidden="true" />
        </div>
    )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function MakersDirectory() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })

    const sectionRef = useRef(null)
    const listRef = useRef(null)
    const filterRef = useRef(null)
    const btnRefs = useRef([])
    const searchTimer = useRef(null)
    const isAnimating = useRef(false)

    /* filtered list */
    const filtered = MAKERS.filter(m => {
        const catOk = activeCategory === 'all' || m.category === activeCategory
        const q = searchQuery.toLowerCase()
        const textOk = !q ||
            m.name.toLowerCase().includes(q) ||
            m.discipline.toLowerCase().includes(q) ||
            m.location.toLowerCase().includes(q) ||
            m.tags.some(t => t.toLowerCase().includes(q))
        return catOk && textOk
    })

    /* ── sliding pill ── */
    const updatePill = useCallback((idx) => {
        const btn = btnRefs.current[idx]
        if (!btn || !filterRef.current) return
        const bar = filterRef.current.getBoundingClientRect()
        const b = btn.getBoundingClientRect()
        setPillStyle({ left: b.left - bar.left, width: b.width })
    }, [])

    useEffect(() => {
        const idx = CATEGORIES.findIndex(c => c.id === activeCategory)
        updatePill(idx)
        const onResize = () => updatePill(idx)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [activeCategory, updatePill])

    /* ── scroll entrance ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header
            gsap.from('.md-header', {
                scrollTrigger: { trigger: '.makers-directory', start: 'top 78%' },
                y: 70,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            })

            // Filter bar + search
            gsap.from('.md-controls-row', {
                scrollTrigger: { trigger: '.md-controls-row', start: 'top 88%' },
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
            })

            // First batch of rows
            gsap.from('.maker-row', {
                scrollTrigger: { trigger: '.makers-list', start: 'top 85%' },
                y: 40,
                opacity: 0,
                duration: 0.55,
                stagger: 0.06,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    /* ── filter transition ── */
    const animateOut = useCallback(() => new Promise(resolve => {
        if (!listRef.current) { resolve(); return }
        const rows = listRef.current.querySelectorAll('.maker-row')
        if (!rows.length) { resolve(); return }
        gsap.to(rows, {
            opacity: 0,
            y: -12,
            duration: 0.2,
            stagger: 0.025,
            ease: 'power2.in',
            onComplete: resolve,
        })
    }), [])

    const animateIn = useCallback(() => {
        if (!listRef.current) return
        const rows = listRef.current.querySelectorAll('.maker-row')
        gsap.fromTo(rows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
        )
    }, [])

    const handleCategoryChange = useCallback(async (catId, idx) => {
        if (catId === activeCategory || isAnimating.current) return
        isAnimating.current = true
        await animateOut()
        setActiveCategory(catId)
        updatePill(idx)
        setTimeout(() => {
            animateIn()
            isAnimating.current = false
        }, 30)
    }, [activeCategory, animateOut, animateIn, updatePill])

    const handleSearch = useCallback(e => {
        clearTimeout(searchTimer.current)
        const val = e.target.value
        searchTimer.current = setTimeout(async () => {
            await animateOut()
            setSearchQuery(val)
            setTimeout(animateIn, 30)
        }, 200)
    }, [animateOut, animateIn])

    return (
        <section className="makers-directory section-padding" id="directory" ref={sectionRef}>

            {/* watermark in background */}
            <span className="md-watermark" aria-hidden="true">MAKERS</span>

            <div className="container">

                {/* ── Header ── */}
                <div className="md-header">
                    <div className="md-header-left">
                        <p className="md-eyebrow">✦ The Directory</p>
                        <h2 className="md-title">
                            Meet the<br />
                            <em className="md-title-italic">Makers</em>
                        </h2>
                    </div>
                    <p className="md-header-desc">
                        {MAKERS.length} independent artists, designers and craftspeople
                        who call Mellow Art Market home. Commission, connect, collect.
                    </p>
                </div>

                {/* ── Controls: filter + search ── */}
                <div className="md-controls-row">
                    {/* Category filter */}
                    <div className="md-filter-wrap" ref={filterRef} role="tablist" aria-label="Filter makers by category">
                        {/* sliding pill */}
                        <span
                            className="md-filter-pill"
                            style={{ left: pillStyle.left + 'px', width: pillStyle.width + 'px' }}
                            aria-hidden="true"
                        />
                        {CATEGORIES.map((cat, idx) => (
                            <button
                                key={cat.id}
                                ref={el => { btnRefs.current[idx] = el }}
                                className={`md-filter-btn${activeCategory === cat.id ? ' active' : ''}`}
                                onClick={() => handleCategoryChange(cat.id, idx)}
                                role="tab"
                                aria-selected={activeCategory === cat.id}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="md-search-wrap">
                        <svg className="md-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <input
                            id="md-search"
                            type="text"
                            className="md-search"
                            placeholder="Search name, medium, suburb…"
                            onChange={handleSearch}
                            aria-label="Search makers"
                        />
                    </div>

                    {/* count pill */}
                    <span className="md-count-pill">
                        {filtered.length} maker{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* ── Makers list ── */}
                {filtered.length === 0 ? (
                    <div className="md-empty">
                        <p>Nothing matched. Try clearing your search or picking a different category.</p>
                        <button
                            className="md-clear-btn"
                            onClick={() => {
                                setSearchQuery('')
                                setActiveCategory('all')
                                document.getElementById('md-search').value = ''
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="makers-list" ref={listRef}>
                        <div className="makers-list-header" aria-hidden="true">
                            <span>#</span>
                            <span>Name</span>
                            <span>Discipline</span>
                            <span>Tags</span>
                            <span>Location</span>
                            <span>Markets</span>
                        </div>
                        {filtered.map((maker, i) => (
                            <MakerRow key={maker.id} maker={maker} index={i} />
                        ))}
                    </div>
                )}

                {/* ── Bottom CTA ── */}
                <div className="md-bottom-row">
                    <p className="md-bottom-text">
                        Want to be listed? Apply to join as a Mellow Art Market maker.
                    </p>
                    <a href="#contact" className="md-apply-btn">
                        Apply Now
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    )
}
