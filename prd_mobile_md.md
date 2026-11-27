# Product Requirement Document (PRD)
## ForeCastFX Mobile — AI-Powered Macroeconomic Prediction & Signal Platform

---

### 1. Executive Summary & Document Control
* **Nama Produk:** ForeCastFX Mobile
* **Versi Dokumen:** 3.0-EDITORIAL-ALIGNED
* **Status:** Production & Thesis (Sempro) Ready
* **Target Platform:** Mobile Application (Android & iOS via React Native / Expo SDK 51+)
* **Identitas Visual:** Editorial Financial Minimalist (*Warm Ivory Paper `#FAF6F0`*, *Charcoal Ink `#1C1917`*, *Forest Sage `#2D6A4F`*, *Deep Burgundy `#7F1D1D`*, tipografi *Serif* + *JetBrains Mono*).
* **Ringkasan Eksekutif:** 
  ForeCastFX Mobile adalah platform analisis dan peramalan berita ekonomi makro Amerika Serikat (*High-Impact Macroeconomic News*) berbasis kecerdasan buatan (*Hybrid AI Engine: Normalized Z-Score Scoring + LLM Agent Synthesis*). Platform ini dirancang untuk membantu trader forex dan komoditas (khususnya XAUUSD) mengantisipasi arah sentimen pergerakan US Dollar (**GOOD FOR USD / BAD FOR USD**) sebelum data aktual resmi dipublikasikan.
  Untuk mengatasi kendala latensi pemrosesan LLM (1–3 detik) saat lonjakan trafik (*data burst*) pada detik-detik rilis berita krusial, sistem menerapkan arsitektur **Server-Side Dynamic TTL Caching** berbasis Redis.

---

### 2. Goals & Objectives
* **Akurasi Sentimen & Bias Prediksi:** Menyediakan estimasi arah dampak *High Impact News* terhadap USD dan aset terkait (`DXY`, `USOIL`, `XAUUSD`, `USDIDR`) sebelum waktu rilis resmi lengkap dengan skor keyakinan (*confidence score*) dan rincian indikator pendahulu.
* **Intermarket & Contextual Synthesis:** Menggabungkan indikator pendahulu (*leading indicators*), tren indeks DXY, pergerakan komoditas minyak mentah (USOIL), serta analisis sentimen berita menggunakan AI Agent.
* **Performa & Skalabilitas Mobile:** Menjamin waktu tanggap (*response time*) antarmuka tetap berada di bawah $150\text{ ms}$ pada saat rilis berita besar melalui arsitektur *Dynamic TTL Caching* di Redis.
* **Interaktivitas Pengguna:** Menyediakan layar asisten obrolan penuh (*Full-Page AI Macro Assistant*) yang sadar konteks (*context-aware*) untuk menjawab pertanyaan trader seputar alasan fundamental di balik prediksi.
* **Fokus Penelitian Skripsi (Sempro):** Menyediakan kerangka pengujian empiris untuk mengukur performa arsitektur *caching* (Latensi, *Response Time*, *Throughput*, dan *Cache Hit Rate*) melalui *stress testing* komparatif saat jendela rilis berita.

---

### 3. Architecture & Data Flow Pipeline

Sistem ForeCastFX Mobile memproses data secara *end-to-end* melalui lima tahapan berurutan:

**[ Data Ingestion ] $\rightarrow$ [ Data Aggregator ] $\rightarrow$ [ Dynamic Caching ] $\rightarrow$ [ AI Agent Engine ] $\rightarrow$ [ React Native UI ]**
*(Macro Events, DXY, USOIL) $\rightarrow$ (Z-Score & Context JSON) $\rightarrow$ (Redis Dynamic TTL) $\rightarrow$ (LLM Synthesis) $\rightarrow$ (Editorial Mobile UI)*

1. **Data Ingestion (FastAPI Backend):**
   * Mengambil jadwal kalender ekonomi AS (*NFP, CPI, GDP, FOMC, PCE, PPI, Retail Sales, Unemployment Rate, Initial Jobless Claims, ISM Mfg/Services PMI, Fed Speech*) dari API penyedia data makro.
   * Mengumpulkan data pasar *real-time* untuk 4 instrumen intermarket: `DXY`, `USOIL`, `XAUUSD`, dan `USDIDR`.
   * Mengagregasi berita makro pendukung dan artikel analisis editorial.
