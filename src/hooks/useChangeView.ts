import { usePathname } from "expo-router"
import { useState, useEffect } from "react"

const useCurrentIndex = (stateIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(stateIndex)

  const pathName = usePathname()
  console.log(pathName)

  useEffect(() => {
    setCurrentIndex(stateIndex)
  }, [stateIndex])

  return currentIndex
}

export default useCurrentIndex
