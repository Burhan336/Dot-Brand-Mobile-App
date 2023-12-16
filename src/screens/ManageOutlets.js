import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../common/Header";
import AuthStorage from "../authentication/AuthStorage";

const ManageOutlets = () => {
  const navigation = useNavigation();

  const [outletData, setOutletData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(outletData);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchOutletData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
          const apiUrl =
            "https://dotbrand-api.onrender.com/api/v1/multiadmin/outlet";
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get(apiUrl, config);
          console.log("OutletData:", response.data.payload.outlets); // Add this line to log the fetched data
          setOutletData(response.data.payload.outlets);
          setFilteredData(response.data.payload.outlets);
          setLoading(false);
        } else {
          console.log("Access token not found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching outlet data:", error);
        setLoading(false);
      }
    };

    const checkLoginStatus = async () => {
      const loggedIn = await AuthStorage.isLoggedIn();
      setIsLoggedIn(loggedIn);
    };

    fetchOutletData();
    checkLoginStatus();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Additional logic for applying dark mode across the app
  };

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

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = outletData.filter((item) =>
      item.outletName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [showFilter, setShowFilter] = useState(false);
  const [filterOption, setFilterOption] = useState(null);

  const applyFilter = (option) => {
    setShowFilter(false);
    setFilterOption(option);

    let filtered = [...outletData];
    if (option === "created_at") {
      // Sort by Created At
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "status") {
      // Filter by Status
      filtered = filtered.filter((item) => item.isActive); // Directly compare boolean value
    }
    setFilteredData(filtered);
  };

  const renderFilterOptions = () => (
    <View style={styles.filterOptions}>
      <TouchableOpacity onPress={() => applyFilter("created_at")}>
        <Text style={styles.filterOption}>Sort by Created At</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => applyFilter("status")}>
        <Text style={styles.filterOption}>Active Outlets</Text>
      </TouchableOpacity>
      {/* Add more filter options as needed */}
    </View>
  );

  const renderCard = ({ item }) => {
    console.log("Item:", item);

    return (
      <TouchableOpacity onPress={() => console.log("Card pressed")}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.label}>Outlet Name:</Text>
              <Text style={styles.value}>{item.outletName}</Text>
              <Text style={styles.label}>Admin Name:</Text>
              <Text style={styles.value}>{item.adminName}</Text>
              <Text style={styles.label}>Admin Email:</Text>
              <Text style={styles.value}>{item.adminEmail}</Text>
              <Text style={styles.label}>Admin Number:</Text>
              <Text style={styles.value}>{item.adminNumber}</Text>
              <Text style={styles.label}>Longitude:</Text>
              <Text style={styles.value}>{item.longitude}</Text>
              <Text style={styles.label}>Latitude:</Text>
              <Text style={styles.value}>{item.latitude}</Text>
              <Text style={styles.label}>Tax Value:</Text>
              <Text style={styles.value}>{item.taxValue}</Text>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{item.address}</Text>
              <Text style={styles.label}>Created At:</Text>
              <Text style={styles.value}>{item.createdAt}</Text>
              <Text style={styles.label}>Status:</Text>
              <Text
                style={[
                  styles.value,
                  { color: item.isActive ? "#28a745" : "#dc3545" }, // Green for true, Red for false
                ]}
              >
                {item.isActive ? "Active" : "Inactive"}
              </Text>
            </View>

            <View style={styles.cardActions}>
              <View style={styles.editDelete}>
                <TouchableOpacity onPress={() => console.log("Edit")}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color="#007bff"
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      <Header
        leftIcon={require("../images/logout.png")}
        rightIcon={require("../images/night-mode.png")}
        title={"Manage Outlets"}
        onClickLeftIcon={() => {
          handleLogout();
        }}
        onClickRightIcon={toggleDarkMode}
        isDarkMode={isDarkMode}
        isLoggedIn={isLoggedIn} // Pass handleLogout function
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddOutlet")}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      {loading ? (
        <View style={styles.loaderContainer}>
          {/* You can use any loader component here */}
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : !outletData.length ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>There is no data to show here!</Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.searchFilterContainer}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#777"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Outlet"
                placeholderTextColor="#777"
                onChangeText={handleSearch}
                value={searchText}
              />
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilter(!showFilter)}
            >
              <Ionicons
                name="filter"
                size={20}
                color="#fff"
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
          {filteredData.length === 0 && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                Not signed in. Please sign in!
              </Text>
            </View>
          )}
          {showFilter && renderFilterOptions()}
          <FlatList
            data={filteredData}
            renderItem={renderCard}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkMode: {
    backgroundColor: "#222", // Dark mode background color for the entire screen
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 6,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  filterIcon: {
    marginLeft: 5,
  },
  filterOptions: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    zIndex: 2,
  },
  filterOption: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  cardContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardInfo: {
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 3,
    color: "#444",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  toggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    color: "#fff",
    fontWeight: "500",
  },
  actionIcon: {
    marginLeft: 16,
  },
  flatListContent: {
    paddingVertical: 8,
  },
  editDelete: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 50,
    right: 30,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
  },
});

export default ManageOutlets;
