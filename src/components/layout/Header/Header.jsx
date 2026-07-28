import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken } from "../../../services/api.js";
import { Logout } from "pixelarticons/react";
import crystal from "../../../assets/crystal.png";
import "./Header.scss";
import Modal from "../../ui/Modal/Modal.jsx";

function Header() {
    const [confirmLogout, setConfirmLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        setConfirmLogout(false);
        navigate("/login");
    };

    return (
        <header className="app-header">
            <div className="app-header__brand">
                <img className="app-header__logo" src={crystal} alt="" />
                <span className="app-header__title">Finance Fantasy</span>
            </div>

            <nav className="app-header__nav">
                <NavLink to="/dashboard" className="app-header__link">Dashboard</NavLink>
                <NavLink to="/transactions" className="app-header__link">Transacciones</NavLink>
                <NavLink to="/summary" className="app-header__link">Resumen</NavLink>
            </nav>
            
            <button
                className="app-header__logout"
                onClick={() => setConfirmLogout(true)}
                aria-label="Cerrar sesión"
            >
                <Logout />
                <span className="app-header__logout-text">Cerrar sesión</span>
            </button>

            <Modal isOpen={confirmLogout} onClose={() => setConfirmLogout(false)} title="¿Cerrar sesión?">
                <p className="modal__text">¿Seguro que quieres salir de tu cuenta?</p>
                <div className="modal__actions">
                    <button className="modal__btn--ghost" onClick={() => setConfirmLogout(false)}>Cancelar</button>
                    <button className="modal__btn--danger" onClick={handleLogout}>Salir</button>
                </div>
            </Modal>
        </header>
    );
}

export default Header;