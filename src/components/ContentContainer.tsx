import React from "react"
import { ViewStyle, StyleSheet } from "react-native"
import { ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"

type ContentContainerProps = {
  children: React.ReactNode
  style?: ViewStyle
  noPadding?: boolean
}

const ContentContainer = ({ children, style, noPadding }: ContentContainerProps) => {
  return (
    <ThemedView
      darkColor={theme.colors.black.light}
      lightColor={theme.colors.white.light}
      style={[styles.contentContainer, style, noPadding && { padding: 0 }]}
    >
      {children}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    borderRadius: theme.radius.radius8,
    padding: theme.spaces.defaultSpace,
  },
})

export default ContentContainer
