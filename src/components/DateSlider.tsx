import { View, Text, StyleSheet, FlatList, Pressable, FlatListProps, Vibration } from "react-native"
import { addDays, eachDayOfInterval, subDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useRef, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import React from "react"
import * as Haptics from "expo-haptics"

interface CustomFlatListProps extends FlatListProps<string> {
  contentContainerStyle?: FlatListProps<string>["contentContainerStyle"]
}

const ITEM_WIDTH = 45

export default function DateSlider() {
  const dates = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: addDays(new Date(), 30),
  }).map((date) => date.toISOString())

  const flatListRef = useRef<FlatList<string> | null>(null)

  useFocusEffect(
    React.useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: 60, animated: false })
      }
    }, []),
  )

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  })

  const onScrollToIndexFailed = (info: { index: any }) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500))
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: false })
    })
  }
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const renderItem = (date: string) => {
    const weedDay = format(date, "EEEE", { locale: ptBR }).substring(0, 3).toUpperCase()
    const numberDay = format(new Date(date), "dd")
    return (
      <View id={date}>
        <Pressable style={styles.dateContainer} onPress={handlePress}>
          <View style={styles.weekDayContainer}>
            <Text style={styles.weekDay}>{weedDay}</Text>
          </View>
          <View style={styles.dayContainer}>
            <Text style={styles.day}>{numberDay}</Text>
          </View>
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
        renderItem={({ item }) => {
          return renderItem(item)
        }}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={dates.length}
        initialScrollIndex={30}
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
    // backgroundColor: "#232323",
    borderRadius: 100,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: 5,
    width: ITEM_WIDTH,
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
    backgroundColor: "#000",
    borderRadius: 100,
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
  },
})
