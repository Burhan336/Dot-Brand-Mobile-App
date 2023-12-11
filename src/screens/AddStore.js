import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../common/Header";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStorage from "../authentication/AuthStorage";
import axios from "axios";

const AddStore = () => {
  const [storeName, setStoreName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AuthStorage.isLoggedIn();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthStorage.clearLoggedIn(navigation);
      setIsLoggedIn(false);
      // Additional logic for navigation or state resetting if needed
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error if needed
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Additional logic for applying dark mode across the app
  };

  const handleAddStore = async () => {
    try {
      setIsLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");
      const apiUrl =
        "https://dotbrand-api.onrender.com/api/v1/superadmin/store";

      const payload = {
        storeName,
        multiAdminName: adminName,
        multiAdminEmail: adminEmail,
        multiAdminPassword: adminPassword,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(apiUrl, payload, config);

      // Check the response and handle success or any errors accordingly
      console.log("Store added successfully:", response.data);

      setStoreName("");
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");

      // Navigate back to 'ManageStores' upon successful addition of the store
      navigation.navigate("ManageStore");

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding store:", error);
      setIsLoading(false);
      // Handle error in adding store
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      <Header
        leftIcon={require("../images/logout.png")}
        rightIcon={require("../images/night-mode.png")}
        title={"Super Admin Panel"}
        onClickLeftIcon={handleLogout}
        onClickRightIcon={toggleDarkMode}
        isDarkMode={isDarkMode}
        isLoggedIn={isLoggedIn}
      />
      <View style={styles.formContent}>
        <Text style={styles.heading}>Add Store</Text>
        <View style={styles.inputSection}>
          <Text style={styles.label}>Store Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter store name"
            value={storeName}
            onChangeText={setStoreName}
          />
        </View>
        <View style={styles.adminSection}>
          <Text style={styles.subHeading}>Admin Details</Text>
          <Text style={styles.label}>Multi Admin Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter admin name"
            value={adminName}
            onChangeText={setAdminName}
          />

          <Text style={styles.label}>Multi Admin Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter admin email"
            value={adminEmail}
            onChangeText={setAdminEmail}
          />

          <View style={styles.passwordSection}>
            <Text style={styles.label}>Multi Admin Password</Text>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter admin password"
              secureTextEntry={!showPassword}
              value={adminPassword}
              onChangeText={setAdminPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddStore}
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add Store</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContent: {
    margin: 20, // Margin for the form content
  },
  darkMode: {
    backgroundColor: "#222",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  adminSection: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordSection: {
    marginBottom: 20,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 15,
    position: "relative", // Add this to position the icon relative to this container
  },

  eyeIcon: {
    position: "absolute",
    right: 8,
    top: "50%", // Adjust this to vertically center the eye icon
    marginTop: -8, // Half of the eye icon's height to properly center it
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#007bff",
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddStore;
