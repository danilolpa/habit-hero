import { theme } from "@/Theme"
import { View, Text, StyleSheet, Pressable, ViewStyle, Switch } from "react-native"
import { ThemedIcons, ThemedText, ThemedView, IconsProps } from "./Utils/Themed"
import RotatingAnimation from "@/components/RotatingAnimation"

interface SwitchOptionsProps {
  selectedColor: string
  value: boolean
  onValueChange: (value: boolean) => void
}
interface ContentFlexRowProps {
  text: string
  iconIndicator?: IconsProps["name"]
  iconRotated?: boolean
  iconSize?: number
  switchOptions?: SwitchOptionsProps
  onPress?: () => void
  style?: ViewStyle
  separatorPosition?: "top" | "bottom"
  centerContent?: React.ReactNode
  customContent?: React.ReactNode
}

const ContentFlexRow: React.FC<ContentFlexRowProps> = (props: ContentFlexRowProps) => {
  const {
    text,
    iconIndicator,
    iconSize = 26,
    switchOptions,
    onPress,
    separatorPosition,
    style = {},
    iconRotated = false,
    centerContent = null,
    customContent = null,
  } = props

  if (iconIndicator && switchOptions) {
    throw new Error('You can only provide either "iconIndicator" or "switchOptions", not both.')
  }

  const renderIcon = () => {
    return (
      <RotatingAnimation isRotated={iconRotated} style={{ width: 30, alignItems: "center" }}>
        <ThemedIcons
          name={iconIndicator}
          size={iconSize}
          lightColor={theme.colors.black.base}
          darkColor={theme.colors.white.base}
        />
      </RotatingAnimation>
    )
  }

  const renderSwitch = () => {
    if (switchOptions) {
      const { selectedColor = theme.colors.primary.base, value, onValueChange } = switchOptions
      return (
        <Switch
          trackColor={{ false: "#767577", true: selectedColor }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
          value={value}
        />
      )
    }
    return null
  }

  const renderCenterContent = () => {
    return <ThemedText style={styles.centerContent}>{centerContent}</ThemedText>
  }

  const handlePress = () => {
    if (onPress) {
      onPress()
    }
  }
  return (
    <Pressable onPress={handlePress}>
      <ThemedView
        style={[
          styles.container,
          separatorPosition === "top" && styles.separatorTop,
          separatorPosition === "bottom" && styles.separatorBottom,
          style,
        ]}
      >
        <ThemedText style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {text}
        </ThemedText>
        {centerContent && renderCenterContent()}
        {iconIndicator && renderIcon()}
        {switchOptions && renderSwitch()}
        {customContent && customContent}
      </ThemedView>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace / 2,
    paddingHorizontal: theme.spaces.defaultSpace,
    height: 60,
  },
  text: {
    fontSize: 20,
    height: 45,
    lineHeight: 45,
    maxWidth: "85%",
  },
  separatorTop: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.black.lighter,
  },
  separatorBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black.lighter,
  },
  centerContent: {
    flexGrow: 2,
    textAlign: "center",
  },
})

export default ContentFlexRow
