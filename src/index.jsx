import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from "i18next";
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";

i18next
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },  // React already does escaping
    fallbackLng: 'en',
    detection: {
      // /en/ affiche l'anglais (page pré-rendue en anglais), sinon choix mémorisé puis langue du navigateur.
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      // Seul un clic sur un drapeau mémorise la langue (voir Header) : visiter /en/ ne doit pas
      // faire basculer durablement la page française en anglais.
      caches: [],
    },
    resources: {
      en: {
        common: common_en               // 'common' is our custom namespace
      },
      fr: {
        common: common_fr
      },
    },
  });

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
