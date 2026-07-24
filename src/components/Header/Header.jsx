import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken } from "../../services/api.js";
import { Menu, Close } from 'pixelarticons/react'
import crystal from '../../assets/crystal.png'
import './Header.scss'
import Modal from '../Modal/Modal.jsx'

function Header() {
    const [open, setOpen] = useState(false)
    const [confirmLogout, setConfirmLogout] = useState(false)
    const navigate = useNavigate();
    const closeMenu = () => setOpen(false)

    const handleLogout = () => {
        clearToken()
        closeMenu()
        navigate("/login")
    }

    return (
        <header className="app-header">
            <div className="app-header__brand">
                <img className="app-header__logo" src={crystal} alt=""/>
                <span className="app-header__title">Finance Fantasy</span>
            </div>

            <nav className={`app-header__nav ${open ? "is-open" : ""}`}>
                {}
                <NavLink to="/dashboard" className="app-header__link" onClick={closeMenu}>Dashboard</NavLink>
                <NavLink to="/transacciones" className="app-header__link" onClick={closeMenu}>Transacciones</NavLink>
                <NavLink to="/resumen" className="app-header__link" onClick={closeMenu}>Resumen</NavLink>
                {}
                <button className="app-header__logout" onClick={() => setConfirmLogout(true)}>
                    Cerrar sesión
                </button>
            </nav>

            <button
                className="app-header__menu"
                aria-label="Menú"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                {open ? <Close /> : <Menu />}
            </button>

            <Modal
                isOpen={confirmLogout}
                onClose={() => setConfirmLogout(false)}
                title="¿Cerrar sesión?"
                >

                <p className="modal__text">¿Seguo que quieres salir de tu cuenta?</p>
                <div className="modal__actions">
                    {}
                    <button className="modal__btn--ghost" onClick={() => setConfirmLogout(false)}>
                        Cancelar
                    </button>
                    {}
                    <button className="modal__btn--danger" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </Modal>
        </header>
    );
}

export default Header;