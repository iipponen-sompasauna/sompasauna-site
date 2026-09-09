module.exports = {
  name: "Sompasauna",
  description:
    "Sompasauna on Helsingin Sompasaaressa sijaitseva ilmainen, kaikille avoin yleisösauna. Aina auki, ei henkilökuntaa, sekasauna kaikille.",
  // Väliaikainen julkaisuosoite. Kun tästä tulee tuotanto, vaihda
  // "https://sompasauna.fi" ja aseta noindex: false.
  url: "https://new.sompasauna.fi",
  noindex: true,
  email: "sompasauna@sompasauna.fi",
  boardEmail: "hallitus@sompasauna.fi",
  address: "Kansanpuistonpolku 5, 00570 Helsinki",
  businessId: "2661146-7",
  fundraisingPermit: "RA/2023/1573",
  iban: "FI94 7997 7997 2766 42",
  // Kielet: eka on oletus (juuri "/"). Navigaatio ja UI-tekstit: _data/i18n.js
  languages: [
    { code: "fi", label: "FI", home: "/" },
    { code: "en", label: "EN", home: "/en/" },
  ],
};
