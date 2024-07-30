import { ThemedView, ThemedText } from "@/components/Utils/Themed"

import HomeHeader from "@/components/Habits/HomeHeader"
import images from "@/constants/Images"
import { theme } from "@/Theme"
import { HabitsProvider } from "@/contexts/habitsContext"
import { StyleSheet, Platform, View, Image, Dimensions } from "react-native"

import HabitsList from "@/components/Habits/HabitsList"
import { FadeInDown } from "react-native-reanimated"
export default function IndexTabs() {
  return (
    <HabitsProvider>
      <ThemedView
        className="flex-1"
        darkColor={theme.colors.black.base}
        lightColor={theme.colors.primary.base}
        entering={FadeInDown}
        animated
      >
        <Image
          source={require("@/assets/images/header-img-principal-opacity.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          <View style={{ zIndex: 1 }}>
            <HomeHeader image={images.headerDefault} />
          </View>
          <View style={{ flexGrow: 1, flexShrink: 1, top: 0 }}>
            <HabitsList />
          </View>
        </View>
      </ThemedView>
    </HabitsProvider>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 }, // Sombra apenas no topo
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  image: {
    height: 400,
    width: "100%",
    display: "flex",
    top: 0,
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "column",
    borderRadius: 14,
    opacity: 1,
    zIndex: 0,
  },
})
