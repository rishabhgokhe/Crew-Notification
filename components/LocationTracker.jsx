import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocationTracking } from "../hooks/useLocationTracking";

export const LocationTracker = () => {
  const { location, error } = useLocationTracking(2000);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Getting location...</Text>
      </View>
    );
  }

  const locationData = location;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Location</Text>
      <Text style={styles.text}>Latitude: {locationData.latitude}</Text>
      <Text style={styles.text}>Longitude: {locationData.longitude}</Text>
      <Text style={styles.text}>
        Last Updated: {new Date(locationData.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
