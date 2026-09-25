import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getDocument } from './documentCatalog'
import { RoadmapMap } from './RoadmapMap'
import './documents.css'

function headingId(label: string) {
  return label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function documentBody(markdown: string) {
  return markdown.replace(/^# .+\r?\n/, '')
}

function tableOfContents(markdown: string) {
  return Array.from(markdown.matchAll(/^## (.+)$/gm), ([, label]) => ({ label: label.trim(), id: headingId(label.trim()) }))
}

export function DocumentPage() {
  const { slug } = useParams()
  const projectDocument = getDocument(slug)
  useEffect(() => {
    if (!window.location.hash) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [slug])
  if (!projectDocument) return <Navigate to="/documents/prd" replace />

  const markdown = documentBody(projectDocument.markdown)
  const contents = tableOfContents(markdown)

  return <div className="document-page">
    <header className="document-header">
      <p className="eyebrow">Project documents / {projectDocument.label}</p>
      <h1>{projectDocument.title}</h1>
      <p>{projectDocument.description}</p>
    </header>
    {slug === 'roadmap' && <RoadmapMap />}
    <div className="document-layout">
      <nav className="document-toc" aria-label="On this page">
        <span className="document-toc-title">On this page</span>
        {contents.map(({ label, id }) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <article className="document-article" aria-label={`${projectDocument.label} content`}>
        <Markdown remarkPlugins={[remarkGfm]} components={{
          h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(String(children))}>{children}</h3>,
          table: ({ children }) => <div className="document-table-scroll"><table>{children}</table></div>,
          a: ({ href, children }) => href === 'ROADMAP.md'
            ? <Link to="/documents/roadmap">{children}</Link>
            : <a href={href} target={href?.startsWith('https://') ? '_blank' : undefined} rel={href?.startsWith('https://') ? 'noopener noreferrer' : undefined}>{children}</a>,
        }}>{markdown}</Markdown>
      </article>
    </div>
  </div>
}
