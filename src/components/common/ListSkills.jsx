import React from "react";
import RatingDot from "./RatingDot";
import AnimateOnScroll from "./AnimateOnScroll";

const ListSkills = ({ title, arr }) => {
  return (
    <AnimateOnScroll animation="fadeInLeft" delay="0s" className="competences-item-main">
    <div className="competences-name">
        <h4>{title}</h4>
      </div>
      <div className="competences-item-wraper">
        {arr.map((a, key) => {
          return (
                <div key={key} className="competences-item">
                  <h3>{a.title}</h3>
                <RatingDot value={a.value} />
            </div>
          );
        })}
      </div>
    </AnimateOnScroll>
  );
};

export default ListSkills;
