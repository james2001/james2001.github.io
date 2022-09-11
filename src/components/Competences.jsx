import React from "react";
import skill from "../assets/images/skill.png";
import datas from "../data/skills.json";
import ListSkills from "./common/ListSkills";
import { withTranslation } from "react-i18next";

const Competences = ({ t }) => {
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
            <div
              className="section-title wow animate__animated animate__fadeInUp"
              data-wow-delay="0.1s"
            >
              <h2>{t("title.skills")}</h2>
            </div>
            <div className="competences-main">
              <div className="competences-wraper">
                {datas.map((skills, key) => {
                  return (
                    <div key={key} className="competences-part">
                      <ListSkills title={skills.category} arr={skills.detail} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation("common")(Competences);
