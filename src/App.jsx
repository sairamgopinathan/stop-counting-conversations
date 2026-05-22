import React, { useMemo, useState } from "react";

const HUBSPOT_PRICE_PER_RESOLVED_CONVERSATION = 0.5;
const HUBSPOT_ENTERPRISE_INCLUDED_CREDITS = 5000;
const HUBSPOT_CREDITS_PER_AI_RESOLUTION = 100;
const ZOHO_INCLUDED_TOKENS = 30000000;
const ZOHO_PRICE_PER_MILLION_BILLABLE_TOKENS = 1;
const ZOHO_TOKENS_PER_AI_RESOLUTION = 15000;

const problemPoints = [
  ["Reps stop experimenting", "Teams avoid using AI Agents for smaller tasks because every interaction feels billable."],
  ["CX teams ration automation", "AI Agent workflows become restricted instead of integrated into daily operations."],
  ["Managers track usage, not outcomes", "Instead of focusing on productivity gains, teams focus on limiting AI Agent costs."],
];

const aiUseCases = [
  "Summarize leads and opportunities",
  "Draft sales follow-up emails",
  "Prepare for customer meetings",
  "Generate pipeline insights",
  "Assist customer conversations",
  "Automate CRM workflows",
];

const comparisonRows = [
  [
    "AI usage",
    "30K tokens included. $1 per additional 1M tokens.",
    "5K credits included. 100 credits per resolution. $0.50 for every additional resolution.",
  ],
  ["Team behavior", "Encourages daily use", "Creates hesitation"],
  ["Budgeting", "More predictable", "Pricing can scale with every interaction"],
  ["Adoption", "Built for experimentation", "Teams may ration usage"],
];

const wholeCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US");

function ButtonLink({ href, children, variant = "primary" }) {
  return (
    <a className={`button button-${variant}`} href={href}>
      {children}
    </a>
  );
}

