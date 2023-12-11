// import React from "react";
// import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
// import Header from "../common/Header";
// import { useState } from "react";
// import Home from "./tabs/Home";
// import Profile from "./tabs/Profile";
// import ManageStore from "./tabs/ManageStore";
// import LoginScreen from "./LoginScreen";

// const HomeScreen = () => {
//   const [selectedTab, setSelectedTab] = useState(0);
//   const handleIconPress = (iconName) => {
//     // Implement functionality for each icon press here
//     console.log(`Pressed ${iconName}`);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       {/* <Header
//         leftIcon={require("../images/menu.png")}
//         rightIcon={require("../images/notification.png")}
//         title={"Dot Brand"}
//       /> */}

//       {/* Main Content */}
//       <View style={styles.content}>
//         {/* Add your main content here */}
//         {selectedTab == 0 ? (
//           <Home />
//         ) : selectedTab == 1 ? (
//           <ManageStore />
//         ) : selectedTab == 2 ? (
//           <Profile />
//         ) : (
//           <LoginScreen />
//         )}
//       </View>
//     </View>
//   );
// };

// const iconSize = 25; // Adjust the icon size here

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   content: {
//     flex: 1, // Takes up remaining space between header and bottom container
//     // Add styles for your main content here
//   },

//   image: {
//     width: iconSize,
//     height: iconSize,
//   },
// });

// export default HomeScreen;
