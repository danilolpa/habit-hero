import { theme } from "@/Theme"
import HabitCard from "@/components/Habits/HabitCard"

import { HABITS_DATA } from "@/utils/testData/habitsData"
import { FlatList, Platform, StyleSheet, View } from "react-native"
import { ThemedText, ThemedView } from "../utils/Themed"

export default function Habits() {
  const renderHeader = () => (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerText} fontWeight="extraLight">
        Você ainda tem{" "}
        <ThemedText
          fontWeight="bold"
          style={{
            backgroundColor: theme.colors.white.base,
            color: theme.colors.black.base,
            padding: 10,
            borderRadius: 10,
          }}
        >
          {" "}
          10{" "}
        </ThemedText>{" "}
        não concluídas
      </ThemedText>
    </ThemedView>
  )

  return (
    <FlatList
      data={HABITS_DATA}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={<View style={styles.footer} />}
      ListFooterComponentStyle={styles.container}
      stickyHeaderIndices={[0]}
      renderItem={({ item, index }) => (
        <HabitCard
          id={item.id}
          name={item.name}
          icon={item.icon}
          category={item.category}
          duration={item.duration}
          goal={item.goal}
          otherValues={item}
          color={item.color}
          index={index}
        />
      )}
    />
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
