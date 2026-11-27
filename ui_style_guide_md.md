# ForeCastFX Mobile — UI Style Guide & Unified Design System Specification
**Dokumen:** `UI-Style-Guide.md`  
**Versi:** 3.0-EDITORIAL-PRODUCTION  
**Target Platform:** Mobile (iOS & Android via React Native / Expo SDK 51+ + NativeWind v4)  
**Tema Standar:** Editorial Financial Minimalist (Warm Ivory Light First, dengan dukungan Dark Ink Mode)

---

## 1. Filosofi Desain & Core Principles
1. **Editorial Financial Clarity:** Mengadopsi estetika publikasi finansial modern (*Financial Times / Monocle*). Mengutamakan keterbacaan instan, ruang napas (*whitespace*) yang lega, dan garis pembatas tipis (*hairline rules*) tanpa efek *glow* neon atau kaca buram (*anti-AI slop*).
2. **Financial Glanceability:** Bias sentimen (`GOOD FOR USD` / `BAD FOR USD`), indikator pendahulu (*leading indicators*), dan tingkat keyakinan (*confidence score*) dapat dipahami trader dalam waktu kurang dari 3 detik di halaman utama.
3. **Deterministic System Transparency:** Status sumber data (apakah dilayani dari Redis Dynamic Cache atau sintesis langsung) ditampilkan secara jelas melalui label monospace mikro.
4. **Strict Color Semantics:** Warna *Forest Sage* (`#2D6A4F`) dan *Deep Burgundy* (`#7F1D1D`) hanya digunakan untuk arah sentimen pasar, status akurasi, dan peringatan kritis. Elemen struktural menggunakan palet kertas hangat (*Warm Ivory* & *Warm Sand*).

---

## 2. Color Palette & Semantic Design Tokens

### A. Editorial Light Theme (Default — Warm Ivory Paper)
```css
/* Background & Surface Tokens */
--bg-app:             #FAF6F0; /* Warm Ivory Paper (Latar utama aplikasi) */
--surface-card:       #F2EBE1; /* Warm Sand (Permukaan kartu, blok matriks, & drawer) */
--surface-elevated:   #EAE0D2; /* Elevated Sand (Input aktif, badge container) */
--surface-secondary:  #E5DCCB; /* Bubble user chat & pill sekunder */

/* Border & Hairline Divider Tokens */
--border-subtle:      #D6CFC2; /* Garis pemisah tipis 1px & dashed rules */
--border-active:      #A89F91; /* Border saat elemen difokuskan */
--border-strong:      #1C1917; /* Garis kontras tinggi editorial */

/* Sentimen Bullish / Good For USD */
--sentiment-bullish:        #2D6A4F; /* Forest Sage (Bullish USD / Accurate Hit) */
--sentiment-bullish-subtle: rgba(45, 106, 79, 0.10);
--sentiment-bullish-border: rgba(45, 106, 79, 0.35);

/* Sentimen Bearish / Bad For USD / High Impact */
--sentiment-bearish:        #7F1D1D; /* Deep Burgundy (Bearish USD / High Impact / Logout) */
--sentiment-bearish-subtle: rgba(127, 29, 29, 0.10);
--sentiment-bearish-border: rgba(127, 29, 29, 0.35);

/* Alert & Editorial Accent */
--alert-warning:            #B45309; /* Warm Amber Ochre (High-Alert T-5m / Med Impact) */
--alert-warning-subtle:     rgba(180, 83, 9, 0.10);
--accent-editorial-navy:    #1E293B; /* Deep Editorial Navy (Primary CTA Pill) */

/* Typography Colors */
--text-primary:       #1C1917; /* Charcoal Ink (Judul utama, angka harga, headline) */
--text-secondary:     #57534E; /* Warm Stone (Subjudul, deskripsi indikator, ringkasan) */
--text-muted:         #78716C; /* Muted Taupe (Timestamp, catatan kaki, metadata) */
--text-inverse:       #FAF6F0; /* Teks Ivory di atas tombol Navy/Sage solid */
```

### B. Editorial Dark Theme (Optional Toggle in Settings — Deep Ink)
```css
--dark-bg-app:        #121110; /* Deep Editorial Ink */
--dark-surface-card:  #1C1A18; /* Dark Warm Slate */
--dark-border-subtle: #2E2B27; /* Muted Bronze Divider */
--dark-text-primary:  #F5F2EB; /* Soft Ivory Ink */
```

---

