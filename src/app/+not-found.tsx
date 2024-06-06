import { Link, Stack } from "expo-router"
import { StyleSheet } from "react-native"

import { ThemedView, ThemedText } from "@/components/utils/Themed"
import { theme } from "@/Theme"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView
        style={styles.container}
        darkColor={theme.colors.black.base}
        lightColor={theme.colors.white.base}
      >
        <ThemedText style={styles.title}>This screen doesn't exist.</ThemedText>

        <Link href="/" style={styles.link}>
          <ThemedText style={styles.linkText}>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
})
