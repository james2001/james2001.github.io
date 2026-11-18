import React, { useState } from "react";
import contact from "../assets/images/contact.png";
import arrowUp from "../assets/images/rotated-arrow.png";
import user from "../data/user.json";
import { withTranslation } from "react-i18next";
import AnimateOnScroll from "./common/AnimateOnScroll";

const ENDPOINT = "https://s9lw39huze.execute-api.eu-west-3.amazonaws.com/default/sendContactEmail";
const initialState = { message: "", email: "", name: "", subject: "" };
const directProfiles = user.profiles.filter((p) => ["LinkedIn", "Malt"].includes(p.network));

const Contacts = ({ t }) => {
  const [formData, setFormData] = useState(initialState);
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, { method: "POST", body: JSON.stringify(formData) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setFormData(initialState);
      setStatus("success");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setStatus("error");
    }
  };

  const isSending = status === "sending";

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
                    placeholder={t("contact.name")}
                    aria-label={t("contact.name")}
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.email")}
                    aria-label={t("contact.email")}
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder={t("contact.subject")}
                    aria-label={t("contact.subject")}
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  cols="10"
                  rows="10"
                  name="message"
                  placeholder={t("contact.message")}
                  aria-label={t("contact.message")}
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <AnimateOnScroll animation="fadeInUp" delay="0.1s" className="form-btn">
                  <button type="submit" disabled={isSending}>
                    {isSending ? t("contact.sending") : t("contact.send")}
                  </button>
                </AnimateOnScroll>
                <p className={`contact-status${status === "error" ? " is-error" : ""}`} role="status" aria-live="polite">
                  {status === "success" && t("contact.success")}
                  {status === "error" && t("contact.error")}
                </p>
              </form>
              <p className="contact-alternative">
                {t("contact.alternative")}{" "}
                {directProfiles.map((profile, index) => (
                  <React.Fragment key={profile.network}>
                    {index > 0 && ` ${t("contact.or")} `}
                    <a href={profile.url} target="_blank" rel="noreferrer">{profile.network}</a>
                  </React.Fragment>
                ))}
                .
              </p>
            </AnimateOnScroll>
          </div>
        </div>
        <div className="mailbox-image">
          <img src={contact} alt="" />
        </div>
      </div>
      <div className="back-to-top">
        <a href="#header" aria-label={t("a11y.backToTop")}>
          <img src={arrowUp} alt="" />
        </a>
      </div>
    </section>
  );
};

export default withTranslation("common")(Contacts);
