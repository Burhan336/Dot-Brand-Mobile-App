import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Header from "../common/Header";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import AuthStorage from "../authentication/AuthStorage";

const MultiAdminScreen = () => {
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
    totalOutlets: 30,
    totalCatalogItems: 150,
    totalCategories: 10,
  });

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [30, 35, 40, 38, 45, 50], // Example data, replace with your data
      },
    ],
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      <Header
        leftIcon={require("../images/logout.png")}
        rightIcon={require("../images/night-mode.png")}
        title={"Multi Admin Panel"}
        onClickLeftIcon={() => {
          handleLogout();
        }}
        onClickRightIcon={toggleDarkMode}
        isDarkMode={isDarkMode}
        isLoggedIn={isLoggedIn} // Pass handleLogout function
        leftIconTestId="logout-icon" // Add testID for the left icon
        rightIconTestId="right-icon" // Add testID for the right icon
      />
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Login Successful!</Text>
        </View>
      )}
      {/* Updated section with title and labeled card section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Multi Chain Admin</Text>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.cardSectionLabel}>Manage Tasks</Text>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("ManageOutlets")}
          >
            <Text style={styles.cardTitle}>Manage Outlets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("MultiAdminManageCatalog")}
          >
            <Text style={styles.cardTitle}>Manage Catalog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("MultiAdminManageCategory")}
          >
            <Text style={styles.cardTitle}>Manage Category</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("MultiAdminManageBanners")}
          >
            <Text style={styles.cardTitle}>Manage Banners</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("MultiAdminManageBrands")}
          >
            <Text style={styles.cardTitle}>Manage Brands</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("MultiAdminManageUsers")}
          >
            <Text style={styles.cardTitle}>Manage Users</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[styles.card, styles.manageCard]}
            onPress={() => navigation.navigate("MultiAdminManageOrders")}
          >
            <Text style={styles.cardTitle}>Manage Orders</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Growth Chart</Text>
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
  welcomeContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
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
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  darkMode: {
    backgroundColor: "#222",
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardSectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: "blue",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
  },
  manageCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
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
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default MultiAdminScreen;
