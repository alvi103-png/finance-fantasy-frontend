import './NewTransaction.scss'
import { ArrowLeft } from 'pixelarticons/react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoriesByType } from "../../data/categories.jsx";
import { createTransaction, getTransaction, updateTransaction } from "../../services/api.js";

import Button from "../../components/ui/Button/Button.jsx";

const todayISO = () => {
    const d = new Date();
    const local = new Date (d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
};

function NewTransaction() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [type, setType] = useState("GASTO");
    const [category, setCategory] = useState(null);
    const [amount, setAmount] = useState("");
    const [date , setDate] = useState(todayISO())
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(isEdit);

    const categories = categoriesByType(type);

    useEffect(() => {
        if (!isEdit) return;
        async function load() {
            try {
                setLoading(true);
                const tx = await getTransaction(id);
                setType(tx.type);
                setCategory(tx.category);
                setAmount(String(tx.amount));
                setDate(tx.date);
                setDescription(tx.description ?? "");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id, isEdit]);

    const handleTypeChange = (newType) => {
        setType(newType);
        setCategory(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!amount || Number(amount) <= 0) return setError("Ingresa un monto mayor a 0.");
        if (!category) return setError("Elige una categoría");

        const payload = {
            amount: Number(amount),
            type,
            category,
            date,
            description: description.trim(),
        };

        try {
            setSaving(true);
            if (isEdit) {
                await updateTransaction(id, payload);
                navigate("/transactions");
            } else {
                await createTransaction(payload);
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };
    
    const goBack = () => navigate(isEdit ? "/transactions" : "/dashboard");

    if (loading) return <div className="new-tx"><p>Cargando...</p></div>;

    return (
        <form className="new-tx" onSubmit={handleSubmit}>
            <div className="new-tx__header">
                <button
                    type="button"
                    className="new-tx__back"
                    onClick={goBack}
                    aria-label="Volver"
                >
                    <ArrowLeft />
                </button>
                <h1 className="new-tx__title">{isEdit ? "Editar entrada" : "Nueva Entrada"}</h1>
            </div>

            <div className="new-tx__toggle">
                <button
                    type="button"
                    className={`new-tx__toggle-btn ${type === "INGRESO" ? "is-active--income" : ""}`}
                    onClick={() => handleTypeChange("INGRESO")}
                >
                    ▲ Ingreso
                </button>
                <button
                    type="button"
                    className={`new-tx__toggle-btn ${type === "GASTO" ? "is-active--expense" : ""}`}
                    onClick={() => handleTypeChange("GASTO")}
                >
                    ▼ Gasto
                </button>
            </div>

            <div className="new-tx__amount-wrap">
                <input
                    className="new-tx__amount"
                    type="number" inputMode="decimal" step="0.01" min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <span className={`new-tx__currency ${amount ? "is-visible" : ""}`}>€</span>
            </div>

            <div className="new-tx__field">
                <span className="new-tx__label">Categoría</span>
                <div className="new-tx__categories">
                    {categories.map(({ value, label, Icon }) => (
                        <button
                            type="button"
                            key={value}
                            className={`new-tx__cat ${category === value ? "is-selected" : ""}`}
                            onClick={() => setCategory(value)}
                            aria-label={label} title={label}
                        >
                            <Icon />
                        </button>
                    ))}
                </div>
            </div>

            <div className="new-tx__field">
                <label className="new-tx__label" htmlFor="date">Fecha</label>
                <input
                    id="date" className="new-tx__input" type="date"
                    value={date}
                    max={todayISO()}
                    onChange={(e) => setDate(e.target.value)}/>
            </div>

            <div className="new-tx__field">
                <label className="new-tx__label" htmlFor="desc">Descripción</label>
                <input
                    id="desc" className="new-tx__input" type="text" maxLength={200}
                    placeholder="Añade una nota..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {error && <p className="new-tx__error">{error}</p>}

            <Button type="submit" variant="primary" fullWidth disabled={saving}>
                {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Guardar"}
            </Button>
        </form>
    );
}

export default NewTransaction;