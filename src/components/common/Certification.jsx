import React from "react";
import { useTranslation } from "react-i18next";

const Certification = ({name, year}) => {
    const { i18n } = useTranslation();
    const baseLang = i18n.language?.substring(0, 2) || "en";
    const currentLang = ["fr", "en"].includes(baseLang) ? baseLang : "en";
    const displayName = typeof name === 'object' ? (name[currentLang] || name.en) : name;

    return (
        <p>- {displayName} <span>{year}</span></p>
        );
    };

export default Certification;
    