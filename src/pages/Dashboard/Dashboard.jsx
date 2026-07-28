import SummaryCard from "../../components/finance/SummaryCard/SummaryCard.jsx";
import {
    ShoppingCart,
    PartyPopper,
    Home,
    Car,
    Heart,
    ShoppingBag,
    Sunglasses,
    Coins,
    Sparkles,
    Plus
} from 'pixelarticons/react'
import {useEffect, useState} from "react";
import {getSummary, getTransactions} from "../../services/api.js";
import {useNavigate} from "react-router-dom";
import TransactionItem from "../../components/finance/TransactionItem/TransactionItem.jsx";
import './Dashboard.scss'


const CATEGORY_ICONS = {
    MERCADO: ShoppingCart,
    SALIDAS: PartyPopper,
    HOGAR: Home,
    TRANSPORTE: Car,
    CUIDADO_PERSONAL: Heart,
    SHOPPING: ShoppingBag,
    OTRO: Sunglasses,
    NOMINA: Coins,
    EXTRAS: Sparkles,
};


const toEuro = (n) =>
    new Intl.NumberFormat("es-ES", {
        style: "currency", currency: "EUR", minimumFractionDigits: 0,
    }).format(n ?? 0);

function Dashboard() {
    const name = localStorage.getItem("name");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const monthLabel = now.toLocaleDateString("es-ES", {month: "long"});
    const monthCapitalized = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [summaryData, txData] = await Promise.all([
                    getSummary({year, month}),
                    getTransactions({year, month}),
                ]);
                setSummary(summaryData);
                setTransactions(txData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [year, month]);

    if (loading) return <div className="dashboard"><p>Cargando...</p></div>;
    if (error) return <div className="dashboard"><p className="dashboard__error">{error}</p></div>;

    const recent = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id)
        .slice(0, 10);


    return (
        <div className="dashboard">
            <section className="dashboard__hero">
                <p className="dashboard__greeting">Hola, {name}!</p>
                <p className="dashboard__balance-label">Balance de {monthCapitalized}</p>
                <p className="dashboard__balance">{toEuro(summary?.balance)}</p>
            </section>

            <section className="dashboard__summary">
                <SummaryCard variant="income" label="Ingresos" amount={summary?.totalIngresos}/>
                <SummaryCard variant="expense" label="Gastos" amount={summary?.totalGastos}/>
            </section>

            <section className="dashboard__recent">
                <h2 className="dashboard__section-title">Transacciones recientes</h2>

                {recent.length === 0 ? (
                    <p className="dashboard__empty">Aún no hay movimientos este mes. ¡Registra el primero!</p>
                ) : (
                    <>
                        {recent.map((t) => {
                            const Icon = CATEGORY_ICONS[t.category] ?? Sunglasses;
                            return (
                                <TransactionItem
                                    key={t.id}
                                    icon={<Icon/>}
                                    title={t.description}
                                    category={t.categoryLabel}
                                    date={t.date}
                                    type={t.type === "INGRESO" ? "income" : "expense"}
                                    amount={t.amount}
                                />
                            );
                        })}

                        {transactions.length > recent.length && (
                        <button
                            className="dashboard__see-all"
                            onClick={() => navigate("/transactions")}
                        >
                            Ver todas ({transactions.length})
                        </button>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default Dashboard;