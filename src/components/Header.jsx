import crystal from '../assets/crystal.png'

function Header() {
    return (
        <header className="app-header">
            <div className="app-header__brand">
                <img className="app-header__logo" src={crystal} alt=""/>
                <span className="app-header__title">Finance Fantasy</span>
            </div>

            <button className="app-header__menu" aria-label="Menú">☰</button>
        </header>
    );
}

export default Header;