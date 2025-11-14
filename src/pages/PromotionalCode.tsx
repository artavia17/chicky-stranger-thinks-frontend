import { NavLink } from 'react-router-dom';
import BorderIcon from '../assets/img/svg/border.svg';
import { useState, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

const PromotionalCode = () => {
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
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validación: Campo no vacío
        if (!promoCode.trim()) {
            setError('Por favor, ingrese un código promocional');
            inputRef.current?.focus();
            return;
        }

        // Validación: Longitud mínima
        if (promoCode.length < 4) {
            setError('El código debe tener al menos 4 caracteres');
            inputRef.current?.focus();
            return;
        }

        // Validación: Solo letras y números
        if (!/^[A-Z0-9]+$/.test(promoCode)) {
            setError('El código solo debe contener letras y números');
            inputRef.current?.focus();
            return;
        }

        // Simular envío
        setIsSubmitting(true);

        // Aquí iría tu lógica de envío al servidor
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage('¡Código promocional ingresado exitosamente!');
            setPromoCode('');
            inputRef.current?.focus();
        }, 1000);
    };

    return (
        <>
            {/* WCAG 2.4.1 - Main landmark */}
            <main id="main-content" role="main" aria-labelledby="promo-code-heading">

                {/* Formulario de código promocional - WCAG 3.3.2 */}
                <section aria-labelledby="promo-code-heading">
                    <h1 id="promo-code-heading">Código promocional</h1>

                    {/* WCAG 3.3.1, 3.3.2 - Formulario accesible */}
                    <form
                        onSubmit={handleSubmit}
                        aria-label="Formulario para ingresar código promocional"
                        noValidate
                    >
                        <div className="form-field">
                            <label htmlFor="promo-code">
                                <span>Ingrese su código promocional:</span>
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
                                placeholder="Ej: ABC123"
                                autoComplete="off"
                                maxLength={20}
                                pattern="[A-Z0-9]+"
                                className={error ? 'input-error' : successMessage ? 'input-success' : ''}
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
                        >
                            {isSubmitting ? 'Enviando...' : 'Ingresar'}
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

                {/* Registro desde otra página - WCAG 2.4.6 */}
                <section aria-labelledby="no-account-heading">
                    <h3 id="no-account-heading">¿NO TENÉS CUENTA?</h3>
                    <NavLink
                        to="/registrate"
                        aria-label="Ir a página de registro para crear una cuenta nueva"
                    >
                        {({ isActive }) => (
                            <span aria-current={isActive ? 'page' : undefined}>
                                REGISTRATE
                            </span>
                        )}
                    </NavLink>
                </section>
            </main>
        </>
    );
};

export default PromotionalCode;