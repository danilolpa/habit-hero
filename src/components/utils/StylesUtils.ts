import { StyleSheet, ViewStyle } from "react-native"

const applySideMargins = (margin: number = 10): ViewStyle => {
  return {
    marginLeft: margin,
    marginRight: margin,
  }
}

const styles = StyleSheet.create({
  container: {
    ...applySideMargins(10), // Aplica margem lateral de 10 unidades
  },
  // Outros estilos
})

export default styles
