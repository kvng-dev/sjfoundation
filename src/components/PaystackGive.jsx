import { useState } from "react";
import { LuHeart } from "react-icons/lu";
import { trackEvent } from "../lib/analytic.js";

// Public key only (pk_live_... / pk_test_...). Set VITE_PAYSTACK_PUBLIC_KEY in
// .env locally and in Vercel -> Settings -> Environment Variables. Never put
// the secret key (sk_...) in this app.
const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
export const PAYSTACK_ENABLED = Boolean(PUBLIC_KEY);

const PRESETS = [2000, 5000, 10000, 25000];
const MIN_NGN = 100;
const naira = (n) => `\u20a6${Number(n).toLocaleString("en-NG")}`;

let scriptPromise;
function loadPaystack() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.PaystackPop) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      s.onload = resolve;
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Paystack failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function PaystackGive({ causes = [] }) {
  const [amount, setAmount] = useState("5000");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cause, setCause] = useState(causes[0] || "General donation");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null); // payment reference once successful

  const pay = async (e) => {
    e.preventDefault();
    setError("");
    const value = Number(amount);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Please enter a valid email so Paystack can send your receipt.");
    }
    if (!value || value < MIN_NGN) {
      return setError(`The minimum gift is ${naira(MIN_NGN)}.`);
    }

    setBusy(true);
    try {
      await loadPaystack();
      const ref = `SJF-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
      trackEvent("begin_donation", { cta_location: "donate_paystack", value });

      const handler = window.PaystackPop.setup({
        key: PUBLIC_KEY,
        email,
        amount: Math.round(value * 100), // Paystack uses kobo
        currency: "NGN",
        ref,
        metadata: {
          custom_fields: [
            { display_name: "Donor name", variable_name: "donor_name", value: name || "Anonymous" },
            { display_name: "Cause", variable_name: "cause", value: cause },
          ],
        },
        // Paystack requires a plain (non-async) function here.
        callback: function (response) {
          setDone(response.reference || ref);
          setBusy(false);
          trackEvent("donation_success", { value, cause });
        },
        onClose: function () {
          setBusy(false);
        },
      });
      handler.openIframe();
    } catch {
      setBusy(false);
      setError("We couldn't load the payment window. Check your connection and try again.");
    }
  };

  if (done) {
    return (
      <div className="dn-pay__done" role="status">
        <h4>Thank you{name ? `, ${name}` : ""}! 💛</h4>
        <p>
          Your gift was received. A receipt is on its way to {email}. Your
          reference is <strong>{done}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form className="dn-pay" onSubmit={pay} noValidate>
      <div className="dn-pay__presets" role="group" aria-label="Choose an amount">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            className={`dn-pay__chip${Number(amount) === p ? " is-on" : ""}`}
            onClick={() => setAmount(String(p))}
          >
            {naira(p)}
          </button>
        ))}
      </div>

      <div className="dn-formfield">
        <label htmlFor="dn-pay-amount">Amount (NGN)</label>
        <div className="dn-amountinput">
          <span aria-hidden="true">&#8358;</span>
          <input
            id="dn-pay-amount"
            type="number"
            min={MIN_NGN}
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      {causes.length > 0 && (
        <div className="dn-formfield">
          <label htmlFor="dn-pay-cause">Direct my gift to</label>
          <select id="dn-pay-cause" value={cause} onChange={(e) => setCause(e.target.value)}>
            {causes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <div className="dn-formfield">
        <label htmlFor="dn-pay-name">Name (optional)</label>
        <input id="dn-pay-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
      </div>

      <div className="dn-formfield">
        <label htmlFor="dn-pay-email">Email *</label>
        <input id="dn-pay-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
      </div>

      {error && <p className="dn-pay__error" role="alert">{error}</p>}

      <button type="submit" className="dn-btn dn-btn--primary" disabled={busy}>
        <LuHeart aria-hidden="true" /> {busy ? "Opening secure payment…" : `Give ${Number(amount) >= MIN_NGN ? naira(amount) : "now"}`}
      </button>
      <p className="dn-pay__note">Secure payment by Paystack. Cards, bank transfer and USSD accepted.</p>
    </form>
  );
}
