import ChickyLogo from '../assets/img/webp/chicky-logo.webp';
import BorderIcon from '../assets/img/svg/border.svg';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { FormEvent } from 'react';
import GetInto from '../components/GetInto';
import { NavLink } from 'react-router-dom';
import CloseIcon from '../assets/img/svg/close.svg';
import CheckIcon from '../assets/img/svg/check.svg';

const Register = () => {
    const [formErrors] = useState<Record<string, string>>({});
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // Referencias para el modal de éxito
    const successModalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Handler para cerrar modal de éxito - WCAG 2.1.1
    const handleCloseSuccessModal = useCallback(() => {
        setIsSuccessModalOpen(false);
        // Aquí podrías redirigir a otra página
        // navigate('/perfil');
    }, []);

    // Prevenir scroll del body cuando el modal está abierto - WCAG 2.4.3
    useEffect(() => {
        const hasOpenModal = isLoginModalOpen || isSuccessModalOpen;

        if (hasOpenModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isLoginModalOpen, isSuccessModalOpen]);

    // Cerrar modal de éxito con tecla Escape - WCAG 2.1.1
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isSuccessModalOpen) {
                handleCloseSuccessModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isSuccessModalOpen, handleCloseSuccessModal]);

    // Trap de foco en modal de éxito - WCAG 2.4.3
    useEffect(() => {
        if (!isSuccessModalOpen || !successModalRef.current) return;

        const focusableElements = successModalRef.current.querySelectorAll(
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
        closeButtonRef.current?.focus();

        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isSuccessModalOpen]);

    // Handler para validación del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí iría tu lógica de validación y envío
        // Ejemplo: setFormErrors({ email: 'Correo inválido' });
        console.log('Formulario enviado');

        // Simular registro exitoso
        setIsSuccessModalOpen(true);
    };

    // Handlers para modal de login
    const handleOpenLoginModal = () => {
        setIsLoginModalOpen(true);
    };

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
            {/* WCAG 2.4.1 - Main landmark */}
            <main id="main-content" role="main" aria-labelledby="register-heading">

                {/* Formulario para registrarse - WCAG 3.3.2 */}
                <h1 id="register-heading">REGISTRATE Y GANÁ</h1>

                <section aria-labelledby="register-form-section">
                    <h2 id="register-form-section" className="visually-hidden">
                        Formulario de registro de usuario
                    </h2>

                    {/* WCAG 1.1.1 - Logo descriptivo */}
                    <img
                        src={ChickyLogo}
                        alt="Logotipo de Chiky"
                        loading="lazy"
                    />

                    {/* WCAG 3.3.1, 3.3.2 - Formulario accesible */}
                    <form
                        onSubmit={handleSubmit}
                        aria-label="Formulario de registro"
                        noValidate
                    >
                        {/* WCAG 1.3.1 - Campo de nombre */}
                        <div className="form-field">
                            <label htmlFor="nombre-completo">
                                <span>Nombre completo</span>
                                <span className="required-indicator" aria-label="campo obligatorio">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                id="nombre-completo"
                                required
                                aria-required="true"
                                aria-invalid={formErrors.fullname ? 'true' : 'false'}
                                aria-describedby={formErrors.fullname ? 'error-nombre-completo' : undefined}
                                autoComplete="name"
                            />
                            {formErrors.fullname && (
                                <span id="error-nombre-completo" className="error-message" role="alert">
                                    {formErrors.fullname}
                                </span>
                            )}
                        </div>

                        {/* WCAG 1.3.1 - Grupo de campos relacionados */}
                        <div className="form-row" role="group" aria-labelledby="group-pais-email">
                            <span id="group-pais-email" className="visually-hidden">
                                País y correo electrónico
                            </span>

                            <div className="form-field">
                                <label htmlFor="pais">
                                    País
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                <select
                                    name="country"
                                    id="pais"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.country ? 'true' : 'false'}
                                    aria-describedby={formErrors.country ? 'error-pais' : undefined}
                                    autoComplete="country-name"
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="argentina">Argentina</option>
                                    <option value="brasil">Brasil</option>
                                    <option value="chile">Chile</option>
                                    <option value="uruguay">Uruguay</option>
                                    <option value="paraguay">Paraguay</option>
                                    <option value="bolivia">Bolivia</option>
                                    <option value="peru">Perú</option>
                                </select>
                                {formErrors.country && (
                                    <span id="error-pais" className="error-message" role="alert">
                                        {formErrors.country}
                                    </span>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="correo-electronico">
                                    <span>Correo electrónico</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="correo-electronico"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.email ? 'true' : 'false'}
                                    aria-describedby={formErrors.email ? 'error-correo-electronico' : 'desc-correo-electronico'}
                                    autoComplete="email"
                                    inputMode="email"
                                />
                                <span id="desc-correo-electronico" className="visually-hidden">
                                    Ingrese un correo electrónico válido
                                </span>
                                {formErrors.email && (
                                    <span id="error-correo-electronico" className="error-message" role="alert">
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* WCAG 1.3.1 - Tipo de identificación */}
                        <div className="form-field">
                            <label htmlFor="tipo-identificacion">
                                <span>Tipo de identificación</span>
                                <span className="required-indicator" aria-label="campo obligatorio">*</span>
                            </label>
                            <select
                                name="identificationType"
                                id="tipo-identificacion"
                                required
                                aria-required="true"
                                aria-invalid={formErrors.identificationType ? 'true' : 'false'}
                                aria-describedby={formErrors.identificationType ? 'error-tipo-identificacion' : undefined}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="dni">DNI</option>
                                <option value="na">Nacional</option>
                                <option value="passport">Pasaporte</option>
                            </select>
                            {formErrors.identificationType && (
                                <span id="error-tipo-identificacion" className="error-message" role="alert">
                                    {formErrors.identificationType}
                                </span>
                            )}
                        </div>

                        {/* WCAG 1.3.1 - Grupo de identificación y teléfono */}
                        <div className="form-row" role="group" aria-labelledby="group-identificacion-telefono">
                            <span id="group-identificacion-telefono" className="visually-hidden">
                                Número de identificación y teléfono
                            </span>

                            <div className="form-field">
                                <label htmlFor="numero-identificacion">
                                    <span>N.º identificación</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="identificationNumber"
                                    id="numero-identificacion"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.identificationNumber ? 'true' : 'false'}
                                    aria-describedby={formErrors.identificationNumber ? 'error-numero-identificacion' : undefined}
                                    inputMode="numeric"
                                />
                                {formErrors.identificationNumber && (
                                    <span id="error-numero-identificacion" className="error-message" role="alert">
                                        {formErrors.identificationNumber}
                                    </span>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="numero-telefono">
                                    <span>N.º de teléfono</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="numero-telefono"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.phoneNumber ? 'true' : 'false'}
                                    aria-describedby={formErrors.phoneNumber ? 'error-numero-telefono' : undefined}
                                    autoComplete="tel"
                                    inputMode="tel"
                                />
                                {formErrors.phoneNumber && (
                                    <span id="error-numero-telefono" className="error-message" role="alert">
                                        {formErrors.phoneNumber}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* WCAG 1.3.1, 3.3.2 - Grupo de consentimientos */}
                        <fieldset aria-labelledby="consent-legend">
                            <legend id="consent-legend" className="visually-hidden">
                                Consentimientos y aceptaciones
                            </legend>

                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    name="communicationsConsent"
                                    id="communicationsConsent"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.communicationsConsent ? 'true' : 'false'}
                                    aria-describedby={formErrors.communicationsConsent ? 'error-communications-consent' : undefined}
                                />
                                <label htmlFor="communicationsConsent">
                                    <span>Acepto recibir comunicaciones sobre actividades, eventos y promociones de la marca Chicky.</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                {formErrors.communicationsConsent && (
                                    <span id="error-communications-consent" className="error-message" role="alert">
                                        {formErrors.communicationsConsent}
                                    </span>
                                )}
                            </div>

                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    name="dataPolicyConsent"
                                    id="dataPolicyConsent"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.dataPolicyConsent ? 'true' : 'false'}
                                    aria-describedby={formErrors.dataPolicyConsent ? 'error-data-policy-consent' : undefined}
                                />
                                <label htmlFor="dataPolicyConsent">
                                    <span>Acepto la <a href="#politica-datos" target="_blank" rel="noopener noreferrer">política de tratamiento de datos</a>.</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                {formErrors.dataPolicyConsent && (
                                    <span id="error-data-policy-consent" className="error-message" role="alert">
                                        {formErrors.dataPolicyConsent}
                                    </span>
                                )}
                            </div>

                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    name="termsAndConditions"
                                    id="termsAndConditions"
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.termsAndConditions ? 'true' : 'false'}
                                    aria-describedby={formErrors.termsAndConditions ? 'error-terms-conditions' : undefined}
                                />
                                <label htmlFor="termsAndConditions">
                                    <span>Acepto los <a href="#terminos-condiciones" target="_blank" rel="noopener noreferrer">términos y condiciones</a>.</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                {formErrors.termsAndConditions && (
                                    <span id="error-terms-conditions" className="error-message" role="alert">
                                        {formErrors.termsAndConditions}
                                    </span>
                                )}
                            </div>
                        </fieldset>

                        {/* WCAG 2.5.3 - Botón de envío */}
                        <button
                            type="submit"
                            aria-label="Enviar formulario de registro"
                        >
                            Registrate
                        </button>
                    </form>
                </section>

                {/* WCAG 1.1.1 - Imagen decorativa */}
                <img
                    src={BorderIcon}
                    alt=""
                    aria-hidden="true"
                    role="presentation"
                    className="decorative-border"
                />

                {/* Ingresar códigos desde otra página - WCAG 2.4.6 */}
                <section aria-labelledby="already-have-account">
                    <h3 id="already-have-account">¿YA TENÉS CUENTA?</h3>
                    <button
                        type="button"
                        onClick={handleOpenLoginModal}
                        aria-label="Abrir modal para iniciar sesión e ingresar códigos"
                    >
                        Ingresá códigos
                    </button>
                    <NavLink
                        to="/ingresar-codigos"
                        aria-label="Ir a página de ingresar códigos"
                    >
                        Ingresá códigos
                    </NavLink>
                </section>
            </main>

            {/* Modal de registro exitoso - WCAG 2.4.3, 4.1.2 */}
            {isSuccessModalOpen && (
                <div
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="success-modal-title"
                    aria-describedby="success-modal-description"
                    aria-live="assertive"
                    className="modal-overlay"
                    ref={successModalRef}
                    onClick={(e) => {
                        // Cerrar al hacer clic en el overlay
                        if (e.target === e.currentTarget) {
                            handleCloseSuccessModal();
                        }
                    }}
                >
                    <div className="modal-content" role="document">
                        {/* Botón de cerrar - WCAG 2.5.3 */}
                        <button
                            ref={closeButtonRef}
                            onClick={handleCloseSuccessModal}
                            type="button"
                            aria-label="Cerrar modal de registro exitoso"
                            className="modal-close-button"
                            autoFocus
                        >
                            <img
                                src={CloseIcon}
                                alt=""
                                aria-hidden="true"
                                role="presentation"
                            />
                            <span className="visually-hidden">Cerrar</span>
                        </button>

                        {/* Icono de éxito - WCAG 1.1.1 */}
                        <img
                            src={CheckIcon}
                            alt="Icono de éxito"
                            role="img"
                            aria-label="Registro completado exitosamente"
                        />

                        {/* Título - WCAG 2.4.6 */}
                        <h2 id="success-modal-title">
                            REGISTRO EXITOSO
                        </h2>

                        {/* Descripción oculta para lectores de pantalla - WCAG 1.3.1 */}
                        <p id="success-modal-description" className="visually-hidden">
                            Tu cuenta ha sido creada exitosamente. Ahora puedes ingresar códigos y participar en la promoción.
                        </p>

                        {/* Botón de acción - WCAG 2.5.3 */}
                        <NavLink
                            to="/ingresa-codigos"
                            aria-label="Ir a la página para ingresar códigos promocionales"
                            onClick={handleCloseSuccessModal}
                        >
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    Continuar
                                </button>
                            )}
                        </NavLink>
                    </div>
                </div>
            )}

            {/* Modal de inicio de sesión - WCAG 2.4.3, 4.1.2 */}
            <GetInto
                isOpen={isLoginModalOpen}
                onClose={handleLoginClose}
                onSubmit={handleLoginSubmit}
            />
        </>
    );
};

export default Register;