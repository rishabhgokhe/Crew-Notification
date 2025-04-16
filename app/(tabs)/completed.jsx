import { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../../styles/styles";

export default function CompletedTasksScreen() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [firebaseData, setFirebaseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompletedTasks = async () => {
    const mockCompletedTasks = [
      {
        id: "1",
        location: "Admin Building",
        type: "Garbage",
        priority: "high",
        detectedBy: "Admin Camera",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEf-sqlqwMAD0Do5Micxi-vIhySB454goIZg&s",
        completedAt: "2024-03-20T10:30:00Z",
      },
      {
        id: "2",
        location: "Library Hall",
        type: "Garbage",
        priority: "medium",
        detectedBy: "Library Camera",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEf-sqlqwMAD0Do5Micxi-vIhySB454goIZg&s",
        completedAt: "2024-03-21T11:00:00Z",
      },
    ];
    setCompletedTasks(mockCompletedTasks);
  };

  const fetchFirebaseData = async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(
        collection(db, "completedTasks"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        type:
          doc.data().type.charAt(0).toUpperCase() + doc.data().type.slice(1),
        status:
          doc.data().status.charAt(0).toUpperCase() +
          doc.data().status.slice(1),
      }));
      console.log("Firebase data:", data);
      setFirebaseData(data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching Firebase data:", error);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCompletedTasks();
    setRefreshing(false);
  };

  const renderCompletedTask = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowSpace}>
        <Text style={styles.location}>
          <FontAwesome name="map-marker" size={16} color="#444" />{" "}
          {item.location}
        </Text>
        <Text style={styles.time}>
          <FontAwesome name="clock-o" size={14} color="#666" />{" "}
          {new Date(item.time).toLocaleString()}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.type}</Text>
      </View>

      <View style={styles.rowSpace}>
        <Text style={styles.detectedBy}>
          <MaterialCommunityIcons name="cctv" size={16} color="#555" />{" "}
          Detection ID: {item.detectionId}
        </Text>
        <Text
          style={[
            styles.status,
            { color: item.status === "Completed" ? "#4CAF50" : "#666" },
          ]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.coordinates}>
        <Text style={styles.coordinateText}>
          <FontAwesome name="location-arrow" size={14} color="#666" /> Lat:{" "}
          {item.latitude}, Long: {item.longitude}
        </Text>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No completed tasks found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Completed Tasks",
          headerStyle: { backgroundColor: "#2e78b7" },
          headerTintColor: "#fff",
        }}
      />
      <Text style={styles.title}>Completed Tasks</Text>
      <Button title="Show Firebase Data" onPress={fetchFirebaseData} />
      <FlatList
        data={completedTasks}
        renderItem={renderCompletedTask}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Firebase Tasks</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>

          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#2e78b7" />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <Button title="Retry" onPress={fetchFirebaseData} />
            </View>
          ) : (
            <FlatList
              data={firebaseData}
              renderItem={renderCompletedTask}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={renderEmptyList}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
