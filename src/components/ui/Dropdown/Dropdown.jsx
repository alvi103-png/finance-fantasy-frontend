import {useEffect, useRef, useState} from "react";
import {ChevronDown} from "pixelarticons/react"
import "./Dropdown.scss"


function Dropdown({ value, onChange, options, placeholder = "Selecciona..."}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options[options.find((o) => o.value === value)];

    const handleSelect = (val) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className="dropdown" ref={ref}>
            <button
                type="button"
                className={`dropdown__trigger ${open ? "is-open" : ""}`}
                onClick={() => setOpen((o) => !o)}
                >
                <span>{selected ? selected.label : placeholder}</span>
                <ChevronDown />
            </button>

            {open && (
                <ul className="dropdown__menu">
                    {options.map((o) => (
                        <li key={o.value}>
                            <button
                                type="button"
                                className={`dropdown__option ${o.value === value ? "is-selected" : ""}`}
                                onClick={() => handleSelect(o.value)}
                                >
                                {o.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;