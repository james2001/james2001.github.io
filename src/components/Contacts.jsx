import React, { useState } from "react";
import contact from "../assets/images/contact.png";
import arrowUp from "../assets/images/rotated-arrow.png";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const initialState = { message: "", email: "", name: "", subject: "" };

const Contacts = ({ t }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const endpoint =
      "https://s9lw39huze.execute-api.eu-west-3.amazonaws.com/default/sendContactEmail";
    const body = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      body,
    };

    fetch(endpoint, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetch");
        return response.json();
      })
      .then(() => {
        setFormData(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="section-title">
              <h2>{t("title.contact")}</h2>
            </AnimateOnScroll>
          </div>
          <div className="col-12">
            <AnimateOnScroll animation="fadeInUp" delay="0.3s" className="contact-wraper">
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    required="required"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required="required"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Sujet"
                    required="required"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  cols="10"
                  rows="10"
                  name="message"
                  placeholder="Message"
                  required="required"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="form-btn">
                  <button type="submit">Envoyer</button>
                </AnimateOnScroll>
              </form>
            </AnimateOnScroll>
          </div>
        </div>
        <div className="mailbox-image">
          <img src={contact} alt="#" />
        </div>
      </div>
      <div className="back-to-top">
        <a href="#header">
          <img src={arrowUp} alt="#" />
        </a>
      </div>
    </section>
  );
};

export default withTranslation("common")(Contacts);