function SliderControl({ label, value, min, max, step, onChange }) {
  return (
    <label className="slider-control">
      <span className="slider-label-row">
        <span>{label}</span>
        <strong>{numberFormatter.format(value)}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function CostCalculator({ resolvedConversations, setResolvedConversations }) {
  const estimatedTokens = resolvedConversations * ZOHO_TOKENS_PER_AI_RESOLUTION;
  const billableTokens = Math.max(0, estimatedTokens - ZOHO_INCLUDED_TOKENS);
  const zohoMonthlyCost = (billableTokens / 1000000) * ZOHO_PRICE_PER_MILLION_BILLABLE_TOKENS;
  const hubSpotIncludedResolutions = Math.floor(HUBSPOT_ENTERPRISE_INCLUDED_CREDITS / HUBSPOT_CREDITS_PER_AI_RESOLUTION);
  const hubSpotBillableConversations = Math.max(0, resolvedConversations - hubSpotIncludedResolutions);
  const hubSpotMonthlyCost = hubSpotBillableConversations * HUBSPOT_PRICE_PER_RESOLVED_CONVERSATION;
  const monthlyDifference = Math.max(0, hubSpotMonthlyCost - zohoMonthlyCost);
  const multiple = zohoMonthlyCost > 0 ? hubSpotMonthlyCost / zohoMonthlyCost : null;

  return (
    <aside className="calculator-card" aria-label="AI usage cost calculator">
      <div className="calculator-header">
        
        <h2>Compare AI Agent costs</h2>
        <p>For comparison, we assume 15,000 tokens ≈ 100 credits ≈ one resolved customer conversation.</p>
      </div>

      <SliderControl
        label="Resolved customer conversations/month"
        value={resolvedConversations}
        min={1000}
        max={5000}
        step={100}
        onChange={setResolvedConversations}
      />

      <div className="calculator-results">
        <div className="result-card positive">
          <span>Zia Agents</span>
          <strong>{wholeCurrencyFormatter.format(zohoMonthlyCost)}</strong>
          <ul className="result-list">
            <li>30M tokens included in Standard Edition</li>
            <li>{numberFormatter.format(ZOHO_TOKENS_PER_AI_RESOLUTION)} tokens per AI resolution (approx)</li>
            <li>{numberFormatter.format(Math.round(estimatedTokens / 1000000))}M estimated monthly tokens</li>
            <li>$1 per additional 1M tokens</li>
          </ul>
        </div>
        <div className="result-card neutral">
          <span>HubSpot Enterprise</span>
          <strong>{wholeCurrencyFormatter.format(hubSpotMonthlyCost)}</strong>
          <ul className="result-list">
            <li>5,000 included Enterprise credits</li>
            <li>100 credits per resolution used by Breeze Customer Agent</li>
            <li>Included {numberFormatter.format(hubSpotIncludedResolutions)} resolved conversations/month</li>
            <li>{numberFormatter.format(hubSpotBillableConversations)} billable resolutions × $0.50</li>
          </ul>
        </div>
      </div>

      <div className="calculator-summary">
        <strong>25× lower</strong>
        <p>Estimated monthly AI Agent operating cost difference in high-volume customer support workflows.</p>
        <span>Based on resolved conversation pricing vs token-based consumption models.</span>
      </div>

      <p className="calculator-disclaimer">
        Prices are based on industry estimates between Zia Agents and Breeze Customer Agent. Actual consumption may vary by feature and AI action.
      </p>
    </aside>
  );
}

export default function StopCountingConversations() {
  const [resolvedConversations, setResolvedConversations] = useState(5000);

  const monthlyConversations = useMemo(() => resolvedConversations, [resolvedConversations]);

  return (
    <main className="page-shell">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .page-shell {
          min-height: 100vh;
          background: #fff8ef;
          color: #111111;
          font-family: "Zoho Puvi", "ZohoPuvi", Arial, Helvetica, sans-serif;
        }

        .container {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 24px 0;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          color: #111111;
          text-decoration: none;
        }

        .brand-logo {
          display: block;
          width: 140px;
          height: auto;
          object-fit: contain;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .button {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          border-radius: 4px;
          border: 1px solid #111111;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          line-height: 1;
          white-space: nowrap;
          transition: background 160ms ease, color 160ms ease, transform 160ms ease;
        }

        .button:hover { transform: translateY(-1px); }
        .button:focus-visible,
        input:focus-visible,
        button:focus-visible {
          outline: 3px solid rgba(229, 37, 41, 0.2);
          outline-offset: 3px;
        }

        .button-primary {
          background: #e42527;
          color: #ffffff;
          border-color: #e42527;
        }

        .button-primary:hover { background: #c91f22; border-color: #c91f22; }

        .button-secondary {
          color: #111111;
          border-color: #111111;
          background: transparent;
        }

        .button-secondary:hover { background: #111111; color: #ffffff; }

        .hero {
          padding: 64px 0 78px;
          background: #fff8ef;
          border-top: 1px solid rgba(17, 17, 17, 0.08);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(430px, 0.82fr);
          gap: 64px;
          align-items: center;
        }

        .eyebrow {
          margin: 0;
          color: #e42527;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .hero h1,
        .section-title,
        .final-cta h2 {
          color: #111111;
          letter-spacing: -0.055em;
          font-weight: 900;
        }

        .hero h1 {
          max-width: 720px;
          margin: 0;
          font-size: clamp(52px, 6.4vw, 82px);
          line-height: 0.96;
        }

        .hero-lede {
          max-width: 680px;
          margin: 24px 0 0;
          color: #111111;
          font-size: clamp(20px, 2vw, 25px);
          line-height: 1.38;
          letter-spacing: -0.02em;
        }

        .hero-copy {
          max-width: 660px;
          margin: 18px 0 0;
          color: #333333;
          font-size: 17px;
          line-height: 1.72;
        }

        .hero-actions,
        .final-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .proof-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 34px;
          color: #222222;
          font-size: 13px;
          font-weight: 700;
        }

        .proof-row span {
          display: flex;
          align-items: center;
          min-height: 50px;
          padding: 12px 14px;
          border: 1px solid rgba(17, 17, 17, 0.14);
          background: #ffffff;
        }

        .proof-row span::before { display: none; }

        .calculator-card {
          position: relative;
          border: 1px solid #111111;
          background: #ffffff;
          padding: 30px;
          box-shadow: 12px 12px 0 #111111;
        }

        .calculator-card::before {
          content: "";
          position: absolute;
          left: -1px;
          right: -1px;
          top: -1px;
          height: 6px;
          background: linear-gradient(90deg, #e42527 0 25%, #1f72c9 25% 50%, #159947 50% 75%, #f9b21d 75% 100%);
        }

        .calculator-header h2 {
          margin: 8px 0 0;
          color: #111111;
          font-size: 30px;
          line-height: 1.1;
          letter-spacing: -0.035em;
          font-weight: 900;
        }

        .calculator-header p:last-child {
          margin: 12px 0 0;
          color: #444444;
          font-size: 15px;
          line-height: 1.65;
        }

        .slider-control {
          display: grid;
          gap: 10px;
          margin-top: 24px;
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          color: #333333;
          font-size: 14px;
          font-weight: 700;
        }

        .slider-label-row strong {
          color: #111111;
          font-size: 18px;
          font-weight: 900;
        }

        input[type="range"] {
          width: 100%;
          accent-color: #e42527;
        }

        .calculator-results {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 22px;
        }

        .result-card {
          border: 1px solid #111111;
          padding: 18px;
          background: #ffffff;
        }

        .result-card.positive {
          background: #fff8ef;
          border-color: #111111;
          box-shadow: none;
          position: relative;
        }

        .result-card.positive::before {
          content: "Zoho advantage";
          display: inline-flex;
          margin-bottom: 12px;
          padding: 5px 8px;
          background: #159947;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .result-card.neutral { background: #ffffff; }

        .result-card span {
          display: block;
          color: #333333;
          font-size: 12px;
          font-weight: 800;
        }

        .result-card strong {
          display: block;
          margin-top: 8px;
          color: #111111;
          font-size: clamp(34px, 4vw, 46px);
          line-height: 1;
          letter-spacing: -0.055em;
          font-weight: 900;
        }

        .result-card.positive strong {
          color: #159947;
          font-size: clamp(38px, 5vw, 54px);
        }

        .result-card.positive span { color: #111111; }

        .result-list {
          margin: 14px 0 0;
          padding-left: 18px;
          list-style: disc;
          color: #444444;
          font-size: 12px;
          line-height: 1.7;
        }

        .result-list li + li {
          margin-top: 4px;
        }

        .calculator-summary {
          margin-top: 16px;
          padding: 20px;
          background: #111111;
          color: #ffffff;
        }

        .calculator-summary strong {
          display: block;
          font-size: 42px;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .calculator-summary p {
          margin: 10px 0 0;
          color: #f4f4f4;
          font-size: 14px;
          line-height: 1.55;
        }

        .calculator-summary span {
          display: block;
          margin-top: 10px;
          color: #f9b21d;
          font-size: 13px;
          font-weight: 800;
        }

        .calculator-disclaimer {
          margin: 14px 0 0;
          color: #555555;
          font-size: 12px;
          line-height: 1.55;
        }

        .section,
        .section-muted,
        .final-cta {
          padding: 78px 0;
        }

        .section { background: #ffffff; }
        .section-muted { background: #fff8ef; border-top: 1px solid rgba(17, 17, 17, 0.08); border-bottom: 1px solid rgba(17, 17, 17, 0.08); }

        .difference-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(430px, 1fr);
          gap: 58px;
          align-items: start;
        }

        .difference-layout .section-head { margin-bottom: 0; }

        .final-cta {
          background: #111111;
          text-align: center;
          color: #ffffff;
        }

        .section-head {
          max-width: 760px;
          margin-bottom: 34px;
        }

        .section-head.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .section-title,
        .final-cta h2 {
          margin: 0;
          font-size: clamp(38px, 4.4vw, 58px);
          line-height: 1.03;
        }

        .section-copy,
        .final-cta p {
          margin: 20px 0 0;
          color: #333333;
          font-size: 18px;
          line-height: 1.7;
        }

        .final-cta h2 { color: #ffffff; }
        .final-cta p { color: #e7e7e7; }

        .problem-grid,
        .use-case-grid,
        .emotional-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          border: 1px solid #111111;
          background: #ffffff;
          padding: 26px;
          box-shadow: 8px 8px 0 #f2efe8;
        }

        .card.indexed {
          display: grid;
          gap: 14px;
        }

        .card-number {
          color: #e42527;
          font-size: 13px;
          font-weight: 900;
        }

        .card h3 {
          margin: 0;
          color: #111111;
          font-size: 22px;
          line-height: 1.18;
          letter-spacing: -0.03em;
          font-weight: 900;
        }

        .card p {
          margin: 0;
          color: #333333;
          font-size: 15px;
          line-height: 1.65;
        }

        .quote-box {
          max-width: 720px;
          margin: 30px auto 0;
          padding: 26px 28px;
          border: 1px solid #111111;
          background: #fff8ef;
          color: #111111;
          font-size: 30px;
          line-height: 1.25;
          letter-spacing: -0.035em;
          font-weight: 900;
          text-align: center;
        }

        .use-case-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

        .use-case-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .use-case-list div {
          position: relative;
          border: 1px solid #111111;
          background: #ffffff;
          padding: 16px 16px 16px 44px;
          color: #111111;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.35;
        }

        .use-case-list div::before {
          content: "";
          position: absolute;
          left: 16px;
          top: 18px;
          width: 14px;
          height: 14px;
          background: #1f72c9;
        }

        .use-case-list div:nth-child(2)::before { background: #e42527; }
        .use-case-list div:nth-child(3)::before { background: #159947; }
        .use-case-list div:nth-child(4)::before { background: #f9b21d; }
        .use-case-list div:nth-child(5)::before { background: #111111; }
        .use-case-list div:nth-child(6)::before { background: #1f72c9; }

        .difference-note {
          margin-top: 18px;
          border: 1px solid #111111;
          background: #111111;
          padding: 22px 24px;
          color: #ffffff;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1.32;
        }

        .comparison-table {
          border: 1px solid #111111;
          overflow: hidden;
          background: #ffffff;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 0.8fr 1fr 1fr;
        }

        .comparison-row.header {
          background: #111111;
          color: #ffffff;
          font-weight: 900;
        }

        .comparison-cell {
          padding: 20px 22px;
          white-space: pre-line;
          border-top: 1px solid #111111;
          border-right: 1px solid #111111;
          color: #333333;
          font-size: 15px;
          line-height: 1.5;
        }

        .comparison-cell:last-child { border-right: 0; }
        .comparison-row.header .comparison-cell { border-top: 0; color: #ffffff; }
        .comparison-cell:first-child { font-weight: 900; color: #111111; }
        .comparison-row.header .comparison-cell:first-child { color: #ffffff; }
        .zoho-cell { color: #159947; font-weight: 800; }
        .metered-cell { color: #333333; }

        .final-cta .button-primary { background: #e42527; border-color: #e42527; }
        .final-cta .button-secondary { border-color: #ffffff; color: #ffffff; }
        .final-cta .button-secondary:hover { background: #ffffff; color: #111111; }
        .final-cta h2 { max-width: 820px; margin-left: auto; margin-right: auto; }
        .final-cta p { max-width: 640px; margin-left: auto; margin-right: auto; }
        .final-actions { justify-content: center; }

        .campaign-line {
          margin-top: 42px;
          color: #f9b21d;
          font-size: 21px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        @media (max-width: 1040px) {
          .hero-grid,
          .difference-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 860px) {
          .problem-grid,
          .use-case-list,
          .emotional-grid,
          .proof-row {
            grid-template-columns: 1fr;
          }

          .comparison-row { grid-template-columns: 1fr; }
          .comparison-row.header { display: none; }

          .comparison-cell {
            border-right: 0;
          }

          .comparison-cell::before {
            display: block;
            margin-bottom: 5px;
            color: #666666;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .comparison-cell:nth-child(1)::before { content: "Category"; }
          .comparison-cell:nth-child(2)::before { content: "Zia Agents"; }
          .comparison-cell:nth-child(3)::before { content: "HubSpot Breeze"; }
        }

        @media (max-width: 720px) {
          .container { width: min(100% - 32px, 1180px); }

          .nav,
          .nav-actions,
          .hero-actions,
          .final-actions {
            align-items: stretch;
            flex-direction: column;
            width: 100%;
          }

          .brand { width: 100%; }
          .button { width: 100%; }
          .hero { padding: 44px 0 58px; }
          .section, .section-muted, .final-cta { padding: 58px 0; }
          .calculator-results { grid-template-columns: 1fr; }
          .calculator-card { box-shadow: 8px 8px 0 #111111; }
        }
      `}</style>

      <header className="container nav">
        <a className="brand" href="#top" aria-label="Zoho CRM campaign home">
          <img
            className="brand-logo"
            src="https://upload.wikimedia.org/wikipedia/en/d/d7/Zoho_CRM_%28application%29.svg"
            alt="Zoho CRM"
          />
        </a>
        <div className="nav-actions">
          <ButtonLink href="#comparison" variant="secondary">See Pricing Plans</ButtonLink>
          <ButtonLink href="#difference" variant="primary">Explore Zia Agents</ButtonLink>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <h1>Stop counting conversations.</h1>
            <p className="hero-lede">
              AI Agents should help your team move faster, not make them wonder what every conversation costs.
            </p>
            <p className="hero-copy">
              HubSpot Breeze Customer Agent charges based on resolved conversations. Zia Agents gives sales and CX teams predictable AI Agent usage with 30M included tokens, so teams can adopt AI Agents across customer interactions and workflows without hesitation.
            </p>
            <div className="hero-actions">
              <ButtonLink href="#difference" variant="primary">Explore Zia Agents</ButtonLink>
              <ButtonLink href="#comparison" variant="secondary">See Pricing Plans</ButtonLink>
            </div>
            <div className="proof-row">
              <span>Predictable customer AI costs</span>
              <span>Built for AI agent adoption</span>
              <span>No per-resolution AI pricing</span>
            </div>
          </div>
          <CostCalculator
            resolvedConversations={resolvedConversations}
            setResolvedConversations={setResolvedConversations}
          />
        </div>
      </section>

      <section className="section" id="problem" aria-labelledby="problem-title">
        <div className="container">
          <div className="section-head center">
            <h2 className="section-title" id="problem-title">Metered AI Agents change how teams behave.</h2>
            <p className="section-copy">
              When every AI conversation has a price tag, teams start asking the wrong question:
            </p>
          </div>
          <div className="quote-box">“Should I use my AI Agent for this?”</div>
          <div className="section-head center" style={{ marginTop: "28px", marginBottom: "30px" }}>
            <p className="section-copy">
              That hesitation kills adoption. Customer AI agents should become part of daily operations, not a budgeting exercise.
            </p>
          </div>
          <div className="problem-grid">
            {problemPoints.map(([title, copy], index) => (
              <article className="card indexed" key={title}>
                <span className="card-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="comparison" aria-labelledby="comparison-title">
        <div className="container">
          <div className="section-head center">
            <h2 className="section-title" id="comparison-title">What happens when AI Agents have a meter?</h2>
            <p className="section-copy">
              Per-resolution pricing does more than increase cost. It changes how confidently teams adopt customer AI agents at scale.
            </p>
          </div>
          <div className="comparison-table">
            <div className="comparison-row header">
              <div className="comparison-cell">Category</div>
              <div className="comparison-cell">Zia Agents</div>
              <div className="comparison-cell">HubSpot Breeze Customer Agent</div>
            </div>
            {comparisonRows.map(([category, zoho, metered]) => (
              <div className="comparison-row" key={category}>
                <div className="comparison-cell">{category}</div>
                <div className="comparison-cell zoho-cell">{zoho}</div>
                <div className="comparison-cell metered-cell">{metered}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-muted" id="adoption-proof" aria-labelledby="adoption-proof-title">
        <div className="container difference-layout">
          <div className="section-head">
            <h2 className="section-title" id="adoption-proof-title">Built for adoption. Not hesitation.</h2>
            <p className="section-copy">
              Zia Agents includes 30M tokens, giving sales and CX teams the freedom to use AI Agents across customer interactions, follow-ups, insights, and workflows without constantly watching consumption.
            </p>
          </div>
          <div>
            <div className="use-case-list">
              {aiUseCases.map((item) => (
                <div key={`adoption-${item}`}>{item}</div>
              ))}
            </div>
            <div className="difference-note">
              AI Agents work best when teams use them freely across every customer interaction.
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="closing-title">
        <div className="container">
          <h2 id="closing-title">Stop counting. Start selling.</h2>
          <p>
            Give your team customer AI agents they can actually use without second-guessing every resolution.
          </p>
          <div className="final-actions">
            <ButtonLink href="#top" variant="primary">Explore Zia Agents</ButtonLink>
            <ButtonLink href="#comparison" variant="secondary">Talk to sales</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
