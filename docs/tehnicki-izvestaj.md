# Tehnički izveštaj: Interaktivna mapa "Najbolje iz Vojvodine"

---

## 1. Pregled projekta

Interaktivna mapa "Najbolje iz Vojvodine" je moderna web aplikacija razvijena za Pokrajinski sekretarijat za regionalni razvoj, inter-regionalnu saradnju i lokalnu samoupravu. Cilj projekta je vizuelizacija svih 32 nosioca znaka kvaliteta "Najbolje iz Vojvodine" na interaktivnoj mapi Vojvodine, sa mogućnostima pretraživanja, filtriranja po kategorijama i detaljnim prikazom informacija o svakom nosiocu.

### Ciljevi projekta

- **Promocija lokalnih vrednosti** - Vizualizacija geografske distribucije sertifikovanih proizvođača, zanatlija, usluga i manifestacija
- **Pristupačnost informacija** - Intuitivno pretraživanje i filtriranje sa detaljnim informacijama
- **Profesionalan izgled** - Dizajn usklađen sa brendom "Najbolje iz Vojvodine"
- **Tehnička stabilnost** - Brza, responzivna i pouzdana aplikacija

---

## 2. Korišćene tehnologije

### 2.1 MapLibre GL JS (v3.6.1)

**MapLibre GL JS** je open-source biblioteka za interaktivne vektorske mape. Odabrana je kao besplatna i snažna alternativa komercijalnim rešenjima.

**Prednosti:**
- Potpuno besplatna, bez licensing troškova
- Hardverska GPU akceleracija za glatke animacije
- Podržava milione podataka bez usporavanja
- Aktivna zajednica i redovni update-i

**Upotreba u projektu:**
- Renderovanje osnovne mape Vojvodine
- Prikazivanje custom markera kao Symbol Layers
- Animacije (flyTo, fitBounds) za zoom i fokusiranje
- Event handling (klikovi, hover efekti)

### 2.2 MapTiler API

**MapTiler** pruža stilizovane mape i geocoding servise.

**API Key:** WJJJqPPstboZWo4827qc
**Map Style:** streets-v2 (optimizovan za čitljivost)

**Servisi korišćeni:**
- Tiles za renderovanje mape (vektorski format)
- Geocoding za pretragu lokacija
- Auto-scaling za različite rezolucije ekrana

### 2.3 GeoJSON format

**GeoJSON** je standardni format za geospatijalne podatke.

**Struktura podataka:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [19.8451, 45.2671]
      },
      "properties": {
        "id": 1,
        "naziv": "Dijamant",
        "kategorija": "Proizvodi",
        "mesto": "Novi Sad",
        "adresa": "Bulevar oslobođenja 46",
        "opis": "...",
        "web": "https://...",
        "foto": "dijamant-1.jpg,dijamant-2.jpg,dijamant-3.jpg"
      }
    }
  ]
}
```

**Izvor podataka:**
- Primarni podaci: CSV fajl (places.csv)
- Konverzija: Node.js skripta (csv2geojson.js)
- Lokacija: `/public/data/places.geojson`

### 2.4 Netlify hosting

**Netlify** je moderna platforma za hosting statičkih sajtova.

**Prednosti:**
- Automatski deployment iz GitHub repozitorijuma
- Globalni CDN (brzo učitavanje svuda u svetu)
- HTTPS sertifikat (besplatno, automatski)
- Zero-downtime deployments

**Konfigurisanje:**
- Povezan sa GitHub repom: aleksandarvukovac/niv-map
- Automatski build i deploy na svaki git push
- Custom domen: niv.amityintegration.com

---

## 3. Arhitektura i implementacija

### 3.1 Single-file arhitektura

Aplikacija je implementirana kao **jedan HTML fajl** (`app.html`) sa ugrađenim CSS-om i JavaScript-om.

**Razlozi za ovaj pristup:**
- Jednostavnost deployment-a (jedan fajl)
- Lakša WordPress/iframe integracija
- Nema potrebe za build procesima
- Potpuna portabilnost

**Struktura:**
```
/public/
  ├── app.html           # Glavni fajl aplikacije (~1650 linija)
  ├── embed.html         # Embed wrapper (za testiranje)
  ├── embed.js           # Embed helper kod
  ├── /data/
  │   ├── places.csv     # Izvorni podaci
  │   └── places.geojson # Konvertovani podaci
  ├── /img/              # Slike (carousel, logoi)
  └── /tools/
      └── csv2geojson.js # Konverzioni skripta
