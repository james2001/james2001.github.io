import React from "react";
import calender from "../../assets/images/calendar.svg";
import location from "../../assets/images/pin.svg";
import AnimateOnScroll from "./AnimateOnScroll";
import { useTranslation } from "react-i18next";

const formatDate = (startDate, endDate, lang) => {
  const months = {
    fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };

  const baseLang = lang?.substring(0, 2) || "en";
  const monthNames = months[baseLang] || months.en;
  const present = { fr: "Aujourd'hui", en: "Present" };

  const [startYear, startMonth] = startDate.split("-");
  const startMonthName = monthNames[parseInt(startMonth) - 1];

  if (endDate === "present") {
    return `${startMonthName} ${startYear} - ${present[baseLang] || present.en}`;
  }

  const [endYear, endMonth] = endDate.split("-");
  const endMonthName = monthNames[parseInt(endMonth) - 1];

  return `${startMonthName} ${startYear} - ${endMonthName} ${endYear}`;
};

const getLocalizedText = (field, lang) => {
  if (typeof field !== 'object') return field;
  const baseLang = lang?.substring(0, 2) || "en";
  return field[baseLang] || field.en;
};

const ExpTree = ({ data }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="experiances-item">
    <div className="experiance-position">
      <div className="experiances-name">
        <h3>{getLocalizedText(data.role, currentLang)}</h3>
        <p>{formatDate(data.startDate, data.endDate, currentLang)} <img src={calender} alt="calender"/></p>
        <p><span>{data.location}</span> <img src={location} alt="location" /></p>
      </div>
    </div>
    <div className="experiance-office">
      <h3>{data.company}</h3>
      <p>{getLocalizedText(data.explanation, currentLang)}</p>
    </div>
  </AnimateOnScroll>
  );
};

export default ExpTree;
