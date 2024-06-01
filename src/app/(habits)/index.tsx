import { StyleSheet, SafeAreaView, FlatList, Text } from "react-native"

import HabitCard from "@/components/habits/HabitCard"
import { HABITS_DATA } from "@/utils/testData/habitsData"

export default function Habits() {
  return (
    <SafeAreaView style={styles.container} className="h-full border border-red-700">
      <Text className="text-white font-lg">Habits</Text>
      <FlatList
        data={HABITS_DATA}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
