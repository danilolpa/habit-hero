import { theme } from "@/Theme"
import { ReactNode } from "react"
import { View, TextInput, TextInputProps, StyleSheet } from "react-native"
import { ThemedView } from "./Utils/Themed"
import { useColorScheme } from "@/components/useColorScheme"
import { useThemeColor } from "@/components/Utils/Themed"

type InputProps = {
  children: ReactNode
}

type InputFieldProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
}

function Input({ children }: InputProps) {
  return <View>{children}</View>
}

function InputField({ ...props }: InputFieldProps) {
  const { lightColor, darkColor, style } = props

  const backgroundColor = useThemeColor({
    light: lightColor || "transparent",
    dark: darkColor || "transparent",
  })

  const color = useThemeColor({
    light: darkColor || "transparent",
    dark: lightColor || "transparent",
  })

  return (
    <ThemedView style={[{ backgroundColor }, styles.container, style]}>
      <TextInput
        placeholderTextColor={theme.colors.white.darkest}
        cursorColor={theme.colors.primary.base}
        {...props}
        style={[{ color }, style]}
      />
    </ThemedView>
  )
}

Input.Field = InputField

export { Input }

export const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.radius8,
    paddingHorizontal: 20,
    height: 50,
  },
})
