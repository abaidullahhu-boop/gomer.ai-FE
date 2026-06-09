import { Check, X, Download } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";

const styles = `
.vb { --vb-bg:#f3efe8; --vb-dark:#1a182b; --vb-grey:#6b6880; --vb-line:rgba(26,24,43,0.08);
  --vb-violet1:#a89bff; --vb-violet2:#7c66f5; --vb-violet3:#4224bc; --vb-peach:#ffd4b5;
  background:var(--vb-bg); color:var(--vb-dark); min-height:100vh; font-family:Gellix,ui-sans-serif,sans-serif; }
.vb-wrap { max-width:1100px; margin:0 auto; padding:0 1.5rem; }
.vb-nav { display:flex; align-items:center; justify-content:space-between; padding:1.5rem 0; }
.vb-nav-brand { font-size:1.4rem; font-weight:700; letter-spacing:-0.04em; }
.vb-nav ul { display:flex; gap:1.8rem; list-style:none; padding:0; margin:0; font-size:0.9rem; color:var(--vb-grey); }
.vb-nav a { color:inherit; text-decoration:none; }
.vb-cta { background:var(--vb-dark); color:#fff; padding:0.55rem 1.1rem; border-radius:999px; font-size:0.85rem; text-decoration:none; }
.vb-hero { text-align:center; padding:3.5rem 0 4rem; }
.vb-hero h1 { font-size:clamp(2.4rem,5vw,3.6rem); font-weight:700; letter-spacing:-0.04em; line-height:1.05; margin:0; }
.vb-section { padding:3rem 0; border-top:1px solid var(--vb-line); }
.vb-section-head { display:flex; align-items:flex-start; justify-content:space-between; gap:2rem; margin-bottom:2rem; flex-wrap:wrap; }
.vb-section h2 { font-size:1.7rem; font-weight:700; letter-spacing:-0.03em; margin:0 0 0.5rem; }
.vb-section p.lead { color:var(--vb-grey); max-width:32rem; font-size:0.95rem; line-height:1.55; margin:0; }
.vb-dl-btn { display:inline-flex; align-items:center; gap:0.5rem; background:var(--vb-dark); color:#fff; padding:0.6rem 1.1rem; border-radius:999px; font-size:0.85rem; border:none; cursor:pointer; text-decoration:none; }
.vb-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
@media (max-width:780px) { .vb-grid-2 { grid-template-columns:1fr; } }
.vb-card { border-radius:18px; aspect-ratio:16/10; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; border:1px solid var(--vb-line); }
.vb-card-bar { position:absolute; top:0; left:0; right:0; height:22px; background:rgba(255,255,255,0.45); display:flex; align-items:center; gap:5px; padding:0 10px; }
.vb-card-bar i { width:8px; height:8px; border-radius:50%; background:rgba(0,0,0,0.18); }
.vb-card .logo { font-size:clamp(2rem,5vw,3.4rem); font-weight:700; letter-spacing:-0.05em; }
.vb-bg-violet { background:linear-gradient(135deg,#a89bff,#7c66f5 55%,#4224bc); color:#fff; }
.vb-bg-peach { background:radial-gradient(ellipse at 30% 30%,#ffd9b8,#f8c9c0 60%,#e8c5e0); color:#1a182b; }
.vb-bg-white { background:#fff; color:#1a182b; }
.vb-bg-dark { background:#161427; color:#fff; }
.vb-checklist { display:grid; grid-template-columns:1fr 1fr; gap:0.7rem 2rem; margin-top:1.2rem; font-size:0.9rem; color:var(--vb-grey); }
.vb-checklist span { display:flex; align-items:center; gap:0.55rem; }
.vb-checklist .ok { color:#22c55e; }
.vb-checklist .no { color:#ef4444; }
@media (max-width:780px) { .vb-checklist { grid-template-columns:1fr; } }
.vb-colors { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
@media (max-width:780px) { .vb-colors { grid-template-columns:repeat(2,1fr); } }
.vb-swatch { border-radius:14px; padding:1rem; min-height:140px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--vb-line); font-size:0.75rem; }
.vb-swatch b { font-size:0.85rem; font-weight:600; }
.vb-type-card { background:linear-gradient(135deg,#8a76f3,#4224bc); color:#fff; border-radius:20px; padding:2rem; display:grid; grid-template-columns:1fr 1.4fr; gap:2rem; align-items:center; overflow:hidden; }
@media (max-width:780px) { .vb-type-card { grid-template-columns:1fr; } }
.vb-type-card .big { font-size:clamp(3.5rem,9vw,7rem); font-weight:700; letter-spacing:-0.05em; line-height:0.95; }
.vb-type-meta .tags { display:flex; gap:0.4rem; margin-top:1rem; flex-wrap:wrap; }
.vb-type-meta .tag { background:rgba(255,255,255,0.18); padding:0.3rem 0.7rem; border-radius:999px; font-size:0.75rem; }
.vb-tone { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
@media (max-width:780px) { .vb-tone { grid-template-columns:1fr; } }
.vb-tone-card { border-radius:18px; padding:1.5rem; border:1px solid var(--vb-line); }
.vb-tone-do { background:linear-gradient(135deg,#c4baff,#8e7af0); color:#1a182b; }
.vb-tone-dont { background:linear-gradient(135deg,#e8e6ed,#c8c6d0); color:#1a182b; }
.vb-tone-badge { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.6); display:flex; align-items:center; justify-content:center; margin-bottom:0.8rem; }
.vb-tone-card h3 { margin:0 0 1rem; font-size:1rem; font-weight:600; }
.vb-tone-card ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.7rem; font-size:0.85rem; line-height:1.4; }
.vb-tone-card li { display:flex; gap:0.5rem; }
.vb-tone-card li::before { content:""; flex-shrink:0; width:6px; height:6px; border-radius:50%; background:currentColor; margin-top:0.5rem; opacity:0.6; }
.vb-mockups { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
@media (max-width:780px) { .vb-mockups { grid-template-columns:1fr; } }
.vb-mockup { border-radius:14px; aspect-ratio:4/3; border:1px solid var(--vb-line); padding:0.8rem; background:#fff; display:flex; flex-direction:column; gap:0.5rem; }
.vb-mockup.alt1 { background:linear-gradient(135deg,#ede9ff,#fff); }
.vb-mockup.alt2 { background:#fff; border:1px solid #c9beff; }
.vb-mockup .row { height:8px; border-radius:4px; background:rgba(0,0,0,0.06); }
.vb-mockup .row.w70 { width:70%; }
.vb-mockup .row.w50 { width:50%; }
.vb-mockup .row.w90 { width:90%; }
.vb-footer { padding:4rem 0 2rem; border-top:1px solid var(--vb-line); margin-top:3rem; }
.vb-footer-grid { display:grid; grid-template-columns:1.5fr repeat(4,1fr); gap:2rem; }
@media (max-width:800px) { .vb-footer-grid { grid-template-columns:1fr 1fr; } }
.vb-footer h4 { font-size:0.8rem; font-weight:600; margin:0 0 1rem; }
.vb-footer ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.55rem; font-size:0.9rem; }
.vb-footer a { color:var(--vb-grey); text-decoration:none; }
.vb-footer a:hover { color:var(--vb-dark); }
.vb-wordmark { text-align:center; font-size:clamp(6rem,22vw,18rem); font-weight:800; letter-spacing:-0.06em; line-height:0.8; background:linear-gradient(180deg,#c9beff 0%,#7c66f5 60%,#3a1fa6 100%); -webkit-background-clip:text; background-clip:text; color:transparent; margin-top:3rem; user-select:none; }
`;

