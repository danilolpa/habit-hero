import { theme } from "@/Theme"
import { ReactNode } from "react"
import { View, TextInput, TextInputProps, StyleSheet } from "react-native"
import { ThemedView } from "./Utils/Themed"
import { useThemeColor } from "@/components/Utils/Themed"

type InputProps = {
  children: ReactNode
  size?: "small" | "medium" | "large"
}

type InputFieldProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
  size?: "small" | "medium" | "large"
  styleField?: Object
}

function Input({ children }: InputProps) {
  return <View>{children}</View>
}

function InputField({ ...props }: InputFieldProps) {
  const { lightColor, darkColor, style, size, multiline, styleField } = props

  const backgroundColor = useThemeColor({
    light: lightColor || "transparent",
    dark: darkColor || "transparent",
  })

  const color = useThemeColor({
    light: darkColor || "transparent",
    dark: lightColor || "transparent",
  })

  return (
    <ThemedView
      style={[
        { backgroundColor },
        styles.container,
        style,
        size === "large" && styles.containerLarge,
      ]}
    >
      <TextInput
        placeholderTextColor={theme.colors.white.darkest}
        cursorColor={theme.colors.primary.base}
        {...props}
        style={[
          { color },
          styleField,
          styles.field,
          multiline && styles.fieldMultiline,
          size === "large" && { fontSize: theme.font.sizes.fontSize20 },
          size === "medium" && { fontSize: theme.font.sizes.fontSize16 },
        ]}
      />
    </ThemedView>
  )
}

Input.Field = InputField

export { Input }

export const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.radius8,
    paddingHorizontal: theme.spaces.defaultSpace,
    height: 60,
    flexGrow: 1,
  },
  field: {
    flexGrow: 1,
  },
  containerLarge: {
    minHeight: 60,
  },
  fieldMultiline: {
    paddingTop: 20,
  },
})
