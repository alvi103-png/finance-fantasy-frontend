import {CATEGORIES} from "../../data/categories.jsx";
import { ArrowLeft, Sunglasses, ChevronLeft, ChevronRight } from "pixelarticons/react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteTransaction, getTransactions} from "../../services/api.js";
import Modal from "../../components/ui/Modal/Modal.jsx";
import TransactionItem from "../../components/finance/TransactionItem/TransactionItem.jsx";
import "./Transactions.scss"
import Dropdown from "../../components/ui/Dropdown/Dropdown.jsx";
import { useMonthCursor } from "../../hooks/useMonthCursor.js";

const iconFor = (value) => {
    const cat = CATEGORIES.find((c) => c.value === value);
    const Icon = cat ? cat.Icon : Sunglasses;
    return <Icon />;

};

function Transactions() {

    const navigate = useNavigate();
    const { year, month, label, isCurrentMonth, shiftMonth } = useMonthCursor();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeFilter, setTypeFilter] = useState("TODOS");
    const [categoryFilter, setCategoryFilter] = useState("TODAS");
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await getTransactions({ year, month });
                setTransactions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [year, month]);

    const filtered = transactions
        .filter((t) => typeFilter === "TODOS" || t.type === typeFilter)
        .filter((t) => categoryFilter === "TODAS" || t.category === categoryFilter)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const categoryOptions = [
        { value: "TODAS", label: "Todas las categorías" },
        ...CATEGORIES.map((c) => ( {value: c.value, label: c.label})),
    ]

    const confirmDelete = async () => {
        try {
            setDeleting(true);
            await deleteTransaction(toDelete.id);
            setTransactions((prev) => prev.filter((t) => t.id !== toDelete.id));
            setToDelete(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="transactions">

            <div className="transactions__header">
                <button className="transactions__back" onClick={() => navigate("/dashboard")} aria-label="Volver">
                    <ArrowLeft />
                </button>
                <h1 className="transactions__title">Movs</h1>
            </div>

            <div className="transactions__month-nav">
                <button
                    type="button"
                    className="transactions__nav-btn"
                    onClick={() => shiftMonth(-1)}
                    aria-label="Mes anterior"
                >
                    <ChevronLeft />
                </button>

                <span className="transactions__month-label">
                        {label}
                    </span>

                <button
                    type="button"
                    className="transactions__nav-btn"
                    onClick={() => shiftMonth(1)}
                    disabled={isCurrentMonth}   /* no viajamos al futuro */
                    aria-label="Mes siguiente"
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="transactions__filters">
                <div className="transactions__chips">
                    {["TODOS", "INGRESO", "GASTO"].map((opt) => (
                        <button
                            key={opt}
                            className={`transactions__chip ${typeFilter === opt ? "is-active" : ""}`}
                            onClick={() => setTypeFilter(opt)}
                        >
                            {opt === "TODOS" ? "Todos" : opt === "INGRESO" ? "Ingresos" : "Gastos"}
                        </button>
                    ))}
                </div>

                <Dropdown
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
                />
            </div>

            {loading ? (
                <p>Cargando…</p>
            ) : error ? (
                <p className="transactions__error">{error}</p>
            ) : filtered.length === 0 ? (
                <p className="transactions__empty">No hay transacciones con estos filtros.</p>
            ) : (
                <div className="transactions__list">
                    {filtered.map((t) => (
                        <TransactionItem
                            key={t.id}
                            icon={iconFor(t.category)}
                            title={t.description}
                            category={t.categoryLabel}
                            date={t.date}
                            type={t.type === "INGRESO" ? "income" : "expense"}
                            amount={t.amount}
                            showAction
                            onEdit={() => navigate(`/transactions/${t.id}/edit`)}
                            onDelete={() => setToDelete(t)}
                        />
                    ))}
                </div>
            )}


            <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="¿Eliminar transacción?">
                <p className="modal__text">Esta acción no se puede deshacer.</p>
                <div className="modal__actions">
                    <button className="modal__btn--ghost" onClick={() => setToDelete(null)}>
                        Cancelar
                    </button>
                    <button className="modal__btn--danger" onClick={confirmDelete} disabled={deleting}>
                        {deleting ? "Eliminando…" : "Eliminar"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Transactions;
