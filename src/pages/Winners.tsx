import { useState } from 'react';
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
    // Estado para manejar qué periodos están expandidos
    const [expandedPeriods, setExpandedPeriods] = useState<number[]>([]);

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

    // Toggle expandir/contraer período
    const togglePeriod = (index: number) => {
        setExpandedPeriods(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const data: WinnerPeriod[] = [
        {
            start_date: "2023-01-15",
            end_date: "2023-01-20",
            winners: [
                { name: "Juan Pérez", title: "Ganador 1" },
                { name: "María Gómez", title: "Ganadora 2" },
                { name: "Carlos López", title: "Ganador 3" }
            ]
        },
        {
            start_date: "2023-02-10",
            end_date: "2023-02-15",
            winners: [
                { name: "Ana Martínez", title: "Ganadora 1" },
                { name: "Luis Rodríguez", title: "Ganador 2" },
                { name: "Sofía Fernández", title: "Ganadora 3" }
            ]
        },
        {
            start_date: "2023-03-05",
            end_date: "2023-03-10",
            winners: [
                { name: "Miguel Sánchez", title: "Ganador 1" },
                { name: "Laura Torres", title: "Ganadora 2" },
                { name: "Diego Ramírez", title: "Ganador 3" }
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
            <main id="main-content" role="main" aria-labelledby="winners-heading">

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
                            const isExpanded = expandedPeriods.includes(index);
                            const periodLabel = formatPeriod(period.start_date, period.end_date);
                            const winnersCount = period.winners.length;

                            return (
                                <article
                                    key={index}
                                    aria-labelledby={`period-heading-${index}`}
                                    className="winners-period"
                                >
                                    {/* Título del período - WCAG 2.4.6 */}
                                    <h2 id={`period-heading-${index}`}>
                                        Período: {periodLabel}
                                    </h2>

                                    {/* Lista de ganadores - WCAG 1.3.1 */}
                                    <ul
                                        id={`winners-list-${index}`}
                                        role="list"
                                        aria-label={`Ganadores del período ${periodLabel}`}
                                        className={isExpanded ? 'expanded' : 'collapsed'}
                                    >
                                        {period.winners.map((winner, wIndex) => (
                                            <li
                                                key={wIndex}
                                                role="listitem"
                                            >
                                                <strong>{winner.title}:</strong>{' '}
                                                <span className="winner-name">{winner.name}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Botón expandir/contraer - WCAG 2.5.3, 4.1.2 */}
                                    <button
                                        type="button"
                                        onClick={() => togglePeriod(index)}
                                        aria-expanded={isExpanded}
                                        aria-controls={`winners-list-${index}`}
                                        aria-label={
                                            isExpanded
                                                ? `Ver menos ganadores del período ${periodLabel}`
                                                : `Ver todos los ${winnersCount} ganadores del período ${periodLabel}`
                                        }
                                        className="toggle-button"
                                    >
                                        {isExpanded ? 'Ver menos' : 'Ver más'}
                                        <span className="visually-hidden">
                                            {isExpanded
                                                ? ` (lista expandida con ${winnersCount} ganadores)`
                                                : ` (${winnersCount} ganadores disponibles)`
                                            }
                                        </span>
                                    </button>

                                    {/* Metadata oculta para lectores de pantalla - WCAG 1.3.1 */}
                                    <div className="visually-hidden" aria-live="polite">
                                        {isExpanded && (
                                            <span>
                                                Lista de ganadores expandida, mostrando {winnersCount} ganadores
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Información adicional - WCAG 1.3.1 */}
                    <aside aria-labelledby="winners-info-heading">
                        <h2 id="winners-info-heading" className="visually-hidden">
                            Información sobre los sorteos
                        </h2>
                        <p>
                            Total de períodos de sorteo: <strong>{data.length}</strong>
                        </p>
                        <p>
                            Total de ganadores: <strong>{data.reduce((acc, period) => acc + period.winners.length, 0)}</strong>
                        </p>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default Winners;