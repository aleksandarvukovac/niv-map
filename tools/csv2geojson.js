// tools/csv2geojson.js
const fs = require("fs");
const path = require("path");

// csv-parse v5 (sync API)
const { parse } = require("csv-parse/sync");

// ako želiš geokodiranje adrese -> lat/lon
const fetch = require("node-fetch");
const MAPTILER_KEY = process.env.MAPTILER_KEY || "WJJJqPPstboZWo4827qc";

const INPUT_CSV = path.join(__dirname, "..", "public", "data", "places.csv");
const OUTPUT_GEOJSON = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "places.geojson"
);

function toNum(x) {
  if (x === undefined || x === null || x === "") return null;
  const n = Number(String(x).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

async function geocode(addr, mesto) {
  const q = [addr, mesto, "Vojvodina", "Serbia"].filter(Boolean).join(", ");
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
    q
  )}.json?key=${MAPTILER_KEY}&limit=1&language=sr&country=rs`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("HTTP " + r.status);
  const j = await r.json();
  const f = j.features && j.features[0];
  if (!f || !f.center) return null;
  return { lon: f.center[0], lat: f.center[1] };
}

(async () => {
  const csvText = fs.readFileSync(INPUT_CSV, "utf8");
  const rows = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const features = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];

    // polja koja očekujemo u CSV-u (višak polja će i dalje proći)
    const id = r.id || r.ID || r.Id || "";
    const naziv = r.naziv || r.Naziv || "";
    const kategorija = r.kategorija || r.Kategorija || "";
    const opis = r.opis || r.Opis || "";
    const web = r.web || r.Web || "";
    const foto = r.foto || r.Foto || ""; // može biti "a.jpg,b.jpg,c.jpg"
    const adresa = r.adresa || r.Adresa || "";
    const mesto = r.mesto || r.Mesto || "";
    const tags = r.tags || r.Tagovi || r.tagovi || "";
    const status = r.status || r.Status || "";
    const updated_at = r.updated_at || r.Updated_at || r.updatedAt || "";

    let lat = toNum(r.lat || r.Lat || r.latitude);
    let lon = toNum(r.lon || r.Lon || r.lng || r.long || r.Longitude);

    // ako nema lat/lon, probaj geokodiranje iz adrese
    if ((lat == null || lon == null) && (adresa || mesto)) {
      try {
        const g = await geocode(adresa, mesto);
        if (g) {
          lon = g.lon;
          lat = g.lat;
        }
        await new Promise((res) => setTimeout(res, 150)); // mali delay
      } catch (e) {
        console.warn(`[row ${i + 1}] geocode fail: ${e.message}`);
      }
    }

    if (lat == null || lon == null) {
      console.warn(
        `[row ${i + 1}] skip: nema koordinate (ni lat/lon ni validna adresa)`
      );
      continue;
    }

    // gruba validacija SRB
    if (lon < 18 || lon > 23 || lat < 41 || lat > 47) {
      console.warn(
        `[row ${i + 1}] warn: koordinate izvan očekivanog opsega: ${lat},${lon}`
      );
    }

    // spremi properties (foto ostavljamo kao STRING; u klijentu radimo split(","))
    const properties = {
      id,
      naziv,
      kategorija,
      opis,
      web,
      foto,
      adresa,
      mesto,
      tags,
      status,
      updated_at,
    };

    features.push({
      type: "Feature",
      properties,
      geometry: { type: "Point", coordinates: [lon, lat] },
    });
  }

  const fc = { type: "FeatureCollection", features };
  fs.writeFileSync(OUTPUT_GEOJSON, JSON.stringify(fc, null, 2), "utf8");
  console.log(`OK → ${OUTPUT_GEOJSON} (features: ${features.length})`);
})();
