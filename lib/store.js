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

export function createProject({ name, client, projectType, capacity, location, scoringMode, includeCommercial }) {
  const data = getData()
  const id = generateId()
  const now = new Date().toISOString()
  const mode = scoringMode || 'compliance'
  const withCommercial = includeCommercial || false
  data.projects[id] = {
    id,
    name: name || 'Untitled Project',
    client: client || '',
    projectType: projectType || 'solar_epc',
    capacity: capacity || '',
    location: location || '',
    scoringMode: mode,
    includeCommercial: withCommercial,
    createdAt: now,
    updatedAt: now,
    criteria: getDefaultCriteria(projectType || 'solar_epc', withCommercial),
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

// ── Default Criteria Templates (UL Structure) ──

function getDefaultCriteria(projectType, includeCommercial = false) {
  if (projectType === 'solar_epc') return getSolarEPCCriteria(includeCommercial)
  if (projectType === 'wind_epc') return getWindEPCCriteria(includeCommercial)
  // Fallback for other types — simplified
  return getGenericCriteria(includeCommercial)
}

function getSolarEPCCriteria(includeCommercial) {
  const criteria = [
    // I. General Requirements (5%)
    { id: generateId(), name: 'Company Profile & Financial Standing', category: 'general', weight: 1, section: 'I', description: 'Revenue, financial stability, corporate structure' },
    { id: generateId(), name: 'Relevant EPC Experience & Track Record', category: 'general', weight: 1, section: 'I', description: 'Number and scale of similar solar EPC projects completed' },
    { id: generateId(), name: 'Project Team Organization & Key Personnel', category: 'general', weight: 1, section: 'I', description: 'Organization chart, key personnel qualifications and deployment plan' },
    { id: generateId(), name: 'Project Management & Compliance Documentation', category: 'general', weight: 0.5, section: 'I', description: 'Submission of required forms, management plans, compliance docs' },
    { id: generateId(), name: 'Subcontractors Profile & Capability', category: 'general', weight: 0.5, section: 'I', description: 'Subcontractor list, experience, financial capacity' },
    { id: generateId(), name: 'Current Capabilities (Projects on Hand)', category: 'general', weight: 1, section: 'I', description: 'Available capacity considering current project commitments' },

    // II.1 Overall Engineering Design (8%)
    { id: generateId(), name: 'PV Layout Design & Array Configuration', category: 'technical', weight: 2, section: 'II.1', description: 'Suitability of PV array layout, row spacing, tilt angle' },
    { id: generateId(), name: 'Quality of Drawing Packages', category: 'technical', weight: 2, section: 'II.1', description: 'Drawing detail level, completeness, compliance with standards' },
    { id: generateId(), name: 'Master Document List (MDL)', category: 'technical', weight: 2, section: 'II.1', description: 'Completeness of documentation submission plan' },
    { id: generateId(), name: 'Document Management & Numbering System', category: 'technical', weight: 2, section: 'II.1', description: 'Document control procedures, numbering convention' },

    // II.2 Guaranteed Performance & Energy Yield (10%)
    { id: generateId(), name: 'Project Capacity (DC and AC)', category: 'technical', weight: 2, section: 'II.2', description: 'Compliance with required DC/AC capacity' },
    { id: generateId(), name: 'Guaranteed Performance Ratio', category: 'technical', weight: 2, section: 'II.2', description: 'PR guarantee at COD and subsequent years' },
    { id: generateId(), name: 'Energy Yield Simulation Parameters', category: 'technical', weight: 2, section: 'II.2', description: 'Loss parameters justification, methodology, data sources' },
    { id: generateId(), name: 'Estimated Energy Production (kWh)', category: 'technical', weight: 2, section: 'II.2', description: 'Annual energy production estimate and basis' },
    { id: generateId(), name: 'Specific Yield & Data Sources', category: 'technical', weight: 2, section: 'II.2', description: 'kWh/kWp/year and solar resource data quality' },

    // II.3 Main PV Equipment (10%)
    { id: generateId(), name: 'PV Module Specification & Suitability', category: 'technical', weight: 4, section: 'II.3', description: 'Module model, efficiency, certification, site suitability' },
    { id: generateId(), name: 'Inverter Specification & Suitability', category: 'technical', weight: 4, section: 'II.3', description: 'Inverter model, capacity, grid compliance, site suitability' },
    { id: generateId(), name: 'Weather Monitoring Station', category: 'technical', weight: 2, section: 'II.3', description: 'Monitoring station quantity, sensors, data logging' },

    // II.4 Mechanical Works (8%)
    { id: generateId(), name: 'General Mechanical Requirements', category: 'technical', weight: 2, section: 'II.4', description: 'Mechanical system design compliance' },
    { id: generateId(), name: 'Fire Protection System', category: 'technical', weight: 2, section: 'II.4', description: 'Fire detection, alarm, suppression systems' },
    { id: generateId(), name: 'HVAC System Provisions', category: 'technical', weight: 2, section: 'II.4', description: 'Heating, ventilation, air conditioning for buildings' },
    { id: generateId(), name: 'Plumbing & Drainage System', category: 'technical', weight: 2, section: 'II.4', description: 'Water supply, sewage, drainage provisions' },

    // II.5 Civil Works (10%)
    { id: generateId(), name: 'Site Preparation Methodology', category: 'technical', weight: 1, section: 'II.5', description: 'Site clearing, grading, compaction approach' },
    { id: generateId(), name: 'Water Drainage Arrangement', category: 'technical', weight: 1, section: 'II.5', description: 'Surface water management, flood protection' },
    { id: generateId(), name: 'Mounting Structure Design', category: 'technical', weight: 1, section: 'II.5', description: 'Tracker/fixed-tilt structure, wind loading, material' },
    { id: generateId(), name: 'Pile Foundation & Load Testing', category: 'technical', weight: 1, section: 'II.5', description: 'Foundation design, testing criteria, methodology' },
    { id: generateId(), name: 'Corrosion Protection', category: 'technical', weight: 1, section: 'II.5', description: 'Hot-dip galvanizing, coating specification' },
    { id: generateId(), name: 'Internal Roads & Access Design', category: 'technical', weight: 1, section: 'II.5', description: 'Road width, surface treatment, turning radius' },
    { id: generateId(), name: 'Drainage System Design', category: 'technical', weight: 1, section: 'II.5', description: 'Culverts, retention ponds, storm water management' },
    { id: generateId(), name: 'Building Design (Inverter/MV/Water Treatment)', category: 'technical', weight: 1, section: 'II.5', description: 'Inverter station, substation building, auxiliary buildings' },
    { id: generateId(), name: 'Substation Building Design', category: 'technical', weight: 1, section: 'II.5', description: 'GIS building, control room design concept' },
    { id: generateId(), name: 'Fence, Gate & Guardhouse Design', category: 'technical', weight: 1, section: 'II.5', description: 'Perimeter security, access control design' },

    // II.6 Electrical Works (10%)
    { id: generateId(), name: 'Overall Electrical Design', category: 'technical', weight: 1.5, section: 'II.6', description: 'SLD, inverter grouping, grid connection scheme' },
    { id: generateId(), name: 'Substation Electrical Design', category: 'technical', weight: 1.5, section: 'II.6', description: 'HV substation layout, cable routing, protection' },
    { id: generateId(), name: 'MV Transmission Line Design', category: 'technical', weight: 1, section: 'II.6', description: 'MV cable route, overhead vs underground, sizing' },
    { id: generateId(), name: 'HV & MV Transformer Specification', category: 'technical', weight: 1.5, section: 'II.6', description: 'Transformer rating, impedance, cooling type' },
    { id: generateId(), name: 'GIS Switchgear Specification', category: 'technical', weight: 1.5, section: 'II.6', description: 'GIS rating, type testing, standards compliance' },
    { id: generateId(), name: 'Cable Specification (DC/AC/MV)', category: 'technical', weight: 1, section: 'II.6', description: 'Cable sizing, material, routing, fire rating' },
    { id: generateId(), name: 'Lightning Protection & Grounding', category: 'technical', weight: 1, section: 'II.6', description: 'LPS design, earthing system, surge protection' },
    { id: generateId(), name: 'Protection System', category: 'technical', weight: 1, section: 'II.6', description: 'Protection philosophy, relay coordination, settings' },

    // II.7 Control & Monitoring (8%)
    { id: generateId(), name: 'SCADA ER/PEA/EGAT Compliance', category: 'technical', weight: 2, section: 'II.7', description: 'Control system compliance with grid code requirements' },
    { id: generateId(), name: 'SCADA Network Architecture', category: 'technical', weight: 1, section: 'II.7', description: 'Network redundancy, communication protocols' },
    { id: generateId(), name: 'Power Plant Controller (PPC)', category: 'technical', weight: 1.5, section: 'II.7', description: 'PPC solution, active/reactive power control' },
    { id: generateId(), name: 'Cybersecurity & Remote Access', category: 'technical', weight: 1, section: 'II.7', description: 'Cybersecurity measures, VPN, access control' },
    { id: generateId(), name: 'SCADA Server & Platform', category: 'technical', weight: 1, section: 'II.7', description: 'Server hardware, software platform, redundancy' },
    { id: generateId(), name: 'Field Monitoring Equipment', category: 'technical', weight: 0.5, section: 'II.7', description: 'Weather stations, sensors, string monitoring' },
    { id: generateId(), name: 'Software Ownership & Licensing', category: 'technical', weight: 1, section: 'II.7', description: 'Software licenses, source code handover, perpetual license' },

    // III. HSE (5%)
    { id: generateId(), name: 'Company Safety Policy', category: 'hse', weight: 1, section: 'III', description: 'Corporate safety policy, accident history, safety culture' },
    { id: generateId(), name: 'HSE Organization & Team', category: 'hse', weight: 1, section: 'III', description: 'HSE team structure, qualifications, deployment' },
    { id: generateId(), name: 'Safety Method Statement / JHA', category: 'hse', weight: 1.5, section: 'III', description: 'Job hazard analysis, work method statements, risk assessment' },
    { id: generateId(), name: 'HSE Management Plan', category: 'hse', weight: 1.5, section: 'III', description: 'Comprehensive HSE management plan and procedures' },

    // IV. Work Program (10%)
    { id: generateId(), name: 'Overall Project Schedule', category: 'schedule', weight: 2.5, section: 'IV', description: 'Master schedule, critical path, work sequence' },
    { id: generateId(), name: 'Engineering Design Schedule', category: 'schedule', weight: 1.5, section: 'IV', description: 'Design deliverable timeline, review cycles' },
    { id: generateId(), name: 'Procurement Schedule', category: 'schedule', weight: 2, section: 'IV', description: 'Equipment procurement, delivery timeline, long-lead items' },
    { id: generateId(), name: 'Construction & Commissioning Schedule', category: 'schedule', weight: 2.5, section: 'IV', description: 'Construction phases, testing, commissioning timeline' },
    { id: generateId(), name: 'Mobilization & Manpower Loading', category: 'schedule', weight: 1.5, section: 'IV', description: 'Mobilization plan, manpower histogram, peak workforce' },

    // V. QA/QC & Risk (6%)
    { id: generateId(), name: 'Material & Equipment Compliance', category: 'qaqc', weight: 0.75, section: 'V', description: 'Procurement QC, vendor qualification, material certificates' },
    { id: generateId(), name: 'Incoming Material Inspection', category: 'qaqc', weight: 0.75, section: 'V', description: 'Receiving inspection, traceability, storage procedures' },
    { id: generateId(), name: 'Construction Quality Control', category: 'qaqc', weight: 1, section: 'V', description: 'ITP, hold points, inspection checklists' },
    { id: generateId(), name: 'Testing & Commissioning Protocols', category: 'qaqc', weight: 1, section: 'V', description: 'Test procedures, acceptance criteria, documentation' },
    { id: generateId(), name: 'Non-Conformance & Corrective Action', category: 'qaqc', weight: 0.75, section: 'V', description: 'NCR process, root cause analysis, CAPA' },
    { id: generateId(), name: 'Documentation & Digital Reporting', category: 'qaqc', weight: 0.5, section: 'V', description: 'QA/QC documentation control, digital reporting tools' },
    { id: generateId(), name: 'QA/QC Personnel Competency', category: 'qaqc', weight: 0.5, section: 'V', description: 'QC inspector qualifications, training records, certifications' },
    { id: generateId(), name: 'Risk Management Plan', category: 'qaqc', weight: 0.75, section: 'V', description: 'Risk register, mitigation strategies, contingency plans' },

    // VI. O&M Services (5%)
    { id: generateId(), name: 'Guaranteed Plant Availability (%)', category: 'om', weight: 1, section: 'VI', description: 'Availability guarantee, measurement methodology' },
    { id: generateId(), name: 'O&M Capabilities & Organization', category: 'om', weight: 1, section: 'VI', description: 'O&M team structure, local presence, response time' },
    { id: generateId(), name: 'Preventive & Corrective Program', category: 'om', weight: 0.75, section: 'VI', description: 'Maintenance schedule, response time SLA' },
    { id: generateId(), name: 'Spare Parts & Tools', category: 'om', weight: 0.75, section: 'VI', description: 'Spare parts list, consumables, special tools' },
    { id: generateId(), name: 'O&M Management Plan & Training', category: 'om', weight: 0.75, section: 'VI', description: 'O&M manual, owner training program, reporting' },
    { id: generateId(), name: 'Permits & Licenses', category: 'om', weight: 0.75, section: 'VI', description: 'Responsibility for obtaining and maintaining permits' },

    // VII. Contract Terms (5%)
    { id: generateId(), name: 'Payment Milestones', category: 'contract', weight: 1, section: 'VII', description: 'Payment schedule, milestone definitions, retention' },
    { id: generateId(), name: 'Defect Liability Period', category: 'contract', weight: 1, section: 'VII', description: 'DLP duration, scope, defect rectification obligations' },
    { id: generateId(), name: 'Performance Liquidated Damages', category: 'contract', weight: 1, section: 'VII', description: 'PR and availability LD rates, caps, measurement' },
    { id: generateId(), name: 'Delay Liquidated Damages', category: 'contract', weight: 0.75, section: 'VII', description: 'Delay LD rate, cap, milestone definitions' },
    { id: generateId(), name: 'Limitation of Liability', category: 'contract', weight: 0.5, section: 'VII', description: 'Overall liability cap, exclusions, consequential damages' },
    { id: generateId(), name: 'Insurance Requirements', category: 'contract', weight: 0.75, section: 'VII', description: 'CAR, TPL, professional indemnity, coverage adequacy' },
  ]

  if (includeCommercial) {
    criteria.push(
      { id: generateId(), name: 'Total EPC Price', category: 'commercial', weight: 5, section: 'VIII', description: 'Overall price competitiveness (THB/MW or USD/Wp)' },
      { id: generateId(), name: 'Price Breakdown & Transparency', category: 'commercial', weight: 2, section: 'VIII', description: 'Clarity of cost breakdown, provisional sums, contingencies' },
      { id: generateId(), name: 'Payment Terms & Conditions', category: 'commercial', weight: 1.5, section: 'VIII', description: 'Payment schedule acceptability, advance payment, retention' },
      { id: generateId(), name: 'Price Validity & Escalation', category: 'commercial', weight: 1.5, section: 'VIII', description: 'Offer validity period, price adjustment mechanism' },
    )
  }

  return criteria
}

function getWindEPCCriteria(includeCommercial) {
  // Similar to solar but with wind-specific items
  const criteria = [
    // I. General (5%)
    { id: generateId(), name: 'Company Profile & Financial Standing', category: 'general', weight: 1, section: 'I', description: 'Revenue, financial stability, corporate structure' },
    { id: generateId(), name: 'Relevant Wind EPC Experience', category: 'general', weight: 1.5, section: 'I', description: 'Number and scale of wind EPC projects completed' },
    { id: generateId(), name: 'Project Team Organization', category: 'general', weight: 1, section: 'I', description: 'Organization chart, key personnel qualifications' },
    { id: generateId(), name: 'Subcontractors Capability', category: 'general', weight: 0.5, section: 'I', description: 'Subcontractor experience and financial standing' },
    { id: generateId(), name: 'Current Project Commitments', category: 'general', weight: 1, section: 'I', description: 'Available capacity vs current workload' },

    // II.1 WTG Technology (15%)
    { id: generateId(), name: 'WTG Model & Site Suitability', category: 'technical', weight: 3, section: 'II.1', description: 'Turbine model, IEC class, site wind regime compatibility' },
    { id: generateId(), name: 'WTG Track Record & Reliability', category: 'technical', weight: 3, section: 'II.1', description: 'Fleet operational history, availability data, known issues' },
    { id: generateId(), name: 'Power Curve & Energy Yield', category: 'technical', weight: 3, section: 'II.1', description: 'Guaranteed power curve, AEP estimate, wake losses' },
    { id: generateId(), name: 'Noise & Environmental Compliance', category: 'technical', weight: 2, section: 'II.1', description: 'Noise emission levels, environmental impact mitigation' },
    { id: generateId(), name: 'Cold Weather / Hot Climate Package', category: 'technical', weight: 2, section: 'II.1', description: 'Climate adaptation, de-rating, cooling system' },
    { id: generateId(), name: 'Tower & Foundation Design', category: 'technical', weight: 2, section: 'II.1', description: 'Tower type, hub height, foundation concept' },

    // II.2 BOP Design (15%)
    { id: generateId(), name: 'Civil Works — Roads & Crane Pads', category: 'technical', weight: 2, section: 'II.2', description: 'Access road design, crane pad layout, soil investigation' },
    { id: generateId(), name: 'Electrical Collection System', category: 'technical', weight: 2.5, section: 'II.2', description: 'MV cable layout, string design, loss calculation' },
    { id: generateId(), name: 'Substation Design', category: 'technical', weight: 3, section: 'II.2', description: 'HV/MV substation, transformer, switchgear, protection' },
    { id: generateId(), name: 'Grid Connection & Compliance', category: 'technical', weight: 2.5, section: 'II.2', description: 'Grid code compliance, power quality, reactive power' },
    { id: generateId(), name: 'SCADA & Monitoring', category: 'technical', weight: 2.5, section: 'II.2', description: 'SCADA architecture, PPC, communication, cybersecurity' },
    { id: generateId(), name: 'Met Mast & Condition Monitoring', category: 'technical', weight: 2.5, section: 'II.2', description: 'Met tower, CMS, vibration monitoring, LIDAR' },

    // III. HSE (5%)
    { id: generateId(), name: 'HSE Policy & Track Record', category: 'hse', weight: 1.5, section: 'III', description: 'Safety statistics, incident history, safety culture' },
    { id: generateId(), name: 'HSE Plan & Risk Assessment', category: 'hse', weight: 2, section: 'III', description: 'Site-specific HSE plan, JHA, emergency response' },
    { id: generateId(), name: 'Environmental Management', category: 'hse', weight: 1.5, section: 'III', description: 'Environmental mitigation, waste management, permits' },

    // IV. Schedule (10%)
    { id: generateId(), name: 'Overall Project Schedule', category: 'schedule', weight: 3, section: 'IV', description: 'Master schedule, critical path, key milestones' },
    { id: generateId(), name: 'Procurement & Logistics', category: 'schedule', weight: 3, section: 'IV', description: 'WTG delivery, heavy transport, port logistics' },
    { id: generateId(), name: 'Construction & Commissioning', category: 'schedule', weight: 2.5, section: 'IV', description: 'Erection sequence, cranage plan, commissioning' },
    { id: generateId(), name: 'Mobilization & Resources', category: 'schedule', weight: 1.5, section: 'IV', description: 'Mobilization plan, equipment list, peak workforce' },

    // V. QA/QC (6%)
    { id: generateId(), name: 'Quality Management System', category: 'qaqc', weight: 2, section: 'V', description: 'QMS certification, ITP, hold points' },
    { id: generateId(), name: 'Inspection & Test Plan', category: 'qaqc', weight: 2, section: 'V', description: 'Factory acceptance test, site acceptance test' },
    { id: generateId(), name: 'Risk Management', category: 'qaqc', weight: 2, section: 'V', description: 'Risk register, mitigation, contingency' },

    // VI. O&M (10%)
    { id: generateId(), name: 'O&M Strategy & Organization', category: 'om', weight: 3, section: 'VI', description: 'O&M team, local presence, response time' },
    { id: generateId(), name: 'Availability Guarantee', category: 'om', weight: 3, section: 'VI', description: 'Guaranteed availability %, measurement, LD' },
    { id: generateId(), name: 'Spare Parts & Logistics', category: 'om', weight: 2, section: 'VI', description: 'Spare parts inventory, lead times, logistics' },
    { id: generateId(), name: 'Training & Knowledge Transfer', category: 'om', weight: 2, section: 'VI', description: 'Owner training, documentation, handover' },

    // VII. Contract (5%)
    { id: generateId(), name: 'Payment Milestones', category: 'contract', weight: 1, section: 'VII', description: 'Payment schedule, milestone definitions' },
    { id: generateId(), name: 'Warranties & DLP', category: 'contract', weight: 1.5, section: 'VII', description: 'Warranty scope, DLP duration, serial defect' },
    { id: generateId(), name: 'Liquidated Damages', category: 'contract', weight: 1.5, section: 'VII', description: 'Delay LD, performance LD, availability LD' },
    { id: generateId(), name: 'Limitation of Liability & Insurance', category: 'contract', weight: 1, section: 'VII', description: 'Liability cap, insurance requirements' },
  ]

  if (includeCommercial) {
    criteria.push(
      { id: generateId(), name: 'Total EPC Price', category: 'commercial', weight: 5, section: 'VIII', description: 'Overall price competitiveness (THB/MW)' },
      { id: generateId(), name: 'Price Breakdown', category: 'commercial', weight: 3, section: 'VIII', description: 'WTG supply vs BOP vs other costs transparency' },
      { id: generateId(), name: 'Price Validity & Escalation', category: 'commercial', weight: 2, section: 'VIII', description: 'Offer validity, FX adjustment, escalation clause' },
    )
  }

  return criteria
}

function getGenericCriteria(includeCommercial) {
  const criteria = [
    { id: generateId(), name: 'Company Profile & Experience', category: 'general', weight: 10, section: 'I', description: 'Corporate capability, relevant experience, track record' },
    { id: generateId(), name: 'Technical Approach', category: 'technical', weight: 25, section: 'II', description: 'Technical solution, methodology, compliance' },
    { id: generateId(), name: 'Key Personnel', category: 'general', weight: 10, section: 'I', description: 'Team qualifications and availability' },
    { id: generateId(), name: 'Project Schedule', category: 'schedule', weight: 15, section: 'III', description: 'Timeline feasibility and competitiveness' },
    { id: generateId(), name: 'Quality Assurance', category: 'qaqc', weight: 10, section: 'IV', description: 'QA/QC plan, certifications, track record' },
    { id: generateId(), name: 'HSE Compliance', category: 'hse', weight: 10, section: 'V', description: 'Safety record, HSE management system' },
    { id: generateId(), name: 'Warranty & Support', category: 'contract', weight: 10, section: 'VI', description: 'Warranty terms, after-sales support' },
    { id: generateId(), name: 'Contract Terms', category: 'contract', weight: 10, section: 'VI', description: 'Acceptable contract conditions, liabilities' },
  ]
  if (includeCommercial) {
    criteria.push(
      { id: generateId(), name: 'Total Price', category: 'commercial', weight: 15, section: 'VII', description: 'Price competitiveness' },
      { id: generateId(), name: 'Payment Terms', category: 'commercial', weight: 5, section: 'VII', description: 'Payment schedule and conditions' },
    )
    // Rebalance to ~100%
  }
  return criteria
}
