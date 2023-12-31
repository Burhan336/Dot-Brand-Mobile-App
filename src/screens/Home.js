import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Header from "../common/Header";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import AuthStorage from "../authentication/AuthStorage";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Check login status when the component mounts
    const checkLoginStatus = async () => {
      const loggedIn = await AuthStorage.isLoggedIn();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Show for 3 seconds
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthStorage.clearLoggedIn(navigation); // Clear logged-in status
      setIsLoggedIn(false); // Update state to reflect logout
      // Additional logic for navigating or resetting state if needed
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error if needed
    }
  };

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
        leftIcon={require("../images/logout.png")}
        rightIcon={require("../images/night-mode.png")}
        title={"Super Admin Panel"}
        onClickLeftIcon={() => {
          handleLogout();
        }}
        onClickRightIcon={toggleDarkMode}
        isDarkMode={isDarkMode}
        isLoggedIn={isLoggedIn} // Pass handleLogout function
        leftIconTestId="logout-icon" // Add testID for the left icon
        rightIconTestId="night-mode-icon" // Add testID for the right icon
      />
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Login Successful!</Text>
        </View>
      )}
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
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate("ManageStore")}
        >
          <Text style={styles.manageButtonText}>Manage Stores</Text>
        </TouchableOpacity>
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
  successMessage: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999,
  },
  successText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
  manageButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  manageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
