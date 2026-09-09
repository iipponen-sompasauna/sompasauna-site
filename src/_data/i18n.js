// Navigaatio ja käyttöliittymän tekstit kielittäin.
// nav-kohtien `ref` viittaa sivun front matterin `ref`-avaimeen; linkki
// muodostetaan `pageUrl`-suodattimella ja näytetään vain jos sivu on
// olemassa kyseisellä kielellä.
module.exports = {
  fi: {
    skip: "Siirry sisältöön",
    menu: "Päävalikko",
    nav: [
      { ref: "home", text: "Etusivu" },
      { ref: "sauna", text: "Sauna" },
      { ref: "aukiolot", text: "Aukiolot" },
      { ref: "arrival", text: "Saapuminen" },
      { ref: "membership", text: "Jäsenyys" },
      { ref: "association", text: "Yhdistys" },
      { ref: "media", text: "Medialle" },
    ],
    theme: {
      group: "Teema",
      auto: "Laitteen mukaan",
      light: "Vaalea",
      dark: "Tumma",
    },
    langGroup: "Kieli / Language",
    footer: {
      privacy: "Tietosuojaseloste",
      langLabel: "Kieli",
    },
  },
  en: {
    skip: "Skip to content",
    menu: "Main menu",
    nav: [
      { ref: "home", text: "Home" },
      { ref: "sauna", text: "The sauna" },
      { ref: "aukiolot", text: "Opening hours" },
      { ref: "arrival", text: "Getting there" },
      { ref: "membership", text: "Membership" },
      { ref: "association", text: "Association" },
      { ref: "media", text: "For the media" },
    ],
    theme: {
      group: "Theme",
      auto: "Follow device",
      light: "Light",
      dark: "Dark",
    },
    langGroup: "Kieli / Language",
    footer: {
      privacy: "Privacy policy",
      langLabel: "Language",
    },
  },
};
