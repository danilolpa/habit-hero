import { theme } from "@/Theme"
import HabitCard from "@/components/Habits/HabitCard"

import { FlatList, Platform, StyleSheet, View } from "react-native"
import { ThemedText, ThemedView } from "../Utils/Themed"
import { useHabits } from "@/contexts/habitsContext"
import Animated, { LinearTransition } from "react-native-reanimated"
import { useEffect, useState } from "react"

export default function HabitsList() {
  const { selectedDate, habitsList, updateHabitsList, habitsLoading } = useHabits()
  const [loading, setLoading] = useState(false)

  const renderHeader = () => (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerText} fontWeight="extraLight">
        {selectedDate}
      </ThemedText>
    </ThemedView>
  )
  useEffect(() => {
    updateHabitsList()
  }, [])

  const handleRefresing = async () => {
    setLoading(true)
    updateHabitsList()
  }

  useEffect(() => {
    if (habitsLoading == false) {
      setLoading(false)
    }
  }, [habitsLoading])

  return (
    <View>
      {renderHeader()}
      <Animated.FlatList
        data={habitsList}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        ListFooterComponent={<View style={styles.footer} />}
        onRefresh={() => handleRefresing()}
        refreshing={loading}
        removeClippedSubviews={true}
        itemLayoutAnimation={LinearTransition.delay(100).duration(200)}
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
    height: "100%",
  },
  footer: {
    height: 200,
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
