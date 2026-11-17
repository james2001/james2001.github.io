import React from "react";

const RatingDot = ({ value }) => {
  const getDot = () => {
    let arr = [];
    for (let i = 1; i <= 4; i++) {
      if (i > value) {
        arr.push(<span key={i} className="unfill-color" aria-hidden="true"></span>);
      } else {
        arr.push(<span key={i} className="fill-color" aria-hidden="true"></span>);
      }
    }
    return arr;
  };
  // Le niveau en texte (masqué visuellement) le rend lisible par les lecteurs d'écran et les agents IA.
  return (
    <div className="competences-rating">
      {getDot()}
      <span className="visually-hidden">{`${value}/4`}</span>
    </div>
  );
};

export default RatingDot;
