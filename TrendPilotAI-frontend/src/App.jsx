import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Bell,
  Bookmark, Check, ChevronDown, CircleHelp, Command, Download, ExternalLink,
  Eye, Filter, Globe2, LayoutDashboard, Lightbulb, Menu, Moon, Package,
  Search, Settings2, ShieldCheck, ShoppingBag, Sparkles, Sun, Target,
  TrendingUp, X, Zap, SlidersHorizontal, Tags, ChartNoAxesCombined
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar
} from "recharts";

const products = [
  { id: 1, name: "Ergonomic Laptop Stand", category: "Workspace", price: 39.99, cost: 12.5, demand: 88, competition: 34, trend: "+28.4%", searches: "18.2K", growth: 28.4, keyword: "ergonomic laptop stand", intent: "Commercial", saturation: "Low", source: "Sample dataset", color: "violet", description: "A foldable, adjustable stand positioned for home-office and hybrid workers.", keywords: ["adjustable laptop stand", "laptop stand for desk", "portable laptop riser"] },
  { id: 2, name: "Reusable Water Bottle", category: "Lifestyle", price: 24.00, cost: 8.25, demand: 82, competition: 69, trend: "+12.1%", searches: "41.5K", growth: 12.1, keyword: "reusable water bottle", intent: "Transactional", saturation: "High", source: "Sample dataset", color: "blue", description: "A reusable everyday bottle with room for brand differentiation through materials and design.", keywords: ["insulated reusable bottle", "leakproof water bottle", "water bottle for travel"] },
  { id: 3, name: "LED Desk Light Bar", category: "Workspace", price: 54.00, cost: 19.00, demand: 76, competition: 41, trend: "+19.7%", searches: "9.8K", growth: 19.7, keyword: "LED monitor light bar", intent: "Commercial", saturation: "Medium", source: "Sample dataset", color: "amber", description: "A monitor-mounted lighting product for desk setups, creators and remote workers.", keywords: ["monitor light bar", "screenbar for home office", "glare free desk lighting"] },
  { id: 4, name: "Pet Slow Feeder Bowl", category: "Pets", price: 22.50, cost: 6.80, demand: 79, competition: 29, trend: "+31.6%", searches: "12.4K", growth: 31.6, keyword: "slow feeder dog bowl", intent: "Transactional", saturation: "Low", source: "Sample dataset", color: "rose", description: "A practical pet-care product that targets owners looking for enrichment and slower feeding.", keywords: ["slow feeder dog bowl", "anti gulp dog bowl", "enrichment bowl for dogs"] },
  { id: 5, name: "Travel Packing Cubes", category: "Travel", price: 29.00, cost: 9.50, demand: 84, competition: 57, trend: "+16.3%", searches: "27.1K", growth: 16.3, keyword: "packing cubes for travel", intent: "Transactional", saturation: "Medium", source: "Sample dataset", color: "cyan", description: "A travel organization set with opportunity to differentiate through sizing and durable fabric.", keywords: ["compression packing cubes", "packing cubes carry on", "travel organizer set"] },
  { id: 6, name: "Magnetic Cable Organizer", category: "Workspace", price: 16.99, cost: 4.20, demand: 72, competition: 38, trend: "+22.8%", searches: "7.6K", growth: 22.8, keyword: "magnetic cable organizer", intent: "Commercial", saturation: "Low", source: "Sample dataset", color: "green", description: "A small desk accessory with low shipping complexity and clear visual content potential.", keywords: ["desk cable management", "magnetic cable clips", "cable organizer for desk"] },
  { id: 7, name: "Compact Travel Steam Iron", category: "Travel", price: 46.00, cost: 22.00, demand: 67, competition: 63, trend: "+8.4%", searches: "6.3K", growth: 8.4, keyword: "portable travel steamer", intent: "Commercial", saturation: "High", source: "Sample dataset", color: "orange", description: "A compact garment-care product for travelers; quality and reliability are key purchase concerns.", keywords: ["mini travel steamer", "portable clothes steamer", "wrinkle remover for travel"] },
  { id: 8, name: "Interactive Cat Toy", category: "Pets", price: 31.50, cost: 10.00, demand: 91, competition: 46, trend: "+35.2%", searches: "15.7K", growth: 35.2, keyword: "interactive cat toy", intent: "Transactional", saturation: "Medium", source: "Sample dataset", color: "pink", description: "An enrichment toy with strong potential for demonstration videos and problem-solving content.", keywords: ["interactive toys for indoor cats", "automatic cat toy", "cat enrichment toy"] }
];

