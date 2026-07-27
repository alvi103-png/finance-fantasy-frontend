import { ArrowUp, ArrowDown } from 'pixelarticons/react'
import './SummaryCard.scss'

function SummaryCard({ variant = 'income', label, amount }) {
    const isIncome = variant === 'income'

    const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    }).format(amount ?? 0)

    return (
        <div className={`summary-card summary-card--${variant}`}>
            <span className="summary-card__label">
                {isIncome ? <ArrowUp /> : <ArrowDown />} {label}
            </span>
            <span className="summary-card__amount">{formatted}</span>
        </div>
    )
}

export default SummaryCard