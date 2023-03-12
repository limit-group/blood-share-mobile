import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Chip,
  HelperText,
  List,
  SegmentedButtons,
  Snackbar,
  Title,
} from "react-native-paper";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
import { getError } from "../utils/error";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
    <MaterialCommunityIcons name="hand-heart-outline" size={28} color="#d0312d" {...props} />
  );

  const DonIcon = (props) => <Octicons name="people" size={28} {...props} />;

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            paddingTop: 30,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {profile.avatar ? (
            <Avatar.Image size={84} source={{ uri: profile.avatar }} />
          ) : (
            <Avatar.Image
              size={84}
              source={require("../../assets/avatar.png")}
            />
          )}
          <Chip
            icon="fountain-pen-tip"
            mode="outlined"
            style={{ height: 40, top: 30, backgroundColor: "#ffffff" }}
            onPress={() => navigation.navigate("Edit Profile")}
          >
            edit
          </Chip>
        </View>
        <View style={{ marginTop: 0, alignItems: "center" }}>
          <Title style={styles.text}>{profile.name}</Title>
        </View>
        <View style={{ padding: 30, paddingTop: 0 }}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "walk",
                label: "My donations",
                onPress: toDonations,
                icon: DonIcon,
              },
              {
                value: "drive",
                label: "My requests",
                onPress: toRequests,
                icon: ReqIcon,
              },
            ]}
          />
          <View
            style={{
              justifyContent: "space-evenly",
              flexDirection: "row",
              paddingBottom: 10,
              paddingTop: 20,
            }}
          >
            <Text>
              {profile.gender == "MALE" ? (
                <MaterialCommunityIcons name="gender-male" size={20} />
              ) : (
                <MaterialCommunityIcons name="gender-female" size={20} />
              )}{" "}
              Gender: {" \n"} <Title>{profile.gender}</Title>
            </Text>
            <View style={styles.verticleLine}></View>
            <Text>
              <Fontisto name="blood-drop" size={18} /> Blood Group:{"\n "}
              <Title>{profile.bloodType}</Title>
            </Text>
          </View>
          <View>
            <List.Item
              title="Date of Birth"
              description={moment(profile.dateOfBirth).format("Do MMM YY")}
              left={(props) => (
                <FontAwesome name={"birthday-cake"} size={24} {...props} />
              )}
            />
            <List.Item
              title="Body Weight"
              description={profile.bodyWeight + "Kgs"}
              left={(props) => <Ionicons name="body" size={20} {...props} />}
            />
            <List.Item
              title="Life Saver Points"
              description={profile.bloodPoints}
              left={(props) => (
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={20}
                  {...props}
                />
              )}
            />
            <List.Item
              title="Email"
              description={profile.email}
              left={(props) => (
                <MaterialCommunityIcons name="email" size={20} {...props} />
              )}
            />
            <HelperText style={{ textAlign: 'center'}}>* Donate more to earn more points</HelperText>
          </View>
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
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
