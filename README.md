# 💍 Walimatulurus Digital RSVP & Wedding Web App

Aplikasi jemputan perkahwinan digital dan sistem pengesahan kehadiran (RSVP) moden berasaskan **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Supabase**. Dibina dengan reka bentuk mobile-first yang mewah, pantas, mesra akses, dan sedia untuk dideploy ke **Vercel** melalui **GitHub**.

---

## ✨ Ciri-Ciri Utama (Key Features)

1. **Laman Utama & Hero Anggun**
   - Paparan nama pasangan mempelai dalam tipografi klasik & elegan.
   - Jam randik detik countdown majlis secara _real-time_.
   - Pemain lagu latar belakang (_floating audio player_) dengan visualizer cincin emas beranimasi & kawalan _Play/Pause_.
   - Navigasi terapung (_floating dock_) mesra telefon bimbit.

2. **Pengenalan Mempelai & Keluarga**
   - Profil lengkap pengantin lelaki & pengantin perempuan.
   - Maklumat ibu bapa & sebelah keluarga (_Keluarga Pengantin Lelaki / Perempuan_).
   - Petikan ayat suci Al-Quran (Surah Ar-Rum : 21) dalam khat Arab & terjemahan Bahasa Melayu.

3. **Maklumat Majlis & Tentatif Acara**
   - Tarikh Masihi, Tarikh Hijri, masa jamuan, dan nama dewan.
   - Integrasi **"Simpan ke Kalendar"**:
     - 1-Klik tambah ke Google Calendar.
     - Muat turun fail `.ics` untuk Apple Calendar / Microsoft Outlook.
   - Panduan kod pakaian (_Dress Code_) dengan palet warna interaktif.
   - Garis masa tentatif majlis (_Event Schedule Timeline_).

4. **Panduan Lokasi & Navigasi 1-Klik**
   - Integrasi peta Google Maps interaktif (Embedded iframe).
   - Butang navigasi pantas 1-klik untuk **Waze** dan **Google Maps**.
   - Salin alamat penuh dengan fungsi salin klipbod automatik (_One-click copy_).
   - Panduan kemudahan parkir & valet.

5. **Sistem Pengesahan Kehadiran (RSVP)**
   - Pilihan status kehadiran: **"Hadir"** atau **"Tidak Hadir"**.
   - Pemilihan bilangan pax tetamu yang hadir (1 - 5 orang).
   - Ruangan catatan / keperluan diet khas / vegetarian.
   - Letupan animasi konfeti (_confetti burst_) meraikan tetamu yang mengesahkan kehadiran.
   - Validasi data selamat menggunakan **Zod** & perlindungan anti-spam (_Honeypot + Rate Limiter_).
   - Penyimpanan terus ke pangkalan data **Supabase** (dengan mod demo automatik sekiranya kunci API belum ditetapkan).

6. **Buku Tetamu Digital (Guestbook & Doa)**
   - Tetamu boleh menitipkan doa dan ucapan tahniah.
   - Fungsi reaksi "Suka" (Heart Like) secara _real-time_.
   - Susun atur kad ucapan dengan status hubungan (_Keluarga, Sahabat, Rakan Sekerja_).
   - Paginasi butang _"Muat Turun Lagi"_.

7. **Senarai Hajat & Hadiah (Gift Wishlist)**
   - Kad senarai hadiah rumah impian mempelai.
   - Penapis kategori (_Semua, Dapur, Ruang Tamu, Elektronik_).
   - Label platform e-dagang (**Shopee, Lazada, TikTok Shop, IKEA**).
   - Pautan terus ke laman pembelian dan status _"Tersedia"_ vs _"Telah Ditempah"_.

8. **Salam Kaut Digital (Hadiah Ikhlas)**
   - Paparan kod QR **DuitNow** rasmi.
   - Maklumat akaun bank (Nama Bank, Nama Pemegang, No. Akaun).
   - Butang 1-klik salin nombor akaun dengan maklum balas pantas.
   - Butang muat turun gambar kod QR.

9. **Galeri Memori & Lightbox Interaktif**
   - Susun atur foto gaya masonry responsif dengan pemuatan malas (_lazy loading_).
   - Pratonton skrin penuh (_Lightbox Preview Modal_) dengan butang Sebelumnya, Seterusnya, kekunci anak panah papan kekunci, dan kekunci `Esc`.

10. **Hubungi Wakil Majlis**
    - Kad perhubungan pengantin lelaki, pengantin perempuan, ibu bapa & pengurus majlis.
    - Butang pintas terus **WhatsApp** dengan mesej ucapan pra-isi.
    - Butang panggilan telefon terus (`tel:`).

11. **Portal Pentadbir / Urusetia (`/admin`)**
    - Kawalan akses selamat menggunakan kod **PIN Pentadbir**.
    - Kad analitik masa nyata:
      - Jumlah Respons RSVP.
      - Jumlah Pax Hadir.
      - Bilangan Tidak Hadir.
      - Peratusan Kadar Kehadiran.
    - Jadual rekod RSVP dengan carian nama / nombor telefon & penapis status.
    - Butang **"Eksport ke CSV"** untuk memuat turun data tetamu bagi kegunaan pihak katering.
    - Senarai semakan dan moderasi ucapan buku tetamu.

