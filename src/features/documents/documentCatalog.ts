import prdMarkdown from '../../../docs/PRD.md?raw'
import roadmapMarkdown from '../../../docs/ROADMAP.md?raw'
import apiMarkdown from '../../../docs/API_FEASIBILITY.md?raw'
import designMarkdown from '../../../docs/DESIGN_SYSTEM.md?raw'

export const documentCatalog = {
  prd: {
    label: 'PRD',
    title: 'Product Requirements Document',
    description: 'Product goals, user journeys, scope, and acceptance criteria.',
    markdown: prdMarkdown,
  },
  roadmap: {
    label: 'Roadmap',
    title: 'Delivery Roadmap',
    description: 'The route from the current prototype to production scale.',
    markdown: roadmapMarkdown,
  },
  'api-feasibility': {
    label: 'API feasibility',
    title: 'API Feasibility Assessment',
    description: 'What Credible, telephony, and AI can support, and what still needs validation.',
    markdown: apiMarkdown,
  },
  'design-system': {
    label: 'Design system',
    title: 'Design System',
    description: 'The visual language and interface standards for Y32 CareOps.',
    markdown: designMarkdown,
  },
} as const

export type DocumentSlug = keyof typeof documentCatalog

export function getDocument(slug: string | undefined) {
  return slug && Object.hasOwn(documentCatalog, slug)
    ? documentCatalog[slug as DocumentSlug]
    : null
}