2. **Data Aggregator & Feature Engineering:**
   * Menyatukan data numerik dan narasi teks ke dalam struktur JSON terstandar.
   * Menghitung skor awal deviasi statistik (*Normalized Z-Score*) berdasarkan histori 12 bulan.
   * Mengevaluasi korelasi antar-pasar (misal: kenaikan bulanan USOIL dan indeks *ISM Prices Paid* ditandai sebagai tekanan inflasi jelang rilis CPI).
3. **AI Agent Synthesis (Engine Prediksi):**
   * Menerima konteks terstruktur dari Data Aggregator melalui *Structured Prompting / Function Calling*.
   * Menghasilkan keluaran terstruktur berisi `bias` (`GOOD FOR USD` / `BAD FOR USD`), `recommended_action`, `confidence_score`, dan `summary_reasoning`.
4. **Dynamic Caching Layer (Redis):**
   * Menyimpan hasil sintesis AI Agent, rincian *leading indicators*, dan jadwal kalender ke dalam Redis Cache.
   * Memotong permintaan langsung dari perangkat mobile ke LLM API untuk mencegah *rate-limit*, pembengkakan biaya token, dan *downtime* saat *data burst*.
5. **React Native Mobile UI (Editorial Financial Style):**
   * Menyajikan informasi makro secara tenang, kontras tinggi, dan *glanceable* dalam 5 tab utama serta layar khusus untuk AI Chatbot, Notifikasi, dan Pengaturan Akun.

---

### 4. Functional Requirements & Feature Specifications

| ID | Fitur Utama | Deskripsi Detail |
| :--- | :--- | :--- |
| **FR-01** | **Editorial Hero Prediction & Embedded Leading Indicators (Tab 1)** | Bagian utama Dashboard bergaya *Macro Briefing* yang menampilkan event *High Impact* terdekat, arah bias (**GOOD FOR USD** / **BAD FOR USD**), *countdown timer* monospace, *confidence score*, badge latensi Redis, tautan pemicu AI, serta daftar teranotasi (*annotated breakdown*) bobot indikator pendahulu langsung di bawahnya. |
| **FR-02** | **Intermarket Charts & Watchlist (Tab 2)** | Grafik candlestick interaktif (*TradingView Lightweight Charts* via WebView) untuk instrumen **DXY**, **USOIL**, **XAUUSD**, dan **USDIDR**, dilengkapi pemilih *timeframe* (`15m`, `1h`, `4h`, `1D`) dan tombol *deep-link* menuju aplikasi TradingView. |
| **FR-03** | **Compact Economic Calendar (Tab 3)** | Layar jadwal rilis ekonomi AS yang mandiri, ramping, dan mudah dipindai (*glanceable*). Memuat pemilih tanggal horizontal, filter tingkat dampak (`HIGH`, `MED`, `LOW`), jam rilis WIB, serta komparasi angka `Previous`, `Forecast`, dan `Actual`. |
| **FR-04** | **News & Editorial Insights (Tab 4)** | Layar publikasi berita yang terpisah dari kalender, dilengkapi pengalih segmen antara **Editorial Analysis** (artikel riset mendalam) dan **Live Macro Feed** (aliran berita makro terkini). |
| **FR-05** | **Historical Release & Accuracy Logs (Tab 5)** | Halaman evaluasi kuantitatif yang menampilkan KPI total event teranalisis, persentase *Overall Win Rate*, status verifikasi (`HIT` / `MISS`), komparasi pergerakan pasar aktual, dan akordeon alasan AI pra-rilis. |
| **FR-06** | **Full-Page AI Macro Assistant** | Layar obrolan penuh (*100% height page*) yang dapat diakses melalui tautan kontekstual di Hero Prediction maupun tombol melayang (*FAB*) di sudut kanan bawah Dashboard. Dilengkapi banner konteks makro aktif dan *quick prompt chips*. |
| **FR-07** | **Minimalist Notification Center** | Layar daftar notifikasi datar (*flat list*) untuk peringatan *High-Alert Window (T-5m)*, sinyal prediksi baru, dan hasil verifikasi akurasi. |
| **FR-08** | **Profile Sidebar, Settings & Auth** | Autentikasi berbasis JWT Token (`expo-secure-store`), *Left Profile Drawer* bergaya publikasi modern untuk ringkasan akun, serta layar penuh *Settings & Preferences* (pengalih tema *Editorial Ivory* / *Dark Ink*, pengaturan alert, dan *Logout*). |

