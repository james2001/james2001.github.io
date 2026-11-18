import React, { Fragment, useEffect, useState } from 'react';
import close from '../assets/images/close.svg';
import menu from '../assets/images/menu.svg';
import github from '../assets/images/github.png';
import flagFr from '../assets/images/flag-fr.svg';
import flagGb from '../assets/images/flag-gb.svg';
import user from '../data/user.json';
import { withTranslation } from 'react-i18next';
import ExportPDF from './ExportPDF';

const NAV_ITEMS = [
  { href: '#qui-suis-je', key: 'title.about' },
  { href: '#competences', key: 'title.skills' },
  { href: '#experiances', key: 'title.experiences' },
  { href: '#formations', key: 'title.trainings' },
  { href: '#certifications', key: 'title.certifications' },
  { href: '#contact', key: 'title.contact', className: 'nav-button' },
];

const NavLinks = ({ t, onNavigate }) => (
  <ul className="navbar-nav ms-auto">
    {NAV_ITEMS.map(({ href, key, className }, index) => (
      <li className="nav-item" key={href}>
        <a
          className={['nav-link', index === 0 && 'active', className].filter(Boolean).join(' ')}
          href={href}
          onClick={onNavigate}
        >
          {t(key)}
        </a>
      </li>
    ))}
  </ul>
);

const Header = ({ t, i18n }) => {
  const chooseLanguage = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {
      // Stockage indisponible (navigation privée…) : le choix vaut pour la visite en cours.
    }
  };

  // Menu mobile piloté par React : le JS de Bootstrap n'est pas chargé sur le site.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <span className="navbar-brand">{user.name}</span>
          <div className='container-button'>
            <button onClick={() => chooseLanguage('fr')} className="flag-button" aria-label={t('a11y.langFr')} title={t('a11y.langFr')}>
              <img src={flagFr} alt="" className="flag-icon" />
            </button>
            <button onClick={() => chooseLanguage('en')} className="flag-button" aria-label={t('a11y.langEn')} title={t('a11y.langEn')}>
              <img src={flagGb} alt="" className="flag-icon" />
            </button>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={t('a11y.openMenu')}
          >
            <img src={menu} alt="" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLinks t={t} />
            <ExportPDF />
          </div>
        </div>
      </nav>

      <a
        className="fork-github"
        href="https://github.com/james2001/james2001.github.io"
        target="_blank" rel="noreferrer"
      >
        <img src={github} alt={t('a11y.sourceCode')} />
      </a>

      <div
        className={`offcanvas offcanvas-end mobile-menu-wraper${menuOpen ? ' show' : ''}`}
        tabIndex={-1}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="offcanvas-header">
          <button type="button" onClick={closeMenu} aria-label={t('a11y.closeMenu')}>
            <img src={close} alt="" />
          </button>
        </div>
        <div className="offcanvas-body">
          <NavLinks t={t} onNavigate={closeMenu} />
        </div>
      </div>
      {menuOpen && <div className="offcanvas-backdrop fade show" onClick={closeMenu} />}
    </Fragment>
  );
};

export default withTranslation('common')(Header);
