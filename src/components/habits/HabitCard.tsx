import { MaterialIcons } from "@expo/vector-icons"
import { View, Text, StyleSheet } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"

type HabitCardProps = {
  id: number
  name: string
  description?: string
  completed?: boolean
  date?: string
  icon: keyof typeof MaterialIcons.glyphMap
  category: string
  priority?: number
  duration?: string
  frequency?: string
  goal: number
  progress?: number
  createdBy?: string
  notes?: string
  tags?: string[]
  reminder?: boolean
  color?: string
  difficulty?: string
  otherValues?: object
}

export default function HabitCard({ icon, name, category, duration, goal }: HabitCardProps) {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={12} />
      <Text>{name}</Text>
      <Text>{category}</Text>
      <Text>{duration}</Text>
      <Text>{goal}xp</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
  },
})
