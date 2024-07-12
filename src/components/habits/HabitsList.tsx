import { theme } from "@/Theme"
import HabitCard from "@/components/Habits/HabitCard"

import { FlatList, Platform, StyleSheet, View } from "react-native"
import { ThemedText, ThemedView } from "../Utils/Themed"
import { useHabits } from "@/app/(habits)/habitsContext"

export default function HabitsList() {
  const { selectedDate, habitsList } = useHabits()

  const renderHeader = () => (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerText} fontWeight="extraLight">
        {selectedDate}
      </ThemedText>
    </ThemedView>
  )

  return (
    <View>
      {renderHeader()}
      <FlatList
        data={habitsList}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        ListFooterComponent={<View style={styles.footer} />}
        ListFooterComponentStyle={styles.container}
        renderItem={({ item, index }) => (
          <HabitCard
            id={item.id}
            name={item.name}
            icon={item.icon}
            period={item.period}
            experience={20}
            color={item.color}
            index={index}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: 100,
  },
  footer: {
    height: 100,
  },

  header: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary.base,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
})
