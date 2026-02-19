import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ImageHeaderDesktop from '../assets/img/webp/banner-home-desktop.webp';
import ImageHeaderMobile from '../assets/img/webp/banner-home-mobile.webp';
import BorderIcon from '../assets/img/svg/border.svg';
import BorderBigIcon from '../assets/img/svg/border-big.svg';
import ChickyEmpaque from '../assets/img/webp/chicky-empaque.webp';
import Mochilas from '../assets/img/webp/mochilas.webp';
import ChickyLogo from '../assets/img/webp/chicky-logo.webp';
// import CharacterImg from '../assets/img/webp/character.webp';
import SEO from '../components/SEO';
import GetInto from '../components/GetInto';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../context/AuthContext';
import countriesService from '../services/countries.service';
import prizesService from '../services/prizes.service';
import type { Country, PrizeStatsResponse } from '../types/api';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Estados para el modal de selección de país
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  // Estados para estadísticas de premios
  const [prizeStats, setPrizeStats] = useState<PrizeStatsResponse['data'] | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Referencias para el modal
  const countryModalRef = useRef<HTMLDivElement>(null);
  const countrySelectRef = useRef<HTMLSelectElement>(null);

  const handleIngresarCodigosClick = () => {
    if (isAuthenticated) {
      navigate('/ingresar-codigos');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Cargar países al montar el componente
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoadingCountries(true);
        const response = await countriesService.getCountries();

        if (response && response.data && Array.isArray(response.data)) {
          setCountries(response.data);

          // Verificar si hay un país guardado en localStorage
          const savedCountryId = localStorage.getItem('selectedCountryIdHome');
          if (savedCountryId) {
            const country = response.data.find(c => c.id === parseInt(savedCountryId));
            if (country) {
              setSelectedCountry(country);
              // Cargar estadísticas del país guardado
              loadPrizeStats(country.id);
            } else {
              // Si no hay país guardado, abrir modal
              setIsCountryModalOpen(true);
            }
          } else {
            // Si no hay país guardado, abrir modal
            setIsCountryModalOpen(true);
          }
        } else {
          console.error('Invalid countries response format:', response);
          setCountries([]);
        }
      } catch (error) {
        console.error('Error loading countries:', error);
        setCountries([]);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Función para cargar estadísticas de premios
  const loadPrizeStats = async (countryId: number) => {
    try {
      setIsLoadingStats(true);
      const response = await prizesService.getPrizeStats(countryId);

      if (response && response.data) {
        setPrizeStats(response.data);
      } else {
        setPrizeStats(null);
      }
    } catch (error) {
      console.error('Error loading prize stats:', error);
      setPrizeStats(null);
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Handler para confirmar país
  const handleCountryConfirm = () => {
    if (selectedCountry) {
      setIsCountryModalOpen(false);
      // Guardar la selección en localStorage
      localStorage.setItem('selectedCountryIdHome', selectedCountry.id.toString());
      // Cargar estadísticas del país seleccionado
      loadPrizeStats(selectedCountry.id);
    }
  };

  // Prevenir scroll cuando el modal está abierto - WCAG 2.4.3
  useEffect(() => {
    if (isCountryModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCountryModalOpen]);

  // Focus trap en el modal - WCAG 2.4.3
  useEffect(() => {
    if (!isCountryModalOpen || !countryModalRef.current) return;

    const focusableElements = countryModalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    countrySelectRef.current?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isCountryModalOpen]);
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
          <a
            href="#register"
            aria-label="Ir a la página de registro de usuario"
            className="btn-code"
            id="registrate-page"
          >
              <span>
                Registrate
              </span>
          </a>
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
                <strong>COMPRÁ LAS<br />CHIKY MARCADAS</strong>
              </p>
            </li>
            <li>
              <div className="step-number" aria-label="Paso 2">
                <div>
                  <h2 aria-hidden="true">2</h2>
                </div>
              </div>
              <p>
                <strong>REGISTRÁ</strong> <br/> LOS CÓDIGOS<br />
                <NavLink
                  to="/ingresar-codigos"
                  aria-label="Ir a la página principal de chikystrangerthings.com"
                >
                  {({ isActive }) => (
                    <span aria-current={isActive ? 'page' : undefined}>
                      aquí
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
            <li>
              <div className="step-number" aria-label="Paso 3">
                <div>
                  <h2 aria-hidden="true">4</h2>
                </div>
              </div>
              <p>
                GUARDÁ LOS EMPAQUES, <br/> <strong>PARA RECLAMAR TU PREMIO</strong>
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

            {/* Indicador de carga */}
            {isLoadingStats && (
              <div className="loading-message" role="status" aria-live="polite">
                <p>Cargando estadísticas...</p>
              </div>
            )}

            {/* WCAG 4.1.2 - Campos de solo lectura con aria-readonly */}
            {!isLoadingStats && prizeStats && (
              <div role="group" aria-labelledby="contadores-heading">
                <h3 id="contadores-heading" className="visually-hidden">
                  Contadores de premios disponibles
                </h3>

                <section className='stat'>
                  <div className="stat-item">
                    <label htmlFor="premios-totales" id="label-premios-totales">
                      Premios totales
                    </label>
                    <input
                      type="text"
                      value={prizeStats.summary.total_prizes.toString()}
                      id="premios-totales"
                      aria-labelledby="label-premios-totales"
                      aria-readonly="true"
                      readOnly
                      tabIndex={-1}
                      aria-describedby="desc-premios-totales"
                      disabled
                    />
                    <span id="desc-premios-totales" className="visually-hidden">
                      Número total de premios disponibles en la campaña
                    </span>
                  </div>

                  <div className="stat-item">
                    <label htmlFor="premios-sin-canjear" id="label-premios-sin-canjear">
                      Premios sin canjear
                    </label>
                    <input
                      type="text"
                      value={prizeStats.summary.total_remaining.toString()}
                      id="premios-sin-canjear"
                      aria-labelledby="label-premios-sin-canjear"
                      aria-readonly="true"
                      readOnly
                      tabIndex={-1}
                      aria-describedby="desc-premios-sin-canjear"
                      aria-live="polite"
                      disabled
                    />
                    <span id="desc-premios-sin-canjear" className="visually-hidden">
                      Número de premios aún disponibles para canjear
                    </span>
                  </div>
                </section>
              </div>
            )}
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

      {/* Sección de registro - WCAG 1.3.1, 2.4.6 */}
      <section aria-labelledby="registro-heading" className="register-page responsive-box" id="register">
        <h1 id="registro-heading">REGISTRATE Y GANÁ</h1>

        <div className="register-form-section">
          <h2 className="visually-hidden">
            Formulario de registro de usuario
          </h2>

          {/* WCAG 1.1.1 - Imagen descriptiva */}
          {/* <img
            src={CharacterImg}
            alt="Personaje de Stranger Things"
            loading="lazy"
            className="character-image"
          /> */}

          {/* WCAG 1.1.1 - Logo descriptivo */}
          <img
            src={ChickyLogo}
            alt="Logotipo de Chiky"
            loading="lazy"
            className="chicky-logo"
          />

          {/* Componente de formulario de registro */}
          <RegisterForm />
        </div>
      </section>

      {/* Modal de login */}
      <GetInto
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Modal de selección de país - WCAG 2.4.3, 4.1.2 */}
      {isCountryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="country-modal-title"
          aria-describedby="country-modal-description"
          className="modal-overlay country-modal-overlay"
          ref={countryModalRef}
        >
          <div className="modal-content country-modal-content" role="document">
            {/* Título del modal - WCAG 2.4.6 */}
            <h2 id="country-modal-title">
              Seleccioná tu país
            </h2>

            {/* Descripción - WCAG 1.3.1 */}
            <p id="country-modal-description">
              Para mostrar las estadísticas de premios correspondientes a su región, por favor seleccione su país:
            </p>

            {/* Formulario de selección - WCAG 3.3.2 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCountryConfirm();
              }}
              aria-label="Formulario de selección de país"
              className='normal'
            >
              <div className="form-field">
                <label htmlFor="country-select">
                  <span>País:</span>
                  <span className="required-indicator" aria-label="campo obligatorio">*</span>
                </label>
                <select
                  ref={countrySelectRef}
                  id="country-select"
                  name="country"
                  value={selectedCountry?.name.replace(/\s+/g, '_') || ''}
                  onChange={(e) => {
                    const countryName = e.target.value.replace(/_/g, ' ');
                    const country = countries.find(c => c.name === countryName);
                    setSelectedCountry(country || null);
                  }}
                  required
                  aria-required="true"
                  aria-describedby="desc-country-select"
                  autoFocus
                  disabled={isLoadingCountries}
                >
                  <option value="">
                    {isLoadingCountries ? 'Cargando países...' : 'Seleccione un país'}
                  </option>
                  {countries && countries.length > 0 && countries.map((country) => (
                    <option key={country.id} value={country.name.replace(/\s+/g, '_')}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <span id="desc-country-select" className="visually-hidden">
                  Seleccione el país desde el cual está participando en la promoción
                </span>
              </div>

              {/* Botón de confirmación - WCAG 2.5.3 */}
              <button
                type="submit"
                disabled={!selectedCountry}
                aria-label={selectedCountry ? 'Confirmar país seleccionado' : 'Seleccione un país para continuar'}
                className="btn-code"
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
