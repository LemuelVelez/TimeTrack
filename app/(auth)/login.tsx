"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        StatusBar.setBarStyle("light-content", true)
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        setIsLoading(true)

        // Simulate login
        setTimeout(() => {
            setIsLoading(false)
            router.replace("/(main)")
        }, 1500)
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.background} />

            {/* Status bar background */}
            <View style={styles.statusBarBackground} />

            <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="time" size={32} color="white" />
                    </View>
                    <Text style={styles.logoText}>TimeTrack</Text>
                </View>
                <Text style={styles.subtitle}>Sign in to your account</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.form}>
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

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.7)" />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="rgba(255,255,255,0.7)" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.forgotPassword} onPress={() => router.push("/(auth)/forgot-password")}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
                    <Text style={styles.loginButtonText}>{isLoading ? "Signing In..." : "Sign In"}</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don&apos;t have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                        <Text style={styles.registerLink}>Sign Up</Text>
                    </TouchableOpacity>
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
    statusBarBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: StatusBar.currentHeight || 44,
    },
    header: {
        paddingTop: (StatusBar.currentHeight || 44) + 76,
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
    form: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
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
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "white",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4F46E5",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
    },
    registerLink: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
})
