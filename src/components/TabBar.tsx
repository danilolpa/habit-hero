import { TouchableOpacity, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { ThemedFontAwesome, ThemedIcon, ThemedText, ThemedView } from "./Utils/Themed"
import { theme } from "@/Theme"

const TabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets()

  return (
    <ThemedView
      style={[styles.tabContainer, { paddingBottom: insets.bottom / 1.5 }]}
      darkColor={theme.colors.black.light}
      lightColor={theme.colors.white.base}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <>
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              key={route.key}
            >
              <ThemedFontAwesome
                name="hat-wizard"
                size={16}
                darkColor={theme.colors.primary.base}
              />
              <ThemedText
                style={[isFocused && { color: theme.colors.primary.base }, styles.tabItemText]}
                darkColor={theme.colors.white.base}
                lightColor={theme.colors.black.base}
                fontWeight="light"
              >
                {label}
              </ThemedText>
            </Pressable>

            {index === 1 && <ThemedText key={"add"}>Oi</ThemedText>}
          </>
        )
      })}
    </ThemedView>
  )
}

export default TabBar

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
    gap: 4,
    borderRadius: 14,
    borderCurve: "circular",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tabItem: {
    // flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    borderWidth: 1,
    flexGrow: 1,
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
})
