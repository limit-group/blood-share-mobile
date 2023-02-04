import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useTheme,
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import {
  useFonts,
  Oregano_400Regular,
  Oregano_400Regular_Italic,
} from "@expo-google-fonts/oregano";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  DonationScreen,
  DonationFeedScreen,
  ProfileScreen,
  VerifyScreen,
  ThankYouScreen,
  BloodCardScreen,
  EmergencyFeedScreen,
  CreateFeedScreen,
  CreateEFeedScreen,
  CreateDonationScreen,
  CompleteProfileScreen,
  ForgotPasswordScreen,
  FinderScreen,
  ConfirmScreen,
  SettingsScreen,
  RequestsScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import { StatusBar } from "expo-status-bar";
import { getValueFor } from "./src/utils/auth";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Screen() {
  return <Tab.Group></Tab.Group>;
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#d0312d",
      }}
      barStyle={{ backgroundColor: "white" }}
      // activeColor="white"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen} //Home Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={DonationFeedScreen} // Search Screen
        options={{
          title: "feed",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="feed-discussion" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestsScreen} // Search Screen
        options={{
          title: "requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={BloodCardScreen}
        options={{
          title: "profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="card-account-details-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Oregano_400Regular,
    Oregano_400Regular_Italic,
  });

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const theme = useTheme({
    ...DefaultTheme,
    colors: {
      primary: "#fc7d7b",
    },
  });
  return (
    <PaperProvider theme={theme}>
      {/* <StatusBar style="light" /> */}
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? (
            <>
              <Stack.Screen
                name="BloodShare"
                component={Home}
                // onLayout={onLayoutRootView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="announce donation drive"
                component={CreateFeedScreen}
                // options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Request for Blood"
                component={CreateEFeedScreen}
                // options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Donations"
                component={DonationScreen}
                // options={{ headerShown: false }}
              />
              <Stack.Screen name="donated" component={CreateDonationScreen} />
              <Stack.Screen name="Thank You" component={ThankYouScreen} />
              <Stack.Screen name="Confirm" component={ConfirmScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Verify"
                component={VerifyScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Complete Profile"
                component={CompleteProfileScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
                // options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
