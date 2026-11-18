// Post-build « agent first » : rend le CV lisible par les moteurs et les agents IA
// qui n'exécutent pas le JavaScript.
//  - pré-rendu HTML de la page en français (/) et en anglais (/en/), méta-données localisées
//  - JSON-LD schema.org (ProfilePage + Person) généré depuis src/data
//  - llms.txt, llms-full.txt, cv.{fr,en}.md, cv.{fr,en}.json (JSON Resume), cv.{fr,en}.pdf, sitemap.xml
// Toutes les sorties dérivent de src/data et src/translations : aucune donnée en double.
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const BUILD = join(ROOT, "build");
const SSR_ENTRY = join(ROOT, "build-ssr", "entry-server.js");

const readJson = (path) => JSON.parse(readFileSync(join(ROOT, path), "utf8"));
const user = readJson("src/data/user.json");
const skills = readJson("src/data/skills.json");
const experiences = readJson("src/data/experiences.json");
const formations = readJson("src/data/formations.json");
const certifications = readJson("src/data/certifications.json");
const translations = {
  fr: readJson("src/translations/fr/common.json"),
  en: readJson("src/translations/en/common.json"),
};

const LANGS = ["fr", "en"];
const SITE = user.url.replace(/\/$/, "");
const NOW = new Date();
const TODAY = NOW.toISOString().slice(0, 10);
const CURRENT_MONTH = TODAY.slice(0, 7);

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE}${url.startsWith("/") ? "" : "/"}${url}`);
const pageUrl = (lang) => (lang === "fr" ? `${SITE}/` : `${SITE}/${lang}/`);
const PICTURE = absolute(user.picture);
const OG_IMAGE = existsSync(join(BUILD, "og-image.png")) ? `${SITE}/og-image.png` : PICTURE;

const LABELS = {
  fr: {
    locale: "fr_FR",
    present: "aujourd'hui",
    website: "Site",
    experience: "Expérience",
    since: (year, years) => `depuis ${year} (${years} ans)`,
    current: "Missions en cours",
    contact: "Contact",
    contactForm: "formulaire de contact",
    profiles: "Profils",
    otherFormats: "Autres formats",
    otherLang: "English version",
    generated: "Généré le",
    skills: "Compétences",
    skillsScale: "Niveau indiqué sur une échelle de 1 à 4.",
    experiences: "Expériences",
    sector: "Secteur",
    stack: "Stack",
    education: "Formation",
    certifications: "Certifications",
    duration: (y, m) => [y && `${y} an${y > 1 ? "s" : ""}`, m && `${m} mois`].filter(Boolean).join(" "),
  },
  en: {
    locale: "en_US",
    present: "present",
    website: "Website",
    experience: "Experience",
    since: (year, years) => `since ${year} (${years} years)`,
    current: "Current engagements",
    contact: "Contact",
    contactForm: "contact form",
    profiles: "Profiles",
    otherFormats: "Other formats",
    otherLang: "Version française",
    generated: "Generated on",
    skills: "Skills",
    skillsScale: "Level on a 1 to 4 scale.",
    experiences: "Experience",
    sector: "Sector",
    stack: "Stack",
    education: "Education",
    certifications: "Certifications",
    duration: (y, m) => [y && `${y} year${y > 1 ? "s" : ""}`, m && `${m} month${m > 1 ? "s" : ""}`].filter(Boolean).join(" "),
  },
};

// ---------- helpers ----------

const loc = (field, lang) => (field && typeof field === "object" ? field[lang] ?? field.en : field);

const monthIndex = (yyyyMm) => {
  const [y, m] = yyyyMm.split("-").map(Number);
  return y * 12 + (m - 1);
};

const endOf = (exp) => (exp.endDate === "present" ? CURRENT_MONTH : exp.endDate);

// Durée inclusive : 2025-11 → 2026-06 = 8 mois.
const duration = (exp, lang) => {
  const months = monthIndex(endOf(exp)) - monthIndex(exp.startDate) + 1;
  return LABELS[lang].duration(Math.floor(months / 12), months % 12);
};

const summary = (lang) =>
  ["part_1", "part_2", "part_3"].map((k) => translations[lang].about[k].trim()).join(" ");

const firstStart = experiences.map((e) => e.startDate).sort()[0];
const yearsOfExperience = Math.floor((monthIndex(CURRENT_MONTH) - monthIndex(firstStart)) / 12);
const currentExperiences = experiences.filter((e) => e.endDate === "present");

const educationYears = (when) => {
  const match = String(when).match(/(\d{4})\D+(\d{4})/);
  return match ? { startDate: match[1], endDate: match[2] } : {};
};

const otherLang = (lang) => (lang === "fr" ? "en" : "fr");

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- Markdown ----------

const buildMarkdown = (lang) => {
  const l = LABELS[lang];
  const headline = loc(user.headline, lang);
  const linkedProfiles = user.profiles.map((p) => `[${p.network}](${p.url})`).join(" · ");
  const lines = [
    `# ${user.name} — ${headline}`,
    "",
    `> ${summary(lang)}`,
    "",
    `- **${l.website}** : ${pageUrl(lang)}`,
    `- **${l.experience}** : ${l.since(firstStart.slice(0, 4), yearsOfExperience)}`,
    `- **${l.current}** : ${currentExperiences.map((e) => `${e.company} (${loc(e.role, lang)})`).join(", ")}`,
    `- **${l.contact}** : [${l.contactForm}](${pageUrl(lang)}#contact)`,
    `- **${l.profiles}** : ${linkedProfiles}`,
    `- **${l.otherFormats}** : [PDF](${SITE}/cv.${lang}.pdf) · [JSON Resume](${SITE}/cv.${lang}.json) · [${l.otherLang}](${SITE}/cv.${otherLang(lang)}.md) · [llms.txt](${SITE}/llms.txt)`,
    "",
    `## ${l.skills}`,
    "",
    l.skillsScale,
    "",
    ...skills.map(
      (cat) =>
        `- **${loc(cat.category, lang)}** : ${cat.detail.map((s) => `${loc(s.title, lang)} (${s.value}/4)`).join(", ")}`
    ),
    "",
    `## ${l.experiences}`,
    "",
  ];

  for (const exp of experiences) {
    const end = exp.endDate === "present" ? l.present : exp.endDate;
    lines.push(
      `### ${loc(exp.role, lang)} — ${exp.company}`,
      "",
      `*${exp.startDate} → ${end} · ${duration(exp, lang)} · ${exp.location}*`,
      "",
      loc(exp.explanation, lang).trim(),
      ""
    );
    const facts = [
      exp.sector && `- ${l.sector} : ${loc(exp.sector, lang)}`,
      exp.stack?.length && `- ${l.stack} : ${exp.stack.join(", ")}`,
    ].filter(Boolean);
    if (facts.length) lines.push(...facts, "");
  }

  lines.push(`## ${l.education}`, "");
  for (const f of formations) lines.push(`- ${f.what} — ${f.where} (${f.when})`);

  lines.push("", `## ${l.certifications}`, "");
  for (const c of certifications) lines.push(`- ${loc(c.name, lang)} (${c.year})`);

  lines.push("", "---", "", `${l.generated} ${TODAY} · ${pageUrl(lang)}`, "");
  return lines.join("\n");
};