## 3. Typography Scale & Font Hierarchy
Menggabungkan tiga karakter tipografi yang saling melengkapi:
* **Editorial Serif (`Playfair Display` / `Georgia`):** Digunakan untuk nama brand `ForeCastFX`, judul besar prediksi (*Hero Headline*), dan judul artikel analisis.
* **Clean Sans-Serif (`Inter`):** Digunakan untuk teks narasi, label tombol, dan deskripsi antarmuka.
* **Technical Monospace (`JetBrains Mono`):** Wajib digunakan untuk seluruh angka harga (`DXY`, `XAUUSD`, `USOIL`, `USDIDR`), *countdown timer*, deviasi `Z-Score`, bobot indikator, dan *timestamp*.

| Token | Font Family | Ukuran | Line Height | Weight | Penggunaan Utama |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-hero` | Serif | 26px–30px | 34px | 700 (Bold) | Headline Bias (`GOOD FOR USD`), Win Rate % |
| `title-editorial` | Serif | 20px–22px | 28px | 700 (Bold/Italic) | Judul Event Utama Dashboard, Lead News |
| `title-header` | Serif | 18px | 24px | 600 (Semibold) | Top App Bar Screen Title |
| `body-prose` | Sans-Serif | 14px | 21px | 400 (Regular) | Narasi ringkasan AI, isi artikel, chat bubble |
| `body-label` | Sans-Serif | 14px | 20px | 500 (Medium) | Label form, daftar pengaturan, sub-item |
| `caption-tracked` | Serif/Sans | 11px–12px | 16px | 600 (Semibold) | Header bagian berhuruf kapital (*letter-spacing: 1.2px*) |
| `mono-data` | Monospace | 13px–16px | 20px | 600 (Semibold) | Angka Z-Score, Countdown, Previous/Forecast/Actual |

---

## 4. Arsitektur Layar & Komponen UI Spesifik

### A. Global Top App Bar (Tabs 1–5)
* **Kiri:** Tipografi Serif `ForeCastFX` (pada Dashboard) atau judul halaman aktif (`Intermarket Charts`, `Economic Calendar`, `Market News & Insights`, `Prediction Accuracy`).
* **Kanan:** Ikon Lonceng Notifikasi (dengan titik indikator merah *Burgundy* jika ada notifikasi belum dibaca) dan Ikon Avatar Profil pengguna (membuka *Left Profile Drawer*).

### B. Tab 1: Dashboard ("The Macro Briefing")
1. **Sub-Header Macro Desk:** Baris informasi tipis dengan pemisah `#D6CFC2` bertuliskan `US MACRO DESK • WIB (UTC+7)` dan status waktu rilis terdekat.
2. **Editorial Hero Focus (Flat Paper Flow):**
   * Judul rilis berita dalam font Serif tebal (contoh: *The US CPI MoM Forecast*).
   * Blok sentimen utama dengan garis vertikal kiri tebal (`3px solid #2D6A4F` untuk *Good for USD* atau `#7F1D1D` untuk *Bad for USD*), menampilkan teks besar `GOOD FOR USD ↗` dan paragraf narasi ringkas.
   * Baris metrik monospace inline: `Confidence: 85%`, `Countdown: 01h : 54m : 54s`, `140 Q-Models`, serta badge `⚡ REDIS CACHED (120ms)`.
   * **Contextual AI Trigger:** Tautan aksi langsung di bawah kartu prediksi: `Ask AI Macro Analyst: Why is USD bullish ahead of CPI? →`.
3. **Annotated Leading Indicators Breakdown (Langsung di Dashboard):**
   * Daftar indikator pendahulu yang mengalir rapi dengan garis putus-putus tipis (`1px dashed #D6CFC2`), menampilkan deviasi, bobot ($w_i$), dan label dampak (`HAWKISH` / `DOVISH`).
   * Bar ringkasan agregat di bagian bawah: `Aggregate Z-Score: +1.42 σ (High Inflation Pressure)` di atas permukaan `#F2EBE1`.
4. **Intermarket Volatility Row:** Dua kartu ringkas berdampingan untuk `DXY` dan `XAU/USD`.
5. **Dual AI Chatbot Entry (Floating Action Button):** Tombol bulat/kapsul di sisi kanan bawah (sekitar 70% tinggi layar, di atas *Bottom Tab Bar*) berikon asisten dengan *speech bubble* ramah: `"Ada yang bisa aku bantu? ✨"`.

