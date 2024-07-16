import { useState, useEffect } from "react"

const useCurrentIndex = (stateIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(stateIndex)

  useEffect(() => {
    setCurrentIndex(stateIndex)
  }, [stateIndex])

  return currentIndex
}

export default useCurrentIndex
