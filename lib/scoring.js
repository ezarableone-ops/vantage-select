/**
 * Vantage Select — Scoring calculations
 *
 * Score scale: 1-5
 *   1 = Poor / Non-compliant
 *   2 = Below Average / Partially compliant
 *   3 = Average / Acceptable
 *   4 = Good / Exceeds requirements
 *   5 = Excellent / Best-in-class
 */

export const SCORE_LABELS = {
  1: { label: 'Poor', color: 'bg-red-100 text-red-700', bar: 'bg-red-500' },
  2: { label: 'Below Avg', color: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500' },
  3: { label: 'Average', color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500' },
  4: { label: 'Good', color: 'bg-lime-100 text-lime-700', bar: 'bg-lime-500' },
  5: { label: 'Excellent', color: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500' },
}

export const CATEGORIES = {
  technical: { label: 'Technical', color: 'bg-blue-100 text-blue-700' },
  commercial: { label: 'Commercial', color: 'bg-emerald-100 text-emerald-700' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-600' },
}

export const PROJECT_TYPES = {
  epc: { label: 'EPC Contract', desc: 'Engineering, Procurement & Construction' },
  equipment: { label: 'Equipment Supply', desc: 'Turbines, Inverters, Modules, etc.' },
  om: { label: 'O&M Contract', desc: 'Operations & Maintenance' },
  consulting: { label: 'Consulting Services', desc: 'Technical Advisory, Owner\'s Engineer, etc.' },
  bos: { label: 'Balance of System', desc: 'Civil, Electrical, Grid Connection' },
}

/**
 * Calculate weighted score for a single bidder
 */
export function calcBidderScore(criteria, scores) {
  let totalWeight = 0
  let weightedSum = 0
  let scoredCount = 0

  for (const c of criteria) {
    totalWeight += c.weight
    const s = scores?.[c.id]
    if (s && s.score > 0) {
      weightedSum += (s.score / 5) * c.weight  // normalize to 0-1, then multiply by weight
      scoredCount++
    }
  }

  if (totalWeight === 0) return { weightedScore: 0, rawScore: 0, percent: 0, completion: 0 }

  const percent = Math.round((weightedSum / totalWeight) * 100)
  const rawScore = scoredCount > 0 ? (weightedSum / totalWeight) * 5 : 0

  return {
    weightedScore: weightedSum,
    rawScore: Math.round(rawScore * 100) / 100,
    percent,
    completion: Math.round((scoredCount / criteria.length) * 100),
  }
}

/**
 * Calculate scores for all bidders and rank them
 */
export function calcRankings(criteria, bidders, allScores) {
  const results = bidders.map(bidder => {
    const scores = allScores[bidder.id] || {}
    const calc = calcBidderScore(criteria, scores)
    return {
      bidder,
      ...calc,
    }
  })

  // Sort by percent descending
  results.sort((a, b) => b.percent - a.percent)

  // Assign rank
  results.forEach((r, i) => {
    r.rank = i + 1
  })

  return results
}

/**
 * Calculate category subtotals for a bidder
 */
export function calcCategoryScores(criteria, scores) {
  const categories = {}

  for (const c of criteria) {
    if (!categories[c.category]) {
      categories[c.category] = { totalWeight: 0, weightedSum: 0, count: 0, scored: 0 }
    }
    categories[c.category].totalWeight += c.weight
    categories[c.category].count++
    const s = scores?.[c.id]
    if (s && s.score > 0) {
      categories[c.category].weightedSum += (s.score / 5) * c.weight
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
  return { total, valid: total === 100 }
}