// ---------- JSON Resume (https://jsonresume.org/schema) ----------

const buildJsonResume = (lang) => ({
  $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: user.name,
    label: loc(user.headline, lang),
    image: PICTURE,
    url: pageUrl(lang),
    summary: summary(lang),
    profiles: user.profiles.map(({ network, url }) => ({ network, url })),
  },
  work: experiences.map((exp) => ({
    name: exp.company,
    ...(exp.sector && { description: loc(exp.sector, lang) }),
    position: loc(exp.role, lang),
    location: exp.location,
    startDate: exp.startDate,
    ...(exp.endDate !== "present" && { endDate: exp.endDate }),
    summary: loc(exp.explanation, lang).trim(),
    ...(exp.stack?.length && { keywords: exp.stack }),
  })),
  education: formations.map((f) => ({
    institution: f.where,
    studyType: f.what,
    ...educationYears(f.when),
  })),
  certificates: certifications.map((c) => ({ name: loc(c.name, lang), date: String(c.year) })),
  skills: skills.flatMap((cat) =>
    cat.detail.map((s) => ({
      name: loc(s.title, lang),
      level: `${s.value}/4`,
      keywords: [loc(cat.category, lang)],
    }))
  ),
  meta: {
    canonical: `${SITE}/cv.${lang}.json`,
    lastModified: NOW.toISOString().slice(0, 19),
    language: lang,
  },
});

