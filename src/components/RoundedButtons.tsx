import { View, Text, StyleSheet, Pressable } from "react-native"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import React, { useState } from "react"
import { theme } from "@/Theme"

const RoundedButtons = () => {
  const [selected, setSelected] = useState([])
  return (
    <ThemedView style={styles.roundedOptionsContainer}>
      <Pressable style={styles.roundedOptionsAction}>
        <ThemedText fontWeight="light" style={styles.roundedOptionsActionText}>
          Seg
        </ThemedText>
      </Pressable>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  roundedOptionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spaces.defaultSpace,
    gap: 4,
  },
  roundedOptionsAction: {
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  roundedOptionsActionText: {
    textAlign: "center",
  },
})

export { RoundedButtons }
