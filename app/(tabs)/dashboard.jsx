import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { styles } from "../../styles/styles";

// Mock data for analytics
const performanceData = {
  daily: {
    completed: 12,
    total: 15,
    streak: 5,
  },
  weekly: {
    completed: 45,
    total: 50,
    streak: 3,
  },
  monthly: {
    completed: 180,
    total: 200,
    streak: 2,
  },
};

// Mock data for badges
const badges = [
  {
    id: "1",
    name: "Cleanup Hero",
    description: "Completed 50 tasks",
    icon: "trophy",
    earned: true,
  },
  {
    id: "2",
    name: "Fastest Responder",
    description: "Average response time under 5 minutes",
    icon: "lightning-bolt",
    earned: true,
  },
  {
    id: "3",
    name: "Night Owl",
    description: "Completed 10 tasks after 10 PM",
    icon: "moon",
    earned: false,
  },
  {
    id: "4",
    name: "Early Bird",
    description: "Completed 10 tasks before 8 AM",
    icon: "weather-sunny",
    earned: false,
  },
  {
    id: "5",
    name: "Consistency King",
    description: "7-day streak of completing tasks",
    icon: "calendar-check",
    earned: false,
  },
  {
    id: "6",
    name: "Efficiency Expert",
    description: "Completed 5 tasks in under 10 minutes each",
    icon: "clock-check",
    earned: false,
  },
];

// Mock data for task history
const taskHistory = [
  {
    id: "1",
    type: "Garbage",
    location: "Floor 2 - Kitchen Area",
    date: "2023-06-15",
    status: "completed",
    timeSpent: "15m",
  },
  {
    id: "2",
    type: "Spill",
    location: "Floor 1 - Main Lobby",
    date: "2023-06-14",
    status: "completed",
    timeSpent: "10m",
  },
  {
    id: "3",
    type: "Garbage",
    location: "Floor 3 - Conference Room",
    date: "2023-06-14",
    status: "completed",
    timeSpent: "12m",
  },
  {
    id: "4",
    type: "Spill",
    location: "Floor 2 - Break Room",
    date: "2023-06-13",
    status: "completed",
    timeSpent: "8m",
  },
  {
    id: "5",
    type: "Garbage",
    location: "Floor 1 - Cafeteria",
    date: "2023-06-13",
    status: "completed",
    timeSpent: "20m",
  },
];

// Mock data for user level
const userLevel = {
  current: 3,
  next: 4,
  progress: 75, // percentage to next level
  title: "Senior Cleaner",
};

const StatCard = ({ title, value, total, icon, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {total && <Text style={styles.statTotal}>of {total}</Text>}
  </View>
);

const BadgeCard = ({ badge }) => (
  <View style={[styles.badgeCard, !badge.earned && styles.badgeCardLocked]}>
    <View style={[styles.badgeIcon, !badge.earned && styles.badgeIconLocked]}>
      <MaterialCommunityIcons
        name={badge.icon}
        size={32}
        color={badge.earned ? "#fff" : "#aaa"}
      />
    </View>
    <Text style={[styles.badgeName, !badge.earned && styles.badgeNameLocked]}>
      {badge.name}
    </Text>
    <Text style={styles.badgeDescription}>{badge.description}</Text>
  </View>
);

const TaskHistoryItem = ({ task }) => (
  <View style={styles.historyItem}>
    <View style={styles.historyIcon}>
      {task.type === "Garbage" ? (
        <FontAwesome5 name="trash-alt" size={16} color="#333" />
      ) : (
        <Ionicons name="water" size={18} color="#333" />
      )}
    </View>
    <View style={styles.historyDetails}>
      <Text style={styles.historyLocation}>{task.location}</Text>
      <Text style={styles.historyDate}>{task.date}</Text>
    </View>
    <View style={styles.historyStats}>
      <Text style={styles.historyTime}>{task.timeSpent}</Text>
      <View
        style={[styles.historyStatus, { backgroundColor: "#4CAF50" + "20" }]}
      >
        <Text style={[styles.historyStatusText, { color: "#4CAF50" }]}>
          Completed
        </Text>
      </View>
    </View>
  </View>
);

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("daily");
  const [levelProgress, setLevelProgress] = useState(userLevel.progress);

  return (
    <ScrollView style={styles.dashboardContainer}>
      {/* User Level Section */}
      <View style={styles.levelCard}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelTitle}>Level {userLevel.current}</Text>
          <Text style={styles.levelSubtitle}>{userLevel.title}</Text>
        </View>
        <View style={styles.levelProgressContainer}>
          <View style={styles.levelProgressBar}>
            <View
              style={[styles.levelProgressFill, { width: `${levelProgress}%` }]}
            />
          </View>
          <Text style={styles.levelProgressText}>
            {levelProgress}% to Level {userLevel.next}
          </Text>
        </View>
      </View>

      {/* Performance Stats Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "daily" && styles.activeTab]}
            onPress={() => setActiveTab("daily")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "daily" && styles.activeTabText,
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "weekly" && styles.activeTab]}
            onPress={() => setActiveTab("weekly")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "weekly" && styles.activeTabText,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "monthly" && styles.activeTab]}
            onPress={() => setActiveTab("monthly")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "monthly" && styles.activeTabText,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <StatCard
            title="Completed"
            value={performanceData[activeTab].completed}
            total={performanceData[activeTab].total}
            icon="checkmark-circle"
            color="#4CAF50"
          />
          <StatCard
            title="Streak"
            value={performanceData[activeTab].streak}
            icon="flame"
            color="#FF5722"
          />
          <StatCard
            title="Efficiency"
            value={`${Math.round(
              (performanceData[activeTab].completed /
                performanceData[activeTab].total) *
                100
            )}%`}
            icon="speedometer"
            color="#2196F3"
          />
        </View>
      </View>

      {/* Badges Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.badgesContainer}
        >
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </ScrollView>
      </View>

      {/* Task History Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        <View style={styles.historyContainer}>
          {taskHistory.map((task) => (
            <TaskHistoryItem key={task.id} task={task} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