// ---------- JSON-LD schema.org ----------

const buildJsonLd = (lang) => {
  const technicalSkills = skills
    .filter((cat) => cat.id !== "soft")
    .flatMap((cat) => cat.detail.map((s) => loc(s.title, lang)));
  const allSkills = [...new Set(skills.flatMap((cat) => cat.detail.map((s) => loc(s.title, lang))))];

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: pageUrl(lang),
    inLanguage: lang,
    dateModified: TODAY,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: user.name,
      jobTitle: loc(user.headline, lang),
      description: summary(lang),
      url: `${SITE}/`,
      image: PICTURE,
      sameAs: user.profiles.map((p) => p.url),
      knowsAbout: allSkills,
      alumniOf: formations.map((f) => ({ "@type": "EducationalOrganization", name: f.where })),
      hasCredential: certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: loc(c.name, lang),
        dateCreated: String(c.year),
      })),
      hasOccupation: {
        "@type": "Occupation",
        name: loc(user.headline, lang),
        occupationLocation: { "@type": "Country", name: "France" },
        skills: technicalSkills.join(", "),
      },
    },
  };
};

// ---------- llms.txt (https://llmstxt.org) ----------

const buildLlmsTxt = () => {
  const coreSkills = skills
    .filter((cat) => cat.id !== "soft")
    .flatMap((cat) => cat.detail.filter((s) => s.value === 4).map((s) => loc(s.title, "en")));
  const sectors = [...new Set(experiences.filter((e) => e.sector).map((e) => loc(e.sector, "en")))];

  return [
    `# ${user.name}`,
    "",
    `> ${loc(user.headline, "en")}. ${summary("en")}`,
    "",
    `- Professional experience since ${firstStart.slice(0, 4)} (${yearsOfExperience} years)`,
    `- Current engagements: ${currentExperiences.map((e) => `${loc(e.role, "en")} at ${e.company}`).join("; ")}`,
    `- Core skills: ${coreSkills.join(", ")}`,
    `- Sectors: ${sectors.join(", ")}`,
    "- Languages of this site: French (primary) and English",
    "",
    "## Resume",
    "",
    `- [Resume in English (Markdown)](${SITE}/cv.en.md): full resume with experience, skills, education and certifications`,
    `- [CV en français (Markdown)](${SITE}/cv.fr.md): the same resume in French`,
    `- [Resume in English (PDF)](${SITE}/cv.en.pdf): printable version`,
    `- [CV en français (PDF)](${SITE}/cv.fr.pdf): printable version in French`,
    `- [JSON Resume, English](${SITE}/cv.en.json): machine-readable resume following the jsonresume.org v1.0.0 schema`,
    `- [JSON Resume, français](${SITE}/cv.fr.json): the same machine-readable resume in French`,
    "",
    "## Contact",
    "",
    `- [Contact form](${SITE}/en/#contact): send a message directly from the website`,
    ...user.profiles.map((p) => `- [${p.network}](${p.url})`),
    "",
    "## Optional",
    "",
    `- [Website in English](${SITE}/en/): the same resume as a web page`,
    `- [Full resume in both languages](${SITE}/llms-full.txt): English and French Markdown resumes in a single file`,
    "",
  ].join("\n");
};

