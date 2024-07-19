import { useState, useEffect } from "react"
import { Dimensions } from "react-native"

const useAdjustedHeight = (adjustment: string | number = "0") => {
  const [adjustedHeight, setAdjustedHeight] = useState(0)

  useEffect(() => {
    const { height: screenHeight } = Dimensions.get("window")
    const adjustmentValue = parseInt(String(adjustment), 10)
    setAdjustedHeight(screenHeight + adjustmentValue)
  }, [adjustment])

  return adjustedHeight
}

export default useAdjustedHeight
