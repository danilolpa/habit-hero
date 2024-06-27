import { View, Text, StyleSheet } from "react-native"

export default function HabitPeriodSelector() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: "red" }}>HabitPeriodSelect</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
})
