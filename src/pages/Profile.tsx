import { useState } from 'react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import type { Code } from '../types/api';

const Profile = () => {
    const { user, isLoading } = useAuth();
    const [showAllCodes, setShowAllCodes] = useState(false);

    // Separar nombre y apellido (primera palabra es nombre, resto es apellido)
    const fullName = user?.name || '';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Formatear fecha en español
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    // Datos de códigos del usuario
    const codesData: Code[] = user?.codes || [];

    // Mostrar solo los primeros 3 códigos si no está expandido
    const visibleCodes = showAllCodes ? codesData : codesData.slice(0, 3);
    const remainingCodes = codesData.length - visibleCodes.length;

    if (isLoading) {
        return (
            <main id="main-content" role="main" className='top-space profile-page'>
                <div className='responsive-box'>
                    <p>Cargando perfil...</p>
                </div>
            </main>
        );
    }

    return (
        <>
            {/* SEO Meta Tags */}
            <SEO
                title="Mi Perfil - Chiky Stranger Things | Datos y códigos ingresados"
                description="Consultá tu perfil de usuario, revisá tus datos personales y el historial completo de códigos promocionales ingresados en la promoción Chiky Stranger Things."
                keywords="perfil usuario Chiky, mi cuenta, códigos ingresados, historial códigos, datos personales, mi perfil Stranger Things"
                ogTitle="Mi Perfil - Chiky Stranger Things"
                ogDescription="Accedé a tu perfil y consultá el historial de todos tus códigos ingresados"
                ogUrl="https://chikystrangerthings.com/perfil"
                canonical="https://chikystrangerthings.com/perfil"
                noindex={true}
            />

            {/* WCAG 2.4.1 - Main landmark */}
            <main id="main-content" role="main" aria-labelledby="profile-heading" className='top-space profile-page'>
                <div className='responsive-box'>
                    {/* Sección de información del perfil - WCAG 1.3.1 */}
                    <section aria-labelledby="profile-heading">
                        <h1 id="profile-heading">PERFIL</h1>

                        {/* Descripción oculta - WCAG 2.4.6 */}
                        <p className="visually-hidden">
                            Información personal del usuario registrado en la promoción.
                        </p>

                        {/* Formulario de datos del usuario - WCAG 3.3.2 */}
                        <form
                            aria-label="Información personal del usuario"
                            className="profile-form normal"
                        >
                            <fieldset className='form-row'>
                                <legend className="visually-hidden">Datos personales</legend>

                                {/* Campo nombre - WCAG 4.1.2 */}
                                <div className="form-field">
                                    <label htmlFor="name" id="label-name">
                                        <span>Nombre:</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={firstName}
                                        readOnly
                                        aria-readonly="true"
                                        aria-labelledby="label-name"
                                        aria-describedby="desc-name"
                                        tabIndex={-1}
                                        className="readonly-field"
                                        disabled
                                    />
                                    <span id="desc-name" className="visually-hidden">
                                        Este campo es de solo lectura y no puede ser modificado
                                    </span>
                                </div>

                                {/* Campo apellido - WCAG 4.1.2 */}
                                <div className="form-field">
                                    <label htmlFor="last-name" id="label-last-name">
                                        <span>Apellido:</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        value={lastName}
                                        readOnly
                                        aria-readonly="true"
                                        aria-labelledby="label-last-name"
                                        aria-describedby="desc-last-name"
                                        tabIndex={-1}
                                        className="readonly-field"
                                        disabled
                                    />
                                    <span id="desc-last-name" className="visually-hidden">
                                        Este campo es de solo lectura y no puede ser modificado
                                    </span>
                                </div>
                            </fieldset>
                        </form>
                    </section>

                    {/* Sección de códigos ingresados - WCAG 1.3.1 */}
                    <section aria-labelledby="codes-heading" className='codes'>
                        <h3 id="codes-heading">CÓDIGOS INGRESADOS</h3>

                        {codesData.length === 0 ? (
                            /* Mensaje cuando no hay códigos - WCAG 1.3.1 */
                            <div className="no-codes-message" role="status" aria-live="polite">
                                <p>No tenés códigos ingresados todavía.</p>
                                <p>¡Empezá a ingresar tus códigos promocionales para participar!</p>
                            </div>
                        ) : (
                            <>
                                {/* Descripción y resumen de la tabla - WCAG 1.3.1 */}
                                <p className="visually-hidden">
                                    Tabla con el historial de códigos promocionales ingresados.
                                    Mostrando {visibleCodes.length} de {codesData.length} códigos.
                                </p>

                                {/* Tabla accesible - WCAG 1.3.1 */}
                                <table
                                    role="table"
                                    aria-label="Historial de códigos promocionales ingresados"
                                    aria-rowcount={codesData.length}
                                    className="codes-table"
                                >
                                    {/* Encabezados de tabla - WCAG 1.3.1 */}
                                    <thead>
                                        <tr role="row">
                                            <th scope="col" role="columnheader" aria-sort="none">
                                                Fecha
                                            </th>
                                            <th scope="col" role="columnheader" aria-sort="none">
                                                N.º
                                            </th>
                                            <th scope="col" role="columnheader" aria-sort="none">
                                                Código
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Cuerpo de la tabla - WCAG 1.3.1 */}
                                    <tbody>
                                        {visibleCodes.map((entry, index) => (
                                            <tr
                                                key={entry.id}
                                                role="row"
                                                aria-rowindex={index + 1}
                                            >
                                                <td role="cell" data-label="Fecha">
                                                    <p>{formatDate(entry.created_at)}</p>
                                                </td>
                                                <td role="cell" data-label="N.º" className='number'>
                                                    <p>{index + 1}</p>
                                                </td>
                                                <td role="cell" data-label="Código">
                                                    <p>
                                                        CÓDIGO
                                                        <code aria-label={`Código ${entry.code}`}>
                                                            {entry.code}
                                                        </code>
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    {/* Caption oculto de la tabla - WCAG 1.3.1 */}
                                    <caption className="visually-hidden">
                                        Historial de {codesData.length} códigos promocionales ingresados por el usuario
                                    </caption>
                                </table>

                                {/* Botón ver más/menos - WCAG 2.5.3, 4.1.2 */}
                                {codesData.length > 3 && (
                                    <button
                                        type="button"
                                        onClick={() => setShowAllCodes(!showAllCodes)}
                                        aria-expanded={showAllCodes}
                                        aria-controls="codes-table"
                                        aria-label={
                                            showAllCodes
                                                ? 'Ver menos códigos'
                                                : `Ver todos los ${codesData.length} códigos (${remainingCodes} más)`
                                        }
                                        className="toggle-button btn-code"
                                    >
                                        {showAllCodes ? 'Ver menos' : `Ver más`}
                                        <span className="visually-hidden">
                                            {showAllCodes
                                                ? ` Mostrando todos los ${codesData.length} códigos`
                                                : ` Mostrando ${visibleCodes.length} de ${codesData.length} códigos`
                                            }
                                        </span>
                                    </button>
                                )}

                                {/* Anuncio de cambio para lectores de pantalla - WCAG 4.1.3 */}
                                <div
                                    className="visually-hidden"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {showAllCodes && (
                                        <span>Mostrando todos los {codesData.length} códigos</span>
                                    )}
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default Profile;