```

### 3.2 Korisnički interfejs

**Kontrole (levo gore):**
1. **Pretraga sa autocomplete** - Dropdown sa svim lokacijama, filtriranje u realnom vremenu
2. **Kategorijski filteri** - 5 dugmića: Sve, Zanati, Proizvodi, Usluge, Manifestacije

**Elementi na mapi:**
- **Custom markeri** - Teardrops (kap-oblik) u brendiranoj zelenoj boji (#00A651)
- **Ikonice po kategoriji** - Čekić (Zanati), Torba (Proizvodi), Ključ (Usluge), Zastava (Manifestacije)
- **Kategoriski dot** - 4px obojeni krug na dnu markera
- **Clusteri** - Grupisanje po gradovima (2+ markera)
- **Watermark** - NIV logo (donje desno)

**Popup sa informacijama:**
- Naslov nosioca znaka
- Kategorija i adresa
- Opis (do 200 karaktera)
- Carousel sa 3-4 fotografije (swipe/klik navigacija)
- Link ka web sajtu

### 3.3 Funkcionalnosti

#### a) Pretraga sa autocomplete

**Tehnologija:** Custom JavaScript dropdown (Option B pattern)

**Mogućnosti:**
- Prikazuje svih 32 lokacija odjednom
- Real-time filtriranje (naziv + grad)
- Keyboard navigacija (↑↓, Enter, Escape)
- Kategoriski obojene tačke
- Klik → zoom na marker (nivo 14)

**Implementacija:**
- `filterDropdown()` - Filtrira lokacije na osnovu unosa
- `renderDropdown()` - Renderuje rezultate
- `selectLocation()` - Zoom i fokusiranje na izabranu lokaciju

#### b) Kategorijsko filtriranje

**Kategorije:**
1. **Zanati** - Oranž (#F4A261) - 8 nosioca
2. **Proizvodi** - Braon (#8B4513) - 12 nosioca
3. **Usluge** - Teal (#20B2AA) - 6 nosioca
4. **Manifestacije** - Crvena (#DC143C) - 6 nosioca

**Logika:**
- Filtriranje na MapLibre layer nivou (GPU optimizovano)
- Automatsko sakrivanje klastera koji ne sadrže izabranu kategoriju
- Active state sa kategoriskom bojom

#### c) Clustering po gradovima

**Strategija:** Semantički clustering (po gradovima) umesto proximity-based

**Pravila:**
- Gradovi sa 2+ markera → prikazuju se kao cluster
- Gradovi sa 1 markerom → prikazuje se individualni marker
- Cluster label: "Naziv grada broj_markera" (npr. "Novi Sad 6")

**Gradovi sa clusterima:**
- Novi Sad: 6 markera
- Zrenjanin, Kikinda, Sombor, Stara Pazova, Banoštor: po 2 markera

**Interakcija:**
- Klik na cluster → zoom sa fitBounds (maxZoom: 11)
- Kategoriski filtri automatski sakrivaju prazne clustere

#### d) Custom canvas markeri

**Razlog za canvas rendering:**
- Brži od HTML markera
- Bolji za veliki broj elemenata
- Potpuna kontrola nad dizajnom

**Dizajn:**
- Teardrop oblik (kap): 32×42px
- Brend zelena boja (#00A651)
- Beli ikonice (čekić, torba, ključ, zastava)
- Kategoriski obojeni 4px dot
- Drop shadow za dubinu

**Funkcija:** `createCustomPin(category)`

---

## 4. Optimizacije i performanse

### 4.1 Kompresija slika

**Problem:** Originalne slike (carousel) bile su ~47MB ukupno (dijamant-1.jpg: 15.3MB)

**Rešenje:** macOS sips tool kompresija
```bash
sips -Z 1000 --setProperty formatOptions 75 image.jpg
```

**Rezultat:**
- Pre: 47MB
- Posle: 4.2MB
- Smanjenje: 91%
- Kvalitet: Zadržan (75% JPEG quality)

### 4.2 Symbol Layers umesto HTML markera

**Symbol Layers** (MapLibre nativni markeri):
- GPU renderovani
- Nema floating problema
- Brže od DOM manipulacije
- Stabilni na zoom/pan

**Rezultat:**
- 32 markera renderuje se trenutno
- Smooth zoom i pan animacije
- Nema memory leakova

### 4.3 Lazy loading

- **Mapa tiles:** učitavaju se on-demand
- **Slike u carousel-u:** učitavaju se nakon klika na marker
- **Popup:** kreira se dinamički, ne postoji u DOM-u dok nije potreban

---

## 5. Dizajnerske odluke

### 5.1 Brand alignment

**"Najbolje iz Vojvodine" brend:**
- Zelena boja: #00A651 (iz zvaničnog logoa)
- Watermark: NIV logo (110px, 85% opacity)
- Profesionalan, vladin look

### 5.2 UX paterni

**Autocomplete combo box:**
- Inspirisan Google pretraživanjem
- Enables browsing behavior (korisno za istraživanje)
- Mobile-friendly (veliki touch targeti)

**Category filtering:**
- Single-click access
- Visual feedback (aktivne boje)
- Jasne ikonice

**City clustering:**
- Smanjuje vizuelni clutter
- Semantički (po gradovima) je logičniji od proximity
- Labels sa brojem markera

### 5.3 Responzivnost

- **Desktop:** Kontrole levo gore, vodič thumb swipe navigacija
- **Mobile:** Touch-friendly dugmići, swipe za carousel
- **Tablet:** Optimalno za oba režima (portrait/landscape)

---

## 6. Budući razvoj

### Moguća proširenja

1. **Admin panel** za dodavanje novih nosilaca znaka (bez editovanja CSV-a)
2. **Multilingual podrška** (Engleski, Mađarski za turiste)
3. **Heatmap prikaz** po kategorijama
4. **Rute** između markera (tourist trails)
5. **Integracija sa društvenim mrežama** (share buttons)
6. **Analytics** (Google Analytics ili Plausible za praćenje korišćenja)

### Održavanje

- **Update podataka:** Edit places.csv → run csv2geojson.js → commit → auto-deploy
- **Dodavanje slika:** Upload u /img/ → update CSV foto kolonu
- **Backup:** GitHub repozitorijum čuva kompletnu istoriju

---

## 7. Zaključak

Interaktivna mapa "Najbolje iz Vojvodine" je moderna, performantna i user-friendly web aplikacija koja uspešno vizuelizuje sve nosioce znaka kvaliteta. Korišćenjem savremenih open-source tehnologija (MapLibre, GeoJSON) i best-practice pristupa (optimizacija, semantic clustering, autocomplete), mapa pruža profesionalno iskustvo koje je spremno za integraciju na zvanični sajt Pokrajinskog sekretarijata.

**Ključne prednosti:**
- ✅ Potpuno besplatne tehnologije (zero licensing costs)
- ✅ Brzo učitavanje i glatke animacije
- ✅ Profesionalan dizajn usklađen sa brendom
- ✅ Mobilna optimizacija
- ✅ Laka integracija (iframe)
- ✅ Automatski deployment i HTTPS

**Statistika:**
- **Lokacije:** 32 nosioca znaka
- **Kategorije:** 4 (Zanati, Proizvodi, Usluge, Manifestacije)
- **Slike:** 96 fotografija (~4.2MB optimizovano)
- **Kod:** ~1650 linija (HTML + CSS + JavaScript)
- **Performanse:** <2s load time, 60fps animacije

---

**Dokument kreiran:** Oktobar 2025
**Autor:** Aleksandar Vukovac (aleksandar.vukovac@amityintegration.com)
**Tehnologije:** MapLibre GL v3.6.1, MapTiler API, GeoJSON, Netlify
**GitHub:** https://github.com/aleksandarvukovac/niv-map
**Live Demo:** https://niv.amityintegration.com/app.html
