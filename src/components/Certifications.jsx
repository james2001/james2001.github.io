import React from "react";
import Certification from "./common/Certification";
import openclassrooms from "../assets/images/openclassrooms.png";
import datas from "../data/certifications.json";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const Certifications = ({ t }) => {
  return (
    <section id="certifications">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="section-title">
              <h2>{t("title.certifications")}</h2>
            </AnimateOnScroll>
          </div>

          <div className="col-12">
            <div className="certifications-wraper">
              <AnimateOnScroll animation="fadeInUp" delay="0.2s" className="certifications-left">
                <img src={openclassrooms} alt="#" />
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInUp" delay="0.3s" className="certifications-list">
                {datas.map((certification, key) => {
                  return (
                    <Certification
                      key={key}
                      name={certification.name}
                      year={certification.year}
                    />
                  );
                })}
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation("common")(Certifications);
