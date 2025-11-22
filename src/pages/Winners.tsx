import { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';

interface Winner {
    name: string;
    title: string;
}

interface WinnerPeriod {
    start_date: string;
    end_date: string;
    winners: Winner[];
}

const Winners = () => {
    // Estado para el modal de selección de país
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('');

    // Referencias para el modal
    const countryModalRef = useRef<HTMLDivElement>(null);
    const countrySelectRef = useRef<HTMLSelectElement>(null);

    // Formatear período de fechas - WCAG 1.3.1
    const formatPeriod = (startDate: string, endDate: string): string => {
        const months = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const start = new Date(startDate);
        const end = new Date(endDate);

        const startDay = start.getDate();
        const endDay = end.getDate();
        const month = months[end.getMonth()];
        const year = end.getFullYear();

        return `${startDay.toString().padStart(2, '0')} al ${endDay.toString().padStart(2, '0')} ${month} ${year}`;
    };

    // Handler para confirmar país
    const handleCountryConfirm = () => {
        if (selectedCountry) {
            setIsCountryModalOpen(false);
            // Aquí podrías guardar la selección en localStorage
            localStorage.setItem('selectedCountry', selectedCountry);
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

    const data: WinnerPeriod[] = [
        {
            start_date: "2023-01-15",
            end_date: "2023-01-20",
            winners: [
                { name: "Juan Pérez", title: "Ganador 01" },
                { name: "María Gómez", title: "Ganador 02" },
                { name: "Carlos López", title: "Ganador 03" }
            ]
        },
        {
            start_date: "2023-02-10",
            end_date: "2023-02-15",
            winners: [
                { name: "Ana Martínez", title: "Ganador 01" },
                { name: "Luis Rodríguez", title: "Ganador 02" },
                { name: "Sofía Fernández", title: "Ganador 03" }
            ]
        },
        {
            start_date: "2023-03-05",
            end_date: "2023-03-10",
            winners: [
                { name: "Miguel Sánchez", title: "Ganador 01" },
                { name: "Laura Torres", title: "Ganador 02" },
                { name: "Diego Ramírez", title: "Ganador 03" }
            ]
        }
    ];

    return (
        <>
            {/* SEO Meta Tags */}
            <SEO
                title="Ganadores - Chiky Stranger Things | Lista de ganadores oficiales"
                description="Conocé la lista oficial de ganadores de la promoción Chiky Stranger Things. Consultá los sorteos por período y descubrí si ganaste uno de los increíbles premios."
                keywords="ganadores Chiky, lista ganadores, sorteos Chiky, ganadores Stranger Things, resultados sorteo, premios ganados"
                ogTitle="Lista de Ganadores - Chiky Stranger Things"
                ogDescription="Consultá la lista oficial de ganadores de cada período de la promoción Chiky Stranger Things"
                ogUrl="https://chikystrangerthings.com/ganadores"
                canonical="https://chikystrangerthings.com/ganadores"
            />

            {/* WCAG 2.4.1 - Main landmark */}
            <main id="main-content" role="main" aria-labelledby="winners-heading" className='top-space winners-page'>

                <div className='responsive-box'>
                    {/* Sección principal de ganadores - WCAG 1.3.1 */}
                    <section aria-labelledby="winners-heading">
                        <h1 id="winners-heading">GANADORES</h1>

                        {/* Descripción oculta para lectores de pantalla - WCAG 2.4.6 */}
                        <p className="visually-hidden">
                            Lista de ganadores organizados por períodos de la promoción.
                            Cada período muestra los ganadores del sorteo correspondiente.
                        </p>

                        {/* Lista de períodos - WCAG 1.3.1 */}
                        <div role="region" aria-label="Períodos de sorteos y ganadores">
                            {data.map((period, index) => {
                                const periodLabel = formatPeriod(period.start_date, period.end_date);

                                return (
                                    <article
                                        key={index}
                                        aria-labelledby={`period-heading-${index}`}
                                        className="winners-period"
                                    >
                                        <div>
                                            {/* Título del período - WCAG 2.4.6 */}
                                            <p id={`period-heading-${index}`} className='title'>
                                                {periodLabel}
                                            </p>

                                            {/* Lista de ganadores - WCAG 1.3.1 */}
                                            <ul
                                                id={`winners-list-${index}`}
                                                role="list"
                                                aria-label={`Ganadores del período ${periodLabel}`}
                                                className='expanded'
                                            >
                                                {period.winners.map((winner, wIndex) => (
                                                    <li
                                                        key={wIndex}
                                                        role="listitem"
                                                    >
                                                        <strong>{winner.title}</strong>{' '}
                                                        <p><span className="winner-name">{winner.name}</span></p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </main>

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
                            Seleccione su país
                        </h2>

                        {/* Descripción - WCAG 1.3.1 */}
                        <p id="country-modal-description">
                            Para mostrar los ganadores correspondientes a su región, por favor seleccione su país:
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
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    required
                                    aria-required="true"
                                    aria-describedby="desc-country-select"
                                    autoFocus
                                >
                                    <option value="">Seleccione un país</option>
                                    <option value="argentina">Argentina</option>
                                    <option value="bolivia">Bolivia</option>
                                    <option value="brasil">Brasil</option>
                                    <option value="chile">Chile</option>
                                    <option value="colombia">Colombia</option>
                                    <option value="costa-rica">Costa Rica</option>
                                    <option value="ecuador">Ecuador</option>
                                    <option value="el-salvador">El Salvador</option>
                                    <option value="guatemala">Guatemala</option>
                                    <option value="honduras">Honduras</option>
                                    <option value="mexico">México</option>
                                    <option value="nicaragua">Nicaragua</option>
                                    <option value="panama">Panamá</option>
                                    <option value="paraguay">Paraguay</option>
                                    <option value="peru">Perú</option>
                                    <option value="republica-dominicana">República Dominicana</option>
                                    <option value="uruguay">Uruguay</option>
                                    <option value="venezuela">Venezuela</option>
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

export default Winners;