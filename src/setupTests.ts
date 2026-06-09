import '@testing-library/jest-dom'

// ─── ResizeObserver polyfill ──────────────────────────────────────────────────
// Required by Radix UI components that use useSize (Slider, Carousel, etc.)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock

// ─── matchMedia polyfill ──────────────────────────────────────────────────────
// Required by Sonner and responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// ─── PointerEvent polyfill ────────────────────────────────────────────────────
// Required by Radix UI for click/pointer interactions in jsdom
if (!globalThis.PointerEvent) {
  class PointerEvent extends MouseEvent {
    pointerId: number
    pointerType: string
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params)
      this.pointerId = params.pointerId ?? 0
      this.pointerType = params.pointerType ?? 'mouse'
    }
  }
  globalThis.PointerEvent = PointerEvent as typeof globalThis.PointerEvent
}

// ─── hasPointerCapture polyfill ───────────────────────────────────────────────
// Required by Radix Slider
window.HTMLElement.prototype.hasPointerCapture = () => false
window.HTMLElement.prototype.setPointerCapture = () => {}
window.HTMLElement.prototype.releasePointerCapture = () => {}

// ─── scrollIntoView polyfill ──────────────────────────────────────────────────
// Required by Combobox / Command components
window.HTMLElement.prototype.scrollIntoView = () => {}

// ─── IntersectionObserver polyfill ───────────────────────────────────────────
// Required by Embla Carousel
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
}
globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
