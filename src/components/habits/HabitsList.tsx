import { SectionList, StyleSheet, View, ViewToken } from "react-native"
import { useHabits } from "@/contexts/habitsContext"
import { useFocusEffect } from "expo-router"
import { useSharedValue } from "react-native-reanimated"
import { useCallback, useEffect, useState } from "react"
import { BlurView } from "expo-blur"

import { theme } from "@/Theme"
import HabitCard from "@/components/Habits/HabitCard"
import { ThemedText, ThemedView } from "../Utils/Themed"
import { colord } from "colord"
import { translatePeriod } from "@/utils/habitManagerHelpers"

export default function HabitsList() {
  const { selectedDate, updateHabitsList, habitsLoading, Habits } = useHabits()
  const [loading, setLoading] = useState(false)

  const handleRefresing = async () => {
    setLoading(true)

    updateHabitsList()
  }

  useFocusEffect(
    useCallback(() => {
      updateHabitsList()
    }, []),
  )

  useEffect(() => {
    if (habitsLoading == false) {
      setLoading(false)
    }
  }, [habitsLoading])

  const groupedHabits: any = Habits.filterBySelectedDate(selectedDate).groupByPeriod().getGrouped()

  const HabitList = () => {
    return (
      <SectionList
        sections={groupedHabits}
        keyExtractor={(item, index) => item + index}
        onRefresh={() => handleRefresing()}
        refreshing={loading}
        ListFooterComponent={<View style={styles.footer} />}
        style={styles.container}
        renderItem={({ item, index }) => (
          <HabitCard
            id={item.id}
            name={item.name}
            icon={item.icon}
            period={item.period}
            experience={20}
            color={item.color}
            index={index}
            habitData={item}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <BlurView intensity={10}>
            <ThemedView style={styles.header}>
              <ThemedText>{translatePeriod(title)}</ThemedText>
            </ThemedView>
          </BlurView>
        )}
      />
    )
  }
  return <HabitList />
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  footer: {
    height: 120,
    backgroundColor: "transparent",
  },

  header: {
    paddingHorizontal: theme.spaces.defaultSpace,
    paddingVertical: theme.spaces.defaultSpace / 2,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    backgroundColor: colord(theme.colors.black.base).alpha(0.6).toRgbString(),
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
})
