import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { SCORE_LABELS, CATEGORIES, calcBidderScore, calcCategoryScores } from './scoring'

/**
 * Export bid evaluation to Excel (.xlsx)
 * Creates a workbook with 4 sheets:
 *   1. Score Matrix — full scoring table
 *   2. Commercial Comparison — pricing & terms
 *   3. Rankings — final results
 *   4. Recommendation — text summary
 */
export function exportToExcel(project) {
  const wb = XLSX.utils.book_new()

  // ── Sheet 1: Score Matrix ──
  const scoreRows = []

  // Header row
  const headerRow = ['Criteria', 'Category', 'Weight (%)']
  project.bidders.forEach(b => {
    headerRow.push(`${b.name} — Score`)
    headerRow.push(`${b.name} — Comment`)
  })
  scoreRows.push(headerRow)

  // Data rows
  project.criteria.forEach(c => {
    const row = [c.name, CATEGORIES[c.category]?.label || c.category, c.weight]
    project.bidders.forEach(b => {
      const s = project.scores?.[b.id]?.[c.id]
      row.push(s?.score || '-')
      row.push(s?.comment || '')
    })
    scoreRows.push(row)
  })

  // Weighted total row
  const totalRow = ['WEIGHTED SCORE (%)', '', project.criteria.reduce((s, c) => s + c.weight, 0)]
  project.bidders.forEach(b => {
    const calc = calcBidderScore(project.criteria, project.scores?.[b.id] || {})
    totalRow.push(`${calc.percent}%`)
    totalRow.push('')
  })
  scoreRows.push(totalRow)

  const ws1 = XLSX.utils.aoa_to_sheet(scoreRows)
  // Set column widths
  ws1['!cols'] = [
    { wch: 30 }, { wch: 12 }, { wch: 10 },
    ...project.bidders.flatMap(() => [{ wch: 12 }, { wch: 40 }])
  ]
  XLSX.utils.book_append_sheet(wb, ws1, 'Score Matrix')

  // ── Sheet 2: Commercial Comparison ──
  const commRows = [
    ['', ...project.bidders.map(b => b.name)],
    ['Company', ...project.bidders.map(b => b.company || '-')],
    ['Total Price', ...project.bidders.map(b => {
      const c = project.commercial?.[b.id]
      return c?.totalPrice ? `${(c.currency || 'THB')} ${Number(c.totalPrice).toLocaleString()}` : '-'
    })],
    ['Price per Wp', ...project.bidders.map(b => {
      const c = project.commercial?.[b.id]
      return c?.pricePerWp ? `$${c.pricePerWp}/Wp` : '-'
    })],
    ['Price per MW', ...project.bidders.map(b => {
      const c = project.commercial?.[b.id]
      return c?.pricePerMW ? `${Number(c.pricePerMW).toLocaleString()}` : '-'
    })],
    ['Delivery (weeks)', ...project.bidders.map(b => {
      const c = project.commercial?.[b.id]
      return c?.deliveryWeeks || '-'
    })],
    ['Warranty', ...project.bidders.map(b => {
      const c = project.commercial?.[b.id]
      return c?.warranty || '-'
    })],
    ['Notes', ...project.bidders.map(b => {
      const c = project.commercial?.[b.id]
      return c?.notes || '-'
    })],
  ]

  const ws2 = XLSX.utils.aoa_to_sheet(commRows)
  ws2['!cols'] = [{ wch: 18 }, ...project.bidders.map(() => ({ wch: 35 }))]
  XLSX.utils.book_append_sheet(wb, ws2, 'Commercial')

  // ── Sheet 3: Rankings ──
  const rankings = project.bidders
    .map(b => {
      const calc = calcBidderScore(project.criteria, project.scores?.[b.id] || {})
      const cats = calcCategoryScores(project.criteria, project.scores?.[b.id] || {})
      return { bidder: b, ...calc, cats }
    })
    .sort((a, b) => b.percent - a.percent)

  const rankRows = [
    ['Rank', 'Bidder', 'Company', 'Overall Score (%)', 'Technical (%)', 'Commercial (%)', 'Other (%)', 'Completion (%)'],
    ...rankings.map((r, i) => [
      i + 1,
      r.bidder.name,
      r.bidder.company || '',
      `${r.percent}%`,
      `${r.cats.technical?.percent || 0}%`,
      `${r.cats.commercial?.percent || 0}%`,
      `${r.cats.other?.percent || 0}%`,
      `${r.completion}%`,
    ])
  ]

  const ws3 = XLSX.utils.aoa_to_sheet(rankRows)
  ws3['!cols'] = [{ wch: 6 }, { wch: 25 }, { wch: 30 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 14 }]
  XLSX.utils.book_append_sheet(wb, ws3, 'Rankings')

  // ── Sheet 4: Recommendation ──
  const recRows = [
    ['Project', project.name],
    ['Client', project.client || '-'],
    ['Type', project.projectType || '-'],
    ['Capacity', project.capacity || '-'],
    ['Location', project.location || '-'],
    ['Date', new Date().toLocaleDateString()],
    [''],
    ['RECOMMENDATION'],
    [project.recommendation || '(No recommendation written)'],
  ]

  const ws4 = XLSX.utils.aoa_to_sheet(recRows)
  ws4['!cols'] = [{ wch: 15 }, { wch: 80 }]
  XLSX.utils.book_append_sheet(wb, ws4, 'Recommendation')

  // ── Save ──
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const fileName = `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Evaluation.xlsx`
  saveAs(blob, fileName)
}
