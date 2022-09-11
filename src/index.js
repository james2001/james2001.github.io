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
