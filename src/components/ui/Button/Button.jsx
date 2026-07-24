import './Button.scss';

function Button({
                    children,
                    variant = 'main',
                    type = 'button',
                    fullWidth = false,
                    disabled = false,
                    onClick,
                    ...rest              // deja pasar props extra (aria-label, etc.)
                }) {
    const classes = [
        'btn',
        `btn--${variant}`,
        fullWidth ? 'btn--full' : '',
    ].filter(Boolean).join(' '); // une las clases y descarta las vacías

    return (
        <button
            className={classes}
            type={type}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;