import { View, StyleSheet, FlatList, Pressable, FlatListProps } from "react-native"
import { useEffect, useRef, useState } from "react"
import React from "react"
import * as Haptics from "expo-haptics"
import { addDays, eachDayOfInterval, subDays, format, isToday } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { ptBR } from "date-fns/locale"

import { ThemedText, ThemedView } from "./utils/Themed"
import { theme } from "@/Theme"

interface CustomFlatListProps extends FlatListProps<string> {
  contentContainerStyle?: FlatListProps<string>["contentContainerStyle"]
}
type DataItems = {
  date: string
}

// Component Configuration
const ITEM_WIDTH = 50
const beforeDays = 15
const afterDays = 30
const totalDays = beforeDays + afterDays
const dateFormat = "yyyy-MM-dd"

export default function DateSlider() {
  const dates = eachDayOfInterval({
    start: subDays(new Date(), beforeDays),
    end: addDays(new Date(), afterDays),
  }).map((date) => format(date, dateFormat))

  const [selectedDate, setSelectedDate] = useState(format(new Date(), dateFormat))
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)

  const flatListRef = useRef<FlatList<string> | null>(null)

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  })

  useEffect(() => {
    const index = dates.findIndex((item) => item === selectedDate)
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
  }, [selectedDateIndex])

  const onScrollToIndexFailed = () => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500))
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedDateIndex,
        animated: false,
        viewOffset: 10,
      })
    })
  }
  const handlePress = (date: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedDate(format(toZonedTime(date, "UTC"), dateFormat))
  }

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const formattedDate = format(toZonedTime(item, "UTC"), dateFormat).toUpperCase()
    const weedDay = format(toZonedTime(item, "UTC"), "eeeeee", { locale: ptBR }).toUpperCase()
    const day = format(toZonedTime(item, "UTC"), "dd")
    const today = isToday(toZonedTime(item, "UTC"))
    const isActive = selectedDate === formattedDate

    return (
      <View>
        <Pressable onPress={() => handlePress(item)}>
          <ThemedView
            style={[
              styles.dateContainer,
              today && styles.dateContainerToday,
              isActive && styles.dateContainerActive,
            ]}
          >
            <ThemedView style={styles.weekDayContainer}>
              <ThemedText style={styles.weekDay} fontWeight={today ? "extra-bold" : "light"}>
                {weedDay}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={styles.dayContainer}
              darkColor={theme.colors.black.darkest}
              lightColor={theme.colors.white.base}
            >
              <ThemedText
                style={styles.day}
                darkColor={theme.colors.white.light}
                lightColor={theme.colors.black.dark}
                fontWeight={today ? "extra-bold" : "light"}
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
      <FlatList
        data={dates}
        ref={flatListRef}
        keyExtractor={(item) => item}
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
    backgroundColor: theme.colors.black.light,
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
    textAlignVertical: "center",
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
    textAlignVertical: "center",
  },
})
