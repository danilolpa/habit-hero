import { theme } from "@/Theme"
import { ThemedText, ThemedView, ThemedFontAwesome } from "@/components/utils/Themed"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, Image, Text, View, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function HabitManagerIndex() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require("@/assets/images/scene_1-sky-and-birds.png")}
          style={styles.backgroundImage}
          blurRadius={20}
        />

        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.backgroundContainerGradient}
        />
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {/* <ThemedView style={styles.contentContainer} darkColor={theme.colors.black.dark}>
        <ThemedView style={styles.header} darkColor={theme.colors.black.dark}>
          <Pressable style={styles.headerClose}>
            <ThemedFontAwesome
              name="xmark"
              size={24}
              darkColor={theme.colors.white.base}
              lightColor={theme.colors.black.base}
            />
          </Pressable>
          <ThemedText
            style={styles.headerTitle}
            fontWeight="bold"
            lightColor={theme.colors.black.base}
            darkColor={theme.colors.white.base}
          >
            Hábito
          </ThemedText>
          <ThemedText>Salvar</ThemedText>
        </ThemedView>
      </ThemedView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    width: "96%",
    borderTopLeftRadius: theme.radius.radius20,
    borderTopRightRadius: theme.radius.radius20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 60,
    paddingHorizontal: theme.spaces.defaultSpace,
    borderTopLeftRadius: theme.radius.radius20,
    borderTopRightRadius: theme.radius.radius20,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black.dark,
        shadowOffset: { width: 0, height: 10 }, // Sombra apenas no topo
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  headerTitle: {
    fontSize: theme.font.sizes.fontSize20,
    flexGrow: 1,
    textAlign: "center",
  },
  headerClose: {
    fontSize: theme.font.sizes.fontSize20,
    textAlign: "center",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundContainerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 1,
  },
})
