"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function ProfileScreen() {
    const router = useRouter()

    useEffect(() => {
        StatusBar.setBarStyle("light-content", true)
    }, [])

    // Mock profile data
    const profile = {
        name: "John Doe",
        email: "john.doe@company.com",
        phone: "+1 (555) 123-4567",
        department: "Engineering",
        position: "Senior Developer",
        employeeId: "EMP-12345",
        joinDate: "January 15, 2023",
    }

    const handleLogout = () => {
        router.replace("/(auth)/login")
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <LinearGradient colors={["#4F46E5", "#3730A3"]} style={styles.headerBackground} />

            {/* Status bar background */}
            <View style={styles.statusBarBackground} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile Card */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>JD</Text>
                            </View>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{profile.name}</Text>
                            <Text style={styles.profilePosition}>{profile.position}</Text>
                            <Text style={styles.profileDepartment}>{profile.department}</Text>
                        </View>
                    </View>

                    <View style={styles.profileDetails}>
                        <View style={styles.detailItem}>
                            <Ionicons name="mail" size={20} color="#6B7280" />
                            <Text style={styles.detailText}>{profile.email}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="call" size={20} color="#6B7280" />
                            <Text style={styles.detailText}>{profile.phone}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="card" size={20} color="#6B7280" />
                            <Text style={styles.detailText}>ID: {profile.employeeId}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="calendar" size={20} color="#6B7280" />
                            <Text style={styles.detailText}>Joined: {profile.joinDate}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="pencil" size={16} color="#4F46E5" />
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Settings Section */}
                <Animated.View entering={FadeInDown.delay(400).duration(800)}>
                    <Text style={styles.sectionTitle}>Settings</Text>

                    <View style={styles.settingsCard}>
                        {/* Notifications */}
                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name="notifications" size={20} color="#4F46E5" />
                                </View>
                                <Text style={styles.settingText}>Notifications</Text>
                            </View>
                            <Switch trackColor={{ false: "#E5E7EB", true: "#4F46E580" }} thumbColor="#4F46E5" value={true} />
                        </View>

                        {/* Location Services */}
                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name="location" size={20} color="#4F46E5" />
                                </View>
                                <Text style={styles.settingText}>Location Services</Text>
                            </View>
                            <Switch trackColor={{ false: "#E5E7EB", true: "#4F46E580" }} thumbColor="#4F46E5" value={true} />
                        </View>

                        {/* Face ID / Touch ID */}
                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name="finger-print" size={20} color="#4F46E5" />
                                </View>
                                <Text style={styles.settingText}>Biometric Login</Text>
                            </View>
                            <Switch trackColor={{ false: "#E5E7EB", true: "#4F46E580" }} thumbColor="#4F46E5" value={false} />
                        </View>

                        {/* Change Password */}
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name="lock-closed" size={20} color="#4F46E5" />
                                </View>
                                <Text style={styles.settingText}>Change Password</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Support Section */}
                <Animated.View entering={FadeInDown.delay(600).duration(800)}>
                    <Text style={styles.sectionTitle}>Support</Text>

                    <View style={styles.settingsCard}>
                        {/* Help Center */}
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={[styles.settingIcon, { backgroundColor: "#10B98120" }]}>
                                    <Ionicons name="help-circle" size={20} color="#10B981" />
                                </View>
                                <Text style={styles.settingText}>Help Center</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {/* Report Issue */}
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={[styles.settingIcon, { backgroundColor: "#F59E0B20" }]}>
                                    <Ionicons name="warning" size={20} color="#F59E0B" />
                                </View>
                                <Text style={styles.settingText}>Report an Issue</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {/* About */}
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={[styles.settingIcon, { backgroundColor: "#8B5CF620" }]}>
                                    <Ionicons name="information-circle" size={20} color="#8B5CF6" />
                                </View>
                                <Text style={styles.settingText}>About TimeTrack</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Logout Button */}
                <Animated.View entering={FadeInDown.delay(800).duration(800)}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out" size={20} color="#EF4444" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    profileCard: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileHeader: {
        flexDirection: "row",
        marginBottom: 20,
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#4F46E5",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    profileInfo: {
        flex: 1,
        justifyContent: "center",
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 4,
    },
    profilePosition: {
        fontSize: 16,
        color: "#4F46E5",
        marginBottom: 4,
    },
    profileDepartment: {
        fontSize: 14,
        color: "#6B7280",
    },
    profileDetails: {
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        paddingTop: 16,
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    detailText: {
        fontSize: 14,
        color: "#1F2937",
        marginLeft: 12,
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4F46E520",
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4F46E5",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 16,
    },
    settingsCard: {
        backgroundColor: "white",
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: "hidden",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#4F46E520",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    settingText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1F2937",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EF444420",
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 24,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#EF4444",
    },
})
