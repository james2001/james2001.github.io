import "bootstrap/dist/css/bootstrap.css";
import "./App.scss"
import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Competences from "./components/Competences";
import Experiences from "./components/Experiences";
import Formations from "./components/Formations";
import Certifications from "./components/Certifications";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <section id="header">
        <Header />
        <Main />
      </section>
      <About />
      <Competences />
      <Experiences />
      <Formations />
      <Certifications />
      <Contacts />
      <Footer />
    </Fragment>
  );
}

export default App;
