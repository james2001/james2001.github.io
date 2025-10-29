import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { withTranslation } from "react-i18next";
import CVDocument from "./CVDocument";
import userData from "../data/user.json";
import skillsData from "../data/skills.json";
import experiencesData from "../data/experiences.json";
import certificationsData from "../data/certifications.json";

const ExportPDF = ({ t, i18n }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async (anonymous = false) => {
    setIsExporting(true);

    try {
      const currentLang = i18n.language;

      // Générer le document PDF
      const blob = await pdf(
        <CVDocument
          userData={userData}
          skillsData={skillsData}
          experiencesData={experiencesData}
          certificationsData={certificationsData}
          lang={currentLang}
          anonymous={anonymous}
        />
      ).toBlob();

      // Créer un lien de téléchargement
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = anonymous
        ? "CV_Anonyme.pdf"
        : "CV_Stephane_Rathgeber.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libérer l'URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
      alert(`Une erreur est survenue lors de l'export du PDF: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="export-pdf-buttons">
      <button
        onClick={() => exportToPDF(false)}
        disabled={isExporting}
        className="btn-export-pdf btn-export-icon-only"
        title={t("export.normal")}
      >
        {isExporting ? "⏳" : "📄"}
      </button>
      <button
        onClick={() => exportToPDF(true)}
        disabled={isExporting}
        className="btn-export-pdf btn-export-anonymous btn-export-icon-only"
        title={t("export.anonymous")}
      >
        {isExporting ? "⏳" : "🔒"}
      </button>
    </div>
  );
};

export default withTranslation("common")(ExportPDF);
