/* Lit content/biens.json et génère les cartes, puis charge site.js.
   Si le chargement échoue, les cartes HTML d'origine restent affichées. */
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var fm = new Intl.NumberFormat("fr-FR");

  function card(b, i) {
    var loc = b.statut === "location";
    var tag = loc ? "À louer" : "À vendre";
    var k = b.statut + " " + b.type;
    var prix = fm.format(b.prix).replace(/\u202f|\u00a0/g, " ") + (loc ? " FCFA/mois" : " FCFA");
    var facts = [];
    if (b.chambres > 0) facts.push(b.chambres + (b.chambres > 1 ? " chambres" : " chambre"));
    if (b.salles_de_bain > 0) facts.push(b.salles_de_bain + (b.salles_de_bain > 1 ? " salles de bain" : " salle de bain"));
    if (b.surface > 0) facts.push(b.surface + " m²");
    (b.extras || []).forEach(function (x) { facts.push(x); });
    var img = b.image
      ? '<img loading="lazy" src="' + esc(b.image) + '" alt="' + esc(b.image_alt || b.titre) + '" onerror="this.remove()">'
      : "";
    var ph = '<svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="gx' + i + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ec4e6"/><stop offset="1" stop-color="#f3efe6"/></linearGradient></defs><rect width="400" height="190" fill="url(#gx' + i + ')"/><rect y="150" width="400" height="40" fill="#8bb26b"/><rect x="110" y="70" width="180" height="80" fill="#fff"/><rect x="95" y="58" width="210" height="16" fill="#14284b"/></svg>';
    return '<article class="card" data-k="' + esc(k) + '" data-v="' + esc(b.ville) + '" data-p="' + (+b.prix || 0) + '">' +
      '<div class="pic"><span class="tag">' + tag + "</span>" + img + ph + "</div>" +
      '<div class="in"><h3>' + esc(b.titre) + '</h3><div class="loc">' + esc(b.localisation) + "</div>" +
      '<div class="facts">' + facts.map(function (f) { return "<span>" + esc(f) + "</span>"; }).join("") + "</div>" +
      '<div class="price">' + prix + '<a href="#" data-b="' + esc(b.titre) + '">Organiser une visite</a></div></div></article>';
  }

  function loadSite() {
    var s = document.createElement("script");
    s.src = "site.js";
    document.body.appendChild(s);
  }

  fetch("content/biens.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (d) {
      var all = (d.biens || []).filter(function (b) { return b.actif !== false; });
      var list = document.getElementById("list");
      var feat = document.getElementById("feat");
      if (list) list.innerHTML = all.map(card).join("");
      if (feat) feat.innerHTML = all.filter(function (b) { return b.vedette; }).slice(0, 3).map(card).join("");
    })
    .catch(function () { /* garde le HTML statique */ })
    .then(loadSite);
})();
