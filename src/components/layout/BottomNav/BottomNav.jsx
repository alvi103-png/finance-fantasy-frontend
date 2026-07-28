import {NavLink} from "react-router-dom";
import {Home, Notes, ChartColumnDecreasing } from "pixelarticons/react";
import "./BottomNav.scss"

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/dashboard" className="bottom-nav__item">
                <Home />
                <span className="bottom-nav__label">Home</span>
            </NavLink>
            <NavLink to="/transactions" className="bottom-nav__item">
                <Notes />
                <span className="bottom-nav__label">Movs</span>
            </NavLink>
            <NavLink to="/summary" className="bottom-nav__item">
                <ChartColumnDecreasing />
                <span className="bottom-nav__label">Stats</span>
            </NavLink>
        </nav>
    );
}

export default BottomNav;