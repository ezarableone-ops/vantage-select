/**
 * Vantage Select — Scoring calculations
 *
 * UL-style Compliance Levels (default):
 *   100 = Very High — Fully compliant, no deviations
 *    75 = High — Minor deviations, acceptable
 *    50 = Medium — Conditional compliance, needs clarification
 *    25 = Low — Major deviations, significant gaps
 *     0 = None — Non-compliant, fails requirements
 *
 * Alternative 1-5 scale also supported:
 *   5 = Excellent, 4 = Good, 3 = Average, 2 = Below Avg, 1 = Poor
 */

// UL-style compliance levels (default)
export const COMPLIANCE_LEVELS = {
  100: { label: 'Very High', color: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', desc: 'Fully compliant — no deviations' },
  75:  { label: 'High', color: 'bg-lime-100 text-lime-700', bar: 'bg-lime-500', desc: 'Minor deviations — acceptable' },
  50:  { label: 'Medium', color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500', desc: 'Conditional — needs clarification' },
  25:  { label: 'Low', color: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500', desc: 'Major deviations — significant gaps' },
  0:   { label: 'None', color: 'bg-red-100 text-red-700', bar: 'bg-red-500', desc: 'Non-compliant — fails requirements' },
}

// Legacy 1-5 scale
export const SCORE_LABELS = {
  1: { label: 'Poor', color: 'bg-red-100 text-red-700', bar: 'bg-red-500' },
  2: { label: 'Below Avg', color: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500' },
  3: { label: 'Average', color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500' },
  4: { label: 'Good', color: 'bg-lime-100 text-lime-700', bar: 'bg-lime-500' },
  5: { label: 'Excellent', color: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500' },
}

// UL-style evaluation categories (Solar EPC)
export const CATEGORIES = {
  general:    { label: 'General / Qualification', color: 'bg-indigo-100 text-indigo-700', icon: '🏢' },
  technical:  { label: 'Technical', color: 'bg-blue-100 text-blue-700', icon: '⚙️' },
  hse:        { label: 'HSE & Environmental', color: 'bg-green-100 text-green-700', icon: '🛡️' },
  schedule:   { label: 'Work Program / Schedule', color: 'bg-purple-100 text-purple-700', icon: '📅' },
  qaqc:       { label: 'QA/QC & Risk Management', color: 'bg-cyan-100 text-cyan-700', icon: '✅' },
  om:         { label: 'O&M & Availability', color: 'bg-teal-100 text-teal-700', icon: '🔧' },
  contract:   { label: 'Contract / Terms', color: 'bg-amber-100 text-amber-700', icon: '📋' },
  commercial: { label: 'Commercial / Pricing', color: 'bg-emerald-100 text-emerald-700', icon: '💰' },
}

export const PROJECT_TYPES = {
  solar_epc:  { label: 'Solar — EPC', desc: 'Solar Farm EPC Contract' },
  wind_epc:   { label: 'Wind — EPC', desc: 'Wind Farm EPC Contract' },
  epc:        { label: 'EPC (General)', desc: 'Engineering, Procurement & Construction' },
  equipment:  { label: 'Equipment Supply', desc: 'Turbines, Inverters, Modules, etc.' },
  om:         { label: 'O&M Contract', desc: 'Operations & Maintenance' },
  consulting: { label: 'Consulting Services', desc: 'Technical Advisory, Owner\'s Engineer, etc.' },
  bos:        { label: 'Balance of System', desc: 'Civil, Electrical, Grid Connection' },
}

// Scoring modes
export const SCORING_MODES = {
  compliance: { label: 'UL Compliance (0-100)', desc: 'None / Low / Medium / High / Very High', values: [0, 25, 50, 75, 100] },
  scale5:     { label: 'Scale 1-5', desc: 'Poor / Below Avg / Average / Good / Excellent', values: [1, 2, 3, 4, 5] },
}

/**
 * Get score label based on scoring mode
 */
export function getScoreLabel(score, mode = 'compliance') {
  if (mode === 'compliance') return COMPLIANCE_LEVELS[score]
  return SCORE_LABELS[score]
}

/**
 * Normalize score to 0-1 range based on mode
 */
function normalizeScore(score, mode = 'compliance') {
  if (mode === 'compliance') return score / 100
  return score / 5
}

/**
 * Calculate weighted score for a single bidder
 * Works with both compliance (0-100) and scale (1-5) modes
 */
export function calcBidderScore(criteria, scores, mode = 'compliance') {
  let totalWeight = 0
  let weightedSum = 0
  let scoredCount = 0

  for (const c of criteria) {
    totalWeight += c.weight
    const s = scores?.[c.id]
    if (s && s.score > 0) {
      weightedSum += normalizeScore(s.score, mode) * c.weight
      scoredCount++
    }
  }

  if (totalWeight === 0) return { weightedScore: 0, rawScore: 0, percent: 0, completion: 0 }

  const percent = Math.round((weightedSum / totalWeight) * 100)

  return {
    weightedScore: Math.round(weightedSum * 100) / 100,
    rawScore: Math.round(weightedSum * 100) / 100,
    percent,
    completion: Math.round((scoredCount / criteria.length) * 100),
  }
}

/**
 * Calculate scores for all bidders and rank them
 */
export function calcRankings(criteria, bidders, allScores, mode = 'compliance') {
  const results = bidders.map(bidder => {
    const scores = allScores[bidder.id] || {}
    const calc = calcBidderScore(criteria, scores, mode)
    return { bidder, ...calc }
  })

  results.sort((a, b) => b.percent - a.percent)
  results.forEach((r, i) => { r.rank = i + 1 })

  return results
}

/**
 * Calculate category subtotals for a bidder
 */
export function calcCategoryScores(criteria, scores, mode = 'compliance') {
  const categories = {}

  for (const c of criteria) {
    if (!categories[c.category]) {
      categories[c.category] = { totalWeight: 0, weightedSum: 0, count: 0, scored: 0 }
    }
    categories[c.category].totalWeight += c.weight
    categories[c.category].count++
    const s = scores?.[c.id]
    if (s && s.score > 0) {
      categories[c.category].weightedSum += normalizeScore(s.score, mode) * c.weight
      categories[c.category].scored++
    }
  }

  const result = {}
  for (const [key, val] of Object.entries(categories)) {
    result[key] = {
      percent: val.totalWeight > 0 ? Math.round((val.weightedSum / val.totalWeight) * 100) : 0,
      weight: val.totalWeight,
      completion: Math.round((val.scored / val.count) * 100),
    }
  }
  return result
}

/**
 * Check if total criteria weights sum to 100
 */
export function validateWeights(criteria) {
  const total = criteria.reduce((sum, c) => sum + (c.weight || 0), 0)
  return { total: Math.round(total * 100) / 100, valid: Math.abs(total - 100) < 0.01 }
}
