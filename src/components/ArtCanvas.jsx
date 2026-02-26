import { useEffect, useRef } from 'react'

/*
  ArtCanvas — Generative abstract paint motion engine
  ────────────────────────────────────────────────────
  Creates a living, flowing abstract painting that looks like
  curated art footage: fluid ink pools, sweeping brush strokes,
  chromatic paint blobs, and luminous color fields.
  
  Technique:
  - Layered radial "ink pools" that drift and breathe
  - Bézier brush strokes that grow across the canvas
  - Simplex-noise-style perlin drift using smooth sin/cos
  - Additive color blending with chromatic aberration
  - Canvas 2d with compositing modes for paint depth
*/

// Mellow Art brand palette
const PALETTE = [
    { r: 232, g: 93, b: 47 }, // --color-primary (warm orange)
    { r: 255, g: 107, b: 74 }, // --color-accent  (bright coral)
    { r: 62, g: 207, b: 224 }, // --color-electric (cyan)
    { r: 200, g: 255, b: 46 }, // --color-lime    (electric lime)
    { r: 255, g: 245, b: 225 }, // --color-cream   (warm white)
    { r: 148, g: 52, b: 18 }, // deep burnt sienna
    { r: 255, g: 165, b: 90 }, // warm amber
    { r: 20, g: 180, b: 200 }, // deep teal
]

function lerp(a, b, t) { return a + (b - a) * t }
function noise(x, y, t) {
    return (
        Math.sin(x * 0.8 + t * 0.4) * 0.4 +
        Math.sin(y * 0.6 - t * 0.3) * 0.3 +
        Math.sin((x + y) * 0.5 + t * 0.25) * 0.3
    )
}

// ── Ink Pool – large drifting radial blobs ──────────────────
class InkPool {
    constructor(w, h) { this.reset(w, h, true) }

    reset(w, h, init = false) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.r = 80 + Math.random() * 260
        this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        this.alpha = 0.04 + Math.random() * 0.1
        this.maxAlpha = this.alpha
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.20
        this.phase = Math.random() * Math.PI * 2
        this.freq = 0.0004 + Math.random() * 0.0003
        this.life = 0
        this.maxLife = 600 + Math.random() * 400
        this.born = init ? Math.random() * this.maxLife : 0
        this.w = w; this.h = h
    }

    update(t) {
        this.life++
        const age = (this.life + this.born) / this.maxLife
        // Alpha envelope: fade in, sustain, fade out
        this.alpha = this.maxAlpha * Math.sin(age * Math.PI) * 0.9
        // Drift with organic noise
        const n = noise(this.x * 0.001, this.y * 0.001, t * 0.001)
        this.x += this.vx + n * 0.15
        this.y += this.vy + noise(this.y * 0.001, this.x * 0.001, t * 0.0008) * 0.12
        // Pulsing radius
        this.r += Math.sin(t * this.freq + this.phase) * 0.3
        if (this.life > this.maxLife) this.reset(this.w, this.h)
    }

    draw(ctx) {
        const { r, g, b } = this.col
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
        grd.addColorStop(0, `rgba(${r},${g},${b},${this.alpha})`)
        grd.addColorStop(0.4, `rgba(${r},${g},${b},${this.alpha * 0.5})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
    }
}

// ── Brush Stroke – sweeping paint lines ──────────────────────
class BrushStroke {
    constructor(w, h) { this.reset(w, h) }

    reset(w, h) {
        this.w = w; this.h = h
        this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        // Start from any edge or interior
        const edge = Math.floor(Math.random() * 4)
        if (edge === 0) { this.x = Math.random() * w; this.y = -50 }
        else if (edge === 1) { this.x = w + 50; this.y = Math.random() * h }
        else if (edge === 2) { this.x = Math.random() * w; this.y = h + 50 }
        else { this.x = -50; this.y = Math.random() * h }
        this.tx = Math.random() * w   // target
        this.ty = Math.random() * h
        // Control point for Bézier
        this.cx = Math.random() * w
        this.cy = Math.random() * h
        this.t = 0
        this.speed = 0.0008 + Math.random() * 0.0012
        this.width = 2 + Math.random() * 8
        this.alpha = 0.08 + Math.random() * 0.18
        this.segments = Math.floor(80 + Math.random() * 120)
        this.points = []
        this.maxPoints = this.segments
        this.done = false
    }

    // Quadratic Bézier point at t
    bezier(t) {
        const mt = 1 - t
        return {
            x: mt * mt * this.x + 2 * mt * t * this.cx + t * t * this.tx,
            y: mt * mt * this.y + 2 * mt * t * this.cy + t * t * this.ty,
        }
    }

    update() {
        if (this.done) return
        this.t += this.speed
        if (this.t >= 1) { this.done = true; return }
        const pt = this.bezier(this.t)
        this.points.push(pt)
        if (this.points.length > this.maxPoints) this.points.shift()
    }

    draw(ctx) {
        if (this.points.length < 2) return
        const { r, g, b } = this.col
        ctx.globalCompositeOperation = 'screen'
        ctx.strokeStyle = `rgba(${r},${g},${b},${this.alpha})`
        ctx.lineWidth = this.width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        for (let i = 1; i < this.points.length; i++) {
            const p = this.points[i]
            ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
    }
}

// ── Color Field – slow-moving large color washes ─────────────
class ColorField {
    constructor(w, h, index) {
        this.w = w; this.h = h
        this.col = PALETTE[index % PALETTE.length]
        this.x = (index / 4) * w + Math.random() * w * 0.3
        this.y = Math.random() * h
        this.r = 250 + Math.random() * 350
        this.phase = index * 1.4
        this.speed = 0.00015 + Math.random() * 0.0001
        this.drift = { x: (Math.random() - 0.5) * 0.08, y: (Math.random() - 0.5) * 0.06 }
    }

    update(t) {
        this.x += this.drift.x + Math.sin(t * 0.001 + this.phase) * 0.08
        this.y += this.drift.y + Math.cos(t * 0.0008 + this.phase) * 0.06
        // Wrap gently
        if (this.x < -this.r) this.x = this.w + this.r
        if (this.x > this.w + this.r) this.x = -this.r
        if (this.y < -this.r) this.y = this.h + this.r
        if (this.y > this.h + this.r) this.y = -this.r
    }

    draw(ctx, t) {
        const { r, g, b } = this.col
        const pulse = 0.5 + 0.5 * Math.sin(t * this.speed * 2000 + this.phase)
        const alpha = 0.06 + pulse * 0.06
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * (0.9 + pulse * 0.2))
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        grd.addColorStop(0.6, `rgba(${r},${g},${b},${alpha * 0.3})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * (0.9 + pulse * 0.2), 0, Math.PI * 2)
        ctx.fill()
    }
}

