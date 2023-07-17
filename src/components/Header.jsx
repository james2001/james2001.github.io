import React, { Fragment } from 'react';
import close from '../assets/images/close.svg';
import menu from '../assets/images/menu.svg';
import github from '../assets/images/github.png';
import user from '../data/user.json';
import { withTranslation } from 'react-i18next';

const Header = ({ t }) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <span className="navbar-brand">{user.name}</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobile-menu"
            aria-controls="mobile-menu"
          >
            <img src={menu} alt="menu" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#qui-suis-je">
                  {t('title.about')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#competences">
                  {t('title.skills')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#experiances">
                  {t('title.experiences')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#formations">
                  {t('title.trainings')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#certifications">
                  {t('title.certifications')}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-button" href="#contact">
                  {t('title.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <a
        className="fork-github"
        href="https://github.com/james2001/james2001.github.io"
      >
        <img src={github} alt="#" />
      </a>

      <div
        className="offcanvas offcanvas-end mobile-menu-wraper"
        tabIndex={-1}
        id="mobile-menu"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <img src={close} alt="#" />
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#qui-suis-je">
                {t('title.about')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#competences">
                {t('title.skills')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experiances">
                {t('title.experiences')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#formations">
                {t('title.trainings')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#certifications">
                {t('title.certifications')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-button" href="#contact">
                {t('title.contact')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default withTranslation('common')(Header);
