const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Kopioi staattiset tiedostot sellaisenaan
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // GitHub Pages -custom domain: CNAME kopioidaan julkaisun juureen.
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  // Kirjoittaa kaikki juurisuhteelliset URLit (/foo/) pathPrefixin mukaisiksi.
  // Älä käytä samaan aikaan `| url` -suodatinta templaateissa.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Oma domain (new.sompasauna.fi) tarjoillaan juuresta -> "/".
    // Jos joskus julkaistaan project site -osoitteessa, aseta PATH_PREFIX.
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
