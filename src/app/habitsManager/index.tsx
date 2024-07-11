import { getColorHexByName, theme } from "@/Theme"
import { ThemedText, ThemedView, ThemedFontAwesome } from "@/components/Utils/Themed"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, Image, Text, View, Pressable, Button } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "expo-router"
import { HabitManagerForm } from "./habitManagerForm"
import { useRef } from "react"
import { useHabitManagerContext } from "@/app/habitsManager/habitManagerContext"
import { FormikProps } from "formik"
import { HabitsType } from "@/types/habits"

interface HabitManagerFormProps {
  submitForm: () => void
}

export default function HabitManagerIndex() {
  const route = useNavigation()
  const formikRef = useRef<FormikProps<HabitsType>>(null)
  const { colorHabit, loading } = useHabitManagerContext()

  const activeColor = getColorHexByName(colorHabit) || theme.colors.primary.base

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit()
    }
  }

  return (
    <View style={styles.pageContainer}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={[activeColor, "transparent"]}
          style={styles.backgroundContainerGradient}
          locations={[0, 0.5]}
        />
      </View>
      <ThemedView
        style={styles.contentContainer}
        darkColor={theme.colors.black.dark}
        lightColor={theme.colors.white.dark}
      >
        <ThemedView
          style={styles.header}
          darkColor={theme.colors.black.dark}
          lightColor={theme.colors.white.dark}
        >
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
            <Button title="Salvar" color={activeColor} onPress={handleSubmit} disabled={loading} />
          </ThemedText>
        </ThemedView>
        <HabitManagerForm formikRef={formikRef} />
      </ThemedView>
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    // marginTop: 30,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    width: "97%",
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
})
