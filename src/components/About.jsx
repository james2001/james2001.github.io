import React from "react";
import dev from "../assets/images/dev.png";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const About = ({ t }) => {
  return (
    <section id="qui-suis-je">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="qui-suis-je-image">
              <img src={dev} alt="moi" />
            </div>
            <AnimateOnScroll animation="fadeInUp" delay="0s" className="qui-suis-je-content">
              <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="section-title">
                <h2>{t("title.about")}</h2>
              </AnimateOnScroll>
              <p>{t("about.part_1")}</p>
              <p>{t("about.part_2")}</p>
              <p>{t("about.part_3")}</p>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation("common")(About);
