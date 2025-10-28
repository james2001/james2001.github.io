import React from "react";
import cap from "../assets/images/graduation.png";
import datas from "../data/formations.json";
import Formation from "./common/Formation";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const Formations = ({ t }) => {
  return (
    <section id="formations">
      <div className="container">
        <div className="graduation-image">
          <img src={cap} alt="skill" />
        </div>
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="section-title">
              <h2>{t("title.trainings")}</h2>
            </AnimateOnScroll>
          </div>
          <div className="col-12">
            <div className="formations-main">
              {datas.map((formation, key) => {
                return (
                  <Formation
                    key={key}
                    where={formation.where}
                    when={formation.when}
                    what={formation.what}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation("common")(Formations);
