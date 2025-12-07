import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ImageHeaderDesktop from '../assets/img/webp/banner-home-desktop.webp';
import ImageHeaderMobile from '../assets/img/webp/banner-home-mobile.webp';
import BorderIcon from '../assets/img/svg/border.svg';
import BorderBigIcon from '../assets/img/svg/border-big.svg';
import ChickyEmpaque from '../assets/img/webp/chicky-empaque.webp';
import Mochilas from '../assets/img/webp/mochilas.webp';
import SEO from '../components/SEO';
import GetInto from '../components/GetInto';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleIngresarCodigosClick = () => {
    if (isAuthenticated) {
      navigate('/ingresar-codigos');
    } else {
      setIsLoginModalOpen(true);
    }
  };
  return (
    <>
      {/* SEO Optimization */}
      <SEO
        title="Chiky Stranger Things - Registrá códigos y ganá premios exclusivos"
        description="Comprá Chiky, registrá tus códigos promocionales y ganá mochilas, loncheras y cartucheras de Stranger Things. Participá en la promoción oficial de Chiky y ganá premios increíbles."
        keywords="Chiky, Stranger Things, promoción, códigos promocionales, ganar premios, mochilas, loncheras, cartucheras, sorteo, Pozuelo"
        ogTitle="Chiky Stranger Things - ¡Participá y ganá!"
        ogDescription="Comprá Chiky, registrá códigos y ganá increíbles premios de Stranger Things"
        ogUrl="https://chikystrangerthings.com"
        canonical="https://chikystrangerthings.com"
      />
      {/* WCAG 2.4.1 - Landmark regions */}
      <header className='home top-space' role="banner" aria-label="Encabezado principal de Chiky Stranger Things">

        {/* Introducción al programa - WCAG 1.3.1 */}
        <section aria-labelledby="hero-heading" className="hero-section responsive-box">
          <h1 id="hero-heading" className="visually-hidden">
            Bienvenido a la promoción Chiky Stranger Things
          </h1>
          {/* WCAG 1.1.1 - Imágenes con texto alternativo descriptivo */}
          <img
            src={ImageHeaderDesktop}
            alt="Banner promocional Chiky Stranger Things - Comprá, registrá códigos y ganá premios exclusivos"
            className="desktop"
            loading="eager"
          />
          <img
            src={ImageHeaderMobile}
            alt="Banner promocional Chiky Stranger Things - Comprá, registrá códigos y ganá premios exclusivos"
            className="mobile"
            loading="eager"
          />
        </section>

        {/* WCAG 2.4.4 - Call to action con propósito claro */}
        <section aria-label="Acciones principales" className='responsive-box cta-buttons'>
          <button
            onClick={handleIngresarCodigosClick}
            aria-label="Ir a la página para ingresar códigos promocionales"
            className="btn-code"
          >
            Ingresá códigos
          </button>
          <NavLink
            to="/registrate"
            aria-label="Ir a la página de registro de usuario"
            className="btn-code"
          >
            {({ isActive }) => (
              <span aria-current={isActive ? 'page' : undefined}>
                Regístrate
              </span>
            )}
          </NavLink>
        </section>
      </header>

      {/* WCAG 1.1.1 - Imagen decorativa */}
      <figure className="decorative-border responsive-box " aria-hidden="true">
        <img
          src={BorderIcon}
          alt=""
          aria-hidden="true"
          role="presentation"
          className='mobile'
        />
        <img
          src={BorderBigIcon}
          alt=""
          aria-hidden="true"
          role="presentation"
          className='desktop'
        />
      </figure>

      {/* WCAG 2.4.1 - Main content landmark */}
      <main id="main-content" role="main" aria-label="Contenido principal" className='responsive-box'>

        {/* Cómo participar - WCAG 1.3.1, 2.4.6 */}
        <section aria-labelledby="como-participar-heading" className="how-to-participate-section">
          <h2 id="como-participar-heading" className='shadow text-transform-uppercase'>¿Cómo participar?</h2>

          {/* WCAG 1.3.1 - Lista ordenada semántica */}
          <ol
            className="steps-list"
            aria-label="Pasos para participar en la promoción"
          >
            <li>
              <div className="step-number" aria-label="Paso 1">
                <div>
                  <h2 aria-hidden="true">1</h2>
                </div>
              </div>
              <p>
                <strong>COMPRÁ<br />CHIKY</strong>
              </p>
            </li>
            <li>
              <div className="step-number" aria-label="Paso 2">
                <div>
                  <h2 aria-hidden="true">2</h2>
                </div>
              </div>
              <p>
                <strong>REGISTRÁ</strong> <br/> LOS CÓDIGOS EN <br />
                <NavLink
                  to="/"
                  aria-label="Ir a la página principal de chikystrangerthings.com"
                >
                  {({ isActive }) => (
                    <span aria-current={isActive ? 'page' : undefined}>
                      chikystrangerthings.com
                    </span>
                  )}
                </NavLink>
              </p>
            </li>
            <li>
              <div className="step-number" aria-label="Paso 3">
                <div>
                  <h2 aria-hidden="true">3</h2>
                </div>
              </div>
              <p>
                GANÁ <strong>MOCHILAS, LONCHERAS Y CARTUCHERAS</strong>
              </p>
            </li>
          </ol>

          {/* WCAG 1.1.1 - Imagen de producto con alt descriptivo */}
          <figure role="group" aria-label="Imagen del producto Chiky" className='empaque'>
            <img
              src={ChickyEmpaque}
              alt="Empaque de producto Chiky con código promocional para participar"
              loading="lazy"
            />
          </figure>
        </section>

        {/* Estadísticas de premios - WCAG 1.3.1, 4.1.2 */}
        <section className='units-containers' aria-labelledby="estadisticas-heading">
          <h2 id="estadisticas-heading" className="visually-hidden">
            Estadísticas de premios disponibles
          </h2>

          <div className="stats-container">
            {/* WCAG 1.1.1 - Imagen informativa */}
            <h2 className='shadow text-transform-uppercase'>
              Quedan pocas unidades
            </h2>

            {/* WCAG 4.1.2 - Campos de solo lectura con aria-readonly */}
            <div role="group" aria-labelledby="contadores-heading">
              <h3 id="contadores-heading" className="visually-hidden">
                Contadores de códigos promocionales
              </h3>

              <section className='stat'>
                <div className="stat-item">
                  <label htmlFor="codigos-totales" id="label-codigos-totales">
                    Códigos totales
                  </label>
                  <input
                    type="text"
                    value="100"
                    id="codigos-totales"
                    aria-labelledby="label-codigos-totales"
                    aria-readonly="true"
                    readOnly
                    tabIndex={-1}
                    aria-describedby="desc-codigos-totales"
                    disabled
                  />
                  <span id="desc-codigos-totales" className="visually-hidden">
                    Número total de códigos promocionales disponibles en la campaña
                  </span>
                </div>

                <div className="stat-item">
                  <label htmlFor="codigos-sin-canjear" id="label-codigos-sin-canjear">
                    Códigos sin canjear
                  </label>
                  <input
                    type="text"
                    value="10"
                    id="codigos-sin-canjear"
                    aria-labelledby="label-codigos-sin-canjear"
                    aria-readonly="true"
                    readOnly
                    tabIndex={-1}
                    aria-describedby="desc-codigos-sin-canjear"
                    aria-live="polite"
                    disabled
                  />
                  <span id="desc-codigos-sin-canjear" className="visually-hidden">
                    Número de códigos promocionales aún disponibles para canjear por premios
                  </span>
                </div>
              </section>
            </div>
          </div>

          {/* WCAG 1.1.1 - Imagen de premios */}
          <figure role="group" aria-label="Imagen de los premios">
            <img
              src={Mochilas}
              alt="Premios disponibles: mochilas, loncheras y cartucheras de Stranger Things"
              loading="lazy"
            />
          </figure>
        </section>
      </main>

      {/* Modal de login */}
      <GetInto
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Home;
