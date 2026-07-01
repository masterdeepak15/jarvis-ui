import '@testing-library/jest-dom'

// ResizeObserver is not available in jsdom
;(globalThis as unknown as Record<string, unknown>).ResizeObserver = class ResizeObserver {
  observe()    {}
  unobserve()  {}
  disconnect() {}
}
