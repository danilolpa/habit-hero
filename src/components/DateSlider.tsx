import { View, StyleSheet, FlatList, Pressable, FlatListProps } from "react-native"
import { useEffect, useRef, useState } from "react"
import React from "react"
import * as Haptics from "expo-haptics"
import { addDays, eachDayOfInterval, subDays, format } from "date-fns"

import { getFormattedDate } from "@/utils/dateHelpers"

import { ThemedText, ThemedView } from "./Utils/Themed"
import { theme } from "@/Theme"
import { useHabits } from "@/contexts/habitsContext"
import { isOdd } from "@/utils/numbersHelpers"
import CircularProgress from "@/components/UI/CircularProgress"
import { colord } from "colord"

interface CustomFlatListProps extends FlatListProps<string> {
  contentContainerStyle?: FlatListProps<string>["contentContainerStyle"]
}
type DataItems = {
  date: Date
}

// Component Configuration
const ITEM_WIDTH = 50
const beforeDays = 30
const afterDays = 30
const dateFormat = "yyyy-MM-dd"

export default function DateSlider() {
  const dates: DataItems[] = eachDayOfInterval({
    start: subDays(new Date(), beforeDays),
    end: addDays(new Date(), afterDays),
  }).map((date) => ({ date }))

  const { selectedDate, setSelectedDate } = useHabits()
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)

  const flatListRef = useRef<FlatList<DataItems> | null>(null)

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  })

  useEffect(() => {
    const index = dates.findIndex(({ date }) => format(date, dateFormat) === selectedDate)
    setSelectedDateIndex(index)
  }, [selectedDate])

  useEffect(() => {
    handleScrollToIndex()
  }, [selectedDateIndex, selectedDate])

  const handlePress = (date: Date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedDate(getFormattedDate(dateFormat, date))
  }

  const renderItem = ({ item }: { item: DataItems }) => {
    const formattedDate = getFormattedDate(dateFormat, item.date).toUpperCase()
    const weedDay = getFormattedDate("eeeeee", item.date).toUpperCase()
    const day = getFormattedDate("dd", item.date)
    const isToday = getFormattedDate(dateFormat, item.date) === getFormattedDate(dateFormat)
    const isActive = selectedDate === formattedDate

    const dayProgress = Math.floor(Math.random() * 100)
    const isDayCompleted = isOdd(Math.floor(Math.random() * 100))

    return (
      <View style={{ width: ITEM_WIDTH, paddingHorizontal: 1 }}>
        <Pressable onPress={() => handlePress(item.date)}>
          <ThemedView
            style={[
              styles.dateContainer,
              isToday && styles.dateContainerToday,
              isActive && styles.dateContainerActive,
            ]}
          >
            <ThemedView style={styles.weekDayContainer}>
              <ThemedText style={styles.weekDay} fontWeight={isToday ? "extra-bold" : "light"}>
                {weedDay}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={[styles.dayContainer, isDayCompleted && styles.dayCompleted]}
              darkColor={theme.colors.black.base}
              lightColor={theme.colors.white.base}
            >
              <CircularProgress
                size={38}
                strokeWidth={4}
                strokeColor={theme.colors.green.base}
                progress={dayProgress}
                labelString={day}
                labelStyle={styles.day}
              />
            </ThemedView>
          </ThemedView>
        </Pressable>
      </View>
    )
  }

  const handleScrollToIndex = () => {
    console.log(selectedDateIndex)

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedDateIndex,
        animated: true,
        viewOffset: ITEM_WIDTH * 5.15,
      })
    }
  }

  return (
    <View>
      <FlatList<DataItems>
        data={dates}
        ref={flatListRef}
        keyExtractor={(item) => item.date.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={dates.length}
        initialScrollIndex={selectedDateIndex < 0 ? 0 : selectedDateIndex}
        getItemLayout={getItemLayout}
        onContentSizeChange={() => handleScrollToIndex()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: theme.spaces.defaultSpace - 2,
  },
  dateContainer: {
    borderRadius: 100,
    height: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: 5,
  },
  dateContainerActive: {
    backgroundColor: colord(theme.colors.black.base).alpha(0.9).toHex(),
  },
  dateContainerToday: {
    backgroundColor: "rgba(0,0,0, 0.3)",
  },
  weekDayContainer: {
    borderRadius: 100,
    height: 27,
    width: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  weekDay: {
    color: "#fff",
    fontSize: 8,
    textAlign: "center",
    verticalAlign: "middle",
  },
  dayContainer: {
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  dayContainerIncomplete: {
    backgroundColor: theme.colors.green.base,
  },
  day: {
    fontSize: 14,
    textAlign: "center",
    verticalAlign: "middle",
  },
  dayCompleted: {
    backgroundColor: theme.colors.green.base,
  },
})
