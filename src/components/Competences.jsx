import React from "react";
import skill from "../assets/images/skill.png";
import datas from "../data/skills.json";
import ListSkills from "./common/ListSkills";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const Competences = ({ t, i18n }) => {
  const baseLang = i18n.language?.substring(0, 2) || "en";
  const currentLang = ["fr", "en"].includes(baseLang) ? baseLang : "en";

  // Organisation des compétences en 3 colonnes, par identifiant de catégorie (voir skills.json)
  const column1 = ["soft", "languages", "ai", "vcs"];
  const column2 = ["frameworks", "databases", "compliance"];
  const column3 = ["architecture", "devops", "cloud"];

  const getSkillsByColumn = (ids) => {
    return ids.map((id) => datas.find((skill) => skill.id === id)).filter(Boolean);
  };

  return (
    <section id="competences">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="competences-image">
              <img src={skill} alt="" />
            </div>
          </div>
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="section-title">
              <h2>{t("title.skills")}</h2>
            </AnimateOnScroll>
            <div className="competences-main">
              <div className="competences-wraper">
                {/* Colonne 1 */}
                <div className="competences-column">
                  {getSkillsByColumn(column1).map((skills, key) => (
                    <div key={key} className="competences-part">
                      <ListSkills title={skills.category[currentLang]} arr={skills.detail} lang={currentLang} />
                    </div>
                  ))}
                </div>
                {/* Colonne 2 */}
                <div className="competences-column">
                  {getSkillsByColumn(column2).map((skills, key) => (
                    <div key={key} className="competences-part">
                      <ListSkills title={skills.category[currentLang]} arr={skills.detail} lang={currentLang} />
                    </div>
                  ))}
                </div>
                {/* Colonne 3 */}
                <div className="competences-column">
                  {getSkillsByColumn(column3).map((skills, key) => (
                    <div key={key} className="competences-part">
                      <ListSkills title={skills.category[currentLang]} arr={skills.detail} lang={currentLang} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation("common")(Competences);
