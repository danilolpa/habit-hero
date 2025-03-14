import { useState, useCallback } from "react"

interface VisibilityControlState {
  [key: string]: boolean
}

const useVisibilityControl = (initialState: VisibilityControlState) => {
  const [visibilityControl, setVisibilityControl] = useState<VisibilityControlState>(initialState)

  const toggleVisibility = useCallback(
    (key: keyof VisibilityControlState) => {
      setVisibilityControl((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }))
    },
    [setVisibilityControl],
  )

  const setVisibility = useCallback(
    (key: keyof VisibilityControlState, value: boolean) => {
      setVisibilityControl((prevState) => ({
        ...prevState,
        [key]: value,
      }))
    },
    [setVisibilityControl],
  )

  const getVisibility = useCallback(
    (key: keyof VisibilityControlState) => {
      return visibilityControl[key]
    },
    [visibilityControl],
  )

  return { visibilityControl, toggleVisibility, setVisibility, getVisibility }
}

export default useVisibilityControl
