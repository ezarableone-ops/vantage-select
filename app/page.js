'use client'
import { LogoMark } from '../components/Logo'

export default function LandingPage() {
  const features = [
    {
      title: 'Weighted Scoring Matrix',
      desc: 'Define evaluation criteria, assign weights, and score each bidder on a 1-5 scale. Weighted totals calculated automatically.',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
    },
    {
      title: 'Side-by-Side Comparison',
      desc: 'View all bidders in a single matrix. Spot strengths and weaknesses at a glance with color-coded scores.',
      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z',
    },
    {
      title: 'Instant Rankings',
      desc: 'Automatic ranking with visual progress bars. See which bidder leads overall and per category — Technical vs Commercial.',
      icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.667h-.5a6.023 6.023 0 01-2.77-.667',
    },
    {
      title: '100% Private & Offline-Ready',
      desc: 'All data stays in your browser. No server, no account, no risk of data leaks. Your bid data never leaves your machine.',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    },
    {
      title: 'Export & Share',
      desc: 'Export your evaluation as JSON to back up, share with colleagues, or transfer between devices. Excel export coming soon.',
      icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
    },
    {
      title: 'Built for Energy Projects',
      desc: 'Default criteria templates for EPC, Equipment Supply, O&M, Consulting, and Balance of System procurement.',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    },
  ]

  const steps = [
    {
      num: '1',
      title: 'Create Evaluation',
      desc: 'Name your project, select procurement type, and get pre-loaded evaluation criteria with industry-standard weights.',
    },
    {
      num: '2',
      title: 'Add Bidders & Score',
      desc: 'Add 2-5 bidders, then score each one against every criteria on a 1-5 scale. Add comments to justify your ratings.',
    },
    {
      num: '3',
      title: 'Review & Recommend',
      desc: 'See automatic rankings, compare category breakdowns, and write your recommendation — ready for your client.',
    },
  ]

  return (
    <div className="min-h-screen bg-navy-950">

      {/* ── Navbar ── */}
      <nav className="border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark size={36} />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-white tracking-tight">
                Vant<span className="text-lime-400">age</span>
              </span>
              <span className="text-xl font-light text-select-400 tracking-tight">Select</span>
            </div>
          </div>
          <a
            href="/app"
            className="bg-select-500 hover:bg-select-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-select-500/[0.06] to-transparent -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-select-500/10 border border-select-500/30 rounded-full px-4 py-1.5 text-select-400 text-xs font-semibold mb-7 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 bg-select-400 rounded-full animate-pulse" />
          Free &middot; No Account Required &middot; 100% Private
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
          Choose the right bidder.
          <span className="block text-select-400 mt-2">Every time.</span>
        </h1>

        {/* Subhead */}
        <p className="text-navy-300 text-base sm:text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
          Professional bid evaluation tool for renewable energy projects.
          Compare proposals with weighted scoring, side-by-side analysis,
          and clear recommendations — all in your browser.
        </p>

        {/* Value props */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 max-w-3xl mx-auto">
          {[
            { stat: '5 min', label: 'Setup time', sub: 'Pre-loaded criteria' },
            { stat: 'Zero', label: 'Data on servers', sub: 'Browser-only storage' },
            { stat: 'Free', label: 'Forever', sub: 'No hidden costs' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-select-400">{item.stat}</div>
              <div className="text-sm text-navy-200 font-medium mt-1">{item.label}</div>
              <div className="text-xs text-navy-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10">
          <a
            href="/app"
            className="w-full sm:w-auto bg-select-500 hover:bg-select-600 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition shadow-lg shadow-select-500/20"
          >
            Start Evaluating
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto text-navy-200 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-navy-700 hover:border-navy-500 transition text-lg"
          >
            See How It Works
          </a>
        </div>
        <p className="text-navy-500 text-sm mt-4">No sign-up, no credit card, no strings attached</p>
      </section>

      {/* ── Use Cases ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-navy-900/80 to-navy-950/80 border border-navy-700 rounded-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What can you evaluate?</h2>
            <p className="text-navy-400 mt-2">Built-in templates for renewable energy procurement</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { type: 'EPC Contract', icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z', desc: 'Full turnkey projects' },
              { type: 'Equipment Supply', icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', desc: 'Turbines, modules, inverters' },
              { type: 'O&M Contract', icon: 'M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.653-4.655m3.586-3.586a2.123 2.123 0 013 3L12 15.75l-2.58.87.87-2.58 5.34-5.34z', desc: 'Operations & maintenance' },
              { type: 'Consulting', icon: 'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5', desc: 'Advisory & engineering' },
              { type: 'Balance of System', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', desc: 'Civil, electrical, grid' },
            ].map(item => (
              <div key={item.type} className="bg-navy-800/50 border border-navy-700 rounded-xl p-4 text-center hover:border-select-500/40 transition">
                <div className="w-10 h-10 bg-select-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-select-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div className="text-white font-semibold text-sm">{item.type}</div>
                <div className="text-navy-400 text-xs mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Everything you need to evaluate bids</h2>
          <p className="text-navy-400 mt-3 text-lg">Professional tools, zero complexity</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-navy-900/50 border border-navy-700 rounded-2xl p-6 hover:border-select-500/30 transition">
              <div className="w-10 h-10 bg-select-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-select-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Three steps to a clear recommendation</h2>
          <p className="text-navy-400 mt-3 text-lg">From bid opening to award decision</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 bg-select-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg shadow-select-500/20">
                {s.num}
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scoring Preview ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Score with confidence</h2>
            <p className="text-navy-400 mt-2">Industry-standard 5-point assessment scale</p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto">
            {[
              { score: 1, label: 'Poor', color: 'bg-red-500', bg: 'bg-red-500/10 border-red-500/30' },
              { score: 2, label: 'Below Avg', color: 'bg-orange-500', bg: 'bg-orange-500/10 border-orange-500/30' },
              { score: 3, label: 'Average', color: 'bg-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/30' },
              { score: 4, label: 'Good', color: 'bg-lime-500', bg: 'bg-lime-500/10 border-lime-500/30' },
              { score: 5, label: 'Excellent', color: 'bg-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/30' },
            ].map(s => (
              <div key={s.score} className={`${s.bg} border rounded-xl p-3 text-center`}>
                <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm`}>
                  {s.score}
                </div>
                <div className="text-white text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-navy-400 text-sm">Each score is multiplied by criteria weight to calculate the final ranking</p>
          </div>
        </div>
      </section>

      {/* ── Trust / Privacy ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Bid data is sensitive. We get it.</h2>
            <p className="text-navy-400 mt-2 max-w-2xl mx-auto">That&apos;s why Vantage Select runs entirely in your browser</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">No Server</h3>
              <p className="text-navy-400 text-sm">Everything runs client-side. Your data is stored in your browser&apos;s localStorage only.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">No Account</h3>
              <p className="text-navy-400 text-sm">No login, no registration, no email required. Open the app and start working immediately.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">No Tracking</h3>
              <p className="text-navy-400 text-sm">No analytics, no cookies, no data collection. We can&apos;t see your evaluations even if we wanted to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to make better bid decisions?</h2>
        <p className="text-navy-400 text-lg mb-8 max-w-xl mx-auto">
          No setup, no learning curve. Create your first evaluation in under 5 minutes.
        </p>
        <a
          href="/app"
          className="inline-block bg-select-500 hover:bg-select-600 text-white font-semibold px-10 py-4 rounded-xl text-lg transition shadow-lg shadow-select-500/20"
        >
          Start Evaluating — It&apos;s Free
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-navy-800 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark size={28} />
            <span className="text-sm font-semibold text-navy-300">Vantage Select</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://vantage-drab-zeta.vercel.app" className="text-navy-500 hover:text-navy-300 text-sm transition">
              Vantage Inspect
            </a>
            <span className="text-navy-700">|</span>
            <span className="text-navy-500 text-sm">Bid Evaluation Tool for Renewable Energy</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
