import React, { createContext, useCallback, useContext, useState } from "react"

type routeContextType = {
  currentRoute: string
  setCurrentRoute: (route: string) => void
}

const RouteContext = createContext<routeContextType>({} as routeContextType)

const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<string>("")

  const setRouteCallback = useCallback((route: string) => {
    setCurrentRoute(route)
  }, [])

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute: setRouteCallback }}>
      {children}
    </RouteContext.Provider>
  )
}

export const useRouteContext = (): routeContextType => {
  const context = useContext(RouteContext)

  if (!context) {
    throw new Error("useRouteContext must be used within a RouteProvider")
  }

  return context
}

export { RouteContext, RouteProvider }
