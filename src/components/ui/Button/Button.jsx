import './Button.scss'

function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    type = 'button',
    className = '',
    ...rest
}) {
    const classes = [
        'btn',
        `btn--${variant}`,
        fullWidth ? 'btn--full' : '',
        className,
    ].filter(Boolean).join(' ')

    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    )
}

export default Button