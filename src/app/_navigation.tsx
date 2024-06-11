import { Stack } from "expo-router"
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
    }
  }

  return (
    <Stack>
      <Stack.Screen
        name={APP_CONSTANTS.NAV.HABIT_MANAGER}
        options={{ presentation: "modal", headerShown: false }}
        //"card" | "modal" | "transparentModal" | "containedModal" | "containedTransparentModal" | "fullScreenModal" | "formSheet"
        listeners={navigationListeners}
      />
      <Stack.Screen
        name={APP_CONSTANTS.NAV.HABITS_HOME}
        options={{ headerShown: false }}
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
