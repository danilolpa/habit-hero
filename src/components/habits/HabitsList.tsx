import { theme } from "@/Theme"
import HabitCard from "@/components/Habits/HabitCard"

import {
  Dimensions,
  FlatList,
  Platform,
  SectionList,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native"
import { ThemedText, ThemedView } from "../Utils/Themed"
import { useHabits } from "@/contexts/habitsContext"
import Animated, { LinearTransition, useSharedValue } from "react-native-reanimated"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "expo-router"
import JsonViewer from "../Utils/JsonView"
import { colord } from "colord"
import { BlurView } from "expo-blur"

export default function HabitsList() {
  const { selectedDate, updateHabitsList, habitsLoading, Habits } = useHabits()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    updateHabitsList()
  }, [])

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

  const viewableItems = useSharedValue<ViewToken[]>([])

  const HabitList = () => {
    return (
      <View>
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
                <ThemedText>{title}</ThemedText>
              </ThemedView>
            </BlurView>
          )}
        />
        {/* <Animated.FlatList
          data={habitsTests}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.container}
          onRefresh={() => handleRefresing()}
          refreshing={loading}
          removeClippedSubviews={true}
          ListFooterComponent={<View style={styles.footer} />}
          itemLayoutAnimation={LinearTransition.delay(100).duration(200)}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems
          }}
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
              viewableItems={viewableItems}
            />
          )}
        /> */}
      </View>
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
