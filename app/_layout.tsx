"use client"

import { Stack } from "expo-router"
import { useEffect } from "react"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function RootLayout() {
  useEffect(() => {
    // Configure StatusBar globally
    StatusBar.setBarStyle("light-content", true)
    StatusBar.setBackgroundColor("transparent", true)
    StatusBar.setTranslucent(true)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  )
}
