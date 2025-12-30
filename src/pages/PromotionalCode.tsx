import { NavLink } from 'react-router-dom';
import BorderIcon from '../assets/img/svg/border.svg';
import BorderBigIcon from '../assets/img/svg/border-big.svg';
import { useState, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import SEO from '../components/SEO';
import codesService from '../services/codes.service';
import { useAuth } from '../context/AuthContext';

const PromotionalCode = () => {
    const { refreshUser } = useAuth();
    const [promoCode, setPromoCode] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Handler para cambio de input - WCAG 3.3.1
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase().trim();
        setPromoCode(value);
        // Limpiar error al escribir
        if (error) {
            setError('');
        }
        // Limpiar mensaje de éxito al escribir
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    // Handler para envío del formulario - WCAG 3.3.1, 3.3.3
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validación: Campo no vacío
        if (!promoCode.trim()) {
            setError('Por favor, ingrese un código promocional');
            inputRef.current?.focus();
            return;
        }

        // Validación: Longitud entre 4 y 30 caracteres
        if (promoCode.length < 4 || promoCode.length > 30) {
            setError('El código debe tener entre 4 y 30 caracteres');
            inputRef.current?.focus();
            return;
        }

        // Validación: Solo letras y números
        if (!/^[A-Z0-9]+$/.test(promoCode)) {
            setError('El código solo debe contener letras y números');
            inputRef.current?.focus();
            return;
        }

        try {
            setIsSubmitting(true);

            // Enviar código al servidor
            await codesService.submitCode({ code: promoCode });

            // Actualizar datos del usuario para reflejar el nuevo código
            await refreshUser();

            // Mostrar mensaje de éxito
            setSuccessMessage('¡Código promocional ingresado exitosamente!');
            setPromoCode('');
            inputRef.current?.focus();
        } catch (error: any) {
            // Manejar errores específicos
            if (error.status === 422 && error.errors) {
                // Error de validación
                const firstError = Object.values(error.errors)[0];
                setError(Array.isArray(firstError) ? firstError[0] : 'Error de validación');
            } else if (error.status === 400) {
                // Código ya utilizado
                setError('Este código ya fue utilizado anteriormente');
            } else if (error.status === 404) {
                // Código no encontrado
                setError('El código ingresado no es válido');
            } else {
                // Error genérico
                setError('Ocurrió un error al procesar el código. Por favor intente nuevamente.');
            }
            inputRef.current?.focus();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* SEO Meta Tags */}
            <SEO
                title="Ingresá Códigos - Chiky Stranger Things | Participá por premios"
                description="Ingresá tus códigos promocionales de Chiky y participá por mochilas, loncheras y cartucheras de Stranger Things. Comprá, registrá y ganá."
                keywords="ingresar códigos Chiky, códigos promocionales, participar sorteo, códigos Stranger Things, ingresar código, promoción Chiky"
                ogTitle="Ingresá tus Códigos - Chiky Stranger Things"
                ogDescription="Ingresá los códigos de tus productos Chiky y participá por premios exclusivos de Stranger Things"
                ogUrl="https://chikystrangerthings.com/ingresa-codigos"
                canonical="https://chikystrangerthings.com/ingresa-codigos"
            />

            {/* WCAG 2.4.1 - Main landmark */}
            <main id="main-content" role="main" aria-labelledby="promo-code-heading" className='top-space promotional-code-page'>
                <div className='responsive-box'>
                    {/* Formulario de código promocional - WCAG 3.3.2 */}
                    <section aria-labelledby="promo-code-heading">
                        <h1 id="promo-code-heading">Código promocional</h1>

                        {/* WCAG 3.3.1, 3.3.2 - Formulario accesible */}
                        <form
                            onSubmit={handleSubmit}
                            aria-label="Formulario para ingresar código promocional"
                            noValidate
                            className='normal'
                        >
                            <div className="form-field">
                                <label htmlFor="promo-code">
                                    <span>Ingresá tu código promocional:</span>
                                    <span className="required-indicator" aria-label="campo obligatorio">*</span>
                                </label>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    id="promo-code"
                                    name="promo-code"
                                    value={promoCode}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    aria-invalid={error ? 'true' : 'false'}
                                    aria-describedby={
                                        error
                                            ? 'error-promo-code'
                                            : successMessage
                                                ? 'success-promo-code'
                                                : 'desc-promo-code'
                                    }
                                    autoComplete="off"
                                    maxLength={30}
                                    pattern="[A-Z0-9]+"
                                />

                                {/* Descripción del campo - WCAG 3.3.2 */}
                                <span id="desc-promo-code" className="visually-hidden">
                                    Ingrese el código promocional que aparece en el empaque del producto. Solo letras y números.
                                </span>

                                {/* WCAG 3.3.1 - Mensaje de error */}
                                {error && (
                                    <span
                                        id="error-promo-code"
                                        className="error-message"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        {error}
                                    </span>
                                )}

                                {/* WCAG 4.1.3 - Mensaje de éxito */}
                                {successMessage && (
                                    <span
                                        id="success-promo-code"
                                        className="success-message"
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {successMessage}
                                    </span>
                                )}
                            </div>

                            {/* WCAG 2.5.3 - Botón de envío */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                aria-label={isSubmitting ? 'Enviando código promocional' : 'Enviar código promocional'}
                                aria-busy={isSubmitting}
                                className='btn-code-v2'
                            >
                                {isSubmitting ? 'Enviando...' : 'Ingresar'}
                            </button>
                        </form>
                    </section>

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

                    {/* Registro desde otra página - WCAG 2.4.6 */}
                    <section aria-labelledby="no-account-heading" className='already-have-account'>
                        <h4 id="no-account-heading">¿NO TENÉS CUENTA?</h4>
                        <NavLink
                            to="/registrate"
                            aria-label="Ir a página de registro para crear una cuenta nueva"
                            className='btn-code'
                        >
                            {({ isActive }) => (
                                <span aria-current={isActive ? 'page' : undefined}>
                                    REGISTRATE
                                </span>
                            )}
                        </NavLink>
                    </section>
                </div>
            </main>
        </>
    );
};

export default PromotionalCode;