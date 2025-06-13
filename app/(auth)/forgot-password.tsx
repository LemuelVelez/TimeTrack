"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function ForgotPassword() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address")
            return
        }

        setIsLoading(true)

        // Simulate password reset request
        setTimeout(() => {
            setIsLoading(false)
            Alert.alert(
                "Reset Link Sent",
                "A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.",
                [{ text: "OK", onPress: () => router.push("/(auth)/login") }],
            )
        }, 1500)
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.background} />
            <StatusBar style="auto" translucent backgroundColor="transparent" />

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="time" size={32} color="white" />
                    </View>
                    <Text style={styles.logoText}>TimeTrack</Text>
                </View>
                <Text style={styles.subtitle}>Reset Your Password</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="lock-closed" size={48} color="white" />
                </View>

                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.description}>
                    No worries! Enter your email address and we&apos;ll send you a link to reset your password.
                </Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="your.email@company.com"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={isLoading}>
                        <Text style={styles.resetButtonText}>{isLoading ? "Sending Reset Link..." : "Send Reset Link"}</Text>
                    </TouchableOpacity>

                    <View style={styles.backToLoginContainer}>
                        <Text style={styles.backToLoginText}>Remember your password? </Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                            <Text style={styles.backToLoginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    header: {
        paddingTop: 120,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 40,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    logoIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    logoText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 32,
    },
    form: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: "white",
        marginBottom: 8,
        fontWeight: "500",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
    },
    input: {
        flex: 1,
        color: "white",
        fontSize: 16,
        marginLeft: 12,
    },
    resetButton: {
        backgroundColor: "white",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 24,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4F46E5",
    },
    backToLoginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    backToLoginText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
    },
    backToLoginLink: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
})
