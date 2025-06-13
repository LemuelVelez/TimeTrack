"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function HistoryScreen() {
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        StatusBar.setBarStyle("light-content", true)
    }, [])

    // Mock attendance history data with late and absent records
    const attendanceHistory = [
        {
            id: "1",
            date: "June 14, 2025",
            timeIn: "08:30 AM",
            timeOut: "05:15 PM",
            breaks: [{ start: "12:00 PM", end: "01:00 PM" }],
            totalHours: "8h 15m",
            status: "Present",
            location: "Main Office",
        },
        {
            id: "2",
            date: "June 13, 2025",
            timeIn: "09:15 AM",
            timeOut: "05:30 PM",
            breaks: [{ start: "12:15 PM", end: "01:15 PM" }],
            totalHours: "7h 15m",
            status: "Late",
            location: "Main Office",
            lateMinutes: 15,
        },
        {
            id: "3",
            date: "June 12, 2025",
            timeIn: "08:15 AM",
            timeOut: "04:45 PM",
            breaks: [{ start: "12:00 PM", end: "12:45 PM" }],
            totalHours: "7h 45m",
            status: "Present",
            location: "Main Office",
        },
        {
            id: "4",
            date: "June 11, 2025",
            timeIn: "09:30 AM",
            timeOut: "05:00 PM",
            breaks: [{ start: "12:30 PM", end: "01:30 PM" }],
            totalHours: "6h 30m",
            status: "Late",
            location: "Remote",
            lateMinutes: 30,
        },
        {
            id: "5",
            date: "June 10, 2025",
            timeIn: "08:30 AM",
            timeOut: "05:30 PM",
            breaks: [
                { start: "12:00 PM", end: "01:00 PM" },
                { start: "03:00 PM", end: "03:15 PM" },
            ],
            totalHours: "8h 15m",
            status: "Present",
            location: "Main Office",
        },
        {
            id: "6",
            date: "June 9, 2025",
            timeIn: null,
            timeOut: null,
            breaks: [],
            totalHours: "0h 00m",
            status: "Absent",
            location: null,
            reason: "Sick Leave",
        },
        {
            id: "7",
            date: "June 8, 2025",
            timeIn: "10:00 AM",
            timeOut: "05:15 PM",
            breaks: [{ start: "01:00 PM", end: "02:00 PM" }],
            totalHours: "6h 15m",
            status: "Late",
            location: "Main Office",
            lateMinutes: 60,
        },
        {
            id: "8",
            date: "June 7, 2025",
            timeIn: "08:45 AM",
            timeOut: "05:00 PM",
            breaks: [{ start: "12:30 PM", end: "01:30 PM" }],
            totalHours: "7h 15m",
            status: "Present",
            location: "Remote",
        },
        {
            id: "9",
            date: "June 6, 2025",
            timeIn: null,
            timeOut: null,
            breaks: [],
            totalHours: "0h 00m",
            status: "Absent",
            location: null,
            reason: "Personal Emergency",
        },
        {
            id: "10",
            date: "June 5, 2025",
            timeIn: "09:45 AM",
            timeOut: "06:00 PM",
            breaks: [{ start: "12:00 PM", end: "01:00 PM" }],
            totalHours: "7h 15m",
            status: "Late",
            location: "Main Office",
            lateMinutes: 45,
        },
        {
            id: "11",
            date: "June 4, 2025",
            timeIn: null,
            timeOut: null,
            breaks: [],
            totalHours: "0h 00m",
            status: "Absent",
            location: null,
            reason: "Medical Appointment",
        },
        {
            id: "12",
            date: "June 3, 2025",
            timeIn: "08:20 AM",
            timeOut: "05:20 PM",
            breaks: [{ start: "12:15 PM", end: "01:15 PM" }],
            totalHours: "8h 00m",
            status: "Present",
            location: "Main Office",
        },
    ]

    const filteredHistory = attendanceHistory.filter((item) => {
        if (activeTab === "all") return true
        if (activeTab === "present" && item.status === "Present") return true
        if (activeTab === "late" && item.status === "Late") return true
        if (activeTab === "absent" && item.status === "Absent") return true
        return false
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Present":
                return "#10B981"
            case "Late":
                return "#F59E0B"
            case "Absent":
                return "#EF4444"
            default:
                return "#6B7280"
        }
    }

    const renderAttendanceItem = ({ item, index }: { item: any; index: number }) => (
        <Animated.View entering={FadeInDown.delay(100 * index).duration(500)}>
            <TouchableOpacity style={styles.attendanceCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                    </View>
                </View>

                {item.status === "Absent" ? (
                    // Absent layout
                    <View style={styles.absentContainer}>
                        <View style={styles.absentIconContainer}>
                            <Ionicons name="close-circle" size={48} color="#EF4444" />
                        </View>
                        <Text style={styles.absentTitle}>No attendance recorded</Text>
                        {item.reason && (
                            <View style={styles.reasonContainer}>
                                <Ionicons name="information-circle" size={16} color="#6B7280" />
                                <Text style={styles.reasonText}>Reason: {item.reason}</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    // Present/Late layout
                    <>
                        {item.status === "Late" && (
                            <View style={styles.lateWarning}>
                                <Ionicons name="warning" size={16} color="#F59E0B" />
                                <Text style={styles.lateWarningText}>Late by {item.lateMinutes} minutes</Text>
                            </View>
                        )}

                        <View style={styles.timeRow}>
                            <View style={styles.timeItem}>
                                <Text style={styles.timeLabel}>Time In</Text>
                                <View style={styles.timeValue}>
                                    <Ionicons name="log-in" size={16} color="#4F46E5" />
                                    <Text style={styles.timeText}>{item.timeIn}</Text>
                                </View>
                            </View>

                            <View style={styles.timeItem}>
                                <Text style={styles.timeLabel}>Time Out</Text>
                                <View style={styles.timeValue}>
                                    <Ionicons name="log-out" size={16} color="#EF4444" />
                                    <Text style={styles.timeText}>{item.timeOut}</Text>
                                </View>
                            </View>

                            <View style={styles.timeItem}>
                                <Text style={styles.timeLabel}>Total</Text>
                                <View style={styles.timeValue}>
                                    <Ionicons name="time" size={16} color="#6B7280" />
                                    <Text style={styles.timeText}>{item.totalHours}</Text>
                                </View>
                            </View>
                        </View>

                        {item.location && (
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={16} color="#6B7280" />
                                <Text style={styles.locationText}>{item.location}</Text>
                            </View>
                        )}

                        {item.breaks.length > 0 && (
                            <View style={styles.breaksContainer}>
                                <Text style={styles.breaksTitle}>Breaks ({item.breaks.length})</Text>
                                {item.breaks.map((breakItem: any, breakIndex: number) => (
                                    <View key={breakIndex} style={styles.breakItem}>
                                        <Ionicons name="cafe" size={14} color="#F59E0B" />
                                        <Text style={styles.breakText}>
                                            {breakItem.start} - {breakItem.end}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    )

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.headerBackground} />

            {/* Status bar background */}
            <View style={styles.statusBarBackground} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Attendance History</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[
                        { key: "all", label: "All" },
                        { key: "present", label: "Present" },
                        { key: "late", label: "Late" },
                        { key: "absent", label: "Absent" },
                    ].map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredHistory}
                renderItem={renderAttendanceItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
        height: 120,
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
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    tabContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        borderRadius: 20,
        backgroundColor: "white",
    },
    activeTab: {
        backgroundColor: "#4F46E5",
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
    },
    activeTabText: {
        color: "white",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    attendanceCard: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1F2937",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },
    lateWarning: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    lateWarningText: {
        fontSize: 14,
        color: "#F59E0B",
        fontWeight: "600",
        marginLeft: 6,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    timeItem: {
        flex: 1,
    },
    timeLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 4,
    },
    timeValue: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    locationText: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: 6,
    },
    breaksContainer: {
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        paddingTop: 12,
    },
    breaksTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 8,
    },
    breakItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    breakText: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: 6,
    },
    absentContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    absentIconContainer: {
        marginBottom: 12,
    },
    absentTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#6B7280",
        marginBottom: 12,
    },
    reasonContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    reasonText: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: 6,
        fontStyle: "italic",
    },
})
