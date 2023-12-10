import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import Typewriter from "react-native-typewriter";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming FontAwesome for icons
import axios from "axios"; // Import Axios
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  const [selectedRole, setSelectedRole] = useState("super-admin"); // Default role

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const apiUrl = "https://dotbrand-api.onrender.com/api/v1/auth/login";
    const requestBody = {
      email,
      password,
      role: selectedRole,
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        console.log("Login successful!", response.data);

        const { accessToken } = response.data.payload.token;

        // Check if accessToken is valid
        if (accessToken) {
          // Store accessToken in AsyncStorage after successful login
          AsyncStorage.setItem("accessToken", accessToken)
            .then(() => {
              console.log("Access token stored successfully");
            })
            .catch((error) => {
              console.error("Error storing access token:", error);
              // Handle error, such as showing an error message to the user
            });
        } else {
          console.error("Access token is null or undefined");
          // Handle the case where accessToken is null or undefined
        }

        // Assuming you have some logic to handle successful login here
        // For example, navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle error or display an error message to the user
      });
  };

  const simulateLoginAPI = (email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "burhan.sq4906@gmail.com" && password === "password") {
          resolve({ token: "exampleToken", role });
        } else {
          reject("Invalid credentials");
        }
      }, 1000);
    });
  };

  const mockLoginAPI = (email, password, role) => {
    console.log("Mock API - Login data:", { email, password, role });
  };

  return (
    <View style={styles.container}>
      {/* Blue Gradient Background */}
      <View style={styles.blueBackground}>
        {/* Circular Avatar Logo */}
        <View style={styles.avatar}>
          <Image
            source={require("../images/logo.png")} /* Replace with your image path */
            style={styles.avatarImage}
          />
        </View>
        {/* Display text: Welcome Back Super Admin */}
        <Typewriter
          style={styles.welcomeText}
          typing={1}
          maxDelay={50}
          fixed={true}
        >
          Welcome Back Admin
        </Typewriter>
      </View>
      {/* White Background */}
      <View style={styles.whiteBackground}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon
            name="envelope"
            size={20}
            color="#999"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.roleSelection}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "super-admin" && styles.selectedRoleButton,
            ]}
            onPress={() => setSelectedRole("super-admin")}
          >
            <Text
              style={selectedRole === "super-admin" ? { color: "#fff" } : null}
            >
              Super Admin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "multi-admin" && styles.selectedRoleButton,
            ]}
            onPress={() => setSelectedRole("multi-admin")}
          >
            <Text
              style={selectedRole === "multi-admin" ? { color: "#fff" } : null}
            >
              Multi Admin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "sole-admin" && styles.selectedRoleButton,
            ]}
            onPress={() => setSelectedRole("sole-admin")}
          >
            <Text
              style={selectedRole === "sole-admin" ? { color: "#fff" } : null}
            >
              Sole Admin
            </Text>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16288f",
  },
  blueBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16288f", // Replace with your gradient style
    borderBottomRightRadius: 150,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 22,
    marginTop: 60,
    marginBottom: 80,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 110,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 65,
    marginTop: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "70%",
    height: "70%",
    borderRadius: 75,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#8a8686",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
  },
  inputIcon: {
    position: "absolute",
    zIndex: 1,
    left: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    zIndex: 1,
  },
  roleSelection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  roleButton: {
    padding: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#999",
  },
  selectedRoleButton: {
    backgroundColor: "#16288f",
    borderColor: "#16288f",
    color: "#fff", // Adding text color for selected role button
  },
  loginButton: {
    backgroundColor: "#16288f",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 40,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
