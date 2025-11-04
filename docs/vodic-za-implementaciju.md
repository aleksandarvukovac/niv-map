<style>
@page {
  size: A4;
  margin: 2.5cm;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12pt;
  line-height: 1.6;
  color: #333;
  max-width: 210mm;
}

h1 {
  font-size: 24pt;
  margin-top: 0;
  margin-bottom: 16pt;
  color: #00A651;
  border-bottom: 3px solid #00A651;
  padding-bottom: 10pt;
}

h2 {
  font-size: 18pt;
  margin-top: 20pt;
  margin-bottom: 12pt;
  color: #00A651;
}

h3 {
  font-size: 14pt;
  margin-top: 16pt;
  margin-bottom: 10pt;
  color: #555;
  font-weight: 600;
}

h4 {
  font-size: 13pt;
  margin-top: 12pt;
  margin-bottom: 8pt;
  font-weight: 600;
}

p, li {
  font-size: 12pt;
  margin-bottom: 10pt;
}

ul, ol {
  margin-left: 24pt;
  margin-bottom: 12pt;
}

li {
  margin-bottom: 6pt;
}

code {
  font-size: 11pt;
  font-family: "Courier New", Courier, monospace;
  background-color: #f5f5f5;
  padding: 3px 6px;
  border-radius: 3px;
}

pre {
  font-size: 10pt;
  font-family: "Courier New", Courier, monospace;
  background-color: #f8f8f8;
  padding: 14pt;
  border-left: 4px solid #00A651;
  overflow-x: auto;
  margin: 14pt 0;
  border-radius: 4px;
}

pre code {
  background-color: transparent;
  padding: 0;
  font-size: 10pt;
}

strong {
  font-weight: 600;
  color: #222;
}

em {
  font-style: italic;
}

a {
  color: #00A651;
  text-decoration: underline;
}

hr {
  border: none;
  border-top: 2px solid #00A651;
  margin: 20pt 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 14pt 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 10pt;
  text-align: left;
  font-size: 11pt;
}

th {
  background-color: #00A651;
  color: white;
  font-weight: 600;
}

blockquote {
  margin-left: 20pt;
  padding-left: 14pt;
  border-left: 4px solid #00A651;
  color: #555;
  font-style: italic;
}
</style>

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
  height="400"
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
- Visina: 400px - 700px
- Pozicija: Desna ili leva kolona na stranici

**Opcija 2: Puna širina**

- Širina: 100% širine stranice
- Visina: 80vh ili 800px
- Pozicija: Glavni sadržaj stranice

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
- ☑ Clustering gradova radi kako treba
- ☑ Watermark logo "Najbolje iz Vojvodine" je vidljiv

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
- Telefon: 064/852-13-19

---

**Dokument kreiran:** Oktobar 2025
**Verzija mape:** 1.0
**Platforma:** MapLibre GL + MapTiler

Aleksandar Vukovac, Amity Integration PR

**********\_\_\_**********
