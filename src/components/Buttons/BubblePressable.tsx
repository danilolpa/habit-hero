import { getColorContrastColorByHex, theme } from "@/Theme"
import React, { useRef } from "react"
import { Animated, Pressable, StyleSheet, ViewProps, PressableProps, View } from "react-native"
import * as Haptics from "expo-haptics"

import { ThemedText, IconsProps, ThemedIcon } from "@/components/Utils/Themed"

type similarButtonProps = {
  darkColor?: string
  lightColor?: string
  style?: ViewProps["style"]
  color?: string
  children?: React.ReactNode
  haptics?: boolean
}
type BubblePressableProps = PressableProps & similarButtonProps & {}
type BubblePressableButtonProps = PressableProps &
  similarButtonProps & {
    title?: string
    buttonStyle?: ViewProps["style"]
    rightIcon?: IconsProps["name"]
    textAlignment?: "left" | "center" | "right"
    radius?: number
  }

const BubblePressable = (props: BubblePressableProps) => {
  const { children, style, haptics = true, ...otherProps } = props
  const scaleAnim = useRef(new Animated.Value(1)).current

  if (!children) {
    throw new Error("BubblePressable must have children")
  }

  const handlePressIn = () => {
    haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      pointerEvents="box-none"
      style={style}
      {...otherProps}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.bubble]}>
        {children}
      </Animated.View>
    </Pressable>
  )
}

const BubbleButton = (props: BubblePressableButtonProps) => {
  const {
    children,
    color = theme.colors.primary.base,
    buttonStyle,
    onPress,
    title,
    rightIcon,
    textAlignment = "center",
    style,
    radius = 100,
    ...otherProps
  } = props

  return (
    <BubblePressable onPress={onPress} {...otherProps}>
      <Animated.View
        style={[styles.button, buttonStyle, { backgroundColor: color }, { borderRadius: radius }]}
      >
        <View
          style={{
            flexGrow: 1,
          }}
        >
          {title && (
            <ThemedText
              style={[styles.text, { textAlign: textAlignment }]}
              colorText={getColorContrastColorByHex(color) || theme.colors.white.base}
            >
              {title}
            </ThemedText>
          )}
          {children && <View>{children}</View>}
        </View>
        {rightIcon && (
          <View style={styles.iconContainer}>
            <ThemedIcon name={rightIcon} color={color} size={24} style={{ left: 3 }} />
          </View>
        )}
      </Animated.View>
    </BubblePressable>
  )
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
    backgroundColor: theme.colors.primary.base,
    width: "100%",
    padding: 4,
  },
  bubble: {
    width: "100%",
  },
  text: {
    fontSize: 18,
    paddingHorizontal: theme.spaces.defaultSpace,
  },
  iconContainer: {
    backgroundColor: theme.colors.white.base,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
})
BubblePressable.Button = BubbleButton

export { BubblePressable }
