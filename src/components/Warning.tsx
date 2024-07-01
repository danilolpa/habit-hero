import { View, Text, StyleSheet, ViewStyle } from "react-native"
import { ThemedIcons, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { FadeIn } from "react-native-reanimated"

interface WarningProps {
  children: React.ReactNode
  style?: ViewStyle
  styleText?: ViewStyle
  center?: boolean
}

const Warning = (props: WarningProps) => {
  const { children, style, styleText, center } = props

  if (!children) {
    throw new Error("Warning component must have children")
  }

  return (
    <ThemedView style={[styles.warnContainer, style]} entering={FadeIn} animated>
      <View style={styles.warnContentIcon}>
        <ThemedIcons name="info" size={25} darkColor={theme.colors.black.base} />
      </View>
      <View style={styles.warnContainerText}>
        <ThemedText style={[styles.warnText, styleText, center && styles.warnCenter]}>
          {children}
        </ThemedText>
      </View>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  warnContainer: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.yellow.base,
    gap: 10,
  },

  warnContentIcon: {
    backgroundColor: theme.colors.yellow.base,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 4,
    paddingVertical: 10,
  },
  warnContainerText: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 7,
    flex: 1,
  },
  warnText: {
    color: theme.colors.yellow.base,
    lineHeight: 20,
    fontSize: 16,
    flexGrow: 1,
    marginRight: 10,
  },
  warnCenter: {
    textAlign: "center",
  },
})

export default Warning
