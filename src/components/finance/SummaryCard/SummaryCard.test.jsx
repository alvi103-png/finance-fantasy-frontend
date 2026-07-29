import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SummaryCard from './SummaryCard.jsx';


describe("<SummaryCard />", () => {
    it('muestra el label y el monto formateado', () => {
        render(<SummaryCard variant="income" label="Ingresos" amount={1500} />);
        expect(screen.getByText(/Ingresos/)).toBeInTheDocument();
        expect(screen.getByText(/1[.,\s]?500/)).toBeInTheDocument();
    })
})