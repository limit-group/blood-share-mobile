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
import { Button, Card, Switch, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Navbar from "../components/Navbar";

export default function SettingsScreen({ navigation }) {
  const [value, setValue] = React.useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  // const image = {require("../../../assets/avatar.png")};

  const toEditProfile = () => {
    navigation.navigate("Profile");
  };

  const onDelete = () => {
    alert("Are you sure?");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ padding: 30, paddingTop: 10, paddingBottom: 10 }}>
          <Card style={styles.card}>
            <Card.Content
              style={{
                flexDirection: "row",
                padding: 10,
                paddingBottom: 20,
                justifyContent: "space-evenly",
              }}
            >
              <Title>Interested in donating. </Title>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </Card.Content>
          </Card>
        </View>
        <View style={{ padding: 30, paddingTop: 0 }}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={[styles.rounded, { color: "#fc7d7b" }]}>
                Legal
              </Title>
              <Title style={styles.rounded}>Licenses </Title>
              <Title style={styles.rounded}>Privacy Policy </Title>
              <Title style={styles.rounded}>Terms of Service </Title>
              <Button style={styles.rounded} mode="text" onPress={onDelete}>
                Delete Account
              </Button>
            </Card.Content>
          </Card>
          <Button
            mode="outlined"
            icon="lock-reset"
            style={{
              borderRadius: 50,
              marginTop: 13,
              marginBottom: 10,
              fontSize: "40px",
            }}
            onPress={() => navigation.navigate("Reset Password")}
          >
            Reset Password
          </Button>
          <Button
            mode="contained"
            icon="logout"
            style={{
              borderRadius: 50,
              marginTop: 13,
              marginBottom: 10,
              fontSize: "40px",
            }}
          >
            Logout
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
  card: {
    backgroundColor: "#ffffff",
  },
  rounded: {
    // borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
    // fontSize: '40px',
  },
});
