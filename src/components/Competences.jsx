import React from "react";
import skill from "../assets/images/skill.png";
import datas from "../data/skills.json";
import ListSkills from "./common/ListSkills";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const Competences = ({ t }) => {
  // Organisation des compétences en 3 colonnes
  const column1 = ["Soft Skills", "Languages"];
  const column2 = ["Databases", "Architecture"];
  const column3 = ["Frameworks", "Version Control", "DevOps"];

  const getSkillsByColumn = (categories) => {
    return datas.filter(skill => categories.includes(skill.category));
  };

  return (
    <section id="competences">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="competences-image">
              <img src={skill} alt="#" />
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
                      <ListSkills title={skills.category} arr={skills.detail} />
                    </div>
                  ))}
                </div>
                {/* Colonne 2 */}
                <div className="competences-column">
                  {getSkillsByColumn(column2).map((skills, key) => (
                    <div key={key} className="competences-part">
                      <ListSkills title={skills.category} arr={skills.detail} />
                    </div>
                  ))}
                </div>
                {/* Colonne 3 */}
                <div className="competences-column">
                  {getSkillsByColumn(column3).map((skills, key) => (
                    <div key={key} className="competences-part">
                      <ListSkills title={skills.category} arr={skills.detail} />
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