### C. Tab 2: Intermarket Charts & Watchlist
1. **Watchlist Selector:** Kontrol segmen horizontal `[ DXY ] [ USOIL ] [ XAUUSD ] [ USD/IDR ]`.
2. **Active Ticker Banner:** Nama instrumen dalam Serif, harga terkini dalam `JetBrains Mono` ukuran besar, dan *pill* perubahan persentase harian.
3. **TradingView Lightweight Chart:** Kanvas candlestick bersih dengan warna candle `#2D6A4F` (naik) dan `#7F1D1D` (turun) menyatu dengan latar `#FAF6F0`, dilengkapi pemilih timeframe (`15m`, `1h`, `4h`, `1D`) dan tombol *deep-link* `Open full chart in TradingView App →`.

### D. Tab 3: Economic Calendar (Stand-Alone & Compact)
* Dirancang **sangat ringkas dan padat informasi** (tanpa kartu prediksi besar yang berulang):
  * Strip pemilih tanggal horizontal di atas + filter dampak (`All Impact`, `High Impact Only`, `Medium & High`).
  * Setiap baris agenda dipisahkan garis tipis `1px solid #D6CFC2`, memuat: Jam rilis monospace (`19:30 WIB`), badge tingkat dampak (`HIGH` Burgundy, `MED` Amber, `LOW` Taupe), nama rilis berita, dan grid 3 kolom (`Previous` | `Forecast` | `Actual`).

### E. Tab 4: News & Market Insights (Stand-Alone)
* Terpisah sepenuhnya dari Kalender Ekonomi.
* Menggunakan *segmented switch* `[ Editorial Analysis ] | [ Live Macro Feed ]`.
* Artikel utama tampil dalam kartu `#F2EBE1` dengan kategori, judul Serif 20px, ringkasan, estimasi waktu baca, dan thumbnail.

### F. Tab 5: Accuracy & History Logs
* **KPI Summary Strip:** Dua blok metrik berdampingan (`Evaluated Events` dan `Overall Win Rate %` berwarna *Forest Sage*).
* **Verification Cards:** Menampilkan nama event, badge status `HIT` (`#2D6A4F`) atau `MISS` (`#7F1D1D`), komparasi bias prediksi vs pergerakan riil pasar, serta tombol akordeon `Review AI Pre-Release Reasoning ▾`.

---

## 5. Layar Global & Navigasi Sekunder

### A. Full-Page AI Macro Assistant (`ChatbotScreen`)
* Menggunakan layar penuh (**100% Height Page**, bukan *bottom sheet* setengah layar) dengan tombol kembali `←` di kiri atas.
* Memuat banner konteks makro aktif di bawah header, gelembung pesan pengguna (`#E5DCCB`), kartu sintesis AI dengan garis aksen kiri *Forest Sage* (`#2D6A4F`), *quick prompt chips*, dan kolom input tetap di bagian bawah.

### B. Ultra-Minimalist Notification Center (`NotificationScreen`)
* Mengadopsi pola daftar datar (*flat list*) tanpa kotak kartu berat dan tanpa *filter chips*.
* Header hanya memuat navigasi `< Back` di kiri dan judul `Notifications` di tengah.
* Daftar notifikasi dipisahkan garis tipis `#D6CFC2` dengan ikon bulat di kiri serta judul Serif, deskripsi singkat, dan *timestamp* di kanan.

### C. Profile Left Drawer & Full-Page Settings (`ProfileDrawer` & `SettingsScreen`)
* **Profile Sidebar (Slide-out Left Drawer 82% lebar layar):** Menampilkan kartu ringkasan profil pengguna, statistik cepat, pintasan ke analitik/prediksi tersimpan, menu utama `Settings and Preferences ›`, dan tombol `Log Out Account`.
* **Dedicated Settings Screen (Full-Page):** Terbagi dalam kelompok kartu `#F2EBE1` untuk pengaturan tema (`Editorial Ivory` / `Dark Ink`), preferensi chart, notifikasi *High-Alert (T-15m)*, informasi *Redis Dynamic Caching*, dan tombol keluar akun.

---

## 6. Responsive Grid, Spacing & Touch Compliance
* **Base Spacing Unit:** 4px (`4, 8, 12, 16, 20, 24, 32px`).
* **Screen Horizontal Padding:** Konsisten `16px` di seluruh layar.
* **Touch Target Size:** Seluruh elemen interaktif memiliki area sentuh minimal $44 \times 44\text{ pt}$.
* **Safe Area:** Seluruh layar wajib dibungkus `SafeAreaView` untuk menghormati *notch* dan *home indicator* perangkat iOS maupun Android.