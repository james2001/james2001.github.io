import React from "react";
import { useInView } from "react-intersection-observer";

const AnimateOnScroll = ({ children, animation = "fadeInUp", delay = "0s", className = "" }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClass = inView ? `animate__animated animate__${animation}` : "";
  const combinedClassName = `${className} ${animationClass}`.trim();

  return (
    <div
      ref={ref}
      className={combinedClassName}
      style={{ animationDelay: inView ? delay : "0s" }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
