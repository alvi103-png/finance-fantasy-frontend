import { NavLink } from "react-router-dom";
import { Home, Notes, ChartColumnDecreasing, Plus } from "pixelarticons/react";
import "./BottomNav.scss";

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <div className="bottom-nav__group">
                <NavLink to="/dashboard" className="bottom-nav__item">
                    <Home />
                    <span className="bottom-nav__label">Home</span>
                </NavLink>
                <NavLink to="/transactions" className="bottom-nav__item">
                    <Notes />
                    <span className="bottom-nav__label">Movs</span>
                </NavLink>
            </div>

            <NavLink to="/new" className="bottom-nav__fab" aria-label="Nueva transacción">
                <Plus />
            </NavLink>

            <div className="bottom-nav__group">
                <NavLink to="/summary" className="bottom-nav__item">
                    <ChartColumnDecreasing />
                    <span className="bottom-nav__label">Stats</span>
                </NavLink>
            </div>
        </nav>
    );
}

export default BottomNav;