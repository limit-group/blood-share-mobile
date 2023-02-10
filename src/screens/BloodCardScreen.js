import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Snackbar, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
import { getError} from "../utils/error"
export default function BloodCardScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [profile, setProfile] = React.useState("");

  React.useEffect(() => {
    
    const token = getValue("token");
    setLoading(true);
    axios
      .get(`${api}/auth/profiles`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(getError(err));
        setVisible(true);
        setLoading(false);
      });
  }, []);

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
          <Title>D.O.B: </Title>
          <Title>Gender: </Title>
          <Title>Weight: </Title>
          <Title>Blood Group: </Title>
          <Button
            mode="contained"
            icon="account-edit"
            onPress={() => navigation.navigate("Complete Profile")}
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
        <Snackbar
          visible={visible}
          duration={1000}
          style={{ backgroundColor: "#fc7d7b" }}
          onDismiss={onDismissSnackBar}
          action={{
            label: "ok",
            onPress: () => {
              // Do something
            },
          }}
        >
          {error}
        </Snackbar>
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
