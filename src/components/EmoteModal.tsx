import { View, Text, StyleSheet, FlatList } from "react-native"
import { ThemedFontAwesome, ThemedMaterialIcons, ThemedText, ThemedView } from "./Utils/Themed"
import { MaterialIcons } from "@expo/vector-icons"
import APP_CONSTANTS from "@/constants/AppConstants"
import React from "react"
import { BlurView } from "expo-blur"
import { theme } from "@/Theme"

export default function IconsModal() {
  const text = "Hello, my container is blurring contents underneath!"
  return (
    <ThemedView style={styles.container}>
      <BlurView intensity={30} style={styles.blurContainer}>
        <ThemedText>IconsModal</ThemedText>
        <ThemedView style={styles.iconsContainer}>
          {APP_CONSTANTS.HABIT.HABIT_ICONS.map((icon) => {
            return (
              <ThemedView key={icon.key} style={styles.iconBox}>
                <MaterialIcons name={icon.name} size={50} color="black" />
              </ThemedView>
            )
          })}
        </ThemedView>
      </BlurView>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "104%",
    height: "102%",
    top: "-2%",
    left: "-2%",
    right: 0,
    zIndex: 1000,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "white",
    width: "80%",
  },
  iconBox: {
    borderWidth: 1,
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderTopLeftRadius: theme.radius.radius20,
    borderTopRightRadius: theme.radius.radius20,
  },
})
