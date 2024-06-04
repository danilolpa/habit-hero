import { StatusBar } from "expo-status-bar"
import {
  View,
  StyleSheet,
  ImageBackground,
  ImageBackgroundProps,
  SafeAreaView,
  Image,
} from "react-native"
import { getCalendars } from "expo-localization"

import DateSlider from "./DateSlider"
import { theme } from "@/Theme"
import { ThemedText, ThemedView } from "@/components/utils/Themed"
import { getFormattedDate } from "@/utils/useCalendar"

type HeaderDefaultProps = ImageBackgroundProps & {
  image: string
}

const user: { name: string } = {
  name: "Dan",
}
const timeZone = getCalendars()[0].timeZone || "America/Sao_Paulo"
const actualDay = getFormattedDate("eee, dd")

export default function HeaderDefault({ image }: HeaderDefaultProps) {
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
