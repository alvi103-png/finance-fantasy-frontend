import { useState } from "react";

const HOY = new Date();
const CURRENT = { year: HOY.getFullYear(), month: HOY.getMonth() + 1 };

/**
 * Maneja el mes que se está viendo, con navegación ‹ mes ›.
 * Reutilizable en Stats y Movs
 */
export function useMonthCursor() {
    const [cursor, setCursor] = useState(CURRENT);
    const { year, month } = cursor;

    const rawLabel = new Date(year, month - 1, 1)
        .toLocaleDateString("es-ES", { month: "long" });
    const label = `${rawLabel.charAt(0).toUpperCase()}${rawLabel.slice(1)} ${year}`;

    const isCurrentMonth = year === CURRENT.year && month === CURRENT.month;

    const shiftMonth = (delta) => {
        setCursor((prev) => {
            const d = new Date(prev.year, prev.month - 1 + delta, 1);
            return { year: d.getFullYear(), month: d.getMonth() + 1 };
        });
    };

    return { year, month, label, isCurrentMonth, shiftMonth };
}