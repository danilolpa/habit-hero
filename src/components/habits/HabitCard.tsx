import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Text, View, TouchableOpacity, Alert, Pressable, ViewToken } from "react-native"
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  FadeOutRight,
  FadeInDown,
  SharedValue,
  FadeOut,
} from "react-native-reanimated"
import { Swipeable } from "react-native-gesture-handler"
import { ThemedText, ThemedView } from "../Utils/Themed"
import { getColorHexByName, theme } from "@/Theme"
import styles from "./habitsStyle"
import { useEffect, useState } from "react"
import { HabitsType } from "@/types/habits"
import { removeHabit } from "@/store/habitStoreService"
import { useHabits } from "@//contexts/habitsContext"

type HabitCardProps = HabitsType & {
  index: number
  experience: number
  habitData?: HabitsType
  viewableItems: SharedValue<ViewToken[]>
}

export default function HabitCard({
  icon,
  name,
  period,
  color,
  index,
  id,
  habitData,
  viewableItems,
}: HabitCardProps) {
  const translateX = useSharedValue(0)
  const colorHex = getColorHexByName(color)
  const { updateHabitsList } = useHabits()

  const editButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value * 2) }],
    }
  })

  const renderRightActions = () => {
    return (
      <Animated.View style={[styles.concluded, editButtonStyle]}>
        <Pressable>
          <ThemedText>Concluido!</ThemedText>
        </Pressable>
      </Animated.View>
    )
  }

  const renderLeftActions = () => {
    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, editButtonStyle]}>
          <Text>Edit</Text>
        </Animated.View>
      </View>
    )
  }

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(60)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })

      translateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      })
    }, index * 100)

    return () => clearTimeout(timeoutId)
  }, [index, opacity, translateY])

  const onSwipeableOpen = (direction: any) => {
    if (direction === "right") {
      console.log("right")
    }
  }

  const cardAnimationScaleinOut = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === id),
    )
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
    }
  }, [])

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await removeHabit(id)
            updateHabitsList()
          },
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <Animated.View exiting={FadeOut.duration(150)}>
      <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onSwipeableOpen}>
        <Pressable onLongPress={() => handleDelete(id)}>
          <ThemedView
            style={[styles.card, { borderColor: colorHex }, cardAnimationScaleinOut]}
            darkColor={theme.colors.black.lighter}
            lightColor={theme.colors.white.dark}
            animated
          >
            <MaterialIcons name={icon} style={[styles.cardContentIcon, { color: colorHex }]} />
            <View style={styles.cardContentCenter}>
              <ThemedText
                darkColor={theme.colors.white.dark}
                lightColor={theme.colors.black.dark}
                fontWeight="bold"
                style={styles.cardContentHabit}
              >
                {name} - {period}
              </ThemedText>
              <ThemedText
                darkColor={theme.colors.white.light}
                lightColor={theme.colors.black.dark}
                fontSize={14}
                style={[styles.cardContentMisc, { color: colorHex }]}
              >
                {id} - {habitData?.createdDate}
              </ThemedText>
            </View>
            <View style={styles.cardContentExp}>
              <FontAwesome6 name="bolt-lightning" size={18} style={{ color: colorHex }} />
              <ThemedText darkColor={theme.colors.white.light} lightColor={theme.colors.black.dark}>
                XP
              </ThemedText>
            </View>
          </ThemedView>
        </Pressable>
      </Swipeable>
    </Animated.View>
  )
}
