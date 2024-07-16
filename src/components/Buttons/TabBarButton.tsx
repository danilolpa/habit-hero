import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native"
import React from "react"
import * as Haptics from "expo-haptics"

import { ThemedFontAwesome, ThemedText } from "../Utils/Themed"
import { theme } from "@/Theme"
import Animated, { ZoomIn } from "react-native-reanimated"

type TabBarButtonProps = {
  focused: boolean
  onPress: () => void
  onLongPress: () => void
  style?: ViewStyle
  tabKey: string
  icon: string
  label: string
  options: { tabBarAccessibilityLabel: string; tabBarTestID: string }
}

const TabBarButton = (props: TabBarButtonProps) => {
  const { focused, onPress, onLongPress, style, tabKey, icon, label, options } = props

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    onPress()
  }
  return (
    <Animated.View entering={ZoomIn}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => handlePress()}
        onLongPress={onLongPress}
        style={[styles.tabItem, style]}
        key={tabKey}
      >
        <ThemedFontAwesome
          name={icon}
          size={18}
          color={focused ? theme.colors.primary.base : theme.colors.white.base}
        />
        <ThemedText
          style={[focused && { color: theme.colors.primary.base }, styles.tabItemText]}
          darkColor={theme.colors.white.base}
          lightColor={theme.colors.black.base}
          fontWeight="light"
        >
          {label}
        </ThemedText>
      </Pressable>
    </Animated.View>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
  tabItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    flexGrow: 1,
  },
  tabItemText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
})
