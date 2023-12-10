import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Header from "../../common/Header";
import { LineChart } from "react-native-chart-kit";

const Home = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Additional logic for applying dark mode across the app
  };

  const [stats, setStats] = useState({
    totalStores: 20,
    activeStores: 15,
    inactiveStores: 5,
  });

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 25, 30, 28, 35, 40], // Example data, replace with your data
      },
    ],
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      <Header
        leftIcon={require("../../images/menu.png")}
        rightIcon={require("../../images/night-mode.png")}
        title={"Super Admin Panel"}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        onClickRightIcon={toggleDarkMode} // Pass the function to handle dark mode toggle
        isDarkMode={isDarkMode} // Pass the dark mode state to the Header component
      />

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Hello, Super Admin!</Text>
          <Text style={styles.subtitle}>Welcome back to your dashboard.</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Statistics</Text>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Total Stores</Text>
            <Text style={styles.statValue}>{stats.totalStores}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Active Stores</Text>
            <Text style={styles.statValueActive}>{stats.activeStores}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Inactive Stores</Text>
            <Text style={styles.statValueInactive}>{stats.inactiveStores}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Stores Growth</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={350}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#f5f5f5",
              decimalPlaces: 0,
              color: () => "blue",
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  darkMode: {
    backgroundColor: "#222", // Dark mode background color for the entire screen
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    width: "30%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  statValueActive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  statValueInactive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  activityItem: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default Home;
