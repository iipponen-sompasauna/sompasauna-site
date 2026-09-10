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

  // Lahjoitukset. Stripe Payment Links (hostattu maksusivu, ei backendiä).
  // HUOM: alla on TEST-linkki paikanpitäjänä. Ennen tuotantoa:
  //  1) Luo Stripe-tilillä (Sompasaunaseura ry) kaksi Payment Linkiä:
  //     - kertalahjoitus, "customer chooses amount", ehdotukset 5/10/20/50 €
  //     - kuukausilahjoitus, toistuva hinta
  //  2) Aseta redirect maksun jälkeen -> https://sompasauna.fi/kiitos/
  //  3) Vaihda molemmat URLit tähän.
  donate: {
    stripeOnce: "https://donate.stripe.com/test_4gM7sL2OB9oD4dVgYj3AY01",
    stripeMonthly: "https://donate.stripe.com/test_4gM7sL2OB9oD4dVgYj3AY01",
    mobilePay: "80501",
  },

  // Kielet: eka on oletus (juuri "/"). Navigaatio ja UI-tekstit: _data/i18n.js
  languages: [
    { code: "fi", label: "FI", home: "/" },
    { code: "en", label: "EN", home: "/en/" },
  ],
};
