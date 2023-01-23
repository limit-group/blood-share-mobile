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
        name="Requests"
        component={EmergencyFeedScreen}
        options={{
          title: "requests",
          tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="car-emergency"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Donation"
        component={DonationScreen} // Search Screen
        options={{
          title: "donations",
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
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       await Font.loadAsync(Entypo.font);
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Black.ttf"),
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);

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
                name="Complete"
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
