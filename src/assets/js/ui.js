/* Käyttöliittymän skriptit — ladataan defer, saa ajautua maalauksen jälkeen.
   Teeman "ei välähdystä" -asetus tehdään erikseen base.njk:n inline-skriptissä. */
(function () {
  "use strict";

  /* --- Teemavalitsin: Auto / Vaalea / Tumma --- */
  var box = document.querySelector(".theme-toggle");
  if (box) {
    var root = document.documentElement;

    var stored = function () {
      try { return localStorage.getItem("sompa-theme") || "auto"; }
      catch (e) { return "auto"; }
    };

    var apply = function (choice) {
      if (choice === "light" || choice === "dark") root.dataset.theme = choice;
      else delete root.dataset.theme;
      box.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.themeChoice === choice));
      });
      try {
        if (choice === "auto") localStorage.removeItem("sompa-theme");
        else localStorage.setItem("sompa-theme", choice);
      } catch (e) {}
    };

    apply(stored());
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) apply(b.dataset.themeChoice);
    });
  }

  /* --- Kielivalinnan muisti: tallenna ennen siirtymää --- */
  document.querySelectorAll("[data-set-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("sompa-lang", a.dataset.setLang); }
      catch (e) {}
    });
  });
})();
