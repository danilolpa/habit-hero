import React, { Children, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated"

interface RotatingAnimationProps {
  isRotated?: boolean
  rotatedDeg?: number
  defaultDeg?: number
  children: React.ReactNode
}

const RotatingAnimation: React.FC<RotatingAnimationProps> = ({
  isRotated = false,
  children,
  rotatedDeg = 180,
  defaultDeg = 0,
}) => {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withTiming(isRotated ? rotatedDeg : defaultDeg, {
      duration: 600,
      easing: Easing.elastic(1.5),
    })
  }, [isRotated])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    }
  })

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
})

export default RotatingAnimation
