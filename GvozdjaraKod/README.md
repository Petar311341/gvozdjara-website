# Gvožđara Janković — sajt

Statičan sajt (HTML/CSS/JS, bez build koraka) za gvožđaru u Loznici.

## Struktura

```
index.html        Početna strana (hero, asortiman, zašto mi, brendovi, usluge, utisci)
asortiman.html     Detaljan pregled svih 8 odeljenja
o-nama.html        Priča o radnji, vremenska linija, utisci
kontakt.html        Radno vreme, mapa, kontakt forma
styles.css          Zajednički stilovi (dizajn tokeni, layout, komponente, animacije)
main.js             Sticky header, mobilni meni, scroll-reveal, validacija forme
assets/favicon.svg  Ikonica sajta
```

## Pokretanje lokalno

Sajt nema build korak — nije potreban Node, npm ni bilo kakav paket menadžer.

**Najjednostavnije:** otvorite `index.html` dvoklikom u browseru.

**Preporučeno (da linkovi i fontovi rade bez ograničenja lokalnog fajl-sistema):**
pokrenite lokalni server iz foldera sajta i otvorite `http://localhost:5500`.

- VS Code: instalirajte ekstenziju **Live Server**, klik desnim tasterom na `index.html` → *Open with Live Server*.
- Python: `python3 -m http.server 5500` pa otvorite `http://localhost:5500`.
- Node: `npx serve .`

## Napomene

- Fontovi (Barlow Condensed, Source Sans 3, JetBrains Mono) učitavaju se sa Google Fonts — potrebna je internet konekcija.
- Fotografije na sajtu su sa Unsplash-a, licencirane za slobodnu upotrebu; izvor i autor su navedeni kao HTML komentar iznad svakog `<img>` taga.
- Google mapa je ugrađena preko iframe-a — radi bez API ključa.
- Forma na `kontakt.html` je validirana u JavaScript-u (bez reload-a stranice), ali nije povezana na pravi backend/email — za produkciju je potrebno dodati slanje na server ili servis poput Formspree/EmailJS.
- Sajt poštuje `prefers-reduced-motion`: sve animacije (hero, reveal, hover) se gase korisnicima koji su to tražili u sistemskim podešavanjima.

## Izmena sadržaja

Sav tekst je običan HTML — traženje i zamena u editoru je dovoljno. Cene, brendovi i linkovi
ka porukama su smešteni direktno u markup, bez CMS-a ili baze podataka.
