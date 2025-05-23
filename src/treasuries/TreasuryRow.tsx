import "./TreasuryRow.css";
import type { TreasuryQuote } from "./treasuryQuote";

export function TreasuryRow({ quote }: Props) {
  return (
    <div
      className={`treasuries-TreasuryRow ${
        quote.symbol === "US20Y" ? "highlight" : ""
      }`}
    >
      <div className="symbol">{quote.symbol}</div>

      <div className="dash">—</div>

      <div className="rate">{(quote.rate * 100).toFixed(2)}%</div>
    </div>
  );
}

interface Props {
  quote: TreasuryQuote;
}
