import "./Statistics.scss"
import { getSummary } from "../../services/api.js";
import {CATEGORIES} from "../../data/categories.jsx";
import {useEffect, useState} from "react";
import HealthBar from "../../components/ui/HealthBar/HealthBar.jsx";
import StatBar from "../../components/ui/StatBar/StatBar.jsx";
import {ChevronLeft, ChevronRight} from "pixelarticons/react";
import {useMonthCursor} from "../../hooks/useMonthCursor.js";
import MonthlyHistoryChart from "../../components/finance/MonthlyHistoryChart/MonthlyHistoryChart.jsx";

const toEuro = (n) =>
    new Intl.NumberFormat("es-ES", {
        style: "currency", currency: "EUR", minimumFractionDigits: 0,
    }).format(n ?? 0);

const LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.label]));
const COLORS = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.color]));

function Statistics() {

    const { year, month, label, isCurrentMonth, shiftMonth, goToMonth } = useMonthCursor();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setAnimate(false);
                setLoading(true);
                setError(null);
                const data = await getSummary({ year, month });
                setSummary(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [year, month]);

    useEffect(() => {
        if (!summary) return;
        const id = requestAnimationFrame(() => setAnimate(true));
        return () => cancelAnimationFrame(id);
    }, [summary]);

    const ingresos = Number(summary?.totalIngresos ?? 0);
    const gastos = Number(summary?.totalGastos ?? 0);
    const maxHP = Math.max(ingresos, gastos, 1);

    const gastosObj = summary?.gastosPorCategoria ?? {};
    const cats = Object.entries(gastosObj)
        .map(([cat, amount]) => ({
            name: LABELS[cat] ?? cat,
            value: Number(amount),
            color: COLORS[cat] ?? "#7E6B99",
        }))
        .sort((a, b) => b.value - a.value);
    const maxCat = Math.max(...cats.map((c) => c.value), 1);

    return (
        <div className="stats">
            <header className="stats__hero">
                <h1 className="stats__title">Stats</h1>

                <div className="stats__month-nav">
                    <button
                        type="button"
                        className="stats__nav-btn"
                        onClick={() => shiftMonth(-1)}
                        aria-label="Mes anterior"
                    >
                        <ChevronLeft/>
                    </button>
                    <span className="stats__subtitle">{label}</span>

                    <button
                        type="button"
                        className="stats__nav-btn"
                        onClick={() => shiftMonth(1)}
                        disabled={isCurrentMonth}
                        aria-label="Mes siguiente"
                    >
                        <ChevronRight/>
                    </button>
                </div>
                {!loading && !error && (
                    <p className="stats__balance">{toEuro(summary?.balance)}</p>
                )}
            </header>

            {loading ? (
                <p className="stats__empty">Cargando...</p>
            ) : error ? (
                <p className="stats__error">{error}</p>
            ) : (
                <>

                <section className="stats__panel">
                    <h2 className="stats__panel-title">Ingresos vs Gastos</h2>
                    <div className="stats__hp">
                        <HealthBar
                            label="INGRESOS"
                            valueLabel={toEuro(ingresos)}
                            pct={(ingresos / maxHP) * 100}
                            variant="income"
                            animate={animate}
                        />
                        <HealthBar
                            label="GASTOS"
                            valueLabel={toEuro(gastos)}
                            pct={(gastos / maxHP) * 100}
                            variant="expense"
                            animate={animate}
                        />
                    </div>
                </section>

                <section className="stats__panel">
                    <h2 className="stats__panel-title">Gastos por categoría</h2>
                    {cats.length === 0 ? (
                        <p className="stats__empty">Aún no hay gastos este mes. ¡Vas bien!</p>
                    ) : (
                        <div className="stats__cats">
                            {cats.map((c, i) => (
                                <StatBar
                                    key={c.name}
                                    label={c.name}
                                    valueLabel={toEuro(c.value)}
                                    pct={(c.value / maxCat) * 100}
                                    color={c.color}
                                    animate={animate}
                                    delay={i * 90}
                                />
                            ))}
                        </div>
                    )}
                </section>
                </>
            )}

            <section className="stats__panel">
                <h2 className="stats__panel-title">Últimos 12 meses</h2>
                <MonthlyHistoryChart
                    months={12}
                    activeYear={year}
                    activeMonth={month}
                    onSelectMonth={goToMonth}
                />
            </section>

        </div>
    );
}

export default Statistics;