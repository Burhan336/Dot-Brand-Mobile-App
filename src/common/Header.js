import React from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isDarkMode, // Added prop to track the dark mode status
}) => {
  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkMode]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon}>
          <Image source={leftIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onClickRightIcon}>
          <Image source={rightIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const iconSize = 24; // Set your desired icon size

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000448FD",
  },
  darkMode: {
    backgroundColor: "#000", // Dark mode background color
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: width * 0.05,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: iconSize,
    height: iconSize,
    tintColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    maxWidth: width * 0.6,
    textAlign: "center",
  },
});

export default Header;
