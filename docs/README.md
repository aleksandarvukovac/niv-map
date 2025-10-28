# Dokumentacija / Documentation

Ova fascikla sadrži tehničku dokumentaciju za interaktivnu mapu "Najbolje iz Vojvodine".

## Fajlovi

1. **vodic-za-implementaciju.md** - Jednostrana instrukcija za IT tim (kako ugraditi mapu na sajt)
2. **tehnicki-izvestaj.md** - Profesionalan tehnički izveštaj (~2-3 strane)

## Kako konvertovati Markdown u PDF

### Opcija 1: Online (Najlakše)

1. Idite na https://www.markdowntopdf.com/
2. Upload ili kopirajte sadržaj .md fajla
3. Kliknite "Convert"
4. Preuzmite PDF

**Alternativni online alati:**
- https://dillinger.io/ (sa preview-om)
- https://markdown-to-pdf.com/
- https://www.markdowntopdf.com/

### Opcija 2: VS Code

1. Instalirajte ekstenziju "Markdown PDF"
2. Otvorite .md fajl
3. Desni klik → "Markdown PDF: Export (pdf)"

### Opcija 3: Pandoc (Najprofesionalniji rezultat)

```bash
# Instalacija (jednom)
brew install pandoc

# Konverzija
pandoc vodic-za-implementaciju.md -o vodic-za-implementaciju.pdf
pandoc tehnicki-izvestaj.md -o tehnicki-izvestaj.pdf

# Sa boljim font-om za srpski (ako je potrebno)
pandoc tehnicki-izvestaj.md -o tehnicki-izvestaj.pdf --pdf-engine=xelatex
```

### Opcija 4: MacDown (macOS only)

1. Preuzmite MacDown (https://macdown.uranusjr.com/)
2. Otvorite .md fajl
3. File → Export → PDF

## Napomene

- Svi dokumenti su na srpskom jeziku
- Koriste se latinična slova
- Optimizovani za A4 format
- GitHub Flavored Markdown sintaksa
