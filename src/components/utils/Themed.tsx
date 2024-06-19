/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text, View, TextStyle } from "react-native"

import Animated from "react-native-reanimated"
import SegmentedControl, {
  SegmentedControlProps,
} from "@react-native-segmented-control/segmented-control"

import { useColorScheme } from "../useColorScheme"
import { theme } from "@/Theme"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"

type ThemeProps = {
  lightColor?: string
  darkColor?: string
  animated?: boolean
}

export type TextProps = ThemeProps & {
  marginBottom?: number
  fontSize?: TextStyle["fontSize"]
  fontWeight?: "light" | "medium" | "bold" | "extra-bold" | "extraLight"
  italic?: boolean
  animated?: boolean
  colorText?: string
} & Text["props"]

export type MaterialIconsProps = ThemeProps & {
  name?: keyof typeof MaterialIcons.glyphMap
  size?: TextStyle["fontSize"]
} & Text["props"]

export type ThemedFontAwesomeProps = ThemeProps & {
  name?: keyof typeof FontAwesome6.glyphMap
  size?: TextStyle["fontSize"]
  style?: ViewProps["style"]
}

export type ThemedSegmentedControlProps = ThemeProps & SegmentedControlProps & {}

export type ViewProps = ThemeProps & View["props"] & { animated?: boolean }

export function useThemeColor<T, U>(props: { light: T; dark: U }) {
  const theme = String(useColorScheme() ?? "dark")
  // const theme = "dark";
  return props[theme]
}

export function ThemedText(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    marginBottom = 0,
    fontSize = theme.font.sizes.fontSize16,
    fontWeight,
    italic,
    animated,
    colorText,
    ...otherProps
  } = props
  const color =
    colorText ||
    useThemeColor({
      light: lightColor || theme.colors.black.base,
      dark: darkColor || theme.colors.white.base,
    })
  const fontFamily = (() => {
    if (fontWeight === "extraLight") {
      return italic ? theme.font.familyDefault.extraLight : theme.font.familyDefault.extraLight
    } else if (fontWeight === "light") {
      return italic ? theme.font.familyDefault.light : theme.font.familyDefault.light
    } else if (fontWeight === "bold") {
      return italic ? theme.font.familyDefault.bold : theme.font.familyDefault.bold
    } else if (fontWeight === "extra-bold") {
      return italic ? theme.font.familyDefault.extraBold : theme.font.familyDefault.extraBold
    } else {
      return italic ? theme.font.familyDefault.regular : theme.font.familyDefault.regular
    }
  })()

  if (animated) {
    return (
      <Animated.Text
        style={[{ color, marginBottom, fontSize, fontFamily }, style]}
        {...otherProps}
      />
    )
  }

  return <Text style={[{ color, marginBottom, fontSize, fontFamily }, style]} {...otherProps} />
}

export function ThemedView(props: ViewProps) {
  const { style, lightColor, darkColor, animated, ...otherProps } = props
  const backgroundColor = useThemeColor({
    light: lightColor || "transparent",
    dark: darkColor || "transparent",
  })

  if (animated) {
    return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}

export function ThemedFontAwesome(props: ThemedFontAwesomeProps) {
  const { style, lightColor, darkColor, animated, ...otherProps } = props
  const color = useThemeColor({
    light: lightColor || "transparent",
    dark: darkColor || "transparent",
  })

  return <FontAwesome6 style={[{ color }, style]} {...otherProps} />
}
export function ThemedMaterialIcons(props: MaterialIconsProps) {
  const { style, lightColor, darkColor, animated, ...otherProps } = props
  const color = useThemeColor({
    light: lightColor || "transparent",
    dark: darkColor || "transparent",
  })

  return <MaterialIcons style={[{ color }, style]} {...otherProps} />
}

export function ThemedSegmentedControl(props: ThemedSegmentedControlProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({
    light: lightColor || theme.colors.white.light,
    dark: darkColor || theme.colors.black.base,
  })
  const themeColor = useColorScheme() || "dark"
  console.log(themeColor)

  return (
    <SegmentedControl
      style={[style]}
      appearance={themeColor === "dark" ? "dark" : "light"}
      backgroundColor={backgroundColor}
      {...otherProps}
    />
  )
}
