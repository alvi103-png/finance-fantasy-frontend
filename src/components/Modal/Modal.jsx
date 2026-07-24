import './Modal.scss'

function Modal({  isOpen, onClose, title, children }) {
    if (!isOpen) return null

    return (
        <div className="modal__overlay" onClick={ onClose }>
            <div className="modal__box" onClick={(e) => e.stopPropagation()}>
                {title && <h2 className="modal__title">{title}</h2>}
                <div className="modal__content">{children}</div>

            </div>
        </div>
    )
}

export default Modal