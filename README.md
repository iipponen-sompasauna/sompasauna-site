# sompasauna-site

Sompasaunaseura ry:n **uudet verkkosivut**. Rakennettu
[Eleventy](https://www.11ty.dev/):llä; sisältö Markdownina kansiossa `src/`.

Korvaa aikanaan nykyisen
[Sompasauna-repon](https://github.com/iipponen-sompasauna/Sompasauna)
staattiset HTML-sivut (julkaistu osoitteessa https://sompasauna.fi).

Julkaistaan toistaiseksi **väliaikaiseen osoitteeseen
https://new.sompasauna.fi** rinnakkain tuotantosivun kanssa.

**Hakukoneet pidetään poissa** niin kauan kuin osoite on väliaikainen:
`src/_data/site.js`:n `noindex: true` tuottaa jokaiselle sivulle
`<meta name="robots" content="noindex, nofollow">`. Ryömintä sallitaan
(`/robots.txt` `Allow: /`), jotta crawler näkee tuon ohjeen ja jotta
Lighthouse / PageSpeed Insights pääsevät analysoimaan sivua. `noindex: false`
kääntää metan pois ja lisää robots.txt:hen sitemapin.

**Jokainen muutos:** noudata [CONTRIBUTING.md](CONTRIBUTING.md) –
saavutettavuus (WCAG 2.1 AA), FI + EN yhdenmukaisina, mobiili edellä.
Isommat linjaukset: [docs/kehitysmuistio.md](docs/kehitysmuistio.md).

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
| `src/*.md` | Suomenkieliset sivut (juuressa `/`) |
| `src/en/*.md` | Englanninkieliset sivut (`/en/…`) |
| `src/_includes/base.njk` | Yhteinen layout: header (nav + valitsimet), footer |
| `src/_data/site.js` | Perustiedot, kielet |
| `src/_data/i18n.js` | Navigaatio ja UI-tekstit kielittäin |
| `src/assets/style.css` | Tyylit (paletti, typografia, layout) |
| `src/assets/js/ui.js` | Teemavalitsin + kielivalinnan muisti (defer) |
| `src/robots.njk` | `/robots.txt` (noindex-tilassa `Disallow: /`) |
| `.eleventy.js` | Eleventyn asetukset + `pageUrl`-suodatin |
| `.github/workflows/build.yml` | Build + julkaisu GitHub Pagesiin |

### Uusi sivu ja kaksikielisyys

1. Lisää `src/nimi.md` (suomi) ja `src/en/name.md` (englanti).
2. Molempiin front matteriin **sama `ref`** (esim. `ref: arrival`) — se
   sitoo kieliparin yhteen. Kieli tulee kansiosta (`src/` = fi, `src/en/` = en).
3. Lisää nav-kohta `src/_data/i18n.js`:ään molemmille kielille (sama `ref`).
   Navigaatiossa näkyy vain ne sivut jotka on käännetty kyseiselle kielelle.
4. Kielivalitsin ja `hreflang` löytävät vastinsivun `ref`:n perusteella;
   jos vastinetta ei ole, valitsin osoittaa kielen etusivulle.

Ks. periaatteet: [CONTRIBUTING.md](CONTRIBUTING.md).

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

1. **DNS** (Cloudflare): lisää alidomaini `new` →
   `iipponen-sompasauna.github.io` (CNAME). **Suositus: DNS only / harmaa
   pilvi**, jotta GitHubin Let's Encrypt -sertti myöntyy. Jos proxy (oranssi)
   on päällä, TLS:n hoitaa Cloudflare ja GitHubin "Enforce HTTPS" ei ole
   käytettävissä — varmista silloin Cloudflaren SSL/TLS = Full (strict).
2. **GitHub**: `src/CNAME` sisältää `new.sompasauna.fi`. Kun `deploy`-job on
   ajettu, GitHub asettaa custom domainin automaattisesti (Settings → Pages).
3. Tuotantosivu (`sompasauna.fi`, repo `Sompasauna`) jää ennalleen –
   eri hostname, ei konfliktia.

### Tuotantoon siirto myöhemmin

Kun tästä tulee `sompasauna.fi`:

1. Vaihda `src/CNAME` → `sompasauna.fi` (tai `www.sompasauna.fi`).
2. `src/_data/site.js`: `url` → `https://sompasauna.fi`, **`noindex: false`**
   (tämä poistaa robots-metan ja avaa `/robots.txt`:n).
3. Siirrä apex-domain tähän repoon (A/AAAA-tietueet) ja poista vanhasta.
4. Tarkista "Enforce HTTPS" ja lisää sitemap tarvittaessa.

## Tila

Suunta portattu mockupista (paletti, typografia, layout, kieli- ja
teemavalitsin, valintojen muisti). Kaksikielisyyden koneisto pystyssä;
EN-puolella toistaiseksi vain etusivu. Sisältötyöt ja loput EN-sivut:
[docs/kehitysmuistio.md](docs/kehitysmuistio.md). **TODO**-merkinnät
odottavat tietoa (kartat, some-linkit, SafeSompis-linkki, saunojen kuvaukset,
lämpötilamittari).
