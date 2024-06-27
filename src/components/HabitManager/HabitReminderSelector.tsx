import { View, Text, StyleSheet } from "react-native"

export default function HabitReminderSelector() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: "red" }}>Habit Reminder</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
})
