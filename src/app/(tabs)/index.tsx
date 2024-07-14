import { ThemedView, ThemedText } from "@/components/Utils/Themed"
import { Link, router } from "expo-router"

import HeaderDefault from "@/components/HeaderDefault"
import images from "@/constants/Images"
import { theme } from "@/Theme"
import { HabitsProvider } from "@/contexts/habitsContext"
import { StyleSheet, Platform, View } from "react-native"

import HabitsList from "@/components/Habits/HabitsList"
import Button from "@/components/Buttons/Buttons"
import APP_CONSTANTS from "@/constants/AppConstants"
import { FadeInLeft } from "react-native-reanimated"

export default function IndexTabs() {
  return (
    <HabitsProvider>
      <ThemedView
        className="flex-1 bg-transparent"
        darkColor={theme.colors.black.base}
        lightColor={theme.colors.primary.base}
        entering={FadeInLeft}
      >
        <HeaderDefault image={images.headerDefault} />
        <ThemedView
          darkColor={theme.colors.black.base}
          lightColor={theme.colors.white.base}
          style={styles.container}
        >
          <View style={styles.viewContent}>
            <Link href={APP_CONSTANTS.NAV.HABIT_MANAGER} asChild>
              Open modal
            </Link>
            <HabitsList />
          </View>
        </ThemedView>
      </ThemedView>
    </HabitsProvider>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 }, // Sombra apenas no topo
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  viewContent: {
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
