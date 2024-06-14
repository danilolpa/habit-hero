import { theme } from "@/Theme"
import React from "react"
import { View, Text, StyleSheet } from "react-native"

type TagProps = {
  name: string
  color?: string
  textColor?: string
}

const Tag: React.FC<TagProps> = ({
  name,
  color = theme.colors.primary.base,
  textColor = theme.colors.white.base,
}) => {
  return (
    <View style={[styles.tagContainer, { backgroundColor: color }]}>
      <Text style={[styles.tagText, { color: textColor }]}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    paddingVertical: 12,
    paddingHorizontal: theme.spaces.defaultSpace,
    borderRadius: theme.radius.radius8,
    // margin: 5,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default Tag