const trendData = [
  { month: "May", demand: 32, traffic: 24 }, { month: "Jun", demand: 38, traffic: 29 },
  { month: "Jul", demand: 35, traffic: 31 }, { month: "Aug", demand: 49, traffic: 39 },
  { month: "Sep", demand: 57, traffic: 45 }, { month: "Oct", demand: 66, traffic: 54 },
  { month: "Nov", demand: 73, traffic: 62 }, { month: "Dec", demand: 82, traffic: 71 }
];

const categories = ["All categories", "Workspace", "Lifestyle", "Pets", "Travel"];
const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Product Discovery", icon: Package },
  { label: "SEO Intelligence", icon: Search },
  { label: "Competitor Analysis", icon: Target },
  { label: "Saved Opportunities", icon: Bookmark }
];

function scoreProduct(product) {
  const margin = Math.max(0, ((product.price - product.cost) / product.price) * 100);
  // Transparent demo formula: 40% demand, 30% low competition, 30% gross margin.
  return Math.round(product.demand * 0.4 + (100 - product.competition) * 0.3 + margin * 0.3);
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function ScorePill({ score }) {
  const level = score >= 75 ? "high" : score >= 60 ? "medium" : "low";
  return <span className={`score-pill ${level}`}><span className="score-dot" />{score} <span className="score-label">/100</span></span>;
}

function MetricCard({ icon: Icon, label, value, change, note, tone = "violet" }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${tone}`}><Icon size={18} /></span>
        <span className={`metric-change ${change.startsWith("-") ? "negative" : ""}`}>
          {change.startsWith("-") ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{change}
        </span>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value">{value}</div>
      <p className="metric-note">{note}</p>
    </article>
  );
}

function ProductMark({ product }) {
  const icons = { violet: "⌘", blue: "◉", amber: "☼", rose: "♡", cyan: "◇", green: "⌁", orange: "✦", pink: "✿" };
  return <div className={`product-mark ${product.color}`}>{icons[product.color] || "◇"}</div>;
}

function App() {
  const [dark, setDark] = useState(true);
  const [activePage, setActivePage] = useState("Overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("score");
  const [saved, setSaved] = useState([4, 8]);
  const [selected, setSelected] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");

  const rankedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesQuery = `${p.name} ${p.category} ${p.keyword}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All categories" || p.category === category;
      const matchesSaved = activePage !== "Saved Opportunities" || saved.includes(p.id);
      return matchesQuery && matchesCategory && matchesSaved;
    });
    if (activePage === "SEO Intelligence") result = result.filter((p) => p.growth >= 15);
    if (activePage === "Competitor Analysis") result = result.filter((p) => p.competition >= 40);
    if (sort === "score") result.sort((a, b) => scoreProduct(b) - scoreProduct(a));
    if (sort === "demand") result.sort((a, b) => b.demand - a.demand);
    if (sort === "growth") result.sort((a, b) => b.growth - a.growth);
    if (sort === "margin") result.sort((a, b) => ((b.price-b.cost)/b.price) - ((a.price-a.cost)/a.price));
    return result;
  }, [query, category, sort, activePage, saved]);

  const savedToggle = (id) => setSaved((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);
  const exportCsv = () => {
    const rows = [["Product", "Category", "Price USD", "Demand", "Competition", "Growth", "Opportunity Score", "Primary Keyword"]];
    rankedProducts.forEach((p) => rows.push([p.name, p.category, p.price, p.demand, p.competition, p.trend, scoreProduct(p), p.keyword]));
    const csv = rows.map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "trendpilot-opportunities-demo.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("CSV export prepared");
    setTimeout(() => setNotice(""), 2800);
  };

  const pageTitle = activePage === "Overview" ? "Growth overview" : activePage;
  const pageDescription = activePage === "Overview"
    ? "Your snapshot of product opportunities and organic growth signals."
    : activePage === "Product Discovery"
    ? "Find promising products using a transparent opportunity score."
    : activePage === "SEO Intelligence"
    ? "Explore keyword themes and products with positive search-growth signals."
    : activePage === "Competitor Analysis"
    ? "Review competitive pressure and spot potential positioning gaps."
    : "Your bookmarked product opportunities, all in one place.";

  return (
    <div className={`app-shell ${dark ? "theme-dark" : "theme-light"}`}>
      {mobileNav && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileNav(false)} />}
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-symbol"><ChartNoAxesCombined size={21} strokeWidth={2.5} /></div>
          <div><div className="brand-name">trendpilot<span>ai</span></div><div className="brand-caption">GROWTH INTELLIGENCE</div></div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">S</div>
          <div className="workspace-text"><strong>Shakir's workspace</strong><span>Starter workspace</span></div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activePage === label ? "active" : ""}`} onClick={() => { setActivePage(label); setMobileNav(false); }}>
              <Icon size={17} /><span>{label}</span>
              {label === "Saved Opportunities" && <span className="nav-count">{saved.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-promo">
          <div className="promo-icon"><Sparkles size={17} /></div>
          <div className="promo-title">Smarter growth starts here</div>
          <p>Turn product signals into your next growth move.</p>
          <button onClick={() => { setActivePage("Product Discovery"); setMobileNav(false); }}>Explore opportunities <ArrowRight size={14} /></button>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setNotice("Settings will be available in a future version.")}><Settings2 size={17} /><span>Settings</span></button>
          <button className="nav-item" onClick={() => setNotice("Help center is coming soon.")}><CircleHelp size={17} /><span>Help & support</span></button>
          <div className="profile-row">
            <div className="profile-avatar">MS</div>
            <div className="profile-info"><strong>M. Shakir</strong><span>Free plan · Demo</span></div>
            <button className="icon-button" aria-label="Profile menu" onClick={() => setNotice("Profile settings will be available in a future version.")}><ChevronDown size={16} /></button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={20} /></button>
            <div className="breadcrumb">Workspace <span>/</span> <strong>{activePage}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="demo-status"><span /> Demo data</div>
            <button className="icon-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up — no new notifications.")}><Bell size={18} /></button>
            <button className="icon-button theme-toggle" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="topbar-avatar">MS</div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> YOUR ORGANIC GROWTH COMMAND CENTER</div>
              <h1>{pageTitle}<span className="heading-period">.</span></h1>
              <p>{pageDescription}</p>
            </div>
            <div className="heading-actions">
              <button className="button button-secondary" onClick={exportCsv}><Download size={16} /> Export CSV</button>
              <button className="button button-primary" onClick={() => { setActivePage("Product Discovery"); setQuery(""); setCategory("All categories"); }}><Sparkles size={16} /> Discover products</button>
            </div>
          </section>

          {notice && <div className="notice" role="status"><Check size={16} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={15} /></button></div>}

          {activePage === "Overview" && (
            <>
              <section className="metrics-grid">
                <MetricCard icon={Package} label="Products analyzed" value="248" change="+18.6%" note="vs. previous 30 days" tone="violet" />
                <MetricCard icon={TrendingUp} label="Rising opportunities" value="36" change="+12.3%" note="high-potential signals" tone="green" />
                <MetricCard icon={Search} label="Keyword opportunities" value="1,284" change="+8.2%" note="across tracked niches" tone="blue" />
                <MetricCard icon={Target} label="Avg. opportunity score" value="74.8" change="+5.7%" note="out of 100 points" tone="amber" />
              </section>

              <section className="overview-grid">
                <article className="panel chart-panel">
                  <div className="panel-heading">
                    <div><h2>Demand signals over time</h2><p>Illustrative trend index · last 8 months</p></div>
                    <button className="select-like" onClick={() => setNotice("The demo chart displays the last 8 sample months.")}>Last 8 months <ChevronDown size={14} /></button>
                  </div>
                  <div className="chart-legend"><span><i className="legend-dot violet-dot" /> Product demand</span><span><i className="legend-dot green-dot" /> Organic interest</span></div>
                  <div className="line-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                        <defs>
                          <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b7cff" stopOpacity={0.24} /><stop offset="100%" stopColor="#8b7cff" stopOpacity={0} /></linearGradient>
                          <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#43d6a3" stopOpacity={0.15} /><stop offset="100%" stopColor="#43d6a3" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} dy={10} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
                        <Tooltip contentStyle={{ background: "var(--tooltip-bg)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)" }} />
                        <Area type="monotone" dataKey="demand" name="Product demand" stroke="#8b7cff" strokeWidth={2.5} fill="url(#demandGradient)" />
                        <Area type="monotone" dataKey="traffic" name="Organic interest" stroke="#43d6a3" strokeWidth={2.5} fill="url(#trafficGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="chart-footnote"><Activity size={14} /> Sample trend index for interface preview — not live search volume.</div>
                </article>

                <article className="panel insight-panel">
                  <div className="panel-heading"><div><h2>Growth signals</h2><p>Things worth a closer look</p></div><span className="sparkle-badge"><Sparkles size={15} /></span></div>
                  <div className="insight-item">
                    <div className="insight-icon green"><TrendingUp size={17} /></div>
                    <div className="insight-copy"><strong>Pet enrichment is picking up</strong><p>Interactive pet products show positive sample growth signals.</p><button onClick={() => { setActivePage("Product Discovery"); setCategory("Pets"); }}>Explore pet products <ArrowRight size={13} /></button></div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon violet"><Search size={17} /></div>
                    <div className="insight-copy"><strong>Workspace keywords to review</strong><p>Several desk-setup terms combine commercial intent with moderate competition.</p><button onClick={() => { setActivePage("SEO Intelligence"); setCategory("Workspace"); }}>View SEO ideas <ArrowRight size={13} /></button></div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon amber"><Lightbulb size={17} /></div>
                    <div className="insight-copy"><strong>Look for specific long-tail terms</strong><p>Narrower phrases can be easier to target than broad category keywords.</p><button onClick={() => setNotice("Tip: validate search volume and SERP difficulty with a real SEO data provider.")}>Read recommendation <ArrowRight size={13} /></button></div>
                  </div>
                </article>
              </section>
            </>
          )}

          <section className="panel opportunities-panel">
            <div className="panel-heading table-heading">
              <div><div className="title-with-icon"><h2>{activePage === "Overview" ? "Top product opportunities" : activePage === "Saved Opportunities" ? "Saved opportunities" : activePage}</h2><span className="count-badge">{rankedProducts.length}</span></div><p>{activePage === "Overview" ? "Products ranked by demand, competition and estimated margin." : "Filter and compare your sample product opportunity set."}</p></div>
              <button className="button button-secondary button-small" onClick={() => setActivePage("Product Discovery")}>View all products <ArrowRight size={14} /></button>
            </div>
            <div className="table-toolbar">
              <div className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or keywords..." aria-label="Search products or keywords" /><kbd>⌘ K</kbd></div>
              <div className="toolbar-right">
                <label className="select-wrap"><span className="sr-only">Filter category</span><Tags size={15} /><select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select><ChevronDown size={14} /></label>
                <label className="select-wrap sort-wrap"><SlidersHorizontal size={15} /><span className="sr-only">Sort products</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="score">Opportunity score</option><option value="demand">Demand</option><option value="growth">Growth rate</option><option value="margin">Gross margin</option></select><ChevronDown size={14} /></label>
                <button className={`icon-button filter-button ${showFilters ? "selected" : ""}`} aria-label="Toggle filters" onClick={() => setShowFilters(!showFilters)}><Filter size={16} /></button>
              </div>
            </div>
            {showFilters && <div className="filter-hint"><ShieldCheck size={15} /> Scores are calculated from sample demand, competition and gross-margin inputs. <button onClick={() => { setCategory("All categories"); setQuery(""); setSort("score"); }}>Reset filters</button></div>}
            <div className="table-scroll">
              <table>
                <thead><tr><th>PRODUCT</th><th>OPPORTUNITY SCORE</th><th>DEMAND</th><th>COMPETITION</th><th>GROWTH SIGNAL</th><th>PRICE</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {rankedProducts.slice(0, activePage === "Overview" ? 5 : 20).map((p) => (
                    <tr key={p.id}>
                      <td><div className="product-cell"><ProductMark product={p} /><div className="product-name-wrap"><button className="product-name" onClick={() => setSelected(p)}>{p.name}</button><span>{p.category} <span className="table-separator">·</span> {p.keyword}</span></div></div></td>
                      <td><ScorePill score={scoreProduct(p)} /></td>
                      <td><div className="mini-metric"><div className="mini-track"><span style={{ width: `${p.demand}%` }} /></div><span>{p.demand}</span></div></td>
                      <td><div className="mini-metric competition"><div className="mini-track"><span style={{ width: `${p.competition}%` }} /></div><span>{p.competition}</span></div></td>
                      <td><span className="growth-value"><ArrowUpRight size={14} /> {p.trend}</span></td>
                      <td className="price-cell">{money(p.price)}</td>
                      <td><div className="row-actions"><button className={`icon-button save-button ${saved.includes(p.id) ? "saved" : ""}`} aria-label={saved.includes(p.id) ? "Remove saved product" : "Save product"} title={saved.includes(p.id) ? "Remove from saved" : "Save opportunity"} onClick={() => savedToggle(p.id)}><Bookmark size={16} fill={saved.includes(p.id) ? "currentColor" : "none"} /></button><button className="icon-button" aria-label={`View ${p.name}`} title="View details" onClick={() => setSelected(p)}><ArrowRight size={16} /></button></div></td>
                    </tr>
                  ))}
                  {rankedProducts.length === 0 && <tr><td colSpan="7"><div className="empty-state"><Package size={24} /><strong>No products match your filters</strong><span>Try a different search or reset your filters.</span><button className="button button-secondary button-small" onClick={() => { setQuery(""); setCategory("All categories"); }}>Reset filters</button></div></td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing <strong>{Math.min(rankedProducts.length, activePage === "Overview" ? 5 : 20)}</strong> of <strong>{rankedProducts.length}</strong> sample opportunities</span><span className="footer-data-note"><span className="status-dot" /> Demo dataset · Updated just now</span></div>
          </section>

          <section className="bottom-grid">
            <article className="panel margin-panel">
              <div className="panel-heading"><div><h2>Margin snapshot</h2><p>Estimated gross margin per product</p></div><span className="subtle-icon"><BarChart3 size={17} /></span></div>
              <div className="margin-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...products].sort((a,b) => ((b.price-b.cost)/b.price)-((a.price-a.cost)/a.price)).slice(0,5).map(p => ({ name: p.name.split(" ").slice(0,2).join(" "), margin: Math.round((p.price-p.cost)/p.price*100) }))} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 10 }} interval={0} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: "var(--tooltip-bg)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)" }} formatter={(value) => [`${value}%`, "Gross margin"]} />
                    <Bar dataKey="margin" fill="#8b7cff" radius={[5,5,0,0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="chart-footnote">Illustrative margins before shipping, fees, returns and taxes.</p>
            </article>
            <article className="panel methodology-panel">
              <div className="panel-heading"><div><h2>How scoring works</h2><p>Transparent by design</p></div><span className="subtle-icon"><ShieldCheck size={17} /></span></div>
              <div className="method-row"><div className="method-label"><span className="method-dot demand-dot" /> Demand signal <strong>40%</strong></div><div className="method-track"><span style={{ width: "40%" }} /></div></div>
              <div className="method-row"><div className="method-label"><span className="method-dot competition-dot" /> Low competition <strong>30%</strong></div><div className="method-track"><span style={{ width: "30%" }} /></div></div>
              <div className="method-row"><div className="method-label"><span className="method-dot margin-dot" /> Gross margin <strong>30%</strong></div><div className="method-track"><span style={{ width: "30%" }} /></div></div>
              <div className="method-callout"><Lightbulb size={16} /><span>Use the score to prioritize research, not as a guarantee of sales or ranking.</span></div>
            </article>
          </section>

          <footer className="app-footer"><div className="footer-brand"><div className="brand-symbol mini"><ChartNoAxesCombined size={14} /></div><span>TrendPilot AI</span><span className="footer-copyright">© 2026</span></div><span className="footer-disclaimer">Demo interface · Sample data only · Not financial or SEO guarantees</span><button onClick={() => setNotice("Thanks for exploring TrendPilot AI.")}>Send feedback <ExternalLink size={12} /></button></footer>
        </div>
      </main>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <div className="modal-header"><div className="modal-title-lockup"><ProductMark product={selected} /><div><span className="modal-kicker">PRODUCT OPPORTUNITY</span><h2 id="detail-title">{selected.name}</h2></div></div><button className="icon-button" aria-label="Close details" onClick={() => setSelected(null)}><X size={19} /></button></div>
            <p className="modal-description">{selected.description}</p>
            <div className="detail-score-card"><div><span className="modal-kicker">OPPORTUNITY SCORE</span><div className="detail-score">{scoreProduct(selected)}<span>/100</span></div><p>Based on the demo scoring formula</p></div><ScorePill score={scoreProduct(selected)} /></div>
            <div className="detail-stats"><div><span>Sample demand</span><strong>{selected.demand}/100</strong></div><div><span>Competition</span><strong>{selected.competition}/100</strong></div><div><span>Estimated gross margin</span><strong>{Math.round((selected.price-selected.cost)/selected.price*100)}%</strong></div><div><span>Sample price</span><strong>{money(selected.price)}</strong></div></div>
            <div className="modal-section"><h3><Search size={16} /> Keyword ideas</h3><p className="primary-keyword">Primary: {selected.keyword}</p><div className="keyword-list">{selected.keywords.map((k) => <span key={k}>{k}</span>)}</div><p className="keyword-meta">Intent: <strong>{selected.intent}</strong><span>·</span> Competition label: <strong>{selected.saturation}</strong></p></div>
            <div className="modal-section recommendation"><h3><Sparkles size={16} /> Suggested next steps</h3><ul><li>Validate search demand and trend history with a real SEO data provider.</li><li>Review the top search results to assess content quality and competitor strength.</li><li>Create a helpful comparison or buying guide targeting a specific long-tail keyword.</li></ul></div>
            <div className="modal-actions"><button className="button button-secondary" onClick={() => { savedToggle(selected.id); }}>{saved.includes(selected.id) ? <Check size={16} /> : <Bookmark size={16} />}{saved.includes(selected.id) ? "Saved opportunity" : "Save opportunity"}</button><button className="button button-primary" onClick={() => { setActivePage("SEO Intelligence"); setQuery(selected.keyword); setSelected(null); }}>Explore SEO ideas <ArrowRight size={15} /></button></div>
            <p className="modal-disclaimer">All product, search-volume and trend figures shown here are illustrative mock data, not live market measurements.</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
