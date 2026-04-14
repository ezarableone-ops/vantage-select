/**
 * Demo data — 100 MW Solar Farm EPC Bid Evaluation
 * Realistic scenario with 4 bidders and full scoring
 */

export function createDemoProject() {
  const now = new Date().toISOString()

  // Criteria IDs
  const c1 = 'demo_c1'  // Technical Compliance
  const c2 = 'demo_c2'  // Track Record
  const c3 = 'demo_c3'  // Proposed Equipment
  const c4 = 'demo_c4'  // Project Schedule
  const c5 = 'demo_c5'  // Team & Key Personnel
  const c6 = 'demo_c6'  // Total Price
  const c7 = 'demo_c7'  // Payment Terms
  const c8 = 'demo_c8'  // Warranty & Guarantees
  const c9 = 'demo_c9'  // Contract T&C
  const c10 = 'demo_c10' // HSE & Sustainability
  const c11 = 'demo_c11' // Local Content
  const c12 = 'demo_c12' // Financial Strength

  // Bidder IDs
  const b1 = 'demo_b1'  // Sinohydro
  const b2 = 'demo_b2'  // PowerChina
  const b3 = 'demo_b3'  // B.Grimm
  const b4 = 'demo_b4'  // Symbior Solar

  return {
    id: 'demo_solar_epc',
    name: '100 MW Solar Farm — Saraburi EPC',
    client: 'Green Horizon Energy Co., Ltd.',
    projectType: 'epc',
    capacity: '100 MWp',
    location: 'Saraburi, Thailand',
    createdAt: now,
    updatedAt: now,

    criteria: [
      { id: c1, name: 'Technical Compliance', category: 'technical', weight: 12, description: 'Compliance with technical specs: module selection, inverter sizing, DC/AC ratio, string design, and grid code requirements' },
      { id: c2, name: 'Track Record & Experience', category: 'technical', weight: 12, description: 'Completed solar projects of similar scale (>50 MW) in Southeast Asia within last 5 years' },
      { id: c3, name: 'Proposed Equipment', category: 'technical', weight: 12, description: 'Module brand/tier, inverter manufacturer, tracker vs fixed-tilt, BOS component quality' },
      { id: c4, name: 'Project Schedule', category: 'technical', weight: 8, description: 'Construction timeline from NTP to COD, milestones, critical path, and liquidated damages' },
      { id: c5, name: 'Team & Key Personnel', category: 'technical', weight: 6, description: 'Project Manager, Site Manager, QA/QC Manager, and Commissioning Lead qualifications' },
      { id: c6, name: 'Total Price (EPC)', category: 'commercial', weight: 20, description: 'Lump sum EPC price including all works, equipment, testing, commissioning, and 2-year defects liability period' },
      { id: c7, name: 'Payment Terms', category: 'commercial', weight: 5, description: 'Payment milestone schedule, advance payment requirement, retention, and bank guarantee' },
      { id: c8, name: 'Warranty & Performance Guarantee', category: 'commercial', weight: 10, description: 'Equipment warranties, workmanship warranty, PR guarantee, availability guarantee, and LD structure' },
      { id: c9, name: 'Contract Terms & Conditions', category: 'commercial', weight: 5, description: 'Risk allocation, force majeure, change order mechanism, dispute resolution, and governing law' },
      { id: c10, name: 'HSE & Environmental', category: 'other', weight: 4, description: 'HSE plan, waste management, environmental compliance, and community impact mitigation' },
      { id: c11, name: 'Local Content & Subcontractors', category: 'other', weight: 3, description: 'Use of local labor, Thai subcontractors, local procurement, and technology transfer' },
      { id: c12, name: 'Financial Strength', category: 'other', weight: 3, description: 'Company financial statements, bonding capacity, parent company guarantee, and credit rating' },
    ],

    bidders: [
      { id: b1, name: 'Bidder A — Sinohydro', company: 'Sinohydro Corporation (PowerChina Group)', contact: 'Mr. Wang Lei', notes: 'Major Chinese EPC, extensive solar portfolio in SEA. Proposed Tier-1 Longi modules + Sungrow inverters.' },
      { id: b2, name: 'Bidder B — BELECTRIC', company: 'BELECTRIC GmbH (Germany)', contact: 'Mr. Thomas Mueller', notes: 'European specialist EPC. Premium equipment selection: JA Solar + SMA inverters. Higher price but strong track record.' },
      { id: b3, name: 'Bidder C — B.Grimm EPC', company: 'B.Grimm Power PCL (Thailand)', contact: 'Khun Somchai P.', notes: 'Thai developer/EPC with own O&M capability. Local knowledge advantage. Proposed Canadian Solar + Huawei inverters.' },
      { id: b4, name: 'Bidder D — Symbior Solar', company: 'Symbior Solar (Singapore/Thailand)', contact: 'Mr. Alex Tan', notes: 'Regional EPC focused on SEA markets. Strong commissioning team. Proposed Jinko modules + GoodWe inverters.' },
    ],

    scores: {
      // Bidder A — Sinohydro (Strong technical, competitive price, weaker on warranty)
      [b1]: {
        [c1]:  { score: 4, comment: 'Fully compliant technical proposal. DC/AC ratio 1.28, well-optimized string design. Grid code compliance confirmed.' },
        [c2]:  { score: 5, comment: '12 solar projects >50MW completed in SEA (Vietnam, Cambodia, Thailand). Strong reference from 150MW Binh Phuoc project.' },
        [c3]:  { score: 4, comment: 'Longi Hi-MO 6 (580W, Tier-1) + Sungrow SG320HX string inverters. Fixed-tilt aluminum structure. All proven components.' },
        [c4]:  { score: 4, comment: '12-month schedule NTP to COD. Reasonable milestones. Committed to 500 workers during peak. LD at 0.1%/day capped 10%.' },
        [c5]:  { score: 3, comment: 'PM has 8 years experience but not in Thailand specifically. Site Manager is Thai national. QA/QC Manager to be confirmed.' },
        [c6]:  { score: 5, comment: 'THB 2,450M (~$0.68/Wp). Most competitive price. Includes all scope, testing, commissioning, and spare parts.' },
        [c7]:  { score: 4, comment: '15% advance with bank guarantee, milestone-based payments, 5% retention released at PAC. Acceptable structure.' },
        [c8]:  { score: 3, comment: '2-year workmanship warranty only. PR guarantee 80.5% Year 1, 0.5%/yr degradation. No availability guarantee offered.' },
        [c9]:  { score: 3, comment: 'Some pushback on LD caps and force majeure definition. Change order mechanism needs negotiation. ICC arbitration Singapore.' },
        [c10]: { score: 3, comment: 'Basic HSE plan submitted. Environmental compliance confirmed but waste management plan needs more detail.' },
        [c11]: { score: 4, comment: 'Committed to 70% local labor. 3 Thai subcontractors identified for civil and electrical works.' },
        [c12]: { score: 5, comment: 'PowerChina Group parent guarantee. Revenue >$50B. Strong bonding capacity. Investment-grade credit rating.' },
      },

      // Bidder B — BELECTRIC (Premium quality, expensive, strong warranty)
      [b2]: {
        [c1]:  { score: 5, comment: 'Excellent technical proposal with detailed engineering. PVsyst simulation attached. DC/AC 1.25, conservative but optimal.' },
        [c2]:  { score: 4, comment: '8 projects >50MW globally, but only 2 in SEA (Philippines, Vietnam). Strong European track record (>2GW installed).' },
        [c3]:  { score: 5, comment: 'JA Solar DeepBlue 4.0 (625W) + SMA Sunny Central 4000UP. Premium BOS. Single-axis tracker proposed — higher yield.' },
        [c4]:  { score: 3, comment: '14-month schedule — longest among bidders. Claims tracker installation requires more time. LD at 0.15%/day capped 15%.' },
        [c5]:  { score: 5, comment: 'Outstanding team. PM led 200MW project in Vietnam. Dedicated German commissioning lead. Full team CVs provided.' },
        [c6]:  { score: 2, comment: 'THB 3,180M (~$0.88/Wp). Highest price, 30% above lowest bidder. Tracker adds cost but claims 8-12% yield gain.' },
        [c7]:  { score: 3, comment: '20% advance payment required. Milestone payments front-loaded. 10% retention — higher than market standard.' },
        [c8]:  { score: 5, comment: '5-year workmanship warranty. PR guarantee 82% Year 1. Availability guarantee 99%. Comprehensive LD structure.' },
        [c9]:  { score: 5, comment: 'Clean contract mark-up. Balanced risk allocation. Well-defined change order process. ICC arbitration Singapore.' },
        [c10]: { score: 5, comment: 'Comprehensive HSE plan with ISO 45001 certification. Detailed environmental management plan with monitoring program.' },
        [c11]: { score: 2, comment: 'Limited local content commitment. Key personnel all expatriate. Subcontractor selection pending. Minimal tech transfer.' },
        [c12]: { score: 4, comment: 'Parent company guarantee from Elevion Group. Solid financials but smaller company compared to Chinese EPC.' },
      },

      // Bidder C — B.Grimm EPC (Local advantage, good overall, mid-range price)
      [b3]: {
        [c1]:  { score: 4, comment: 'Good technical proposal. DC/AC ratio 1.30. String design follows EGAT requirements. Fully grid code compliant.' },
        [c2]:  { score: 4, comment: '6 solar projects in Thailand (30-90MW range). Deep understanding of PEA/EGAT interconnection process. Repeat Thai client base.' },
        [c3]:  { score: 4, comment: 'Canadian Solar HiKu7 (600W, Tier-1) + Huawei SUN2000-330KTL. Fixed-tilt galvanized steel structure. Proven in Thai climate.' },
        [c4]:  { score: 5, comment: '10-month schedule — fastest. Local supply chain and familiar permitting process. Already has relationships with Thai utilities.' },
        [c5]:  { score: 4, comment: 'All-Thai senior team with prior B.Grimm project experience. PM led 90MW Rayong solar farm. Strong local network.' },
        [c6]:  { score: 4, comment: 'THB 2,680M (~$0.74/Wp). Competitive mid-range. Includes grid connection works which others excluded.' },
        [c7]:  { score: 5, comment: '10% advance only. Balanced milestone schedule. 5% retention. Willing to accept payment upon PAC certificate.' },
        [c8]:  { score: 4, comment: '3-year workmanship warranty. PR guarantee 81% Year 1. Availability guarantee 98.5%. Own O&M team can extend warranty.' },
        [c9]:  { score: 4, comment: 'Thai law governing contract. Familiar with standard Thai EPC terms. Minor comments only. THAC arbitration Bangkok.' },
        [c10]: { score: 4, comment: 'Good HSE record in Thailand. EIA compliance team in-house. Community engagement experience from prior projects.' },
        [c11]: { score: 5, comment: 'Thai company. 90%+ local content. All subcontractors are Thai. Training program for local workers included.' },
        [c12]: { score: 4, comment: 'Listed on SET (Stock Exchange of Thailand). B.Grimm Group backing. Annual revenue >THB 50B. Solid regional player.' },
      },

      // Bidder D — Symbior Solar (Good but limited scale experience)
      [b4]: {
        [c1]:  { score: 3, comment: 'Adequate technical proposal but some gaps in detailed engineering. Inverter sizing needs review. String configuration suboptimal.' },
        [c2]:  { score: 3, comment: '4 projects completed but largest was 45MW (below 50MW threshold). Growing company but limited large-scale experience.' },
        [c3]:  { score: 3, comment: 'Jinko Tiger Neo (580W, Tier-1) acceptable, but GoodWe inverters are Tier-2. BOS components from lesser-known suppliers.' },
        [c4]:  { score: 4, comment: '11-month schedule. Reasonable timeline. Good resource plan. LD at 0.1%/day capped 10%.' },
        [c5]:  { score: 3, comment: 'PM has 5 years experience. Site Manager experienced in smaller projects. Commissioning lead CV not yet submitted.' },
        [c6]:  { score: 4, comment: 'THB 2,520M (~$0.70/Wp). Second lowest price. Good value but equipment quality reflects lower cost.' },
        [c7]:  { score: 4, comment: '15% advance with bank guarantee. Standard milestone schedule. 5% retention. Acceptable terms overall.' },
        [c8]:  { score: 3, comment: '2-year workmanship warranty. PR guarantee 80% Year 1. No availability guarantee. GoodWe warranty only 5 years.' },
        [c9]:  { score: 3, comment: 'Several deviations from draft contract. Cap on total liability proposed at 50% contract value. Needs negotiation.' },
        [c10]: { score: 3, comment: 'Basic HSE plan. No ISO certification. Environmental plan meets minimum requirements but not detailed.' },
        [c11]: { score: 4, comment: 'Singapore HQ but Thailand operations established. 60% local labor commitment. 2 Thai subcontractors confirmed.' },
        [c12]: { score: 2, comment: 'Private company, limited financial disclosure. No parent company guarantee available. Bonding capacity uncertain for 100MW scale.' },
      },
    },

    commercial: {
      [b1]: {
        totalPrice: 2450000000,
        currency: 'THB',
        pricePerMW: 24500000,
        pricePerWp: 0.68,
        capex: 2450000000,
        opex: 0,
        warranty: '2 years workmanship',
        deliveryWeeks: 52,
        notes: 'Most competitive. Price fixed, no escalation. Includes spare parts inventory. Grid connection excluded.',
      },
      [b2]: {
        totalPrice: 3180000000,
        currency: 'THB',
        pricePerMW: 31800000,
        pricePerWp: 0.88,
        capex: 3180000000,
        opex: 0,
        warranty: '5 years workmanship + performance',
        deliveryWeeks: 60,
        notes: 'Highest price but includes single-axis tracker (+8-12% yield). Premium equipment. 5-year comprehensive warranty included.',
      },
      [b3]: {
        totalPrice: 2680000000,
        currency: 'THB',
        pricePerMW: 26800000,
        pricePerWp: 0.74,
        capex: 2680000000,
        opex: 0,
        warranty: '3 years workmanship + availability',
        deliveryWeeks: 44,
        notes: 'Includes grid connection works (others excluded). Fastest delivery. Optional 5-year O&M package available at THB 35M/year.',
      },
      [b4]: {
        totalPrice: 2520000000,
        currency: 'THB',
        pricePerMW: 25200000,
        pricePerWp: 0.70,
        capex: 2520000000,
        opex: 0,
        warranty: '2 years workmanship',
        deliveryWeeks: 48,
        notes: 'Second lowest price. Good value on paper but GoodWe inverter warranty only 5 years (vs 10-year industry standard).',
      },
    },

    recommendation: `Based on the weighted evaluation of four bidders for the 100 MWp Saraburi Solar Farm EPC contract, the evaluation committee recommends Bidder C — B.Grimm EPC for contract award, subject to final commercial negotiation.

Key factors supporting this recommendation:

1. BEST OVERALL VALUE — While not the cheapest, B.Grimm offers the best balance of price (THB 2,680M), quality, and risk mitigation. Their price includes grid connection works which other bidders excluded (est. THB 80-120M additional cost).

2. FASTEST DELIVERY — 10-month schedule vs 12-14 months for other bidders, enabling earlier COD and revenue generation. Their familiarity with Thai permitting and utility interconnection reduces schedule risk significantly.

3. LOCAL EXPERTISE — As a Thai company with 90%+ local content, B.Grimm eliminates import/visa/work permit risks and brings established relationships with PEA/EGAT for grid connection approvals.

4. STRONG WARRANTY — 3-year workmanship warranty with availability guarantee, backed by their own O&M capability. Optional 5-year O&M package provides long-term operational security.

5. LOWEST RISK — Thai law contract, local dispute resolution, listed company with transparent financials, and proven track record in Thailand specifically.

Note: Bidder A (Sinohydro) is recommended as reserve bidder due to the most competitive pricing, subject to warranty enhancement negotiation.

Bidder B (BELECTRIC) offers premium quality but the 30% price premium and longer schedule do not justify the additional cost for this project scale. The single-axis tracker option should be reconsidered if yield optimization becomes a priority.

Bidder D (Symbior Solar) is not recommended due to limited large-scale experience and financial capacity concerns for a 100MW project.`,
  }
}
