import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value(this: HTMLCanvasElement) {
    return {
      canvas: this,
      clearRect() {},
      fillText() {},
      getImageData: () => ({ data: new Uint8ClampedArray([255, 255, 255, 255]) }),
      measureText: (text: string) => ({ width: text.length * 10 }),
    }
  },
})

afterEach(() => cleanup())
