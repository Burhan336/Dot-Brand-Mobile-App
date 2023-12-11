import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// import Main from "./screens/Main";
import ManageStore from "./screens/tabs/ManageStore";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MultiAdminScreen from "./screens/MultiAdminScreen";
import ManageOutlets from "./screens/ManageOutlets";
import ManageCatalog from "./screens/ManageCatalog";
import ManageCategories from "./screens/ManageCategories";
import ManageBanners from "./screens/ManageBanners";
import ManageBrands from "./screens/ManageBrands";
import ManageUsers from "./screens/ManageUsers";
import ManageOrders from "./screens/ManageOrders";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageStore"
          component={ManageStore}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MultiAdminScreen"
          component={MultiAdminScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageOutlets"
          component={ManageOutlets}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageCatalog"
          component={ManageCatalog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageCategories"
          component={ManageCategories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageBanners"
          component={ManageBanners}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageBrands"
          component={ManageBrands}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageUsers"
          component={ManageUsers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageOrders"
          component={ManageOrders}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
