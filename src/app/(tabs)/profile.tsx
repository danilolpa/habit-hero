import { View, Text } from "react-native"
import React from "react"
import Animated, { FadeInUp } from "react-native-reanimated"

const Profile = () => {
  return (
    <Animated.View entering={FadeInUp}>
      <Text>Profile</Text>
    </Animated.View>
  )
}

export default Profile
