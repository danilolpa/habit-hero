import React, { useEffect, useState, useRef } from "react"
import { View, StyleSheet, LayoutChangeEvent } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated"

interface AccordionProps {
  children: React.ReactNode
  isVisible: boolean
  height?: number
  header?: React.ReactNode
}

const AccordionContainer: React.FC<AccordionProps> = ({
  children,
  isVisible,
  height = 0,
  header,
}) => {
  const animation = useSharedValue(0)
  const [contentHeight, setContentHeight] = useState(0)

  if (!children) {
    throw new Error('The "children" prop must be passed to the Accordion component.')
  }

  useEffect(() => {
    animation.value = isVisible
      ? withTiming(contentHeight, { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      : withTiming(0, { duration: 300, easing: Easing.back(1) })
  }, [isVisible, contentHeight])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animation.value,
    }
  })

  const onContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height
    if (height !== contentHeight) {
      setContentHeight(height)
    }
  }
  return (
    <View>
      {header && <View style={styles.header}>{header}</View>}
      <View style={styles.container}>
        {contentHeight === 0 && (
          <View style={styles.hiddenContent} onLayout={onContentLayout}>
            {children}
          </View>
        )}
        <Animated.View style={[animatedStyle]}>
          <View onLayout={onContentLayout}>{children}</View>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  hiddenContent: {
    position: "absolute",
    opacity: 0,
    zIndex: -1,
  },
  header: {},
})

export default AccordionContainer
