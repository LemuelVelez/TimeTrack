/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import * as Location from "expo-location"
import { useEffect, useState } from "react"
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function AttendanceScreen() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [currentLocation, setCurrentLocation] = useState<string | null>(null)
    const [locationLoading, setLocationLoading] = useState(true)
    const [attendanceStatus, setAttendanceStatus] = useState<string | null>(null)
    const [breakStatus, setBreakStatus] = useState<string | null>(null)

    // Employee data (would come from authentication in a real app)
    const employee = {
        name: "John Doe",
        id: "EMP-12345",
        department: "Engineering",
    }

    useEffect(() => {
        // Update time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        // Get location permission and current location
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync()

                if (status !== "granted") {
                    setCurrentLocation("Location permission denied")
                    setLocationLoading(false)
                    return
                }

                const location = await Location.getCurrentPositionAsync({})

                // Get address from coordinates
                const geocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                })

                if (geocode.length > 0) {
                    const address = geocode[0]
                    setCurrentLocation(`${address.city || ""}, ${address.region || ""}`)
                } else {
                    setCurrentLocation("Location found")
                }

                setLocationLoading(false)
            } catch (error) {
                setCurrentLocation("Error getting location")
                setLocationLoading(false)
            }
        }

        getLocation()

        return () => clearInterval(timer)
    }, [])

    const handleTimeIn = () => {
        if (attendanceStatus === "in") {
            Alert.alert("Already Clocked In", "You have already clocked in for today.")
            return
        }

        setAttendanceStatus("in")
        Alert.alert("Success", `Time In recorded at ${formatTime(currentTime)}`)
    }

    const handleTimeOut = () => {
        if (attendanceStatus !== "in") {
            Alert.alert("Not Clocked In", "You need to clock in first.")
            return
        }

        setAttendanceStatus("out")
        setBreakStatus(null)
        Alert.alert("Success", `Time Out recorded at ${formatTime(currentTime)}`)
    }

    const handleBreakIn = () => {
        if (attendanceStatus !== "in") {
            Alert.alert("Not Clocked In", "You need to clock in first.")
            return
        }

        if (breakStatus === "in") {
            Alert.alert("Already On Break", "You are already on break.")
            return
        }

        setBreakStatus("in")
        Alert.alert("Success", `Break started at ${formatTime(currentTime)}`)
    }

    const handleBreakOut = () => {
        if (breakStatus !== "in") {
            Alert.alert("Not On Break", "You need to start a break first.")
            return
        }

        setBreakStatus("out")
        Alert.alert("Success", `Break ended at ${formatTime(currentTime)}`)
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
        return date.toLocaleDateString(undefined, options)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.headerBackground} />

            {/* Status bar background */}
            <View style={styles.statusBarBackground} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.userName}>{employee.name}</Text>
                    <Text style={styles.userInfo}>
                        {employee.id} • {employee.department}
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Time and Date */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.timeCard}>
                    <View style={styles.timeCardHeader}>
                        <View style={styles.timeIconContainer}>
                            <Ionicons name="time-outline" size={20} color="#4F46E5" />
                        </View>
                        <Text style={styles.timeCardTitle}>Current Time</Text>
                    </View>

                    <View style={styles.timeDisplayContainer}>
                        <Text style={styles.time}>{formatTime(currentTime)}</Text>
                        <View style={styles.timePeriodContainer}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>Live</Text>
                        </View>
                    </View>

                    <Text style={styles.date}>{formatDate(currentTime)}</Text>

                    <View style={styles.locationCard}>
                        <Ionicons name="location" size={16} color="#6B7280" />
                        <Text style={styles.locationText}>
                            {locationLoading ? "Getting location..." : currentLocation || "Location unavailable"}
                        </Text>
                    </View>
                </Animated.View>

                {/* Status Card */}
                <Animated.View entering={FadeInDown.delay(300).duration(800)} style={styles.statusCard}>
                    <Text style={styles.statusTitle}>Current Status</Text>

                    <View style={styles.statusRow}>
                        <View style={styles.statusItem}>
                            <Text style={styles.statusLabel}>Attendance</Text>
                            <View
                                style={[styles.statusBadge, { backgroundColor: attendanceStatus === "in" ? "#10B98120" : "#9CA3AF20" }]}
                            >
                                <View
                                    style={[
                                        styles.statusIndicator,
                                        { backgroundColor: attendanceStatus === "in" ? "#10B981" : "#9CA3AF" },
                                    ]}
                                />
                                <Text style={[styles.statusValue, { color: attendanceStatus === "in" ? "#10B981" : "#9CA3AF" }]}>
                                    {attendanceStatus === "in"
                                        ? "Clocked In"
                                        : attendanceStatus === "out"
                                            ? "Clocked Out"
                                            : "Not Clocked In"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statusDivider} />

                        <View style={styles.statusItem}>
                            <Text style={styles.statusLabel}>Break</Text>
                            <View style={[styles.statusBadge, { backgroundColor: breakStatus === "in" ? "#F59E0B20" : "#9CA3AF20" }]}>
                                <View
                                    style={[styles.statusIndicator, { backgroundColor: breakStatus === "in" ? "#F59E0B" : "#9CA3AF" }]}
                                />
                                <Text style={[styles.statusValue, { color: breakStatus === "in" ? "#F59E0B" : "#9CA3AF" }]}>
                                    {breakStatus === "in" ? "On Break" : breakStatus === "out" ? "Break Ended" : "No Break"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Attendance Buttons */}
                <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.buttonsContainer}>
                    <Text style={styles.buttonsTitle}>Attendance Actions</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.actionButton, attendanceStatus === "in" ? styles.disabledButton : styles.timeInButton]}
                            onPress={handleTimeIn}
                            disabled={attendanceStatus === "in"}
                        >
                            <Ionicons name="log-in" size={24} color={attendanceStatus === "in" ? "#9CA3AF" : "white"} />
                            <Text style={[styles.buttonText, attendanceStatus === "in" ? styles.disabledButtonText : {}]}>
                                Time In
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, attendanceStatus !== "in" ? styles.disabledButton : styles.timeOutButton]}
                            onPress={handleTimeOut}
                            disabled={attendanceStatus !== "in"}
                        >
                            <Ionicons name="log-out" size={24} color={attendanceStatus !== "in" ? "#9CA3AF" : "white"} />
                            <Text style={[styles.buttonText, attendanceStatus !== "in" ? styles.disabledButtonText : {}]}>
                                Time Out
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                attendanceStatus !== "in" || breakStatus === "in" ? styles.disabledButton : styles.breakInButton,
                            ]}
                            onPress={handleBreakIn}
                            disabled={attendanceStatus !== "in" || breakStatus === "in"}
                        >
                            <Ionicons
                                name="cafe"
                                size={24}
                                color={attendanceStatus !== "in" || breakStatus === "in" ? "#9CA3AF" : "white"}
                            />
                            <Text
                                style={[
                                    styles.buttonText,
                                    attendanceStatus !== "in" || breakStatus === "in" ? styles.disabledButtonText : {},
                                ]}
                            >
                                Break In
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, breakStatus !== "in" ? styles.disabledButton : styles.breakOutButton]}
                            onPress={handleBreakOut}
                            disabled={breakStatus !== "in"}
                        >
                            <Ionicons name="return-down-back" size={24} color={breakStatus !== "in" ? "#9CA3AF" : "white"} />
                            <Text style={[styles.buttonText, breakStatus !== "in" ? styles.disabledButtonText : {}]}>Break Out</Text>
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
        backgroundColor: "#F8FAFC",
    },
    headerBackground: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 200,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    statusBarBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: StatusBar.currentHeight || 44,
    },
    header: {
        paddingTop: (StatusBar.currentHeight || 44) + 16,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    greeting: {
        fontSize: 16,
        color: "rgba(255,255,255,0.8)",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 4,
    },
    userInfo: {
        fontSize: 14,
        color: "rgba(255,255,255,0.8)",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Extra padding for tab bar
    },
    timeCard: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    timeCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    timeIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    timeCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
    },
    timeDisplayContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    time: {
        fontSize: 42,
        fontWeight: "bold",
        color: "#1F2937",
        letterSpacing: -1,
    },
    timePeriodContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ECFDF5",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#10B981",
        marginRight: 6,
    },
    liveText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#10B981",
    },
    date: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 16,
        textAlign: "center",
    },
    locationCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    locationText: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: 8,
        fontWeight: "500",
        flex: 1,
    },
    statusCard: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 16,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusItem: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 8,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusValue: {
        fontSize: 14,
        fontWeight: "600",
    },
    buttonsContainer: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "48%",
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    timeInButton: {
        backgroundColor: "#10B981",
    },
    timeOutButton: {
        backgroundColor: "#EF4444",
    },
    breakInButton: {
        backgroundColor: "#F59E0B",
    },
    breakOutButton: {
        backgroundColor: "#8B5CF6",
    },
    disabledButton: {
        backgroundColor: "#E5E7EB",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    disabledButtonText: {
        color: "#9CA3AF",
    },
    statusDivider: {
        width: 1,
        height: 60,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 16,
    },
})
