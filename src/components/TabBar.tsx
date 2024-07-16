import React, { useEffect } from "react"
import { StyleSheet, Pressable, View, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BlurView } from "expo-blur"
import { colord } from "colord"
import { FontAwesome } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { Link, usePathname } from "expo-router"
import Animated, { Easing, LinearTransition, ZoomIn, ZoomOut } from "react-native-reanimated"

import { theme } from "@/Theme"
import TabBarButton from "@/components/Buttons/TabBarButton"
import APP_CONSTANTS from "@/constants/AppConstants"
import useCurrentIndex from "@/hooks/useCurrentIndex"

const TabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets()
  const pathName = usePathname()
  const currentIndex = useCurrentIndex(state.index)
  const routeIconMap: { [key: string]: string } = {
    index: "hat-wizard",
    statistics: "scroll",
    tests: "dice",
    profile: "chess-queen",
  }

  const renderNewHabitButton = () => {
    return (
      <Animated.View
        style={[styles.buttonContainer, { width: 60 }]}
        entering={ZoomIn.duration(150).easing(Easing.ease)}
        exiting={ZoomOut.duration(100).easing(Easing.circle)}
      >
        <Link
          href={APP_CONSTANTS.NAV.HABIT_MANAGER}
          asChild
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          style={styles.addButton}
        >
          <Pressable>
            <FontAwesome
              name="plus"
              size={24}
              color="white"
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </Pressable>
        </Link>
      </Animated.View>
    )
  }

  const firstHalfRoutes = state.routes.slice(0, 2)
  const secondHalfRoutes = state.routes.slice(2)

  const renderTabBarButton = (route: any, localIndex: any, isSecondHalf: boolean = false) => {
    const iconName: string = routeIconMap[route.name] || routeIconMap["index"]

    const { options } = descriptors[route.key]
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name

    const globalIndex = isSecondHalf ? localIndex + firstHalfRoutes.length : localIndex
    const isFocused = state.index === globalIndex

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
      <Animated.View
        key={route.key}
        style={[styles.buttonContainer]}
        layout={LinearTransition.duration(150)}
      >
        <TabBarButton
          focused={isFocused}
          onPress={onPress}
          onLongPress={onLongPress}
          tabKey={route.key}
          options={options}
          label={label}
          icon={iconName}
          key={route.key}
        />
      </Animated.View>
    )
  }

  return (
    <BlurView intensity={30} style={[styles.tabContainer, { paddingBottom: insets.bottom / 1.5 }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {firstHalfRoutes.map((route: any, index: any) => renderTabBarButton(route, index))}
        {currentIndex === 0 && renderNewHabitButton()}
        {secondHalfRoutes.map((route: any, index: any) => renderTabBarButton(route, index, true))}
      </View>
    </BlurView>
  )
}

export default TabBar

const styles = StyleSheet.create({
  tabContainer: {
    gap: 4,
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    backgroundColor: colord(theme.colors.black.base).alpha(0.5).toHex(),
    paddingHorizontal: theme.spaces.defaultSpace,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 23,
    backgroundColor: theme.colors.primary.base,
    marginBottom: 20,
    position: "absolute",
    left: 0,
    right: 0,
    transform: [{ translateY: -15 }, { rotate: "45deg" }],

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: -2, height: -2 }, // Sombra apenas no topo
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  buttonContainer: {
    display: "flex",
    height: 50,
    width: 60,
    position: "relative",
  },
})
