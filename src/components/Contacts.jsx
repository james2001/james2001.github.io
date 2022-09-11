import React from "react";
import contact from "../assets/images/contact.png";
import arrowUp from "../assets/images/rotated-arrow.png";
import { withTranslation } from "react-i18next";

const initialState = { message: "", email: "", name: "", subject: "" };
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const endpoint =
      "https://s9lw39huze.execute-api.eu-west-3.amazonaws.com/default/sendContactEmail";
    const body = JSON.stringify(this.state);

    const requestOptions = {
      method: "POST",
      body,
    };

    fetch(endpoint, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetch");
        return response.json();
      })
      .then((response) => {
        this.setState(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { t } = this.props;

    return (
      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-title wow animate__animated animate__fadeInUp"
                data-wow-delay="0.1s"
              >
                <h2>{t("title.contact")}</h2>
              </div>
            </div>
            <div className="col-12">
              <div
                className="contact-wraper wow animate__animated animate__fadeInUp"
                data-wow-delay="0.3s"
              >
                <form onSubmit={this.handleSubmit}>
                  <div className="input-box">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom"
                      required="required"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      required="required"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Sujet"
                      required="required"
                      value={this.state.subject}
                      onChange={(event) => this.handleChange(event)}
                    />
                  </div>
                  <textarea
                    cols="10"
                    rows="10"
                    name="message"
                    placeholder="Message"
                    required="required"
                    value={this.state.message}
                    onChange={(event) => this.handleChange(event)}
                  ></textarea>
                  <div
                    className="form-btn wow animate__animated animate__fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <button type="submit">Envoyer</button>
                  </div>
                </form>
              </div>
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
  }
}

export default withTranslation("common")(Contacts);
