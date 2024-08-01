import { View, StyleSheet } from "react-native"
import { ThemedIcon, ThemedText } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

export default function HabitCardStrike(props: { color: string; strike: number }) {
  const { color, strike } = props
  const daysStrike = strike
  return (
    <View style={styles.container}>
      {daysStrike === 0 && (
        <>
          <MaterialCommunityIcons name="star-shooting-outline" size={24} color={color} />
          <ThemedText fontSize={14} style={[styles.cardContentMisc, { color: color }]}>
            Novo
          </ThemedText>
        </>
      )}
      {daysStrike > 0 && (
        <>
          <MaterialIcons name="local-fire-department" size={24} color={theme.colors.red.base} />
          <ThemedText
            darkColor={theme.colors.white.light}
            lightColor={theme.colors.black.dark}
            fontSize={14}
            style={[styles.cardContentMisc]}
          >
            {daysStrike} dias
          </ThemedText>
        </>
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingTop: 6,
  },
  cardContentMisc: {},
})
