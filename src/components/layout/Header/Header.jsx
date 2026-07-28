import { NavLink } from "react-router-dom";
import crystal from "../../../assets/crystal.png";
import "./Header.scss";

function Header() {
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
                <NavLink to="/profile" className="app-header__link">Perfil</NavLink>
            </nav>
        </header>
    );
}

export default Header;