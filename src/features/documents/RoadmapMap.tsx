const phases = [
  {
    number: 0,
    title: 'Interactive prototype',
    description: 'A working sales demo with synthetic data and local actions.',
    status: 'Current prototype',
    target: 'phase-0-interactive-prototype',
  },
  {
    number: 1,
    title: 'Vendor and workflow discovery',
    description: 'Confirm Qualifacts access, approved workflows, and calling rules.',
    status: 'Next step',
    target: 'phase-1-vendor-and-workflow-discovery',
  },
  {
    number: 2,
    title: 'Production foundation',
    description: 'Build secure tenant, identity, audit, and job infrastructure.',
    status: 'Planned',
    target: 'phase-2-production-foundation',
  },
  {
    number: 3,
    title: 'Integration proof of concept',
    description: 'Prove one synthetic EHR-to-voice workflow end to end.',
    status: 'Planned',
    target: 'phase-3-integration-proof-of-concept',
  },
  {
    number: 4,
    title: 'Operational MVP',
    description: 'Turn demo screens into authorized, persistent workflows.',
    status: 'Planned',
    target: 'phase-4-operational-mvp',
  },
  {
    number: 5,
    title: 'Controlled customer pilot',
    description: 'Run a supervised rollout with one approved customer.',
    status: 'Planned',
    target: 'phase-5-controlled-customer-pilot',
  },
  {
    number: 6,
    title: 'Production scale',
    description: 'Expand onboarding, reliability, and connector coverage.',
    status: 'Planned',
    target: 'phase-6-production-scale',
  },
] as const

export function RoadmapMap() {
  return <section className="roadmap-map" aria-label="Roadmap map">
    <div className="roadmap-map-heading">
      <div>
        <p className="eyebrow">Visual delivery map</p>
        <h2>From prototype to production scale</h2>
      </div>
      <p>Follow the connected route, then select any phase to read its full scope and exit criteria below.</p>
    </div>
    <div className="roadmap-canvas">
      <svg className="roadmap-path" viewBox="0 0 1000 500" preserveAspectRatio="none" role="img" aria-label="Connected path through seven delivery phases">
        <path d="M 125 125 H 875 V 375 H 375" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="125" cy="125" r="10" fill="currentColor" />
        <circle cx="375" cy="375" r="10" fill="currentColor" />
      </svg>
      <div className="roadmap-grid">
        {phases.map((phase) => <a key={phase.number} className={`roadmap-phase roadmap-phase-${phase.number}`} href={`#${phase.target}`}>
          <span className="roadmap-phase-top"><span className="roadmap-phase-number">{String(phase.number).padStart(2, '0')}</span><span className={`roadmap-phase-status ${phase.number === 0 ? 'is-current' : ''}`}>{phase.status}</span></span>
          <strong>{phase.title}</strong>
          <span className="roadmap-phase-description">{phase.description}</span>
          <span className="roadmap-phase-action">Read phase details <span aria-hidden="true">↗</span></span>
        </a>)}
      </div>
    </div>
    <p className="roadmap-map-note">Later phases depend on vendor approvals, security validation, and pilot results. The map shows sequence, not committed dates.</p>
  </section>
}