---

### 5. Dynamic Caching Mechanism (Redis Layer)

Untuk mengatasi latensi pemrosesan LLM (1–3 detik) dan lonjakan trafik pengguna secara bersamaan saat rilis berita makro, sistem menerapkan strategi **Dynamic Time-To-Live (TTL)** pada Redis:

* **Mode Standby (Pre-Event / Kondisi Pasar Normal):**
  * **Jendela Waktu:** Lebih dari 30 menit sebelum atau sesudah rilis berita *High Impact*.
  * **Nilai TTL:** **900 detik (15 Menit)** untuk `cache:predictions:latest` dan **1800 detik (30 Menit)** untuk rincian indikator pendahulu.
  * **Tujuan:** Efisiensi komputasi server dan penghematan kuota token LLM API.
* **Mode High-Alert (Event Window / Rilis Berita Krusial):**
  * **Jendela Waktu:** **T-5 menit hingga T+15 menit** di sekitar jadwal rilis berita *High Impact*.
  * **Nilai TTL:** **5 – 10 Detik**.
  * **Tujuan:** Menjaga kesegaran data secara *near real-time* bagi seluruh pengguna mobile sekaligus melindungi server backend dari *request spike*.

---

### 6. AI Agent Engine & Mathematical Logic

#### 6.1 Formula Pre-Scoring (Normalized Z-Score Deviation)
Sebelum data dikirim ke LLM Agent, backend FastAPI menghitung skor agregat deviasi statistik indikator pendahulu:

$$\text{Event Bias Score } (S) = \sum_{i=1}^{n} w_i \cdot \left( \frac{\text{Actual}_i - \text{Forecast}_i}{\sigma_i} \right)$$

* $w_i$: Bobot kepentingan *leading indicator* ke-$i$ ($0.0 \le w_i \le 1.0$).
* $\text{Actual}_i$: Nilai rilis aktual indikator pendahulu.
* $\text{Forecast}_i$: Nilai konsensus pasar.
* $\sigma_i$: Standar deviasi historis 12 bulan terakhir.

#### 6.2 Output Format AI Agent Synthesis
Hasil perhitungan Z-Score $S$, tren DXY, momentum harga USOIL, dan ringkasan berita disintesis oleh AI Agent menjadi struktur JSON deterministik:

```json
{
  "event_name": "Consumer Price Index (CPI) MoM",
  "bias": "GOOD FOR USD",
  "recommended_action": "SELL XAUUSD",
  "confidence_score": 85,
  "z_score_deviation": 1.42,
  "summary_reasoning": "Kenaikan harga USOIL bulanan sebesar +6.5% dan penguatan komponen ISM Prices Paid mengindikasikan tekanan inflasi yang persisten menjelang rilis CPI.",
  "intermarket_signals": {
    "dxy_trend": "Bullish",
    "oil_impact": "High Inflationary Pressure"
  }
}
```

---

### 7. Pemisahan Fitur Produk vs Variabel Penelitian Skripsi

Untuk menjaga fokus akademik pada Seminar Proposal (Sempro) dan Tugas Akhir, ruang lingkup sistem dipisahkan menjadi dua ranah:

