import { ReactNode } from "react"
import { View, Text, StyleSheet, Pressable, ViewStyle } from "react-native"

import { ThemedFontAwesome, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { Input } from "@/components/Input"
import { theme } from "@/Theme"
import ColorPicker from "@/components/ColorPicker"

type ContentContainerProps = {
  children: ReactNode
  style?: ViewStyle
}

function ContentContainer({ children, ...props }: ContentContainerProps) {
  const { style } = props
  return (
    <ThemedView
      darkColor={theme.colors.black.light}
      lightColor={theme.colors.white.light}
      style={[styles.contentContainer, style]}
    >
      {children}
    </ThemedView>
  )
}
export default function HabitManagerForm() {
  return (
    <View style={styles.container}>
      <View style={styles.containerFlexRow}>
        <Input.Field
          placeholder="Como quer chamar este hábito?"
          darkColor={theme.colors.black.light}
          lightColor={theme.colors.white.light}
          style={{ flexGrow: 1 }}
        />
        <ThemedView
          style={styles.selectIconContainer}
          darkColor={theme.colors.black.light}
          lightColor={theme.colors.white.light}
        >
          <Pressable>
            <ThemedFontAwesome
              name="person-biking"
              size={24}
              darkColor={theme.colors.primary.base}
              lightColor={theme.colors.black.base}
            />
          </Pressable>
        </ThemedView>
      </View>
      <Input.Field
        placeholder="Descrição"
        darkColor={theme.colors.black.light}
        lightColor={theme.colors.white.light}
        multiline
        numberOfLines={4}
        style={{ height: 125 }}
      />
      <ContentContainer style={{ paddingHorizontal: 0 }}>
        <ThemedText style={[{ marginHorizontal: theme.spaces.defaultSpace }, styles.headingTitle]}>
          Escolha uma cor
        </ThemedText>
        <ColorPicker />
      </ContentContainer>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // borderWidth: 1,
    borderColor: theme.colors.white.base,
    width: "100%",
    paddingHorizontal: theme.spaces.defaultSpace,
    gap: 4,
    display: "flex",
  },
  containerFlexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  selectIconContainer: {
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 4,
    minHeight: 50,
    borderRadius: theme.radius.radius8,
  },
  contentContainer: {
    display: "flex",
    borderRadius: theme.radius.radius8,
    padding: theme.spaces.defaultSpace,
  },
  headingTitle: {
    fontSize: 16,
    marginBottom: theme.spaces.defaultSpace,
  },
})
