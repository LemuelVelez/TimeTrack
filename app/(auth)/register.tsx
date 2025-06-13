"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function Register() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        employeeId: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        StatusBar.setBarStyle("light-content", true)
    }, [])

    const handleRegister = async () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            Alert.alert("Error", "Please fill in all required fields")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Error", "Passwords do not match")
            return
        }

        if (formData.password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long")
            return
        }

        setIsLoading(true)

        // Simulate registration
        setTimeout(() => {
            setIsLoading(false)
            Alert.alert(
                "Registration Successful",
                "Your account has been created successfully. You can now sign in with your credentials.",
                [{ text: "OK", onPress: () => router.push("/(auth)/login") }],
            )
        }, 1500)
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.background} />

            {/* Status bar background */}
            <View style={styles.statusBarBackground} />

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
                <Text style={styles.subtitle}>Create your account</Text>
            </Animated.View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.form}>
                    <View style={styles.row}>
                        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.label}>First Name *</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person" size={20} color="rgba(255,255,255,0.7)" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="John"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={formData.firstName}
                                    onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                                />
                            </View>
                        </View>

                        <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
                            <Text style={styles.label}>Last Name *</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Doe"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={formData.lastName}
                                    onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address *</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="john.doe@company.com"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="call" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="+1 (555) 123-4567"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Department</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="business" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Engineering, Marketing"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={formData.department}
                                onChangeText={(text) => setFormData({ ...formData, department: text })}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Employee ID</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="card" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="EMP-12345"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={formData.employeeId}
                                onChangeText={(text) => setFormData({ ...formData, employeeId: text })}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password *</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="rgba(255,255,255,0.7)" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password *</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.7)" />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={formData.confirmPassword}
                                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="rgba(255,255,255,0.7)" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
                        <Text style={styles.registerButtonText}>{isLoading ? "Creating Account..." : "Create Account"}</Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                            <Text style={styles.loginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
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
    backButton: {
        position: "absolute",
        top: (StatusBar.currentHeight || 44) + 16,
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
        paddingTop: (StatusBar.currentHeight || 44) + 76,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 20,
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
    scrollView: {
        flex: 1,
    },
    form: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    row: {
        flexDirection: "row",
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
    registerButton: {
        backgroundColor: "white",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4F46E5",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
    },
    loginLink: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
})
