import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "../../common/Header";
import { AntDesign, Feather } from "@expo/vector-icons"; // Import icons from Expo
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState(0);

  useEffect(() => {
    // Retrieve the access token when the component mounts
    retrieveTokenFromStorage();
  }, []);

  const retrieveTokenFromStorage = async () => {
    try {
      // Retrieve the access token from AsyncStorage
      const token = await AsyncStorage.getItem("accessToken");
      if (token !== null) {
        setAccessToken(token); // Update state with the retrieved token
      } else {
        console.log("Access token not found");
        // Handle the case where accessToken is not stored
      }
    } catch (error) {
      console.error("Error retrieving access token:", error);
      // Handle error, such as showing an error message to the user
    }
  };

  const handleLogout = async () => {
    try {
      // Remove the access token from AsyncStorage
      await AsyncStorage.removeItem("accessToken");
      // Navigate to your sign-in screen or perform any other action
      navigation.navigate("LoginScreen"); // Replace "SignIn" with your actual sign-in screen name
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error, such as showing an error message to the user
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../images/menu.png")}
        rightIcon={require("../../images/notification.png")}
        title={"Profile"}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.header}>
        <Image
          source={require("../../images/burhan.jpg")}
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Burhan Saqib</Text>
          <Text style={styles.email}>burhan.sq4906@gmail.com</Text>
        </View>
      </View>

      <View style={styles.profileContent}>
        <TouchableOpacity style={styles.section} onPress={() => {}}>
          <View style={styles.sectionLeft}>
            <AntDesign name="edit" size={24} color="black" />
            <Text style={styles.sectionTitle}>Edit Profile</Text>
          </View>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {}}>
          <View style={styles.sectionLeft}>
            <AntDesign name="setting" size={24} color="black" />
            <Text style={styles.sectionTitle}>Settings</Text>
          </View>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {}}>
          <View style={styles.sectionLeft}>
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text style={styles.sectionTitle}>Orders</Text>
          </View>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {}}>
          <View style={styles.sectionLeft}>
            <AntDesign name="book" size={24} color="black" />
            <Text style={styles.sectionTitle}>Address Book</Text>
          </View>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Display the retrieved access token */}
        {accessToken !== "" && (
          <View style={styles.accessTokenContainer}>
            <Text style={styles.accessTokenLabel}>Access Token:</Text>
            <Text style={styles.accessTokenValue}>{accessToken}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  profileContent: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Profile;
