import "./Statistics.scss"
import { getSummary} from "../../services/api.js";
import {CATEGORIES} from "../../data/categories.jsx";
import {useEffect, useState} from "react";
import HealthBar from "../../components/ui/HealthBar/HealthBar.jsx";
import StatBar from "../../components/ui/StatBar/StatBar.jsx";

const toEuro = (n) =>
    new Intl.NumberFormat("es-ES", {
        style: "currency", currency: "EUR", minimumFractionDigits: 0,
    }).format(n ?? 0);

const LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.label]));
const COLORS = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.color]));

function Statistics() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const monthLabel = now.toLocaleDateString("es-ES", { month: "long" });
    const monthCapitalized = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await getSummary({ year, month });
                setSummary(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    load();
},[year, month]);

    useEffect(() => {
        if (!summary) return;
        const id = requestAnimationFrame(() => setAnimate(true));
        return () => cancelAnimationFrame(id);
    }, [summary]);

    if (loading) return <div className="stats"><p>Cargando...</p></div>;
    if (error) return <div className="stats"><p className="stats__error">{error}</p></div>;

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
                <p className="stats__subtitle">{monthCapitalized} {year}</p>
                <p className="stats__balance">{toEuro(summary?.balance)}</p>
            </header>

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
        </div>
    );
}

export default Statistics;