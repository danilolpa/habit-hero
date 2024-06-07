import { View, StyleSheet, FlatList, Pressable, FlatListProps } from "react-native"
import { useEffect, useRef, useState } from "react"
import React from "react"
import * as Haptics from "expo-haptics"
import { addDays, eachDayOfInterval, subDays, format } from "date-fns"

import { getFormattedDate } from "@/utils/useCalendar"

import { ThemedText, ThemedView } from "./utils/Themed"
import { theme } from "@/Theme"

interface CustomFlatListProps extends FlatListProps<string> {
  contentContainerStyle?: FlatListProps<string>["contentContainerStyle"]
}
type DataItems = {
  date: Date
}

// Component Configuration
const ITEM_WIDTH = 50
const beforeDays = 15
const afterDays = 30
const dateFormat = "yyyy-MM-dd"

export default function DateSlider() {
  const dates: DataItems[] = eachDayOfInterval({
    start: subDays(new Date(), beforeDays),
    end: addDays(new Date(), afterDays),
  }).map((date) => ({ date }))

  const [selectedDate, setSelectedDate] = useState(getFormattedDate(dateFormat))
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
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedDateIndex,
        animated: true,
        viewOffset: 60,
      })
    }
  }, [selectedDateIndex, selectedDate])

  const onScrollToIndexFailed = () => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500))
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedDateIndex,
        animated: true,
        viewOffset: 60,
      })
    })
  }
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

    return (
      <View>
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
              style={styles.dayContainer}
              darkColor={theme.colors.black.base}
              lightColor={theme.colors.white.base}
            >
              <ThemedText
                style={styles.day}
                darkColor={theme.colors.white.lighter}
                lightColor={theme.colors.black.dark}
                fontWeight={isToday ? "extra-bold" : "light"}
              >
                {day}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </Pressable>
      </View>
    )
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
        initialScrollIndex={selectedDateIndex}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  dateContainer: {
    borderRadius: 100,
    height: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: 5,
    width: ITEM_WIDTH,
  },
  dateContainerActive: {
    backgroundColor: theme.colors.black.base,
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
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 14,
    textAlign: "center",
    verticalAlign: "middle",
  },
})
