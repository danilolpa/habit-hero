import { Stack, StackScreenProps } from "expo-router"
import "react-native-reanimated"
import "@/styles/global.css"

import { useRouteContext } from "@/utils/useContextRoute"
import { useEffect } from "react"
import APP_CONSTANTS from "@/constants/AppConstants"

export default function Navigation() {
  const { setCurrentRoute } = useRouteContext()

  const navigationListeners = ({ route }: any) => {
    return {
      transitionEnd: () => {
        setCurrentRoute(route.name)
      },
      // Outros ouvintes aqui, se necessário
    }
  }

  return (
    <Stack>
      <Stack.Screen
        name={APP_CONSTANTS.NAV.HABITS_HOME}
        options={{ headerShown: false }}
        listeners={navigationListeners}
      />
      <Stack.Screen
        name={APP_CONSTANTS.NAV.NEW_HABIT}
        options={{ presentation: "modal", headerShown: false }}
        listeners={navigationListeners}
      />
      <Stack.Screen
        name={APP_CONSTANTS.NAV.SETTINGS}
        options={{ headerShown: false }}
        listeners={navigationListeners}
      />
    </Stack>
  )
}
