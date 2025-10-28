import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const Formation = ({where, what, when}) => {
  return (
      <AnimateOnScroll animation="fadeInUp" delay="0.2s" className="formations-item">
                <h3><span>{what}</span> - {where}</h3>
                <p>{when}</p>
              </AnimateOnScroll>
  );
};

export default Formation;
