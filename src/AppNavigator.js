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
import ManageUsers from "./screens/ManageUsers";
import ManageOrders from "./screens/ManageOrders";
import SoleAdminScreen from "./screens/SoleAdminScreen";
import SoleAdminManageProducts from "./screens/SoleAdminManageProducts";
import SoleAdminManageCatalog from "./screens/SoleAdminManageCatalog";
import SoleAdminManageCategory from "./screens/SoleAdminManageCategory";
import SoleAdminManageBanners from "./screens/SoleAdminManageBanners";
import SoleAdminManageBrands from "./screens/SoleAdminManageBrands";
import MultiAdminManageCatalog from "./screens/MultiAdminManageCatalog";
import MultiAdminManageCategory from "./screens/MultiAdminManageCategory";
import MultiAdminManageBanners from "./screens/MultiAdminManageBanners";
import MultiAdminManageBrands from "./screens/MultiAdminManageBrands";
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
          name="MultiAdminManageCatalog"
          component={MultiAdminManageCatalog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MultiAdminManageCategory"
          component={MultiAdminManageCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MultiAdminManageBanners"
          component={MultiAdminManageBanners}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MultiAdminManageBrands"
          component={MultiAdminManageBrands}
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
        <Stack.Screen
          name="SoleAdminScreen"
          component={SoleAdminScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SoleAdminManageProducts"
          component={SoleAdminManageProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SoleAdminManageCatalog"
          component={SoleAdminManageCatalog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SoleAdminManageCategory"
          component={SoleAdminManageCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SoleAdminManageBanners"
          component={SoleAdminManageBanners}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SoleAdminManageBrands"
          component={SoleAdminManageBrands}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
