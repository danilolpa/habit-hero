import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import "@/styles/global.css"

import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RouteProvider } from "@/utils/useContextRoute"
import Navigation from "@/app/_navigation"
import FloatMenuHome from "@/components/FloatMenuHome"
import { ToastProvider } from "@/components/useToast"
import { AlertProvider } from "@/hooks/useAlert"
import APP_CONSTANTS from "@/constants/AppConstants"
import { StatusBar } from "expo-status-bar"
import { Platform } from "react-native"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: APP_CONSTANTS.NAV.SETTINGS,
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Mukta-Bold": require("@/assets/fonts/Mukta-Bold.ttf"),
    "Mukta-ExtraBold": require("@/assets/fonts/Mukta-ExtraBold.ttf"),
    "Mukta-ExtraLight": require("@/assets/fonts/Mukta-ExtraLight.ttf"),
    "Mukta-Light": require("@/assets/fonts/Mukta-Light.ttf"),
    "Mukta-Medium": require("@/assets/fonts/Mukta-Medium.ttf"),
    "Mukta-Regular": require("@/assets/fonts/Mukta-Regular.ttf"),
    "Mukta-SemiBold": require("@/assets/fonts/Mukta-SemiBold.ttf"),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <RouteProvider>
        <AlertProvider>
          <ToastProvider isModal={false}>
            <Navigation />
            <FloatMenuHome />
          </ToastProvider>
        </AlertProvider>
      </RouteProvider>
    </GestureHandlerRootView>
  )
}
