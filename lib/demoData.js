/**
 * Demo data — 100 MW Solar Farm EPC Bid Evaluation
 * UL-style compliance scoring (0/25/50/75/100)
 * Based on real IRPCCP evaluation structure
 */

export function createDemoProject() {
  const now = new Date().toISOString()

  // Bidder IDs
  const b1 = 'demo_b1'
  const b2 = 'demo_b2'
  const b3 = 'demo_b3'

  // Criteria IDs — mapped to UL Solar EPC structure
  // I. General (5%)
  const g1 = 'dg1', g2 = 'dg2', g3 = 'dg3', g4 = 'dg4', g5 = 'dg5', g6 = 'dg6'
  // II.1 Engineering Design (8%)
  const t1 = 'dt1', t2 = 'dt2', t3 = 'dt3', t4 = 'dt4'
  // II.2 Performance & Yield (10%)
  const t5 = 'dt5', t6 = 'dt6', t7 = 'dt7', t8 = 'dt8', t9 = 'dt9'
  // II.3 Main Equipment (10%)
  const t10 = 'dt10', t11 = 'dt11', t12 = 'dt12'
  // II.4 Mechanical (8%)
  const t13 = 'dt13', t14 = 'dt14', t15 = 'dt15', t16 = 'dt16'
  // II.5 Civil (10%)
  const t17 = 'dt17', t18 = 'dt18', t19 = 'dt19', t20 = 'dt20', t21 = 'dt21', t22 = 'dt22', t23 = 'dt23', t24 = 'dt24', t25 = 'dt25', t26 = 'dt26'
  // II.6 Electrical (10%)
  const t27 = 'dt27', t28 = 'dt28', t29 = 'dt29', t30 = 'dt30', t31 = 'dt31', t32 = 'dt32', t33 = 'dt33', t34 = 'dt34'
  // II.7 SCADA (8%)
  const t35 = 'dt35', t36 = 'dt36', t37 = 'dt37', t38 = 'dt38', t39 = 'dt39', t40 = 'dt40', t41 = 'dt41'
  // III. HSE (5%)
  const h1 = 'dh1', h2 = 'dh2', h3 = 'dh3', h4 = 'dh4'
  // IV. Schedule (10%)
  const s1 = 'ds1', s2 = 'ds2', s3 = 'ds3', s4 = 'ds4', s5 = 'ds5'
  // V. QA/QC (6%)
  const q1 = 'dq1', q2 = 'dq2', q3 = 'dq3', q4 = 'dq4', q5 = 'dq5', q6 = 'dq6', q7 = 'dq7', q8 = 'dq8'
  // VI. O&M (5%)
  const o1 = 'do1', o2 = 'do2', o3 = 'do3', o4 = 'do4', o5 = 'do5', o6 = 'do6'
  // VII. Contract (5%)
  const k1 = 'dk1', k2 = 'dk2', k3 = 'dk3', k4 = 'dk4', k5 = 'dk5', k6 = 'dk6'

  return {
    id: 'demo_solar_epc',
    name: 'Nathap Solar Project — 100 MW EPC Evaluation',
    client: 'Alpha Energy Co., Ltd.',
    projectType: 'solar_epc',
    capacity: '100 MWdc / 80 MWac',
    location: 'Nakhon Ratchasima, Thailand',
    scoringMode: 'compliance',
    includeCommercial: false,
    createdAt: now,
    updatedAt: now,

    bidders: [
      { id: b1, name: 'BSP', company: 'Bangkok Solar Power Co., Ltd.', contact: '', notes: 'Thai EPC, strong local presence' },
      { id: b2, name: 'Getz', company: 'Getz Energy Solutions Co., Ltd.', contact: '', notes: 'PTT subsidiary, large portfolio' },
      { id: b3, name: 'SunTech', company: 'SunTech Engineering Co., Ltd.', contact: '', notes: 'New entrant, competitive pricing' },
    ],

    criteria: [
      // I. General Requirements (5%)
      { id: g1, name: 'Company Profile & Financial Standing', category: 'general', weight: 1, section: 'I' },
      { id: g2, name: 'Relevant EPC Experience & Track Record', category: 'general', weight: 1, section: 'I' },
      { id: g3, name: 'Project Team Organization & Key Personnel', category: 'general', weight: 1, section: 'I' },
      { id: g4, name: 'Project Management & Compliance Documentation', category: 'general', weight: 0.5, section: 'I' },
      { id: g5, name: 'Subcontractors Profile & Capability', category: 'general', weight: 0.5, section: 'I' },
      { id: g6, name: 'Current Capabilities (Projects on Hand)', category: 'general', weight: 1, section: 'I' },

      // II.1 Overall Engineering Design (8%)
      { id: t1, name: 'PV Layout Design & Array Configuration', category: 'technical', weight: 2, section: 'II.1' },
      { id: t2, name: 'Quality of Drawing Packages', category: 'technical', weight: 2, section: 'II.1' },
      { id: t3, name: 'Master Document List (MDL)', category: 'technical', weight: 2, section: 'II.1' },
      { id: t4, name: 'Document Management & Numbering System', category: 'technical', weight: 2, section: 'II.1' },

      // II.2 Performance & Energy Yield (10%)
      { id: t5, name: 'Project Capacity (DC and AC)', category: 'technical', weight: 2, section: 'II.2' },
      { id: t6, name: 'Guaranteed Performance Ratio', category: 'technical', weight: 2, section: 'II.2' },
      { id: t7, name: 'Energy Yield Simulation Parameters', category: 'technical', weight: 2, section: 'II.2' },
      { id: t8, name: 'Estimated Energy Production (kWh)', category: 'technical', weight: 2, section: 'II.2' },
      { id: t9, name: 'Specific Yield & Data Sources', category: 'technical', weight: 2, section: 'II.2' },

      // II.3 Main PV Equipment (10%)
      { id: t10, name: 'PV Module Specification & Suitability', category: 'technical', weight: 4, section: 'II.3' },
      { id: t11, name: 'Inverter Specification & Suitability', category: 'technical', weight: 4, section: 'II.3' },
      { id: t12, name: 'Weather Monitoring Station', category: 'technical', weight: 2, section: 'II.3' },

      // II.4 Mechanical Works (8%)
      { id: t13, name: 'General Mechanical Requirements', category: 'technical', weight: 2, section: 'II.4' },
      { id: t14, name: 'Fire Protection System', category: 'technical', weight: 2, section: 'II.4' },
      { id: t15, name: 'HVAC System Provisions', category: 'technical', weight: 2, section: 'II.4' },
      { id: t16, name: 'Plumbing & Drainage System', category: 'technical', weight: 2, section: 'II.4' },

      // II.5 Civil Works (10%)
      { id: t17, name: 'Site Preparation Methodology', category: 'technical', weight: 1, section: 'II.5' },
      { id: t18, name: 'Water Drainage Arrangement', category: 'technical', weight: 1, section: 'II.5' },
      { id: t19, name: 'Mounting Structure Design', category: 'technical', weight: 1, section: 'II.5' },
      { id: t20, name: 'Pile Foundation & Load Testing', category: 'technical', weight: 1, section: 'II.5' },
      { id: t21, name: 'Corrosion Protection', category: 'technical', weight: 1, section: 'II.5' },
      { id: t22, name: 'Internal Roads & Access Design', category: 'technical', weight: 1, section: 'II.5' },
      { id: t23, name: 'Drainage System Design', category: 'technical', weight: 1, section: 'II.5' },
      { id: t24, name: 'Building Design (Inverter/MV/WTP)', category: 'technical', weight: 1, section: 'II.5' },
      { id: t25, name: 'Substation Building Design', category: 'technical', weight: 1, section: 'II.5' },
      { id: t26, name: 'Fence, Gate & Guardhouse Design', category: 'technical', weight: 1, section: 'II.5' },

      // II.6 Electrical Works (10%)
      { id: t27, name: 'Overall Electrical Design', category: 'technical', weight: 1.5, section: 'II.6' },
      { id: t28, name: 'Substation Electrical Design', category: 'technical', weight: 1.5, section: 'II.6' },
      { id: t29, name: 'MV Transmission Line Design', category: 'technical', weight: 1, section: 'II.6' },
      { id: t30, name: 'HV & MV Transformer Specification', category: 'technical', weight: 1.5, section: 'II.6' },
      { id: t31, name: 'GIS Switchgear Specification', category: 'technical', weight: 1.5, section: 'II.6' },
      { id: t32, name: 'Cable Specification (DC/AC/MV)', category: 'technical', weight: 1, section: 'II.6' },
      { id: t33, name: 'Lightning Protection & Grounding', category: 'technical', weight: 1, section: 'II.6' },
      { id: t34, name: 'Protection System', category: 'technical', weight: 1, section: 'II.6' },

      // II.7 Control & Monitoring (8%)
      { id: t35, name: 'SCADA ER/PEA/EGAT Compliance', category: 'technical', weight: 2, section: 'II.7' },
      { id: t36, name: 'SCADA Network Architecture', category: 'technical', weight: 1, section: 'II.7' },
      { id: t37, name: 'Power Plant Controller (PPC)', category: 'technical', weight: 1.5, section: 'II.7' },
      { id: t38, name: 'Cybersecurity & Remote Access', category: 'technical', weight: 1, section: 'II.7' },
      { id: t39, name: 'SCADA Server & Platform', category: 'technical', weight: 1, section: 'II.7' },
      { id: t40, name: 'Field Monitoring Equipment', category: 'technical', weight: 0.5, section: 'II.7' },
      { id: t41, name: 'Software Ownership & Licensing', category: 'technical', weight: 1, section: 'II.7' },

      // III. HSE (5%)
      { id: h1, name: 'Company Safety Policy', category: 'hse', weight: 1, section: 'III' },
      { id: h2, name: 'HSE Organization & Team', category: 'hse', weight: 1, section: 'III' },
      { id: h3, name: 'Safety Method Statement / JHA', category: 'hse', weight: 1.5, section: 'III' },
      { id: h4, name: 'HSE Management Plan', category: 'hse', weight: 1.5, section: 'III' },

      // IV. Work Program (10%)
      { id: s1, name: 'Overall Project Schedule', category: 'schedule', weight: 2.5, section: 'IV' },
      { id: s2, name: 'Engineering Design Schedule', category: 'schedule', weight: 1.5, section: 'IV' },
      { id: s3, name: 'Procurement Schedule', category: 'schedule', weight: 2, section: 'IV' },
      { id: s4, name: 'Construction & Commissioning Schedule', category: 'schedule', weight: 2.5, section: 'IV' },
      { id: s5, name: 'Mobilization & Manpower Loading', category: 'schedule', weight: 1.5, section: 'IV' },

      // V. QA/QC (6%)
      { id: q1, name: 'Material & Equipment Compliance', category: 'qaqc', weight: 0.75, section: 'V' },
      { id: q2, name: 'Incoming Material Inspection', category: 'qaqc', weight: 0.75, section: 'V' },
      { id: q3, name: 'Construction Quality Control', category: 'qaqc', weight: 1, section: 'V' },
      { id: q4, name: 'Testing & Commissioning Protocols', category: 'qaqc', weight: 1, section: 'V' },
      { id: q5, name: 'Non-Conformance & Corrective Action', category: 'qaqc', weight: 0.75, section: 'V' },
      { id: q6, name: 'Documentation & Digital Reporting', category: 'qaqc', weight: 0.5, section: 'V' },
      { id: q7, name: 'QA/QC Personnel Competency', category: 'qaqc', weight: 0.5, section: 'V' },
      { id: q8, name: 'Risk Management Plan', category: 'qaqc', weight: 0.75, section: 'V' },

      // VI. O&M (5%)
      { id: o1, name: 'Guaranteed Plant Availability (%)', category: 'om', weight: 1, section: 'VI' },
      { id: o2, name: 'O&M Capabilities & Organization', category: 'om', weight: 1, section: 'VI' },
      { id: o3, name: 'Preventive & Corrective Program', category: 'om', weight: 0.75, section: 'VI' },
      { id: o4, name: 'Spare Parts & Tools', category: 'om', weight: 0.75, section: 'VI' },
      { id: o5, name: 'O&M Management Plan & Training', category: 'om', weight: 0.75, section: 'VI' },
      { id: o6, name: 'Permits & Licenses', category: 'om', weight: 0.75, section: 'VI' },

      // VII. Contract (5%)
      { id: k1, name: 'Payment Milestones', category: 'contract', weight: 1, section: 'VII' },
      { id: k2, name: 'Defect Liability Period', category: 'contract', weight: 1, section: 'VII' },
      { id: k3, name: 'Performance Liquidated Damages', category: 'contract', weight: 1, section: 'VII' },
      { id: k4, name: 'Delay Liquidated Damages', category: 'contract', weight: 0.75, section: 'VII' },
      { id: k5, name: 'Limitation of Liability', category: 'contract', weight: 0.5, section: 'VII' },
      { id: k6, name: 'Insurance Requirements', category: 'contract', weight: 0.75, section: 'VII' },
    ],

    scores: {
      // BSP — Strong overall, weakness in electrical/SCADA
      [b1]: {
        [g1]: { score: 75, comment: 'Revenue 686M, 587M, 461M — stable but declining' },
        [g2]: { score: 100, comment: 'Experience as Turnkey EPC, multiple solar projects >50MW' },
        [g3]: { score: 75, comment: 'All personnel qualified, some overlap with other projects' },
        [g4]: { score: 100, comment: 'All supporting documents submitted completely' },
        [g5]: { score: 100, comment: '15 subcontractors with proven track record' },
        [g6]: { score: 100, comment: '6 projects under execution, capacity available' },
        [t1]: { score: 100, comment: 'Layout follows good practice, sufficient row spacing' },
        [t2]: { score: 100, comment: 'Drawing packages complete and detailed' },
        [t3]: { score: 75, comment: 'MDL submitted but some documents pending revision' },
        [t4]: { score: 100, comment: 'Clear numbering system per international standard' },
        [t5]: { score: 100, comment: 'DC/AC capacity meets ER requirements' },
        [t6]: { score: 100, comment: 'PR COD=83.5%, 1st yr=83.5%, 2nd yr=82.8%' },
        [t7]: { score: 100, comment: 'All loss parameters justified with methodology' },
        [t8]: { score: 100, comment: '1st year energy = 157,540,000 kWh' },
        [t9]: { score: 100, comment: 'Modelling methodology follows ER requirements' },
        [t10]: { score: 75, comment: 'Same model as bidding package, meets spec but Tier 2' },
        [t11]: { score: 75, comment: 'Inverter meets spec but limited local service center' },
        [t12]: { score: 75, comment: '3 met stations provided, datasheet OK' },
        [t13]: { score: 75, comment: 'T-8 does not show detailed mechanical requirements' },
        [t14]: { score: 75, comment: 'Concept design provided but lacks detail' },
        [t15]: { score: 75, comment: 'Most HVAC provisions match ER requirements' },
        [t16]: { score: 75, comment: 'Sewage treatment not included in T-8' },
        [t17]: { score: 100, comment: 'Method statement covers all site prep activities' },
        [t18]: { score: 75, comment: 'Only covers modification scope, not comprehensive' },
        [t19]: { score: 100, comment: 'PV configurations analysed with wind loading calc' },
        [t20]: { score: 100, comment: 'Testing plan provided in ITP, criteria clear' },
        [t21]: { score: 100, comment: 'Hot-dip galvanizing meets international standard' },
        [t22]: { score: 75, comment: 'Road design per local standard, some gaps in turning radius' },
        [t23]: { score: 100, comment: 'All drainage details comprehensive' },
        [t24]: { score: 75, comment: 'Comprehensive design but some details pending' },
        [t25]: { score: 75, comment: 'GIS building drawing provided but layout tight' },
        [t26]: { score: 75, comment: 'Almost fully comply with ER' },
        [t27]: { score: 50, comment: 'SLD incomplete, inverter grouping needs revision' },
        [t28]: { score: 75, comment: 'Substation layout OK, cable routing needs work' },
        [t29]: { score: 50, comment: 'MV route not fully optimized' },
        [t30]: { score: 75, comment: 'Transformer spec acceptable' },
        [t31]: { score: 75, comment: 'GIS switchgear meets requirements' },
        [t32]: { score: 75, comment: 'Cable sizing OK' },
        [t33]: { score: 50, comment: 'LPS design needs improvement' },
        [t34]: { score: 50, comment: 'Protection philosophy submitted but very detailed — needs review' },
        [t35]: { score: 50, comment: 'Document partially meets PEA requirements' },
        [t36]: { score: 50, comment: 'Network design partially meets redundancy requirements' },
        [t37]: { score: 50, comment: 'PPC solution complies but details lacking' },
        [t38]: { score: 75, comment: 'Cybersecurity measures confirmed via tech clarification' },
        [t39]: { score: 75, comment: 'Adequate server infrastructure' },
        [t40]: { score: 75, comment: 'High-performance met equipment proposed' },
        [t41]: { score: 100, comment: 'Full license ownership confirmed' },
        [h1]: { score: 100, comment: 'Safety policy well-established, good track record' },
        [h2]: { score: 100, comment: 'HSE team roles clearly defined' },
        [h3]: { score: 100, comment: 'JHA for typical solar project activities included' },
        [h4]: { score: 100, comment: 'Comprehensive HSE management plan' },
        [s1]: { score: 100, comment: 'Comprehensive schedule, critical path identified' },
        [s2]: { score: 100, comment: 'Detailed engineering schedule breakdown' },
        [s3]: { score: 75, comment: 'Major components covered, some gaps in long-lead items' },
        [s4]: { score: 100, comment: 'Detailed breakdown by land plots' },
        [s5]: { score: 75, comment: 'Mobilization plan OK, manpower histogram provided' },
        [q1]: { score: 100, comment: 'Quality manuals and procedures well-established' },
        [q2]: { score: 100, comment: 'Inspection and traceability procedures in place' },
        [q3]: { score: 100, comment: 'ITPs for civil, electrical works complete' },
        [q4]: { score: 100, comment: 'Comprehensive testing protocols' },
        [q5]: { score: 100, comment: 'NCR process described' },
        [q6]: { score: 100, comment: 'Documentation control well-identified' },
        [q7]: { score: 100, comment: 'Training records available' },
        [q8]: { score: 100, comment: 'Risk management and quality control integrated' },
        [o1]: { score: 100, comment: 'Guaranteed 99.0% availability Years 1-5' },
        [o2]: { score: 100, comment: 'Strong O&M track record and local presence' },
        [o3]: { score: 100, comment: 'Preventive maintenance program detailed' },
        [o4]: { score: 100, comment: 'Comprehensive spare parts list provided' },
        [o5]: { score: 100, comment: 'O&M manual and training program included' },
        [o6]: { score: 100, comment: 'All permits and licenses covered' },
        [k1]: { score: 100, comment: 'Fully compliant with contract requirements' },
        [k2]: { score: 100, comment: 'DLP terms accepted' },
        [k3]: { score: 100, comment: 'Performance LD rates accepted' },
        [k4]: { score: 100, comment: 'Delay LD terms accepted' },
        [k5]: { score: 100, comment: 'LoL terms accepted' },
        [k6]: { score: 100, comment: 'Insurance requirements fully complied' },
      },

      // Getz — Good general, weaker technical details
      [b2]: {
        [g1]: { score: 100, comment: 'PTT subsidiary, strong financial backing' },
        [g2]: { score: 75, comment: 'EPC turnkey for solar but fewer large-scale projects' },
        [g3]: { score: 100, comment: 'All personnel well-qualified and dedicated' },
        [g4]: { score: 75, comment: 'Most documents submitted, some minor gaps' },
        [g5]: { score: 75, comment: '7 subcontractors, adequate but less depth' },
        [g6]: { score: 75, comment: '4 projects on hand, moderate capacity' },
        [t1]: { score: 75, comment: 'Layout acceptable but row spacing tight' },
        [t2]: { score: 75, comment: 'Drawings adequate but less detailed than BSP' },
        [t3]: { score: 50, comment: 'MDL incomplete, several documents missing' },
        [t4]: { score: 75, comment: 'Standard numbering system in place' },
        [t5]: { score: 100, comment: 'Capacity meets requirements' },
        [t6]: { score: 75, comment: 'PR guarantee slightly below expectation' },
        [t7]: { score: 75, comment: 'Some loss parameters need clarification' },
        [t8]: { score: 75, comment: 'Energy estimate reasonable but conservative' },
        [t9]: { score: 75, comment: 'Methodology OK but data source could be stronger' },
        [t10]: { score: 75, comment: 'Tier 1 module but different model from bidding' },
        [t11]: { score: 75, comment: 'Inverter meets spec, Huawei platform' },
        [t12]: { score: 75, comment: '2 met stations — minimum requirement' },
        [t13]: { score: 75, comment: 'General compliance demonstrated' },
        [t14]: { score: 75, comment: 'Fire protection concept acceptable' },
        [t15]: { score: 75, comment: 'HVAC provisions adequate' },
        [t16]: { score: 50, comment: 'Drainage system details insufficient' },
        [t17]: { score: 75, comment: 'Site prep methodology acceptable' },
        [t18]: { score: 75, comment: 'Drainage arrangement basic but compliant' },
        [t19]: { score: 75, comment: 'Fixed-tilt structure, standard design' },
        [t20]: { score: 75, comment: 'Load testing criteria provided' },
        [t21]: { score: 100, comment: 'Materials exceed corrosion protection requirements' },
        [t22]: { score: 75, comment: 'Road design meets minimum requirements' },
        [t23]: { score: 75, comment: 'Basic drainage design' },
        [t24]: { score: 75, comment: 'Building designs standard' },
        [t25]: { score: 75, comment: 'Substation building adequate' },
        [t26]: { score: 75, comment: 'Fence and gate design acceptable' },
        [t27]: { score: 75, comment: 'SLD complete but some optimization needed' },
        [t28]: { score: 75, comment: 'Substation design acceptable' },
        [t29]: { score: 50, comment: 'MV route needs optimization' },
        [t30]: { score: 75, comment: 'Transformer spec meets requirements' },
        [t31]: { score: 75, comment: 'GIS switchgear compliant' },
        [t32]: { score: 75, comment: 'Cable specification adequate' },
        [t33]: { score: 50, comment: 'Lightning protection needs improvement' },
        [t34]: { score: 75, comment: 'Protection philosophy well-detailed' },
        [t35]: { score: 50, comment: 'SCADA compliance partially demonstrated' },
        [t36]: { score: 50, comment: 'Network architecture needs more redundancy' },
        [t37]: { score: 50, comment: 'PPC solution basic' },
        [t38]: { score: 75, comment: 'Cybersecurity adequate' },
        [t39]: { score: 75, comment: 'SCADA server spec OK' },
        [t40]: { score: 75, comment: 'Monitoring equipment acceptable' },
        [t41]: { score: 75, comment: 'License terms mostly clarified' },
        [h1]: { score: 100, comment: 'PTT-level safety culture, excellent record' },
        [h2]: { score: 100, comment: 'Well-structured HSE team' },
        [h3]: { score: 100, comment: 'Comprehensive JHA and method statements' },
        [h4]: { score: 100, comment: 'HSE management plan meets all requirements' },
        [s1]: { score: 75, comment: 'Schedule provided but less detailed' },
        [s2]: { score: 75, comment: 'Engineering schedule adequate' },
        [s3]: { score: 75, comment: 'Procurement plan covers main items' },
        [s4]: { score: 75, comment: 'Construction schedule reasonable' },
        [s5]: { score: 75, comment: 'Mobilization plan acceptable' },
        [q1]: { score: 75, comment: 'QMS in place but less documented' },
        [q2]: { score: 75, comment: 'Incoming inspection procedures exist' },
        [q3]: { score: 75, comment: 'ITP provided but less comprehensive' },
        [q4]: { score: 75, comment: 'Testing protocols standard' },
        [q5]: { score: 75, comment: 'NCR process described' },
        [q6]: { score: 75, comment: 'Documentation system adequate' },
        [q7]: { score: 75, comment: 'Team qualifications verified' },
        [q8]: { score: 75, comment: 'Basic risk management approach' },
        [o1]: { score: 100, comment: 'Guaranteed 99.0% availability' },
        [o2]: { score: 75, comment: 'O&M team proposed but less local experience' },
        [o3]: { score: 75, comment: 'Standard preventive maintenance program' },
        [o4]: { score: 75, comment: 'Spare parts list provided' },
        [o5]: { score: 75, comment: 'O&M manual standard format' },
        [o6]: { score: 75, comment: 'Permits covered with some conditions' },
        [k1]: { score: 100, comment: 'Payment milestone terms accepted' },
        [k2]: { score: 100, comment: 'DLP terms compliant' },
        [k3]: { score: 100, comment: 'Performance LD accepted' },
        [k4]: { score: 100, comment: 'Delay LD terms accepted' },
        [k5]: { score: 100, comment: 'LoL terms accepted' },
        [k6]: { score: 100, comment: 'Insurance fully compliant' },
      },

      // SunTech — New entrant, gaps in experience and technical
      [b3]: {
        [g1]: { score: 50, comment: 'Newer company, limited financial history' },
        [g2]: { score: 50, comment: 'Only 2 completed solar projects, both <30MW' },
        [g3]: { score: 75, comment: 'Good team proposed but key PM has limited large-scale exp' },
        [g4]: { score: 50, comment: 'Several required documents not submitted' },
        [g5]: { score: 75, comment: '5 subcontractors, some without solar experience' },
        [g6]: { score: 100, comment: 'Low backlog, full capacity available' },
        [t1]: { score: 75, comment: 'Layout acceptable, using PVsyst simulation' },
        [t2]: { score: 50, comment: 'Drawings lack detail, some not to scale' },
        [t3]: { score: 50, comment: 'MDL incomplete' },
        [t4]: { score: 50, comment: 'No clear numbering system presented' },
        [t5]: { score: 100, comment: 'Capacity meets requirements' },
        [t6]: { score: 75, comment: 'PR guarantee meets minimum' },
        [t7]: { score: 50, comment: 'Loss parameters not fully justified' },
        [t8]: { score: 75, comment: 'Energy estimate within range' },
        [t9]: { score: 50, comment: 'Data source quality questionable' },
        [t10]: { score: 100, comment: 'Tier 1 module, latest technology' },
        [t11]: { score: 75, comment: 'Good inverter selection' },
        [t12]: { score: 50, comment: 'Only 1 met station proposed — below requirement' },
        [t13]: { score: 50, comment: 'Limited mechanical design detail' },
        [t14]: { score: 50, comment: 'Fire protection design incomplete' },
        [t15]: { score: 50, comment: 'HVAC system not fully addressed' },
        [t16]: { score: 50, comment: 'Drainage design minimal' },
        [t17]: { score: 75, comment: 'Basic site prep approach' },
        [t18]: { score: 50, comment: 'Drainage arrangement not comprehensive' },
        [t19]: { score: 75, comment: 'Standard mounting structure' },
        [t20]: { score: 50, comment: 'Load testing criteria vague' },
        [t21]: { score: 75, comment: 'Standard galvanizing specification' },
        [t22]: { score: 50, comment: 'Road design needs improvement' },
        [t23]: { score: 50, comment: 'Storm water management insufficient' },
        [t24]: { score: 50, comment: 'Building designs basic' },
        [t25]: { score: 50, comment: 'GIS building concept only' },
        [t26]: { score: 75, comment: 'Standard security fence design' },
        [t27]: { score: 50, comment: 'SLD needs significant work' },
        [t28]: { score: 50, comment: 'Substation design incomplete' },
        [t29]: { score: 50, comment: 'MV route not optimized' },
        [t30]: { score: 50, comment: 'Transformer spec needs review' },
        [t31]: { score: 50, comment: 'GIS spec provided but incomplete' },
        [t32]: { score: 50, comment: 'Cable sizing needs verification' },
        [t33]: { score: 25, comment: 'LPS design not submitted' },
        [t34]: { score: 25, comment: 'No protection philosophy submitted' },
        [t35]: { score: 25, comment: 'SCADA compliance not demonstrated' },
        [t36]: { score: 25, comment: 'No SCADA architecture submitted' },
        [t37]: { score: 50, comment: 'PPC concept only' },
        [t38]: { score: 50, comment: 'Cybersecurity mentioned but no detail' },
        [t39]: { score: 50, comment: 'SCADA spec basic' },
        [t40]: { score: 50, comment: 'Minimal monitoring proposed' },
        [t41]: { score: 50, comment: 'License terms unclear' },
        [h1]: { score: 75, comment: 'Safety policy exists but limited track record' },
        [h2]: { score: 50, comment: 'HSE team proposed but not fully staffed' },
        [h3]: { score: 50, comment: 'JHA provided but not site-specific' },
        [h4]: { score: 50, comment: 'Generic HSE plan, needs customization' },
        [s1]: { score: 75, comment: 'Schedule ambitious, may not be realistic' },
        [s2]: { score: 50, comment: 'Engineering schedule lacks detail' },
        [s3]: { score: 50, comment: 'Procurement plan incomplete' },
        [s4]: { score: 50, comment: 'Construction sequence not well defined' },
        [s5]: { score: 50, comment: 'Mobilization plan needs work' },
        [q1]: { score: 50, comment: 'Basic QMS, no ISO certification' },
        [q2]: { score: 50, comment: 'Incoming inspection procedures basic' },
        [q3]: { score: 50, comment: 'ITP provided but incomplete' },
        [q4]: { score: 50, comment: 'Testing protocols basic' },
        [q5]: { score: 50, comment: 'NCR process not well defined' },
        [q6]: { score: 25, comment: 'Limited documentation control' },
        [q7]: { score: 50, comment: 'QC team qualifications adequate' },
        [q8]: { score: 25, comment: 'No formal risk management plan' },
        [o1]: { score: 75, comment: 'Guaranteed 98.5% — below competitors' },
        [o2]: { score: 50, comment: 'Limited O&M experience' },
        [o3]: { score: 50, comment: 'Basic maintenance program' },
        [o4]: { score: 50, comment: 'Spare parts list incomplete' },
        [o5]: { score: 50, comment: 'Standard O&M documentation' },
        [o6]: { score: 50, comment: 'Permits responsibility needs clarification' },
        [k1]: { score: 75, comment: 'Payment terms mostly accepted with conditions' },
        [k2]: { score: 75, comment: 'DLP accepted but duration negotiable' },
        [k3]: { score: 50, comment: 'Performance LD cap request — deviation' },
        [k4]: { score: 50, comment: 'Delay LD terms partially accepted' },
        [k5]: { score: 50, comment: 'Requesting lower liability cap' },
        [k6]: { score: 75, comment: 'Insurance mostly compliant' },
      },
    },

    commercial: {
      [b1]: { totalPrice: 2850000000, pricePerWp: 0.285, pricePerMW: 28500000, currency: 'THB', deliveryWeeks: 78, warranty: '5 years comprehensive, 25 years module', notes: 'Fixed price, includes grid connection' },
      [b2]: { totalPrice: 2950000000, pricePerWp: 0.295, pricePerMW: 29500000, currency: 'THB', deliveryWeeks: 82, warranty: '5 years comprehensive, 25 years module', notes: 'Fixed price, excludes land preparation beyond scope' },
      [b3]: { totalPrice: 2650000000, pricePerWp: 0.265, pricePerMW: 26500000, currency: 'THB', deliveryWeeks: 72, warranty: '3 years comprehensive, 20 years module', notes: 'Competitive but shorter warranty, limited scope' },
    },

    recommendation: `Based on the comprehensive technical evaluation of the three bidders for the Nathap Solar Project 100 MW EPC Contract, the following recommendation is provided:

**1st Rank — BSP (Bangkok Solar Power)**
Overall compliance score: ~89%. BSP demonstrates the strongest technical capability with Very High compliance in performance guarantee, energy yield, QA/QC, O&M, and contract terms. Their main weakness is in the electrical/SCADA area (Medium compliance) which can be addressed through technical clarification and design review during the detailed engineering phase. BSP also has the most extensive solar EPC track record among the bidders.

**2nd Rank — Getz (Getz Energy Solutions)**
Overall compliance score: ~78%. Getz benefits from strong financial backing as a PTT subsidiary and excellent HSE standards. However, their technical submissions show some gaps in design detail, and their SCADA/control system compliance needs improvement. Their schedule and QA/QC submissions are less comprehensive than BSP.

**3rd Rank — SunTech (SunTech Engineering)**
Overall compliance score: ~55%. While SunTech offers the most competitive pricing, their technical submissions show significant gaps across most categories. As a newer entrant with limited large-scale solar EPC experience, they present higher project execution risk. Critical areas requiring substantial improvement include SCADA, protection systems, and risk management.

**Note:** This evaluation covers Technical Assessment only. Commercial evaluation (pricing) is conducted separately by the Owner.`,
  }
}
