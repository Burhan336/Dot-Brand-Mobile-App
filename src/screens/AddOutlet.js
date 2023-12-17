import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../common/Header";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthStorage from "../authentication/AuthStorage";
import axios from "axios";

const AddOutlet = () => {
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

  const initialValues = {
    outletName: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminNumber: "",
    address: "",
    latitude: "",
    longitude: "",
    taxType: "",
    taxValue: "",
    status: true,
  };

  const validationSchema = Yup.object().shape({
    outletName: Yup.string().required("Outlet name is required"),
    adminName: Yup.string().required("Admin name is required"),
    adminEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    adminPassword: Yup.string().required("Password is required"),
    adminNumber: Yup.string().required("Admin number is required"),
    address: Yup.string().required("Address is required"),
    latitude: Yup.number()
      .min(-90, "Latitude must be greater than or equal to -90")
      .max(90, "Latitude must be less than or equal to 90")
      .required("Latitude is required"),
    longitude: Yup.number()
      .min(-180, "Longitude must be greater than or equal to -180")
      .max(180, "Longitude must be less than or equal to 180")
      .required("Longitude is required"),
    taxType: Yup.string().required("Tax type is required"),
    taxValue: Yup.string()
      .matches(
        /^\d+(\.\d+)?%$/,
        "Tax value must be in the format like 2.5% or 4%"
      )
      .required("Tax value is required"),
    status: Yup.boolean().required("Status is required"),
  });

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

  const handleAddOutlet = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");
      const apiUrl =
        "https://dotbrand-api.onrender.com/api/v1/multiadmin/outlet/";

      const payload = {
        outletName: values.outletName,
        adminName: values.adminName,
        adminEmail: values.adminEmail,
        adminPassword: values.adminPassword,
        adminNumber: values.adminNumber,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
        taxType: values.taxType,
        taxValue: values.taxValue,
        status: true,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(apiUrl, payload, config);

      // Check the response and handle success or any errors accordingly
      console.log("Outlet added successfully:", response.data);
      resetForm();
      // Navigate back to 'ManageOutlets' upon successful addition of the Outlet
      navigation.navigate("ManageOutlets");
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding outlet:", error);
      setIsLoading(false);
      // Handle error in adding outlet
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddOutlet}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
        resetForm,
      }) => (
        <ScrollView style={[styles.container, isDarkMode && styles.darkMode]}>
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
            <Text style={styles.heading}>Add Outlet</Text>
            <View style={styles.inputSection}>
              {/* Outlet Name */}
              <Text style={styles.label}>Outlet Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter outlet name"
                value={values.outletName}
                onChangeText={handleChange("outletName")}
                onBlur={handleBlur("outletName")}
              />
              {touched.outletName && errors.outletName && (
                <Text style={styles.errorText}>{errors.outletName}</Text>
              )}

              {/* Admin Details */}
              <View style={styles.adminSection}>
                <Text style={styles.subHeading}>Admin Details</Text>

                {/* Admin Name */}
                <Text style={styles.label}>Multi Admin Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter admin name"
                  value={values.adminName}
                  onChangeText={handleChange("adminName")}
                  onBlur={handleBlur("adminName")}
                />
                {touched.adminName && errors.adminName && (
                  <Text style={styles.errorText}>{errors.adminName}</Text>
                )}

                {/* Admin Email */}
                <Text style={styles.label}>Multi Admin Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter admin email"
                  value={values.adminEmail}
                  onChangeText={handleChange("adminEmail")}
                  onBlur={handleBlur("adminEmail")}
                />
                {touched.adminEmail && errors.adminEmail && (
                  <Text style={styles.errorText}>{errors.adminEmail}</Text>
                )}
                {/* Admin Password */}
                <View style={styles.passwordSection}>
                  <Text style={styles.label}>Multi Admin Password</Text>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter admin password"
                    secureTextEntry={!showPassword}
                    value={values.adminPassword}
                    onChangeText={handleChange("adminPassword")}
                    onBlur={handleBlur("adminPassword")}
                  />
                  {touched.adminPassword && errors.adminPassword && (
                    <Text style={styles.errorText}>{errors.adminPassword}</Text>
                  )}
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

                {/* Additional Fields */}
                <Text style={styles.label}>Admin Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter admin phone number"
                  value={values.adminNumber}
                  onChangeText={handleChange("adminNumber")}
                  onBlur={handleBlur("adminNumber")}
                />
                {touched.adminNumber && errors.adminNumber && (
                  <Text style={styles.errorText}>{errors.adminNumber}</Text>
                )}

                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter address"
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                />
                {touched.address && errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}

                <Text style={styles.label}>Latitude</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter latitude between -90.00 to 90.00"
                  value={values.latitude}
                  onChangeText={handleChange("latitude")}
                  onBlur={handleBlur("latitude")}
                />
                {touched.latitude && errors.latitude && (
                  <Text style={styles.errorText}>{errors.latitude}</Text>
                )}

                <Text style={styles.label}>Longitude</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter longitude between -180.00 to 180.00"
                  value={values.longitude}
                  onChangeText={handleChange("longitude")}
                  onBlur={handleBlur("longitude")}
                />
                {touched.longitude && errors.longitude && (
                  <Text style={styles.errorText}>{errors.longitude}</Text>
                )}

                <Text style={styles.label}>Tax Type</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter tax type"
                  value={values.taxType}
                  onChangeText={handleChange("taxType")}
                  onBlur={handleBlur("taxType")}
                />
                {touched.taxType && errors.taxType && (
                  <Text style={styles.errorText}>{errors.taxType}</Text>
                )}

                <Text style={styles.label}>Tax Value</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter tax value"
                  value={values.taxValue}
                  onChangeText={handleChange("taxValue")}
                  onBlur={handleBlur("taxValue")}
                />
                {touched.taxValue && errors.taxValue && (
                  <Text style={styles.errorText}>{errors.taxValue}</Text>
                )}
                {/* 
                <Text style={styles.label}>Status</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter status"
                  value={status}
                  onChangeText={setStatus}
                /> */}
              </View>

              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleSubmit}
                  disabled={isSubmitting} // Disable button during loading
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Add Outlet</Text>
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
        </ScrollView>
      )}
    </Formik>
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
  errorText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "red",
    marginTop: -10,
    marginBottom: 10,
    // Add other necessary styles
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

export default AddOutlet;
