import { useEffect, useState } from "react";
import { getSummaryHistory } from "../../../services/api.js";
import "./MonthlyHistoryChart.scss";

const MONTH_INITIALS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const toEuro = (n) =>
    new Intl.NumberFormat("es-ES", {
        style: "currency", currency: "EUR", minimumFractionDigits: 0,
    }).format(n ?? 0);

function MonthlyHistoryChart({ months = 12, activeYear, activeMonth, onSelectMonth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await getSummaryHistory(months);
                setData(res);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [months]);

    useEffect(() => {
        if (data.length === 0) return;
        const id = requestAnimationFrame(() => setAnimate(true));
        return () => cancelAnimationFrame(id);
    }, [data]);

    if (loading) return <p className="history__empty">Cargando histórico...</p>;
    if (error) return <p className="history__error">{error}</p>;

    // Escala común a TODOS los meses para que las barras sean comparables entre sí
    const maxVal = Math.max(
        ...data.map((m) => Math.max(Number(m.totalIngresos), Number(m.totalGastos))),
        1
    );

    return (
        <div className="history">
            <div className="history__chart">
                {data.map((m) => {
                    const ingresos = Number(m.totalIngresos);
                    const gastos = Number(m.totalGastos);
                    const isActive = m.year === activeYear && m.month === activeMonth;
                    return (
                        <button
                            key={`${m.year}-${m.month}`}
                            type="button"
                            className={`history__col ${isActive ? "is-active" : ""}`}
                            onClick={() => onSelectMonth(m.year, m.month)}
                            title={`Ingresos ${toEuro(ingresos)} · Gastos ${toEuro(gastos)}`}
                        >
                            <div className="history__bars">
                                <span
                                    className="history__bar history__bar--income"
                                    style={{ height: animate ? `${(ingresos / maxVal) * 100}%` : "0%" }}
                                />
                                <span
                                    className="history__bar history__bar--expense"
                                    style={{ height: animate ? `${(gastos / maxVal) * 100}%` : "0%" }}
                                />
                            </div>
                            <span className="history__label">{MONTH_INITIALS[m.month - 1]}</span>
                        </button>
                    );
                })}
            </div>

            <div className="history__legend">
                <span className="history__legend-item history__legend-item--income">Ingresos</span>
                <span className="history__legend-item history__legend-item--expense">Gastos</span>
            </div>
        </div>
    );
}

export default MonthlyHistoryChart;