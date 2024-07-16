import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import TabBar from "@/components/TabBar"
import { theme } from "@/Theme"
import Animated from "react-native-reanimated"

const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ headerShown: false, title: "Hábitos" }} />
        <Tabs.Screen
          name="tests"
          options={{
            headerShown: true,
            title: "Tests",
            headerStyle: { backgroundColor: theme.colors.primary.base },
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            headerShown: true,
            title: "Estatísticas",
            headerStyle: { backgroundColor: theme.colors.primary.base },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "Perfil",
            headerStyle: { backgroundColor: theme.colors.primary.base },
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
