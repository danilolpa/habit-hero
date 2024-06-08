import { StatusBar } from "expo-status-bar"
import {
  View,
  StyleSheet,
  ImageBackground,
  ImageBackgroundProps,
  SafeAreaView,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native"
import * as Haptics from "expo-haptics"
import { router } from "expo-router"

import DateSlider from "./DateSlider"
import { theme } from "@/Theme"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { getFormattedDate } from "@/utils/useCalendar"
import APP_CONSTANTS from "@/constants/AppConstants"

type HeaderDefaultProps = ImageBackgroundProps & {
  image: string
}

const user: { name: string } = {
  name: "Dan",
}
const actualDay = getFormattedDate("eee, dd")

export default function HeaderDefault({ image }: HeaderDefaultProps) {
  const handleProfile = (route: string) => () => {
    router.push(route)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/header-img-principal-opacity.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView>
          <View style={styles.welcome}>
            <TouchableOpacity
              onPress={handleProfile(APP_CONSTANTS.NAV.SETTINGS)}
              activeOpacity={0.8}
            >
              <ThemedView style={styles.welcomeAction}>
                <Image
                  source={{ uri: "https://github.com/danilolpa.png" }}
                  className="rounded-full w-10 h-10 border border-l-2 color-gray-300"
                />
                <ThemedText
                  style={styles.welcomeName}
                  fontWeight="bold"
                  numberOfLines={1}
                  lineBreakMode="tail"
                >
                  Olá, {user.name}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
            <ThemedText style={styles.welcomeDate} fontWeight="bold">
              {actualDay}
            </ThemedText>
          </View>
        </SafeAreaView>

        <View style={styles.dataSlider}>
          <DateSlider />
        </View>
      </ImageBackground>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: "#000",
  },
  image: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  dataSlider: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: 110,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  wrapper: {
    height: "100%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-end",
    flexDirection: "column",
  },
  welcome: {
    marginHorizontal: theme.spaces.defaultSpace,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        marginTop: 50, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  welcomeAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "rgba(0,0,0, 0.1)",
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight: 15,
    paddingVertical: 5,
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.white.light,
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  welcomeDate: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.white.light,
    flexGrow: 1,
    textAlign: "right",
    textTransform: "capitalize",
  },
})
