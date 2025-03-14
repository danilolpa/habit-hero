/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text, View, TextStyle, ColorSchemeName } from "react-native"

import Animated, { AnimatedProps } from "react-native-reanimated"
import SegmentedControl, {
  SegmentedControlProps,
} from "@react-native-segmented-control/segmented-control"

import { useColorScheme } from "../useColorScheme"
import { theme } from "@/Theme"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"

export type ThemeProps = {
  lightColor?: string
  darkColor?: string
  animated?: boolean
  entering?: any
  exiting?: any
  defaultTheme?: boolean
}

export type TextProps = ThemeProps & {
  marginBottom?: number
  fontSize?: TextStyle["fontSize"]
  fontWeight?: "light" | "medium" | "bold" | "extra-bold" | "extraLight"
  italic?: boolean
  animated?: boolean
  colorText?: string
} & Text["props"]

export type IconsProps = ThemeProps & {
  name?: keyof typeof MaterialIcons.glyphMap
  size?: TextStyle["fontSize"]
  color?: string
} & Text["props"]

export type ThemedFontAwesomeProps = ThemeProps & {
  name?: keyof typeof FontAwesome6.glyphMap
  size?: TextStyle["fontSize"]
  style?: ViewProps["style"]
  color?: string
}

export type ThemedSegmentedControlProps = ThemeProps & SegmentedControlProps & {}

export type ViewProps = ThemeProps & View["props"]

export function useThemeColor<T, U>(props: { light: T; dark: U }) {
  const theme = (useColorScheme() as ColorSchemeName) ?? "dark"
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
  const { style, lightColor, darkColor, animated, defaultTheme = false, ...otherProps } = props
  const backgroundColor = useThemeColor({
    light: lightColor || (defaultTheme ? theme.colors.white.base : "transparent"),
    dark: darkColor || (defaultTheme ? theme.colors.black.base : "transparent"),
  })

  if (animated) {
    return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}

export function ThemedFontAwesome(props: ThemedFontAwesomeProps) {
  const { style, lightColor, darkColor, animated, color, ...otherProps } = props
  const iconColor =
    color ||
    useThemeColor({
      light: lightColor || "transparent",
      dark: darkColor || "transparent",
    })

  return <FontAwesome6 style={[{ color: color || iconColor }, style]} {...otherProps} />
}
export function ThemedMaterialIcons(props: IconsProps) {
  const { style, lightColor, darkColor, animated, ...otherProps } = props
  const color = useThemeColor({
    light: lightColor || "transparent",
    dark: darkColor || "transparent",
  })

  return <MaterialIcons style={[{ color }, style]} {...otherProps} />
}

export function ThemedIcon(props: IconsProps) {
  const { style, lightColor, darkColor, animated, color, ...otherProps } = props
  const iconColor =
    color ||
    useThemeColor({
      light: lightColor || "transparent",
      dark: darkColor || "transparent",
    })

  return <MaterialIcons style={[{ color: color || iconColor }, style]} {...otherProps} />
}

export function ThemedSegmentedControl(props: ThemedSegmentedControlProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({
    light: lightColor || theme.colors.white.light,
    dark: darkColor || theme.colors.black.base,
  })
  const themeColor = useColorScheme() || "dark"

  return (
    <SegmentedControl
      style={[style]}
      appearance={themeColor === "dark" ? "dark" : "light"}
      backgroundColor={backgroundColor}
      {...otherProps}
    />
  )
}
