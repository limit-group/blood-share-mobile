import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Navbar from "../components/Navbar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function BloodCardScreen({ navigation }) {
  const [value, setValue] = React.useState("");

  // const image = {require("../../../assets/avatar.png")};

  const toEditProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <>
      <Navbar props={{ name: "My Profile" }} />
      <View style={styles.container}>
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.image}
          />
          <Title style={styles.text}>edwin odhiambo</Title>
        </View>
        <View style={{ padding: 50, paddingTop: 0 }}>
          <Title>Name:</Title>
          <Title>D.O.B:</Title>
          <Title>Gender: </Title>
          <Title>Weight: </Title>
          <Title>Blood Group: </Title>
          <Button
            mode="contained"
            icon="account-edit"
            onPress={() => navigation.navigate("Settings")}
            style={{
              borderRadius: 50,
              marginTop: 23,
              marginBottom: 10,
              fontSize: "40px",
            }}
          >
            Edit{" "}
          </Button>
          <Button
            onPress={() => navigation.navigate("Settings")}
            mode="contained"
            icon="account-settings"
            style={{
              borderRadius: 50,
              marginTop: 23,
              marginBottom: 10,
              fontSize: "40px",
            }}
          >
            Settings{" "}
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    // marginTop: StatusBar.currentHeight || 0,
  },
  profile: {
    // backgroundColor:
    marginTop: 30,
  },
  image: {
    // flex: 1,
    height: 140,
    // padding: 50,
    width: 140,
    borderRadius: 50,
    // resizeMode: "cover",
  },
  text: {
    // color: "white",
    // fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#000000a0",
  },
});
