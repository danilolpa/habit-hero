import { theme } from "@/Theme"
import HabitCard from "@/components/habits/HabitCard"

import { HABITS_DATA } from "@/utils/testData/habitsData"
import { FlatList, StyleSheet } from "react-native"

export default function Habits() {
  return (
    <FlatList
      data={HABITS_DATA}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      renderItem={({ item }) => (
        <HabitCard
          id={item.id}
          name={item.name}
          icon={item.icon}
          category={item.category}
          duration={item.duration}
          goal={item.goal}
          otherValues={item}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
})
