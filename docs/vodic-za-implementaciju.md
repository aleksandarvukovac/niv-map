# Vodič za implementaciju interaktivne mape

## Najbolje iz Vojvodine

---

### Pregled

Interaktivna mapa prikazuje sve nosioce znaka "Najbolje iz Vojvodine" sa detaljnim informacijama, fotografijama i mogućnostima pretraživanja. Mapa je spremna za ugradnju na zvaničnom sajtu Pokrajinskog sekretarijata za regionalnih razvoj.

**URL mape:** https://niv.amityintegration.com/app.html

---

### Metoda ugradnje: iframe

Najbrži i najsigurniji način ugradnje je korišćenje iframe elementa. Evo tačnog koda:

```html
<iframe
  src="https://niv.amityintegration.com/app.html?v=20241029"
  width="100%"
  height="600"
  frameborder="0"
  style="border: none; border-radius: 8px; display: block; max-width: 100%;"
  title="Interaktivna mapa - Najbolje iz Vojvodine"
  loading="lazy"
  allowfullscreen
>
</iframe>
```

**Napomena:** Query parametar `?v=20241029` služi za cache busting. Ako nakon ugradnje vidite staru verziju mape, promenite datum (npr. `?v=20241030`) da forsirate učitavanje nove verzije.

---

### Opcije za pozicioniranje

**Opcija 1: Sidebar (Preporučeno)**

- Širina: 100% parent kontejnera
- Visina: 600px - 700px
- Pozicija: Desna ili leva kolona na stranici

**Opcija 2: Puna širina**

- Širina: 100% širine stranice
- Visina: 80vh ili 800px
- Pozicija: Glavni sadržaj stranice

**Opcija 3: Popup/Modal**

- Prikazuje se na klik dugmeta "Pogledaj mapu"
- Overlay preko trenutne stranice
- Dugme za zatvaranje

---

### Tehnički zahtevi

✅ **Browser kompatibilnost:** Chrome, Firefox, Safari, Edge (sve moderne verzije)
✅ **Mobilna optimizacija:** Potpuno responzivna, touch-friendly
✅ **HTTPS:** Sajt koristi HTTPS (spriv.vojvodina.gov.rs ✓)
✅ **Performanse:** Optimizovano za brzo učitavanje (slike ~4.2MB ukupno)
✅ **Bez dodatnih skripti:** Sve je sadržano u iframe-u, nema potrebe za dodatnim kodom

---

### Koraci za implementaciju

1. **Pristupite CMS-u** sajta spriv.vojvodina.gov.rs
2. **Pronađite stranicu** gde želite da postavite mapu
3. **Prebacite se u HTML/Code mod** editora
4. **Kopirajte i nalepite** gore navedeni iframe kod
5. **Prilagodite dimenzije** prema vašem layout-u (width/height)
6. **Sačuvajte i objavite** stranicu
7. **Testirajte funkcionalnost** na nekoliko uređaja

---

### Testiranje funkcionalnosti

Nakon ugradnje, proverite:

- ☑ Mapa se učitava i prikazuje markere
- ☑ Pretraga funkcioniše (autocomplete dropdown)
- ☑ Kategorije (filteri) rade ispravno
- ☑ Klik na marker otvara popup sa informacijama
- ☑ Carousel slika se pomera (swipe na mobilnom)
- ☑ Clustering gradova radi kako treba
- ☑ Watermark logo je vidljiv

---

### Troubleshooting

**Problem:** Mapa ne prikazuje markere
**Rešenje:** Proverite da li je stranica učitana preko HTTPS

**Problem:** Iframe se ne prikazuje
**Rešenje:** Proverite CSP (Content Security Policy) header - mora dozvoliti iframe sa niv.amityintegration.com

**Problem:** Klik na mapu ne radi
**Rešenje:** Proverite da nije u `pointer-events: none` parent kontejner

---

### Kontakt i podrška

Za tehnička pitanja i podršku:

- Email: aleksa24sata@gmail.com
- GitHub Repository: https://github.com/aleksandarvukovac/niv-map

---

**Dokument kreiran:** Oktobar 2025
**Verzija mape:** 1.0
**Platforma:** MapLibre GL + MapTiler
