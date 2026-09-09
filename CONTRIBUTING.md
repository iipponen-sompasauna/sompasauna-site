# Kehitysohjeet

Nämä periaatteet koskevat **jokaista** muutosta sivustolle. Käytä alinta
tarkistuslistaa PR:n katselmoinnissa.

Kolme kantavaa periaatetta:

1. [Saavutettavuus ja käytettävyys](#1-saavutettavuus-ja-käytettävyys)
2. [Kieliversiot pysyvät yhdenmukaisina](#2-kieliversiot-fi--en-pysyvät-yhdenmukaisina)
3. [Mobiili edellä](#3-mobiili-edellä)

---

## 1. Saavutettavuus ja käytettävyys

Tavoite: **WCAG 2.1 AA** ja Suomen saavutettavuusdirektiivin (laki
digitaalisten palvelujen tarjoamisesta 306/2019) vaatimukset täyttyvät.

**Rakenne**
- Semanttinen HTML: `<header> <nav> <main> <footer>`, listat listoina,
  painikkeet `<button>`, linkit `<a>`.
- Täsmälleen yksi `<h1>` per sivu; otsikkotasot järjestyksessä (ei hyppyä
  h2 → h4).
- Jokaisella sivulla yksilöllinen, kuvaava `<title>`.
- `skip-link` sisältöön säilyy (on jo `base.njk`:ssa).

**Sisältö**
- Kaikilla `<img>`-elementeillä `alt`. Koristekuvalle `alt=""`. Alt kertoo
  *tarkoituksen*, ei "kuva ...".
- Linkkiteksti ymmärrettävä irrallaan ("Katso saapumisohjeet", ei "tästä" /
  "lue lisää").
- Tieto ei koskaan pelkän värin varassa (esim. "punainen = kiinni" ei riitä,
  tarvitaan myös teksti/ikoni).

**Näppäimistö ja fokus**
- Kaikki toiminta onnistuu näppäimistöllä. Tab-järjestys seuraa
  lukujärjestystä.
- Näkyvä fokusindikaattori. Älä poista `outline`ia korvaamatta sitä
  vähintään yhtä selkeällä tyylillä.
- Ei toiminnallisuutta pelkän hoverin takana (ei toimi kosketuksella).

**Värit ja koko**
- Kontrasti: teksti ≥ 4.5:1, suuri teksti ja olennaiset UI-elementit ≥ 3:1.
  Tarkista **sekä vaalea että tumma teema**.
- Kosketuskohteet ≥ 44 × 44 px (min. WCAG 2.2: 24 × 24), riittävä väli.
- Teksti skaalautuu 200 % asti ilman että sisältöä katoaa tai menee
  päällekkäin.
- `prefers-reduced-motion`: tarjoa kevennetty/pysäytetty versio animaatioista.

**Lomakkeet** (kun tulee)
- Jokaisella kentällä näkyvä `<label for>`. Virheilmoitukset tekstinä,
  kentän vieressä, ei pelkkä värikehys.

**Ennen mergeä testaa**
- Automaattinen: Lighthouse **tai** axe DevTools → ei virheitä.
- Näppäimistö: läpi sivun pelkällä Tab / Enter / Esc.
- Ruudunlukija: pikakuuntelu VoiceOverilla (macOS ⌘+F5).
- Zoom 200 % ja 320 px leveys: ei vaakaskrollia, mitään ei leikkaudu.

---

## 2. Kieliversiot (FI + EN) pysyvät yhdenmukaisina

Sivusto on kaksikielinen. **Kumpikaan kieli ei saa jäädä jälkeen.**

- Jokaisella sisältösivulla on oltava sekä suomen- että englanninkielinen
  vastine ennen julkaisua. Ei "vain suomeksi" -sivuja tai -osioita.
- **Sama muutos molempiin kieliin samassa PR:ssä.** Jos muokkaat
  `src/saapuminen.md`, muokkaat myös `src/en/arrival.md` samalla.
- Rakenne peilaa: sama sivumäärä, sama navigaation järjestys, vastaavat
  URLit (esim. `/saapuminen/` ↔ `/en/arrival/`).
- Kielenvaihtolinkki vie **vastaavalle sivulle**, ei aina etusivulle.
- Merkinnät kunnossa: `<html lang="fi">` / `lang="en"`, sivujen välillä
  `hreflang`-linkitys.
- Jos sisältö on väliaikaisesti vain toisella kielellä, se ei mene
  `main`-haaraan – pidä keskeneräinen käännös omassa haarassaan.

### Selkeä kieli (molemmat kielet)
- Lyhyet virkkeet, yksi ajatus kerrallaan.
- Suora puhuttelu ("Ota mukaan pyyhe"), toimintaohjeet aktiivissa.
- Vältä hallinto- ja järjestöjargonia; jos termi on pakko, selitä se.
- Käytä samoja termejä johdonmukaisesti (esim. aina "sauna", ei välillä
  "löylytupa").

---

## 3. Mobiili edellä

Suurin osa kävijöistä tulee puhelimella, usein rannassa ulkona.

- **Suunnittele ensin ~360 px leveydelle**, laajenna sieltä ylöspäin
  media queryillä.
- **Ei vaakasuuntaista skrollia millään leveydellä.** Leveä sisältö
  (taulukot, kartat, upotteet, koodilohkot) omaan
  `overflow-x: auto` -laatikkoon.
- Bodyn tekstikoko ≥ 16 px (pienempi zoomaa iOS:llä inputteja).
- Kosketuskohteet ja navigaatio toimivat peukalolla; napit eivät liian
  lähellä toisiaan tai ruudun reunaa.
- Kuvat responsiivisia (`max-width: 100%`) ja oikeasti mobiilikokoisia –
  älä tarjoile 2000 px kuvaa 360 px ruudulle. Käytä nykyaikaista formaattia
  (WebP/AVIF) kun mahdollista.
- Testaa **oikealla laitteella tai** selaimen la-emulaatiolla vähintään:
  360 × 640 (pieni Android), 390 × 844 (iPhone), tabletti.
- Lighthouse **mobiiliprofiililla**: Performance ja Accessibility vihreällä.

---

## PR-tarkistuslista

- [ ] Yksi `<h1>`, otsikkotasot järjestyksessä, `<title>` yksilöllinen
- [ ] Kuvilla `alt`; linkkitekstit ymmärrettäviä irrallaan
- [ ] Näppäimistöllä läpikuljettavissa, fokus näkyy
- [ ] Kontrastit ok vaaleassa **ja** tummassa teemassa
- [ ] 320 px leveys ja 200 % zoom: ei vaakaskrollia, mikään ei leikkaudu
- [ ] Kosketuskohteet ≥ 44 px, bodyfontti ≥ 16 px
- [ ] **Molemmat kieliversiot (FI + EN) päivitetty tässä PR:ssä**
- [ ] Kielenvaihtolinkki osoittaa vastaavalle sivulle
- [ ] Kieli on selkeää: lyhyet virkkeet, aktiivi, ei jargonia
- [ ] Lighthouse/axe ajettu, ei uusia virheitä
