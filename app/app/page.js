'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogoFull } from '../../components/Logo'
import { getProjects, createProject, deleteProject, importProject } from '../../lib/store'
import { PROJECT_TYPES } from '../../lib/scoring'

export default function HomePage() {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newClient, setNewClient] = useState('')
  const [newType, setNewType] = useState('epc')
  const [newCapacity, setNewCapacity] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  function handleCreate() {
    if (!newName.trim()) return
    const project = createProject({
      name: newName.trim(),
      client: newClient.trim(),
      projectType: newType,
      capacity: newCapacity.trim(),
      location: newLocation.trim(),
    })
    setShowNew(false)
    setNewName('')
    setNewClient('')
    setNewType('epc')
    setNewCapacity('')
    setNewLocation('')
    router.push(`/project/${project.id}`)
  }

  function handleDelete(id) {
    deleteProject(id)
    setProjects(getProjects())
    setDeleteConfirm(null)
  }

  function handleImport() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return
      try {
        const text = await file.text()
        const project = importProject(text)
        setProjects(getProjects())
        router.push(`/project/${project.id}`)
      } catch (err) {
        alert('Cannot import: ' + err.message)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-white border-b border-navy-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <LogoFull />
          <div className="flex items-center gap-2">
            <button
              onClick={handleImport}
              className="text-sm text-navy-500 hover:text-navy-700 px-3 py-2 rounded-lg hover:bg-navy-100 transition cursor-pointer"
            >
              Import JSON
            </button>
            <button
              onClick={() => setShowNew(true)}
              className="bg-select-500 hover:bg-select-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Evaluation
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Empty state */}
        {projects.length === 0 && !showNew && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-select-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-select-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">No evaluations yet</h2>
            <p className="text-navy-500 mb-6 max-w-md mx-auto">
              Create your first bid evaluation to compare proposals,
              score bidders, and generate professional recommendation reports.
            </p>
            <button
              onClick={() => setShowNew(true)}
              className="bg-select-500 hover:bg-select-600 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Create First Evaluation
            </button>
          </div>
        )}

        {/* Project list */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-navy-900 mb-4">
              Your Evaluations
              <span className="text-navy-400 font-normal text-sm ml-2">({projects.length})</span>
            </h2>
            <div className="grid gap-3">
              {projects.map(p => (
                <div
                  key={p.id}
                  className="bg-white border border-navy-200 rounded-xl p-5 hover:border-select-300 hover:shadow-sm transition group cursor-pointer"
                  onClick={() => router.push(`/project/${p.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-navy-900 truncate">{p.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-navy-100 text-navy-600 flex-shrink-0">
                          {PROJECT_TYPES[p.projectType]?.label || p.projectType}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-navy-500">
                        {p.client && <span>{p.client}</span>}
                        {p.capacity && <span>{p.capacity}</span>}
                        {p.location && <span>{p.location}</span>}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-navy-400">
                        <span>{p.bidders?.length || 0} bidders</span>
                        <span>{p.criteria?.length || 0} criteria</span>
                        <span>Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm(p.id) }}
                        className="text-navy-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── New Project Modal ── */}
      {showNew && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNew(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-navy-900">New Bid Evaluation</h2>
              <button onClick={() => setShowNew(false)} className="text-navy-400 hover:text-navy-600 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-navy-700 mb-1 block">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g. 100MW Wind Farm EPC — Bid Round 1"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCreate()}
                  className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500 focus:ring-2 focus:ring-select-500/20"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm font-medium text-navy-700 mb-1 block">Client</label>
                <input
                  type="text"
                  placeholder="e.g. ABC Energy Co., Ltd."
                  value={newClient}
                  onChange={e => setNewClient(e.target.value)}
                  className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500 focus:ring-2 focus:ring-select-500/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-navy-700 mb-1 block">Procurement Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(PROJECT_TYPES).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setNewType(key)}
                      className={`text-left p-2.5 rounded-lg border-2 text-sm transition cursor-pointer ${
                        newType === key
                          ? 'border-select-500 bg-select-50 text-select-700'
                          : 'border-navy-200 hover:border-navy-300 text-navy-600'
                      }`}
                    >
                      <div className="font-medium text-xs">{val.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Capacity</label>
                  <input
                    type="text"
                    placeholder="e.g. 100 MW"
                    value={newCapacity}
                    onChange={e => setNewCapacity(e.target.value)}
                    className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500 focus:ring-2 focus:ring-select-500/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Nakhon Ratchasima"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-select-500 focus:ring-2 focus:ring-select-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowNew(false)} className="px-4 py-2 text-sm text-navy-600 hover:bg-navy-100 rounded-lg transition cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="bg-select-500 hover:bg-select-600 disabled:bg-navy-200 disabled:text-navy-400 text-white font-semibold px-5 py-2 rounded-lg transition cursor-pointer text-sm"
              >
                Create Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-navy-900 mb-2">Delete Evaluation?</h3>
            <p className="text-sm text-navy-500 mb-5">
              This will permanently delete this evaluation and all its data. This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-navy-600 hover:bg-navy-100 rounded-lg transition cursor-pointer">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
