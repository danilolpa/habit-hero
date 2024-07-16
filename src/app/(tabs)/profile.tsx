import { View, Text } from "react-native"
import React from "react"
import Animated, { FadeInUp } from "react-native-reanimated"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"

const Profile = () => {
  return (
    <ThemedView className="flex-1" defaultTheme={true}>
      <ThemedText>Profile</ThemedText>
    </ThemedView>
  )
}

export default Profile
