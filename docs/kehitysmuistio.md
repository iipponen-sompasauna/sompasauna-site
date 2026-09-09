# Kehitysmuistio

Koottu yhteenveto sivuston uudistuksen linjauksista ja esitetyistä toiveista.
Uusin päivä ylimpänä. Yksityiskohtaiset toteutusperiaatteet: [../CONTRIBUTING.md](../CONTRIBUTING.md).

---

## 2026-09-09 — suunta, valitsimet, porttaus

### Repot ja julkaisu

- **`Sompasauna`** (vanha, `sompasauna.fi`) = **vain referenssi**. Ei muutoksia
  ilman erillistä pyyntöä. Sisältöä (myös EN) lainataan tänne.
- **`sompasauna-site`** (tämä) = uusi sivusto, Eleventy.
- **`sompasauna-handbook`** = yhdistyskäsikirja, yksityinen. Arkaluontoinen
  aineisto (sopimukset, henkilötiedot) pidetään versionhallinnan ulkopuolella.
- Julkaisu toistaiseksi **väliaikaiseen osoitteeseen `new.sompasauna.fi`**
  tuotantosivun rinnalla, **käytössä oikeasti** (ei pelkkä mockup).
- **Hakukoneita ei päästetä sivulle tässä osoitteessa** (ei saa näkyä
  Googlessa `new.sompasauna.fi`). Toteutus: `site.noindex: true` →
  `<meta name="robots" content="noindex, nofollow">` joka sivulla +
  `/robots.txt` `Disallow: /`. Kääntyvät `noindex: false`:lla tuotantoon.
  Huom: sivua ei myöskään linkitetä mistään julkisesti. Jos se joskus silti
  ilmestyy hakuun → poisto Google Search Consolen kautta.
- Tuotantodomain `sompasauna.fi` siirretään vasta kun sivu on valmis
  (ohjeet `README.md`).
- DNS Cloudflaressa: `new` → `iipponen-sompasauna.github.io` (CNAME,
  suositus **DNS only / harmaa pilvi**, jotta GitHubin HTTPS-sertti myöntyy).

### Kolme kantavaa periaatetta (koskee jokaista muutosta)

1. **Saavutettavuus** — WCAG 2.1 AA + Suomen saavutettavuusdirektiivi.
2. **FI + EN aina yhdenmukaisina** — sama muutos molempiin samassa PR:ssä,
   URL-vastaavuus (`/saapuminen/` ↔ `/en/arrival/`), kielenvaihto vie
   vastaavalle sivulle, selkeä yleiskieli molemmissa.
3. **Mobiili edellä** — suunnittelu ~360 px:lle, ei vaakaskrollia,
   bodyfontti ≥ 16 px.

### Visuaalinen suunta — "Ajopuu & meri"

Lähtökohta: nykyinen kulta + musta + palikkafontti tuntuu raskaalta.
Toive: **tuoreempi, viileämpi, rauhallisempi ja selkeämpi** ilme. Fiilis
haettu talkookuvista (harmaantunut lauta, mäntyranta, Itämeri, kirkas
kylmä valo).

**Paletti**

| Rooli | Vaalea | Tumma |
|---|---|---|
| Pohja | `#F7F5EF` (lämmin, vaalea koivunvalkoinen) | `#161A1B` |
| Pinta | `#FFFFFF` | `#1E2426` |
| Teksti | `#22282B` | `#E9E5DC` |
| Kakkosteksti | `#3F484B` | `#C4C1B8` |
| Ajopuun harmaa | `#6B7078` | `#909799` |
| Hiusviiva | `#E7E2D4` | `#2E3639` |
| **Aksentti (meri)** | `#356E72` | `#74B4B2` |
| Löyly-status (poltettu oranssi) | `#BC5A38` | `#E28C66` |

- **Yksi aksenttiväri** (meren sinivihreä). Poltettu oranssi **vain**
  "onko sauna lämmin" -tilassa, ei muualla.
