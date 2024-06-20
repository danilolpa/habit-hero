import { View, StyleSheet, Modal, Pressable, Platform } from "react-native"
import { ThemedText, ThemedView } from "./Utils/Themed"
import { MaterialIcons } from "@expo/vector-icons"
import APP_CONSTANTS from "@/constants/AppConstants"
import React, { useEffect, useState } from "react"
import { BlurView } from "expo-blur"
import { getColorContrastColorByHex, theme } from "@/Theme"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { useFormikContext } from "formik"
import CloseButton from "@/components/Buttons/CloseButton"

type iconNames = typeof MaterialIcons.glyphMap
interface iconModalProps {
  isVisible: boolean
  onClose: () => void
  selectedColor: string
  currentIcon: string
}

export default function IconsHabitModal({
  isVisible = false,
  onClose,
  selectedColor,
  currentIcon,
}: iconModalProps) {
  const { setFieldValue } = useFormikContext<iconNames>()
  const translateY = useSharedValue(-50)
  const opacity = useSharedValue(0)
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      setVisible(true)
      translateY.value = withSpring(0)
      opacity.value = withSpring(1)
    } else {
      translateY.value = withTiming(-50, { duration: 200 })
      opacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setVisible)(false)
      })
    }
  }, [isVisible])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }
  })

  const selectIcon = (icon: iconNames) => {
    setFieldValue("icon", icon)
    onClose()
  }

  const iconColor = (icon: any) => {
    return icon === currentIcon ? selectedColor : theme.colors.white.base
  }

  return (
    <ThemedView>
      <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onClose}>
        <ThemedView style={[styles.container, animatedStyle]} animated>
          <BlurView intensity={20} style={styles.blurContainer}>
            <ThemedView
              style={[styles.modalContainer, animatedStyle]}
              animated
              darkColor={theme.colors.black.base}
              lightColor={theme.colors.white.base}
            >
              <View style={[styles.header, { backgroundColor: selectedColor }]}>
                <ThemedText
                  style={[styles.headerTitle, { color: getColorContrastColorByHex(selectedColor) }]}
                  fontWeight="bold"
                >
                  Escolha um ícone
                </ThemedText>
                <CloseButton onPress={onClose} />
              </View>
              <ThemedView style={styles.iconsContainer}>
                {APP_CONSTANTS.HABIT.HABIT_ICONS.map(({ name, key }) => {
                  return (
                    <Pressable
                      key={key}
                      style={styles.iconBox}
                      onPress={() => selectIcon(name as any)}
                    >
                      <MaterialIcons name={name as any} size={45} color={String(iconColor(name))} />
                    </Pressable>
                  )
                })}
              </ThemedView>
            </ThemedView>
          </BlurView>
        </ThemedView>
      </Modal>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "104%",
    height: "102%",
    top: "-2%",
    left: "-2%",
    right: 0,
    zIndex: 1000,
    display: "flex",
  },
  modalContainer: {
    borderRadius: theme.radius.radius20,
    top: "10%",
    width: "80%",
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: { width: 0, height: 10 }, // Sombra apenas no topo
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    padding: theme.spaces.defaultSpace,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    paddingHorizontal: theme.spaces.defaultSpace,
    paddingVertical: theme.spaces.defaultSpace,
    borderBottomColor: "rgba(0, 0, 0, 0.8)",
    borderTopLeftRadius: theme.radius.radius20,
    borderTopRightRadius: theme.radius.radius20,
  },
  headerTitle: {
    fontSize: 20,
    height: 40,
    display: "flex",
    lineHeight: 40,
  },
  iconBox: {},
  blurContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    top: "5%",
    borderTopLeftRadius: theme.radius.radius20,
    borderTopRightRadius: theme.radius.radius20,
  },
})