const buildSitemap = () => {
  const alternates = LANGS.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(lang)}"/>`);
  const url = (lang) => [
    "  <url>",
    `    <loc>${pageUrl(lang)}</loc>`,
    ...alternates,
    `    <lastmod>${TODAY}</lastmod>`,
    "    <changefreq>monthly</changefreq>",
    `    <priority>${lang === "fr" ? "1.0" : "0.9"}</priority>`,
    "  </url>",
  ];
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...LANGS.flatMap(url),
    "</urlset>",
    "",
  ].join("\n");
};

// ---------- pages HTML : pré-rendu, méta-données localisées, JSON-LD ----------

const replaceOnce = (html, pattern, replacement, what) => {
  if (!pattern.test(html)) throw new Error(`postbuild: ${what} introuvable dans build/index.html`);
  return html.replace(pattern, () => replacement);
};

// Remplace la valeur d'un attribut, ex. setAttr(html, 'meta name="description"', "content", "…").
const setAttr = (html, selector, attr, value) => {
  const pattern = new RegExp(`(<${selector}[^>]*\\s${attr}=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`postbuild: <${selector}> introuvable dans build/index.html`);
  return html.replace(pattern, (_, before, after) => `${before}${escapeHtml(value)}${after}`);
};

const localizeHead = (html, lang) => {
  const { title, description } = translations[lang].meta;
  const url = pageUrl(lang);
  let out = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${lang}">`, "<html lang>");
  out = replaceOnce(out, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`, "<title>");
  out = setAttr(out, 'meta name="description"', "content", description);
  out = setAttr(out, 'meta property="og:title"', "content", title);
  out = setAttr(out, 'meta property="og:description"', "content", description);
  out = setAttr(out, 'meta property="og:url"', "content", url);
  out = setAttr(out, 'meta property="og:locale"', "content", LABELS[lang].locale);
  out = setAttr(out, 'meta property="og:image"', "content", OG_IMAGE);
  out = setAttr(out, 'meta name="twitter:title"', "content", title);
  out = setAttr(out, 'meta name="twitter:description"', "content", description);
  out = setAttr(out, 'meta name="twitter:url"', "content", url);
  out = setAttr(out, 'meta name="twitter:image"', "content", OG_IMAGE);
  if (OG_IMAGE !== PICTURE) out = setAttr(out, 'meta name="twitter:card"', "content", "summary_large_image");
  out = setAttr(out, 'link rel="canonical"', "href", url);
  return out;
};

const { render, renderPdf } = await import(pathToFileURL(SSR_ENTRY).href);
const template = readFileSync(join(BUILD, "index.html"), "utf8");

for (const lang of LANGS) {
  const appHtml = render(lang);
  const jsonLd = JSON.stringify(buildJsonLd(lang), null, 2).replace(/</g, "\\u003c");
  let html = localizeHead(template, lang);
  html = replaceOnce(
    html,
    /<!--\s*agent:jsonld\s*-->/,
    `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
    "le marqueur <!-- agent:jsonld -->"
  );
  html = replaceOnce(html, /<div id="root">\s*<\/div>/, `<div id="root">${appHtml}</div>`, '<div id="root">');

  const dir = lang === "fr" ? BUILD : join(BUILD, lang);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`postbuild: ${lang === "fr" ? "/" : `/${lang}/`} pré-rendu (${Math.round(appHtml.length / 1024)} Ko de HTML)`);
}

// ---------- fichiers pour les agents ----------

const outputs = {
  "llms.txt": buildLlmsTxt(),
  "sitemap.xml": buildSitemap(),
};
for (const lang of LANGS) {
  outputs[`cv.${lang}.md`] = buildMarkdown(lang);
  outputs[`cv.${lang}.json`] = JSON.stringify(buildJsonResume(lang), null, 2) + "\n";
  outputs[`cv.${lang}.pdf`] = await renderPdf(lang);
}
outputs["llms-full.txt"] = `${outputs["cv.en.md"]}\n---\n\n${outputs["cv.fr.md"]}`;

for (const [file, content] of Object.entries(outputs)) {
  writeFileSync(join(BUILD, file), content);
}

rmSync(join(ROOT, "build-ssr"), { recursive: true, force: true });

console.log(`postbuild: ${Object.keys(outputs).join(", ")}`);
