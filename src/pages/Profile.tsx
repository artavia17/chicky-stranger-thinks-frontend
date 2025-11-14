import { useState } from 'react';
import SEO from '../components/SEO';

interface CodeEntry {
    date: string;
    number: number;
    code: string;
}

const Profile = () => {
    const [showAllCodes, setShowAllCodes] = useState(false);

    // Datos de ejemplo del usuario
    const userData = {
        name: 'Alonso',
        lastName: 'González'
    };

    // Datos de códigos ingresados
    const codesData: CodeEntry[] = [
        { date: '01 enero 2026', number: 1, code: '00000001' },
        { date: '02 enero 2026', number: 2, code: '00000002' },
        { date: '03 enero 2026', number: 3, code: '00000003' },
        { date: '04 enero 2026', number: 4, code: '00000004' },
        { date: '05 enero 2026', number: 5, code: '00000005' },
        { date: '06 enero 2026', number: 6, code: '00000006' }
    ];

    // Mostrar solo los primeros 3 códigos si no está expandido
    const visibleCodes = showAllCodes ? codesData : codesData.slice(0, 3);
    const remainingCodes = codesData.length - visibleCodes.length;

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
            <main id="main-content" role="main" aria-labelledby="profile-heading">

                {/* Sección de información del perfil - WCAG 1.3.1 */}
                <section aria-labelledby="profile-heading">
                    <h1 id="profile-heading">Perfil de Usuario</h1>

                    {/* Descripción oculta - WCAG 2.4.6 */}
                    <p className="visually-hidden">
                        Información personal del usuario registrado en la promoción.
                    </p>

                    {/* Formulario de datos del usuario - WCAG 3.3.2 */}
                    <form
                        aria-label="Información personal del usuario"
                        className="profile-form"
                    >
                        <fieldset>
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
                                    value={userData.name}
                                    readOnly
                                    aria-readonly="true"
                                    aria-labelledby="label-name"
                                    aria-describedby="desc-name"
                                    tabIndex={-1}
                                    className="readonly-field"
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
                                    value={userData.lastName}
                                    readOnly
                                    aria-readonly="true"
                                    aria-labelledby="label-last-name"
                                    aria-describedby="desc-last-name"
                                    tabIndex={-1}
                                    className="readonly-field"
                                />
                                <span id="desc-last-name" className="visually-hidden">
                                    Este campo es de solo lectura y no puede ser modificado
                                </span>
                            </div>
                        </fieldset>
                    </form>
                </section>

                {/* Sección de códigos ingresados - WCAG 1.3.1 */}
                <section aria-labelledby="codes-heading">
                    <h2 id="codes-heading">CÓDIGOS INGRESADOS</h2>

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
                                    Tipo
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
                                    key={index}
                                    role="row"
                                    aria-rowindex={index + 1}
                                >
                                    <td role="cell" data-label="Fecha">
                                        {entry.date}
                                    </td>
                                    <td role="cell" data-label="N.º">
                                        {entry.number}
                                    </td>
                                    <td role="cell" data-label="Tipo">
                                        CÓDIGO
                                    </td>
                                    <td role="cell" data-label="Código">
                                        <code aria-label={`Código ${entry.code}`}>
                                            {entry.code}
                                        </code>
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
                            className="toggle-button"
                        >
                            {showAllCodes ? 'Ver menos' : `Ver más (${remainingCodes})`}
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

                    {/* Resumen visual - WCAG 1.3.1 */}
                    <aside
                        aria-labelledby="codes-summary-heading"
                        className="codes-summary"
                    >
                        <h3 id="codes-summary-heading" className="visually-hidden">
                            Resumen de códigos
                        </h3>
                        <p>
                            <strong>Total de códigos ingresados:</strong> {codesData.length}
                        </p>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default Profile;