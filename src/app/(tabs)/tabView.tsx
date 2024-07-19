import React from "react"
import { FlatList, View, Text, StyleSheet, Dimensions } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated"

const data = Array.from({ length: 20 }).map((_, index) => ({
  key: `${index}`,
  text: `Item ${index + 1}`,
}))
const { height: windowHeight } = Dimensions.get("window")

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const App = () => {
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const renderItem = ({ item, index }) => {
    const animatedStyles = useAnimatedStyle(() => {
      const position = scrollY.value - index * 100 // Assuming each item has a height of 100
      const scale = interpolate(position, [-100, 0], [0.5, 1], Extrapolate.CLAMP)
      const opacity = interpolate(position, [-100, 0], [0, 1], Extrapolate.CLAMP)

      return {
        transform: [{ scale }],
        opacity,
      }
    })

    return (
      <Animated.View style={[styles.item, animatedStyles]}>
        <Text style={styles.text}>{item.text}</Text>
      </Animated.View>
    )
  }

  return (
    <AnimatedFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    height: 100, // Ensure each item has a fixed height for calculation
  },
  text: {
    fontSize: 18,
  },
})

export default App
