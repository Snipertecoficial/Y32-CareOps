import { describe, expect, it } from 'vitest'
import { renderScriptPreview } from './scriptPreview'

describe('renderScriptPreview', () => {
  it('replaces every supported patient and appointment token', () => {
    expect(renderScriptPreview(
      'Hello {{firstName}}, your appointment is {{date}} at {{time}}.',
      { firstName: 'Maya' },
      { date: 'September 24', time: '10:30 AM' },
    )).toBe('Hello Maya, your appointment is September 24 at 10:30 AM.')
  })
})
