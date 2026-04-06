import { useEffect, useRef } from 'react'

type Props = {
  loadMore: () => void
  hasMore: boolean
  isLoading: boolean
}

export const useInfiniteScroll = ({ loadMore, hasMore, isLoading }: Props) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        loadMore()
      }
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loadMore, isLoading])

  return loadMoreRef
}
