import { Edit, Trash} from '@nsmr/pixelart-react'
import './TransactionItem.scss'

function TransactionItem({
                             icon,
                             title,
                             category,
                             date,
                             type = 'expense',
                             amount,
                             showAction = false,
                             onEdit,
                             onDelete,
                         }) {
    const isIncome = type === 'income';

    const shortDate = new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'short'
    }).format(new Date(date))

    const formattedAmount =
        (isIncome ? '+' : '-') + new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(amount ?? 0)

    return (
        <div className="tx-item">
            <span className="tx-item__icon">{icon}</span>

            <div className="tx-item__info">
                <span className="tx-item__title">{title}</span>
                <span className="tx-item__meta">{shortDate} · {category}</span>
            </div>

            <span className={`tx-item__amount tx-item__amount--${type}`}>
                {formattedAmount}
            </span>

            {showAction && (
                <div className="tx-item__action">
                    <button className="tx-item__action" onClick={onEdit} aria-label="Editar">
                        <Edit />
                    </button>
                    <button className="tx-item__action" onClick={onDelete} aria-label="Eliminar">
                        <Trash />
                    </button>
                </div>
            )}
        </div>
    )
}
export default TransactionItem