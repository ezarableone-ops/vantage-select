'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { LogoFull } from '../../../components/Logo'
import { getProject, updateProject, addBidder, removeBidder, updateBidder, addCriteria, removeCriteria, updateCriteria, setScore, setCommercial, setRecommendation, exportProject } from '../../../lib/store'
import { SCORE_LABELS, CATEGORIES, PROJECT_TYPES, calcBidderScore, calcRankings, calcCategoryScores, validateWeights } from '../../../lib/scoring'

export default function ProjectPage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [tab, setTab] = useState('overview') // overview | criteria | bidders | scoring | summary
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState('')

  // Bidder form
  const [showAddBidder, setShowAddBidder] = useState(false)
  const [bidderName, setBidderName] = useState('')
  const [bidderCompany, setBidderCompany] = useState('')

  // Criteria form
  const [showAddCriteria, setShowAddCriteria] = useState(false)
  const [criteriaName, setCriteriaName] = useState('')
  const [criteriaCategory, setCriteriaCategory] = useState('technical')
  const [criteriaWeight, setCriteriaWeight] = useState(10)
  const [criteriaDesc, setCriteriaDesc] = useState('')

  useEffect(() => {
    const p = getProject(id)
    if (!p) {
      router.push('/app')
      return
    }
    setProject(p)
    setTempName(p.name)
  }, [id])

  function reload() {
    setProject(getProject(id))
  }

  function handleUpdateName() {
    if (tempName.trim()) {
      updateProject(id, { name: tempName.trim() })
      reload()
    }
    setEditingName(false)
  }

  function handleAddBidder() {
    if (!bidderName.trim()) return
    addBidder(id, { name: bidderName.trim(), company: bidderCompany.trim() })
    setBidderName('')
    setBidderCompany('')
    setShowAddBidder(false)
    reload()
  }

  function handleAddCriteria() {
    if (!criteriaName.trim()) return
    addCriteria(id, {
      name: criteriaName.trim(),
      category: criteriaCategory,
      weight: Number(criteriaWeight) || 0,
      description: criteriaDesc.trim(),
    })
    setCriteriaName('')
    setCriteriaWeight(10)
    setCriteriaDesc('')
    setShowAddCriteria(false)
    reload()
  }

  function handleScoreChange(bidderId, criteriaId, score) {
    setScore(id, bidderId, criteriaId, Number(score))
    reload()
  }

  function handleExport() {
    const json = exportProject(id)
    if (!json) return
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_evaluation.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!project) return null

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
    { key: 'criteria', label: 'Criteria', icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75' },
    { key: 'bidders', label: `Bidders (${project.bidders.length})`, icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
    { key: 'scoring', label: 'Scoring', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' },
    { key: 'summary', label: 'Summary', icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.667h-.5a6.023 6.023 0 01-2.77-.667' },
  ]

  const weightCheck = validateWeights(project.criteria)
  const rankings = calcRankings(project.criteria, project.bidders, project.scores)

  return (
    <div className="min-h-screen bg-lime-50/60">
      {/* Header */}
      <header className="bg-white border-b border-navy-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/app')} className="text-navy-400 hover:text-navy-600 cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <div>
              {editingName ? (
                <input
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  onBlur={handleUpdateName}
                  onKeyDown={e => e.key === 'Enter' && handleUpdateName()}
                  className="text-lg font-bold text-navy-900 border-b-2 border-select-500 focus:outline-none bg-transparent"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-lg font-bold text-navy-900 cursor-pointer hover:text-select-600 transition"
                  onClick={() => setEditingName(true)}
                >
                  {project.name}
                </h1>
              )}
              <div className="flex items-center gap-3 text-xs text-navy-400">
                <span>{PROJECT_TYPES[project.projectType]?.label}</span>
                {project.client && <><span>|</span><span>{project.client}</span></>}
                {project.capacity && <><span>|</span><span>{project.capacity}</span></>}
              </div>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="text-sm text-navy-500 hover:text-navy-700 px-3 py-2 rounded-lg hover:bg-navy-100 transition cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 -mb-px">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
                  tab === t.key
                    ? 'border-select-500 text-select-600'
                    : 'border-transparent text-navy-400 hover:text-navy-600 hover:border-navy-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                </svg>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-6">

        {/* ── Overview Tab ── */}
        {tab === 'overview' && (
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Quick stats */}
            <div className="bg-white border border-navy-200 rounded-xl p-5">
              <div className="text-sm text-navy-500 mb-1">Bidders</div>
              <div className="text-3xl font-bold text-navy-900">{project.bidders.length}</div>
              <button onClick={() => setTab('bidders')} className="text-xs text-select-500 hover:text-select-600 mt-2 cursor-pointer">Manage bidders</button>
            </div>
            <div className="bg-white border border-navy-200 rounded-xl p-5">
              <div className="text-sm text-navy-500 mb-1">Criteria</div>
              <div className="text-3xl font-bold text-navy-900">{project.criteria.length}</div>
              <div className={`text-xs mt-2 ${weightCheck.valid ? 'text-lime-600' : 'text-amber-600'}`}>
                Weight total: {weightCheck.total}% {weightCheck.valid ? '(valid)' : '(should be 100%)'}
              </div>
            </div>
            <div className="bg-white border border-navy-200 rounded-xl p-5">
              <div className="text-sm text-navy-500 mb-1">Leading Bidder</div>
              {rankings.length > 0 && rankings[0].percent > 0 ? (
                <>
                  <div className="text-xl font-bold text-navy-900 truncate">{rankings[0].bidder.name}</div>
                  <div className="text-sm text-lime-600 font-medium mt-1">{rankings[0].percent}% score</div>
                </>
              ) : (
                <div className="text-sm text-navy-400 mt-2">No scores yet</div>
              )}
            </div>

            {/* Rankings preview */}
            {rankings.length > 0 && rankings.some(r => r.percent > 0) && (
              <div className="sm:col-span-3 bg-white border border-navy-200 rounded-xl p-5">
                <h3 className="font-semibold text-navy-900 mb-4">Current Rankings</h3>
                <div className="space-y-3">
                  {rankings.map(r => (
                    <div key={r.bidder.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        r.rank === 1 ? 'bg-lime-100 text-lime-700' :
                        r.rank === 2 ? 'bg-blue-100 text-blue-700' :
                        'bg-navy-100 text-navy-600'
                      }`}>
                        #{r.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-navy-900 truncate">{r.bidder.name}</span>
                          <span className="text-sm font-semibold text-navy-700">{r.percent}%</span>
                        </div>
                        <div className="w-full bg-navy-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              r.rank === 1 ? 'bg-lime-500' : r.rank === 2 ? 'bg-blue-500' : 'bg-navy-400'
                            }`}
                            style={{ width: `${r.percent}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-navy-400 w-16 text-right">{r.completion}% done</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Criteria Tab ── */}
        {tab === 'criteria' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Evaluation Criteria</h2>
                <p className={`text-sm ${weightCheck.valid ? 'text-lime-600' : 'text-amber-600'}`}>
                  Total weight: {weightCheck.total}% {!weightCheck.valid && '— must equal 100%'}
                </p>
              </div>
              <button
                onClick={() => setShowAddCriteria(true)}
                className="bg-select-500 hover:bg-select-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
              >
                + Add Criteria
              </button>
            </div>

            {/* Criteria by category */}
            {Object.entries(CATEGORIES).map(([catKey, catInfo]) => {
              const items = project.criteria.filter(c => c.category === catKey)
              if (items.length === 0) return null
              const catWeight = items.reduce((s, c) => s + c.weight, 0)
              return (
                <div key={catKey} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catInfo.color}`}>{catInfo.label}</span>
                    <span className="text-xs text-navy-400">{catWeight}% total</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(c => (
                      <div key={c.id} className="bg-white border border-navy-200 rounded-lg p-4 flex items-center justify-between group">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-navy-900 text-sm">{c.name}</span>
                            <span className="text-xs bg-navy-100 text-navy-600 px-2 py-0.5 rounded-full">{c.weight}%</span>
                          </div>
                          {c.description && <div className="text-xs text-navy-400 mt-1">{c.description}</div>}
                        </div>
                        <button
                          onClick={() => { removeCriteria(id, c.id); reload() }}
                          className="text-navy-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer p-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Add criteria modal */}
            {showAddCriteria && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddCriteria(false)}>
                <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-navy-900 mb-4">Add Criteria</h3>
                  <div className="space-y-3">
                    <input
                      type="text" placeholder="Criteria name"
                      value={criteriaName} onChange={e => setCriteriaName(e.target.value)}
                      className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500" autoFocus
                    />
                    <div className="flex gap-2">
                      {Object.entries(CATEGORIES).map(([key, val]) => (
                        <button key={key} onClick={() => setCriteriaCategory(key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                            criteriaCategory === key ? val.color + ' ring-2 ring-offset-1 ring-select-500' : 'bg-navy-100 text-navy-500'
                          }`}>{val.label}</button>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs text-navy-500 mb-1 block">Weight (%)</label>
                      <input type="number" min="0" max="100" value={criteriaWeight} onChange={e => setCriteriaWeight(e.target.value)}
                        className="w-24 border border-navy-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-select-500"
                      />
                    </div>
                    <textarea placeholder="Description (optional)" value={criteriaDesc} onChange={e => setCriteriaDesc(e.target.value)}
                      className="w-full border border-navy-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-select-500" rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowAddCriteria(false)} className="px-4 py-2 text-sm text-navy-600 rounded-lg cursor-pointer">Cancel</button>
                    <button onClick={handleAddCriteria} disabled={!criteriaName.trim()}
                      className="bg-select-500 hover:bg-select-600 disabled:bg-navy-200 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer">Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Bidders Tab ── */}
        {tab === 'bidders' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-900">Bidders</h2>
              <button onClick={() => setShowAddBidder(true)}
                className="bg-select-500 hover:bg-select-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
                + Add Bidder
              </button>
            </div>

            {project.bidders.length === 0 ? (
              <div className="text-center py-12 text-navy-400">
                <p>No bidders added yet. Add bidders to start evaluating proposals.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {project.bidders.map((b, i) => (
                  <div key={b.id} className="bg-white border border-navy-200 rounded-xl p-5 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-select-100 text-select-600 rounded-xl flex items-center justify-center font-bold text-sm">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900">{b.name}</div>
                        {b.company && <div className="text-sm text-navy-500">{b.company}</div>}
                      </div>
                    </div>
                    <button
                      onClick={() => { removeBidder(id, b.id); reload() }}
                      className="text-navy-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer p-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add bidder modal */}
            {showAddBidder && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddBidder(false)}>
                <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-navy-900 mb-4">Add Bidder</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Bidder name (e.g. Bidder A or company name)"
                      value={bidderName} onChange={e => setBidderName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddBidder()}
                      className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500" autoFocus
                    />
                    <input type="text" placeholder="Company (optional)"
                      value={bidderCompany} onChange={e => setBidderCompany(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddBidder()}
                      className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowAddBidder(false)} className="px-4 py-2 text-sm text-navy-600 rounded-lg cursor-pointer">Cancel</button>
                    <button onClick={handleAddBidder} disabled={!bidderName.trim()}
                      className="bg-select-500 hover:bg-select-600 disabled:bg-navy-200 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer">Add Bidder</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Scoring Tab ── */}
        {tab === 'scoring' && (
          <div>
            <h2 className="text-lg font-bold text-navy-900 mb-4">Score Matrix</h2>

            {project.bidders.length === 0 || project.criteria.length === 0 ? (
              <div className="text-center py-12 bg-white border border-navy-200 rounded-xl">
                <p className="text-navy-400">Add at least one bidder and one criteria to start scoring.</p>
              </div>
            ) : (
              <div className="bg-white border border-navy-200 rounded-xl overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-200">
                      <th className="text-left p-3 font-semibold text-navy-700 min-w-[200px] sticky left-0 bg-white">Criteria</th>
                      <th className="p-3 text-center text-navy-400 text-xs w-16">Weight</th>
                      {project.bidders.map(b => (
                        <th key={b.id} className="p-3 text-center font-semibold text-navy-700 min-w-[100px]">{b.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {project.criteria.map(c => (
                      <tr key={c.id} className="border-b border-navy-100 hover:bg-navy-50/50">
                        <td className="p-3 sticky left-0 bg-white">
                          <div className="font-medium text-navy-800">{c.name}</div>
                          <div className="text-xs text-navy-400">{CATEGORIES[c.category]?.label}</div>
                        </td>
                        <td className="p-3 text-center text-navy-500 text-xs">{c.weight}%</td>
                        {project.bidders.map(b => {
                          const score = project.scores?.[b.id]?.[c.id]?.score || 0
                          return (
                            <td key={b.id} className="p-2 text-center">
                              <select
                                value={score}
                                onChange={e => handleScoreChange(b.id, c.id, e.target.value)}
                                className={`w-full text-center py-1.5 px-1 rounded-lg border text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-select-500/20 ${
                                  score === 0 ? 'border-navy-200 text-navy-300 bg-white' :
                                  `border-transparent ${SCORE_LABELS[score]?.color || ''}`
                                }`}
                              >
                                <option value={0}>-</option>
                                {[1,2,3,4,5].map(s => (
                                  <option key={s} value={s}>{s} — {SCORE_LABELS[s].label}</option>
                                ))}
                              </select>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                    {/* Weighted totals */}
                    <tr className="bg-navy-50 font-semibold">
                      <td className="p-3 sticky left-0 bg-navy-50 text-navy-900">Weighted Score</td>
                      <td className="p-3 text-center text-navy-500 text-xs">{weightCheck.total}%</td>
                      {project.bidders.map(b => {
                        const calc = calcBidderScore(project.criteria, project.scores?.[b.id] || {})
                        return (
                          <td key={b.id} className="p-3 text-center">
                            <div className="text-lg text-navy-900">{calc.percent}%</div>
                            <div className="text-xs text-navy-400">{calc.completion}% scored</div>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Summary Tab ── */}
        {tab === 'summary' && (
          <div>
            <h2 className="text-lg font-bold text-navy-900 mb-4">Evaluation Summary</h2>

            {/* Rankings */}
            {rankings.length > 0 && rankings.some(r => r.percent > 0) && (
              <div className="bg-white border border-navy-200 rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-navy-900 mb-4">Final Rankings</h3>
                <div className="space-y-4">
                  {rankings.map(r => {
                    const catScores = calcCategoryScores(project.criteria, project.scores?.[r.bidder.id] || {})
                    return (
                      <div key={r.bidder.id} className={`p-4 rounded-xl border-2 ${
                        r.rank === 1 ? 'border-lime-300 bg-lime-50/50' : 'border-navy-100'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                              r.rank === 1 ? 'bg-lime-500 text-white' :
                              r.rank === 2 ? 'bg-blue-500 text-white' :
                              'bg-navy-200 text-navy-600'
                            }`}>#{r.rank}</div>
                            <div>
                              <div className="font-bold text-navy-900">{r.bidder.name}</div>
                              {r.bidder.company && <div className="text-xs text-navy-500">{r.bidder.company}</div>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-navy-900">{r.percent}%</div>
                            <div className="text-xs text-navy-400">{r.completion}% criteria scored</div>
                          </div>
                        </div>
                        {/* Category breakdown */}
                        <div className="flex gap-4">
                          {Object.entries(catScores).map(([catKey, catVal]) => (
                            <div key={catKey} className="flex items-center gap-2 text-xs">
                              <span className={`px-1.5 py-0.5 rounded font-medium ${CATEGORIES[catKey]?.color}`}>{CATEGORIES[catKey]?.label}</span>
                              <span className="text-navy-600 font-medium">{catVal.percent}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className="bg-white border border-navy-200 rounded-xl p-5">
              <h3 className="font-semibold text-navy-900 mb-3">Recommendation</h3>
              <textarea
                value={project.recommendation || ''}
                onChange={e => { setRecommendation(id, e.target.value); reload() }}
                placeholder="Write your recommendation here... e.g. Based on the evaluation results, Bidder A is recommended for award due to..."
                className="w-full border border-navy-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-select-500 focus:ring-2 focus:ring-select-500/20 min-h-[120px]"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
