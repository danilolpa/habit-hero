import React from "react"
import { ViewStyle, StyleSheet } from "react-native"
import { ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"

type ContentContainerProps = {
  children: React.ReactNode
  style?: ViewStyle
  withMargin?: boolean
  verticalMargin?: boolean
  schemeColor?: "light" | "dark"
  onlyRadiusBottom?: boolean
}

const ContentContainer = (props: ContentContainerProps) => {
  const {
    children,
    style,
    withMargin,
    verticalMargin,
    schemeColor = "dark",
    onlyRadiusBottom,
  } = props

  const lightBackgroundColor =
    schemeColor === "light" ? theme.colors.white.light : theme.colors.white.lighter
  const darktBackgroundColor =
    schemeColor === "dark" ? theme.colors.black.light : theme.colors.black.lighter
  return (
    <ThemedView
      darkColor={darktBackgroundColor}
      lightColor={lightBackgroundColor}
      style={[
        styles.contentContainer,
        style,
        withMargin && { padding: theme.spaces.defaultSpace },
        verticalMargin && { paddingVertical: theme.spaces.defaultSpace },
        onlyRadiusBottom && styles.onlyRadiusBottom,
      ]}
    >
      {children}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    borderRadius: theme.radius.radius8,
    padding: 0,
  },
  onlyRadiusBottom: {
    borderRadius: 0,
    borderBottomLeftRadius: theme.radius.radius8,
    borderBottomRightRadius: theme.radius.radius8,
  },
})

export default ContentContainer