// ── Spark – tiny luminous particles ─────────────────────────
class Spark {
    constructor(w, h) { this.w = w; this.h = h; this.reset() }
    reset() {
        this.x = Math.random() * this.w
        this.y = Math.random() * this.h
        this.r = 1 + Math.random() * 3
        this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        this.alpha = 0.3 + Math.random() * 0.5
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.life = 0
        this.maxLife = 200 + Math.random() * 300
    }
    update() {
        this.life++
        this.x += this.vx
        this.y += this.vy
        if (this.life > this.maxLife) this.reset()
    }
    draw(ctx) {
        const { r, g, b } = this.col
        const age = this.life / this.maxLife
        const a = this.alpha * Math.sin(age * Math.PI)
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
    }
}

export default function ArtCanvas({ className = '' }) {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const stateRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: false })

        let w = canvas.offsetWidth
        let h = canvas.offsetHeight
        canvas.width = w
        canvas.height = h

        // ── Init entities ──────────────────────────────────────────
        const NUM_POOLS = 14
        const NUM_STROKES = 8
        const NUM_FIELDS = 6
        const NUM_SPARKS = 60

        const pools = Array.from({ length: NUM_POOLS }, () => new InkPool(w, h))
        const strokes = Array.from({ length: NUM_STROKES }, () => new BrushStroke(w, h))
        const fields = Array.from({ length: NUM_FIELDS }, (_, i) => new ColorField(w, h, i))
        const sparks = Array.from({ length: NUM_SPARKS }, () => new Spark(w, h))

        stateRef.current = { pools, strokes, fields, sparks }

        // Stroke regeneration
        let strokeTimer = 0
        const STROKE_INTERVAL = 180 // frames

        // ── Resize handler ─────────────────────────────────────────
        const onResize = () => {
            w = canvas.offsetWidth
            h = canvas.offsetHeight
            canvas.width = w
            canvas.height = h
        }
        const resizeObs = new ResizeObserver(onResize)
        resizeObs.observe(canvas)

        // ── Main render loop ───────────────────────────────────────
        let frame = 0
        const tick = () => {
            frame++
            strokeTimer++

            // 1. Fill dark base — semi-opaque so motion trails persist
            ctx.globalCompositeOperation = 'source-over'
            ctx.fillStyle = 'rgba(17, 17, 17, 0.18)'
            ctx.fillRect(0, 0, w, h)

            // 2. Color fields (underlying washes)
            fields.forEach(f => { f.update(frame); f.draw(ctx, frame) })

            // 3. Ink pools (mid-scale blobs)
            pools.forEach(p => { p.update(frame); p.draw(ctx) })

            // 4. Brush strokes
            strokes.forEach(s => {
                s.update()
                s.draw(ctx)
                if (s.done && strokeTimer > STROKE_INTERVAL / NUM_STROKES) {
                    s.reset(w, h)
                    strokeTimer = 0
                }
            })

            // 5. Sparks
            sparks.forEach(s => { s.update(); s.draw(ctx) })

            // 6. Subtle vignette overlay
            ctx.globalCompositeOperation = 'source-over'
            const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, Math.max(w, h) * 0.75)
            vig.addColorStop(0, 'rgba(0,0,0,0)')
            vig.addColorStop(1, 'rgba(0,0,0,0.65)')
            ctx.fillStyle = vig
            ctx.fillRect(0, 0, w, h)

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            resizeObs.disconnect()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={`art-canvas ${className}`}
            aria-hidden="true"
        />
    )
}
