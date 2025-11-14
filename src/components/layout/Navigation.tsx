import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import GetInto from "../GetInto";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(true);
  const [isAgeVerificationModalOpen, setIsAgeVerificationModalOpen] = useState(false);
  const [isAgeRestrictionModalOpen, setIsAgeRestrictionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Referencias para modales
  const cookieModalRef = useRef<HTMLDivElement>(null);
  const ageVerificationModalRef = useRef<HTMLDivElement>(null);
  const ageRestrictionModalRef = useRef<HTMLDivElement>(null);

  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
        // Los modales pueden tener lógica específica de cierre con Escape
        if (isCookieModalOpen) {
          // Cookie modal es no-dismissible, no se cierra con Escape
        }
        if (isAgeVerificationModalOpen) {
          // Age verification es no-dismissible
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isCookieModalOpen, isAgeVerificationModalOpen]);

  // Manejar foco cuando se abre el menú
  useEffect(() => {
    if (isMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [isMenuOpen]);

  // Trap de foco para modales - WCAG 2.4.3
  useEffect(() => {
    const trapFocusInModal = (modalRef: React.RefObject<HTMLDivElement | null>, isOpen: boolean) => {
      if (!isOpen || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
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
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    };

    if (isCookieModalOpen) {
      return trapFocusInModal(cookieModalRef, isCookieModalOpen);
    }
    if (isAgeVerificationModalOpen) {
      return trapFocusInModal(ageVerificationModalRef, isAgeVerificationModalOpen);
    }
    if (isAgeRestrictionModalOpen) {
      return trapFocusInModal(ageRestrictionModalRef, isAgeRestrictionModalOpen);
    }
  }, [isCookieModalOpen, isAgeVerificationModalOpen, isAgeRestrictionModalOpen]);

  // Prevenir scroll cuando hay modal abierto - WCAG 2.4.3
  useEffect(() => {
    const hasOpenModal = isCookieModalOpen || isAgeVerificationModalOpen || isAgeRestrictionModalOpen;

    if (hasOpenModal) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('aria-hidden', 'true');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    };
  }, [isCookieModalOpen, isAgeVerificationModalOpen, isAgeRestrictionModalOpen]);

  // Toggle del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar menú al navegar
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  // Handlers para cookies
  const handleAcceptCookies = () => {
    setIsCookieModalOpen(false);
    setIsAgeVerificationModalOpen(true);
    // Aquí guardarías en localStorage o cookies
  };

  const handleRejectCookies = () => {
    setIsCookieModalOpen(false);
    setIsAgeVerificationModalOpen(true);
    // Aquí guardarías la preferencia
  };

  // Handlers para verificación de edad
  const handleAgeYes = () => {
    setIsAgeVerificationModalOpen(false);
    // Continuar con la aplicación
  };

  const handleAgeNo = () => {
    setIsAgeVerificationModalOpen(false);
    setIsAgeRestrictionModalOpen(true);
  };

  // Handlers para modal de login
  const handleLoginSubmit = (identificationNumber: string) => {
    // Aquí iría tu lógica de autenticación
    console.log('Login con identificación:', identificationNumber);
    setIsLoginModalOpen(false);
    // Redirigir o actualizar estado de usuario autenticado
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      {/* Skip Link - Accesibilidad WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '1em',
          backgroundColor: '#000',
          color: '#fff',
          textDecoration: 'none'
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Saltar al contenido principal
      </a>

      {/* Botón de menú móvil - WCAG 2.1.1, 4.1.2 */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        aria-label="Menú de navegación"
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
        type="button"
        className="menu-toggle"
      >
        <span className="visually-hidden">
          {isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        </span>
        <span aria-hidden="true">
          <hr />
          <hr />
        </span>
      </button>

      {/* Navegación principal - WCAG 2.4.1, 4.1.2 */}
      <nav
        ref={navRef}
        id="main-navigation"
        aria-label="Navegación principal"
        role="navigation"
      >
        <ul
          role="list"
          aria-label="Menú de navegación"
          style={{
            display: isMenuOpen ? 'block' : undefined
          }}
        >
          <li role="listitem">
            <NavLink
              ref={firstMenuItemRef}
              to="/"
              onClick={handleNavigation}
              aria-label="Ir a página de inicio"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Inicio
                </span>
              )}
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/registrate"
              onClick={handleNavigation}
              aria-label="Ir a página de registro"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Regístrate
                </span>
              )}
            </NavLink>
          </li>
          <li role="listitem">
            <button
              type="button"
              onClick={() => {
                handleNavigation();
                setIsLoginModalOpen(true);
              }}
              aria-label="Abrir modal para ingresar códigos promocionales"
              className="nav-button"
            >
              Ingresá códigos
            </button>
            <NavLink
              to="/ingresar-codigos"
              onClick={handleNavigation}
              aria-label="Ir a página de ingresar códigos"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Ingresá códigos
                </span>
              )}
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/ganadores"
              onClick={handleNavigation}
              aria-label="Ir a página de ganadores"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Ganadores
                </span>
              )}
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/premios"
              onClick={handleNavigation}
              aria-label="Ir a página de premios"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Premios
                </span>
              )}
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/mi-perfil"
              onClick={handleNavigation}
              aria-label="Ir a mi perfil de usuario"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Mi perfil
                </span>
              )}
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/ingresar"
              onClick={handleNavigation}
              aria-label="Ir a página de inicio de sesión"
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  Ingresar
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        {/* Enlaces adicionales fuera del menú móvil */}
        <div className="desktop-nav" aria-label="Acciones de usuario">
          <NavLink
            to="/mi-perfil"
            aria-label="Acceder a mi perfil de usuario"
          >
            {({ isActive }) => (
              <span aria-current={isActive ? 'page' : undefined}>
                Mi perfil
              </span>
            )}
          </NavLink>
          <NavLink
            to="/ingresar"
            aria-label="Iniciar sesión en la aplicación"
          >
            {({ isActive }) => (
              <span aria-current={isActive ? 'page' : undefined}>
                Ingresar
              </span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Modal para aceptar las cookies - WCAG 2.4.3, 4.1.2 */}
      {isCookieModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          aria-describedby="cookie-modal-description"
          className="modal-overlay"
          ref={cookieModalRef}
        >
          <div className="modal-content" role="document">
            <h2 id="cookie-modal-title" className="visually-hidden">
              Aviso de cookies
            </h2>
            <p id="cookie-modal-description">
              Al hacer clic en "Aceptar todas las cookies", acepta que las cookies se guardan en su dispositivo para mejorar la navegación del sitio, analizar el uso del mismo, y colaborar con nuestros estudios para marketing. Ver política de tratamiento de datos personales.
            </p>
            <div role="group" aria-label="Opciones de cookies">
              <button
                onClick={handleAcceptCookies}
                type="button"
                aria-label="Aceptar todas las cookies y continuar"
              >
                Aceptar todas las cookies
              </button>
              <button
                onClick={handleRejectCookies}
                type="button"
                aria-label="Rechazar cookies opcionales"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de verificación de edad - WCAG 2.4.3, 4.1.2 */}
      {isAgeVerificationModalOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="age-verification-title"
          className="modal-overlay"
          ref={ageVerificationModalRef}
        >
          <div className="modal-content" role="document">
            <h2 id="age-verification-title">
              ¿SOS MAYOR DE EDAD?
            </h2>
            <p className="visually-hidden">
              Para continuar, debe confirmar que es mayor de 18 años
            </p>
            <div role="group" aria-label="Verificación de edad">
              <button
                onClick={handleAgeYes}
                type="button"
                aria-label="Sí, soy mayor de 18 años"
                autoFocus
              >
                Sí
              </button>
              <button
                onClick={handleAgeNo}
                type="button"
                aria-label="No, soy menor de 18 años"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de restricción de edad - WCAG 2.4.3, 4.1.2 */}
      {isAgeRestrictionModalOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="age-restriction-title"
          aria-describedby="age-restriction-description"
          aria-live="assertive"
          className="modal-overlay"
          ref={ageRestrictionModalRef}
        >
          <div className="modal-content" role="document">
            <h2 id="age-restriction-title">
              LO SENTIMOS,
            </h2>
            <p id="age-restriction-description">
              <strong>Solo pueden participar mayores de 18 años</strong>
            </p>
            <button
              onClick={() => setIsAgeRestrictionModalOpen(false)}
              type="button"
              aria-label="Cerrar mensaje y salir del sitio"
              autoFocus
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal para ingresar al perfil - WCAG 2.4.3, 4.1.2 */}
      <GetInto
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        onSubmit={handleLoginSubmit}
      />
    </>
  );
};

export default Navigation;
