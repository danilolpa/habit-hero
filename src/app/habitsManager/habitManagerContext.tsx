import React, { createContext, useCallback, useContext, useState } from "react"

type habitManagerContextType = {
  loading: boolean
  error: string | null
  submitForm: (form: any) => void
}

const HabitManagerContext = createContext<habitManagerContextType>({} as habitManagerContextType)

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitForm = async (formData: Object) => {
    setLoading(true)
    setError(null)
    try {
      // Substitute with the actual API call
      // await api.post('/endpoint', formData);
      console.log("Form:", formData)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <HabitManagerContext.Provider value={{ loading, error, submitForm }}>
      {children}
    </HabitManagerContext.Provider>
  )
}

export const useHabitManagerContext = (): habitManagerContextType => {
  const context = useContext(HabitManagerContext)

  if (!context) {
    throw new Error("useRouteContext must be used within a RouteProvider")
  }

  return context
}

export { HabitManagerContext, HabitManagerProvider }
