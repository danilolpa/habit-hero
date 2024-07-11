import { StyleSheet, Platform, View } from "react-native"

import HabitsList from "@/components/Habits/HabitsList"
import { ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"

export default function HabitsHome() {
  return (
    <ThemedView
      darkColor={theme.colors.black.base}
      lightColor={theme.colors.white.base}
      style={styles.container}
    >
      {/* <Text className="text-white font-lg">Habits</Text> */}
      <View style={styles.viewContent}>
        <HabitsList />
      </View>
    </ThemedView>
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
