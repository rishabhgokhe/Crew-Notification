import { View, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { styles } from "../../styles/styles";

export default function ProfileScreen() {
  const userStats = {
    name: "Atharva Rahate",
    role: "Cleaning Crew",
    shift: "Morning",
    totalTasksCompleted: 45,
    thisWeekTasks: 12,
    averageResponseTime: "15 mins",
    efficiency: "92%",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: "#2e78b7",
          },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.profileCard}>
        <Text style={styles.name}>{userStats.name}</Text>
        <Text style={styles.role}>
          {userStats.role} • {userStats.shift} Shift
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Task Summary</Text>
      <View style={styles.row}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userStats.totalTasksCompleted}</Text>
          <Text style={styles.statLabel}>Total Completed</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userStats.thisWeekTasks}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Performance</Text>
      <View style={styles.analyticsBox}>
        <View style={styles.analyticRow}>
          <Text style={styles.analyticLabel}>Avg. Response</Text>
          <Text style={styles.analyticValue}>
            {userStats.averageResponseTime}
          </Text>
        </View>
        <View style={styles.analyticRow}>
          <Text style={styles.analyticLabel}>Efficiency</Text>
          <Text style={styles.analyticValue}>{userStats.efficiency}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
