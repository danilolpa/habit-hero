import { theme } from "@/Theme"
import { ReactNode } from "react"
import { View, StyleSheet, Button as ButtonNative, ButtonProps } from "react-native"

interface Button extends ButtonProps {
  //   children: ReactNode
}

export default function Button({ title, color = theme.colors.primary.base, ...rest }: Button) {
  return (
    <View>
      <ButtonNative title="Salvar" color={color} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},
})
