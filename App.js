import "react-native-gesture-handler";
import { useFonts } from "expo-font";
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
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
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
} from "./src/screens";
import { decode, encode } from "base-64";
import { StatusBar } from "expo-status-bar";
// import Onboarding from 'react-native-onboarding-swiper';

// <Onboarding
//     pages={[
//     {
//     backgroundColor: '#a6e4d0',
//     image: <Image source={require('./assets/avatar.png')} />,
//     title: 'Welcome',
//     subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
//     },
//     ]}
// />
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

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
        name="Finder"
        component={FinderScreen} // Search Screen
        options={{
          title: "finder",
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
  const [fontsLoaded] = useFonts({
    Oregano: require("./assets/fonts/Oregano-Regular.ttf"),
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const theme = useTheme({
    ...DefaultTheme,
    colors: {
      primary: "#d0312d",
    },
  });

  return (
    <PaperProvider theme={theme}>
      {/* <StatusBar style="light" /> */}
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              
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
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
                // options={{ headerShown: false }}
              />
            </>
          ) : (
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
                name="find a donor"
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
              <Stack.Screen
                name="donated"
                component={CreateDonationScreen}
              />
              <Stack.Screen name="Thank You" component={ThankYouScreen} />
              <Stack.Screen name="Confirm" component={ConfirmScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
