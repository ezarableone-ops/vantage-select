/**
 * Vantage Select — localStorage-based project store
 *
 * Data structure:
 * {
 *   projects: {
 *     [id]: {
 *       id, name, client, projectType, capacity, location,
 *       createdAt, updatedAt,
 *       criteria: [{ id, name, category, weight, description }],
 *       bidders: [{ id, name, company, contact, notes }],
 *       scores: { [bidderId]: { [criteriaId]: { score, comment } } },
 *       commercial: { [bidderId]: { totalPrice, pricePerMW, currency, capex, opex, warranty, deliveryWeeks, notes } },
 *       recommendation: ''
 *     }
 *   }
 * }
 */

const STORAGE_KEY = 'vantage_select_data'

function getData() {
  if (typeof window === 'undefined') return { projects: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { projects: {} }
  } catch {
    return { projects: {} }
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// ── Projects ──

export function getProjects() {
  const data = getData()
  return Object.values(data.projects).sort((a, b) =>
    new Date(b.updatedAt) - new Date(a.updatedAt)
  )
}

export function getProject(id) {
  const data = getData()
  return data.projects[id] || null
}

export function createProject({ name, client, projectType, capacity, location }) {
  const data = getData()
  const id = generateId()
  const now = new Date().toISOString()
  data.projects[id] = {
    id,
    name: name || 'Untitled Project',
    client: client || '',
    projectType: projectType || 'epc',
    capacity: capacity || '',
    location: location || '',
    createdAt: now,
    updatedAt: now,
    criteria: getDefaultCriteria(projectType || 'epc'),
    bidders: [],
    scores: {},
    commercial: {},
    recommendation: '',
  }
  saveData(data)
  return data.projects[id]
}

export function updateProject(id, updates) {
  const data = getData()
  if (!data.projects[id]) return null
  data.projects[id] = {
    ...data.projects[id],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveData(data)
  return data.projects[id]
}

export function deleteProject(id) {
  const data = getData()
  delete data.projects[id]
  saveData(data)
}

// ── Bidders ──

export function addBidder(projectId, { name, company, contact, notes }) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return null
  const bidder = {
    id: generateId(),
    name: name || '',
    company: company || '',
    contact: contact || '',
    notes: notes || '',
  }
  project.bidders.push(bidder)
  project.updatedAt = new Date().toISOString()
  saveData(data)
  return bidder
}

export function updateBidder(projectId, bidderId, updates) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return null
  const idx = project.bidders.findIndex(b => b.id === bidderId)
  if (idx === -1) return null
  project.bidders[idx] = { ...project.bidders[idx], ...updates }
  project.updatedAt = new Date().toISOString()
  saveData(data)
  return project.bidders[idx]
}

export function removeBidder(projectId, bidderId) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return
  project.bidders = project.bidders.filter(b => b.id !== bidderId)
  delete project.scores[bidderId]
  delete project.commercial[bidderId]
  project.updatedAt = new Date().toISOString()
  saveData(data)
}

// ── Criteria ──

export function addCriteria(projectId, { name, category, weight, description }) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return null
  const criterion = {
    id: generateId(),
    name: name || '',
    category: category || 'technical',
    weight: weight || 0,
    description: description || '',
  }
  project.criteria.push(criterion)
  project.updatedAt = new Date().toISOString()
  saveData(data)
  return criterion
}

export function updateCriteria(projectId, criteriaId, updates) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return null
  const idx = project.criteria.findIndex(c => c.id === criteriaId)
  if (idx === -1) return null
  project.criteria[idx] = { ...project.criteria[idx], ...updates }
  project.updatedAt = new Date().toISOString()
  saveData(data)
  return project.criteria[idx]
}

export function removeCriteria(projectId, criteriaId) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return
  project.criteria = project.criteria.filter(c => c.id !== criteriaId)
  // Clean up scores
  for (const bidderId of Object.keys(project.scores)) {
    delete project.scores[bidderId][criteriaId]
  }
  project.updatedAt = new Date().toISOString()
  saveData(data)
}

// ── Scores ──

export function setScore(projectId, bidderId, criteriaId, score, comment) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return
  if (!project.scores[bidderId]) project.scores[bidderId] = {}
  project.scores[bidderId][criteriaId] = { score, comment: comment || '' }
  project.updatedAt = new Date().toISOString()
  saveData(data)
}

// ── Commercial ──

export function setCommercial(projectId, bidderId, commercialData) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return
  project.commercial[bidderId] = { ...commercialData }
  project.updatedAt = new Date().toISOString()
  saveData(data)
}

// ── Recommendation ──

export function setRecommendation(projectId, text) {
  const data = getData()
  const project = data.projects[projectId]
  if (!project) return
  project.recommendation = text
  project.updatedAt = new Date().toISOString()
  saveData(data)
}

// ── Export / Import ──

export function exportProject(projectId) {
  const project = getProject(projectId)
  if (!project) return null
  return JSON.stringify(project, null, 2)
}

export function importProject(jsonString) {
  try {
    const project = JSON.parse(jsonString)
    if (!project.name || !project.criteria) throw new Error('Invalid format')
    const data = getData()
    const id = generateId()
    project.id = id
    project.updatedAt = new Date().toISOString()
    data.projects[id] = project
    saveData(data)
    return project
  } catch (err) {
    throw new Error('Invalid project file: ' + err.message)
  }
}

export function exportAllData() {
  return JSON.stringify(getData(), null, 2)
}

// ── Default Criteria Templates ──

function getDefaultCriteria(projectType) {
  const base = [
    { id: generateId(), name: 'Technical Compliance', category: 'technical', weight: 15, description: 'Compliance with technical specifications and requirements' },
    { id: generateId(), name: 'Track Record & Experience', category: 'technical', weight: 15, description: 'Relevant project experience and proven track record' },
    { id: generateId(), name: 'Proposed Equipment / Solution', category: 'technical', weight: 10, description: 'Quality and suitability of proposed equipment or solution' },
    { id: generateId(), name: 'Project Schedule', category: 'technical', weight: 10, description: 'Feasibility and competitiveness of proposed timeline' },
    { id: generateId(), name: 'Team & Key Personnel', category: 'technical', weight: 5, description: 'Qualifications and experience of proposed team' },
    { id: generateId(), name: 'Total Price', category: 'commercial', weight: 20, description: 'Overall competitiveness of pricing' },
    { id: generateId(), name: 'Payment Terms', category: 'commercial', weight: 5, description: 'Favorability of payment schedule and conditions' },
    { id: generateId(), name: 'Warranty & Guarantees', category: 'commercial', weight: 10, description: 'Scope and duration of warranties and performance guarantees' },
    { id: generateId(), name: 'Contract Terms & Conditions', category: 'commercial', weight: 5, description: 'Acceptability of proposed contract terms' },
    { id: generateId(), name: 'HSE & Sustainability', category: 'other', weight: 5, description: 'Health, safety, environmental, and sustainability approach' },
  ]

  if (projectType === 'om') {
    base.splice(2, 1,
      { id: generateId(), name: 'O&M Strategy & Approach', category: 'technical', weight: 10, description: 'Proposed O&M methodology, response times, and availability guarantees' },
    )
  }

  return base
}
