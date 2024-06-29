import { theme } from "@/Theme"
import React, { useRef } from "react"
import { Animated, Pressable, StyleSheet, View, ViewProps, Text } from "react-native"
import { ThemedText } from "../Utils/Themed"
type BubbleButtonProps = {
  children: React.ReactNode
  backgroundColor?: string
  darkColor?: string
  lightColor?: string
  style?: ViewProps["style"]
  onPress?: () => void
}
const BubbleButton = (props: BubbleButtonProps) => {
  const { children, backgroundColor, style, onPress, ...otherProps } = props
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...otherProps}
    >
      <Animated.View
        style={[styles.button, style, { backgroundColor, transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.innerButton}>
          <ThemedText>{children}</ThemedText>
        </View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.radius8, // Set a fixed border radius for the outer view
  },
  innerButton: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spaces.defaultSpace,
    borderRadius: 15, // Set a fixed border radius for the inner view
  },
})

export default BubbleButton
