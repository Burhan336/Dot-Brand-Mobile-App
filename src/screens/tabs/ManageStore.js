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
import { Ionicons } from "@expo/vector-icons";
import Header from "../../common/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const ManageStore = () => {
  const navigation = useNavigation();
  const [storeData, setStoreData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(storeData);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
          const apiUrl =
            "https://dotbrand-api.onrender.com/api/v1/superadmin/store";
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get(apiUrl, config);
          console.log("Store Data:", response.data.payload.stores); // Add this line to log the fetched data
          setStoreData(response.data.payload.stores);
          setFilteredData(response.data.payload.stores);
          setLoading(false);
        } else {
          console.log("Access token not found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Additional logic for applying dark mode across the app
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = storeData.filter((item) =>
      item.storeName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [showFilter, setShowFilter] = useState(false);
  const [filterOption, setFilterOption] = useState(null);

  const applyFilter = (option) => {
    setShowFilter(false);
    setFilterOption(option);

    let filtered = [...storeData];
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
        <Text style={styles.filterOption}>Active Stores</Text>
      </TouchableOpacity>
      {/* Add more filter options as needed */}
    </View>
  );

  //   Funtions for toggle buttons
  //   const [toggleAnims, setToggleAnims] = useState(
  //     storeData.reduce((acc, item) => {
  //       acc[item.id] = false; // Initialize toggle state for each card item
  //       return acc;
  //     }, {})
  //   );
  //   const toggleStatus = (id) => {
  //     setToggleAnims((prevAnims) => ({
  //       ...prevAnims,
  //       [id]: !prevAnims[id], // Update the toggle state for the specific card item
  //     }));
  //   };
  //   const [toggleAnim] = useState(new Animated.Value(0));
  const renderCard = ({ item }) => {
    console.log("Item:", item);
    // const toggleStatus = () => {
    //   Animated.timing(toggleAnim, {
    //     toValue: toggleAnim._value === 0 ? 1 : 0,
    //     duration: 300,
    //     useNativeDriver: false,
    //   }).start();
    // };

    return (
      <TouchableOpacity onPress={() => console.log("Card pressed")}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.label}>Store Name:</Text>
              <Text style={styles.value}>{item.storeName}</Text>
              <Text style={styles.label}>Admin Name:</Text>
              <Text style={styles.value}>{item.multiAdminEmail}</Text>
              <Text style={styles.label}>Admin Email:</Text>
              <Text style={styles.value}>{item.multiAdminName}</Text>
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
              {/* Toggle Button */}
              {/* <TouchableOpacity onPress={() => toggleStatus(item.id)}>
                <Animated.View
                  style={[
                    styles.toggleButton,
                    {
                      backgroundColor: toggleAnims[item.id]
                        ? "#dc3545"
                        : "#28a745",
                    },
                  ]}
                >
                  <Text style={styles.toggleText}>
                    {toggleAnims[item.id] ? "Inactive" : "Active"}
                  </Text>
                </Animated.View>
              </TouchableOpacity> */}
              <View style={styles.editDelete}>
                <TouchableOpacity onPress={() => console.log("Edit")}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color="#007bff"
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Delete")}>
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color="red"
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
        leftIcon={require("../../images/menu.png")}
        rightIcon={require("../../images/night-mode.png")}
        title={"Super Admin Panel"}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        onClickRightIcon={toggleDarkMode} // Pass the function to handle dark mode toggle
        isDarkMode={isDarkMode}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          {/* You can use any loader component here */}
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : !storeData.length ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>You are not signed in!</Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
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
                placeholder="Search Store"
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
});

export default ManageStore;
