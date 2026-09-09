# sompasauna-site

Sompasaunaseura ry:n **uudet verkkosivut**. Rakennettu
[Eleventy](https://www.11ty.dev/):llä; sisältö Markdownina kansiossa `src/`.

Korvaa aikanaan nykyisen
[Sompasauna-repon](https://github.com/iipponen-sompasauna/Sompasauna)
staattiset HTML-sivut (julkaistu osoitteessa https://sompasauna.fi).

Julkaistaan toistaiseksi **väliaikaiseen osoitteeseen
https://new.sompasauna.fi** rinnakkain tuotantosivun kanssa. Sivu on
`noindex` niin kauan kuin se on väliaikainen (ks. `src/_data/site.js`).

## Kehitys

```bash
npm install
npm start      # http://localhost:8080, live reload
npm run build  # tuottaa _site/
```

Node-versio: ks. [.nvmrc](.nvmrc) (22).

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

Push `main`-haaraan → GitHub Actions rakentaa sivuston. `build`-job (Eleventy)
menee aina läpi. `deploy`-job julkaisee Pagesiin, ja se **vaatii
kertaluontoisen käyttöönoton**:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

Ennen tätä `deploy`-job näkyy punaisena – se on odotettua. Kun asetus on
tehty, aja workflow uudelleen (Actions → viimeisin ajo → Re-run) tai pushaa
mikä tahansa muutos.

> **Huom:** repo on yksityinen. GitHub Pages julkaisee sivuston
> lähtökohtaisesti **julkiseen** osoitteeseen myös yksityisestä reposta
> (pääsyrajattu Pages vaatii maksullisen GitHub-tilan). Sivuston sisältö on
> joka tapauksessa tarkoitettu julkiseksi. Vaihtoehto: Netlify, joka
> deployaa yksityisestä reposta ilman tätä rajoitusta.

### Custom domain: new.sompasauna.fi

1. **DNS** (sompasauna.fi:n hallinnassa): lisää alidomaini
   `new` → `iipponen-sompasauna.github.io` (CNAME). Ks. tarkat arvot alla.
2. **GitHub**: `src/CNAME` sisältää `new.sompasauna.fi`. Kun `deploy`-job on
   ajettu, GitHub asettaa custom domainin automaattisesti. Tarkista
   **Settings → Pages**: Custom domain = `new.sompasauna.fi`,
   "Enforce HTTPS" päälle (voi kestää hetken, kun sertifikaatti myönnetään).
3. Tuotantosivu (`sompasauna.fi`, repo `Sompasauna`) jää ennalleen –
   eri hostname, ei konfliktia.

### Tuotantoon siirto myöhemmin

Kun tästä tulee `sompasauna.fi`:

1. Vaihda `src/CNAME` → `sompasauna.fi` (tai `www.sompasauna.fi`).
2. `src/_data/site.js`: `url` → `https://sompasauna.fi`, `noindex: false`.
3. Siirrä apex-domain tähän repoon (A/AAAA-tietueet) ja poista vanhasta.
4. Tarkista "Enforce HTTPS".

## Tila

Alkuvaihe. Sisältö on tuotu nykyiseltä sivustolta; kohdat joissa lukee
**TODO** odottavat tietoa tai päätöstä (kartat, some-linkit, saunojen
kuvaukset, lämpötilamittarin integraatio).