function CardLogo({ variant, text = "viktor" }: { variant: string; text?: string }) {
  return (
    <div className={`vb-card vb-bg-${variant}`}>
      <div className="vb-card-bar"><i /><i /><i /></div>
      <div className="logo">{text}</div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="vb">
      <PageMeta
        title="Brand Usage Guidelines — Viktor"
        description="Logo, colours, typography and tone of voice guidelines for the Viktor brand."
      />
      <style>{styles}</style>
      <div className="vb-wrap">
        <nav className="vb-nav">
          <div className="vb-nav-brand">viktor</div>
          <ul>
            <li><a href="/product">Product</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/brand">Brand</a></li>
            <li><a href="/about">About</a></li>
          </ul>
          <a className="vb-cta" href="#">Get Started</a>
        </nav>

        <header className="vb-hero">
          <h1>Brand Usage<br />Guidelines</h1>
        </header>

        {/* LOGO */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>Logo</h2>
              <p className="lead">Our logo is the primary signature of the Viktor brand. Use it with care, give it room to breathe, and keep the proportions intact.</p>
            </div>
            <a className="vb-dl-btn" href="#"><Download size={14} /> Download logo</a>
          </div>
          <div className="vb-grid-2">
            <CardLogo variant="violet" />
            <CardLogo variant="peach" />
            <CardLogo variant="white" />
            <CardLogo variant="dark" />
          </div>
          <div className="vb-section-head" style={{ marginTop: "3rem" }}>
            <div>
              <p className="lead">The full wordmark <b>viktor.com</b> can be used in marketing surfaces, ads and partnership material where the URL is part of the call to action.</p>
            </div>
          </div>
          <div className="vb-grid-2">
            <CardLogo variant="violet" text="viktor.com" />
            <CardLogo variant="peach" text="viktor.com" />
            <CardLogo variant="white" text="viktor.com" />
            <CardLogo variant="dark" text="viktor.com" />
          </div>
        </section>

        {/* AVATAR */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>Avatar</h2>
              <p className="lead">The avatar is used as a compact identifier across social, app icons and product surfaces where the full wordmark won't fit.</p>
            </div>
            <a className="vb-dl-btn" href="#"><Download size={14} /> Download avatar</a>
          </div>
          <div className="vb-grid-2">
            <div className="vb-card vb-bg-white">
              <div className="vb-card-bar"><i /><i /><i /></div>
              <div style={{ width: 90, height: 90, borderRadius: 22, background: "linear-gradient(135deg,#a89bff,#4224bc)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "2.4rem" }}>U</div>
            </div>
            <div className="vb-card vb-bg-dark">
              <div className="vb-card-bar"><i /><i /><i /></div>
              <div style={{ width: 90, height: 90, borderRadius: 22, background: "linear-gradient(135deg,#a89bff,#4224bc)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "2.4rem" }}>U</div>
            </div>
          </div>
          <div className="vb-checklist">
            <span><Check size={16} className="ok" /> Keep clear space around the mark</span>
            <span><Check size={16} className="ok" /> Use approved background colours</span>
            <span><Check size={16} className="ok" /> Preserve original proportions</span>
            <span><X size={16} className="no" /> Don't recolour the gradient</span>
            <span><X size={16} className="no" /> Don't stretch or skew the avatar</span>
            <span><X size={16} className="no" /> Don't add shadows or outlines</span>
          </div>
        </section>

        {/* COLOURS */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>Colours</h2>
              <p className="lead">A focused palette of warm peach, cool violet and deep indigo — used in gradients across the brand.</p>
            </div>
          </div>
          <div className="vb-colors">
            <div className="vb-swatch" style={{ background: "#ffd4b5" }}><div /><div><b>Peach</b><br />#FFD4B5</div></div>
            <div className="vb-swatch" style={{ background: "#a89bff" }}><div /><div><b>Lilac</b><br />#A89BFF</div></div>
            <div className="vb-swatch" style={{ background: "#7c66f5", color: "#fff" }}><div /><div><b>Violet</b><br />#7C66F5</div></div>
            <div className="vb-swatch" style={{ background: "#4224bc", color: "#fff" }}><div /><div><b>Indigo</b><br />#4224BC</div></div>
            <div className="vb-swatch" style={{ background: "linear-gradient(135deg,#ffd4b5,#a89bff,#4224bc)", color: "#fff", gridColumn: "span 2" }}><div /><div><b>Hero gradient</b><br />Peach → Lilac → Indigo</div></div>
            <div className="vb-swatch" style={{ background: "#f3efe8" }}><div /><div><b>Beige</b><br />#F3EFE8</div></div>
            <div className="vb-swatch" style={{ background: "#1a182b", color: "#fff" }}><div /><div><b>Ink</b><br />#1A182B</div></div>
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>Typography</h2>
              <p className="lead">Ulm Grotesk for display headlines and Gellix for body copy — bold and tight up top, regular and generous below.</p>
            </div>
          </div>
          <div className="vb-type-card">
            <div className="vb-type-meta">
              <div style={{ fontSize: "1.4rem", fontWeight: 700, fontFamily: "UlmGrotesk, Gellix, sans-serif" }}>Ulm Grotesk</div>
              <div style={{ opacity: 0.8, fontSize: "0.85rem", marginTop: "0.4rem" }}>Display & headlines</div>
              <div className="tags">
                <span className="tag">Bold</span>
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 500, fontFamily: "Gellix, sans-serif", marginTop: "1.5rem" }}>Gellix</div>
              <div style={{ opacity: 0.8, fontSize: "0.85rem", marginTop: "0.4rem" }}>Body & UI</div>
              <div className="tags">
                <span className="tag">Regular</span>
                <span className="tag">Medium</span>
              </div>
              <div style={{ marginTop: "1.5rem", fontSize: "0.8rem", opacity: 0.75 }}>Download font →</div>
            </div>
            <div className="big">AaBb<br />AaBbCc</div>
          </div>
        </section>

        {/* TONE OF VOICE */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>Tone of voice</h2>
              <p className="lead">How Viktor sounds in writing — confident, plain-spoken, and helpful.</p>
            </div>
          </div>
          <div className="vb-tone">
            <div className="vb-tone-card vb-tone-do">
              <div className="vb-tone-badge"><Check size={18} /></div>
              <h3>How we write</h3>
              <ul>
                <li>Lead with what Viktor does for the reader, not what it is.</li>
                <li>Short sentences. Plain words. No filler.</li>
                <li>Speak in the second person — you, your team.</li>
                <li>Show outcomes with concrete numbers and examples.</li>
                <li>Stay curious and warm without being overly casual.</li>
              </ul>
            </div>
            <div className="vb-tone-card vb-tone-dont">
              <div className="vb-tone-badge"><X size={18} /></div>
              <h3>How we don't write</h3>
              <ul>
                <li>No buzzwords like synergy, leverage or unlock.</li>
                <li>No long, qualifier-heavy sentences.</li>
                <li>No talking down to the reader.</li>
                <li>No overpromising or vague magic-AI claims.</li>
                <li>No emoji in product copy. Save those for chat.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MOCKUP GENERATOR */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>Mockup Generator</h2>
              <p className="lead">Drop your screenshot into one of the approved frames to create on-brand product mockups in seconds.</p>
            </div>
            <a className="vb-dl-btn" href="#">Open generator</a>
          </div>
          <div className="vb-mockups">
            <div className="vb-mockup"><div className="row w50" /><div className="row w90" /><div className="row w70" /></div>
            <div className="vb-mockup alt1"><div className="row w50" /><div className="row w90" /><div className="row w70" /></div>
            <div className="vb-mockup alt2"><div className="row w50" /><div className="row w90" /><div className="row w70" /></div>
          </div>
        </section>

        {/* DOs & DON'Ts */}
        <section className="vb-section">
          <div className="vb-section-head">
            <div>
              <h2>DOs & DON'Ts</h2>
              <p className="lead">A quick reference for the things to always do — and the things to avoid.</p>
            </div>
          </div>
          <div className="vb-tone">
            <div className="vb-tone-card vb-tone-do">
              <div className="vb-tone-badge"><Check size={18} /></div>
              <h3>DOs</h3>
              <ul>
                <li>Use the approved gradient as the hero surface.</li>
                <li>Give the logo at least its own height as clear space.</li>
                <li>Pair Ulm Grotesk headlines with Gellix body text.</li>
                <li>Keep buttons rounded and dark on light surfaces.</li>
                <li>Photograph product UI on the beige background.</li>
              </ul>
            </div>
            <div className="vb-tone-card vb-tone-dont">
              <div className="vb-tone-badge"><X size={18} /></div>
              <h3>DON'Ts</h3>
              <ul>
                <li>Don't recolour or invert the logo gradient.</li>
                <li>Don't place the logo on busy photography.</li>
                <li>Don't mix Ulm Grotesk and Gellix with other typefaces.</li>
                <li>Don't use the brand violet for error states.</li>
                <li>Don't add drop shadows or 3D effects to type.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="vb-footer">
          <div className="vb-footer-grid">
            <div>
              <div className="vb-nav-brand">viktor</div>
              <p style={{ color: "var(--vb-grey)", fontSize: "0.85rem", maxWidth: "16rem", marginTop: "0.5rem" }}>The AI employee for everyone else.</p>
            </div>
            <div>
              <h4>Product</h4>
              <ul><li><a href="/product">Product</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/integrations">Integrations</a></li></ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul><li><a href="/about">About</a></li><li><a href="/brand">Brand</a></li><li><a href="#">Careers</a></li></ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul><li><a href="/blog">Blog</a></li><li><a href="/case-studies">Case studies</a></li><li><a href="/changelog">Changelog</a></li></ul>
            </div>
            <div>
              <h4>Terms & Docs</h4>
              <ul><li><a href="#">Terms</a></li><li><a href="#">Privacy</a></li><li><a href="#">Imprint</a></li></ul>
            </div>
          </div>
        </footer>
        <div className="vb-wordmark">viktor</div>
      </div>
    </div>
  );
}
