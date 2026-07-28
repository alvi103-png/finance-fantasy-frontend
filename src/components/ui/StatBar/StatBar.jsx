import "./StatBar.scss"

function StatBar({ label, valueLabel, pct, color, animate = false, delay = 0 }) {
    return (
        <div className="stat-bar">
            <span className="stat-bar__label">{label}</span>
            <div className="stat-bar__track">
                <div
                    className="stat-bar__fill"
                    style={{
                        width: animate ? `${pct}%` : "0%",
                        background: color,
                        transitionDelay: `${delay}ms`,
                    }}
                />
            </div>
            <span className="stat-bar__value">{valueLabel}</span>
        </div>
    );
}

export default StatBar;