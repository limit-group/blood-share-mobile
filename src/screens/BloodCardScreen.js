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
import { Card, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BloodCardScreen({ navigation }) {
  const [value, setValue] = React.useState("");

  // const image = {require("../../../assets/avatar.png")};

  const toEditProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../../../assets/avatar.png")} /> */}
      <ImageBackground
        source={require("../../assets/avatar.png")}
        style={styles.image}
      >
        <Text style={styles.text}>edwin odhiambo</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight || 0,
  },
  profile: {
    // backgroundColor:
    marginTop: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});
