// Point d'entrée utilisé uniquement au build (vite build --ssr) par scripts/postbuild.mjs :
// pré-rendu HTML de la page (lisible sans JavaScript par les robots et agents IA)
// et génération des PDF statiques du CV.
import React from "react";
import { renderToString } from "react-dom/server";
import { renderToBuffer } from "@react-pdf/renderer";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import CVDocument from "./components/CVDocument";
import userData from "./data/user.json";
import skillsData from "./data/skills.json";
import experiencesData from "./data/experiences.json";
import certificationsData from "./data/certifications.json";
import formationsData from "./data/formations.json";
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";

const createI18n = (lng) => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng,
    fallbackLng: "en",
    initAsync: false,
    interpolation: { escapeValue: false },
    resources: {
      en: { common: common_en },
      fr: { common: common_fr },
    },
  });
  return i18n;
};

export function render(lng = "fr") {
  return renderToString(
    <I18nextProvider i18n={createI18n(lng)}>
      <App />
    </I18nextProvider>
  );
}

export function renderPdf(lng = "fr") {
  const t = createI18n(lng).getFixedT(lng, "common");
  const summary = ["about.part_1", "about.part_2", "about.part_3"].map((key) => t(key)).join(" ");

  return renderToBuffer(
    <CVDocument
      userData={userData}
      skillsData={skillsData}
      experiencesData={experiencesData}
      certificationsData={certificationsData}
      formationsData={formationsData}
      summary={summary}
      lang={lng}
      anonymous={false}
    />
  );
}
