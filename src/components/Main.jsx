import React from "react";
import profile2 from "../assets/images/profil-2.png";
import arrow_down from "../assets/images/curly-arrow.png";
import user from "../data/user.json";
import AnimateOnScroll from "./common/AnimateOnScroll";

const imagesPath = {
  smile: user.picture,
  smile2: profile2
}

class Main extends React.Component {

  state = {
    smile: true
  }
  toggleImage = () => {
    this.setState(state => ({ smile: !state.smile }))
  }

  getImageName = () => this.state.smile ? 'smile' : 'smile2'

  render () {
    const imageName = this.getImageName();
    return (
      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <AnimateOnScroll animation="zoomInUp" delay="0s" className="header-content-wraper">
                <h1>{user.name}</h1>
                <h5>Tech Lead Symfony</h5>
                <AnimateOnScroll animation="zoomInUp" delay="0.1s" className="profile-photo">
                  <img src={imagesPath[imageName]} alt="me" onClick={this.toggleImage } />
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
  }
};

export default Main;