| Aspek | Fitur Produk (Aplikasi Mobile) | Variabel Penelitian Skripsi |
| :--- | :--- | :--- |
| **Fokus Utama** | Hybrid AI Engine, Sinyal Bias USD, Embedded Leading Indicators, TradingView Chart, Full-Page AI Chatbot. | **Performa Arsitektur Sistem** (*Latency*, *Response Time*, *Throughput*, dan *Cache Hit Ratio*). |
| **Metode Pengujian** | Evaluasi akurasi sinyal finansial (*Hit/Miss Rate* & *Win Rate %*) terhadap pergerakan pasar pasca-rilis berita. | Uji Beban (*Stress Testing* menggunakan Locust / JMeter) dengan membandingkan skenario **Dynamic TTL Caching (Redis)** vs **Tanpa Caching (Direct Query)**. |
| **Kontribusi Teknis** | Integrasi analisis intermarket dan *LLM Function Calling* dalam antarmuka *Editorial Financial* yang mudah dipindai. | Optimasi latensi dan ketahanan sistem (*availability*) pada fenomena *data burst* rilis berita ekonomi makro. |

---

### 8. Technical Stack & Infrastructure
* **Mobile Frontend:** React Native (Expo SDK 51+), TypeScript (Strict Mode), NativeWind v4, TanStack Query v5 (*client caching*), Zustand (*state management*), `react-native-webview`.
* **Backend Engine:** Python FastAPI, Pydantic, Pandas, NumPy, SQLAlchemy 2.0 + Alembic.
* **AI & LLM Orchestration:** OpenAI API (GPT-4o) / LangChain dengan *Structured Output / Function Calling*.
* **Database & Caching:** PostgreSQL 16+ (penyimpanan relasional histori event, prediksi, log akurasi, dan kueri chat) serta Redis 7.2+ (*Dynamic TTL Cache* & *Rate Limiting*).

---

### 9. Non-Functional Requirements (NFR)
1. **Target Latensi & Waktu Respons:**
   * *Cache Hit (via Redis):* $< 150\text{ ms}$ untuk pemuatan data Dashboard dan Kalender.
   * *Cache Miss / Direct AI Chatbot Query:* $< 2.5\text{ detik}$ pada interaksi obrolan AI.
2. **Keandalan (*Reliability*):** Ketersediaan layanan baca (*read availability*) sebesar $99.9\%$ selama jendela rilis berita *High Impact* (NFP, CPI, FOMC).
3. **Keamanan:** Penyimpanan token JWT terenkripsi menggunakan `expo-secure-store` serta komunikasi API terenkripsi melalui HTTPS/TLS.

---

### 10. User Flow & Navigation Map (Unified Architecture)
1. **Authentication Flow:** `LoginScreen` / `RegisterScreen` $\rightarrow$ Simpan JWT di `SecureStore` $\rightarrow$ Masuk ke `TabNavigator`.
2. **5-Tab Bottom Navigation:**
   * **Tab 1 (`Dashboard`):** *Editorial Hero Prediction* + *Embedded Leading Indicators* + *Intermarket Volatility* + *Dual AI Chatbot Triggers*.
   * **Tab 2 (`Charts`):** Pemilih aset (`DXY`, `USOIL`, `XAUUSD`, `USDIDR`) + *Lightweight Candlestick Chart* + tombol *deep-link* TradingView.
   * **Tab 3 (`Calendar`):** Strip tanggal horizontal + filter dampak (`HIGH`/`MED`/`LOW`) + baris komparasi kompak (`Previous` | `Forecast` | `Actual`).
   * **Tab 4 (`News`):** Pengalih segmen `Editorial Analysis` vs `Live Macro Feed`.
   * **Tab 5 (`History`):** Kartu KPI *Win Rate %* + daftar verifikasi historis `HIT` / `MISS` dengan akordeon penalaran AI.
3. **Global & Drawer Flows:**
   * **Full-Page AI Chatbot (`ChatbotScreen`):** Layar penuh percakapan interaktif dengan konteks makro aktif.
   * **Notification Center (`NotificationScreen`):** Daftar datar minimalis untuk peringatan *High-Alert* dan verifikasi sinyal.
   * **Profile Drawer & Settings (`ProfileDrawer` $\rightarrow$ `SettingsScreen`):** Panel geser kiri untuk ringkasan profil, menuju halaman penuh *Settings & Preferences* (pengaturan tema *Editorial Ivory* / *Dark Ink*, notifikasi, cache, dan *Logout*).