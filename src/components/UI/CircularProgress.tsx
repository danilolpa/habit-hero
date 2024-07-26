import { theme } from "@/Theme"
import React from "react"
import { View, StyleSheet, Text, ViewStyle, TextProps, TextStyle } from "react-native"
import Svg, { Circle, G } from "react-native-svg"
import { ThemedText } from "../Utils/Themed"

interface CircularProgressProps {
  size: number
  strokeWidth: number
  strokeColor?: string
  progress: number
  labelString?: string
  style?: ViewStyle
  labelStyle?: TextStyle
}

const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const {
    size,
    strokeWidth,
    strokeColor = theme.colors.primary.base,
    progress,
    labelString,
    labelStyle,
  } = props

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * progress) / 100

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation="90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            stroke="transparent"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={strokeColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {labelString && (
        <View style={styles.labelContainer}>
          <ThemedText style={[styles.label, labelStyle]}>{labelString}</ThemedText>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {},
})

export default CircularProgress
