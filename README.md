# 🎨 Mellow Art — Creative Art Market Website

<div align="center">

![Mellow Art Banner](https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=1200&h=400&fit=crop)

**Melbourne's most vibrant creative art market community**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=flat-square&logo=greensock)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Lenis-1.x-000000?style=flat-square)](https://lenis.darkroom.engineering/)

</div>

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Komponen](#-komponen)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Scripts](#-scripts)

---

## 🌟 Tentang Project

**Mellow Art** adalah website landing page untuk komunitas seni kreatif di Melbourne. Website ini menampilkan desain yang bold, ekspresif, dan penuh energi — terinspirasi dari estetika editorial modern dengan animasi GSAP yang immersif.

Website ini dirancang sebagai platform untuk:
- Menampilkan event art market yang akan datang
- Memperkenalkan para seniman lokal Melbourne
- Menghubungkan kreator dengan komunitas
- Mempromosikan workshop dan aktivitas kreatif

---

## ✨ Fitur Utama

### 🎭 Animasi & Interaktivitas
- **GSAP ScrollTrigger** — Animasi berbasis scroll yang halus dan immersif
- **Parallax Mouse Tracking** — Elemen bergerak mengikuti gerakan kursor
- **Smooth Scroll (Lenis)** — Scroll halus dan natural di seluruh halaman
- **Stacked Card Deck** — Galeri foto seni interaktif dengan animasi flip
- **Generative Art Canvas** — Background canvas yang bergerak secara generatif

### 🎨 Desain
- **Bold Typography** — Tipografi besar dan ekspresif dengan font hand-drawn
- **Dynamic Color System** — Palet warna yang dapat beradaptasi per tema event
- **Floating Decorative Shapes** — Elemen dekoratif SVG yang beranimasi
- **Pell-Mell Marquee** — Teks berjalan dengan arah bergantian
- **Glassmorphism Navbar** — Navbar transparan dengan efek blur

### 📱 Responsif
- Fully responsive untuk mobile, tablet, dan desktop
- Mobile menu dengan animasi slide dan stagger
- Scroll-aware navbar (hide on scroll down, show on scroll up)

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **React** | 19.x | UI Framework |
| **Vite** | 7.x | Build Tool & Dev Server |
| **GSAP** | 3.14.x | Animasi & ScrollTrigger |
| **Lenis** | 1.3.x | Smooth Scrolling |
| **Vanilla CSS** | — | Styling & Design System |

### Dev Dependencies
- ESLint + eslint-plugin-react-hooks
- @vitejs/plugin-react

---

## 📁 Struktur Project

```
mellow-art-web/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                  # Static assets
│   ├── components/              # Semua komponen React
│   │   ├── Navbar.jsx           # Navigasi utama
│   │   ├── Navbar.css           # Style navbar
│   │   ├── Hero.jsx             # Hero section utama
│   │   ├── ArtCanvas.jsx        # Generative art background
│   │   ├── CreativeShowcase.jsx # Showcase karya seni
│   │   ├── Marquee.jsx          # Marquee teks berjalan
│   │   ├── About.jsx            # Tentang Mellow Art
│   │   ├── FeaturedEvents.jsx   # Event unggulan
│   │   ├── EventsScrollReveal.jsx # Event dengan scroll reveal
│   │   ├── Artists.jsx          # Grid seniman
│   │   ├── MakersDirectory.jsx  # Direktori maker/kreator
│   │   ├── PastEvents.jsx       # Arsip event lalu
│   │   ├── Contact.jsx          # Form kontak
│   │   └── Footer.jsx           # Footer
│   ├── App.jsx                  # Root component
│   ├── App.css                  # Global styles & design system
│   ├── index.css                # Base reset & CSS variables
│   └── main.jsx                 # Entry point
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## 🧩 Komponen

### `Navbar`
Navigasi utama dengan fitur:
- Auto-hide saat scroll ke bawah, muncul kembali saat scroll ke atas
- Active section detection berdasarkan posisi scroll
- Progress bar scroll di bagian bawah navbar
- Mobile overlay menu dengan animasi stagger
- Logo dengan glassmorphism backdrop

### `Hero`
Section hero utama dengan:
- **Stacked Card Deck** — 6 kartu foto seni yang dapat diklik untuk flip
- **Generative Art Canvas** — Background canvas bergerak
- **Smooth Mouse Parallax** — Multi-layer parallax mengikuti kursor (LERP smoothing)
- **Auto-advance** — Kartu berganti otomatis setiap 2.6 detik
- Floating SVG decorative shapes (bintang, blob, lingkaran)
- Intro animation dengan timeline GSAP

### `ArtCanvas`
Generative art background yang digambar di HTML Canvas, beranimasi secara kontinyu.

### `CreativeShowcase`
Section showcase karya kreatif dengan layout visual yang dinamis.

### `Marquee`
Teks berjalan horizontal dengan dua variant:
- Default — arah normal
- `variant="alt"` — arah terbalik

### `About`
Section tentang Mellow Art dengan:
- Animasi heading kata-per-kata dari kiri
- Statistik (50+ Events, 200+ Artists, 15K Visitors) dengan bounce animation
- Floating blob decorations

### `FeaturedEvents`
Kartu event unggulan yang akan datang.

### `EventsScrollReveal`
Section events dengan efek scroll reveal yang immersif menggunakan GSAP ScrollTrigger.

### `Artists`
Grid galeri seniman lokal Melbourne.

### `MakersDirectory`
Direktori lengkap para maker dan kreator.

### `PastEvents`
Arsip dan galeri event-event yang sudah berlalu dengan efek pinned scrolling.

### `Contact`
Form kontak dan informasi untuk dihubungi.

### `Footer`
Footer dengan navigasi sekunder dan informasi brand.

---

## 🚀 Instalasi & Menjalankan

### Prasyarat
- **Node.js** >= 18.x
- **npm** atau **yarn**

### Langkah Instalasi

```bash
# 1. Clone repository
git clone <repository-url>
cd mellow-art-web

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Website akan berjalan di **http://localhost:5173**

---

## 📜 Scripts

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| Dev server | `npm run dev` | Jalankan development server dengan HMR |
| Build | `npm run build` | Build production bundle ke folder `dist/` |
| Preview | `npm run preview` | Preview hasil build production |
| Lint | `npm run lint` | Jalankan ESLint untuk cek kode |

---

## 🎨 Design System

Warna utama yang digunakan (CSS variables di `index.css`):

| Variable | Keterangan |
|----------|------------|
| `--color-yellow` | Aksen kuning energik |
| `--color-hot-pink` | Aksen pink bold |
| `--color-lime` | Aksen lime segar |
| `--color-electric` | Aksen biru elektrik |
| `--color-violet` | Aksen ungu ekspresif |
| `--color-accent` | Warna aksen utama |

---

<div align="center">

Made with ❤️ for Melbourne's creative community

**Mellow Art** — *Where creativity comes alive*

</div>
