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
  Pressable,
} from "react-native"
import * as Haptics from "expo-haptics"
import { router } from "expo-router"

import DateSlider from "../DateSlider"
import { theme } from "@/Theme"
import { ThemedIcon, ThemedMaterialIcons, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { getFormattedDate } from "@/utils/dateHelpers"
import APP_CONSTANTS from "@/constants/AppConstants"
import { BlurView } from "expo-blur"
import { useHabits } from "@/contexts/habitsContext"

type HeaderDefaultProps = ImageBackgroundProps & {
  image: string
}

const user: { name: string } = {
  name: "Dan",
}
const actualDay = getFormattedDate("eee, dd")

export default function HomeHeader({ image }: HeaderDefaultProps) {
  const handleProfile = (route: string) => () => {
    router.push(route)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }
  const { selectedDate, setSelectedDate } = useHabits()
  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView>
        <View style={styles.welcome}>
          {/* <TouchableOpacity onPress={handleProfile(APP_CONSTANTS.NAV.SETTINGS)} activeOpacity={0.8}>
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
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => setSelectedDate(getFormattedDate("yyyy-MM-dd"))}>
            <ThemedText style={styles.ActualDateText} fontWeight="bold">
              {actualDay}
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.dailyStrike}>
            <ThemedIcon name="local-fire-department" size={20} color={theme.colors.red.base} />
            <ThemedText>20 dias</ThemedText>
          </View>
        </View>
      </SafeAreaView>
      <BlurView style={styles.dataSlider} intensity={30}>
        <DateSlider />
      </BlurView>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: 200,
    display: "flex",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  dataSlider: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 8,
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
    justifyContent: "space-between",
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
    justifyContent: "space-between",
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
  ActualDateText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: theme.colors.white.light,
    textTransform: "capitalize",
  },
  dailyStrike: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,

    backgroundColor: "rgba(0,0,0, 0.1)",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})