- Käyttäjä piti aiempaa vaaleaa sävyä hieman liian tummana → vaaleaa
  pohjaa on **vaalennettu ja lämmitetty** porttauksessa.

**Typografia**

- **Fraunces** — otsikot ja tunnus. Vain isot koot ja sääntönumerot.
- **Public Sans** — leipäteksti, navigaatio, tekstitykset. Säilyy
  nykyisestä; hyvä suomen merkistö.
- Rubik Mono One poistuu.

**Layout**

- Yksi kapea palsta (~42 rem), reilusti ilmaa, **hiusviivat laatikoiden
  sijaan**. Valokuvat kantavat lämmön, käyttöliittymä pysyy hiljaisena.
- Otsikko on väite, ei iso kuvahässäkkä. Ei `100vh`-heroa.
- 9 sääntöä listana, numerot Fraunces-antiikvalla meren värissä.

### Kielivalitsin (FI / EN)

- **NZ Education Design System -tyylinen segmenttivalitsin**: reunustettu
  pilleri, molemmat kielet aina näkyvissä, aktiivinen korostettu +
  aksenttivärinen alleviivausindikaattori.
- Sijainti: header, vanhan kielilinkin paikalla.
- Toteutus: kaksi linkkiä, `aria-current` ja `href` lasketaan sivun
  kieliparista (`ref`-avain front matterissa). Linkki toimii ilman JS:ää.

### Teemavalitsin (Auto / Vaalea / Tumma)

- **Sama segmenttipilleri** kuin kielivalitsimessa. Ikonit ◐ / ☀ / ☾.
- `role="group"`, `aria-pressed`, jokaisella `aria-label` + `title`,
  näppäimistökäyttö, `prefers-reduced-motion` kunnioitetaan.
- Oletus = **Auto** (laitteen `prefers-color-scheme`).
- **Sijoituspaikka headerissa päätetään myöhemmin.**

### Valintojen muisti selaimessa

- **Teema:** `localStorage["sompa-theme"]` = `light` | `dark` | (puuttuu = auto).
  Blokkaava inline-skripti `<head>`:n alussa asettaa `data-theme`:n **ennen
  ensimmäistä maalausta** (ei välähdystä). Nappien kytkentä erillisenä
  `defer`-skriptinä. Ei evästettä (staattinen host). "Auto" = `@media
  prefers-color-scheme` hoitaa myös OS-muutoksen live.
- **Kieli:** URL on totuus (`/` vs `/en/`), valitsin = linkki vastinsivulle.
  Lisäksi kevyt muisti: klikatessa `localStorage["sompa-lang"]` = `fi` | `en`,
  ja **vain juuressa** (`/` tai `/en/`) inline-skripti ohjaa
  `location.replace()`:llä tallennettuun kieleen. Ei uudelleenohjausta
  syvemmillä sivuilla. **Ei selainkielen automaattitunnistusta v1:ssä.**
  Silmukkasuoja.
- Kaikki `try/catch`. Ilman JS:ää tai storagea: teema = OS, kieli = nykyinen
  URL. Molemmat toimivat.
- **Origin-kohtaisuus:** valinnat eivät siirry `new.sompasauna.fi` →
  `sompasauna.fi` domainin vaihdossa. Kertaluontoinen haitta.
- **Tietosuoja:** seloste mainitsee tämän (`src/tietosuoja.md`). Ei vaadi
  suostumusbanneria (käyttäjän pyytämä toiminto). EN-vastine kun EN-sivu
  tehdään.

### Englanninkielinen sisältö

- **Lähde on olemassa** vanhalla sivustolla (repo `Sompasauna`), ihmisen
  kirjoittamaa idiomaattista englantia → **portataan, ei konekäännetä**.
