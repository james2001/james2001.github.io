import React from "react";
import { useTranslation } from "react-i18next";

const Certification = ({name, year}) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const displayName = typeof name === 'object' ? name[currentLang] : name;

    return (
        <p>- {displayName} <span>{year}</span></p>
        );
    };

export default Certification;
    