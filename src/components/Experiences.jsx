import React from "react";
import tree from "../assets/images/tree.png";
import ExpTree from "./common/ExpTree";
import datas from "../data/experiences.json";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const Experiences = ({ t }) => {
  return (
    <section id="experiances">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="section-title">
              <h2>{t("title.experiences")}</h2>
            </AnimateOnScroll>
          </div>
          <div className="col-12">
            <div className="experiances-main">
              {datas.map((experience, key) => {
                return <ExpTree key={key} data={experience} />;
              })}
            </div>
          </div>
        </div>
        <div className="tree-image">
          <img src={tree} alt="#" />
        </div>
      </div>
    </section>
  );
};

export default withTranslation("common")(Experiences);