- FI ↔ EN -parit vanhalla sivulla:
  `index` ↔ `home` · `yhdistys` ↔ `association` · `saapuminen` ↔ `arrival`
  · `medialle` ↔ `media` · `tietosuojaseloste` ↔ `privacy_policy`.
- Lähteessä pari kirjoitusvirhettä siivottavaksi: "Don't be stub**i**d",
  "wants **so** support us".
- Uudet sivut (sauna, aukiolot, jäsenyys) EN kirjoitetaan; jäsenyys-teksti
  löytyy tosin jo `home` + `association` -sivuilta.
- **EN-teline pystytetään ennen kuin sisältöä kertyy lisää** — muuten
  jokainen uusi FI-sivu kasvattaa käännösvelkaa.

---

## Sisältöpuutteet — kävijän näkökulmasta (työjono)

Sivuston kohderyhmä on saunalle tulevat kävijät, usein puhelimella ulkona.
Kävijän kysymysjärjestys: *onko lämmin nyt → miten pääsen sinne → mitä pitää
tietää ennen kuin lähden → miten sauna oikeasti toimii.*

**Ensin (kävijäkriittistä, puuttuu nyt):**

- [ ] **"Näin saunot" / ensivierailu** — miten lämmitys toimii, tuoko puut
      itse, kauanko kestää, löylyetiketti, vessa, vesi.
- [ ] **Kunnon saapumisohje** — julkinen liikenne (lähin metro Kalasatama +
      kävelyreitti), **kartta**, maamerkit, pyöräparkki.
- [ ] **Usein kysyttyä (FAQ)** — kokoaa ison osan yllä olevasta.
- [ ] **Telegram-ryhmien ja somen linkit** näkyviin (Ilmoitustaulu,
      Turinaruutu, Instagram, Facebook).
- [ ] **SafeSompis-lomakkeen linkki** (sääntö 7 viittaa siihen, linkkiä ei ole).
- [ ] **Vessatieto** (yleisin kysymys heti veden jälkeen).

**Sitten:**

- [ ] **Englanninkielinen versio** (lähde vanhalla sivulla).
- [ ] **Talvi & avanto** — sijainti, hoidetaanko, turvallisuus, tikkaat.
- [ ] **Turvallisuus kävijälle** — ei valvontaa, vesiturvallisuus, lapset,
      alkoholilinjaus, hätätilanne (osoite hätäkeskukselle, opastus).
- [ ] **Valokuvia joka sivulle** — sisäänkäynti, saunat, maisema.
- [ ] Saunojen kuvaukset (Temppeli / Mansikka / Kolmonen).

**Kun mahdollista:**

- [ ] **Live-lämpötila** mittarilta. Huom: nykysivukaan ei näytä sitä,
      `sompis-sensor-api` on vuodelta 2019 → selvitä toimiiko sensori
      ennen kuin lupaat sen käyttöliittymässä.
- [ ] Aukiolot-sivun nimi & sisältö (nyt tyhjä; "aina auki" → "Onko lämmin?").

## Rakenne / navigaatio (huomioita)

- Navigaatiossa oli 7 kohtaa; *Medialle* ja *Tietosuoja* eivät kiinnosta
  kävijää → harkitse jako kävijälle / yhdistykselle (jälkimmäiset footeriin).
- Mobiilin lopullinen header tarvitsee oman valikkoratkaisunsa
  (linkit + kaksi valitsinta ei mahdu kapealle ikuisesti).
- "Aukiolot" on harhaanjohtava kun sauna on aina auki.

## Tekniset reunaehdot

- **Ei Node.js:ää kehityskoneella** (`brew install node` kaatuu vanhentuneisiin
  Xcode Command Line Toolsiin) → Eleventy-build varmennetaan CI:ssä.
- GitHub Pages: `deploy`-job vaati kertaluontoisen käyttöönoton
  (Settings → Pages → Source: GitHub Actions).
- Repo yksityinen; Pages julkaisee silti julkiseen osoitteeseen.
