import { View, Text } from "react-native"
import React from "react"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"

const Statistics = () => {
  return (
    <ThemedView className="flex-1" defaultTheme={true}>
      <ThemedText>Statistics</ThemedText>
    </ThemedView>
  )
}

export default Statistics
