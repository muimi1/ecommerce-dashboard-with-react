
import { useCallback, useEffect, useRef, useState } from "react"

export function useResizeObserver<T extends HTMLElement>() {
  const [size, setSize] = useState<DOMRectReadOnly>()
  const resizeObserver = useRef<ResizeObserver>()
  const ref = useRef<T>(null)

  const callback = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) return
    if (!entries.length) return

    const entry = entries[0]
    setSize(entry.contentRect)
  }, [])

  useEffect(() => {
    if (!ref.current) return
    resizeObserver.current = new ResizeObserver(callback)
    resizeObserver.current.observe(ref.current)

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect()
      }
    }
  }, [callback])

  return { ref, size }
}
