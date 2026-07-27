import './SummaryCard.scss'

function SummaryCard({ variant = 'income', label, amount }) {
    const isIncome = variant === 'income'

    const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    }).format(amount ?? 0)

    return (
        <div className="SummaryCard">
            <span className="SummaryCard__label">
                {isIncome ? '▲' : '▼'} {label}
            </span>
            <span className="SummaryCard__amount">{formatted}</span>
        </div>
    )
}

export default SummaryCard