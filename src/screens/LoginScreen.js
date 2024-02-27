import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Typewriter from "react-native-typewriter";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthStorage from "../authentication/AuthStorage";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("false");
  const [selectedRole, setSelectedRole] = useState("super-admin");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginMessage, setLoginMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigation = useNavigation(); // Access navigation object

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showLoginMessage = (message, type) => {
    setLoginMessage(message);
    setMessageType(type);

    setTimeout(() => {
      setLoginMessage("");
      setMessageType("");
    }, 5000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, { setSubmitting }) => {
    setIsLoading(true); // Set loader to true when login initiated

    const apiUrl = "https://dotbrand-api.onrender.com/api/v1/auth/login";
    const requestBody = {
      email: values.email,
      password: values.password,
      role: selectedRole,
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        const { accessToken } = response.data.payload.token;

        if (accessToken) {
          AsyncStorage.setItem("accessToken", accessToken)
            .then(() => {
              console.log("Access token stored successfully");
              console.log(accessToken);
              setIsLoading(false); // Toggle loader back to false after successful login
              // setIsLoggedIn(true);
              AuthStorage.setLoggedIn();

              // Navigate to different screens based on selected role
              switch (selectedRole) {
                case "super-admin":
                  navigation.navigate("Home");
                  break;
                case "multi-admin":
                  navigation.navigate("MultiAdminScreen");
                  break;
                case "sole-admin":
                  navigation.navigate("SoleAdminScreen");
                  break;
                default:
                  break;
              }
              showLoginMessage("Login successful!", "success");
            })
            .catch((error) => {
              setIsLoading(false); // Toggle loader back to false if storing token fails
              // console.error("Error storing access token:", error);
              showLoginMessage("Login failed! Please try again.", "error");
              // Handle error, such as showing an error message to the user
            });
        } else {
          setIsLoading(false); // Toggle loader back to false if accessToken is null or undefined
          // console.error("Access token is null or undefined");
          showLoginMessage("Login failed! Please try again.", "error");
        }
      })
      .catch((error) => {
        setIsLoading(false); // Toggle loader back to false if login fails
        // console.error("Login failed:", error);
        showLoginMessage("Login failed! Please try again.", "error");
      })
      .finally(() => {
        setSubmitting(false); // Ensure submission state is updated in Formik
      });
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation.navigate("HomeScreen");
  //   }
  // }, [isLoggedIn]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
      }) => (
        <View style={styles.container}>
          <View style={styles.blueBackground}>
            <View style={styles.avatar}>
              <Image
                source={require("../images/logo.png")} /* Replace with your image path */
                style={styles.avatarImage}
              />
            </View>
            <Typewriter
              style={styles.welcomeText}
              typing={1}
              maxDelay={50}
              fixed={true}
            >
              Welcome Back Admin
            </Typewriter>
          </View>
          <View style={styles.whiteBackground}>
            {loginMessage !== "" && (
              <View style={styles.loginMessageContainer}>
                <Text
                  style={
                    messageType === "success"
                      ? styles.successText
                      : styles.errorText
                  }
                >
                  {loginMessage}
                </Text>
              </View>
            )}
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
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={styles.roleSelection}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === "super-admin" && styles.selectedRoleButton,
                ]}
                onPress={() => setSelectedRole("super-admin")}
              >
                <Text
                  style={
                    selectedRole === "super-admin" ? { color: "#fff" } : null
                  }
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
                  style={
                    selectedRole === "multi-admin" ? { color: "#fff" } : null
                  }
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
                  style={
                    selectedRole === "sole-admin" ? { color: "#fff" } : null
                  }
                >
                  Sole Admin
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  blueBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderBottomRightRadius: 150,
  },
  loginMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  successText: {
    color: "green",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: -15,
    marginBottom: 15,
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
    backgroundColor: "blue",
    borderColor: "blue",
    color: "#fff",
  },
  buttonContainer: {
    alignItems: "center",
  },
  activityIndicatorContainer: {
    marginTop: 20, // Adjust the margin as needed
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: "center",
    marginTop: 60,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
