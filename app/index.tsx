"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Set status bar style for this screen
    StatusBar.setBarStyle("light-content", true)

    // Auto-navigate to login after splash
    const timer = setTimeout(() => {
      router.replace("/(auth)/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.background} />

      {/* Status bar background */}
      <View style={styles.statusBarBackground} />

      <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Ionicons name="time" size={48} color="white" />
        </View>
        <Text style={styles.logoText}>TimeTrack</Text>
        <Text style={styles.subtitle}>Employee Attendance System</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(800)} style={styles.companyContainer}>
        <Text style={styles.companyText}>Your Company Name</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: StatusBar.currentHeight || 44,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  companyContainer: {
    position: "absolute",
    bottom: 60,
    paddingHorizontal: 40,
  },
  companyText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
})
