import { Link } from "expo-router"
import { View, Text, StyleSheet, Pressable, Platform } from "react-native"
import { ThemedText, ThemedView } from "./utils/Themed"
import { theme } from "@/Theme"
import { FontAwesome6 } from "@expo/vector-icons"

export default function FloatMenuHome() {
  return (
    <View style={styles.container}>
      <ThemedView
        darkColor={theme.colors.black.base}
        lightColor={theme.colors.white.base}
        style={styles.actionsGroup}
      >
        <Link href="/modal" asChild style={styles.actionsNewHabit}>
          <Pressable>
            {({ pressed }) => (
              <ThemedView style={styles.actionsNewHabitContent}>
                <ThemedText lightColor={theme.colors.white.base}>
                  <FontAwesome6 name="hat-wizard" size={25} styles={styles.actionsNewHabitIcon} />
                </ThemedText>
                <ThemedText style={styles.actionsNewHabitText} fontWeight="bold">
                  Novo Hábito
                </ThemedText>
              </ThemedView>
            )}
          </Pressable>
        </Link>
        <Link push href="/" style={{ marginTop: 6, marginRight: 0 }}>
          <View style={styles.tabBarButtons}>
            <ThemedText>
              <FontAwesome6 name="scroll" size={25} />
            </ThemedText>
          </View>
        </Link>
        <Link push href="/settings" style={{ marginTop: 6, marginRight: 4 }}>
          <View style={styles.tabBarButtons}>
            <ThemedText>
              <FontAwesome6 name="dice" size={25} />
            </ThemedText>
          </View>
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
  actionsNewHabit: {
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
  actionsNewHabitText: {
    color: theme.colors.white.base,
    textAlign: "center",
    marginLeft: 10,
  },
  actionsNewHabitIcon: { color: theme.colors.primary.base },
  actionsNewHabitContent: {
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
