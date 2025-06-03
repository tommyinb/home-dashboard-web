import { useState } from "react";
import { useAsync } from "../clipboards/useAsync";
import { downloadJson } from "./downloadJson";
import "./Treasury.css";
import { TreasuryButton } from "./TreasuryButton";
import type { TreasuryData } from "./treasuryData";
import { TreasuryRow } from "./TreasuryRow";

export function Treasury() {
  const [refresh, setRefresh] = useState(0);

  const asyncData = useAsync(async () => {
    if (refresh < 0) {
      return undefined;
    }

    return await downloadJson<TreasuryData>("treasuries/treasury.json");
  }, [refresh]);

  return (
    <div className="treasuries-Treasury">
      <h2 className="name">US Treasury</h2>

      {asyncData.loading ? (
        <div className="loading">(loading)</div>
      ) : (
        <div className="content">
          <div className="list" data-time={asyncData.value?.time}>
            {asyncData.value?.quotes
              .filter((quote) =>
                ["US1M", "US1Y", "US5Y", "US10Y", "US20Y", "US30Y"].includes(
                  quote.symbol
                )
              )
              .map((quote) => (
                <TreasuryRow key={quote.symbol} quote={quote} />
              ))}
          </div>

          <TreasuryButton key={refresh} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
}
