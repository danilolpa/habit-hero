import { theme } from "@/Theme"
import { ReactNode } from "react"
import { View, StyleSheet, Button as ButtonNative, ButtonProps } from "react-native"

interface Button extends ButtonProps {
  //   children: ReactNode
}

export default function Button({ color = theme.colors.primary.base, ...otherProps }: Button) {
  return (
    <View>
      <ButtonNative color={color} {...otherProps} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},
})
