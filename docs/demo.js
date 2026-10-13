function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo,
  useCallback
} = React;
const demoReleases = [{
  "id": 1,
  "title": "Lagune",
  "artist_name": "Aya Nova",
  "artist_alias": "Aya Nova",
  "owner_email": "artiste1@example.com",
  "release_type": "Single",
  "release_date": "2026-12-12",
  "timing_status": "Préavis conforme",
  "status": "received",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Aya Nova\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Lagune\", \"main\": \"Aya Nova\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Aya Nova\"}], \"composers\": [{\"id\": 1, \"name\": \"Aya Nova\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Lagune\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 2,
  "title": "Minuit à Abidjan",
  "artist_name": "Kéa",
  "artist_alias": "Kéa",
  "owner_email": "artiste2@example.com",
  "release_type": "EP",
  "release_date": "2026-12-13",
  "timing_status": "Préavis conforme",
  "status": "in_review",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Kéa\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Minuit à Abidjan\", \"main\": \"Kéa\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Kéa\"}], \"composers\": [{\"id\": 1, \"name\": \"Kéa\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Minuit à Abidjan\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 3,
  "title": "Soleil rouge",
  "artist_name": "Nalo",
  "artist_alias": "Nalo",
  "owner_email": "artiste3@example.com",
  "release_type": "Single",
  "release_date": "2026-12-14",
  "timing_status": "Préavis conforme",
  "status": "corrections_requested",
  "pending_corrections": 1,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Nalo\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Soleil rouge\", \"main\": \"Nalo\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Nalo\"}], \"composers\": [{\"id\": 1, \"name\": \"Nalo\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Soleil rouge\", \"urgent\": false, \"confirmed\": true}",
  "corrections": [{
    "id": 31,
    "section": "assets",
    "message": "Merci de fournir la cover définitive au format TIFF, 3000 × 3000 pixels.",
    "status": "requested",
    "response": "",
    "created_at": "2026-10-13 08:00:00",
    "responded_at": null,
    "due_at": "2026-11-20"
  }]
}, {
  "id": 4,
  "title": "Horizon",
  "artist_name": "Luma",
  "artist_alias": "Luma",
  "owner_email": "artiste4@example.com",
  "release_type": "Album",
  "release_date": "2026-12-15",
  "timing_status": "Préavis conforme",
  "status": "approved",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Luma\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Horizon\", \"main\": \"Luma\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Luma\"}], \"composers\": [{\"id\": 1, \"name\": \"Luma\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Horizon\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 5,
  "title": "On danse",
  "artist_name": "Seya",
  "artist_alias": "Seya",
  "owner_email": "artiste5@example.com",
  "release_type": "Single",
  "release_date": "2026-12-16",
  "timing_status": "Préavis conforme",
  "status": "delivered",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Seya\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"On danse\", \"main\": \"Seya\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Seya\"}], \"composers\": [{\"id\": 1, \"name\": \"Seya\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"On danse\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 6,
  "title": "Échos",
  "artist_name": "Milo",
  "artist_alias": "Milo",
  "owner_email": "artiste6@example.com",
  "release_type": "EP",
  "release_date": "2026-12-17",
  "timing_status": "Préavis conforme",
  "status": "received",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Milo\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Échos\", \"main\": \"Milo\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Milo\"}], \"composers\": [{\"id\": 1, \"name\": \"Milo\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Échos\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}];
const demoUser = {
  email: 'artiste1@example.com',
  name: 'Aya Nova',
  artist_name: 'Aya Nova',
  status: 'approved',
  role: 'user'
};
const demoMembers = [{
  email: 'equipe@example.com',
  display_name: 'Équipe Démo',
  role: 'admin',
  active: 1,
  created_at: '2026-10-12'
}];
const localStorage = {
  getItem() {
    return null;
  },
  setItem() {},
  removeItem() {}
};
function demoNotice() {
  const el = document.getElementById('demo-toast');
  el.textContent = 'Démonstration uniquement · aucune donnée envoyée.';
  el.hidden = false;
  setTimeout(() => el.hidden = true, 3200);
}
async function demoData(path, init = {}) {
  const method = init.method || 'GET';
  if (method !== 'GET') {
    demoNotice();
    return {
      error: 'Démonstration uniquement : cette action ne transmet aucune donnée.'
    };
  }
  if (path === '/api/me') return {
    user: demoUser
  };
  if (path.includes('/members')) return {
    members: demoMembers
  };
  if (path.endsWith('/releases')) return {
    releases: path.includes('/team/') ? demoReleases : demoReleases.slice(0, 3)
  };
  const id = Number(path.split('/').pop());
  const release = demoReleases.find(r => r.id === id) || demoReleases[0];
  return {
    release,
    corrections: release.corrections,
    assets: [{
      id: 1,
      kind: 'cover',
      object_key: 'demo/cover.tiff',
      filename: release.title + ' — cover.tiff',
      content_type: 'image/tiff',
      size: 12000000,
      created_at: '2026-10-12'
    }, {
      id: 2,
      kind: 'master',
      object_key: 'demo/master.wav',
      filename: release.title + ' — master.wav',
      content_type: 'audio/wav',
      size: 42000000,
      created_at: '2026-10-12'
    }],
    history: [{
      id: 1,
      actor_email: release.owner_email,
      actor_role: 'user',
      action: 'release.submitted',
      details: '{}',
      created_at: '2026-10-12 09:30:00'
    }],
    revisions: [{
      id: 1,
      revision_number: 1,
      actor_email: release.owner_email,
      change_summary: 'Dossier initial — exemple fictif',
      created_at: '2026-10-12 09:30:00'
    }]
  };
}
const fetch = async (path, init = {}) => ({
  ok: !init.method || init.method === 'GET',
  json: async () => demoData(path, init)
});
function Link({
  href,
  children,
  ...props
}) {
  return React.createElement("a", _extends({
    href: href === '/' ? '#dashboard' : '#' + href.slice(1)
  }, props), children);
}
const mkA = id => ({
  id,
  name: "",
  spotify: "",
  noSpotify: false
});
const emptyCredits = () => ({
  beatmakers: [],
  sessionArtists: [],
  authors: [],
  composers: []
});
const mkT = id => ({
  id,
  title: "",
  main: "",
  isrc: "",
  master: "",
  feats: [],
  credits: emptyCredits(),
  version: "Original",
  explicit: "Non",
  language: "Français"
});
const steps = ["Projet", "Artistes", "Tracklist", "Assets", "Pitch", "Planning", "Vérification"];
const genres = ["Afrobeats", "Rap / Hip-hop", "R&B / Soul", "Coupé-décalé", "Zouglou", "Amapiano", "Afropop", "Pop", "Gospel", "Reggae / Dancehall", "Électro", "Autre"];
const moods = ["Énergique", "Festif", "Dansant", "Chill", "Romantique", "Sensuel", "Mélancolique", "Sombre", "Motivant", "Spirituel"];
function Logo() {
  return React.createElement("img", {
    className: "logo",
    src: "./trackr-logo.png",
    alt: "trackR"
  });
}
function normalizeCredits(value) {
  const roles = [["beatmakers", false], ["sessionArtists", true], ["authors", false], ["composers", false]];
  return Object.fromEntries(roles.map(([role, hasInstrument]) => [role, (Array.isArray(value?.[role]) ? value[role] : []).filter(c => c && typeof c.name === "string").map((c, i) => ({
    id: Number.isFinite(c.id) ? c.id : Date.now() + i,
    name: c.name,
    instrument: hasInstrument && typeof c.instrument === "string" ? c.instrument : ""
  }))]));
}
function normalizeTracks(value) {
  return Array.isArray(value) ? value.map((track, i) => ({
    ...mkT(Number.isFinite(track?.id) ? track.id : Date.now() + i),
    ...track,
    credits: normalizeCredits(track?.credits)
  })) : [];
}
const guideTips = [{
  tag: "MISE EN LIGNE",
  title: "Anticipez votre sortie",
  text: "Prévoyez au moins 15 jours ouvrés. Un dossier prêt 4 semaines avant laisse aussi plus de temps pour le pitch.",
  href: "/guides/mises-en-ligne"
}, {
  tag: "FICHIERS AUDIO",
  title: "Un master WAV par piste",
  text: "Vérifiez le format WAV, 44,1 kHz et 16 bits minimum, puis contrôlez que chaque fichier correspond à la bonne piste.",
  href: "/guides/mises-en-ligne"
}, {
  tag: "COVER",
  title: "Préparez une cover conforme",
  text: "La cover doit être carrée, en TIFF et mesurer 3000 × 3000 pixels.",
  href: "/guides/mises-en-ligne"
}, {
  tag: "RÉSEAUX SOCIAUX",
  title: "Attention aux extraits TikTok",
  text: "Un extrait musical de plus de 59 secondes peut être bloqué automatiquement.",
  href: "/guides/reseaux-sociaux"
}, {
  tag: "PROMOTION",
  title: "Demandez une validation avant publication",
  text: "Pour certains contenus Facebook ou Instagram, transmettez la plateforme, le format et la durée à l’équipe trackR en amont.",
  href: "/guides/reseaux-sociaux"
}];
function GuideTipSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(i => (i + 1) % guideTips.length), 7000);
    return () => window.clearInterval(timer);
  }, []);
  const tip = guideTips[active];
  return React.createElement("section", {
    className: "guide-slider",
    "aria-label": "Astuces des guides"
  }, React.createElement("div", {
    className: "guide-slide-copy",
    "aria-live": "polite"
  }, React.createElement("span", {
    className: "guide-slide-tag"
  }, "ASTUCE \xB7 ", tip.tag), React.createElement("h2", null, tip.title), React.createElement("p", null, tip.text), React.createElement("a", {
    href: "#" + tip.href.slice(1)
  }, "Lire le guide ", React.createElement("span", null, "\u2192"))), React.createElement("div", {
    className: "guide-slide-controls"
  }, React.createElement("button", {
    type: "button",
    "aria-label": "Astuce pr\xE9c\xE9dente",
    onClick: () => setActive(i => (i - 1 + guideTips.length) % guideTips.length)
  }, "\u2039"), React.createElement("div", {
    className: "guide-slide-dots"
  }, guideTips.map((item, i) => React.createElement("button", {
    type: "button",
    key: item.title,
    className: i === active ? "active" : "",
    "aria-label": `Afficher l’astuce ${i + 1}`,
    "aria-current": i === active ? "true" : undefined,
    onClick: () => setActive(i)
  }))), React.createElement("button", {
    type: "button",
    "aria-label": "Astuce suivante",
    onClick: () => setActive(i => (i + 1) % guideTips.length)
  }, "\u203A")));
}
function Onboarding({
  u
}) {
  const [err, setErr] = useState("");
  async function go(e) {
    e.preventDefault();
    const r = await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))
    });
    r.ok ? location.reload() : setErr((await r.json()).error);
  }
  return React.createElement("main", {
    className: "gate-page"
  }, React.createElement(Logo, null), React.createElement("section", {
    className: "gate-card"
  }, React.createElement("form", {
    onSubmit: go
  }, React.createElement("p", {
    className: "eyebrow"
  }, "ONBOARDING DISTRIBU\xC9"), React.createElement("h1", null, "Cr\xE9ez votre espace"), React.createElement("p", null, "Renseignez votre profil une seule fois. Vous pourrez ensuite pr\xE9parer et suivre vos sorties."), React.createElement("div", {
    className: "grid"
  }, React.createElement("label", null, "Nom et pr\xE9nom *", React.createElement("input", {
    name: "name",
    required: true,
    defaultValue: u.name
  })), React.createElement("label", null, "Nom d\u2019artiste / structure *", React.createElement("input", {
    name: "artistName",
    required: true
  })), React.createElement("label", null, "T\xE9l\xE9phone *", React.createElement("input", {
    name: "phone",
    required: true
  })), React.createElement("label", null, "Pays *", React.createElement("input", {
    name: "country",
    required: true,
    defaultValue: "C\xF4te d\u2019Ivoire"
  })), React.createElement("label", null, "Spotify", React.createElement("input", {
    name: "spotify",
    type: "url"
  })), React.createElement("label", null, "Instagram", React.createElement("input", {
    name: "instagram",
    type: "url"
  }))), err && React.createElement("p", {
    className: "form-error"
  }, err), React.createElement("button", {
    className: "primary"
  }, "CR\xC9ER MON ESPACE ", React.createElement("span", null, "\u2192"))), React.createElement("a", {
    className: "logout-link",
    href: "#login"
  }, "Se d\xE9connecter")));
}
function Dashboard({
  create,
  edit
}) {
  const [rels, setRels] = useState([]),
    [open, setOpen] = useState(null),
    [answers, setAnswers] = useState({}),
    [error, setError] = useState("");
  const refresh = () => fetch("/api/releases").then(r => r.json()).then(d => setRels(d.releases || []));
  useEffect(() => {
    void refresh();
  }, []);
  async function answer(releaseId, correctionId) {
    const value = (answers[correctionId] || "").trim();
    if (value.length < 2) return;
    const res = await fetch(`/api/releases/${releaseId}/corrections/${correctionId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        response: value
      })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Envoi impossible.");
      return;
    }
    setError("");
    setAnswers(a => ({
      ...a,
      [correctionId]: ""
    }));
    await refresh();
  }
  return React.createElement("main", {
    className: "dashboard-page"
  }, React.createElement("header", null, React.createElement(Logo, null), React.createElement("nav", null, React.createElement("a", {
    href: "#guides"
  }, "Guides"), React.createElement("button", {
    className: "primary compact",
    onClick: create
  }, "\uFF0B Nouvelle mise en ligne"), React.createElement("a", {
    className: "account",
    href: "#login"
  }, "D\xE9connexion"))), React.createElement("section", {
    className: "dashboard-shell"
  }, React.createElement("p", {
    className: "eyebrow"
  }, "ESPACE DISTRIBU\xC9"), React.createElement("h1", null, "Mes mises en ligne"), React.createElement(GuideTipSlider, null), React.createElement("section", {
    className: "release-table"
  }, React.createElement("h2", null, "Mes demandes"), error && React.createElement("p", {
    className: "form-error"
  }, error), rels.length ? React.createElement("div", {
    className: "release-list"
  }, rels.map(r => {
    let p = {};
    try {
      p = JSON.parse(r.payload || "{}");
    } catch {}
    return React.createElement("article", {
      className: "release-item",
      key: r.id
    }, React.createElement("button", {
      type: "button",
      className: "release-summary",
      onClick: () => setOpen(open === r.id ? null : r.id)
    }, React.createElement("span", null, React.createElement("b", null, r.title), React.createElement("small", null, "R\xE9f. TRK-", String(r.id).padStart(5, "0"), " \xB7 ", r.release_type, " \xB7 sortie ", r.release_date)), React.createElement("span", {
      className: "pill"
    }, r.status === "received" ? "Demande reçue" : r.status === "corrections_requested" ? "Corrections demandées" : r.status === "in_review" ? "En relecture" : r.status), React.createElement("i", null, open === r.id ? "−" : "＋")), open === r.id && React.createElement("div", {
      className: "release-detail"
    }, React.createElement("div", null, React.createElement("b", null, "Planning"), React.createElement("span", null, r.timing_status)), React.createElement("div", null, React.createElement("b", null, "Genre / mood"), React.createElement("span", null, p.genre || "—", " \xB7 ", p.mood || "—")), React.createElement("div", null, React.createElement("b", null, "Tracklist"), React.createElement("span", null, (p.tracks || []).map((t, i) => `${i + 1}. ${t.title}`).join(" · ") || "—")), React.createElement("div", null, React.createElement("b", null, "Assets"), React.createElement("span", null, p.cover ? "Cover ✓" : "Cover manquante", " \xB7 ", (p.tracks || []).every(t => t.master) ? "Masters ✓" : "Master(s) manquant(s)")), React.createElement("div", null, React.createElement("b", null, "Soumise le"), React.createElement("span", null, r.created_at ? new Date(r.created_at + "Z").toLocaleDateString("fr-FR") : "—")), r.status === "corrections_requested" && React.createElement("button", {
      type: "button",
      className: "primary compact",
      onClick: () => edit(r)
    }, "Modifier le dossier et le renvoyer"), r.corrections?.length > 0 && React.createElement("section", {
      className: "artist-corrections"
    }, React.createElement("h4", null, "Corrections demand\xE9es par l\u2019\xE9quipe"), r.corrections.map(c => React.createElement("article", {
      key: c.id
    }, React.createElement("b", null, c.section), React.createElement("p", null, c.message), c.due_at && c.status === "requested" && React.createElement("small", null, "\xC0 traiter avant le ", new Date(c.due_at.replace(" ", "T").replace(/Z?$/, "Z")).toLocaleDateString("fr-FR")), c.status === "requested" ? React.createElement(React.Fragment, null, React.createElement("textarea", {
      "aria-label": "R\xE9ponse \xE0 la correction",
      placeholder: "Ajoutez un commentaire si n\xE9cessaire\u2026",
      value: answers[c.id] || "",
      onChange: e => setAnswers(a => ({
        ...a,
        [c.id]: e.target.value
      }))
    }), React.createElement("button", {
      type: "button",
      disabled: (answers[c.id] || "").trim().length < 2,
      onClick: () => void answer(r.id, c.id)
    }, "Envoyer un commentaire")) : React.createElement("small", null, c.status === "resubmitted" ? "Dossier renvoyé pour relecture" : "Réponse envoyée", " \xB7 ", c.response))))));
  })) : React.createElement("p", {
    className: "empty-state"
  }, "Vous n\u2019avez encore soumis aucune sortie."))));
}
function Home() {
  useEffect(() => {
    const show = () => setDash(true);
    window.addEventListener("demo-dashboard", show);
    return () => window.removeEventListener("demo-dashboard", show);
  }, []);
  const [u, setU] = useState(null),
    [loading, setLoading] = useState(true),
    [dash, setDash] = useState(true),
    [menu, setMenu] = useState(false),
    [step, setStep] = useState(1),
    [sent, setSent] = useState(false),
    [sending, setSending] = useState(false),
    [err, setErr] = useState(""),
    [draftReady, setDraftReady] = useState(false),
    [savedAt, setSavedAt] = useState(""),
    [editingRelease, setEditingRelease] = useState(null);
  const [type, setType] = useState("Single"),
    [title, setTitle] = useState(""),
    [genre, setGenre] = useState(""),
    [mood, setMood] = useState(""),
    [upc, setUpc] = useState(""),
    [artists, setArtists] = useState([mkA(1)]),
    [tracks, setTracks] = useState([mkT(1)]),
    [cover, setCover] = useState(""),
    [photos, setPhotos] = useState(""),
    [press, setPress] = useState(""),
    [pitch, setPitch] = useState(""),
    [priority, setPriority] = useState(""),
    [date, setDate] = useState(""),
    [urgent, setUrgent] = useState(false),
    [confirmed, setConfirmed] = useState(false);
  function editRelease(r) {
    let p = {};
    try {
      p = JSON.parse(r.payload || "{}");
    } catch {}
    setEditingRelease(r);
    setType(r.release_type);
    setTitle(r.title);
    setGenre(p.genre || "");
    setMood(p.mood || "");
    setUpc(p.upc || "");
    setArtists(p.artists?.length ? p.artists : [mkA(1)]);
    setTracks(p.tracks?.length ? normalizeTracks(p.tracks) : [mkT(1)]);
    setCover(p.cover || "");
    setPhotos(p.photos || "");
    setPress(p.press || "");
    setPitch(p.pitch || "");
    setPriority(p.priority || "");
    setDate(r.release_date || "");
    setUrgent(p.urgent === true);
    setConfirmed(p.confirmed === true);
    setStep(1);
    setErr("");
    setSent(false);
    setDash(false);
  }
  function startNew() {
    if (editingRelease) {
      let d = null;
      try {
        d = JSON.parse(localStorage.getItem("vma-release-draft") || "null");
      } catch {}
      setType(d?.type || "Single");
      setTitle(d?.title || "");
      setGenre(d?.genre || "");
      setMood(d?.mood || "");
      setUpc(d?.upc || "");
      setArtists(d?.artists?.length ? d.artists : [mkA(Date.now())]);
      setTracks(d?.tracks?.length ? normalizeTracks(d.tracks) : [mkT(Date.now())]);
      setCover(d?.cover || "");
      setPhotos(d?.photos || "");
      setPress(d?.press || "");
      setPitch(d?.pitch || "");
      setPriority(d?.priority || "");
      setDate(d?.date || "");
      setStep(d?.step || 1);
      setUrgent(d?.urgent === true);
      setConfirmed(d?.confirmed === true);
    }
    setEditingRelease(null);
    setSent(false);
    setErr("");
    setDash(false);
  }
  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(d => setU(d.user)).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("vma-release-draft") || "null");
      if (d) {
        setType(d.type || "Single");
        setTitle(d.title || "");
        setGenre(d.genre || "");
        setMood(d.mood || "");
        setUpc(d.upc || "");
        setArtists(d.artists?.length ? d.artists : [mkA(1)]);
        setTracks(d.tracks?.length ? normalizeTracks(d.tracks) : [mkT(1)]);
        setCover(d.cover || "");
        setPhotos(d.photos || "");
        setPress(d.press || "");
        setPitch(d.pitch || "");
        setPriority(d.priority || "");
        setDate(d.date || "");
        setStep(d.step || 1);
        setConfirmed(d.confirmed === true);
        setUrgent(d.urgent === true);
      }
    } catch {}
    setDraftReady(true);
  }, []);
  useEffect(() => {
    if (!draftReady || sent || editingRelease) return;
    const timer = setTimeout(() => {
      localStorage.setItem("vma-release-draft", JSON.stringify({
        type,
        title,
        genre,
        mood,
        upc,
        artists,
        tracks,
        cover,
        photos,
        press,
        pitch,
        priority,
        date,
        step,
        urgent,
        confirmed
      }));
      setSavedAt(new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [draftReady, sent, editingRelease, type, title, genre, mood, upc, artists, tracks, cover, photos, press, pitch, priority, date, step, urgent, confirmed]);
  const timing = useMemo(() => {
    if (!date) return {
      days: null,
      type: "empty",
      label: "Choisissez une date"
    };
    const d = businessDaysUntil(date);
    return d < 0 ? {
      days: d,
      type: "blocked",
      label: "Date invalide ou passée"
    } : d <= 2 ? {
      days: d,
      type: "blocked",
      label: "Délai impossible"
    } : d < 5 ? {
      days: d,
      type: "urgent",
      label: "Dérogation urgente"
    } : d < 15 ? {
      days: d,
      type: "tight",
      label: "Préavis inférieur à 15 jours ouvrés"
    } : {
      days: d,
      type: "good",
      label: "Préavis conforme"
    };
  }, [date]);
  const can = timing.type !== "blocked" && (timing.type === "good" || urgent && confirmed);
  const setCount = n => setTracks(old => Array.from({
    length: Math.max(type === "Single" ? 1 : 2, n)
  }, (_, i) => old[i] ? {
    ...old[i],
    credits: normalizeCredits(old[i].credits)
  } : mkT(Date.now() + i)));
  const ua = (id, k, v) => setArtists(a => a.map(x => x.id === id ? {
    ...x,
    [k]: v
  } : x));
  const ut = (id, k, v) => setTracks(a => a.map(x => x.id === id ? {
    ...x,
    [k]: v
  } : x));
  const uf = (tid, fid, k, v) => setTracks(a => a.map(t => t.id === tid ? {
    ...t,
    feats: t.feats.map(f => f.id === fid ? {
      ...f,
      [k]: v
    } : f)
  } : t));
  const addCredit = (tid, role) => setTracks(a => a.map(t => t.id === tid ? {
    ...t,
    credits: {
      ...normalizeCredits(t.credits),
      [role]: [...normalizeCredits(t.credits)[role], {
        id: Date.now() + Math.floor(Math.random() * 100000),
        name: "",
        ...(role === "sessionArtists" ? {
          instrument: ""
        } : {})
      }]
    }
  } : t));
  const updateCredit = (tid, role, cid, key, value) => setTracks(a => a.map(t => t.id === tid ? {
    ...t,
    credits: {
      ...normalizeCredits(t.credits),
      [role]: normalizeCredits(t.credits)[role].map(c => c.id === cid ? {
        ...c,
        [key]: value
      } : c)
    }
  } : t));
  const removeCredit = (tid, role, cid) => setTracks(a => a.map(t => t.id === tid ? {
    ...t,
    credits: {
      ...normalizeCredits(t.credits),
      [role]: normalizeCredits(t.credits)[role].filter(c => c.id !== cid)
    }
  } : t));
  async function upload(file, kind) {
    const r = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "content-type": file.type || "application/octet-stream",
        "x-file-name": encodeURIComponent(file.name),
        "x-asset-kind": kind
      },
      body: file
    });
    const d = await r.json();
    if (!r.ok) throw Error(d.error);
    return d.key;
  }
  async function next(e) {
    e.preventDefault();
    if (step < 7) {
      setStep(step + 1);
      return;
    }
    setSending(true);
    setErr("");
    const body = {
      title,
      type,
      date,
      timingStatus: timing.label,
      payload: {
        genre,
        mood,
        upc,
        artists,
        tracks,
        cover,
        photos,
        press,
        pitch,
        priority,
        urgent,
        confirmed
      }
    };
    const url = editingRelease ? `/api/releases/${editingRelease.id}` : "/api/releases";
    const r = await fetch(url, {
      method: editingRelease ? "PATCH" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (r.ok) {
      localStorage.removeItem("vma-release-draft");
      setSent(true);
    } else setErr((await r.json()).error);
    setSending(false);
  }
  if (loading) return React.createElement("main", {
    className: "loading-page"
  }, React.createElement(Logo, null), React.createElement("p", null, "Chargement\u2026"));
  if (!u || ["not_started", "pending"].includes(u.status)) return React.createElement(Onboarding, {
    u: u || {
      email: "",
      status: "not_started",
      role: "user"
    }
  });
  if (u.status === "rejected") return React.createElement("main", {
    className: "gate-page"
  }, React.createElement(Logo, null), React.createElement("section", {
    className: "gate-card"
  }, React.createElement("h1", null, "Acc\xE8s non valid\xE9"), React.createElement("p", null, "Contactez l\u2019\xE9quipe trackR.")));
  if (dash) return React.createElement(Dashboard, {
    create: startNew,
    edit: editRelease
  });
  if (sent) return React.createElement("main", {
    className: "success"
  }, React.createElement(Logo, null), React.createElement("div", {
    className: "success-card"
  }, React.createElement("div", {
    className: "success-icon"
  }, "\u2713"), React.createElement("h1", null, editingRelease ? "Votre dossier corrigé a été renvoyé à l’équipe." : "Votre projet a bien été soumis."), React.createElement("p", null, editingRelease ? "L’équipe trackR peut maintenant vérifier la nouvelle version." : "Vous pouvez suivre son avancement depuis votre dashboard."), React.createElement("button", {
    onClick: () => {
      setEditingRelease(null);
      setDash(true);
    }
  }, "Voir mon dashboard \u2192")));
  return React.createElement("main", null, React.createElement("header", null, React.createElement(Logo, null), React.createElement("button", {
    className: "menu-toggle",
    onClick: () => setMenu(!menu),
    "aria-label": "Menu"
  }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)), React.createElement("nav", {
    className: menu ? "open" : ""
  }, React.createElement("button", {
    className: "nav-dashboard",
    onClick: () => setDash(true)
  }, "Mon dashboard"), React.createElement("a", {
    href: "#guides"
  }, "Guides"), React.createElement("a", {
    className: "account",
    href: "#login"
  }, "D\xE9connexion"))), React.createElement("section", {
    className: "wizard active"
  }, React.createElement("aside", null, React.createElement(Logo, null), React.createElement("div", {
    className: "step-list"
  }, steps.map((s, i) => React.createElement("button", {
    key: s,
    type: "button",
    className: step === i + 1 ? "current" : step > i + 1 ? "done" : "",
    onClick: () => setStep(i + 1)
  }, React.createElement("span", null, step > i + 1 ? "✓" : i + 1), React.createElement("b", null, s)))), React.createElement("div", {
    className: "help"
  }, React.createElement("b", null, "Besoin d\u2019aide ?"), React.createElement("p", null, "Parcourez librement les 7 \xE9tapes de cette d\xE9monstration."), React.createElement("a", {
    href: "#guides"
  }, "Consulter les guides"))), React.createElement("form", {
    onSubmit: next
  }, React.createElement("div", {
    className: "form-head"
  }, React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "\xC9TAPE ", step, " SUR 7"), React.createElement("h2", null, editingRelease ? `Correction · ${steps[step - 1]}` : steps[step - 1]), editingRelease && React.createElement("small", {
    className: "saved-indicator"
  }, "Vous modifiez la sortie TRK-", String(editingRelease.id).padStart(5, "0"), ". Vos fichiers d\xE9j\xE0 transmis sont conserv\xE9s."), savedAt && !editingRelease && React.createElement("small", {
    className: "saved-indicator"
  }, "Aper\xE7u du brouillon \xB7 ", savedAt)), React.createElement("div", {
    className: "progress"
  }, steps.map((_, i) => React.createElement("i", {
    key: i,
    className: i < step ? "on" : ""
  })))), step === 1 && React.createElement("div", {
    className: "stage"
  }, React.createElement("h3", null, "Quel projet souhaitez-vous distribuer ?"), React.createElement("div", {
    className: "choice-cards"
  }, ["Single", "EP", "Album"].map(x => React.createElement("button", {
    type: "button",
    key: x,
    className: type === x ? "selected" : "",
    onClick: () => {
      setType(x);
      x === "Single" ? setTracks([tracks[0]]) : tracks.length < 2 && setTracks([...tracks, mkT(Date.now())]);
    }
  }, React.createElement("b", null, x), React.createElement("small", null, x === "Single" ? "1 piste" : "Plusieurs pistes")))), React.createElement("div", {
    className: "grid"
  }, React.createElement("label", null, "Titre du projet *", React.createElement("input", {
    required: true,
    value: title,
    onChange: e => setTitle(e.target.value)
  })), type !== "Single" && React.createElement("label", null, "Nombre de pistes *", React.createElement("input", {
    type: "number",
    min: "2",
    max: "50",
    value: tracks.length,
    onChange: e => setCount(+e.target.value)
  })), React.createElement("label", null, "Genre musical *", React.createElement("select", {
    required: true,
    value: genre,
    onChange: e => setGenre(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "S\xE9lectionnez un genre"), genres.map(x => React.createElement("option", {
    key: x
  }, x)))), React.createElement("label", null, "Mood principal *", React.createElement("select", {
    required: true,
    value: mood,
    onChange: e => setMood(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "S\xE9lectionnez un mood"), moods.map(x => React.createElement("option", {
    key: x
  }, x)))), React.createElement("label", null, "UPC (si disponible)", React.createElement("input", {
    value: upc,
    onChange: e => setUpc(e.target.value)
  })))), step === 2 && React.createElement("div", {
    className: "stage"
  }, React.createElement("div", {
    className: "stage-title"
  }, React.createElement("div", null, React.createElement("h3", null, "Artiste(s) principal(aux)"), React.createElement("p", null, "Les featurings se renseignent sur chaque piste.")), React.createElement("button", {
    type: "button",
    className: "add",
    onClick: () => setArtists(a => [...a, mkA(Date.now())])
  }, "\uFF0B Ajouter")), artists.map((a, i) => React.createElement("article", {
    className: "editor-card",
    key: a.id
  }, React.createElement("div", {
    className: "card-number"
  }, i + 1), React.createElement("div", {
    className: "grid"
  }, React.createElement("label", null, "Nom *", React.createElement("input", {
    required: true,
    value: a.name,
    onChange: e => ua(a.id, "name", e.target.value)
  })), React.createElement("label", null, "Spotify ", a.noSpotify ? "" : "*", React.createElement("input", {
    type: "url",
    required: !a.noSpotify,
    disabled: a.noSpotify,
    value: a.spotify,
    onChange: e => ua(a.id, "spotify", e.target.value)
  })), React.createElement("label", {
    className: "check wide"
  }, React.createElement("input", {
    type: "checkbox",
    checked: a.noSpotify,
    onChange: e => ua(a.id, "noSpotify", e.target.checked)
  }), " Aucun profil Spotify"))))), step === 3 && React.createElement("div", {
    className: "stage"
  }, React.createElement("div", {
    className: "stage-title"
  }, React.createElement("h3", null, "Tracklist \xB7 ", tracks.length, " piste(s)"), type !== "Single" && React.createElement("button", {
    type: "button",
    className: "add",
    onClick: () => setTracks(x => [...x, mkT(Date.now())])
  }, "\uFF0B Piste")), tracks.map((t, i) => React.createElement("article", {
    className: "editor-card track",
    key: t.id
  }, React.createElement("div", {
    className: "track-head"
  }, React.createElement("div", {
    className: "card-number"
  }, i + 1), React.createElement("strong", null, "PISTE ", i + 1)), React.createElement("div", {
    className: "grid"
  }, React.createElement("label", null, "Titre *", React.createElement("input", {
    required: true,
    value: t.title,
    onChange: e => ut(t.id, "title", e.target.value)
  })), React.createElement("label", null, "Artiste principal *", React.createElement("select", {
    required: true,
    value: t.main,
    onChange: e => ut(t.id, "main", e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "S\xE9lectionnez"), artists.map(a => React.createElement("option", {
    key: a.id
  }, a.name)))), React.createElement("label", null, "ISRC (si disponible)", React.createElement("input", {
    value: t.isrc,
    onChange: e => ut(t.id, "isrc", e.target.value)
  })), React.createElement("label", null, "Type de son *", React.createElement("select", {
    required: true,
    value: t.version,
    onChange: e => ut(t.id, "version", e.target.value)
  }, React.createElement("option", null, "Original"), React.createElement("option", null, "Remix"), React.createElement("option", null, "Version acoustique"), React.createElement("option", null, "Version live"), React.createElement("option", null, "Instrumental"), React.createElement("option", null, "Radio Edit"))), React.createElement("label", null, "Contenu explicite *", React.createElement("select", {
    value: t.explicit,
    onChange: e => ut(t.id, "explicit", e.target.value)
  }, React.createElement("option", null, "Non"), React.createElement("option", null, "Oui"))), React.createElement("label", null, "Langue principale *", React.createElement("select", {
    value: t.language,
    onChange: e => ut(t.id, "language", e.target.value)
  }, React.createElement("option", null, "Fran\xE7ais"), React.createElement("option", null, "Anglais"), React.createElement("option", null, "Nouchi"), React.createElement("option", null, "Dioula"), React.createElement("option", null, "Baoul\xE9"), React.createElement("option", null, "Lingala"), React.createElement("option", null, "Wolof"), React.createElement("option", null, "Autre"))), React.createElement("label", {
    className: "wide"
  }, "Master audio *", React.createElement("input", {
    type: "file",
    required: !t.master,
    accept: ".wav,audio/wav,audio/x-wav",
    onChange: async e => {
      const f = e.target.files?.[0];
      if (f) try {
        ut(t.id, "master", "Envoi…");
        ut(t.id, "master", await upload(f, "master"));
      } catch {
        ut(t.id, "master", "");
        alert("Upload impossible");
      }
    }
  }), React.createElement("small", null, t.master && t.master !== "Envoi…" ? "✓ Master uploadé" : "WAV 44,1 kHz / 16 bits minimum")), React.createElement("div", {
    className: "wide feat-zone"
  }, React.createElement("div", {
    className: "feat-title"
  }, React.createElement("b", null, "Featuring(s) sur cette piste"), React.createElement("button", {
    type: "button",
    className: "add",
    onClick: () => ut(t.id, "feats", [...t.feats, mkA(Date.now())])
  }, "\uFF0B Ajouter")), t.feats.map(f => React.createElement("div", {
    className: "feat-row",
    key: f.id
  }, React.createElement("label", null, "Nom *", React.createElement("input", {
    required: true,
    value: f.name,
    onChange: e => uf(t.id, f.id, "name", e.target.value)
  })), React.createElement("label", null, "Spotify ", f.noSpotify ? "" : "*", React.createElement("input", {
    type: "url",
    required: !f.noSpotify,
    disabled: f.noSpotify,
    value: f.spotify,
    onChange: e => uf(t.id, f.id, "spotify", e.target.value)
  })), React.createElement("label", {
    className: "check"
  }, React.createElement("input", {
    type: "checkbox",
    checked: f.noSpotify,
    onChange: e => uf(t.id, f.id, "noSpotify", e.target.checked)
  }), " Aucun profil")))), React.createElement("div", {
    className: "wide credit-zone"
  }, React.createElement("div", {
    className: "credit-intro"
  }, React.createElement("b", null, "Cr\xE9dits de la piste"), React.createElement("small", null, "Ajoutez les participants et leur r\xF4le. Vous pouvez en ajouter plusieurs.")), [["beatmakers", "Beatmaker(s)", false], ["sessionArtists", "Artistes de session / musiciens", true], ["authors", "Auteur(s)", false], ["composers", "Compositeur(s)", false]].map(([role, label, withInstrument]) => React.createElement("div", {
    className: "credit-group",
    key: role
  }, React.createElement("div", {
    className: "credit-heading"
  }, React.createElement("b", null, label), React.createElement("button", {
    type: "button",
    className: "add",
    onClick: () => addCredit(t.id, role)
  }, "\uFF0B Ajouter")), t.credits[role].map((credit, index) => React.createElement("div", {
    className: "credit-row",
    key: credit.id
  }, React.createElement("input", {
    "aria-label": label + " " + (index + 1),
    placeholder: "Nom complet",
    required: true,
    value: credit.name,
    onChange: e => updateCredit(t.id, role, credit.id, "name", e.target.value)
  }), withInstrument && React.createElement("input", {
    "aria-label": "Instrument ou r\xF4le",
    placeholder: "Instrument / r\xF4le",
    value: credit.instrument || "",
    onChange: e => updateCredit(t.id, role, credit.id, "instrument", e.target.value)
  }), React.createElement("button", {
    type: "button",
    "aria-label": "Retirer " + label.toLowerCase() + " " + (index + 1),
    onClick: () => removeCredit(t.id, role, credit.id)
  }, "\xD7")))))))))), " ", step === 4 && React.createElement("div", {
    className: "stage"
  }, React.createElement("h3", null, "Assets de la sortie"), React.createElement("div", {
    className: "grid"
  }, React.createElement("label", {
    className: "wide"
  }, "Cover art *", React.createElement("input", {
    type: "file",
    required: !cover,
    accept: ".tif,.tiff,image/tiff",
    onChange: async e => {
      const f = e.target.files?.[0];
      if (f) try {
        setCover("Envoi…");
        setCover(await upload(f, "cover"));
      } catch {
        setCover("");
        alert("Upload impossible");
      }
    }
  }), React.createElement("small", null, cover && cover !== "Envoi…" ? "✓ Cover uploadée" : "3000 × 3000 px")), React.createElement("label", {
    className: "wide"
  }, "Photos de presse ", React.createElement("small", null, "(facultatif \u2014 n\xE9cessaire pour bien pitcher la release)"), React.createElement("input", {
    type: "url",
    value: photos,
    onChange: e => setPhotos(e.target.value)
  })), React.createElement("label", {
    className: "wide"
  }, "Dossier de communication", React.createElement("input", {
    type: "url",
    value: press,
    onChange: e => setPress(e.target.value)
  })))), step === 5 && React.createElement("div", {
    className: "stage"
  }, React.createElement("h3", null, "Pitch et strat\xE9gie"), React.createElement("div", {
    className: "grid"
  }, React.createElement("label", {
    className: "wide"
  }, "Pitch g\xE9n\xE9ral", React.createElement("textarea", {
    value: pitch,
    onChange: e => setPitch(e.target.value)
  })), React.createElement("label", null, "Titre prioritaire", React.createElement("select", {
    value: priority,
    onChange: e => setPriority(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "S\xE9lectionnez"), tracks.map(t => React.createElement("option", {
    key: t.id
  }, t.title)))))), step === 6 && React.createElement("div", {
    className: "stage planning"
  }, React.createElement("h3", null, "Date de sortie souhait\xE9e"), React.createElement("p", {
    className: "form-hint"
  }, "Pr\xE9voir 15 jours ouvr\xE9s. La plateforme accepte au maximum 4 sorties par structure et par semaine."), React.createElement("label", null, "Date *", React.createElement("input", {
    type: "date",
    required: true,
    value: date,
    onChange: e => {
      setDate(e.target.value);
      setUrgent(false);
      setConfirmed(false);
    }
  })), React.createElement("div", {
    className: `timing ${timing.type}`
  }, React.createElement("div", null, React.createElement("b", null, timing.label), timing.days !== null && React.createElement("span", null, timing.days, " jour(s) ouvr\xE9(s)")), React.createElement("p", null, timing.type === "blocked" ? "La sortie doit être planifiée plus de 2 jours ouvrés à l’avance." : timing.type === "urgent" ? "Moins de 5 jours ouvrés : une demande urgente et une confirmation sont requises." : timing.type === "tight" ? "Moins de 15 jours ouvrés : une dérogation confirmée est requise." : timing.type === "good" ? "Le préavis de 15 jours ouvrés est respecté." : "Choisissez une date.")), ["urgent", "tight"].includes(timing.type) && React.createElement("div", {
    className: "urgent-box"
  }, React.createElement("label", {
    className: "check"
  }, React.createElement("input", {
    type: "checkbox",
    checked: urgent,
    onChange: e => setUrgent(e.target.checked)
  }), " Continuer malgr\xE9 le d\xE9lai."), urgent && React.createElement("label", {
    className: "check"
  }, React.createElement("input", {
    type: "checkbox",
    checked: confirmed,
    onChange: e => setConfirmed(e.target.checked)
  }), " Je comprends que la sortie ne sera pas pr\xE9par\xE9e dans les meilleures conditions."))), step === 7 && React.createElement("div", {
    className: "stage review"
  }, React.createElement("div", {
    className: "review-head"
  }, React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "V\xC9RIFICATION FINALE"), React.createElement("h3", null, title), React.createElement("p", null, type, " \xB7 ", tracks.length, " piste(s)")), React.createElement("span", {
    className: `status ${timing.type}`
  }, timing.label)), React.createElement("section", null, React.createElement("h4", null, "Tracklist"), tracks.map((t, i) => React.createElement("p", {
    key: t.id
  }, i + 1, ". ", t.title, t.feats.length ? ` feat. ${t.feats.map(f => f.name).join(", ")}` : "", " \xB7 ", t.master ? "Master ✓" : "Master manquant"))), React.createElement("section", null, React.createElement("h4", null, "Assets"), React.createElement("p", null, cover ? "Cover ✓" : "Cover manquante", " \xB7 ", photos ? "Photos presse ✓" : "Photos presse non fournies")), React.createElement("label", {
    className: "legal"
  }, React.createElement("input", {
    type: "checkbox",
    required: true
  }), " Je certifie que les informations sont exactes.")), err && React.createElement("p", {
    className: "form-error"
  }, err), React.createElement("div", {
    className: "actions"
  }, step > 1 && React.createElement("button", {
    type: "button",
    className: "back",
    onClick: () => setStep(step - 1)
  }, "\u2190 RETOUR"), step === 5 && React.createElement("button", {
    type: "button",
    className: "skip",
    onClick: () => confirm("Vous passez l’étape Pitch. Sans ces informations, la release sera plus difficile à pitcher. Continuer ?") && setStep(6)
  }, "PASSER CETTE \xC9TAPE"), React.createElement("button", {
    className: "primary",
    disabled: sending || (step === 6 || step === 7) && !can
  }, sending ? "ENVOI…" : step === 7 ? "ENVOYER MA DEMANDE" : "CONTINUER", React.createElement("span", null, "\u2192"))))));
}
function parseReleaseDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}
function businessDaysUntil(value, now = new Date()) {
  const target = parseReleaseDate(value);
  if (!target) return -1;
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (target < today) return -1;
  let count = 0;
  for (let day = new Date(today.getTime() + 86400000); day <= target; day = new Date(day.getTime() + 86400000)) {
    const weekday = day.getUTCDay();
    if (weekday !== 0 && weekday !== 6) count++;
  }
  return count;
}
function scheduleCheck(value, now = new Date()) {
  const target = parseReleaseDate(value);
  if (!target) return null;
  const weekday = target.getUTCDay();
  const offset = (weekday + 6) % 7;
  const start = new Date(target.getTime() - offset * 86400000);
  const end = new Date(start.getTime() + 7 * 86400000);
  return {
    businessDays: businessDaysUntil(value, now),
    weekStart: start.toISOString().slice(0, 10),
    weekEnd: end.toISOString().slice(0, 10)
  };
}
function timingLabel(days) {
  if (days < 0) return "Date invalide ou passée";
  if (days <= 2) return "Délai impossible";
  if (days < 15) return "Dérogation de délai";
  return "Préavis conforme — 15 jours ouvrés";
}
function Guides() {
  return React.createElement("main", {
    className: "guides-page"
  }, React.createElement("header", null, React.createElement(Link, {
    href: "/"
  }, React.createElement(Logo, null)), React.createElement("nav", null, React.createElement(Link, {
    href: "/"
  }, "Mon dashboard"), React.createElement("a", {
    className: "account",
    href: "#login"
  }, "D\xE9connexion"))), React.createElement("section", {
    className: "guides-hero"
  }, React.createElement("p", {
    className: "eyebrow"
  }, "CENTRE DE RESSOURCES"), React.createElement("h1", null, "Les bons r\xE9flexes pour chaque sortie."), React.createElement("p", null, "Deux guides pratiques pour pr\xE9parer une mise en ligne conforme et publier votre musique sur les r\xE9seaux sans blocage.")), React.createElement("section", {
    className: "guide-grid"
  }, React.createElement(Link, {
    className: "guide-card release-guide",
    href: "/guides/mises-en-ligne"
  }, React.createElement("span", {
    className: "guide-icon"
  }, "\u266B"), React.createElement("div", null, React.createElement("small", null, "AVANT LA SORTIE"), React.createElement("h2", null, "Pr\xE9parer une mise en ligne"), React.createElement("p", null, "D\xE9lais, Label Copy, masters, cover et dossier de pitch : la check-list compl\xE8te avant l\u2019envoi."), React.createElement("b", null, "Lire le guide \u2192"))), React.createElement(Link, {
    className: "guide-card social-guide",
    href: "/guides/reseaux-sociaux"
  }, React.createElement("span", {
    className: "guide-icon"
  }, "\u25CE"), React.createElement("div", null, React.createElement("small", null, "APR\xC8S LA LIVRAISON"), React.createElement("h2", null, "Promouvoir sur les r\xE9seaux"), React.createElement("p", null, "Les dur\xE9es autoris\xE9es sur Facebook, Instagram et TikTok, ainsi que la mon\xE9tisation YouTube."), React.createElement("b", null, "Lire le guide \u2192")))), React.createElement("section", {
    className: "guide-contact"
  }, React.createElement("div", null, React.createElement("span", null, "?"), React.createElement("div", null, React.createElement("h3", null, "Une question sp\xE9cifique ?"), React.createElement("p", null, "L\u2019\xE9quipe trackR vous accompagne avant la publication de votre contenu."))), React.createElement("a", {
    href: "mailto:contact@virginmusicafrica.com"
  }, "contact@virginmusicafrica.com")));
}
function ReleaseGuide() {
  return React.createElement("main", {
    className: "guide-detail"
  }, React.createElement("header", null, React.createElement(Link, {
    href: "/"
  }, React.createElement(Logo, null)), React.createElement("nav", null, React.createElement(Link, {
    href: "/guides"
  }, "Tous les guides"), React.createElement(Link, {
    href: "/"
  }, "Mon dashboard"))), React.createElement("section", {
    className: "detail-hero"
  }, React.createElement(Link, {
    href: "/guides"
  }, "\u2190 Retour aux guides"), React.createElement("p", {
    className: "eyebrow"
  }, "GUIDE \xB7 MISES EN LIGNE"), React.createElement("h1", null, "Pr\xE9parer une sortie sans aller-retour inutile."), React.createElement("p", null, "Une release bien pr\xE9par\xE9e donne plus de temps \xE0 l\u2019\xE9quipe pour contr\xF4ler les \xE9l\xE9ments, livrer les plateformes et d\xE9fendre le projet en pitch."), React.createElement("div", {
    className: "hero-rule"
  }, React.createElement("strong", null, "4 semaines"), React.createElement("span", null, "D\xE9lai recommand\xE9 avant la date de sortie pour optimiser le pitching."))), React.createElement("section", {
    className: "guide-body"
  }, React.createElement("h2", null, "Les trois blocs indispensables"), React.createElement("div", {
    className: "trio"
  }, React.createElement("article", null, React.createElement("span", null, "01"), React.createElement("h3", null, "Label Copy"), React.createElement("p", null, "Le document qui rassemble les m\xE9tadonn\xE9es et tous les cr\xE9dits du projet : artistes, auteurs, compositeurs, producteurs et informations l\xE9gales.")), React.createElement("article", null, React.createElement("span", null, "02"), React.createElement("h3", null, "Assets"), React.createElement("p", null, "Les masters audio d\xE9finitifs et la cover conforme. Chaque piste doit correspondre exactement aux informations saisies.")), React.createElement("article", null, React.createElement("span", null, "03"), React.createElement("h3", null, "Dossier de pitch"), React.createElement("p", null, "Bio artiste, histoire du projet, photos presse et plan de communication pour faciliter les propositions aux plateformes."))), React.createElement("section", {
    className: "spec-panel"
  }, React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "MASTER AUDIO"), React.createElement("div", {
    className: "spec-visual sound"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null)), React.createElement("h3", null, "WAV \xB7 44,1 kHz \xB7 16 bits minimum"), React.createElement("ul", null, React.createElement("li", null, "Un fichier d\xE9finitif par piste"), React.createElement("li", null, "Nom du fichier clair et coh\xE9rent avec la tracklist"), React.createElement("li", null, "Pas de MP3 pour la livraison du master"))), React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "COVER"), React.createElement("div", {
    className: "cover-visual"
  }, React.createElement("span", null, "3000"), React.createElement("b", null, "VOTRE", React.createElement("br", null), "COVER"), React.createElement("span", null, "3000")), React.createElement("h3", null, "TIFF \xB7 3000 \xD7 3000 px \xB7 300 dpi"), React.createElement("ul", null, React.createElement("li", null, "Format carr\xE9 et haute r\xE9solution"), React.createElement("li", null, "Pas de logo de plateforme"), React.createElement("li", null, "Texte coh\xE9rent avec le nom d\u2019artiste et le titre")))), React.createElement("h2", null, "Le parcours recommand\xE9"), React.createElement("ol", {
    className: "timeline"
  }, React.createElement("li", null, React.createElement("b", null, "J-28 ou avant"), React.createElement("span", null, "Cr\xE9ez la demande, ajoutez le Label Copy, les masters, la cover et le dossier de pitch.")), React.createElement("li", null, React.createElement("b", null, "Contr\xF4le trackR"), React.createElement("span", null, "L\u2019\xE9quipe v\xE9rifie les fichiers, cr\xE9dits, profils artistes et informations de sortie.")), React.createElement("li", null, React.createElement("b", null, "Corrections"), React.createElement("span", null, "R\xE9pondez rapidement si un \xE9l\xE9ment doit \xEAtre remplac\xE9 ou compl\xE9t\xE9.")), React.createElement("li", null, React.createElement("b", null, "Livraison & pitch"), React.createElement("span", null, "La release est livr\xE9e aux plateformes et propos\xE9e aux \xE9quipes \xE9ditoriales lorsque le dossier le permet."))), React.createElement("div", {
    className: "checklist"
  }, React.createElement("div", null, React.createElement("h2", null, "Avant de soumettre"), React.createElement("p", null, "V\xE9rifiez ces cinq points :")), React.createElement("ul", null, React.createElement("li", null, "Tracklist dans le bon ordre"), React.createElement("li", null, "Cr\xE9dits complets et d\xE9finitifs"), React.createElement("li", null, "Master WAV pour chaque titre"), React.createElement("li", null, "Cover TIFF conforme"), React.createElement("li", null, "Bio, photos et pitch disponibles"))), React.createElement("div", {
    className: "guide-cta"
  }, React.createElement("div", null, React.createElement("h2", null, "Votre dossier est pr\xEAt ?"), React.createElement("p", null, "Cr\xE9ez votre demande depuis l\u2019espace distribu\xE9.")), React.createElement(Link, {
    href: "/"
  }, "Commencer une mise en ligne \u2192"))));
}
function SocialGuide() {
  return React.createElement("main", {
    className: "guide-detail"
  }, React.createElement("header", null, React.createElement(Link, {
    href: "/"
  }, React.createElement(Logo, null)), React.createElement("nav", null, React.createElement(Link, {
    href: "/guides"
  }, "Tous les guides"), React.createElement(Link, {
    href: "/"
  }, "Mon dashboard"))), React.createElement("section", {
    className: "detail-hero social"
  }, React.createElement(Link, {
    href: "/guides"
  }, "\u2190 Retour aux guides"), React.createElement("p", {
    className: "eyebrow"
  }, "GUIDE \xB7 R\xC9SEAUX SOCIAUX"), React.createElement("h1", null, "Promouvoir votre musique sans bloquer vos contenus."), React.createElement("p", null, "Le syst\xE8me de d\xE9tection prot\xE8ge vos droits et collecte les revenus li\xE9s \xE0 l\u2019utilisation de votre musique. Il peut aussi reconna\xEEtre vos propres publications.")), React.createElement("section", {
    className: "guide-body"
  }, React.createElement("div", {
    className: "why-grid"
  }, React.createElement("article", null, React.createElement("span", null, "\xA9"), React.createElement("h3", null, "Prot\xE9ger vos droits"), React.createElement("p", null, "Le traceur identifie les utilisations de votre musique et intervient lorsqu\u2019un contenu ne respecte pas les r\xE8gles.")), React.createElement("article", null, React.createElement("span", null, "\u20A3"), React.createElement("h3", null, "Collecter vos revenus"), React.createElement("p", null, "Chaque utilisation identifiable peut contribuer \xE0 la collecte et au reversement de la mon\xE9tisation.")), React.createElement("article", null, React.createElement("span", null, "\u2713"), React.createElement("h3", null, "\xC9viter les blocages"), React.createElement("p", null, "Respecter les dur\xE9es recommand\xE9es r\xE9duit le risque que votre propre contenu promotionnel soit bloqu\xE9."))), React.createElement("h2", null, "Les r\xE8gles par plateforme"), React.createElement("section", {
    className: "platform-rules"
  }, React.createElement("article", null, React.createElement("div", {
    className: "platform-name"
  }, React.createElement("span", null, "f"), React.createElement("span", null, "\u25CE"), React.createElement("h3", null, "Facebook & Instagram")), React.createElement("div", {
    className: "duration"
  }, React.createElement("strong", null, "< 20 s"), React.createElement("p", null, "Vous pouvez publier l\u2019extrait sans consulter l\u2019\xE9quipe.")), React.createElement("div", {
    className: "duration warning"
  }, React.createElement("strong", null, "> 20 s"), React.createElement("p", null, "Contactez trackR en amont et publiez seulement apr\xE8s validation."))), React.createElement("article", null, React.createElement("div", {
    className: "platform-name"
  }, React.createElement("span", null, "\u266A"), React.createElement("h3", null, "TikTok")), React.createElement("div", {
    className: "duration warning"
  }, React.createElement("strong", null, "59 s max."), React.createElement("p", null, "Un extrait musical de plus de 59 secondes peut \xEAtre bloqu\xE9 automatiquement."))), React.createElement("article", null, React.createElement("div", {
    className: "platform-name"
  }, React.createElement("span", null, "\u25B6"), React.createElement("h3", null, "YouTube")), React.createElement("div", {
    className: "duration youtube"
  }, React.createElement("strong", null, "Mon\xE9tisation g\xE9r\xE9e"), React.createElement("p", null, "trackR identifie les vid\xE9os contenant votre musique, collecte la mon\xE9tisation et vous reverse les revenus, m\xEAme si votre cha\xEEne n\u2019est pas elle-m\xEAme \xE9ligible au programme partenaire YouTube.")))), React.createElement("div", {
    className: "decision-card"
  }, React.createElement("h2", null, "Avant de publier sur Facebook ou Instagram"), React.createElement("div", null, React.createElement("span", null, "Mon extrait d\xE9passe-t-il 20 secondes ?"), React.createElement("b", null, "NON"), React.createElement("p", null, "Vous pouvez publier."), React.createElement("b", null, "OUI"), React.createElement("p", null, "\xC9crivez \xE0 trackR et attendez la validation."))), React.createElement("div", {
    className: "contact-banner"
  }, React.createElement("span", null, "\u2709"), React.createElement("div", null, React.createElement("h3", null, "Besoin d\u2019une validation ?"), React.createElement("p", null, "Envoyez votre demande avant la publication en pr\xE9cisant la plateforme, le format et la dur\xE9e de l\u2019extrait.")), React.createElement("a", {
    href: "mailto:contact@virginmusicafrica.com"
  }, "contact@virginmusicafrica.com"))));
}
function Login() {
  return React.createElement("main", {
    className: "login-page"
  }, React.createElement("section", {
    className: "login-brand",
    "aria-label": "trackR"
  }, React.createElement("img", {
    src: "./trackr-logo.png",
    alt: "trackR"
  }), React.createElement("div", null, React.createElement("p", {
    className: "login-eyebrow"
  }, "TRACKR \xB7 DISTRIBUTION"), React.createElement("h1", null, "Votre prochaine sortie commence ici."), React.createElement("p", null, "Pr\xE9parez votre projet, vos artistes, votre tracklist et votre planning dans un espace s\xE9curis\xE9.")), React.createElement("div", {
    className: "login-steps",
    "aria-label": "Parcours de soumission"
  }, React.createElement("span", null, React.createElement("b", null, "01"), " Projet"), React.createElement("span", null, React.createElement("b", null, "02"), " Artistes"), React.createElement("span", null, React.createElement("b", null, "03"), " Tracklist"))), React.createElement("section", {
    className: "login-panel"
  }, React.createElement("div", {
    className: "login-card"
  }, React.createElement("img", {
    src: "./trackr-logo.png",
    alt: "",
    "aria-hidden": "true"
  }), React.createElement("p", {
    className: "login-eyebrow"
  }, "ESPACE ARTISTE"), React.createElement("h2", null, "Connectez-vous pour continuer"), React.createElement("p", null, "Votre connexion permet de s\xE9curiser votre demande et de retrouver votre espace."), React.createElement("a", {
    className: "login-button",
    href: "#dashboard"
  }, "D\xE9couvrir la d\xE9mo ", React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")), React.createElement("small", null, "En continuant, vous acc\xE9dez \xE0 votre espace de mise en ligne trackR.")), React.createElement("p", {
    className: "login-help"
  }, "Besoin d\u2019aide ? ", React.createElement("a", {
    href: "mailto:support@virginmusicafrique.com"
  }, "Contactez notre \xE9quipe"))));
}
function DemoApp() {
  const [route, setRoute] = useState(location.hash || '#dashboard');
  useEffect(() => {
    const listener = () => {
      setRoute(location.hash || '#dashboard');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', listener);
    return () => window.removeEventListener('hashchange', listener);
  }, []);
  if (route === '#login') return React.createElement(Login, null);
  if (route === '#guides') return React.createElement(Guides, null);
  if (route === '#guides/mises-en-ligne') return React.createElement(ReleaseGuide, null);
  if (route === '#guides/reseaux-sociaux') return React.createElement(SocialGuide, null);
  return React.createElement(Home, null);
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(DemoApp, null));