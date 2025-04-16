import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../../styles/styles";
import { LocationTracker } from "../../components/LocationTracker";

const getStatusColor = (status) => {
  switch (status) {
    case "assigned":
      return "#aaa";
    case "accepted":
      return "#3498db";
    case "in progress":
      return "#e69b00";
    case "completed":
      return "#4CAF50";
    default:
      return "#aaa";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "#ff3b30";
    case "medium":
      return "#ff9500";
    case "low":
      return "#34c759";
    default:
      return "#8e8e93";
  }
};

const TaskCard = ({ task, onStatusChange }) => {
  const handlePress = () => {
    if (task.status === "assigned") {
      onStatusChange(task.id, "accepted");
    } else if (task.status === "accepted") {
      onStatusChange(task.id, "in progress");
    } else if (task.status === "in progress") {
      onStatusChange(task.id, "completed");
    }
  };

  const getButtonText = () => {
    if (task.status === "assigned") return "Accept Task";
    if (task.status === "accepted") return "Start Task";
    if (task.status === "in progress") return "Complete Task";
    return "";
  };

  const getButtonStyle = () => {
    if (task.status === "assigned") return styles.acceptBtn;
    if (task.status === "accepted") return styles.startBtn;
    if (task.status === "in progress") return styles.completeBtn;
    return {};
  };

  const getTextStyle = () => {
    if (task.status === "assigned") return styles.acceptText;
    if (task.status === "accepted") return styles.startText;
    if (task.status === "in progress") return styles.completeText;
    return {};
  };

  const isOverdue =
    new Date(task.deadline) < new Date() && task.status !== "completed";

  return (
    <View style={[styles.card, isOverdue && styles.overdueCard]}>
      <View style={styles.headerRow}>
        <View style={styles.typeRow}>
          {task.type === "Garbage" ? (
            <FontAwesome5 name="trash-alt" size={16} color="#333" />
          ) : (
            <Ionicons name="water" size={18} color="#333" />
          )}
          <Text style={styles.typeText}> {task.type}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: getStatusColor(task.status) }]}>
            {task.status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Ionicons name="location-outline" size={16} color="#777" />
        <Text style={styles.detailText}>{task.latitude}</Text>
      </View>

      {task.status !== "completed" && (
        <TouchableOpacity style={getButtonStyle()} onPress={handlePress}>
          <Text style={getTextStyle()}>{getButtonText()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function TaskScreen() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks?assignedTo=kyxbxjRJKmxazJHkCz5A');
        const text = await response.text();
        console.log("Raw response:", text);

        if (!text) {
          console.error("Empty response from server");
          return;
        }

        const data = JSON.parse(text);

        if (Array.isArray(data)) {
          const transformedData = data.map((item) => ({
            id: item.id?.toString(),
            type: item.type?.charAt(0).toUpperCase() + item.type?.slice(1) || "Unknown",
            location: item.location || "Not Provided",
            time: new Date(item.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) || "N/A",
            deadline: item.time || new Date().toISOString(),
            status: item.status?.toLowerCase() || "assigned",
            priority: "low", // No priority field in API, defaulting
            latitude: item.latitude?.toString() || "Unknown Location",
          }));
          setTaskList(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const completedCount = taskList.filter(
    (t) => t.status === "completed"
  ).length;

  const updateTaskStatus = (id, newStatus) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
      <Text style={styles.subtitle}>
        {completedCount} of {taskList.length} tasks completed
      </Text>

      <LocationTracker />

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onStatusChange={updateTaskStatus} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}