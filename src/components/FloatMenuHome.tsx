import { Link } from "expo-router"
import { View, Text, StyleSheet, Pressable, Platform } from "react-native"
import * as Haptics from "expo-haptics"
import { FontAwesome6 } from "@expo/vector-icons"
import { theme } from "@/Theme"
import { ThemedText, ThemedView } from "./Utils/Themed"
import { useRouteContext } from "@/utils/useContextRoute"
import APP_CONSTANTS from "@/constants/AppConstants"

export default function FloatMenuHome() {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const { currentRoute } = useRouteContext()
  return (
    <View style={styles.container}>
      <ThemedView
        darkColor={theme.colors.black.base}
        lightColor={theme.colors.white.base}
        style={styles.actionsGroup}
      >
        <Link href={APP_CONSTANTS.NAV.HABIT_MANAGER} asChild style={styles.tabBarNewHabit}>
          <Pressable>
            {({ pressed }) => {
              if (pressed) {
                handlePress()
              }
              return (
                <ThemedView style={styles.tabBarNewHabitContent}>
                  <ThemedText lightColor={theme.colors.white.base}>
                    <FontAwesome6 name="hat-wizard" size={25} styles={styles.tabBarNewHabitIcon} />
                  </ThemedText>
                  <ThemedText style={styles.tabBarNewHabitText} fontWeight="bold">
                    Novo Hábito
                  </ThemedText>
                </ThemedView>
              )
            }}
          </Pressable>
        </Link>
        <Link push href="/" style={{ marginVertical: 4, marginRight: 0 }} asChild>
          <Pressable>
            {({ pressed }) => {
              if (pressed) {
                handlePress()
              }
              return (
                <View style={[styles.tabBarButtons]}>
                  <ThemedText>
                    <FontAwesome6 name="scroll" size={25} />
                  </ThemedText>
                </View>
              )
            }}
          </Pressable>
        </Link>
        <Link push href="/settings" style={{ marginVertical: 4, marginRight: 4 }} asChild>
          <Pressable>
            {({ pressed }) => {
              if (pressed) {
                handlePress()
              }
              return (
                <View
                  style={[
                    styles.tabBarButtons,
                    currentRoute == APP_CONSTANTS.NAV.SETTINGS && styles.tabBarButtonsActive,
                  ]}
                >
                  <ThemedText>
                    <FontAwesome6 name="dice" size={25} />
                  </ThemedText>
                </View>
              )
            }}
          </Pressable>
        </Link>
      </ThemedView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    height: 60,
  },
  actionsGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    // overflow: "hidden",
    gap: 5,
    borderColor: theme.colors.black.darkest,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 }, // Sombra apenas no topo
        shadowOpacity: 1,
        shadowRadius: 0,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  tabBarNewHabit: {
    width: 160,
    backgroundColor: theme.colors.primary.base,
    height: 48,
    borderRadius: 100,
    padding: 10,
    marginBottom: 2,
    marginLeft: 5,
    borderColor: theme.colors.black.darkest,
    flexGrow: 1,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary.dark,
        shadowOffset: { width: 0, height: 2 }, // Sombra apenas no topo
        shadowOpacity: 1,
        shadowRadius: 0,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  tabBarNewHabitText: {
    color: theme.colors.white.base,
    textAlign: "center",
    marginLeft: 10,
  },
  tabBarNewHabitIcon: { color: theme.colors.primary.base },
  tabBarNewHabitContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    color: theme.colors.white.base,
    paddingHorizontal: 15,
    height: 51,
    width: 70,
    borderRadius: 100,
  },
  tabBarButtonsActive: {
    backgroundColor: theme.colors.black.light,
  },
})
