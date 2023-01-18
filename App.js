import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Appbar,
  Menu,
  useTheme,
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  DonationScreen,
  DonationFeedScreen,
  ProfileScreen,
  FeedScreen,
  CompleteScreen,
  BloodCardScreen,
  EmergencyFeedScreen,
  CreateFeedScreen,
  CreateEFeedScreen,
  CreateDonationScreen,
  CompleteProfileScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import VerifyScreen from "./src/screens/VerifyScreen/VerifyScreen";
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
      labeled={false}
      barStyle={{ backgroundColor: "white" }}
      activeColor="white"
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
          title: "donation drives",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Requests"
        component={EmergencyFeedScreen}
        options={{
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

function CustomNavigationBar({ navigation, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="BloodShare" />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => {
              console.log("Option 1 was pressed");
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log("Option 2 was pressed");
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log("Option 3 was pressed");
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default function App() {
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
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
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
                name="Complete"
                component={CompleteProfileScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="BloodShare"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Donation Post"
                component={CreateFeedScreen}
                // options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Emergency Post"
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
                name="Create Donation"
                component={CreateDonationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
