import { theme } from "@/Theme"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { HabitManagerProvider } from "./habitManagerContext"
import { Slot } from "expo-router"

import { ToastProvider } from "@/components/useToast"
import { AlertProvider } from "@/hooks/useAlert"

export default function HabitManagerLayout() {
  return (
    <HabitManagerProvider>
      <AlertProvider>
        <ToastProvider isModal={true}>
          <ThemedView
            className="flex-1"
            darkColor={theme.colors.black.dark}
            lightColor={theme.colors.white.base}
          >
            <Slot />
          </ThemedView>
        </ToastProvider>
      </AlertProvider>
    </HabitManagerProvider>
  )
}
