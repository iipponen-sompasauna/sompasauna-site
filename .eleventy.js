const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Kopioi staattiset tiedostot sellaisenaan
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

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
    // GitHub Pages project site: aseta PATH_PREFIX=/sompasauna-site/
    // Oman domainin (sompasauna.fi) kanssa jätä asettamatta -> "/"
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
