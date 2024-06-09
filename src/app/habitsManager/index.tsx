import { theme } from "@/Theme"
import { ThemedText, ThemedView, ThemedFontAwesome } from "@/components/Utils/Themed"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, Image, Text, View, Pressable, Button } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "expo-router"
import HabitsManagerForm from "./habitManagerForm"

export default function HabitManagerIndex() {
  const route = useNavigation()
  return (
    <View style={styles.pageContainer}>
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={["rgba(0,0,0, .1)", theme.colors.black.dark]}
          style={styles.backgroundContainerGradient}
          locations={[0, 0.6]}
        />
      </View>
      <Image
        source={require("@/assets/images/scene_1-sky-and-birds.png")}
        style={styles.backgroundImage}
        blurRadius={5}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ThemedView
        style={styles.contentContainer}
        darkColor={theme.colors.black.dark}
        lightColor={theme.colors.white.dark}
      >
        <ThemedView style={styles.header} darkColor={theme.colors.black.dark}>
          <Pressable style={styles.headerClose} onPress={route.goBack}>
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
          <ThemedText style={styles.headerButton}>
            <Button title="Salvar" color={theme.colors.primary.base} />
          </ThemedText>
        </ThemedView>
        <HabitsManagerForm />
      </ThemedView>
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
    justifyContent: "flex-start",
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
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black.dark,
        shadowOffset: { width: 0, height: 6 }, // Sombra apenas no topo
        shadowOpacity: 1,
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
    height: 40,
  },
  headerClose: {
    fontSize: theme.font.sizes.fontSize20,
    textAlign: "center",
    width: 60,
    height: 40,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
  },
  headerButton: {
    display: "flex",
    justifyContent: "flex-end",
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
    zIndex: -1,
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
