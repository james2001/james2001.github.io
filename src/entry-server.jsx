// Point d'entrée utilisé uniquement au build (vite build --ssr) pour pré-rendre
// la page en HTML statique : les robots et agents IA qui n'exécutent pas le
// JavaScript lisent ainsi le contenu complet du CV.
import React from "react";
import { renderToString } from "react-dom/server";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";

export function render(lng = "fr") {
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

  return renderToString(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
}
