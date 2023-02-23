import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  HelperText,
  SegmentedButtons,
  Snackbar,
  Title,
} from "react-native-paper";
import moment from "moment";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
import { getError } from "../utils/error";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function BloodCardScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [profile, setProfile] = React.useState("");
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const findUser = async () => {
      const token = await getValue("token");
      axios
        .get(`${api}/auth/profiles`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError(getError(err));
          setVisible(true);
        });
    };

    findUser().catch((error) => {
      console.log(error);
    });
  }, []);

  const toDonations = () => {
    navigation.navigate("My Donations");
  };

  const toRequests = () => {
    navigation.navigate("My Blood Requests");
  };

  const ReqIcon = (props) => (
    <Fontisto name="blood-drop" size={28} color="#d0312d" {...props} />
  );

  const DonIcon = (props) => <Octicons name="people" size={28} {...props} />;

  return (
    <>
      <Navbar props={{ name: "My Profile" }} />
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.image} />
          ) : (
            <Image
              source={require("../../assets/avatar.png")}
              style={styles.image}
            />
          )}
          <Chip
            icon="fountain-pen-tip"
            mode="outlined"
            style={{ height: 50, top: 50 }}
            onPress={() => navigation.navigate("Edit Profile")}
          >
            edit
          </Chip>
        </View>
        <View style={{ marginTop: 0, alignItems: "center" }}>
          <Title style={styles.text}>{profile.name}</Title>
        </View>
        <View style={{ padding: 50, paddingTop: 0 }}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "walk",
                label: "my donations",
                onPress: toDonations,
                icon: DonIcon,
              },
              {
                value: "drive",
                label: "my requests",
                onPress: toRequests,
                icon: ReqIcon,
              },
            ]}
          />
          <Title>
            birthday: {moment(profile.dateOfBirth).format("Do MMM YY")}
          </Title>
          <Title>gender: {profile.gender}</Title>
          <Title>body weight: {profile.bodyWeight}</Title>
          <Title>blood group: {profile.bloodType}</Title>
          <Title>life saver points: {profile.bloodPoints}</Title>
          <HelperText>Donate more to earn more points</HelperText>
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
    height: 120,
    // padding: 50,
    width: 120,
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
