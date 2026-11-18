import React, { useState } from "react";
import profile2 from "../assets/images/profil-2.png";
import arrow_down from "../assets/images/curly-arrow.png";
import user from "../data/user.json";
import AnimateOnScroll from "./common/AnimateOnScroll";
import { useTranslation } from "react-i18next";

const imagesPath = {
  smile: user.picture,
  smile2: profile2
}

const Main = () => {
  const { i18n } = useTranslation();
  const baseLang = i18n.language?.substring(0, 2) || "en";
  const currentLang = ["fr", "en"].includes(baseLang) ? baseLang : "en";
  const [smile, setSmile] = useState(true);

  const toggleImage = () => setSmile(prev => !prev);
  const imageName = smile ? 'smile' : 'smile2';

  return (
    <div className="header-content">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="zoomInUp" delay="0s" className="header-content-wraper">
              <h1>{user.name}</h1>
              <h5>{user.headline[currentLang]}</h5>
              <AnimateOnScroll animation="zoomInUp" delay="0.1s" className="profile-photo">
                <img src={imagesPath[imageName]} alt={user.name} onClick={toggleImage} />
              </AnimateOnScroll>
              <AnimateOnScroll animation="zoomInUp" delay="0.2s" className="arrow-down">
                <a href="#qui-suis-je">
                  <img src={arrow_down} alt="down" />
                </a>
              </AnimateOnScroll>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
