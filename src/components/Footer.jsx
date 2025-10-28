import React from "react";
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import malt from "../assets/images/malt.svg";
import linkedin from "../assets/images/linkedin.svg";
import user from "../data/user.json";
import AnimateOnScroll from "./common/AnimateOnScroll";
import { WebsiteCarbonBadge } from "react-websitecarbon-badge";


const Footer = () => {
  
  return (
    <section id="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-wraper">
              <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="copyright">
                <p>© 2021 {user.name}</p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInUp" delay="0.3s" className="footer-social">
                <a href="https://www.instagram.com/defispatisserie" className="link-instagram" target="_blank" rel="noreferrer">
                  <img src={instagram} alt="instagram" />
                </a>
                <a href="https://www.facebook.com/stephane.rathgeber" className="link-facebook" target="_blank" rel="noreferrer">
                  <img src={facebook} alt="facebook" />
                </a>
                <a href="https://twitter.com/DeveloppeurFree" className="link-twitter" target="_blank" rel="noreferrer">
                  <img src={twitter} alt="twitter" />
                </a>
                <a href="https://www.malt.fr/profile/stephanerathgeber" className="link-malt" target="_blank" rel="noreferrer">
                  <img src={malt} alt="malt" />
                </a>
                <a href="https://www.linkedin.com/in/stephane-rathgeber/" className="link-linkedin" target="_blank" rel="noreferrer">
                  <img src={linkedin} alt="linkedin" />
                </a>
              </AnimateOnScroll>
            </div>
          </div>
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.5s" className="website-carbon-badge">
              <WebsiteCarbonBadge url="https://stephane.rathgeber.alsace/" />
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
