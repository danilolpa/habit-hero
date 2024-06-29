import { theme } from "@/Theme"
import { ReactNode } from "react"
import { View, StyleSheet, Button as ButtonNative, ButtonProps } from "react-native"

export type ThemedButtonProps = ButtonProps & {
  // title: string
}

export default function Button(props: ThemedButtonProps) {
  const { color = theme.colors.primary.base, title, ...otherProps } = props
  return (
    <View>
      <ButtonNative color={color} {...otherProps} title={title} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},
})
