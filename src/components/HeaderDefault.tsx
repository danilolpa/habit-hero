import { StatusBar } from "expo-status-bar"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageBackgroundProps,
  SafeAreaView,
} from "react-native"

import DateSlider from "@/components/DateSlider"

type HeaderDefaultProps = ImageBackgroundProps & {
  image: string
}
export default function HeaderDefault({ image }: HeaderDefaultProps) {
  return (
    <View style={styles.container} className="bg-gray-400">
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/header-img-principal.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView>
          <View>
            <Text style={styles.helloMessage}>Olá, Dan!</Text>
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
    height: 200,
    backgroundColor: "#000",
  },
  image: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  dataSlider: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 90,
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    height: "100%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-end",
    flexDirection: "column",
  },
  helloMessage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "Right",
  },
})
