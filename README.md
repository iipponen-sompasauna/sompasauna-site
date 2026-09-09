# sompasauna-site

Sompasaunaseura ry:n **uudet verkkosivut**. Rakennettu
[Eleventy](https://www.11ty.dev/):llä; sisältö Markdownina kansiossa `src/`.

Korvaa aikanaan nykyisen
[Sompasauna-repon](https://github.com/iipponen-sompasauna/Sompasauna)
staattiset HTML-sivut (julkaistu osoitteessa https://sompasauna.fi).

## Kehitys

```bash
npm install
npm start      # http://localhost:8080, live reload
npm run build  # tuottaa _site/
```

Node-versio: ks. [.nvmrc](.nvmrc) (20).

## Rakenne

| Polku | Sisältö |
|---|---|
| `src/*.md` | Sivujen sisältö (yksi tiedosto per sivu) |
| `src/_includes/base.njk` | Yhteinen layout: ylä- ja alapalkki |
| `src/_data/site.js` | Sivuston perustiedot ja navigaatio |
| `src/assets/` | Tyylit ja kuvat (kopioidaan sellaisenaan) |
| `.eleventy.js` | Eleventyn asetukset |
| `.github/workflows/build.yml` | Automaattinen build + julkaisu GitHub Pagesiin |

Uusi sivu: lisää `src/nimi.md`, jossa front matterissa `title`, ja lisää
linkki navigaatioon `src/_data/site.js`:n `nav`-listaan.

## Julkaisu

Push `main`-haaraan → GitHub Actions rakentaa ja julkaisee GitHub Pagesiin.

Ota käyttöön kerran: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

Projektisivun osoite on `https://iipponen-sompasauna.github.io/sompasauna-site/`,
minkä vuoksi build asettaa `PATH_PREFIX=/sompasauna-site/`.

### Oman domainin (sompasauna.fi) käyttöönotto myöhemmin

Domain osoittaa nyt vanhaan repoon. Kun tämä sivusto on valmis:

1. Poista `PATH_PREFIX`-rivi workflowsta (`.github/workflows/build.yml`).
2. Lisää tiedosto `src/CNAME`, sisältö: `sompasauna.fi`, ja lisää sen
   passthrough-kopiointi `.eleventy.js`:ään.
3. Siirrä DNS / GitHub Pages -domain tähän repoon ja poista se vanhasta.
4. Tarkista HTTPS ("Enforce HTTPS" Pages-asetuksissa).

## Tila

Alkuvaihe. Sisältö on tuotu nykyiseltä sivustolta; kohdat joissa lukee
**TODO** odottavat tietoa tai päätöstä (kartat, some-linkit, saunojen
kuvaukset, lämpötilamittarin integraatio).