12. **Optimumkan Prestasi, Keselamatan & SEO**
    - Metadata Open Graph & kad Twitter/X untuk perkongsian cantik di WhatsApp / Telegram / Facebook.
    - Skema Data Berstruktur (JSON-LD) jenis `SocialEvent`.
    - Perlindungan Spam menggunakan teknik **Honeypot** dan **Sliding Window Rate Limiter**.
    - Sokongan Favicon SVG vektor emas dioptimumkan.

---

## 🛠️ Senibina & Teknologi (Tech Stack)

| Komponen           | Teknologi                                                        | Keterangan                                                |
| :----------------- | :--------------------------------------------------------------- | :-------------------------------------------------------- |
| **Framework**      | [Next.js 15](https://nextjs.org/)                                | App Router, Server Components & Serverless Route Handlers |
| **Bahasa**         | [TypeScript](https://www.typescriptlang.org/)                    | Strict Type Checking                                      |
| **Gaya & UI**      | [Tailwind CSS v3](https://tailwindcss.com/)                      | Mobile-first luxury wedding color palette                 |
| **Ikon**           | [Lucide React](https://lucide.dev/)                              | Ikon SVG moden & ringan                                   |
| **Pangkalan Data** | [Supabase](https://supabase.com/)                                | PostgreSQL dengan Row Level Security (RLS)                |
| **Validasi**       | [Zod](https://zod.dev/)                                          | Skema validasi borang di peringkat pelanggan & pelayan    |
| **Kesan Visual**   | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Animasi perayaan apabila RSVP dihantar                    |
| **CI / CD**        | GitHub Actions                                                   | Linting & pembinaan automatik sebelum merge               |
| **Hosting**        | [Vercel](https://vercel.com/)                                    | Edge & Serverless platform                                |

---

## 📁 Struktur Folder Projek

```text
jemputan-kahwin/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI build & lint validation
├── app/
│   ├── admin/
│   │   └── page.tsx           # Papan Pemuka Urusetia (Protected Admin Dashboard)
│   ├── api/
│   │   ├── admin/auth/        # API pengesahan PIN admin
│   │   ├── rsvp/              # API penerimaan & senarai RSVP (Rate limited)
│   │   └── wishes/            # API buku ucapan & suka (Like)
│   ├── globals.css            # Tipografi, pembolehubah warna & kecerunan emas
│   ├── icon.svg               # Favicon vektor emas & hijau zamrud
│   ├── layout.tsx             # Root Layout, OpenGraph Metadata & JSON-LD Schema
│   └── page.tsx               # Laman Jemputan Utama (Single-page app)
├── components/
│   ├── AudioPlayer.tsx        # Pemain muzik terapung & kawalan suara
│   ├── BrideGroom.tsx         # Kad profil pengantin & ayat Al-Quran
│   ├── ContactSection.tsx     # Kad wakil & butang WhatsApp
│   ├── EventInfo.tsx          # Butiran majlis, tentatif & eksport kalendar
│   ├── Footer.tsx             # Penutup majlis & pautan ke /admin
│   ├── GallerySection.tsx     # Galeri foto dengan Lightbox interaktif
│   ├── GuestbookSection.tsx   # Borang & senarai ucapan tetamu
│   ├── Hero.tsx               # Hero banner, foto mempelai & jam countdown
│   ├── LocationSection.tsx    # Peta Google Maps, butang Waze & salin alamat
│   ├── Navbar.tsx             # Menu desktop & bar navigasi telefon
│   ├── RsvpSection.tsx        # Borang pengesahan kehadiran & konfeti
│   ├── SalamKautSection.tsx   # DuitNow QR & butiran akaun bank
│   └── WishlistSection.tsx    # Senarai hajat hadiah & pautan kedai
├── config/
│   └── wedding.ts             # SATU FAIL UNTUK SEMUA MAKLUMAT MAJLIS
├── lib/
│   ├── db.ts                  # Lapisan capaian data (Supabase + Demo Fallback)
│   ├── rate-limit.ts          # Pelindung had kadar muat turun (Anti-Spam)
│   ├── supabase.ts            # Pelanggan konfigurasi Supabase
│   ├── utils.ts               # Pembantu styling, tarikh Melayu & eksport CSV
│   └── validations.ts         # Skema Zod untuk borang RSVP & ucapan
├── public/                    # Aset statik (imej, ikon)
├── supabase/
│   └── schema.sql             # Skrip SQL meja, polisi RLS & data sampel
├── types/
│   └── wedding.ts             # Definisi antaramuka TypeScript lengkap
├── .env.example               # Contoh pembolehubah persekitaran
├── eslint.config.mjs          # Konfigurasi ESLint 9
├── next.config.ts             # Konfigurasi Next.js 15
├── tailwind.config.ts         # Konfigurasi tema warna & animasi Tailwind
└── tsconfig.json              # Konfigurasi pengkompil TypeScript
```

---

## ⚙️ Cara Mengemaskini Maklumat Majlis (`config/wedding.ts`)

Anda **TIDAK PERLU** mengubah kod komponen untuk memperibadikan jemputan perkahwinan anda. Hanya buka fail:

👉 **`config/wedding.ts`**

Anda boleh menukar:

- Nama penuh & panggilan pengantin lelaki dan perempuan.
- Nama ibu bapa pengantin.
- Tarikh majlis, tarikh Hijrah & waktu jamuan.
- Nama dewan, alamat penuh, pautan Waze & koordinat Google Maps.
- Tentatif atur cara majlis.
- Senarai nombor telefon wakil keluarga untuk WhatsApp.
- Nombor akaun bank & gambar kod QR DuitNow.
- Pilihan hadiah wishlist beserta pautan Shopee/Lazada/IKEA.
- Foto-foto galeri kenangan.
- Lagu latar belakang instrumental.
- Kata laluan PIN Pentadbir.

---

## 🚀 Panduan Pemasangan Tempatan (Local Development)

### 1. Klon Repositori

```bash
git clone https://github.com/username/jemputan-kahwin.git
cd jemputan-kahwin
```

### 2. Pasang Dependensi

```bash
npm install
```

### 3. Sediakan Pembolehubah Persekitaran (`.env.local`)

Salin fail `.env.example` kepada `.env.local`:

```bash
cp .env.example .env.local
```

Isikan nilai mengikut keperluan anda:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
ADMIN_PIN=123456
```

> **Nota:** Sekiranya anda belum mempunyai akaun Supabase, aplikasi ini akan berjalan secara automatik dalam **Mod Demo Tempatan** (_In-Memory / LocalStorage_) supaya anda boleh menguji kesemua ciri tanpa sebarang ralat!

### 4. Jalankan Pelayan Pembangunan

```bash
npm run dev
```

Buka penyemak imbas anda di `http://localhost:3000`.

---

## 🗄️ Persediaan Pangkalan Data Supabase

1. Daftar akaun percuma di [Supabase](https://supabase.com/) dan cipta projek baharu.
2. Pergi ke bahagian **SQL Editor** dalam papan pemuka Supabase anda.
3. Buka fail `supabase/schema.sql` dalam projek ini, salin kesemua kandungannya dan tampal ke dalam SQL Editor Supabase.
4. Klik **Run** untuk mencipta:
   - Jadual `rsvp_submissions`
   - Jadual `guest_wishes`
   - Indeks pencarian pantas
   - Polisi Keselamatan Peringkat Baris (_Row Level Security / RLS_)
   - Fungsi RPC penambahan tanda suka `increment_wish_like`
5. Dapatkan **Project URL** dan **Anon Key** daripada _Project Settings -> API_ dan masukkan ke dalam fail `.env.local` dan tetapan Vercel.

---

## 🌐 Panduan Penempatan ke Vercel (Deployment)

1. Tolak kod anda ke repositori **GitHub**:

   ```bash
   git add .
   git commit -m "feat: customize wedding invitation"
   git remote add origin https://github.com/username/nama-repo.git
   git push -u origin main
   ```

2. Log masuk ke [Vercel](https://vercel.com/) dan klik **"Add New Project"**.
3. Import repositori GitHub anda.
4. Di bahagian **Environment Variables**, masukkan pembolehubah berikut:
   - `NEXT_PUBLIC_SITE_URL`: Domain jemputan anda (cth: `https://amirul-farhana.vercel.app`)
   - `NEXT_PUBLIC_SUPABASE_URL`: URL projek Supabase anda
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Kunci anon Supabase anda
   - `ADMIN_PIN`: Kod PIN rahsia urusetia anda (cth: `889922`)
5. Klik **Deploy**. Aplikasi anda kini bersedia dalam masa kurang dari 60 saat!

---

## 🛡️ Langkah Keselamatan & Pengendalian Spam

1. **Anti-Bot Honeypot**: Setiap borang RSVP dan buku tetamu dilengkapi medan tersembunyi `honeypot`. Bot pengisi borang automatik akan mengisi medan ini dan serta-merta disekat.
2. **Rate Limiting**: Pengehad kadar berasaskan IP terbina dalam menyekat penghantaran melebihi 5 kali seminit bagi setiap tetamu.
3. **Pengesahan Skema Zod**: Setiap input dibersihkan dan disahkan sebelum memasuki pangkalan data.
4. **Row Level Security (RLS)**: Tetamu biasa hanya boleh membaca ucapan yang telah diluluskan dan tidak dapat melihat maklumat peribadi tetamu lain seperti nombor telefon.

---

Selamat melangkah ke gerbang perkahwinan dan semoga majlis berjalan dengan lancar dan penuh keberkatan! 🌹
