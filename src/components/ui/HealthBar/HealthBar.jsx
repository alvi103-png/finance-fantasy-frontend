import './HealthBar.scss'

function HealthBar({ lable, valueLabel, pct, variant = "income", animate = false }) {
    return (
        <div className={`health-bar health-bar--${variant}`}>
            <div className="health-bar__head">
                <span className="health-bar__label">{lable}</span>
                <span className="health-bar__value">{valueLabel}</span>
            </div>
            <div className="health-bar__track">
                <div className="health-bar__fill" style={{ width: animate ? `${pct}%` : "0%"}}/>
                <div className="health-bar__segment" />
            </div>
        </div>
    );
}
export default HealthBar;