import { theme } from "@/Theme"
import { ReactNode } from "react"
import { View, TextInput, TextInputProps, StyleSheet } from "react-native"
import { ThemedView } from "./Utils/Themed"
import { useThemeColor } from "@/components/Utils/Themed"

type InputProps = {
  children: ReactNode
  large?: boolean
}

type InputFieldProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
  large?: boolean
}

function Input({ children }: InputProps) {
  return <View>{children}</View>
}

function InputField({ ...props }: InputFieldProps) {
  const { lightColor, darkColor, style, large, multiline } = props

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
      style={[{ backgroundColor }, styles.container, style, large && styles.containerLarge]}
    >
      <TextInput
        placeholderTextColor={theme.colors.white.darkest}
        cursorColor={theme.colors.primary.base}
        {...props}
        style={[
          { color },
          style,
          styles.field,
          multiline && styles.fieldMultiline,
          large && styles.fieldLarge,
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
    height: 50,
    flexGrow: 3,
    width: "100%",
  },
  fieldLarge: {
    fontSize: theme.font.sizes.fontSize20,
    height: 50,
  },
  field: {
    borderWidth: 1,
    maxWidth: "100%",
    flexGrow: 1,
  },
  containerLarge: {
    minHeight: 60,
  },
  fieldMultiline: {
    paddingTop: 20,
  },
})
